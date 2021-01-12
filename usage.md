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
In your `/resources/index.view` file, include `<use>` elements for every instance of curved-text that you want. Your `<use>` elements must include `href="#curvedText"`, and you'll need to give each element an id; *eg*, `id="stepsCurvedText"`like:
  >`<use id="myLabel" href="#curvedText" >`

See detailed documentation below, and examples in this repository.

>**Note:** Unlike most Fitbit elements and components, widgets won't be visible just because you've included them in your `.view` file. Widgets need some internal code to be executed to lay them out, and this doesn't happen until you get a reference to them using `document.getWidgetById()` in your code (see below).

/app/index.js (or .ts)\
Imports and setup
-
In your `/app/index.js` (or `.ts`) file, add the following two import statements near the top:
> `import widgetFactory from './widgets/widget-factory'`

> `import curvedText from './widgets/curved-text'`

If you haven't already got an `import` statement for `document`, add that too.

In your `/app/index.js` (or `.ts`) start-up code:

* Create a variable for a `widgetFactory` object, and tell it about curved-text widgets, like this:
> `const widgets = widgetFactory([curvedText]);`

* Use the ```widgetFactory``` object to add a `getWidgetById()` function to your `document` variable, like this:
> `widgets.registerContainer(document);`

Your code
=

Now, elsewhere in your `/app/index.js` (or `.ts`) file, you can get objects that correspond to the curved-text `<use>` elements in your `index.view` file, like this:
>`const myLabel = document.getWidgetById('myLabel');`

In your code, use your widget object(s) to interact with the corresponding curved-text element; *eg*:

> `stepsLabel.text = today.adjusted.steps;`

Set up the curve your text gets aligned at:
 -
 * x 
 * y
 * r (use r < 0 for bottom curved text)

 Attributes to set text and style
 -
 * text
 * text-buffer
 * font-family
 * font-size
 * fill
 * letter-spacing
 * text-anchor

 * opacity
 * display

Rotate whole text
 -
 * start-angle

 In the default `auto-mode`, the position of each char gets calculated by its width (using getBBox()), plus additional letter-spacing if set.

If 
 * sweep-angle\
 is set, it switches to `fix-mode` where each character gets rotated by the chosen fix += angle.
