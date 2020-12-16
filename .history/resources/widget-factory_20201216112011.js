// Widget factory

const widgets = []    // each entry is {name:name, construct:constructorFunction}

export default (widgetArray) => {
  if (widgetArray) widgetArray.forEach(widget => {
    const widgetRego = widget()
    widgets.push(widgetRego)
  })

  const getWidgetById = (containerEl, id) => {
    const widgetEl = containerEl.getElementById(id)
    const widgetName = widgetEl.class
    let widget
    console.log(`widgets=${widgets}`)
    widgets.every(
      widgetRego => {
        if (widgetRego.name === widgetName) {
          // We pass the widgetFactory to construct() just in case the widget being constructed uses other widgets.
          // It would also be possible to pass an object containing widget-specific construction args (eg, {maxValue:100}),
          // but this would be inconsistent with the normal Fitbit way of doing things.
          widget = widgetRego.construct(widgetEl, widgetFactory)   // TODO 0 'this' may not work in this context
          return false  // stop iterating
        } else
          return true
      }
    )
    return widget
    console.log(widget)
  }

  const widgetFactory = {
    // Could also implement getWidgetsByClassName, getWidgetsByWidgetName, etc
    registerContainer(...elements) {
      // Add methods equivalent to Fitbit's ElementSearch interface to elements.
      // This function can be called multiple times to register different containers, if need be.
      // elements: one or more SVG elements.
      elements.every(
        el => {
          el.getWidgetById = id => getWidgetById(el, id)
          // Could also implement getWidgetsByClassName, etc.
        }
      )
    }
  }

  return widgetFactory
}