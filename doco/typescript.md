typescript interfaces
-

Use the following import to obtain a widget-specific interface (type definition), in addition to the widget object itself:

`import { CurvedTextWidget, curvedText } from './widgets/curved-text'`

You can declare curved-text widgets to be of the appropriate type like this:

`let myLabel1: CurvedTextWidget;`

Alternatively, you can specify their type when you get an object that represents them:

`let myLabel1 = document.getElementById("myLabel1") as CurvedTextWidget;`