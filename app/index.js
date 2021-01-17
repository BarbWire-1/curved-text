//@ts-nocheck
import document from "document"
import { widgetFactory } from './widgets/widget-factory'
import { curvedText } from './widgets/curved-text'

/*---------------------------------------------------------------------------------------------------------------------------------*/
//Initialise widget system
const widgets = widgetFactory([curvedText]);
widgets.registerContainer(document);   // adds getWidgetById() to document

//Create curved-text widgets
const myLabel1 = document.getWidgetById('myLabel1');
const myLabel2 = document.getWidgetById('myLabel2');
const myLabel3 = document.getWidgetById('myLabel3');
const myLabel4 = document.getWidgetById('myLabel4');

//create class
const myClass = document.getElementsByClassName('myClass');


//Change some attributes 
myLabel1.style.fill = "orange";
//myLabel2.text = '*your - text*';
