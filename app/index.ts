import document from "document"
import {me} from "appbit"
import { user } from "user-profile"
import { me as device } from "device"
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
//const classx = document.getWidgetById('classxId')
//const classy = document.getWidgetById('classyId')
classy.anchorAngle = 0;
classy.text = 'W.W.W.W.W.W.i';  // interestingly, this is declared in the interface for Element
classy.style.fill = 'red'; // shows that members inherited via 'extends GraphicsElement' work
//classx.style.display = 'inline'
//classy.anchorAngle = 0
const classxWidgets = document.getElementsByClassName('classx');
const classyWidgets = document.getElementsByClassName('classy');

//const classxId = (document as WidgetDocumentModule).getWidgetById('classxId');
//classyWidgets.forEach(el => console.log(`found el with class='${el.class}'`)) // if you could call by class only, could fix texts just be written in css/svg ?
//classxWidgets.forEach(el => console.log(`found el with class='${el.class}'`))
//classxWidgets.forEach(el => (el as TextElement).text="class.text")
//classx.y = 250
//classxWidgets.forEach(el => (el as TextElement).style.fontFamily="Tungsten-Medium")
//classx.startAngle = 90;

//classy.startAngle = 135









