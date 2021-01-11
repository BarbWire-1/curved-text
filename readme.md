curved-text
=
(under construction!)\
\
`curved-text` is a widget for `Fitbit OS` using inbuilt fonts to create curved texts.

Supported by the `widget-factory`, it enables you to create multiple curved texts, which properties and attributes can be set independantly per `id` or gathered per `class`.

Attributes to define the circle your text gets curved at:
 -
 * x 
 * y
 * r

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

 To rotate the whole text
 -
 * start-angle

 In the default `auto-mode`, the position of each char gets calculated by it´s width (using getBBox()), plus additional letter-spacing if set.

If 
 * sweep-angle\
 is set, it switches to `fix-mode` where each character gets rotated by the chosen fix += angle.

 To support high flexibility, most attributes/properties can be set in
 * SVG
 * CSS
 * .ts/.js
 and can be changed on runtime.

 The `<use>` elements can be animated like other SVGElements.

For information on `installation` and `how-to-use`, please follow this link:



 