curved-text
=
(under construction!)\
\
**curved-text** is a widget for **Fitbit OS** using inbuilt fonts to create curved texts.

Supported by the **widget-factory**, it enables you to create multiple curved texts. In addition to setting attributes directly in SVG, properties and attributes can also be set individually per `id` or for multiple elements via `class`. In addition, some attributes can be changed in javascript via an API.

TODO B 2 ^ I expanded this, but think the whole para duplicates info above and below. Delete?

You can idividually define the dimensons of `circles`, the texts gets curved at, as well as all `text-` and `font-properties` and `attributes`.


!<div align="center">![demo](curved_text_demo2.gif#center)</div>

About
=
Modes
-
There are two different `modes` of curving text:
* In default mode `auto` the characters´ widths get calculated by getBBox(), which determines the position of each in relation to those around it.\
* In mode `fix` you can rotate the characters by `sweep-angle` which then rotates the characters per += sweep-angle, which is less consuming, as no getBBox() is needed.

(Setting `sweep-angle` automatically switches to mode `fix`.)

Settings
-
Almost all set-up and manipulation at runtime of your `textElements` work as you are used to from the **fitbit OS**.

To ensure high flexibility, most attributes/properties can be set in
 * SVG
 * CSS (by id or class)
 * .ts/.js (at runtime)

Setting the radius r < 0 switches the appearance of your text to bottom-curved.

Due to the structure of the `<symbol><use>` which represents the textElement, there are only a few expectations. For available attributes/properties and how to set/call, please see the table at the end of [installation and usage](usage.md). Here you also find detailed instructions for installing and getting started.

TODO B 2 ^ I didn't understand 'expectations' (or the whole first sentence, really)

TODO B 2 ^ not sure about 'textElement'. To me, this suggests a \<text>. Do you mean a curved-text?

(For extended examples of usage and syntax, please have a look at the [syntax attachment](snippets.md).)

Positioning
-
After you define the dimensions of the curve (x,y,r), `text-anchor` and `start-angle` let you position your textElement where and how you need it to be.

Animation
-
The `<use>` elements showing your curved text can be animated like other `SVG elements`.

---

...and now - CURVE IT!\
by BarbWire and Gondwana

(and RTFM! :slightly_smiling_face::vulcan_salute:)

For information on `installation` and `usage`, please follow this link:
[installation and usage](usage.md).





