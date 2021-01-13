
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

// The declarations below should work in vanilla js:
//classx = document.getWidgetById('classxId');
//classy = document.getWidgetById('classyId');


classy.anchorAngle = 90;
classy.text = 'W.W.W.W.W.W.i';  // interestingly, this is declared in the interface for Element
//classy.style.fill = 'red'; // shows that members inherited via 'extends GraphicsElement' work

const classxWidgets = document.getElementsByClassName('classx');
const classyWidgets = document.getElementsByClassName('classy');












