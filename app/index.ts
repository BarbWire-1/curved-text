// This is index.ts before it was turned into index.js

import document from "document"
import { WidgetSearch, WidgetDocumentModule, WidgetElementSearch, widgetFactory } from './widgets/widget-factory'
import { CurvedTextWidget, curvedText } from './widgets/curved-text'
import clock from "clock"

/*---------------------------------------------------------------------------------------------------------------------------------*/
//Initialise widget system
const widgets = widgetFactory([curvedText]);
widgets.registerContainer(document);   // adds getWidgetById() to document
const widgetDocument = document as WidgetDocumentModule;


/*
let classx: CurvedTextWidget, classy: CurvedTextWidget;


classx = (document as WidgetDocumentModule).getWidgetById('classxId') as CurvedTextWidget
classy = (document as WidgetDocumentModule).getWidgetById('classyId') as CurvedTextWidget

// TS:We can avoid saying '(document as WidgetDocumentModule).getWidgetById' like this:
const widgetDocument = document as WidgetDocumentModule;
classx = widgetDocument.getWidgetById('classxId');
classy = widgetDocument.getWidgetById('classyId');
const myElement = widgetDocument.getElementsByClassName('sectionId');  // widgetDocument can be used wherever document can be used (maybe)

// TS: Using getWidgetById on a non-document element:
const sectionEl = document.getElementById('sectionId') as WidgetElementSearch;
widgets.registerContainer(sectionEl);   // adds getWidgetById() to sectionEl
classx = sectionEl.getWidgetById('classxId');
classx.text = 'sect';
classy = sectionEl.getWidgetById('classyId');

// The declarations below should work in vanilla js:
//const classx = document.getWidgetById('classxId')
//const classy = document.getWidgetById('classyId')


classx.anchorAngle = 180;
classy.text = 'W.W.W.W.W.W.i';  // interestingly, this is declared in the interface for Element
//classy.style.fill = 'red'; // shows that members inherited via 'extends GraphicsElement' work

const classxWidgets = document.getElementsByClassName('classx');
const classyWidgets = document.getElementsByClassName('classy');
*/


//Create curved-text widgets
const myLabel1 = widgetDocument.getWidgetById('myLabel1');
const myLabel2 = widgetDocument.getWidgetById('myLabel2');
const myLabel3 = widgetDocument.getWidgetById('myLabel3');
const myLabel4 = widgetDocument.getWidgetById('myLabel4');

//create class
const myClass = document.getElementsByClassName('myClass');
/* TODO G if not defined in index.view:
*"TypeError: Cannot read property 'class' of null
*? at app/widgets/widget-factory.ts:28,11
*? at app/widgets/widget-factory.ts:54,36
*? at app/index.js:14,16"
* not so for .getWidgetById()
*/

//Change some attributes //TODO G These settings only "trump" if dynamically changed on runtime? Not onload? Needs to be documented, if?
myLabel1.style.fill = "orange";
//myLabel2.text = '*widget-factory*';









