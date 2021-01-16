//@ts-nocheck
import document from "document"
import { widgetFactory } from './widgets/widget-factory'
import { curvedText } from './widgets/curved-text'

/*---------------------------------------------------------------------------------------------------------------------------------*/
//Initialise widget system
const widgets = widgetFactory([curvedText]);
widgets.registerContainer(document);   // adds getWidgetById() to document
/*
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
*/
//Create curved-text widgets
const myLabel1 = document.getWidgetById('myLabel1');
const myLabel2 = document.getWidgetById('myLabel2');
const myLabel3 = document.getWidgetById('myLabel3');
const myLabel4 = document.getWidgetById('myLabel4');

//create class
const myClass = document.getElementsByClassName('myClass');
/* TODO G if not defined in index.view:
*"TypeError: Cannot read property 'class' of null
*? at app/widgets/widget-factory.ts:28,11
*? at app/widgets/widget-factory.ts:54,36
*? at app/index.js:14,16"
* not so for .getWidgetById()
*/

//Change some attributes 
myLabel1.style.fill = "orange";
//myLabel2.text = '*widget-factory*';
