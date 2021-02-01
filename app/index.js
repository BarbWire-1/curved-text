//@ts-nocheck
import document from "document"
import { widgetFactory } from './widgets/widget-factory'
import { curvedText } from './widgets/curved-text'

/*---------------------------------------------------------------------------------------------------------------------------------*/
//Initialise widget system
widgetFactory(curvedText);               // TODO B no need for array; no return value
//widgets.registerContainer(document);   // TODO B not required any more

//Create curved-text widgets
const myLabel1 = document.getElementById('myLabel1');    // TODO B no need for getWidgetById()
//const myLabel2 = document.getWidgetById('myLabel2');   // TODO B not required any more
//const myLabel3 = document.getWidgetById('myLabel3');   // TODO B not required any more
//const myLabel4 = document.getWidgetById('myLabel4');   // TODO B not required any more

//create class
const myClass = document.getElementsByClassName('myClass'); // TODO B this still returns two elements, even though getWidgetById() wasn't called for all. Class is now set on <use> CONSISTENTLY :)

//Change some attributes
myLabel1.style.fill = "orange";
//myLabel2.text = '*your - text*';
