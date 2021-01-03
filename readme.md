curved-text
=
(under construction!)\
\
curved-text is a widget for Fitbit OS using inbuilt fonts for curved text.\
The text gets arranged and rotated around an imaginary circle.

**Circle**\
The dimensions of the circle get set by 3 different possible settings:
* centerX: cx
* centerY: cy
* radius: r

Setting `r < 0` can be used for bottom-curved text.

\
**Mode**\
There are 2 different modes available:
* mode: 0 (auto)\
 calculates the relative position of the characters, depending on their individual witdh (using getBBox() ).\
 In this mode you can additionally add a value for letter-spacing (decimal)

* mode: 1 (fix)\
 lets you rotate the single characters by a fix angle you can apply in the settings. The rotation angle for each character gets automatically determined

\
**Alignment**\
 Each mode features the 3 text-anchor positions\
 (which get applied at 0° (center top) for r > 0 and at 180° (center bottom) for r < 0):
 * textAnchor: 0 (middle)
 * textAnchor: 1 (start)
 * textAnchor: 2 (end)

\
 **Rotation**\
 This feature provides an additional rotation on the whole textElement, after it´s alignment.

 \
 **Multiuse**\
 Multiple textElement can be set and defined independantly.


Installation
-

Copy the `/app/widgets` folder (and its contents) into your project's `/app` folder (so that you then have an `/app/widgets` folder in your project).

Copy the `/resources/widgets` folder (and its contents) into your project's `/resources` folder (so that you then have a `/resources/widgets` folder in your project).

In your `/resources/widget.defs` file, within the `<defs>` section, add the following lines:

>`<link rel="stylesheet" href="widgets/curved-text/styles.css" />`

>`<link rel="import" href="widgets/curved-text/index.view" />`

In your `/resources/index.view` file, include `<use>` elements for every instance of curved-text that you want. Your `<use>` elements must include `href="#curvedText"`, and you'll need to give each element an id; *eg*, `id="stepsCurvedText"`. See detailed documentation below, and examples in this repository.

>**Note:** Unlike most Fitbit elements and components, widgets won't be visible just because you've included them in your `.view` file. Widgets need some internal code to be executed to lay them out, and this doesn't happen until you get a reference to them using `document.getWidgetById()` in your code (see below).

In your `/app/index.js` (or `.ts`) file, add the following two import statements near the top:
> `import widgetFactory from './widgets/widget-factory'`

> `import curvedText from './widgets/curved-text'`

If you haven't already got an `import` statement for `document`, add that too.

In your `/app/index.js` (or `.ts`) start-up code:

* Create a variable for a `widgetFactory` object, and tell it about curved-text widgets, like this:
>> `const widgets = widgetFactory([curvedText]);`

* Use the ```widgetFactory``` object to add a `getWidgetById()` function to your `document` variable, like this:
>> `widgets.registerContainer(document);`

Now, elsewhere in your `/app/index.js` (or `.ts`) file, you can get objects that correspond to the curved-text `<use>` elements in your `index.view` file, like this:
>`const stepsCurvedTextWidget = document.getWidgetById('stepsCurvedText');`

In your code, use your widget object(s) to interact with the corresponding curved-text element; *eg*:

> `stepsCurvedTextWidget.text = today.adjusted.steps;`

The available API members are described below.

>**Note:** You can access widgets from files other than `/app/index.js` (or `.ts`), but you may need to make changes to the folders in the `import` statements.

Use
-

**SVG Element**

Position attributes:

* cx
* cy
* r

Text attributes:

* text-buffer
* text-anchor
* font-family
* font-size

**Javascript/typescript Object**

Properties:
* text

Methods:
* redraw()