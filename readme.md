curved-text
=

**curved-text** is a widget for **Fitbit OS** using inbuilt fonts to create multilple and independent curved texts supported by the widget-factory.\
You can use it under `vanilla javascript` (studio or CLI) as well as running `typescript`.

!<div align="center">![examples](doco/examples.png#center)</div>


Installation
=

**/app**

Copy the complete `/app/widgets` folder  into your project's `/app` folder (so that you then have an `/app/widgets` folder in your project).


**/resources/widgets**

Copy the complete `/resources/widgets` folder  into your project's `/resources` folder (so that you then have a `/resources/widgets` folder in your project).

In your `/resources/widget.defs` file, within the `<defs>` section, add the following lines:


```xml
<defs>
    ...
    <link rel="stylesheet" href="widgets/curved-text/styles.css"/>
    <link rel="import" href="widgets/curved-text/index.view"/>
</defs>
```
In your `/resources/index.view` file, include `<use>` elements for every instance of curved-text that you want.\
Your `<use>` elements must include `href="#curvedText"`, and you'll need to give each element an id; *eg*:

```xml
<use id="myLabel" href="#curvedText"/>
```
See detailed documentation below, and examples in this repository.

// TODO B Does the above statement apply here? There isn't really any more detail on installation in this file.

**/app/index.js**

**Imports and Initialisation**

// TODO B I think I'd delete the line above because it seems to leave the previous **/app/index.js** with nothing in it. For consistency, just use the bold text to specify files, rather than actions.

Add the following two import statements near the top:

```js
//IMPORT WIDGET-FACTORY AND CURVED-TEXT
import { widgetFactory } from './widgets/widget-factory';
import { curvedText } from './widgets/curved-text';
```

If you haven't already got an `import` statement for `document`, add that too.

Get the `widgetFactory` to initialise all of your `curvedText` widgets:
```js
//INITIALISE CURVED-TEXT
widgetFactory(curvedText);
```

 ...or, if your multiple widgets are all located within a child element called  `myGroupElement`, you can use this form:

 ```js
//INITIALISE WIDGET_FACTORY AND WIDGETS
widgetFactory(myGroupElement, curvedText);
```

In order to use `curved-text` and `widget-factory` in your typescript project, please follow the additional instructions here: [typescript_interface](doco/typescript.md).

// TODO B Since the above largely duplicates the 'Installation' section in usage.md, should it be removed from there?

Your Code
=

**/resources/index.view** and **/resources/styles.css**

Due to the structure of the `<use>` there are a few cases in which you'll need a `<set>` in SVG or specified selectors in CSS for your settings. Other settings can be written directly into the `<use>` line.

// TODO B I suspect the previous para only makes sense to us because we already know what it means! Should we expand it and/or link to fitbit's <set> examples, or delete it?

**/app/index.js**

Get and use objects that correspond to the curved-text `<use>` elements in your `index.view` file in the normal way:
```js
const myLabel = document.getElementById('myLabel');
const myClass = document.getElementsByClassName('myClass');

myLabel.text = today.adjusted.steps;
```

Settings
=
Possible individual settings:

 * Radius of the `circles` at which the text gets curved, as well as all `text-` and `font-properties` and `-attributes`.

// TODO B I don't understand the 'as well as' bit of the above. I hope I didn't originally write it!

 * Setting the radius r < 0 switches the appearance of your text to bottom-curved.
 * x,y here determine the `center`(!) of your curved-text element's circle.
 * There are two `modes` to rotate text: default is `auto`; setting `sweep-angle` switches to `fix` where the chars get rotated by += sweepAngle.

!<div align="center">![set/call](doco/interface_table.png)</div>

For more detailed information, see [installation and usage](doco/usage.md) and [syntax examples](doco/snippets.md).

---

...and now - CURVE IT!\
by BarbWire and Gondwana


(and RTFM! :slightly_smiling_face::vulcan_salute:)

[curved-text-demo](https://github.com/BarbWire-1/curved-text-demo)\
!<div align="center">![demo](doco/curved_text_demo2.gif#center)</div>

If you're curious about how the code files in this clockface work together to let you create and manipulate widgets, see [How the Widget Factory Works](doco/how-the-factory-works.md).

If you would like to know how to turn your own elements into a reusable component, see [How to Make a Widget](doco/how-to-widget.md).