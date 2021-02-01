// Widget factory
// This module attempts to make widget usage seem more 'normal'; ie, similar to a built-in element or component.

import document from "document";

export const widgetFactory = (...args) => {
  // Constructs widgets of specified type(s).
  // args: optionally an ElementSearch element within which to search for widgets, followed by one or more functions that return {name:nameString, construct:constructorFunction}
  // If an ElementSearch element isn't provided, the whole of document will be searched.
  // widgetFactory is a closure, so its internal variables and functions are not directly accessible to external code.

  let searchElement = document;
  let firstWidgetIndex = 0;

  if (typeof args[0] === 'object') {  // assume the object is an ElementSearch (widgets will be 'function')
    searchElement = args[0];
    firstWidgetIndex = 1;
  }

  // Construct widgets:
  for (let i = firstWidgetIndex; i < args.length; i++) {
    const widgetRego = args[i]();   // get the registration info for this widget
    const instances = searchElement.getElementsByTypeName(widgetRego.name); // this picks up widgets within widgets
    instances.forEach(el => {widgetRego.construct(el);});
  }
}
