Interface Usage Examples
-
Rules:
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

r via SVG:
>`<use id="classxId" href="#curvedText" fill="white" >`
>>`<set href="#position" attributeName="r" to="25" />`

text-anchor via SVG:
>`<use id="classxId" href="#curvedText" fill="white" >`
>>`<set href="#text" attributeName="text-anchor" to="start" />`

letter-spacing via SVG:
>`<use id="classxId" href="#curvedText" fill="white" >`
>>`<set href="#text" attributeName="letter-spacing" to="10" />`

start-angle via SVG:
>`<use id="classxId" href="#curvedText" fill="white" >`
>>`<set href="#orientation" attributeName="start-angle" to="90" />`

sweep-angle via SVG:
>`<use id="classxId" href="#curvedText" fill="white" >`
>>`<set href="#orientation" attributeName="sweep-angle" to="20" />`

class via SVG:
>`<use id="classxId" href="#curvedText" >`
>>`<set href="#text" attributeName="class" to="classx" />`

CSS
=
text via CSS
>#id:  `not appliable here`\
>.class: `not appliable here`

font-family via CSS
>#id: `#ID {font-family: Fabrikat-Regular;}`\
>.class: `.className {font-family: Fabrikat-Regular;}`

font-size via CSS
>#id: `#ID {font-size: 30;}`\
>.class: `.className {font-size: 30;}`

opacity via CSS
>#id: `#ID {opacity: 0.5};`\
>.class: `.className {opacity: 0.5;}`

display via CSS
>#id: `#ID {display: none};`\
>.class: `.className {display: none;}`

cx,cy via CSS
>#id:  `not applicable here`\
>.class: `not applicable here`

r via CSS
>#id:  `not applicable here`\
>.class: `not applicable here`

text-anchor via CSS
>#id:  `not applicable here`\
>.class: `not applicable here`

letter-spacing via CSS
>#id:  `not applicable here`\
>.class: `not applicable here`

sweep-angle via CSS
>#id:  `not applicable here`\
>.class: `not applicable here`


start-angle via CSS
>#id:  `not applicable here`\
>.class: `not applicable here`

.ts/.js 
=
text via .ts/.js
>#id: `ID.text = "myText"`\
>.class: `className.forEach(el => (el as TextElement).text="myClassText")`
