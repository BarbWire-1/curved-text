Interface Usage Examples
-
Rules:
* Each example should have a heading that indicates *attribute* and *interface type* (taken from interface.xlsx); *eg*, "text via SVG".
* Where multiple files are required, indicate the type of file in each case.

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

