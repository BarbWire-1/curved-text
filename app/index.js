//@ts-nocheck
import document from "document"
import { widgetFactory } from './widgets/widget-factory'
import { curvedText } from './widgets/curved-text'

/*---------------------------------------------------------------------------------------------------------------------------------*/
//Initialise widget system
const widgets = widgetFactory([curvedText]);
widgets.registerContainer(document);   // adds getWidgetById() to document

//Create two curved-text widgets
let classx, classy;
classx = document.getWidgetById('classxId');
classy = document.getWidgetById('classyId');

//Change some attributes
classx.anchorAngle = 180;
classy.text = 'W.W.W.W.W.W.i';

// TODO B 2 do we want the lines below??
const classxWidgets = document.getElementsByClassName('classx');
const classyWidgets = document.getElementsByClassName('classy');
