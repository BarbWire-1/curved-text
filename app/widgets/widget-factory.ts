// Widget factory
//@ts-nocheck
import document from "document";

export interface WidgetFactory {
  registerContainer(...elements: ElementSearch[]): void;
}

export interface WidgetSearch {    // similar to ElementSearch
  getWidgetById(id:string): GraphicsElement;  // it might be safer to use a virtual base class for all widget types
}

export type WidgetDocumentModule = typeof document & WidgetSearch;

export type WidgetElementSearch = Element & WidgetSearch;

const widgets = []    // each entry is {name:name, construct:constructorFunction}

export const widgetFactory = (widgetArray) => {
  if (widgetArray) widgetArray.forEach(widget => {
    const widgetRego = widget()
    widgets.push(widgetRego)
  })

  const getWidgetById = (containerEl, id) => {
    //console.log(`looking for ${id}`)
    const widgetEl = containerEl.getElementById(id);
    const widgetName = widgetEl.class.split(' ',1)[0];  // assume that the first name is the widget type
    //console.log(`name='${widgetName}'`)
    let widget;
    widgets.every(
      widgetRego => {
        if (widgetRego.name === widgetName) {
          // We pass the widgetFactory to construct() just in case the widget being constructed uses other widgets.
          // It would also be possible to pass an object containing widget-specific construction args (eg, {maxValue:100}),
          // but this would be inconsistent with the normal Fitbit way of doing things.
          widget = widgetRego.construct(widgetEl, factoryObject);
          return false;  // stop iterating
        } else
          return true;
      }
    );
    return widget;
  }

  const factoryObject = {
    // Could also implement getWidgetsByClassName, getWidgetsByWidgetName, etc
    registerContainer(...elements) {
      // Add methods equivalent to Fitbit's ElementSearch interface to elements.
      // This function can be called multiple times to register different containers, if need be.
      // elements: one or more SVG elements.
      elements.every(
        el => {
          el.getWidgetById = id => getWidgetById(el, id);
          // Could also implement getWidgetsByClassName, etc.
        }
      );
    }
  }

  return factoryObject as WidgetFactory;
}