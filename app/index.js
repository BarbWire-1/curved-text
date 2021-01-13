//@ts-nocheck
import document from "document"
import {widgetFactory} from './widgets/widget-factory'
import {curvedText} from './widgets/curved-text'
import clock from "clock"

/*---------------------------------------------------------------------------------------------------------------------------------*/
//Initialise widget system
const widgets = widgetFactory([curvedText]);
widgets.registerContainer(document);   // adds getWidgetById() to document

let classx, classy;

classx = document.getWidgetById('classxId');
classy = document.getWidgetById('classyId');

classy.anchorAngle = 90;
classy.text = 'W.W.W.W.W.W.i';  // interestingly, this is declared in the interface for Element
//classy.style.fill = 'red'; // shows that members inherited via 'extends GraphicsElement' work

const classxWidgets = document.getElementsByClassName('classx');
const classyWidgets = document.getElementsByClassName('classy');










