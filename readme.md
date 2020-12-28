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
 Each mode features the 3 text-anchor positions, which get applied at 0° (center top):
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

...

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