//@ts-nocheck
import document from "document"
import { widgetFactory } from './widgets/widget-factory'
import { curvedText } from './widgets/curved-text'

/*---------------------------------------------------------------------------------------------------------------------------------*/
//Initialise widget system
widgetFactory(curvedText);

//Create curved-text widgets
const myLabel1 = document.getElementById('myLabel1');

//create class
const myClass = document.getElementsByClassName('myClass');

//Change some attributes
myLabel1.style.fill = "orange";
//myLabel2.text = '*your - text*';
