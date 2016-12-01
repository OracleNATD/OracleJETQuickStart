/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";

/**
 * Copyright (c) 2016, Oracle and/or its affiliates.
 * All rights reserved.
 */
define(['ojs/ojcore', 'jquery'], function(oj, $)
{
/**
 * This class contains all utility methods used by the data grid colelction model.
 * @export
 */
oj.DataCollectionEditUtils = {};

/**
 * @export
 * @param {Event} event
 * @param {Object} ui
 * @returns {boolean}
 */
oj.DataCollectionEditUtils.basicHandleEditEnd = function(event, ui)
{
    var input, cancel, widgetConstructor;
    input = $(ui['cellContext']['parentElement']).find('.oj-component-initnode')[0];
    widgetConstructor = oj.Components.getWidgetConstructor(input);
    cancel = ui['cancelEdit'];
    if (cancel)
    {
        // an escape key was pressed so reset the data before we lose focus on the input
        widgetConstructor('reset');
    }     
    else                        
    {   
        widgetConstructor('validate');
        if (!widgetConstructor('isValid'))
        {
            // not valid so do not allow edit to end
            return false;
        }
    }
    return true;
};

/**
 * 
 * @property {Event} event <code class="prettyprint">jQuery</code> event object
 * @property {Object} ui Parameters
 * @property {Object} ui.rowContext the row context
 * @property {number} ui.cancelEdit whether the edit was cancelled
 * @return {boolean} Whether to veto the event
 * @export
 * @expose
 * @memberof! oj.DataCollectionEditUtils
 * @instance
 */
oj.DataCollectionEditUtils.basicHandleRowEditEnd = function(event, ui)
{
    var i, cancel, widgetConsructor ;
    var inputComponents = $(ui['rowContext']['parentElement']).find('.oj-component-initnode');
    for (i = 0; i < inputComponents.length; i++)
    {
      widgetConsructor = oj.Components.getWidgetConstructor(inputComponents[i]);
      cancel = ui['cancelEdit'];
      try
      {
        if (cancel)
        {
            // an escape key was pressed so reset the data before we lose focus on the input
            widgetConsructor('reset');
        }     
        else                        
        {   
            widgetConsructor('validate');
            if (!widgetConsructor('isValid'))
            {
                // not valid so do not allow edit to end
                return false;
            }
        }
      }
      catch(e)
      {
      }
    }
    return true;
};
});
