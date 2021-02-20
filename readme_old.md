curved-text
=

**curved-text** is a widget for **Fitbit OS** using inbuilt fonts to create curved texts.\
You can use it under `vanilla javascript` (studio or CLI) as well as running `typescript`.

Supported by the **widget-factory**, it enables you to create multiple curved texts.
You can individually define the dimensons of `circles`, the texts gets curved at, as well as all `text-` and `font-properties` and `attributes`.

!<div align="center">![examples](doco/examples.png#center)</div>






Modes
-
There are two different `modes` of curving text:
* In default mode `auto` the characters´ widths get calculated by getBBox(), which determines the position of each in relation to those around it.
* In mode `fix` you can rotate the characters by `sweep-angle` which then rotates the characters per += sweep-angle, which is less consuming, as no getBBox() is needed.

(Setting `sweep-angle` automatically switches to mode `fix`.)

Settings
-
Almost all set-up and manipulation at runtime of your `curved text` work as you are used to from working with **fitbit OS**  built-in elements.

To ensure high flexibility, most attributes/properties can be set in
 * SVG
 * CSS (by id or class)
 * .ts/.js (at runtime)

Setting the radius r < 0 switches the appearance of your text to bottom-curved.

Due to the structure of the `<use>` which represents your curved-text element, there are a few cases in which you'll need a `<set>` in SVG or specified selectors in CSS. For available attributes/properties and how to set/call, please see the table at the end of [installation and usage](doco/usage.md). There you'll also find instructions for installing and getting started.


(For detailed examples of usage and syntax, please have a look at the [syntax attachment](doco/snippets.md).)

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

[curved-text-demo](https://github.com/BarbWire-1/curved-text-demo)\
!<div align="center">![demo](doco/curved_text_demo2.gif#center)</div>

For information on `installation` and `usage`, please follow this link:
[installation and usage](doco/usage.md).

If you're curious about how the code files in this clockface work together to let you create and manipulate widgets, see [How the Widget Factory Works](doco/how-the-factory-works.md).

If you would like to know how to turn your own elements into a reusable component, see [How to Make a Widget](doco/how-to-widget.md).