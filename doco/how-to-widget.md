How to Make a Widget
=
A widget is a reusable (usually visible) component. This makes it possible to include multiple such components in your clockface or app project. It should also make it easier to use the component in multiple projects.

This document assumes that you've already got a project that's suitable for widgetting, probably comprising a visual component comprising multiple SVG elements, and some js/ts code to make it display correctly.

The approach taken here is to use the document-factory object. This makes the use of the widget more 'normal' in your ts/js code (ie, more like using a built-in element or component).

SVG
-
Create a folder for your widget's resource files under `/resources/widgets`.

Within that folder, create a file called `index.view` for the widget's elements.

Place all of the elements within a `<symbol>`, which is itself within  a `<use>`.

The `id` and `class` of the `<symbol>` must both be the name of your widget.

Optionally, you can include non-visible elements that can be used to capture attributes for your widget within `.index` and `.css` files. This means that static widgets can be declared completely in SVG and CSS, and minimises the amount of js/ts code required to use widgets. In the `curved-text` widget, the elements with id `text`, `radius` and `layout` perform this role.

CSS
-
You can include styles that should apply to all instances of the widget. Do this in `styles.css`, in the same folder as the widget's `index.view`.

Try to use very specific selectors in your CSS rules. This will minimise the risk of your styles inadvertently affecting non-widget elements in your project, and will also minimise the risk that non-widget styles will inadvertently affect your widget's elements.

Javascript (or Typescript)
-
If you implement your widget by adding properties and functions to the Fitbit element object (eg, what you get when calling `getElementById`), you won't need to write as much code. Your widget will automatically inherit properties and function from element, such as `x` and `style`.

You don't need to provide a js/ts API for all of your widget's properties. Ideally, they should all be settable in SVG and/or CSS. You should only provide js/ts APIs for those properties that need to be changed at run-time.

Use a property setter (`Object.defineProperty`) if the capability you need to implement depends on exactly one value. Before implementing a getter, consider whether it is really required.

If the capability you need requires zero or two+ values, add a new function to the element object.

You can have private variables and functions within your widget (because it is a closure).

Installation
-
To connect all of the bits of your widget together, adapt the usage instructions from [here](usage.md).