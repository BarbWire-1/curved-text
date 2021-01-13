
import document from "document"
import { WidgetSearch, WidgetDocumentModule, WidgetElementSearch, widgetFactory } from './widgets/widget-factory'
import { CurvedTextWidget, curvedText } from './widgets/curved-text'
import clock from "clock"

/*---------------------------------------------------------------------------------------------------------------------------------*/
//Initialise widget system
const widgets = widgetFactory([curvedText]);
widgets.registerContainer(document);   // adds getWidgetById() to document



let classx: CurvedTextWidget, classy: CurvedTextWidget;


classx = (document as WidgetDocumentModule).getWidgetById('classxId') as CurvedTextWidget
classy = (document as WidgetDocumentModule).getWidgetById('classyId') as CurvedTextWidget

/*// TS:We can avoid saying '(document as WidgetDocumentModule).getWidgetById' like this:
const widgetDocument = document as WidgetDocumentModule;
classx = widgetDocument.getWidgetById('classxId');
classy = widgetDocument.getWidgetById('classyId');
const myElement = widgetDocument.getElementsByClassName('sectionId');  // widgetDocument can be used wherever document can be used (maybe)
*/
/*// TS: Using getWidgetById on a non-document element:
const sectionEl = document.getElementById('sectionId') as WidgetElementSearch;
widgets.registerContainer(sectionEl);   // adds getWidgetById() to sectionEl
classx = sectionEl.getWidgetById('classxId');
classx.text = 'sect';
classy = sectionEl.getWidgetById('classyId');
*/
// The declarations below should work in vanilla js:
//const classx = document.getWidgetById('classxId')
//const classy = document.getWidgetById('classyId')


classx.anchorAngle = 180;
classy.text = 'W.W.W.W.W.W.i';  // interestingly, this is declared in the interface for Element
//classy.style.fill = 'red'; // shows that members inherited via 'extends GraphicsElement' work

const classxWidgets = document.getElementsByClassName('classx');
const classyWidgets = document.getElementsByClassName('classy');












