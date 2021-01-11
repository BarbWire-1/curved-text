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
________________
Interface Usage Examples
=
SVG
-
text via SVG:
   >`<use id="myLabel" href="#curvedText" >`
      >>`<set href="#text" attributeName="text-buffer" to="myText" />`

font-family via SVG:
   >`<use id="myLabel" href="#curvedText" font-family="Tungsten-Medium" >`

font-size via SVG:
   >`<use id="myLabel" href="#curvedText" font-size="10" >`

fill via SVG:
  >`<use id="myLabel" href="#curvedText" fill="red" >`

opacity via SVG:
  >`<use id="myLabel" href="#curvedText" opacity="0.1" fill="white" >`

display via SVG:
>`<use id="myLabel" href="#curvedText" display="none" fill="white" >`

x via SVG:
>`<use id="myLabel" href="#curvedText" x="50" >`

y via SVG:
>`<use id="myLabel" href="#curvedText" y="50" >`

r via SVG:
>`<use id="myLabel" href="#curvedText" fill="white" >`
>>`<set href="#radius" attributeName="r" to="25" />`

text-anchor via SVG:
>`<use id="myLabel" href="#curvedText" fill="white" >`
>>`<set href="#text" attributeName="text-anchor" to="start" />`

letter-spacing via SVG:
>`<use id="myLabel" href="#curvedText" fill="white" >`
>>`<set href="#text" attributeName="letter-spacing" to="10" />`

start-angle via SVG:
>`<use id="myLabel" href="#curvedText" fill="white" >`
>>`<set href="#layout" attributeName="start-angle" to="90" />`

sweep-angle via SVG:
>`<use id="myLabel" href="#curvedText" fill="white" >`
>>`<set href="#layout" attributeName="sweep-angle" to="20" />`

class via SVG:
>`<use id="myLabel" href="#curvedText" >`
>>`<set href="#text" attributeName="class" to="classx" />`

CSS
-
text via CSS
>#id:  `#myLabel #text {text-buffer: "myText";}`\
>.class: `.myClass #text {text-buffer: "myText";}`

font-family via CSS
>#id: `#myLabel {font-family: Fabrikat-Regular;}`\
>.class: `.myClass {font-family: Fabrikat-Regular;}`

font-size via CSS
>#id: `#myLabel {font-size: 30;}`\
>.class: `.myClass {font-size: 30;}`

opacity via CSS
>#id: `#myLabel {opacity: 0.5};`\
>.class: `.myClass {opacity: 0.5;}`

display via CSS
>#id: `#myLabel {display: none};`\
>.class: `.myClass {display: none;}`

x,y via CSS
>#id:  `#myLabel {x: 50;}`\
>.class: `.myClass {x: 50;}`

r via CSS
>#id:  `#myLabel #radius {r: 50;}`\
>.class: `.myClass #radius {r: 50;}`

text-anchor via CSS
>#id:  `#myLabel #text {text-anchor: middle;}`\
>.class: `.myClass #text {text-anchor: middle;}`

letter-spacing via CSS
>#id:  `#myLabel #text {letter-spacing: 5;}`\
>.class: `.myClass #text {letter-spacing: 5;}`

start-angle via CSS
>#id:  `#myLabel #layout {start-angle: 90;}`\
>.class: `.myClass #layout {start-angle: 90;}`

sweep-angle via CSS
>#id:  `#myLabel #layout {sweep-angle: 45;}`\
>.class: `.myClass #layout {sweep-angle: 45;}`



.ts/.js
-
text via .ts/.js
> `myLabel.text = "myText"`

font-family via .ts/.js
> `myLabel.style.fontFamily = "Sytem-Regular";`

font-size via .ts/.js
> `myLabel.style.fontSize = 20;`

opacity via .ts/.js
> `myLabel.style.opacity = 0.2;`

display via .ts/.js
> `myLabel.style.display = "none";`

x,y via .ts/.js
>`myLabel.x = 50;`\
>`myLabel.y = 50;`

r via .ts/.js
> `not appliable here`

text-anchor via .ts/.js
> `not appliable here`

letter-spacing via .ts/.js
> `not appliable here`

start-angle via .ts/.js
> `myLabel.startAngle`

sweep-angle via .ts/.js
> `not appliable here`
