curved-text
=
(under construction!)\
\
**curved-text** is a widget for **Fitbit OS** using inbuilt fonts to create curved texts.

Supported by the **widget-factory**, it enables you to create multiple curved texts, which properties and attributes can be set individually per `id` or for multiple elements via `class`.

You can idividually define the dimensons of `circles`, the texts gets curved at, as well as all `text-` and `font-properties` and `attributes`.


!<div align="center">![demo](curved_text_demo2.gif#center)</div>

About
=
Modes
-
There are two different `modes` of curving text.\
In default mode `auto` the characters´ widths get calculated by getBBox() and determine the position of each in relation.\
In mode `fix` you can rotate the characters by `sweep-angle` which then rotates the characters per += sweep-angle, wich is less consuming, as no getBBox() is needed.

(Setting `sweep-angle` automatically switches to mode `fix`.)

Settings
-
Almost all set-up and manipulation on runtime of your `textElements` do work as you are used to from the **fitbit OS**.


To ensure high flexibility, most attributes/properties can be set in
 * SVG
 * CSS
 * .ts/.js

 and can be changed on runtime.


Due to the structure of the `<symbol><use>` which represents the textElement, there are only a few expectations. (See the table at the end of [installation and usage](usage.md).)\
 Here you also find detailed instructions for installing and getting started.\
 
(For extended examples of usage and syntax, please have a look at the [syntax attachment](snippets.md).)

Positioning
-
After you defined the dimensons of the curve (x,y,r), `text-anchor` and `start-angle` let you position your textElement where and how you need it to be.

Animation
-
The `<use>` elements showing your curved text can be animated like other   `SVGElements`.

_

...and now - CURVE IT!\
by Gondwana and BarbWire 

(and RTFM! :slightly_smiling_face::vulcan_salute:)

_

For information on `installation` and `usage`, please follow this link:
[installation and usage](usage.md).





 