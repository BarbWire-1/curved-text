Interface Usage Examples
-
Rules:\
 :)
* Each example should have a heading that indicates *attribute* and *interface type* (taken from interface.xlsx); *eg*, "text via SVG".
* Where multiple files are required, indicate the type of file in each case.


SVG
=
text via SVG:
   >`<use id="classxId" href="#curvedText" >`
      >>`<set href="#text" attributeName="text-buffer" to="Widget One" />`

font-family via SVG:
   >`<use id="classxId" href="#curvedText" font-family="Tungsten-Medium" >`

font-size via SVG:
   >`<use id="classxId" href="#curvedText" font-size="10" >`

fill via SVG:
  >`<use id="classxId" href="#curvedText" fill="red" >`

opacity via SVG:
  >`<use id="classxId" href="#curvedText" opacity="0.1" fill="white" >`

display via SVG:
>`<use id="classxId" href="#curvedText" display="none" fill="white" >`

x via SVG:
>`<use id="classxId" href="#curvedText" x="50" >`

y via SVG:
>`<use id="classxId" href="#curvedText" y="50" >`

r via SVG:
>`<use id="classxId" href="#curvedText" fill="white" >`
>>`<set href="#radius" attributeName="r" to="25" />`

text-anchor via SVG:
>`<use id="classxId" href="#curvedText" fill="white" >`
>>`<set href="#text" attributeName="text-anchor" to="start" />`

letter-spacing via SVG:
>`<use id="classxId" href="#curvedText" fill="white" >`
>>`<set href="#text" attributeName="letter-spacing" to="10" />`

start-angle via SVG:
>`<use id="classxId" href="#curvedText" fill="white" >`
>>`<set href="#layout" attributeName="start-angle" to="90" />`

sweep-angle via SVG:
>`<use id="classxId" href="#curvedText" fill="white" >`
>>`<set href="#layout" attributeName="sweep-angle" to="20" />`

class via SVG:
>`<use id="classxId" href="#curvedText" >`
>>`<set href="#text" attributeName="class" to="classx" />`

CSS
=
text via CSS
>#id:  `not appliable here`\
>.class: `not appliable here`

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
>#id:  `not applicable here?`\
>.class: `not applicable here?`

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
=
text via .ts/.js
>#id: `myLabel.text = "myText"`\
>.class: `myClass.forEach(el => (el as TextElement).text="myClassText");`\

x,y via .ts/.js
>myLabel.x = 50;