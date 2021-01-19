________________
Interface Usage Examples
=
SVG
___________________

text:
   >`<use id="myLabel" href="#curvedText" >`
      >>`<set href="#text" attributeName="text-buffer" to="myStaticText"/></use>`

font-family:
   >`<use id="myLabel" href="#curvedText" font-family="Tungsten-Medium"/>`

font-size:
   >`<use id="myLabel" href="#curvedText" font-size="10"/>`

fill:
  >`<use id="myLabel" href="#curvedText" fill="red"/>`

opacity:
  >`<use id="myLabel" href="#curvedText" opacity="0.1" fill="white"/>`

display:
>`<use id="myLabel" href="#curvedText" display="none" fill="white"/>`

x:
>`<use id="myLabel" href="#curvedText" x="50"/>`

y:
>`<use id="myLabel" href="#curvedText" y="50"/>`

r:
>`<use id="myLabel" href="#curvedText" fill="white" >`
>>`<set href="#radius" attributeName="r" to="25" /></use>`

text-anchor:
>`<use id="myLabel" href="#curvedText" fill="white" >`
>>`<set href="#text" attributeName="text-anchor" to="start"/></use>`

letter-spacing:
>`<use id="myLabel" href="#curvedText" fill="white" >`
>>`<set href="#text" attributeName="letter-spacing" to="10"/></use>`

start-angle:
>`<use id="myLabel" href="#curvedText" fill="white" >`
>>`<set href="#layout" attributeName="start-angle" to="90"/></use>`

sweep-angle:
>`<use id="myLabel" href="#curvedText" fill="white" >`
>>`<set href="#layout" attributeName="sweep-angle" to="20"/></use>`

class:
>`<use id="myLabel" href="#curvedText" >`
>>`<set href="#text" attributeName="class" to="classx"/></use>`

CSS
___________________


text:
>#id:  `#myLabel #text {text-buffer: "myText";}`\
>.class: `.myClass #text {text-buffer: "myText";}`

font-family:
>#id: `#myLabel {font-family: Fabrikat-Regular;}`\
>.class: `.myClass {font-family: Fabrikat-Regular;}`

font-size:
>#id: `#myLabel {font-size: 30;}`\
>.class: `.myClass {font-size: 30;}`

fill:
>#id: `#myLabel {fill: red;}`\
>.class: `.myClass {fill: red;}`

opacity:
>#id: `#myLabel {opacity: 0.5};`\
>.class: `.myClass {opacity: 0.5;}`

display:
>#id: `#myLabel {display: none};`\
>.class: `.myClass {display: none;}`

x,y:
>#id:  `#myLabel {x: 50;}`\
>.class: `.myClass {x: 50;}`

r:
>#id:  `#myLabel #radius {r: 50;}`\
>.class: `.myClass #radius {r: 50;}`

text-anchor:
>#id:  `#myLabel #text {text-anchor: middle;}`\
>.class: `.myClass #text {text-anchor: middle;}`

letter-spacing:
>#id:  `#myLabel #text {letter-spacing: 5;}`\
>.class: `.myClass #text {letter-spacing: 5;}`

start-angle:
>#id:  `#myLabel #layout {start-angle: 90;}`\
>.class: `.myClass #layout {start-angle: 90;}`

sweep-angle:
>#id:  `#myLabel #layout {sweep-angle: 45;}`\
>.class: `.myClass #layout {sweep-angle: 45;}`


.ts/.js
___________________


text:
> `myLabel.text = "myText"`

font-family:
> `myLabel.style.fontFamily = "Sytem-Regular";`

font-size:
> `myLabel.style.fontSize = 20;`

fill:
> `myLabel.style.fill = "red";`

opacity:
> `myLabel.style.opacity = 0.2;`

display:
> `myLabel.style.display = "none";`

x,y:
>`myLabel.x = 50;`\
>`myLabel.y = 50;`

r:
> `not appliable here`

text-anchor:
> `not appliable here`

letter-spacing:
> `not appliable here`

start-angle:
> `myLabel.startAngle`

sweep-angle:
> `not appliable here`
