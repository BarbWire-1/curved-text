typescript interfaces
-

Use the following imports to obtain widget-specific interfaces and type definitions (in addition to the objects themselves):

`import { WidgetSearch, WidgetDocumentModule, WidgetElementSearch, widgetFactory } from './widgets/widget-factory'`\
`import { CurvedTextWidget, curvedText } from './widgets/curved-text'`

You can declare curved-text widgets to be of the appropriate type like this:

`let classx: CurvedTextWidget;`

You can typecast the `document` object to access the widget system:

`classx = (document as WidgetDocumentModule).getWidgetById('classxId') as CurvedTextWidget;`

You can avoid saying `(document as WidgetDocumentModule).getWidgetById` like this:

`const widgetDocument = document as WidgetDocumentModule;`\
`classx = widgetDocument.getWidgetById('classxId');`

If you do this, you can use `widgetDocument` to access document properties as normal; eg:

`const myElement = widgetDocument.getElementsByClassName('sectionId');`

Using `getWidgetById()` on a non-document element:

`const sectionEl = document.getElementById('sectionId') as WidgetElementSearch;`\
`widgets.registerContainer(sectionEl);   // adds getWidgetById() to sectionEl`\
`classx = sectionEl.getWidgetById('classxId');`