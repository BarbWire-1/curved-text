//@ts-nocheck

// Widget factory
// This module attempts to make widget usage seem more 'normal'; ie, similar to a built-in element or component.

import document from "document";

export interface WidgetFactory {
  registerContainer(...elements: ElementSearch[]): void;
  // We could also implement getWidgetsByClassName, getWidgetsByWidgetName, etc.
}

export interface WidgetSearch {    // similar to ElementSearch; gets applied to any element passed to registerContainer()
  getWidgetById(id:string): GraphicsElement;  // it might be safer to use a virtual base class for all widget types
}

export type WidgetDocumentModule = typeof document & WidgetSearch;  // what you get if you pass document to registerContainer()

export type WidgetElementSearch = Element & WidgetSearch;   // what you get if you pass an Element to registerContainer

const widgets = []    // each entry is {name:nameString, construct:constructorFunction}

export const widgetFactory = (widgetArray) => {
  // widgetArray: an array of functions that return {name:nameString, construct:constructorFunction}.
  // Returns an object that provides a function (registerContainer) to allow document (etc) to create widgets.
  // This function is a closure, so its internal variables and functions are not directly accessible to external code.
  // Only the returned object (factoryObject) can be directly accessed externally.

  // Add to the array of widgets:
  if (widgetArray) widgetArray.forEach(widget => {
    const widgetRego = widget();   // get the registration info for this widget
    widgets.push(widgetRego);
  });

  const getWidgetById = (containerEl, id) => {
    // Find a widget element by id, determine what type (class) of widget it is, construct a js object of that type, and return it.
    // containerEl: element to be searched for the widget; must implement ElementSearch (eg, document, svg, section, g).
    // id: the id string of the <use> element of the widget.
    // Returns a widget object, or null if id not found, or undefined if widget type not found.

    const widgetEl = containerEl.getElementById(id);    // find the <use> element
    if (!widgetEl) return null;

    const widgetName = widgetEl.class.split(' ',1)[0];  // assume that the first name is the widget type
    let widget;
    widgets.every(              // look through the array of known widget types for one with the className of the <use>
      widgetRego => {
        if (widgetRego.name === widgetName) {
          // Below, we pass the factoryObject to construct() just in case the widget being constructed uses other widgets.
          // It would also be possible to pass an object containing widget-specific construction args (eg, {maxValue:100}),
          // but this would be inconsistent with the normal Fitbit way of doing things.
          widget = widgetRego.construct(widgetEl, factoryObject); // convert widgetEl into an object of the right type for this class of widget
          return false;  // stop looking
        } else
          return true;   // keep looking
      }
    );
    return widget;
  }

  const factoryObject: WidgetFactory = {
    // This is the only member of widgetFactory that is externally accessible directly.

    registerContainer(...elements) {
      // Add methods equivalent to Fitbit's ElementSearch interface to elements.
      // This function can be called multiple times to register different containers, if need be.
      // elements: one or more SVG elements.
      elements.every(
        el => {
          el.getWidgetById = id => getWidgetById(el, id);
          // We could also implement getWidgetsByClassName, getWidgetsByWidgetName, etc.
        }
      );
    }
  }

  return factoryObject;
}