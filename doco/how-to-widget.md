How to Make a Widget
=
A widget is a reusable (usually visible) component. This makes it possible to include multiple such components in your clockface or app project. It should also make it easier to use the component in multiple projects.

This document assumes that you've already got a project that's suitable for widgetting, probably comprising a visual component comprising multiple SVG elements, and some JavaScript (or TypeScript) code to make it display correctly.

The approach taken here is to use a `widget-factory` object. This makes the use of the widget more 'normal' for the calling code (*ie*, more like using a built-in [element](https://dev.fitbit.com/build/guides/user-interface/svg/) or [component](https://dev.fitbit.com/build/guides/user-interface/svg-components/)).

SVG
-
Create a folder for your widget's resource files under `/resources/widgets`.

Within that folder, create a file called `index.view` for the widget's elements.

Place all of the elements within a `<symbol>`, which is itself within  a `<defs>` ([example](../resources/widgets/curved-text/index.view)).

The `id` and `type` of the `<symbol>` must both be the name of your widget.

Optionally, you can include non-visible elements that can be used to capture attributes for your widget within `.view` and `.css` files. This means that static widgets can be declared completely in SVG and CSS, and minimises the amount of JavaScript code required to use widgets. In the [curved-text widget](../resources/widgets/curved-text/index.view), the elements with id `text`, `radius` and `layout` perform this role.

CSS
-
You can include styles that should apply to all instances of the widget. Do this in `styles.css`, in the same folder as the widget's `index.view` ([example](../resources/widgets/curved-text/styles.css)).

Try to use very specific selectors in your CSS rules. This will minimise the risk of your styles inadvertently affecting non-widget elements in your project, and will also minimise the risk that non-widget styles will inadvertently affect your widget's elements.

Other Resources
-
If your widget requires other resources (*eg*, images), put them in the same folder as the widget's `index.view`. You can use one or more sub-folders if you like.

JavaScript (or TypeScript)
-
Your widget will almost certainly need to include some executable code to lay out its elements initially. It will probably also need to expose some functions to calling code so that its appearance can be changed at run-time (these functions comprise your widget's *interface* or *API*).

Create a folder for your widget's executable files under `/app/widgets`. Within that folder, create a file called `index.js` (or `.ts`) ([example](../app/widgets/curved-text/index.ts)).

`index.js` must be a JavaScript module that exports a function with the same name as the widget. That function simply returns a JavaScript object that tells the widget factory about the widget. The object provides the name of the widget and a function that can be called to construct instances of the widget.

Most of your widget's code goes in the `construct` function. This function:
* takes a Fitbit [GraphicsElement](https://dev.fitbit.com/build/reference/device-api/document/#interface-graphicselement) as an argument (*eg*, what you get when calling `getElementById`)
* adds your widget API properties and functions to it
* initialises local variables by copying attributes from non-visible child elements (if any)
* if necessary, performs an initial layout of the elements within the widget.

Rather than using a JavaScript class, the widget's code is implemented as a [closure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures). This avoids [issues with 'this' reference inconsistency](https://www.digitalocean.com/community/conceptual_articles/understanding-this-bind-call-and-apply-in-javascript), supports private variables and functions, and obviates the need to use `new` to instantiate instances (which would be inconsistent with normal Fitbit coding practice).

Because your widget is just a modified Fitbit `GraphicsElement` object, you won't need to write as much code as you would otherwise. Your widget will automatically inherit properties and functions from `GraphicsElement`, such as `x` and `style`. If those aren't suitable, you can override them. (Be careful if you do this, because Fitbit OS might access the replacement members in your widget, and it will expect them to perform consistently with the members they're replacing.)

You don't need to provide a JavaScript API for all of your widget's properties. Ideally, they should all be settable in SVG and/or CSS. You only need to provide JavaScript APIs for those properties that need to be changed at run-time.

Use a property setter ([Object.defineProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)) if the capability you need to implement depends on exactly one value. An example in `curved-text` is `text`. Before implementing a getter, consider whether it is really required.

If the capability you need requires zero or two+ values, add a new function to the element object. An example in `curved-text` is `redraw()`.

Use private variables and functions within your code to keep the public interface of your widget as simple as possible, and to reduce the likelihood that calling code will be able to corrupt the state of your widget by messing with its internal magic. In `curved-text`, `textEl` is an example of a private variable (well, const) and `initialiseChars()` is an example of a private function.

An example of the initialisation of a local variable copying an attribute from a non-visible child element in `curved-text` is `radius`.

The `curved-text` widget takes care of laying out its child elements simply by calling its `redraw()` function.

Installation
-
To connect all of the bits of your widget together, adapt the usage instructions from [here](usage.md).