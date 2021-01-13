________________
Interface Usage Examples
=
SVG
-
text via SVG:
   >`<use id="myLabel" href="#curvedText" >`
      >>`<set href="#text" attributeName="text-buffer" to="myStaticText"/></use>`

font-family via SVG:
   >`<use id="myLabel" href="#curvedText" font-family="Tungsten-Medium"/>`

font-size via SVG:
   >`<use id="myLabel" href="#curvedText" font-size="10"/>`

fill via SVG:
  >`<use id="myLabel" href="#curvedText" fill="red"/>`

opacity via SVG:
  >`<use id="myLabel" href="#curvedText" opacity="0.1" fill="white"/>`

display via SVG:
>`<use id="myLabel" href="#curvedText" display="none" fill="white"/>`

x via SVG:
>`<use id="myLabel" href="#curvedText" x="50"/>`

y via SVG:
>`<use id="myLabel" href="#curvedText" y="50"/>`

r via SVG:
>`<use id="myLabel" href="#curvedText" fill="white" >`
>>`<set href="#radius" attributeName="r" to="25" /></use>`

text-anchor via SVG:
>`<use id="myLabel" href="#curvedText" fill="white" >`
>>`<set href="#text" attributeName="text-anchor" to="start"/></use>`

letter-spacing via SVG:
>`<use id="myLabel" href="#curvedText" fill="white" >`
>>`<set href="#text" attributeName="letter-spacing" to="10"/></use>`

start-angle via SVG:
>`<use id="myLabel" href="#curvedText" fill="white" >`
>>`<set href="#layout" attributeName="start-angle" to="90"/></use>`

sweep-angle via SVG:
>`<use id="myLabel" href="#curvedText" fill="white" >`
>>`<set href="#layout" attributeName="sweep-angle" to="20"/></use>`

class via SVG:
>`<use id="myLabel" href="#curvedText" >`
>>`<set href="#text" attributeName="class" to="classx"/></use>`

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

fill via CSS
>#id: `#myLabel {fill: red;}`\
>.class: `.myClass {fill: red;}`

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

fill .ts/.js
> `myLabel.style.fill = "red";`

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