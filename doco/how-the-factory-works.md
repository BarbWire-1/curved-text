How the Widget Factory Works
=

This document is only for the curious. It explains how the various bits of code in this clockface work together to let you create and manipulate widgets. You shouldn't need to read it to be able to use curved-text widgets in your code; just follow the [usage instructions](usage.md).

If you're interested in creating your own widgets that use the same approach, see [how to make a widget](how-to-widget.md).

app/index.js Imports
-

In [app/index.js](../app/index.js), you import two functions:
* `widgetFactory`
* `curvedText`

If your app used other types of widgets, you could import them too.

`curvedText` is a function that returns a fairly simple object. You can see the object being returned near the bottom of [app/widgets/curved-text/index.ts](../app/widgets/curved-text/index.ts). The object has two things in it:

* `name`: the name of this type of widget.
* `construct`: a function that can be used to create instances of this type of widget. The `construct` function isn't being called yet; we're just indicating what the function is, so that it can be used later (like a callback or event handler that you'd use with `ontick()` or `setTimeout()`).

Calling widgetFactory()
-

In [app/index.js](../app/index.js), you have `widgetFactory(curvedText);`. This passes the `curvedText` function you imported to the `widgetFactory` function you imported. This will result in the construction of all `curved-text` widgets throughout the whole of your SVG document (*ie*, wherever they are in your [index.view](../resources/index.view)).

If you were using more than one type of widget, you could pass that to the `widgetFactory` in the same function call; *eg*:

> `import { barGraph } from './widgets/bar-graph'`

> `widgetFactory(curvedText, barGraph);`

`widgetFactory()` is [polymorphic](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)). This means that it can take different types of arguments; *ie*, it can be used in different ways. The examples above only pass widget functions, and result in the whole of your document being searched for widgets of those types. If you've ever used `document.getElementById()` or `document.getElementsByClassName()` very frequently on a complex document, you might have noticed that they can be very slow. If the elements you want to get are all in one sub-element within your document (such as a `<svg>`, `<g>` or `<section>`), you can just search within that sub-element; *eg*, `mySubElement.getElementById(...`. This can be a lot quicker.

`widgetFactory()` supports the ability to limit search to a sub-element. To do so, pass the sub-element object as the first argument to your call to `widgetFactory()`; *eg*, `widgetFactory(mySubElement, curvedText);`.

Inside the Factory
-

Now that we know what the `widgetFactory()` call can look like from the point of view of the calling code, let's look at it from the point of view of the [widgetFactory function](../app/widgets/widget-factory.ts) itself.

In addition to polymorphism, `widgetFactory()` does another unusual thing with its arguments. You can see that the function takes `(...args)`. The `...` indicates that `args` is a [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters), which means that the rest of the arguments passed to the function are to put into an array called `args`. Since there are no arguments listed *before* `...args`, *all* of the arguments passed to the function are to put into that array. `Rest parameters` are useful when you don't want to specify exactly how many arguments must be passed to a function; this is what allows `widgetFactory()` to accept as many widget types as you need.

Since we called `widgetFactory(curvedText);`, `args` will be an array containing just one element (`args[0]`), and `args[0]` will be the `curvedText` function.

The first few lines in `widgetFactory()` implement its polymorphism by working out whether the first argument (`arg[0]`) is an element to search, or just the first widget type. If it's the former, `typeof args[0]` will be `object`, so the variables `searchElement` and `firstWidgetIndex` are adjusted accordingly.

Having worked out where to search, and which arguments correspond to widget types, the `for` loop in the factory iterates over all the args that are widget types. In the current case, this will only be `curved-text`.

For each widget type, the factory gets its `widgetRego` object; *ie*, name and construct().

It then gets an array of all instances (*ie*, `<use>` elements) of that widget type that are located within `searchElement` (by default, `document`). This is done by

> `const instances = searchElement.getElementsByTypeName(widgetRego.name);`

`getElementsByTypeName()` is like `getElementsByClassName()`, except that it looks for elements that have the specified `type` rather than `class`.

You might be wondering how this can find `<use>` elements when we never specified a `type` for any of the `<use>`s in `index.view`. This is part of the magic of [template symbols](https://dev.fitbit.com/build/guides/user-interface/svg/#template-symbols): `type` is automatically copied from the `<symbol>` into each `<use>` that refers to it. The linkage between `<use>` and `<symbol>` is established by the `<use>`'s `href` referring to the `<symbol>`'s `id`.

---

so now we iterate over that array of <use> elements

instances.forEach(el => {

we do the stupid el.class=el.class to force the CSS system to work :stuck_out_tongue:

finally, we call construct(), passing the <use> element

this calls the construct() function in curved-text/index.ts

construct() takes the <use> element it receives as an argument, and adds things to it

the element is just an object, with properties and functions as per fitbit's documentation

construct() takes that object and uses two techniques to add new things to it

the simpler thing is to add a new function to an object

curved-text only dies this once: (el as CurvedTextWidget).redraw = () => {

after this is done, the element knows about a new function (called redraw)

previously, it knew how to do functions like .getBBox(); now it can do .redraw()

the point at this stage is that construct() can add new functions to a built-in element object

again, the point is just that construct() can add new functions

construct() can also add new properties

a simple example of a built-in property is x

we've added properties called startAngle, anchorAngle and text

Object.defineProperty(el, 'text', {

the syntax is horrible, but standard JS

from the point of view of calling code, they work like simple variables

eg, text="My label"

but in the widget's code, we have to provide a function that says what to do with the argument (eg, text)

quick recap: construct() adds functions and properties to the element object that corresponds to a <use>

this is how the js/ts API is implemented in the widget

construct() had to do one final thing

the widget contains heaps of elements (eg, char <text>) that haven't been put into place yet

so it has to do an initial layout of all those child elements

curved-text does this by calling its redraw() function

it made sense to do that layout stuff in a function so it can be reused again, if need be (eg, if user changes the text)

of course, all your magic happens in redraw()

so that's all that construct() does; ok?

and it's also all that the factory does; it just iterates over all instances of all widget types, calling their construct()

now, in your app/index, you can call getElementById just like you would for any SVG element

but if the element is a widget's  <use>, the object you get from getElementById() is the one that was modified by construct()

so it's magically got the new functions and properties we added to it

so you can set .startAngle and .text on that object

and the relevant code in the widget gets executed

I guess it's all about connecting things