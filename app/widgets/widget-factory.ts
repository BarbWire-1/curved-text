// Widget factory
// This module attempts to make widget usage seem more 'normal'; ie, similar to a built-in element or component.

import document from "document";

export const widgetFactory = (...args) => {
  // Constructs widgets of specified type(s).
  // args: optionally an ElementSearch element within which to search for widgets, followed by one or more functions that return {name:nameString, construct:constructorFunction}
  // If an ElementSearch element isn't provided, the whole of document will be searched.
  // Examples:
  //    widgetFactory(curvedText, barGraph);  // creates all curvedText and barGraph widgets in document
  //    widgetFactory(myInnerGroup, curvedText, barGraph);  // creates all curvedText and barGraph widgets in myInnerGroup
  // widgetFactory is a closure, so its internal variables and functions are not directly accessible to external code.

  let searchElement = document;   // the element within which to search for widget instances
  let firstWidgetIndex = 0;       // the first index into args that refers to a widget type

  if (typeof args[0] === 'object') {  // assume the object is an ElementSearch (widgets will be 'function')
    searchElement = args[0];
    firstWidgetIndex = 1;
  }

  // Construct widgets of all types specified in args:
  for (let i = firstWidgetIndex; i < args.length; i++) {
    const widgetRego = args[i]();   // get the registration info for this widget
    const instances = searchElement.getElementsByTypeName(widgetRego.name); // warning: this picks up widgets within widgets
    instances.forEach(el => {   // construct all widgets of this type
      el.class = el.class; // This shouldn't do anything, but seems to cause CSS rules to be reapplied. Without it, CSS selectors such as "#id #radius" don't work.
      widgetRego.construct(el); // construct a widget instance by adding properties and functions to el
    });
  }
}
