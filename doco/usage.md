Installation
=
/app
-
Copy the complete `/app/widgets` folder  into your project's `/app` folder\
 (so that you then have an `/app/widgets` folder in your project).


/resources/widgets
-
Copy the complete `/resources/widgets` folder  into your project's `/resources` folder\
(so that you then have a `/resources/widgets` folder in your project).

In your `/resources/widget.defs` file, within the `<defs>` section, add the following lines:

>`<link rel="stylesheet" href="widgets/curved-text/styles.css" />`

>`<link rel="import" href="widgets/curved-text/index.view" />`

/resources/index.gui (or .view)
-
In your `/resources/index.view` file, include `<use>` elements for every instance of curved-text that you want. Your `<use>` elements must include `href="#curvedText"`, and you'll need to give each element an id; *eg*, `id="stepsCurvedText"` like:
  >`<use id="myLabel" href="#curvedText" >`

See detailed documentation below, and examples in this repository.

>**Note:** Unlike most Fitbit elements and components, widgets won't be visible just because you've included them in your `.view` file. Widgets need some internal code to be executed to lay them out, and this doesn't happen until the `widgetFactory` is told about them (see below).

/app/index.js (or .ts)\
Imports and setup
-
In your `/app/index.js` (or `.ts`) file, add the following two import statements near the top:
> `import { widgetFactory } from './widgets/widget-factory'`

> `import { curvedText } from './widgets/curved-text'`

If you haven't already got an `import` statement for `document`, add that too.

In your `/app/index.js` (or `.ts`) start-up code:

* tell the `widgetFactory` object to construct all curved-text widgets, like this:
> `widgetFactory(curvedText);`

* ...or, if your widgets are all located within a child element called `myGroupElement`, you can use this form:
> `widgetFactory(myGroupElement, curvedText);`

In order to use `curved-text` and `widget-factory` in your typescript project, please follow the additional instructions here: [typescript_interface](typescript.md).

Your code
=
Anywhere in your `/app/index.js` (or `.ts`) file, you can get objects that correspond to the curved-text `<use>` elements in your `index.view` file in the normal way:
>`const myLabel = document.getElementById('myLabel');`\
>`const myClass = document.getElementsByClassName('myClass');`

In your code, use your widget object(s) to interact with the corresponding curved-text element; *eg*:

> `myLabel.text = today.adjusted.steps;`

Attributes
=
Set up the curve your text gets aligned at:
 -
 * x (horizontal center of curve)
 * y (vertical center of curve)
 * r (use r < 0 for bottom curved text; default is 100)

 Attributes to set text and style
 -
 * text (API) and text-buffer (SVG and CSS) (maximum length: 25 characters)
 * font-family
 * font-size
 * fill (default: black)
 * letter-spacing (pixels; default is 0; only gets applied in mode `auto`)
 * text-anchor ("start", "middle" or "end"; defaults to "middle")
 * opacity
 * display

 Rotation
 * sweep-angle (setting `sweep-angle` automatically switches to mode `fix` and rotates each char by += sweep-angle)
 * start-angle (sets text position around the curve; defaults to 0° for r>=0, and 180° for r<0, related to your text-anchor)

This table summarises the properties and settings that are available, and where they can be set. For more detail, see [code snippets](snippets.md).

!<div align="center">![set/call](interface_table.png)</div>

Limitations
=
* 'getters' are not implemented for API properties (text, startAngle, anchorAngle). Therefore, those properties are write-only.
* The widget inherits behaviour from GraphicsElement. While this provides a lot of capability without requiring additional code in the widget, it also means that some standard GraphicsElement functions (*eg*, getBBox) may not work as expected.
* For SVG translate="rotate" animations make sure the animated `<g>` is direct parent of your `<use>(s)`. You can also rotate your curvedWidgetText elements in .js/.ts using the `.anchorAngle` property.
* The code targets SDK5. It will require the standard modifications to work in earlier SDKs.
* The factory and curved-text widget have not been tested in a dynamic GUI (ie, using `document.location` manipulation).