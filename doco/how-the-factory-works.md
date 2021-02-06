How the Widget Factory Works
=

This document is only for the curious. It explains how the various bits of code in this clockface work together to let you create and manipulate widgets. You shouldn't need to read it to be able to use curved-text widgets in your code; just follow the [usage instructions](usage.md).

If you're interested in creating your own widgets that use the same approach, see [how to make a widget](how-to-widget.md).

Types and Instances
-

Before we start, it might be helpful to clarify some terminology:

* **Type.** A widget *type* describes the shared characteristics of a *set* of widgets. For example, `curved-text` is a widget *type*.

* **Instance.** A widget *instance* is a single widget of a particular type. For example, your clockface might have one curved-text widget that says 'Steps:', and a second curved-text widget that displays the current value of `today.adjusted.steps`.

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

You might be wondering how `getElementsByTypeName()` can find `<use>` elements when we never specified a `type` for any of the `<use>`s in `index.view`. This is part of the magic of [template symbols](https://dev.fitbit.com/build/guides/user-interface/svg/#template-symbols): `type` is automatically copied from the `<symbol>` into each `<use>` that refers to it. The linkage between `<use>` and `<symbol>` is established by the `<use>`'s `href` referring to the `<symbol>`'s `id`.

We iterate over the array of `<use>` elements for the current wiget type:

> `instances.forEach(el => {`

If you're using CSS to apply styles to your widgets, the CSS system needs a bit of help. It seems that styles are not applied to `<use>` elements automatically, but they will be applied if the system thinks that the element's `class` has changed. Reapplying the `class` is sufficient to trigger this:

> el.class = el.class;

Finally, we call the widget type's `construct()` function for this instance, passing the `<use>` element. We'll describe exactly what `construct()` does below.

When the factory has constructed all relevant instances of all the widget types it's been told about, its job is done.

Constructing the Widget
-

The `construct()` function is in the widget's [index.js (or .ts)](../app/widgets/curved-text/index.ts). Its main job is to turn the `<use>` element object it receives into a widget of the appropriate type, which requires adding new functions and properties to the object. In addition, `construct()` can initialise local variables based on element attributes, and lay out the widget's child elements so they display correctly. See [how to make a widget](how-to-widget.md) for details.

---

Using the Widget
-

Finally, in your [app/index](../app/index.js), you can call `getElementById()` (or any other `getElementBy...` function) just like you would for any SVG element.

If the element is a widget's `<use>`, the object you get from `getElementById()` is the one that was modified by `construct()`. This means that it has the new functions and properties that were added to it there. Therefore, in addition to being able to use built-in functions and properties (such as `.x`), you can also use widget-specific ones (such as `.startAngle` and `.text`). Whenever you do so, the corresponding code in the widget's [index.js (or .ts)](../app/widgets/curved-text/index.ts) gets executed.

If your widget is static (*ie*, doesn't need to be changed while your program is running), you don't need to mention it in app/index at all. The widget will acquire any relevant styles set in CSS, and its child elements will be laid out by its `construct()` function which will be called by the factory. All you need to do is to call `widgetFactory()` and specify the *type* of widget.

This whole process is obviously quite convoluted. However, hopefully, most of the complexity is hidden away in the factory and widget files, so that using the widget in your app/index is very similar to using a standard Fitbit [element](https://dev.fitbit.com/build/guides/user-interface/svg/) or [component](https://dev.fitbit.com/build/guides/user-interface/svg-components/).