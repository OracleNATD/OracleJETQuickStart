/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(['./DvtToolkit', './DvtTimelineOverview'], function(dvt) {
  // Internal use only.  All APIs and functionality are subject to change at any time.

  // Map the D namespace to dvt, which is used to provide access across partitions.
  var D = dvt;
  
/** Copyright (c) 2011, Oracle and/or its affiliates. All rights reserved. */
var DvtTimeUtils = new Object();

DvtTimeUtils.supportsTouch = function()
{
  return DvtAgent.isTouchDevice();
};

DvtObj.createSubclass(DvtTimeUtils, DvtObj, 'DvtTimeUtils');


/**
 * startTime - the start time of timeline in millis
 * endTime - the end of the timeline in millis
 * time - the time in question
 * width - the width of the element
 *
 * @return the position relative to the width of the element
 */
DvtTimeUtils.getDatePosition = function(startTime, endTime, time, width)
{
  var number = (time - startTime) * width;
  var denominator = (endTime - startTime);
  if (number == 0 || denominator == 0)
    return 0;

  return number / denominator;
};


/**
 * @return time in millis
 */
DvtTimeUtils.getPositionDate = function(startTime, endTime, pos, width)
{
  var number = pos * (endTime - startTime);
  if (number == 0 || width == 0)
    return startTime;

  return (number / width) + startTime;
};
/**
 * This is the base class for all time based components (Gantt, Timeline).  It handles the following:
 * - all common attributes (start time, end time etc.)
 * - association with the generic overview component
 * - scrolling, including autoscroll
 * - creation of scrollable canvas
 * - zoom
 * - time axis (multiple)
 * - current time and highlighted time period
 *
 * @param {DvtContext} context The rendering context.
 * @param {object} callback The function that should be called to dispatch component events.
 * @param {object} callbackObj The object context for the callback function.
 * @class TimeBasedContainer component.
 * @constructor
 * @extends {DvtBaseComponent}
 * @export
 */
var DvtTimeComponent = function(context, callback, callbackObj) {
  this.Init(context, callback, callbackObj);
};

DvtObj.createSubclass(DvtTimeComponent, DvtBaseComponent, 'DvtTimeComponent');

DvtTimeComponent.BACKGROUND_ID = 'bg';

/**
 * Initializes the view.
 * @param {DvtContext} context The rendering context.
 * @param {object} callback The function that should be called to dispatch component events.
 * @param {object} callbackObj The object context for the callback function
 * @protected
 */
DvtTimeComponent.prototype.Init = function(context, callback, callbackObj) 
{
  DvtTimeComponent.superclass.Init.call(this, context);

  this._callback = callback;
  this._callbackObj = callbackObj;

  this._virtualize = false;
};


/**
 * Renders the component using the specified xml.  If no xml is supplied to a component
 * that has already been rendered, this function will rerender the component with the
 * specified size.
 * @param {string} xml The component xml.
 * @param {number} width The width of the component.
 * @param {number} height The height of the component.
 * @export
 */
DvtTimeComponent.prototype.render = function(width, height, options) 
{
  if (options)
    this.SetOptions(options);

  // Store the size
  this.Width = width;
  this.Height = height;

  // If new xml is provided, parse it and apply the properties
  if (this.Options)
  {
    var props = this.Parse(this.Options);
    this._applyParsedProperties(props);
  }
};

/**
 * @override
 */
DvtTimeComponent.prototype.SetOptions = function(options)
{
  this.Options = DvtJSONUtils.clone(options);
};

// adds a tick mark
DvtTimeComponent.prototype.addTick = function(container, x1, x2, y1, y2, stroke, id)
{
  var line = new DvtLine(this.getCtx(), x1, y1, x2, y2, id);
  line.setStroke(stroke);
  line.setPixelHinting(true);

  container.addChild(line);
  return line;
};

// add a label in time axis
DvtTimeComponent.prototype.addAxisLabel = function(container, label, x, y, maxLength)
{
  label.setX(x);
  label.setY(y);
  if (label.isTruncated())
    label.setTextString(label.getUntruncatedTextString());
  DvtTextUtils.fitText(label, maxLength, Infinity, container);

  // center align text
  label.alignCenter();
};

// add a label in series time axis
DvtTimeComponent.prototype.addLabel = function(container, pos, text, maxLength, y, labelStyle, id, renderBackground, labelPadding, labelList, isRTL)
{
  var label = new DvtOutputText(this.getCtx(), text, pos, 0, id);
  if (labelStyle != null)
    label.setCSSStyle(labelStyle);

  container.addChild(label);
  var dim = label.getDimensions();
  container.removeChild(label);
  y = y - dim.h;
  label.setY(y);
  if (isRTL)
    label.setX(pos - dim.w);

  if (renderBackground)
  {
    var width = Math.min(dim.w + labelPadding * 2, maxLength);
    if (!isRTL)
      var x = pos;
    else
      x = pos - width + 2 * labelPadding;
    var backgroundRect = new DvtRect(this.getCtx(), x - labelPadding, y - labelPadding, width, dim.h + labelPadding * 2, 'ob_' + id);
    backgroundRect.setCSSStyle(labelStyle);
    backgroundRect.setCornerRadius(3);
    container.addChild(backgroundRect);
    if (labelList)
      labelList.push(backgroundRect);
  }
  DvtTextUtils.fitText(label, maxLength, Infinity, container);
  if (labelList)
    labelList.push(label);

  return label;
};

DvtTimeComponent.prototype._applyParsedProperties = function(props)
{
  this._origStart = props.origStart;
  this._origEnd = props.origEnd;
  this._start = props.start;
  this._end = props.end;

  this._inlineStyle = props.inlineStyle;

  this._scale = props.scale;
  this._converter = props.converter;

  this.applyStyleValues();
};

/**
 * Combines style defaults with the styles provided
 *
 */
DvtTimeComponent.prototype.applyStyleValues = function()
{
  this._style.parseInlineStyle(this._inlineStyle);
};

//////////// attribute methods ////////////////////////////
DvtTimeComponent.prototype.isAnimationEnabled = function()
{
  return false;
};

DvtTimeComponent.prototype.getAdjustedStartTime = function() 
{
  return this._start;
};

DvtTimeComponent.prototype.getAdjustedEndTime = function() 
{
  return this._end;
};


/**
 * Returns the overall (virtualized) length of the content
 */
DvtTimeComponent.prototype.getContentLength = function() 
{
  return this._contentLength;
};

DvtTimeComponent.prototype.setContentLength = function(length)
{
  if (this._canvasLength < length)
    this._contentLength = length;
  else
    this._contentLength = this._canvasLength;

  if (!this._virtualize)
  {
    this._fetchStartPos = 0;
    this._fetchEndPos = this._contentLength;
  }
};

DvtTimeComponent.prototype.isRTL = function()
{
  return DvtAgent.isRightToLeft(this.getCtx());
};

/**
 * Returns whether the component has a vertical orientation.
 */
DvtTimeComponent.prototype.isVertical = function()
{
  return this._isVertical;
};

/////////////////// scrolling ////////////////////////////
DvtTimeComponent.prototype.setVScrollPos = function(pos) 
{
  if (this._canvas != null)
    this._canvas.setTranslateY(0 - pos);
};

DvtTimeComponent.prototype.setHScrollPos = function(pos) 
{
  if (this._canvas != null)
    this._canvas.setTranslateX(0 - pos);
};
var DvtTimeComponentAxis = function(context, callback, callbackObj, isVertical, zoomOrder, maxZoomOrder) {
  this.Init(context, callback, callbackObj, isVertical, zoomOrder, maxZoomOrder);
};

DvtObj.createSubclass(DvtTimeComponentAxis, DvtContainer, 'DvtTimeComponentAxis');

DvtTimeComponentAxis.DEFAULT_INTERVAL_WIDTH = 50;
DvtTimeComponentAxis.DEFAULT_INTERVAL_HEIGHT = 21;
DvtTimeComponentAxis.DEFAULT_INTERVAL_PADDING = 2;
DvtTimeComponentAxis.DEFAULT_BORDER_WIDTH = 1;
DvtTimeComponentAxis.DEFAULT_SEPARATOR_WIDTH = 1;

/**
 * Attribute for valid scales.
 * @const
 * @private
 */
DvtTimeComponentAxis._VALID_SCALES = ['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'quarters', 'years'];

DvtTimeComponentAxis.prototype.Init = function(context, callback, callbackObj, isVertical, zoomOrder, dateFormatStrings)
{
  DvtTimeComponentAxis.superclass.Init.call(this, context);

  this._calendar = new DvtTimeComponentCalendar();
  this._formatter = new DvtTimeComponentAxisFormatter(DvtTimeComponentAxisFormatter.SHORT, dateFormatStrings);
  if (isVertical)
    this._contentSize = DvtTimeComponentAxis.DEFAULT_INTERVAL_WIDTH;
  else
    this._contentSize = DvtTimeComponentAxis.DEFAULT_INTERVAL_HEIGHT;
  this._borderWidth = DvtTimeComponentAxis.DEFAULT_BORDER_WIDTH;
  this._zoomOrder = zoomOrder;
  this._dateToIsoConverter = context.getLocaleHelpers()['dateToIsoConverter'];
};

DvtTimeComponentAxis.prototype.setScale = function(scale)
{
  this._scale = scale;
};

DvtTimeComponentAxis.prototype.increaseScale = function()
{
  for (var s = 0; s < this._zoomOrder.length - 1; s++)
  {
    if (this._zoomOrder[s] == this._scale)
    {
      this._scale = this._zoomOrder[s + 1];
      return true;
    }
  }
  return false;
};

DvtTimeComponentAxis.prototype.decreaseScale = function()
{
  for (var s = 1; s < this._zoomOrder.length; s++)
  {
    if (this._zoomOrder[s] == this._scale)
    {
      this._scale = this._zoomOrder[s - 1];
      return true;
    }
  }
  return false;
};

DvtTimeComponentAxis.prototype.setConverter = function(converter)
{
  this._converter = converter;
};

DvtTimeComponentAxis.prototype.setDefaultConverter = function(defaultConverter)
{
  this._defaultConverter = defaultConverter;
};

DvtTimeComponentAxis.prototype.getContentSize = function()
{
  return this._contentSize;
};

DvtTimeComponentAxis.prototype.setContentSize = function(contentSize)
{
  if (contentSize > this._contentSize)
    this._contentSize = contentSize;
};

DvtTimeComponentAxis.prototype.getTimeAxisWidth = function()
{
  // read from skin?
  if (this._timeAxisWidth == null)
    this._timeAxisWidth = 30;

  return this._timeAxisWidth;
};

DvtTimeComponentAxis.prototype.setBorderWidth = function(borderWidth)
{
  this._borderWidth = borderWidth;
};

DvtTimeComponentAxis.prototype.getBorderWidth = function()
{
  return this._borderWidth;
};

DvtTimeComponentAxis.prototype.getSize = function()
{
  return this._contentSize + (this._borderWidth * 2);
};

DvtTimeComponentAxis.prototype.setType = function(type, dateFormatStrings)
{
  // create a new formatter based on the new type
  this._formatter = new DvtTimeComponentAxisFormatter(type, dateFormatStrings);
};

// utility method: find the closiest date to the time scale of the specified date
DvtTimeComponentAxis.prototype.adjustDate = function(date)
{
  return this._calendar.adjustDate(new Date(date), this._scale);
};

DvtTimeComponentAxis.prototype.getNextDate = function(time)
{
  return this._calendar.getNextDate(time, this._scale);
};

DvtTimeComponentAxis.prototype.formatDate = function(date)
{
  if (this._converter)
  {
    var converter;
    if (this._converter[this._scale])
      converter = this._converter[this._scale];
    else if (this._converter['default'])
      converter = this._converter['default'];
    else
      converter = this._converter;

    if (converter['format'])
      return converter['format'](this._dateToIsoConverter ? this._dateToIsoConverter(date) : date);
    else if (converter['getAsString'])
      return converter['getAsString'](date);
  }
  if (this._defaultConverter)
  {
    if (this._defaultConverter[this._scale])
    {
      converter = this._defaultConverter[this._scale];
      if (converter['format'])
        return converter['format'](this._dateToIsoConverter ? this._dateToIsoConverter(date) : date);
      else if (converter['getAsString'])
        return converter['getAsString'](date);
    }
  }
  return this._formatter.format(date, this._scale);
};

DvtTimeComponentAxis.prototype.getZoomOrder = function()
{
  return this._zoomOrder;
};

DvtTimeComponentAxis.prototype.setZoomOrder = function(zoomOrder)
{
  this._zoomOrder = zoomOrder;
};
var DvtTimeComponentAxisFormatter = function(type, locale) 
{
  this.Init(type, locale);
};

DvtObj.createSubclass(DvtTimeComponentAxisFormatter, DvtObj, 'DvtTimeComponentAxisFormatter');

DvtTimeComponentAxisFormatter.LONG = 0;
DvtTimeComponentAxisFormatter.SHORT = 1;

DvtTimeComponentAxisFormatter.prototype.Init = function(type, dateFormatStrings) 
{
  this._type = type;
  this._dateFormatStrings = dateFormatStrings;

  this._formats = [];
  this._formats[0] = new Object();
  this._formats[0]['seconds'] = 'HH:MM:ss';
  this._formats[0]['minutes'] = 'HH:MM';
  this._formats[0]['hours'] = 'HH:MM';
  this._formats[0]['days'] = 'dddd';
  this._formats[0]['weeks'] = 'm/dd';
  this._formats[0]['months'] = 'mmmm';
  this._formats[0]['quarters'] = 'mmmm';
  this._formats[0]['halfyears'] = 'yyyy';
  this._formats[0]['years'] = 'yyyy';
  this._formats[0]['twoyears'] = 'yyyy';

  this._formats[1] = new Object();
  this._formats[1]['seconds'] = 'HH:MM:ss';
  this._formats[1]['minutes'] = 'HH:MM';
  this._formats[1]['hours'] = 'HH:MM';
  this._formats[1]['days'] = 'm/dd';
  this._formats[1]['weeks'] = 'm/dd';
  this._formats[1]['months'] = 'mmm';
  this._formats[1]['quarters'] = 'mmm';
  this._formats[1]['halfyears'] = 'yy';
  this._formats[1]['years'] = 'yy';
  this._formats[1]['twoyears'] = 'yy';
};

/**
 * Change the format string for a particular time scale.
 *
 * @param scale
 * @param pattern - the format string
 */
DvtTimeComponentAxisFormatter.prototype.setPattern = function(scale, pattern)
{
  this._formats[this._type][scale] = pattern;
};

DvtTimeComponentAxisFormatter.prototype.format = function(date, scale)
{
  var mask = this._formats[this._type][scale];
  if (mask != null)
  {
    if (mask.indexOf(':') != -1)
      var separator = ':';
    else if (mask.indexOf('/') != -1)
      separator = '/';
    if (separator)
    {
      mask = mask.split(separator);
      var newString = this.getDateFormatValue(date, mask[0], false);
      for (var i = 1; i < mask.length; i++)
      {
        newString += separator + this.getDateFormatValue(date, mask[i], false);
      }
      return newString;
    }
    else
      return this.getDateFormatValue(date, mask, false);
  }
  else
    return date.toLocaleString();
};

/**
 * Gets the formatted date value corresponding to the desired mask.
 * Valid mask values are: 'ss', 'MM', 'HH', 'dd', 'dddd', 'm',
 * 'mmm', 'mmmm', 'yy', and 'yyyy'.
 * @param {Date} date The date object to be formatted.
 * @param {string} mask The format mask to be used.
 * @param {boolean} isUTC Whether UTC values should be used.
 * @return {string} The formatted date value.
 */
DvtTimeComponentAxisFormatter.prototype.getDateFormatValue = function(date, mask, isUTC)
{
  if (isUTC)
  {
    switch (mask)
    {
      case 'ss':
        var value = date.getUTCSeconds();
        if (value < 10)
          return '0' + value;
        else
          return value;
        break;

      case 'HH':
        value = date.getUTCHours();
        if (value < 10)
          return '0' + value;
        else
          return value;
        break;

      case 'MM':
        value = date.getUTCMinutes();
        if (value < 10)
          return '0' + value;
        else
          return value;
        break;

      case 'dd':
        value = date.getUTCDate();
        if (value < 10)
          return '0' + value;
        else
          return value;
        break;

      case 'dddd':
        return this._dateFormatStrings.dayNames[date.getUTCDay() + 7];
        break;

      case 'm':
        return date.getUTCMonth() + 1;
        break;

      case 'mmm':
        return this._dateFormatStrings.monthNames[date.getUTCMonth()];
        break;

      case 'mmmm':
        return this._dateFormatStrings.monthNames[date.getUTCMonth() + 12];
        break;

      case 'yy':
        return date.getUTCFullYear().toString().substring(2, 4);
        break;

      default:
        // 'yyyy' case
        return date.getUTCFullYear();
    }
  }
  else
  {
    switch (mask)
    {
      case 'ss':
        value = date.getSeconds();
        if (value < 10)
          return '0' + value;
        else
          return value;
        break;

      case 'HH':
        value = date.getHours();
        if (value < 10)
          return '0' + value;
        else
          return value;
        break;

      case 'MM':
        value = date.getMinutes();
        if (value < 10)
          return '0' + value;
        else
          return value;
        break;

      case 'dd':
        value = date.getDate();
        if (value < 10)
          return '0' + value;
        else
          return value;
        break;

      case 'dddd':
        return this._dateFormatStrings.dayNames[date.getDay() + 7];
        break;

      case 'm':
        return date.getMonth() + 1;
        break;

      case 'mmm':
        return this._dateFormatStrings.monthNames[date.getMonth()];
        break;

      case 'mmmm':
        return this._dateFormatStrings.monthNames[date.getMonth() + 12];
        break;

      case 'yy':
        return date.getFullYear().toString().substring(2, 4);
        break;

      default:
	// 'yyyy' case
        return date.getFullYear();
    }
  }
};
// todo: this should be used by Timeline also
var DvtTimeComponentCalendar = function(options) 
{
  this.Init(options);
};

DvtObj.createSubclass(DvtTimeComponentCalendar, DvtObj, 'DvtTimeComponentCalendar');

DvtTimeComponentCalendar.prototype.Init = function() 
{
  this._dayInMillis = 1000 * 60 * 60 * 24;
};

DvtTimeComponentCalendar.prototype.getFirstDayOfWeek = function()
{
  // sunday; locale based
  return 0;
};

DvtTimeComponentCalendar.prototype.adjustDate = function(date, scale)
{
  var _adjustedDate = new Date(date.getTime());
  if (scale == 'weeks')
  {
    _adjustedDate.setHours(0, 0, 0);
    var roll_amt = (date.getDay() - this.getFirstDayOfWeek() + 7) % 7;
    if (roll_amt > 0)
      _adjustedDate.setTime(_adjustedDate.getTime() - roll_amt * this._dayInMillis);
  }
  else if (scale == 'months')
  {
    _adjustedDate.setDate(1);
  }
  else if (scale == 'days')
  {
    _adjustedDate.setHours(0, 0, 0);
  }
  else if (scale == 'hours')
  {
    _adjustedDate.setMinutes(0, 0, 0);
  }
  else if (scale == 'minutes')
  {
    _adjustedDate.setSeconds(0, 0);
  }
  else if (scale == 'seconds')
  {
    _adjustedDate.setMilliseconds(0);
  }
  else if (scale == 'quarters')
  {
    _adjustedDate.setDate(1);
    roll_amt = 2 - (date.getMonth() + 11) % 3;
    if (roll_amt > 0)
      _adjustedDate.setMonth(_adjustedDate.getMonth() + roll_amt);
  }
  else if (scale == 'halfyears')
  {
    _adjustedDate.setDate(1);
    roll_amt = 5 - (date.getMonth() + 11) % 6;
    if (roll_amt > 0)
      _adjustedDate.setMonth(_adjustedDate.getMonth() + roll_amt);
  }
  else if (scale == 'years')
  {
    _adjustedDate.setMonth(0);
    _adjustedDate.setDate(1);
  }
  else if (scale == 'twoyears')
  {
    _adjustedDate.setMonth(0);
    _adjustedDate.setDate(1);
  }

  return _adjustedDate;
};

DvtTimeComponentCalendar.prototype.getNextDate = function(time, scale)
{
  if (scale == 'seconds')
    return new Date(time + 1000);
  else if (scale == 'minutes')
    return new Date(time + 60000);
  else if (scale == 'hours')
    return new Date(time + 3600000);
  // for larger scales, no set amount of time can be added
  var _nextDate = new Date(time);
  if (scale == 'days')
    _nextDate.setDate(_nextDate.getDate() + 1);
  else if (scale == 'weeks')
    _nextDate.setDate(_nextDate.getDate() + 7);
  else if (scale == 'months')
    _nextDate.setMonth(_nextDate.getMonth() + 1);
  else if (scale == 'quarters')
    _nextDate.setMonth(_nextDate.getMonth() + 3);
  else if (scale == 'halfyears')
    _nextDate.setMonth(_nextDate.getMonth() + 6);
  else if (scale == 'years')
    _nextDate.setFullYear(_nextDate.getFullYear() + 1);
  else if (scale == 'twoyears')
    _nextDate.setFullYear(_nextDate.getFullYear() + 2);
  else
  {
    // circuit breaker
    _nextDate.setYear(_nextDate.getYear() + 1);
  }
  return _nextDate;
};
/**
 * Timeline keyboard handler.
 * @param {DvtEventManager} manager The owning DvtEventManager.
 * @class DvtTimelineKeyboardHandler
 * @extends {DvtKeyboardHandler}
 * @constructor
 */
var DvtTimelineKeyboardHandler = function(manager)
{
  this.Init(manager);
};

DvtObj.createSubclass(DvtTimelineKeyboardHandler, DvtKeyboardHandler, 'DvtTimelineKeyboardHandler');

/**
 * @override
 */
DvtTimelineKeyboardHandler.prototype.Init = function(manager)
{
  DvtTimelineKeyboardHandler.superclass.Init.call(this, manager);
};

/**
 * @override
 */
DvtTimelineKeyboardHandler.prototype.isSelectionEvent = function(event)
{
  return this.isNavigationEvent(event) && !event.ctrlKey;
};

/**
 * @override
 */
DvtTimelineKeyboardHandler.prototype.isMultiSelectEvent = function(event)
{
  return event.keyCode == DvtKeyboardEvent.SPACE && event.ctrlKey;
};

/**
 * @override
 */
DvtTimelineKeyboardHandler.prototype.processKeyDown = function(event)
{
  var keyCode = event.keyCode;
  if (DvtKeyboardEvent.isEquals(event) || DvtKeyboardEvent.isPlus(event))
    this._eventManager.zoomBy(1 / DvtTimeline.ZOOM_BY_VALUE);
  else if (DvtKeyboardEvent.isMinus(event) || DvtKeyboardEvent.isUnderscore(event))
    this._eventManager.zoomBy(DvtTimeline.ZOOM_BY_VALUE);
  else if (keyCode == DvtKeyboardEvent.PAGE_UP)
  {
    if (event.shiftKey)
      this._eventManager.panBy(-0.25, 0);
    else
      this._eventManager.panBy(0, -0.25);

    DvtEventManager.consumeEvent(event);
  }
  else if (keyCode == DvtKeyboardEvent.PAGE_DOWN)
  {
    if (event.shiftKey)
      this._eventManager.panBy(0.25, 0);
    else
      this._eventManager.panBy(0, 0.25);

    DvtEventManager.consumeEvent(event);
  }

  return DvtTimelineKeyboardHandler.superclass.processKeyDown.call(this, event);
};

/**
 * Finds the next navigable item based on direction.
 * @param {DvtTimelineSeriesNode} currentNavigable The item with current focus.
 * @param {DvtKeyboardEvent} event The keyboard event.
 * @param {Array} navigableItems An array of items that could receive focus next.
 * @return {DvtTimelineSeriesNode} The next navigable item.
 */
DvtTimelineKeyboardHandler.getNextNavigable = function(currentNavigable, event, navigableItems)
{
  var series = currentNavigable.getSeries();
  var seriesIndex = currentNavigable.getSeriesIndex();

  var isRTL = DvtAgent.isRightToLeft(series.getCtx());
  var isVertical = series.isVertical();
  var isDualSeries = navigableItems.length > 1;

  if (!isRTL && DvtKeyboardEvent.RIGHT_ARROW == event.keyCode || isRTL && DvtKeyboardEvent.LEFT_ARROW == event.keyCode)
  {
    if (!isVertical)
      return DvtTimelineKeyboardHandler.getNextItem(currentNavigable, navigableItems[seriesIndex], true);
    else if (isDualSeries && seriesIndex != 1)
      return DvtTimelineKeyboardHandler.getClosestItem(currentNavigable, navigableItems[1]);
  }
  else if (!isRTL && DvtKeyboardEvent.LEFT_ARROW == event.keyCode || isRTL && DvtKeyboardEvent.RIGHT_ARROW == event.keyCode)
  {
    if (!isVertical)
      return DvtTimelineKeyboardHandler.getNextItem(currentNavigable, navigableItems[seriesIndex], false);
    else if (isDualSeries && seriesIndex != 0)
      return DvtTimelineKeyboardHandler.getClosestItem(currentNavigable, navigableItems[0]);
  }
  else if (DvtKeyboardEvent.DOWN_ARROW == event.keyCode)
  {
    if (isVertical)
      return DvtTimelineKeyboardHandler.getNextItem(currentNavigable, navigableItems[seriesIndex], true);
    else if (isDualSeries && seriesIndex != 1)
      return DvtTimelineKeyboardHandler.getClosestItem(currentNavigable, navigableItems[1]);
  }
  else if (DvtKeyboardEvent.UP_ARROW == event.keyCode)
  {
    if (isVertical)
      return DvtTimelineKeyboardHandler.getNextItem(currentNavigable, navigableItems[seriesIndex], false);
    else if (isDualSeries && seriesIndex != 0)
      return DvtTimelineKeyboardHandler.getClosestItem(currentNavigable, navigableItems[0]);
  }
  return null;
};

/**
 * Gets the next item in the given direction.
 * @param {DvtTimelineSeriesNode} item The current item.
 * @param {Array} navigableItems An array of items to traverse.
 * @param {Boolean} isNext - True iff going forward in time, false otherwise.
 * @return {DvtTimelineSeriesNode} The next item in the given direction.
 */
DvtTimelineKeyboardHandler.getNextItem = function(item, navigableItems, isNext)
{
  var nextIndex = DvtArrayUtils.getIndex(navigableItems, item) + (isNext ? 1 : -1);
  if (nextIndex >= 0 && nextIndex < navigableItems.length)
    return navigableItems[nextIndex];
  else
    return null;
};

/**
 * Finds the item with the closest start time to the start time of the given item.
 * @param {DvtTimelineSeriesNode} item The given item.
 * @param {Array} navigableItems An array of items to search through.
 * @return {DvtTimelineSeriesNode} The item with the closest start time.
 */
DvtTimelineKeyboardHandler.getClosestItem = function(item, navigableItems)
{
  if (navigableItems.length > 0)
  {
    var closest = navigableItems[0];
    var itemLoc = item.getLoc();
    var dist = Math.abs(itemLoc - closest.getLoc());
    for (var i = 1; i < navigableItems.length; i++)
    {
      var testDist = Math.abs(itemLoc - navigableItems[i].getLoc());
      if (testDist < dist)
      {
        dist = testDist;
        closest = navigableItems[i];
      }
    }
    return closest;
  }
  return null;
};
/**
 * Timeline event manager.
 * @param {DvtTimeline} timeline The owning DvtTimeline.
 * @extends {DvtEventManager}
 * @constructor
 */
var DvtTimelineEventManager = function(timeline)
{
  this.Init(timeline.getCtx(), timeline.processEvent, timeline);
  this._timeline = timeline;
  this._isDragPanning = false;
  this._isPinchZoom = false;
};

DvtObj.createSubclass(DvtTimelineEventManager, DvtEventManager, 'DvtTimelineEventManager');

DvtTimelineEventManager.GECKO_MOUSEWHEEL = 'wheel';

/**
 * @override
 */
DvtTimelineEventManager.prototype.addListeners = function(displayable)
{
  DvtTimelineEventManager.superclass.addListeners.call(this, displayable);
  DvtSvgDocumentUtils.addDragListeners(this._timeline, this._onDragStart, this._onDragMove, this._onDragEnd, this);
  if (!DvtAgent.isTouchDevice())
  {
    if (DvtAgent.isPlatformGecko())
      displayable.addEvtListener(DvtTimelineEventManager.GECKO_MOUSEWHEEL, this.OnMouseWheel, false, this);
    else
      displayable.addEvtListener(DvtMouseEvent.MOUSEWHEEL, this.OnMouseWheel, false, this);
    // IE does not always fire the appropriate mouseover and mouseout events, so use mouseenter instead
    if (DvtAgent.isPlatformIE())
    {
      var stage = this.getCtx().getStage();
      stage.addEvtListener('mouseenter', this.OnMouseEnter, false, this);
      stage.addEvtListener('mouseleave', this.OnMouseLeave, false, this);
    }
  }
};

/**
 * @override
 */
DvtTimelineEventManager.prototype.removeListeners = function(displayable)
{
  DvtTimelineEventManager.superclass.removeListeners.call(this, displayable);
  if (!DvtAgent.isTouchDevice())
  {
    if (DvtAgent.isPlatformGecko())
      displayable.removeEvtListener(DvtTimelineEventManager.GECKO_MOUSEWHEEL, this.OnMouseWheel, false, this);
    else
      displayable.removeEvtListener(DvtMouseEvent.MOUSEWHEEL, this.OnMouseWheel, false, this);
    // IE does not always fire the appropriate mouseover and mouseout events, so use mouseenter instead
    if (DvtAgent.isPlatformIE())
    {
      var stage = this.getCtx().getStage();
      stage.removeEvtListener('mouseenter', this.OnMouseEnter, false, this);
      stage.removeEvtListener('mouseleave', this.OnMouseLeave, false, this);
    }
  }
};

/**
 * @override
 */
DvtTimelineEventManager.prototype.OnKeyDown = function(event)
{
  DvtTimelineEventManager.superclass.OnKeyDown.call(this, event);
  this._timeline.HandleKeyDown(event);
};

/**
 * @override
 */
DvtTimelineEventManager.prototype.OnClick = function(event)
{
  if (this._isDragPanning)
    return;

  DvtTimelineEventManager.superclass.OnClick.call(this, event);
  this._timeline.HandleMouseClick(event);
};

/**
 * @override
 */
DvtTimelineEventManager.prototype.PreOnMouseOver = function(event)
{
  if (this._mouseOutTimer && this._mouseOutTimer.isRunning())
    this._mouseOutTimer.stop();
  DvtTimelineEventManager.superclass.PreOnMouseOver.call(this, event);

  if (!DvtAgent.isPlatformIE() && !this.isMouseOver)
  {
    this.isMouseOver = true;
    if (!this._timeline.isAnimating())
      this._timeline.showThenHideHotspots(0);
  }
};

/**
 * Handler for the mouseenter event.
 * @param {DvtMouseEvent} event The mouseenter event.
 */
DvtTimelineEventManager.prototype.OnMouseEnter = function(event)
{
  if (this._mouseOutTimer && this._mouseOutTimer.isRunning())
    this._mouseOutTimer.stop();

  if (!this.isMouseOver)
  {
    this.isMouseOver = true;
    if (!this._timeline.isAnimating())
      this._timeline.showThenHideHotspots(0);
  }
};

/**
 * Handler for the mouseleave event.
 * @param {DvtMouseEvent} event The mouseleave event.
 */
DvtTimelineEventManager.prototype.OnMouseLeave = function(event)
{
  if (!this._mouseOutTimer)
    this._mouseOutTimer = new DvtTimer(this.getCtx(), 10, this._onMouseOutTimerEnd, this, 1);

  this._mouseOutTimer.reset();
  this._mouseOutTimer.start();
};

/**
 * @override
 */
DvtTimelineEventManager.prototype.PreOnMouseOut = function(event)
{
  DvtTimelineEventManager.superclass.PreOnMouseOut.call(this, event);
  if (!DvtAgent.isPlatformIE())
  {
    if (!this._mouseOutTimer)
      this._mouseOutTimer = new DvtTimer(this.getCtx(), 10, this._onMouseOutTimerEnd, this, 1);

    this._mouseOutTimer.reset();
    this._mouseOutTimer.start();
  }
};

/**
 * Mouse out timer callback function.
 * @private
 */
DvtTimelineEventManager.prototype._onMouseOutTimerEnd = function()
{
  this.isMouseOver = false;
};

/**
 * @override
 */
DvtTimelineEventManager.prototype.PreOnMouseDown = function(event)
{
  this._isDragPanning = false;
  DvtTimelineEventManager.superclass.PreOnMouseDown.call(this, event);
  this._timeline.HandleMouseDown(event);
};

/**
 * Mouse wheel event handler.
 * @param {mousewheel} event The mousewheel event.
 * @protected
 */
DvtTimelineEventManager.prototype.OnMouseWheel = function(event)
{
  this._timeline.HandleMouseWheel(event);
};

/**
 * @override
 */
DvtTimelineEventManager.prototype.OnTouchStartBubble = function(event)
{
  DvtTimelineEventManager.superclass.OnTouchStartBubble.call(this, event);
  this._timeline.HandleTouchStart(event);
  // iOS does not set focus on touch, so need to force focus
  var stage = this._timeline.getCtx().getStage();
  var wrappingDiv = stage.getSVGRoot().parentNode;
  wrappingDiv.focus();
};

/**
 * @override
 */
DvtTimelineEventManager.prototype.OnTouchEndBubble = function(event)
{
  DvtTimelineEventManager.superclass.OnTouchEndBubble.call(this, event);
  this._timeline.HandleTouchEnd(event);
};

/**
 * Drag start callback.
 * @param {DvtBaseEvent} event
 * @return {boolean} Whether drag is initiated.
 * @private
 */
DvtTimelineEventManager.prototype._onDragStart = function(event)
{
  if (this._timeline.hasValidOptions())
  {
    if (DvtAgent.isTouchDevice())
      return this._onTouchDragStart(event);
    else
      return this._onMouseDragStart(event);
  }
};

/**
 * Drag move callback.
 * @param {DvtBaseEvent} event
 * @return {boolean}
 * @private
 */
DvtTimelineEventManager.prototype._onDragMove = function(event)
{
  if (DvtAgent.isTouchDevice())
    return this._onTouchDragMove(event);
  else
    return this._onMouseDragMove(event);
};

/**
 * Drag end callback.
 * @param {DvtBaseEvent} event
 * @return {boolean}
 * @private
 */
DvtTimelineEventManager.prototype._onDragEnd = function(event)
{
  if (DvtAgent.isTouchDevice())
    return this._onTouchDragEnd(event);
  else
    return this._onMouseDragEnd(event);
};

/**
 * Return the relative position relative to the stage, based on the cached stage absolute position.
 * @param {number} pageX
 * @param {number} pageY
 * @return {DvtPoint} The relative position.
 * @private
 */
DvtTimelineEventManager.prototype._getRelativePosition = function(pageX, pageY) {
  if (!this._stageAbsolutePosition)
    this._stageAbsolutePosition = this._context.getStageAbsolutePosition();

  return new DvtPoint(pageX - this._stageAbsolutePosition.x, pageY - this._stageAbsolutePosition.y);
};

/**
 * Mouse drag start callback.
 * @param {DvtBaseEvent} event
 * @return {boolean} Whether drag is initiated.
 * @private
 */
DvtTimelineEventManager.prototype._onMouseDragStart = function(event)
{
  if (event.button != DvtMouseEvent.RIGHT_CLICK_BUTTON)
  {
    var relPos = this._getRelativePosition(event.pageX, event.pageY);
    this._timeline.beginDragPan(relPos.x, relPos.y);
    return true;
  }
  return false;
};

/**
 * Mouse drag move callback.
 * @param {DvtBaseEvent} event
 * @private
 */
DvtTimelineEventManager.prototype._onMouseDragMove = function(event)
{
  var relPos = this._getRelativePosition(event.pageX, event.pageY);
  if (this._timeline.contDragPan(relPos.x, relPos.y))
    this._isDragPanning = true;
};

/**
 * Mouse drag end callback.
 * @param {DvtBaseEvent} event
 * @private
 */
DvtTimelineEventManager.prototype._onMouseDragEnd = function(event)
{
  this._timeline.endDragPan();
  // Clear the stage absolute position cache
  this._stageAbsolutePosition = null;
};

/**
 * Touch drag start callback.
 * @param {DvtBaseEvent} event
 * @return {boolean} Whether drag is initiated.
 * @private
 */
DvtTimelineEventManager.prototype._onTouchDragStart = function(event)
{
  var touches = event.touches;
  if (touches.length == 1)
  {
    var relPos = this._getRelativePosition(touches[0].pageX, touches[0].pageY);
    this._timeline.beginDragPan(relPos.x, relPos.y);
    return true;
  }
  else if (touches.length == 2)
  {
    this._timeline.endDragPan();
    this._isPinchZoom = true;
    var relPos1 = this._getRelativePosition(touches[0].pageX, touches[0].pageY);
    var relPos2 = this._getRelativePosition(touches[1].pageX, touches[1].pageY);
    this._timeline.beginPinchZoom(relPos1.x, relPos1.y, relPos2.x, relPos2.y);
    DvtEventManager.consumeEvent(event);
    return true;
  }
  return false;
};

/**
 * Touch drag move callback.
 * @param {DvtBaseEvent} event
 * @private
 */
DvtTimelineEventManager.prototype._onTouchDragMove = function(event)
{
  var touches = event.touches;
  // make sure this is a single touch and not a multi touch
  if (touches.length == 1)
  {
    var relPos = this._getRelativePosition(touches[0].pageX, touches[0].pageY);
    this._timeline.contDragPan(relPos.x, relPos.y);
    event.preventDefault();
  }
  else if (touches.length == 2)
  {
    var relPos1 = this._getRelativePosition(touches[0].pageX, touches[0].pageY);
    var relPos2 = this._getRelativePosition(touches[1].pageX, touches[1].pageY);
    this._timeline.contPinchZoom(relPos1.x, relPos1.y, relPos2.x, relPos2.y);
    event.preventDefault();
  }
};

/**
 * Touch drag end callback.
 * @param {DvtBaseEvent} event
 * @private
 */
DvtTimelineEventManager.prototype._onTouchDragEnd = function(event)
{
  if (!this._isPinchZoom)
  {
    this._timeline.endDragPan();
    event.preventDefault();
  }
  else
  {
    this._isPinchZoom = false;
    this._timeline.endPinchZoom();
    event.preventDefault();
  }
  // Clear the stage absolute position cache
  this._stageAbsolutePosition = null;
};

/**
 * Zooms by the specified amount.
 * @param {number} dz A number specifying the zoom ratio. dz = 1 means no zoom.
 */
DvtTimelineEventManager.prototype.zoomBy = function(dz)
{
  this._timeline.zoomBy(dz);
};

/**
 * Pans by the specified amount.
 * @param {number} dx A number from specifying the pan ratio in the x direction, e.g. dx = 0.5 means pan end by 50%..
 * @param {number} dy A number from specifying the pan ratio in the y direction, e.g. dy = 0.5 means pan down by 50%.
 */
DvtTimelineEventManager.prototype.panBy = function(dx, dy)
{
  var deltaX = dx * this._timeline._canvasLength * (DvtAgent.isRightToLeft(this._context) ? -1 : 1);
  var deltaY = dy * this._timeline._seriesSize;
  if (deltaX != 0)
    this._timeline._triggerViewportChange = true;

  var focusObj = this.getFocus();
  if (focusObj)
    this._timeline._dragPanSeries = focusObj._series;

  this._timeline.panBy(deltaX, deltaY);
  this._timeline.endPan();
};

/**
 * Zoom in button click handler.
 * @param {DvtBaseEvent} event The dispatched event to be processed by the object.
 */
DvtTimelineEventManager.prototype.HandleZoomInClick = function(event)
{
  this._timeline.handleZoom(true);
};

/**
 * Zoom out button click handler.
 * @param {DvtBaseEvent} event The dispatched event to be processed by the object.
 */
DvtTimelineEventManager.prototype.HandleZoomOutClick = function(event)
{
  this._timeline.handleZoom(false);
};

/**
 * @override
 */
DvtTimelineEventManager.prototype.GetTouchResponse = function()
{
  return DvtEventManager.TOUCH_RESPONSE_TOUCH_HOLD;
};
/**
 * Timeline component.  This class should never be instantiated directly.  Use the
 * newInstance function instead.
 * @class
 * @constructor
 * @extends {DvtTimeComponent}
 * @export
 */
var DvtTimeline = function()
{

};

DvtObj.createSubclass(DvtTimeline, DvtTimeComponent, 'DvtTimeline');

DvtTimeline.ZOOM_BY_VALUE = 1.5;

DvtTimeline.ORIENTATION_VERTICAL = 'vertical';

/**
 * Returns a new instance of DvtTimeline.
 * @param {DvtContext} context The rendering context.
 * @param {string} callback The function that should be called to dispatch component events.
 * @param {object} callbackObj The optional object instance on which the callback function is defined.
 * @return {DvtTimeline}
 * @export
 */
DvtTimeline.newInstance = function(context, callback, callbackObj)
{
  var timeline = new DvtTimeline();
  timeline.Init(context, callback, callbackObj);
  return timeline;
};

/**
 * Initializes the component.
 * @param {DvtContext} context The rendering context.
 * @param {string} callback The function that should be called to dispatch component events.
 * @param {object} callbackObj The optional object instance on which the callback function is defined.
 * @protected
 */
DvtTimeline.prototype.Init = function(context, callback, callbackObj)
{
  DvtTimeline.superclass.Init.call(this, context, callback, callbackObj);

  // Create the defaults object
  this.Defaults = new DvtTimelineDefaults();

  // Create the event handler and add event listeners
  this.EventManager = new DvtTimelineEventManager(this, context, callback, callbackObj);
  this.EventManager.addListeners(this);
  if (!DvtAgent.isTouchDevice())
  {
    this._keyboardHandler = new DvtTimelineKeyboardHandler(this.EventManager);
    this.EventManager.setKeyboardHandler(this._keyboardHandler);
  }
  else
    this._keyboardHandler = null;
};

/**
 * @override
 */
DvtTimeline.prototype.SetOptions = function(options)
{
  // Combine the user options with the defaults and store
  this.Options = this.Defaults.calcOptions(options);

  // Disable animation for canvas and xml
  if (!DvtAgent.isEnvironmentBrowser()) {
    this.Options['animationOnDisplay'] = 'none';
    this.Options['animationOnDataChange'] = 'none';
  }
};

DvtTimeline.prototype.Parse = function(options)
{
  this._parser = new DvtTimelineParser();
  return this._parser.parse(options);
};

DvtTimeline.prototype._applyParsedProperties = function(props)
{
  var orientation = props.orientation;
  if (orientation && orientation == DvtTimeline.ORIENTATION_VERTICAL)
    this._isVertical = true;
  else
    this._isVertical = false;

  this._hasOverview = props.hasOverview;
  this._viewStartTime = props.viewStart;
  this._viewEndTime = props.viewEnd;
  this._selectionMode = props.selectionMode;
  if (this._selectionMode == 'single')
    this.SelectionHandler = new DvtSelectionHandler(DvtSelectionHandler.TYPE_SINGLE);
  else if (this._selectionMode == 'multiple')
    this.SelectionHandler = new DvtSelectionHandler(DvtSelectionHandler.TYPE_MULTIPLE);
  else
    this.SelectionHandler = null;

  // Pass to event handler
  this.EventManager.setSelectionHandler(this.SelectionHandler);

  this._axisInlineStyle = props.axisStyle;
  this._shortDesc = props.shortDesc;
  this._id = props.id;
  this._referenceObjects = props.referenceObjects;
  this._zoomOrder = props.zoomOrder;
  this._seriesScale = props.seriesScale;

  // Internationalization strings
  this._dateFormatStrings = {
    dayNames: [
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'DAY_SHORT_SUNDAY', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'DAY_SHORT_MONDAY', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'DAY_SHORT_TUESDAY', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'DAY_SHORT_WEDNESDAY', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'DAY_SHORT_THURSDAY', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'DAY_SHORT_FRIDAY', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'DAY_SHORT_SATURDAY', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'DAY_SUNDAY', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'DAY_MONDAY', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'DAY_TUESDAY', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'DAY_WEDNESDAY', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'DAY_THURSDAY', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'DAY_FRIDAY', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'DAY_SATURDAY', null)
    ],
    monthNames: [
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'MONTH_SHORT_JANUARY', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'MONTH_SHORT_FEBRUARY', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'MONTH_SHORT_MARCH', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'MONTH_SHORT_APRIL', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'MONTH_SHORT_MAY', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'MONTH_SHORT_JUNE', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'MONTH_SHORT_JULY', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'MONTH_SHORT_AUGUST', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'MONTH_SHORT_SEPTEMBER', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'MONTH_SHORT_OCTOBER', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'MONTH_SHORT_NOVEMBER', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'MONTH_SHORT_DECEMBER', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'MONTH_JANUARY', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'MONTH_FEBRUARY', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'MONTH_MARCH', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'MONTH_APRIL', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'MONTH_MAY', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'MONTH_JUNE', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'MONTH_JULY', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'MONTH_AUGUST', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'MONTH_SEPTEMBER', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'MONTH_OCTOBER', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'MONTH_NOVEMBER', null),
      DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'MONTH_DECEMBER', null)
    ]
  };

  if (this._seriesScale)
  {
    this._seriesConverter = props.seriesConverter;
    this._seriesTimeAxis = new DvtTimeComponentAxis(this.getCtx(), null, null, this._isVertical);
    this._seriesTimeAxis.setScale(this._seriesScale);
    this._seriesTimeAxis.setConverter(this._seriesConverter);
    if (this._isVertical)
    {
      this._seriesTimeAxis.setType(DvtTimeComponentAxisFormatter.SHORT, this._dateFormatStrings);
      this._seriesTimeAxis.setDefaultConverter(this._resources['converterVert']);
    }
    else
    {
      this._seriesTimeAxis.setType(DvtTimeComponentAxisFormatter.LONG, this._dateFormatStrings);
      this._seriesTimeAxis.setDefaultConverter(this._resources['converter']);
    }
  }
  else
    this._seriesTimeAxis = null;

  this._defaultInversions = [false, true];

  DvtTimeline.superclass._applyParsedProperties.call(this, props);
};

DvtTimeline.prototype.getTimeAxisSize = function()
{
  return this._timeAxis.getSize();
};

DvtTimeline.prototype.getTimeAxisVisibleSize = function(seriesCount)
{
  if (!this._hasOverview && seriesCount == 1)
    return this.getTimeAxisSize() - this._timeAxis.getBorderWidth();
  else
    return this.getTimeAxisSize();
};

/**
 * @override
 * @export
 */
DvtTimeline.prototype.select = function(selection)
{
  // Update the options
  // TODO: update this for stuff...
  this.Options['selection'] = DvtJSONUtils.clone(selection);

  // Perform the selection
  if (this.SelectionHandler)
    this.applyInitialSelections();
};

/**
 * Renders the component with the specified data.  If no data is supplied to a component
 * that has already been rendered, the component will be rerendered to the specified size.
 * @param {object} options The object containing specifications and data for this component.
 * @param {number} width The width of the component.
 * @param {number} height The height of the component.
 * @export
 */
DvtTimeline.prototype.render = function(options, width, height)
{
  // ensure options is updated
  if (options)
    this.SetOptions(options);
  else
  {
    this._handleResize(width, height);
    return;
  }

  if (this.Options)
  {
    this._resources = this.Options['_resources'];
    if (this._resources == null)
      this._resources = [];
  }

  // The overall size of this component
  this.Width = width;
  this.Height = height;

  var props = this.Parse(this.Options);
  this._applyParsedProperties(props);

  this._fetchStartPos = 0;
  if (this._isVertical)
    this._fetchEndPos = height;
  else
    this._fetchEndPos = width;

  if (this.Options['styleDefaults'])
  {
    this._axisStyleDefaults = this.Options['styleDefaults']['minorAxis'];
    this._majorAxisStyleDefaults = this.Options['styleDefaults']['majorAxis'];
    this._seriesStyleDefaults = this.Options['styleDefaults']['series'];
  }
  this.prepareViewportLength();

  if (this._scale)
  {
    this.prepareTimeAxisZoomLevelIntervals(this._start, this._end);
    this.applyAxisStyleValues();
  }
  this._populateSeries();

  DvtTimelineRenderer.renderTimeline(this);
  this.UpdateAriaAttributes();

  // Set the timeline as the only keyboard listener
  // Prevents overview from receiving keyboard events
  this.getCtx().setKeyboardFocusArray([this]);
};

/**
 * Helper method to decide whether or not the series.items options are valid.
 * @return {boolean} Whether the series.items options are valid.
 */
DvtTimeline.prototype.hasValidSeriesItems = function()
{
  for (var i = 0; i < this._seriesOptions.length; i++)
  {
    var seriesOptions = this._seriesOptions[i];
    if (seriesOptions.items)
    {
      for (var j = 0; j < seriesOptions.items.length; j++)
      {
        var item = seriesOptions.items[j];
        var start = (new Date(item.start)).getTime();
        if (!start)
          return false;
        if (item.hasOwnProperty('end'))
        {
          var end = (new Date(item.end)).getTime();
          if (!(end && end > start))
            return false;
        }
      }
    }
  }
  return true;
};

/**
 * Helper method to decide whether or not the options are valid.
 * @return {boolean} Whether this timeline has valid options.
 */
DvtTimeline.prototype.hasValidOptions = function()
{
  // TODO: warn user why certain options are invalid
  var hasValidScale = this._scale && DvtArrayUtils.getIndex(DvtTimeComponentAxis._VALID_SCALES, this._scale) != -1;
  var hasValidStartAndEnd = this._start && this._end && (this._end > this._start);
  var hasValidSeries = this._series && this._series.length > 0;
  var hasValidSeriesItems = hasValidSeries ? this.hasValidSeriesItems() : false;
  var hasValidSeriesScale = this._seriesScale ? DvtArrayUtils.getIndex(DvtTimeComponentAxis._VALID_SCALES, this._seriesScale) != -1 : true;
  var hasValidViewport = (this._viewStartTime && this._viewEndTime) ? this._viewEndTime > this._viewStartTime : true;
  var hasValidViewStart = this._viewStartTime ? (this._viewStartTime >= this._start && this._viewStartTime < this._end) : true;
  var hasValidViewEnd = this._viewEndTime ? (this._viewEndTime > this._start && this._viewEndTime <= this._end) : true;

  return (hasValidScale && hasValidStartAndEnd && hasValidSeries && hasValidSeriesItems && hasValidSeriesScale && hasValidViewport &&
          hasValidViewStart && hasValidViewEnd);
};

/**
 * @override
 */
DvtTimeline.prototype.GetComponentDescription = function()
{
  if (this._shortDesc)
    return this._shortDesc;
  else
    return DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'TIMELINE');
};

/**
 * Returns whether the Timeline is currently animating.
 * @return {Boolean} Whether the Timeline is currently animating.
 */
DvtTimeline.prototype.isAnimating = function()
{
  for (var i = 0; i < this._series.length; i++)
  {
    if (this._series[i]._isAnimating)
      return true;
  }
  return false;
};

DvtTimeline.prototype.showThenHideHotspots = function(delay, series) 
{
  if (this.hasValidOptions())
  {
    var animator = new DvtAnimator(this.getCtx(), DvtTimelineStyleUtils.getHotspotAnimationDuration(), delay, DvtEasing.linear);
    for (var i = 0; i < this._scrollHotspots.length; i++)
    {
      var hotspot = this._scrollHotspots[i];
      var id = hotspot.getId();
      var show = true;
      if (this._contentLength <= this._canvasLength && (id == 'lhs' || id == 'rhs'))
        show = false;

      var pId = hotspot.getParent().getId();
      if (pId)
      {
        var parentSeries = pId.substring(pId.length - 1);
        if (series != null && (series != parentSeries))
          show = false;

        var seriesObj = this._series[parentSeries];
        if (seriesObj._maxOverflowValue <= this._seriesSize && (id == 'ths' || id == 'bhs'))
          show = false;
      }
      if (show)
        animator.addProp(DvtAnimator.TYPE_NUMBER, hotspot, hotspot.getAlpha, hotspot.setAlpha, DvtTimelineStyleUtils.getHotspotOpacity());
    }
    DvtPlayable.appendOnEnd(animator, this.hideHotspots, this);
    animator.play();
  }
};

DvtTimeline.prototype.hideHotspots = function()
{
  var hotSpotsLength = this._scrollHotspots.length;
  if (hotSpotsLength != 0)
  {
    var animator = new DvtAnimator(this.getCtx(), DvtTimelineStyleUtils.getHotspotAnimationDuration(), 0, DvtEasing.linear);
    for (var i = 0; i < hotSpotsLength; i++)
    {
      var hotspot = this._scrollHotspots[i];
      animator.addProp(DvtAnimator.TYPE_NUMBER, hotspot, hotspot.getAlpha, hotspot.setAlpha, 0);
    }
    animator.play();
  }
};

/**
 * Combines style defaults with the styles provided
 *
 */
DvtTimeline.prototype.applyStyleValues = function()
{
  this._style = new DvtCSSStyle(DvtTimelineStyleUtils.getTimelineStyle());
  if (this.Options['styleDefaults'])
  {
    var style = this.Options['styleDefaults']['borderColor'];
    if (style)
      this._style.parseInlineStyle('border-color:' + style + ';');
  }
  if (this._hasOverview)
  {
    this._overviewSize = this._isVertical ? DvtTimelineStyleUtils.getOverviewWidth() : DvtTimelineStyleUtils.getOverviewHeight();
    var overviewStyle = this.Options['overview']['style'];
    if (overviewStyle)
    {
      var splits = overviewStyle.split(';');
      for (var i = 0; i < splits.length; i++)
      {
        var s = splits[i];
        if (s && s.length > 0)
        {
          var colonIndex = s.indexOf(':');
          if (colonIndex > - 1)
          {
            var attrName = DvtStringUtils.trim(s.substring(0, colonIndex));
            if ((this._isVertical && attrName == 'width') || (!this._isVertical && attrName == 'height'))
            {
              this._overviewSize = parseInt(DvtStringUtils.trim(s.substring(colonIndex + 1)), 10);
              break;
            }
          }
        }
      }
    }
  }
  DvtTimeline.superclass.applyStyleValues.call(this);

  // double border width to account for stroke width rendering
  var borderWidth = this._style.getBorderWidth();
  var doubleBorderWidth = borderWidth * 2;
  var borderStyle = 'border:' + doubleBorderWidth + 'px;';
  this._style.parseInlineStyle(borderStyle);

  this._startX = borderWidth;
  this._startY = borderWidth;
  this._backgroundWidth = this.Width;
  this._backgroundHeight = this.Height;

  if (this._isVertical)
  {
    // The size of the canvas viewport
    this._canvasLength = this._backgroundHeight - doubleBorderWidth;
    if (this._hasOverview)
    {
      this._canvasSize = this._backgroundWidth - this._overviewSize - doubleBorderWidth;
      if (this.isRTL())
        this._startX = this._startX + this._overviewSize;
    }
    else
      this._canvasSize = this._backgroundWidth - doubleBorderWidth;
  }
  else
  {
    // The size of the canvas viewport
    this._canvasLength = this._backgroundWidth - doubleBorderWidth;
    if (this._hasOverview)
      this._canvasSize = this.Height - this._overviewSize - doubleBorderWidth;
    else
      this._canvasSize = this.Height - doubleBorderWidth;
  }
};


/**
 * Combines style defaults with the styles provided
 *
 */
DvtTimeline.prototype.applyAxisStyleValues = function()
{
  this._axisStyle = new DvtCSSStyle(DvtTimelineStyleUtils.getAxisStyle());
  if (this._axisStyleDefaults)
  {
    var axisStyles = '';
    var style = this._axisStyleDefaults['backgroundColor'];
    if (style)
      axisStyles = axisStyles + 'background-color:' + style + ';';
    style = this._axisStyleDefaults['borderColor'];
    if (style)
      axisStyles = axisStyles + 'border-color:' + style + ';';
    style = this._axisStyleDefaults['borderWidth'];
    if (style)
      axisStyles = axisStyles + 'border-width:' + style + ';';
    this._axisStyle.parseInlineStyle(axisStyles);
  }
  this._axisStyle.parseInlineStyle(this._axisInlineStyle);

  // double border width to account for stroke width rendering
  this._axisBorderWidth = this._axisStyle.getBorderWidth();
  var borderStyle = 'border:' + this._axisBorderWidth * 2 + 'px;';
  this._axisStyle.parseInlineStyle(borderStyle);

  this._timeAxis.setBorderWidth(this._axisBorderWidth);
  this._axisLength = this._contentLength + (this._axisBorderWidth * 2) - DvtTimeComponentAxis.DEFAULT_SEPARATOR_WIDTH;

  if (this._seriesStyleDefaults && this._seriesStyleDefaults['backgroundColor'])
  {
    var bgColor = this._seriesStyleDefaults['backgroundColor'];
    var r = DvtColorUtils.getRed(bgColor);
    var g = DvtColorUtils.getGreen(bgColor);
    var b = DvtColorUtils.getBlue(bgColor);
    this._seriesBackgroundOverlayStyle = 'background-color:rgba(' + r + ',' + g + ',' + b + ',0.8);';
  }
};

DvtTimeline.prototype.prepareViewportLength = function()
{
  this._setLength = true;
  this._startPos = 0;
  if (this.isRTL() && !this._isVertical)
    this._startPos = this._backgroundWidth - this._contentLength - this._startPos;
  if (this._viewStartTime && this._viewEndTime)
  {
    var viewTime = this._viewEndTime - this._viewStartTime;
    if (viewTime > 0)
    {
      this._setLength = false;
      var widthFactor = this._canvasLength / viewTime;
      this.setContentLength(widthFactor * (this._end - this._start));
      this._startPos = widthFactor * (this._start - this._viewStartTime);
      if (this.isRTL() && !this._isVertical)
        this._startPos = this._backgroundWidth - this._contentLength - this._startPos;
    }
  }
};

DvtTimeline.prototype.prepareTimeAxisZoomLevelIntervals = function(startTime, endTime)
{
  var context = this.getCtx();
  var axisLabelStyle = DvtTimelineStyleUtils.getAxisLabelStyle(this.Options);

  this._timeAxis = new DvtTimeComponentAxis(context, null, null, this._isVertical, this._zoomOrder);
  this._timeAxis.setConverter(this._converter);
  this._timeAxis.setType(DvtTimeComponentAxisFormatter.SHORT, this._dateFormatStrings);

  this._dates = [];
  this._labels = [];
  this._zoomLevelLengths = [];

  if (this._isVertical)
  {
    var defaultLength = DvtTimeComponentAxis.DEFAULT_INTERVAL_HEIGHT;
    this._timeAxis.setDefaultConverter(this._resources['converterVert']);
  }
  else
  {
    defaultLength = DvtTimeComponentAxis.DEFAULT_INTERVAL_WIDTH;
    this._timeAxis.setDefaultConverter(this._resources['converter']);
  }

  for (var i = 0; i < this._timeAxis._zoomOrder.length; i++)
  {
    var scale = this._timeAxis._zoomOrder[i];
    this._timeAxis.setScale(scale);
    var axis = new DvtRect(context, 0, 0, 0, 0, 'tempAxis');
    var minLength = Infinity;
    var maxSize = 0;

    var dates = [];
    var labels = [];

    var currentTime = this._timeAxis.adjustDate(startTime).getTime();
    dates.push(currentTime);
    while (currentTime < endTime)
    {
      var labelText = this._timeAxis.formatDate(new Date(currentTime));
      var label = new DvtOutputText(context, labelText, 0, 0, 's_label' + currentTime);
      label.setCSSStyle(axisLabelStyle);
      // save the time associated with the element for dynamic resize
      label.time = currentTime;
      labels.push(label);
      var nextTime = this._timeAxis.getNextDate(currentTime).getTime();

      // update maximum label width and height
      axis.addChild(label);
      var dim = label.getDimensions();
      axis.removeChild(label);
      if (this._isVertical)
      {
        var lengthDim = dim.h;
        var sizeDim = dim.w;
      }
      else
      {
        lengthDim = dim.w;
        sizeDim = dim.h;
      }
      var labelLength = Math.max(defaultLength, lengthDim + (DvtTimeComponentAxis.DEFAULT_INTERVAL_PADDING * 2));
      var lengthFactor = (nextTime - currentTime) / labelLength;
      if (lengthFactor < minLength)
        minLength = lengthFactor;
      if (sizeDim > maxSize)
        maxSize = sizeDim;

      // the last currentTime added in this loop is outside of the time range, but is needed
      // for the last 'next' date when actually creating the time axis in renderTimeAxis
      currentTime = nextTime;
      dates.push(currentTime);
    }
    this._timeAxis.setContentSize(maxSize + DvtTimeComponentAxis.DEFAULT_INTERVAL_PADDING * 2);
    this._dates.push(dates);
    this._labels.push(labels);
    var zoomLevelLength = ((endTime - startTime) / minLength);
    this._zoomLevelLengths.push(zoomLevelLength);
    if (scale == this._scale)
    {
      this._zoomLevelOrder = i;
      if (this._setLength)
      {
        this.setContentLength(zoomLevelLength);
        this._setLength = false;
        if (this._viewStartTime == null)
        {
          if (this._viewEndTime != null)
          {
            this._viewStartTime = this._viewEndTime - (this._canvasLength / zoomLevelLength) * (endTime - startTime);
            if (this._viewStartTime < this._start)
              this._viewStartTime = this._start;
            var viewTime = this._viewEndTime - this._viewStartTime;
            var widthFactor = this._canvasLength / viewTime;
            this.setContentLength(widthFactor * (this._end - this._start));
            this._startPos = widthFactor * (this._start - this._viewStartTime);
            if (this.isRTL() && !this._isVertical)
              this._startPos = this._backgroundWidth - this._contentLength - this._startPos;
          }
          else
          {
            this._viewStartTime = this._start;
            this._startPos = 0;
            if (this.isRTL() && !this._isVertical)
              this._startPos = this._backgroundWidth - this._contentLength - this._startPos;
            this._viewEndTime = (this._canvasLength / zoomLevelLength) * (endTime - startTime) + this._viewStartTime;
            if (this._viewEndTime > this._end)
              this._viewEndTime = this._end;
          }
        }
        else
        {
          this._viewEndTime = (this._canvasLength / zoomLevelLength) * (endTime - startTime) + this._viewStartTime;
          if (this._viewEndTime > this._end)
            this._viewEndTime = this._end;
          viewTime = this._viewEndTime - this._viewStartTime;
          widthFactor = this._canvasLength / viewTime;
          this.setContentLength(widthFactor * (this._end - this._start));
          this._startPos = widthFactor * (this._start - this._viewStartTime);
          if (this.isRTL() && !this._isVertical)
            this._startPos = this._backgroundWidth - this._contentLength - this._startPos;
        }
      }
    }
    if (i == 0)
      this._maxContentLength = labels.length * this._canvasLength;
  }
  this._timeAxis.setScale(this._scale);
};

DvtTimeline.prototype._populateSeries = function()
{
  var series = this.Options['series'];
  if (series)
  {
    var seriesCount = Math.min(series.length, 2);
    this._seriesOptions = [];
    if (this._series)
    {
      if (seriesCount != this._series.length)
      {
        for (var i = 0; i < this._series.length; i++)
        {
          this._innerCanvas.removeChild(this._series[i]);
        }
        this._series = [];
      }
    }
    else
      this._series = [];

    for (var i = 0; i < seriesCount; i++)
    {
      var seriesOptions = series[i];
      seriesOptions['start'] = this._start;
      seriesOptions['end'] = this._end;
      seriesOptions['inverted'] = this._defaultInversions[i];
      seriesOptions['orientation'] = this.Options['orientation'];
      seriesOptions['referenceObjects'] = this._referenceObjects;
      seriesOptions['timeline'] = this;
      seriesOptions['index'] = i;
      seriesOptions['animationOnDisplay'] = this.Options['animationOnDisplay'];
      seriesOptions['animationOnDataChange'] = this.Options['animationOnDataChange'];

      if (this.Options['majorAxis'])
      {
        seriesOptions['scale'] = this.Options['majorAxis']['scale'];
        seriesOptions['timeAxis'] = this._seriesTimeAxis;
      }

      seriesOptions['styleDefaults'] = this.Options['styleDefaults'];
      if (this.Options['styleDefaults'])
      {
        seriesOptions['seriesStyleDefaults'] = this._seriesStyleDefaults;
        seriesOptions['axisStyleDefaults'] = this._majorAxisStyleDefaults;
      }
      this._seriesOptions.push(seriesOptions);

      if (this._series[i] == null)
      {
        var s = new DvtTimelineSeries(this.getCtx(), this.HandleEvent, this);
        this._series.push(s);
      }
    }
  }
  else
    this._series = [];
};

/**
 * Handler for initial animation ending.
 */
DvtTimeline.prototype.onAnimationEnd = function()
{
  if (DvtAgent.isEnvironmentBrowser())
    this.showThenHideHotspots(0);
};

DvtTimeline.prototype._getOverviewObject = function()
{
  var orientation = this._isVertical ? 'vertical' : 'horizontal';
  var handle = this._isVertical ? this._resources['overviewHandleVert'] + '\" _hw=\"15\" _hh=\"3\"' :
                                  this._resources['overviewHandleHor'] + '\" _hw=\"3\" _hh=\"15\"';
  var hasRef = (this._referenceObjects && this._referenceObjects.length > 0 && this._referenceObjects[0]);
  var sizing = this._isVertical ? '' : '_ds=\"square\" _dsx=\"1.3d\" _dsy=\"0.9d\" ';
  var backgroundColor = DvtTimelineStyleUtils.getOverviewBackgroundColor(this.Options);
  var labelStyle = DvtTimelineStyleUtils.getOverviewLabelStyle(this.Options);
  var windowBackgroundColor = DvtTimelineStyleUtils.getOverviewWindowBackgroundColor(this.Options);
  var windowBorderColor = DvtTimelineStyleUtils.getOverviewWindowBorderColor(this.Options);
  var referenceObjectColor = DvtTimelineStyleUtils.getReferenceObjectColor(this.Options);
  var overviewObject = '<timelineOverview renstart=\"' + this._viewStartTime + '\" start=\"' + this._start +
      '\" end=\"' + this._end + '\" width=\"' + this._contentLength +
      '\" orn=\"' + orientation + (hasRef ? ('\" ocd=\"' + this._referenceObjects[0].getTime()) : '') +
      '\" _hbi=\"' + handle + ' ovp=\"below\" selmode=\"' + this._selectionMode + '\"' +
      ' rtl=\"' + this.isRTL() + '\" sid=\"ts1\" _bts=\"none\" _btc=\"#4f4f4f\" _fc=\"#aadd77\" ' + sizing +
      '_do=\"0\" _wbc=\"' + windowBackgroundColor + '\" _wbts=\"solid\" _wbrs=\"solid\"' +
      ' _wbbs=\"solid\" _wbls=\"solid\" _wbtc=\"' + windowBorderColor + '\" _wbrc=\"' + windowBorderColor +
      '\" _wbbc=\"' + windowBorderColor + '\" _wblc=\"' + windowBorderColor + '\" _hfc=\"' + windowBackgroundColor + '\" _obc=\"' +
      backgroundColor + '\" _ctic=\"' + referenceObjectColor + '\" _ls=\"' + labelStyle + '\" _tic=\"#BCC7D2\"' +
      ' _tabc=\"#D9DFE3\" _tabo=\"0\" _bs=\"solid\" _bc=\"#648BAF\" _bw=\"1px\" _bof=\"0px\" _dbs=\"solid\"' +
      ' _dbc=\"#648BAF\" _dbw=\"1px\" _hbs=\"solid\" _hbc=\"#85bbe7\" _hbw=\"2px\" _hbof=\"0px\" _hgc=\"#ebeced\"' +
      ' _hgo=\"1\" _hdbs=\"solid\" _hdbc=\"#85bbe7\" _hdbw=\"2px\" _sbs=\"solid\" _sbc=\"#000000\" _sbw=\"2px\"' +
      ' _sbof=\"0px\" _sbo=\"1\" _sdbs=\"solid\" _sdbc=\"#000000\" _sdbw=\"2px\" _asbs=\"solid\" _asbc=\"#000000\"' +
      ' _asbw=\"2px\" _asbof=\"0px\" _asbo=\"1\" _asgc=\"#e4f0fa\" _asgo=\"1\" _asdbs=\"solid\" _asdbc=\"#000000\"' +
      ' _asdbw=\"2px\" _aoc=\"off\">' +
      this._getMajorAxisXml() +
      this._getOverviewMarkersXml() +
                       '</timelineOverview>';
  return overviewObject;
};

DvtTimeline.prototype._getMajorAxisXml = function()
{
  var xml = '<ticks>';
  if (this._seriesTimeAxis)
  {
    var start = this._start;
    var end = this._end;
    var length = this._isVertical ? this.Height : this.Width;
    var startDate = DvtTimeUtils.getPositionDate(start, end, this._fetchStartPos, length);

    var currentDate = this._seriesTimeAxis.adjustDate(startDate);
    var currentPos = DvtTimeUtils.getDatePosition(start, end, currentDate, length);
    while (currentPos < this._fetchEndPos)
    {
      var label = this._seriesTimeAxis.formatDate(currentDate);
      var nextDate = this._seriesTimeAxis.getNextDate(currentDate.getTime());

      var next_time_pos = DvtTimeUtils.getDatePosition(start, end, nextDate, length);
      xml += '<tick time=\"' + currentDate.getTime() + '\" label=\"' + label + '\"/>';

      currentDate = nextDate;
      currentPos = next_time_pos;
    }
  }
  xml += '</ticks>';
  return xml;
};

DvtTimeline.prototype._getOverviewMarkersXml = function()
{
  if (this._series)
  {
    var overviewMarkers = '<markers>';
    var seriesCount = this._series.length;
    for (var i = 0; i < seriesCount; i++)
    {
      var items = this._series[i]._items;
      for (var j = 0; j < items.length; j++)
      {
        var item = items[j];
        overviewMarkers += '<ti rk=\"' + j;
        overviewMarkers += '\" tid=\"' + item.getId();
        overviewMarkers += '\" t=\"' + item.getStartTime();
        var endTime = item.getEndTime();
        if (endTime)
        {
          overviewMarkers += '\" et=\"' + endTime;
          var durationFillColor = item.getDurationFillColor();
          if (durationFillColor)
            overviewMarkers += '\" dfc=\"' + durationFillColor;
        }
        overviewMarkers += '\" _sd=\"true\"/>';
      }
    }
    overviewMarkers += '</markers>';
    return overviewMarkers;
  }
};

DvtTimeline.prototype.HandleTouchStart = function(event)
{
  var touches = event.touches;
  if (touches.length == 1)
  {
    this._dragPanSeries = this._findSeries(event.target);
    if (this._dragPanSeries)
    {
      if (this._series[0] == this._dragPanSeries)
        var series = 0;
      else
        series = 1;
    }
    this.showThenHideHotspots(0, series);
  }
};

DvtTimeline.prototype.beginPinchZoom = function(x1, y1, x2, y2)
{
  if (this._isVertical)
    this._initialPinchZoomLoc = Math.sqrt((y1 - y2) * (y1 - y2)) + (y1 < y2 ? y1 : y2);
  else
    this._initialPinchZoomLoc = Math.sqrt((x1 - x2) * (x1 - x2)) + (x1 < x2 ? x1 : x2);
  var widthFactor = (this._end - this._start) / this._contentLength;
  this._initialPinchZoomTime = widthFactor * this._initialPinchZoomLoc + this._viewStartTime;
  this._initialPinchZoomDist = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  this._initialPinchZoomLength = this._contentLength;
};

DvtTimeline.prototype.HandleMouseWheel = function(event)
{
  DvtEventManager.consumeEvent(event);
  var wheelDelta = event.wheelDelta;
  if (this.hasValidOptions() && wheelDelta)
  {
    var compPagePos = this.getCtx().getStageAbsolutePosition();
    if (this._isVertical)
      var compLoc = event.pageY - compPagePos.y;
    else
      compLoc = event.pageX - compPagePos.x;
    var widthFactor = (this._end - this._start) / this._contentLength;
    var time = widthFactor * compLoc + this._viewStartTime;

    wheelDelta = (wheelDelta * .02) + 1;
    this.handleZoomWheel(this.getContentLength() * wheelDelta, time, compLoc, true);
  }
};

DvtTimeline.prototype.handleZoomWheel = function(newLength, time, compLoc, triggerViewportChangeEvent)
{
  if (newLength > this._maxContentLength)
  {
    newLength = this._maxContentLength;
    this.disableZoomButton(true);
  }
  else
    this.enableZoomButton(true);
  if (this._canvasLength > newLength)
  {
    newLength = this._canvasLength;
    this.disableZoomButton(false);
  }
  else
    this.enableZoomButton(false);
  var zoomIn = this._contentLength <= newLength;
  var oldViewTime = this._viewEndTime - this._viewStartTime;
  var viewLength = (oldViewTime / (this._end - this._start)) * this._contentLength;
  this.setContentLength(newLength);
  var viewTime = (viewLength / this._contentLength) * (this._end - this._start);
  if (time)
  {
    var widthFactor = (this._end - this._start) / this._contentLength;
    this._viewStartTime = time - (compLoc * widthFactor);
    if (this._viewStartTime < this._start)
      this._viewStartTime = this._start;
    this._viewEndTime = this._viewStartTime + viewTime;
    if (this._viewEndTime > this._end)
    {
      this._viewEndTime = this._end;
      this._viewStartTime = this._viewEndTime - viewTime;
      if (this._viewStartTime < this._start)
        this._viewStartTime = this._start;
    }
    this._startPos = (1 / widthFactor) * (this._start - this._viewStartTime);
    if (this.isRTL() && !this._isVertical)
      this._startPos = this._backgroundWidth - this._contentLength - this._startPos;
  }
  else
  {
    this._viewStartTime = this._start;
    this._viewEndTime = this._viewStartTime + viewTime;
    if (this._viewStartTime < this._start)
      this._viewStartTime = this._start;
    this._startPos = 0;
    if (this.isRTL() && !this._isVertical)
      this._startPos = this._backgroundWidth - this._contentLength - this._startPos;
  }
  if (this._hasOverview)
  {
    if (this._isVertical)
      var overviewLength = this._overview.Height;
    else
      overviewLength = this._overview.Width;
    this._overview.setViewportRange(this._viewStartTime, this._viewEndTime, overviewLength);
  }
  if (zoomIn)
  {
    while (this._zoomLevelOrder > 0)
    {
      var minLength = this._zoomLevelLengths[this._zoomLevelOrder - 1];
      if (this._contentLength >= minLength)
      {
        this._zoomLevelOrder--;
        this._timeAxis.decreaseScale();
        this._scale = this._timeAxis._scale;
      }
      else
        break;
    }
  }
  else
  {
    while (this._zoomLevelOrder < this._zoomLevelLengths.length - 1)
    {
      var minLength = this._zoomLevelLengths[this._zoomLevelOrder];
      if (this._contentLength < minLength)
      {
        this._zoomLevelOrder++;
        this._timeAxis.increaseScale();
        this._scale = this._timeAxis._scale;
      }
      else
        break;
    }
  }
  this.applyAxisStyleValues();
  DvtTimelineRenderer._renderAxis(this, this._innerCanvas);
  this.updateSeries();
  if (this._isVertical)
    this._innerCanvas.setTranslateY(this._startY + this._startPos);
  else
    this._innerCanvas.setTranslateX(this._startX + this._startPos);
  if (triggerViewportChangeEvent)
    this.dispatchEvent(new DvtTimelineViewportChangeEvent(DvtTimelineViewportChangeEvent.TYPE, this._viewStartTime, this._viewEndTime, this._scale));
};

DvtTimeline.prototype.handleZoom = function(zoomIn)
{
  if (!zoomIn)
    this.zoomBy(DvtTimeline.ZOOM_BY_VALUE);
  else
    this.zoomBy(1 / DvtTimeline.ZOOM_BY_VALUE);
};

/**
 * Zooms by the specified amount.
 * @param {number} dz A number specifying the zoom ratio, e.g. dz = 2 means zoom in by 200%.
 */
DvtTimeline.prototype.zoomBy = function(dz)
{
  var shiftRatio = (1 / dz - 1) / 2 + 1;
  if (this._isVertical)
    var compLoc = this.Height / 2;
  else
    compLoc = this.Width / 2;
  var widthFactor = (this._end - this._start) / this._contentLength;
  var time = widthFactor * compLoc + this._viewStartTime;
  this.handleZoomWheel(this.getContentLength() * shiftRatio, time, compLoc, true);
};

DvtTimeline.prototype.updateSeries = function()
{
  if (this._series)
  {
    var seriesCount = this._series.length;
    var axisSize = this.getTimeAxisVisibleSize(seriesCount);
    this._seriesSize = (this._canvasSize - axisSize) / seriesCount;
    for (var i = 0; i < seriesCount; i++)
    {
      var series = this._series[i];

      // setup overflow controls
      series.setClipPath(null);
      var cp = new DvtClipPath();
      if (this._isVertical)
      {
        if (this.isRTL())
          var key = Math.abs(i - 1);
        else
          key = i;
        if (this.isRTL() && this._series.length == 1)
        {
          cp.addRect(axisSize, 0, this._seriesSize, this._contentLength);
          var posMatrix = new DvtMatrix(1, 0, 0, 1, axisSize, 0);
        }
        else
        {
          cp.addRect(key * (this._seriesSize + axisSize), 0, this._seriesSize, this._contentLength);
          posMatrix = new DvtMatrix(1, 0, 0, 1, key * (this._seriesSize + axisSize), 0);
        }
        var width = this._seriesSize;
        var height = this._contentLength;
      }
      else
      {
        cp.addRect(0, i * (this._seriesSize + axisSize), this._contentLength, this._seriesSize);
        posMatrix = new DvtMatrix(1, 0, 0, 1, 0, i * (this._seriesSize + axisSize));
        width = this._contentLength;
        height = this._seriesSize;
      }
      series.setClipPath(cp);

      series.setMatrix(posMatrix);
      series.reRender(width, height);
    }
  }
};

DvtTimeline.prototype._handleResize = function(width, height)
{
  this.Width = width;
  this.Height = height;

  this.applyStyleValues();

  this._fetchStartPos = 0;
  if (this._isVertical)
    this._fetchEndPos = height;
  else
    this._fetchEndPos = width;

  this.prepareViewportLength();
  DvtTimelineRenderer._renderBackground(this);

  if (this.hasValidOptions())
  {
    DvtTimelineRenderer._renderInnerCanvas(this, this._canvas);
    this.applyAxisStyleValues();
    this.updateSeries();
    DvtTimelineRenderer._renderAxis(this, this._innerCanvas);
    DvtTimelineRenderer._renderSeriesLabels(this);
    DvtTimelineRenderer._renderScrollHotspots(this);
    DvtTimelineRenderer._renderZoomControls(this);

    if (this._hasOverview)
    {
      DvtTimelineRenderer._renderOverview(this);

      // Reapply selections to overview region
      if (this.SelectionHandler)
      {
        var selection = this.SelectionHandler.getSelectedIds();
        if (selection && selection.length != 0)
        {
          for (var i = 0; i < selection.length; i++)
          {
            this._overview.selSelectItem(selection[i]);
          }
        }
      }
    }
  }
  else
    DvtTimelineRenderer._renderEmptyText(this);
};

DvtTimeline.prototype.HandleKeyDown = function(event)
{
  if (DvtKeyboardEvent.RIGHT_ARROW == event.keyCode || DvtKeyboardEvent.LEFT_ARROW == event.keyCode ||
      DvtKeyboardEvent.DOWN_ARROW == event.keyCode || DvtKeyboardEvent.UP_ARROW == event.keyCode)
    this.updateScrollForItemNavigation(this.EventManager.getFocus());
};

DvtTimeline.prototype.HandleMouseDown = function(event)
{
  this._dragPanSeries = this._findSeries(event.target);
};

DvtTimeline.prototype.beginDragPan = function(compX, compY)
{
  this._currentX = compX;
  this._currentY = compY;
};

DvtTimeline.prototype.HandleTouchEnd = function(event)
{
  if (this._selectionMode != 'none')
    this.handleShapeClick(event, (this._selectionMode == 'multiple'));
};

DvtTimeline.prototype.HandleMouseClick = function(event)
{
  this.handleShapeClick(event, (event.ctrlKey && this._selectionMode == 'multiple'));
};

DvtTimeline.prototype.endDragPan = function()
{
  this._dragPanSeries = null;
  this.endPan();
};

/**
 * Ends panning.
 */
DvtTimeline.prototype.endPan = function()
{
  if (this._triggerViewportChange)
  {
    this._triggerViewportChange = false;
    this.dispatchEvent(new DvtTimelineViewportChangeEvent(DvtTimelineViewportChangeEvent.TYPE, this._viewStartTime, this._viewEndTime, this._scale));
  }
};

DvtTimeline.prototype.endPinchZoom = function()
{
  this._initialPinchZoomDist = null;
  this._initialPinchZoomLoc = null;
  this._initialPinchZoomLength = null;
  this._initialPinchZoomTime = null;
  if (this._triggerViewportChange)
  {
    this._triggerViewportChange = false;
    this.dispatchEvent(new DvtTimelineViewportChangeEvent(DvtTimelineViewportChangeEvent.TYPE, this._viewStartTime, this._viewEndTime, this._scale));
  }
};

DvtTimeline.prototype.contPinchZoom = function(x1, y1, x2, y2)
{
  var currPinchZoomDist = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  if (currPinchZoomDist != this._initialPinchZoomDist)
    this._triggerViewportChange = true;
  var newLength = ((currPinchZoomDist / this._initialPinchZoomDist) * this._initialPinchZoomLength);
  this.handleZoomWheel(newLength, this._initialPinchZoomTime, this._initialPinchZoomLoc, false);
};

DvtTimeline.prototype.contDragPan = function(compX, compY)
{
  if (this._currentX && this._currentY)
  {
    var deltaX = this._currentX - compX;
    var deltaY = this._currentY - compY;
    if (deltaX == 0 && deltaY == 0)
      return false;

    this._triggerViewportChange = true;
    this._currentX = compX;
    this._currentY = compY;
    this.panBy(deltaX, deltaY);
    return true;
  }
  return false;
};

/**
 * Pans the Timeline by the specified amount.
 * @param {number} deltaX The number of pixels to pan in the x direction.
 * @param {number} deltaY The number of pixels to pan in the y direction.
 */
DvtTimeline.prototype.panBy = function(deltaX, deltaY)
{
  var seriesCount = this._series.length;
  var axisSize = this.getTimeAxisVisibleSize(seriesCount);
  if (this._isVertical)
  {
    var minTranslateX;
    var maxTranslateX;
    if (this._dragPanSeries)
    {
      var newTranslateX = this._dragPanSeries.getTranslateX() - deltaX;
      if (this._series.length > 1 && (!this.isRTL() && this._dragPanSeries._isInverted || this.isRTL() && !this._dragPanSeries._isInverted))
      {
        var minTranslateX = axisSize + (2 * this._dragPanSeries.Width) - this._dragPanSeries._maxOverflowValue;
        var maxTranslateX = this._dragPanSeries.Width + axisSize;
      }
      else if (this.isRTL() && !this._dragPanSeries._isInverted)
      {
        minTranslateX = this._dragPanSeries.Width - this._dragPanSeries._maxOverflowValue + axisSize;
        maxTranslateX = axisSize;
      }
      else
      {
        minTranslateX = 0;
        maxTranslateX = this._dragPanSeries._maxOverflowValue - this._dragPanSeries.Width;
      }

      if (newTranslateX < minTranslateX)
        newTranslateX = minTranslateX;
      else if (newTranslateX > maxTranslateX)
        newTranslateX = maxTranslateX;
      this._dragPanSeries.setTranslateX(newTranslateX);
    }

    var newTranslateY = this._innerCanvas.getTranslateY() - deltaY;
    minTranslateY = -(this._contentLength - this._canvasLength - this._startY);
    maxTranslateY = this._startY;

    if (newTranslateY < minTranslateY)
      newTranslateY = minTranslateY;
    else if (newTranslateY > maxTranslateY)
      newTranslateY = maxTranslateY;
    this._innerCanvas.setTranslateY(newTranslateY);

    this._startPos = newTranslateY - this._startY;
    var widthFactor = this.getContentLength() / (this._end - this._start);
    var viewTime = this._viewEndTime - this._viewStartTime;
    this._viewStartTime = this._start - (this._startPos / widthFactor);
    this._viewEndTime = this._viewStartTime + viewTime;
    if (this._hasOverview)
    {
      var overviewLength = this._overview.Height;
      this._overview.setViewportRange(this._viewStartTime, this._viewEndTime, overviewLength);
    }
    //this.dispatchEvent(new DvtTimelineViewportChangeEvent(DvtTimelineViewportChangeEvent.TYPE, this._viewStartTime, this._viewEndTime, this._scale));
  }
  else
  {
    var newTranslateX = this._innerCanvas.getTranslateX() - deltaX;
    minTranslateX = -(this._contentLength - this._canvasLength - this._startX);
    maxTranslateX = this._startX;

    if (newTranslateX < minTranslateX)
      newTranslateX = minTranslateX;
    else if (newTranslateX > maxTranslateX)
      newTranslateX = maxTranslateX;
    this._innerCanvas.setTranslateX(newTranslateX);

    this._startPos = newTranslateX - this._startX;
    if (this.isRTL())
      this._startPos = this._backgroundWidth - this._contentLength - this._startPos;
    var widthFactor = this.getContentLength() / (this._end - this._start);
    var viewTime = this._viewEndTime - this._viewStartTime;
    this._viewStartTime = this._start - (this._startPos / widthFactor);
    this._viewEndTime = this._viewStartTime + viewTime;
    if (this.isRTL())
      this._startPos = this._backgroundWidth - this._contentLength - this._startPos;
    if (this._hasOverview)
    {
      var overviewLength = this._overview.Width;
      this._overview.setViewportRange(this._viewStartTime, this._viewEndTime, overviewLength);
    }
    //this.dispatchEvent(new DvtTimelineViewportChangeEvent(DvtTimelineViewportChangeEvent.TYPE, this._viewStartTime, this._viewEndTime, this._scale));
    if (this._dragPanSeries)
    {
      var newTranslateY = this._dragPanSeries.getTranslateY() - deltaY;
      if (this._dragPanSeries._isInverted)
      {
        var minTranslateY = axisSize + (2 * this._dragPanSeries.Height) - this._dragPanSeries._maxOverflowValue;
        var maxTranslateY = this._dragPanSeries.Height + axisSize;
      }
      else
      {
        var minTranslateY = 0;
        var maxTranslateY = this._dragPanSeries._maxOverflowValue - this._dragPanSeries.Height;
      }

      if (newTranslateY < minTranslateY)
        newTranslateY = minTranslateY;
      else if (newTranslateY > maxTranslateY)
        newTranslateY = maxTranslateY;
      this._dragPanSeries.setTranslateY(newTranslateY);
    }
  }
};

// event callback method
DvtTimeline.prototype.HandleEvent = function(event, component)
{
  var type = event.getType();

  // check for selection event, and handle accordingly
  if (type == 'selection' || type == 'dvtAct')
  {
    DvtEventDispatcher.dispatchEvent(this._callback, this._callbackObj, this, event);
  }
  else if (type == 'overview')
  {
    var subType = event.getSubType();
    if (subType == 'rangeChanging' || subType == 'rangeChange')
    {
      var oldViewTime = this._viewEndTime - this._viewStartTime;
      this._viewStartTime = event.getNewStartTime();
      this._viewEndTime = event.getNewEndTime();
      var viewTime = this._viewEndTime - this._viewStartTime;
      if (viewTime > 0)
      {
        var widthFactor = this._canvasLength / viewTime;
        this.setContentLength(widthFactor * (this._end - this._start));
        this._startPos = widthFactor * (this._start - this._viewStartTime);
        if (this.isRTL() && !this._isVertical)
          this._startPos = this._backgroundWidth - this._contentLength - this._startPos;
        if (oldViewTime > viewTime)
        {
          var zoomLevelOrder = this._zoomLevelLengths.length;
          var minLength = this._zoomLevelLengths[zoomLevelOrder - 1];
          while (this._contentLength >= minLength && zoomLevelOrder > 0)
          {
            zoomLevelOrder--;
            minLength = this._zoomLevelLengths[zoomLevelOrder - 1];
          }
          if (zoomLevelOrder == this._zoomLevelLengths.length)
            zoomLevelOrder--;
          this._zoomLevelOrder = zoomLevelOrder;
          this._timeAxis.setScale(this._timeAxis._zoomOrder[zoomLevelOrder]);
          this._scale = this._timeAxis._scale;
        }
        else
        {
          var zoomLevelOrder = 0;
          var minLength = this._zoomLevelLengths[zoomLevelOrder];
          while (this._contentLength < minLength && zoomLevelOrder < this._zoomLevelLengths.length - 1)
          {
            zoomLevelOrder++;
            minLength = this._zoomLevelLengths[zoomLevelOrder];
          }
          this._zoomLevelOrder = zoomLevelOrder;
          this._timeAxis.setScale(this._timeAxis._zoomOrder[zoomLevelOrder]);
          this._scale = this._timeAxis._scale;
        }
        this.applyAxisStyleValues();
        DvtTimelineRenderer._renderAxis(this, this._innerCanvas);
        this.updateSeries();
        if (this._isVertical)
          this._innerCanvas.setTranslateY(this._startY + this._startPos);
        else
          this._innerCanvas.setTranslateX(this._startX + this._startPos);
      }
      if (subType == 'rangeChange')
        this.dispatchEvent(new DvtTimelineViewportChangeEvent(DvtTimelineViewportChangeEvent.TYPE, this._viewStartTime, this._viewEndTime, this._scale));
    }
    if (subType == 'scrollPos' || subType == 'scrollTime')
    {
      this._viewStartTime = event.getNewStartTime();
      this._viewEndTime = event.getNewEndTime();
      var widthFactor = this.getContentLength() / (this._end - this._start);
      this._startPos = widthFactor * (this._start - this._viewStartTime);
      if (this.isRTL() && !this._isVertical)
        this._startPos = this._backgroundWidth - this._contentLength - this._startPos;
      if (this._isVertical)
        this._innerCanvas.setTranslateY(this._startY + this._startPos);
      else
        this._innerCanvas.setTranslateX(this._startX + this._startPos);
      this.dispatchEvent(new DvtTimelineViewportChangeEvent(DvtTimelineViewportChangeEvent.TYPE, this._viewStartTime, this._viewEndTime, this._scale));
    }
  }
  else if (type = 'timeline')
  {
    var subType = event.getSubType();
    if (subType == 'selection')
    {
      var selectedItemId = event.getItemId();
      var isMultiSelect = event.isMultiSelect() && this._selectionMode == 'multiple';
      for (var i = 0; i < this._series.length; i++)
      {
        var s = this._series[i];
        for (var j = 0; j < s._items.length; j++)
        {
          var item = s._items[j];
          if (item.getId() == selectedItemId)
          {
            this.SelectionHandler._addToSelection(item, isMultiSelect);
            this.EventManager.setFocusObj(item);
            this.updateScrollForItemSelection(item);
            break;
          }
        }
      }
    }
    else if (subType == 'highlight')
    {
      var itemId = event.getItemId();
      for (var i = 0; i < this._series.length; i++)
      {
        var s = this._series[i];
        for (var j = 0; j < s._items.length; j++)
        {
          var item = s._items[j];
          if (item.getId() == itemId)
          {
            item.showHoverEffect(true);
            break;
          }
        }
      }
    }
    else if (subType == 'unhighlight')
    {
      var itemId = event.getItemId();
      for (var i = 0; i < this._series.length; i++)
      {
        var s = this._series[i];
        for (var j = 0; j < s._items.length; j++)
        {
          var item = s._items[j];
          if (item.getId() == itemId)
          {
            item.hideHoverEffect(true);
            break;
          }
        }
      }
    }
  }
};

DvtTimeline.prototype.enableZoomButton = function(isZoomIn)
{
  if (isZoomIn)
  {
    this.zoomin.setEnabled(true);
    this.zoomin.drawUpState();
  }
  else
  {
    this.zoomout.setEnabled(true);
    this.zoomout.drawUpState();
  }
};

DvtTimeline.prototype.disableZoomButton = function(isZoomIn)
{
  if (isZoomIn)
  {
    this.zoomin.setEnabled(false);
    this.zoomin.drawDisabledState();
    this.zoomin.setCursor(null);
  }
  else
  {
    this.zoomout.setEnabled(false);
    this.zoomout.drawDisabledState();
    this.zoomout.setCursor(null);
  }
};

DvtTimeline.prototype.updateScrollForItemSelection = function(item)
{
  var viewSize = this._viewEndTime - this._viewStartTime;
  this._viewStartTime = item.getStartTime() - (viewSize / 2);
  if (this._viewStartTime < this._start)
    this._viewStartTime = this._start;
  else if ((this._viewStartTime + viewSize) > this._end)
    this._viewStartTime = (this._end - viewSize);
  this._viewEndTime = this._viewStartTime + viewSize;
  var widthFactor = this.getContentLength() / (this._end - this._start);
  this._startPos = widthFactor * (this._start - this._viewStartTime);
  if (this.isRTL() && !this._isVertical)
    this._startPos = this._backgroundWidth - this._contentLength - this._startPos;
  if (this._isVertical)
    this._innerCanvas.setTranslateY(this._startY + this._startPos);
  else
    this._innerCanvas.setTranslateX(this._startX + this._startPos);
  this.dispatchEvent(new DvtTimelineViewportChangeEvent(DvtTimelineViewportChangeEvent.TYPE, this._viewStartTime, this._viewEndTime, this._scale));
};

DvtTimeline.prototype.updateScrollForItemNavigation = function(item)
{
  var itemSize = this._isVertical ? item.getHeight() : item.getWidth();
  var itemHoverStrokeWidth = DvtTimelineStyleUtils.getItemHoverStrokeWidth();
  var itemStart = item.getLoc() - (this._isVertical ? (itemSize / 2) + itemHoverStrokeWidth : DvtTimelineStyleUtils.getBubbleOffset() + itemHoverStrokeWidth);
  if (this.isRTL() && !this._isVertical)
  {
    itemStart = itemStart - itemHoverStrokeWidth;
    this._startPos = this._backgroundWidth - this._contentLength - this._startPos;
  }
  var itemEnd = itemStart + itemSize + 2 * itemHoverStrokeWidth;
  var endPos = this._startPos - this._canvasLength;

  if (-itemStart > this._startPos)
    this._startPos = -itemStart;
  else if (-itemEnd < endPos)
    this._startPos = -itemEnd + this._canvasLength;

  var widthFactor = this.getContentLength() / (this._end - this._start);
  var viewTime = this._viewEndTime - this._viewStartTime;
  this._viewStartTime = this._start - (this._startPos / widthFactor);
  if (this._viewStartTime < this._start)
  {
    this._viewStartTime = this._start;
    this._startPos = (this._start - this._viewStartTime) * widthFactor;
  }
  this._viewEndTime = this._viewStartTime + viewTime;
  if (this._viewEndTime > this._end)
  {
    this._viewEndTime = this._end;
    this._viewStartTime = this._viewEndTime - viewTime;
    this._startPos = (this._start - this._viewStartTime) * widthFactor;
  }
  if (this.isRTL() && !this._isVertical)
    this._startPos = this._backgroundWidth - this._contentLength - this._startPos;
  if (this._isVertical)
    this._innerCanvas.setTranslateY(this._startY + this._startPos);
  else
    this._innerCanvas.setTranslateX(this._startX + this._startPos);

  if (this._hasOverview)
  {
    if (this._isVertical)
      var overviewLength = this._overview.Height;
    else
      overviewLength = this._overview.Width;
    this._overview.setViewportRange(this._viewStartTime, this._viewEndTime, overviewLength);
  }
  this.dispatchEvent(new DvtTimelineViewportChangeEvent(DvtTimelineViewportChangeEvent.TYPE, this._viewStartTime, this._viewEndTime, this._scale));
};

DvtTimeline.prototype.handleShapeClick = function(event)
{
  if (event)
  {
    var drawable = this._findDrawable(event.target);
    if (drawable)
    {
      var series = this._findSeries(drawable);
      if (drawable._node)
      {
        // action event support
        series = this._findSeries(drawable);
        series.HandleItemAction(drawable._node);
      }
    }
  }
};

DvtTimeline.prototype.applyInitialSelections = function()
{
  if (this.Options['selection'])
  {
    var items = [];
    for (var i = 0; i < this._series.length; i++)
    {
      var s = this._series[i];
      for (var j = 0; j < s._items.length; j++)
      {
        items.push(s._items[j]);
      }
    }
  }
  this.SelectionHandler.processInitialSelections(this.Options['selection'], items);
};

DvtTimeline.prototype.processEvent = function(event)
{
  if (event)
    this.dispatchEvent(event);
};

DvtTimeline.prototype._findSeries = function(target)
{
  if (this.hasValidOptions() && target && target != this)
  {
    var id = target.getId();
    if (target == this._series[0] || (this._series.length > 1 && target == this._series[1]))
      return target;
    if (id && id.substring(id.length - 3, id.length) == '_s0')
      return this._series[0];
    else if (id && id.substring(id.length - 3, id.length) == '_s1')
      return this._series[1];
    else
      return this._findSeries(target.getParent());
  }
  return null;
};

DvtTimeline.prototype._findDrawable = function(target)
{
  if (target)
  {
    var id = target.getId();
    if (id && id.substring(0, 10) == '_duration_' && target._node)
      return target;

    var parent = target.getParent();
    if (parent)
    {
      if (id && id.substring(0, 4) == 'zoom')
        return target;

      if (id && id.substring(0, 8) == '_bubble_' && parent._node)
        return parent;

      var grandParent = parent.getParent();
      if (grandParent)
      {
        if (id && id.substring(0, 8) == '_bubble_' && grandParent._node)
          return grandParent;

        id = grandParent.getId();
        if (id && id.substring(0, 8) == '_bubble_' && grandParent.getParent())
          return grandParent.getParent();
      }
    }
  }
  return null;
};

/**
 * Returns the automation object for this timeline
 * @return {DvtAutomation} The automation object
 * @export
 */
DvtTimeline.prototype.getAutomation = function()
{
  if (!this.Automation)
    this.Automation = new DvtTimelineAutomation(this);
  return this.Automation;
};

/**
 * @override
 */
DvtTimeline.prototype.getEventManager = function()
{
  return this.EventManager;
};

/**
 * Removes all children from the timeline's canvas.
 */
DvtTimeline.prototype.clearTimeline = function()
{
  if (this._canvas)
    this._canvas.removeChildren();
  this.clearOverview();
};

/**
 * Removes the overview canvas from the timeline.
 */
DvtTimeline.prototype.clearOverview = function()
{
  if (this._overviewCanvas)
  {
    this.removeChild(this._overviewCanvas);
    this._overviewCanvas = null;
  }
};

/*
DvtTimeline.prototype.prepareTimeAxis = function(startDate, endDate)
{
  var context = this.getCtx();
  var axisLabelStyle = new DvtCSSStyle(DvtTimeline.DEFAULT_AXIS_LABEL_STYLE);
  if (this._axisStyleDefaults)
    axisLabelStyle.parseInlineStyle(this._axisStyleDefaults['labelStyle']);

  var axis = new DvtRect(context, 0, 0, 0, 0, 'tempAxis');
  var minW = Infinity;
  var maxH = 0;

  this._dates = [];
  this._labels = [];
  var currentDate = this._timeAxis.adjustDate(startDate).getTime();
  this._dates.push(currentDate);
  while (currentDate < endDate)
  {
    var labelText = this._timeAxis.formatDate(this._timeAxis.adjustDate(currentDate));
    var label = new DvtOutputText(context, labelText, 0, 0, 's_label' + currentDate);
    label.setCSSStyle(axisLabelStyle);
    // save the time associated with the element for dynamic resize
    label.time = currentDate;
    this._labels.push(label);
    var nextDate = this._timeAxis.getNextDate(this._timeAxis.adjustDate(currentDate)).getTime();

    // update maximum label width and height
    axis.addChild(label);
    var dim = label.getDimensions();
    axis.removeChild(label);
    var labelWidth = Math.max(DvtTimeComponentAxis.DEFAULT_INTERVAL_WIDTH, (dim.w + DvtTimeComponentAxis.DEFAULT_INTERVAL_PADDING * 2));
    var widthFactor = (nextDate - currentDate) / labelWidth;
    if (widthFactor < minW)
      minW = widthFactor;
    if (dim.h > maxH)
      maxH = dim.h;

    // the last currentDate added in this loop is outside of the time range, but is needed
    // for the last 'next' date when actually creating the time axis in renderTimeAxis
    currentDate = nextDate;
    this._dates.push(currentDate);
  }
  this._timeAxis.setContentSize(maxH + DvtTimeComponentAxis.DEFAULT_INTERVAL_PADDING * 2);
  this.setContentLength((endDate - startDate) / minW);
};
*/
/**
 * Timeline automation service.
 * @param {DvtTimeline} timeline The owning DvtTimeline.
 * @class  DvtTimelineAutomation
 * @implements {DvtAutomation}
 * @constructor
 * @export
 */
var DvtTimelineAutomation = function(timeline)
{
  this._timeline = timeline;
};

DvtObj.createSubclass(DvtTimelineAutomation, DvtAutomation, 'DvtTimelineAutomation');

DvtTimelineAutomation.TIMELINE_ITEM_STRING = 'timelineItem';

/**
 * Valid subIds inlcude:
 * <ul>
 * <li>timelineItem[seriesIndex][itemIndex]</li>
 * </ul>
 * @override
 */
DvtTimelineAutomation.prototype.GetSubIdForDomElement = function(displayable)
{
  var logicalObj = this._timeline.EventManager.GetLogicalObject(displayable);
  if (logicalObj && (logicalObj instanceof DvtTimelineSeriesNode))
  {
    for (var i = 0; i < this._timeline._series.length; i++)
    {
      var series = this._timeline._series[i];
      var itemIndex = DvtArrayUtils.getIndex(series._items, logicalObj);
      if (itemIndex != -1)
        return DvtTimelineAutomation.TIMELINE_ITEM_STRING + '[' + i + '][' + itemIndex + ']';
    }
  }
  return null;
};

/**
 * Valid subIds inlcude:
 * <ul>
 * <li>timelineItem[seriesIndex][itemIndex]</li>
 * </ul>
 * @override
 * @export
 */
DvtTimelineAutomation.prototype.getDomElementForSubId = function(subId)
{
  if (subId)
  {
    var parenIndex = subId.indexOf('[');
    if (parenIndex > 0 && subId.substring(0, parenIndex) === DvtTimelineAutomation.TIMELINE_ITEM_STRING)
    {
      var endParenIndex = subId.indexOf(']');
      if (endParenIndex > 0)
      {
        var seriesIndex = parseInt(subId.substring(parenIndex + 1, endParenIndex));
        var itemIndex = parseInt(subId.substring(endParenIndex + 2, subId.length - 1));

        var series = this._timeline._series[seriesIndex];
        if (series)
        {
          var node = series._items[itemIndex];
          if (node)
            return node.getDisplayables()[0].getElem();
        }
      }
    }
  }
  return null;
};
/**
 * Default values and utility functions for component versioning.
 * @class
 * @constructor
 * @extends {DvtBaseComponentDefaults}
 */
var DvtTimelineDefaults = function()
{
  this.Init({'alta': DvtTimelineDefaults.VERSION_1});
};

DvtObj.createSubclass(DvtTimelineDefaults, DvtBaseComponentDefaults, 'DvtTimelineDefaults');

/**
 * Contains overrides for version 1.
 * @const
 */
DvtTimelineDefaults.VERSION_1 = {
  'animationOnDataChange': 'none',
  'animationOnDisplay': 'none',
  'orientation': 'horizontal',
  'overview': {
    'rendered': 'off'
  },
  'selectionMode': 'none',
  'styleDefaults': {
    'animationDuration': 500,
    'borderColor': '#d9dfe3',
    'item': {
      'backgroundColor': '#ffffff',
      'borderColor': '#648baf',
      'descriptionStyle': new DvtCSSStyle('font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 12px; color: #084B8A; white-space: nowrap;'),
      'hoverBorderColor': '#85bbe7',
      'selectedBorderColor': '#000000',
      'titleStyle': new DvtCSSStyle('font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: bold; color: #000000; white-space: nowrap;')
    },
    'majorAxis': {
      'labelStyle': new DvtCSSStyle('font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: bold; color: #4f4f4f; background-color: rgba(249,249,249,0.8); white-space: nowrap;'),
      'separatorColor': '#bcc7d2'
    },
    'minorAxis': {
      'backgroundColor': '#f9f9f9',
      'borderColor': '#d9dfe3',
      'labelStyle': new DvtCSSStyle('font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 12px; color: #333333;'),
      'separatorColor': '#bcc7d2'
    },
    'overview': {
      'backgroundColor': '#e6ecf3',
      'labelStyle': new DvtCSSStyle('font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: bold; color: #4f4f4f;'),
      'window': {
        'backgroundColor': '#ffffff',
        'borderColor': '#4f4f4f'
      }
    },
    'referenceObject': {
      'color': '#ff591f'
    },
    'series': {
      'backgroundColor': '#f9f9f9',
      'colors': DvtCSSStyle.COLORS_ALTA,
      'emptyTextStyle': new DvtCSSStyle('font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: normal; color: #333333; white-space: nowrap;'),
      'labelStyle': new DvtCSSStyle('font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: bold; color: #252525; background-color: rgba(249,249,249,0.8); white-space: nowrap;')
    }
  }
};
/**
 * Timeline JSON Parser
 * @class
 * @constructor
 * @extends {DvtObj}
 */
var DvtTimelineParser = function() {

};

DvtObj.createSubclass(DvtTimelineParser, DvtObj, 'DvtTimelineParser');

/**
 * Parses the specified XML String and returns the root node of the timeline
 * @param {string} options The String containing XML describing the component.
 * @return {object} An object containing the parsed properties
 */
DvtTimelineParser.prototype.parse = function(options)
{
  this._itemSelection = options['selectionMode'];

  if (options['viewportStart'])
    this._viewStartTime = new Date(options['viewportStart']);
  if (options['viewportEnd'])
    this._viewEndTime = new Date(options['viewportEnd']);

  // Code from superclass parser...
  this._startTime = new Date(options['start']);
  this._endTime = new Date(options['end']);

  var ret = this.ParseRootAttributes();

  ret.inlineStyle = options['style'];
  // end of stuff from superclass parser...

  var minorAxis = options['minorAxis'];
  if (minorAxis)
  {
    var scale = minorAxis['scale'];
    ret.scale = scale;
    var zoomOrder = minorAxis['zoomOrder'];
    if (zoomOrder == null)
      zoomOrder = [scale];
    else
    {
      // TODO: update zoom implementation to handle longest value first
      // for now, just reverse order to ensure no regressions
      zoomOrder.reverse();
    }
    ret.zoomOrder = zoomOrder;
    ret.converter = minorAxis['converter'];
    ret.axisStyle = minorAxis['style'];
  }
  var majorAxis = options['majorAxis'];
  if (majorAxis)
  {
    ret.seriesScale = majorAxis['scale'];
    ret.seriesConverter = majorAxis['converter'];
  }
  ret.shortDesc = options['shortDesc'];
  ret.id = options['id'];
  ret.orientation = options['orientation'];
  var referenceObjects = options['referenceObjects'];
  if (referenceObjects && referenceObjects.length > 0)
  {
    var referenceObjectsValueArray = [];
    for (var i = 0; i < referenceObjects.length; i++)
    {
      referenceObjectsValueArray.push(new Date(referenceObjects[i]['value']));
    }
    ret.referenceObjects = referenceObjectsValueArray;
  }

  var overview = options['overview'];
  if (overview != null && overview['rendered'] == 'on')
    ret.hasOverview = true;
  else
    ret.hasOverview = false;

  return ret;
};


/**
 * Parses the attributes on the root node.
 * @return {object} An object containing the parsed properties
 * @protected
 */
DvtTimelineParser.prototype.ParseRootAttributes = function() 
{
  // stuff from superclass parser...
  // The object that will be populated with parsed values and returned
  var ret = new Object();

  ret.origStart = this._startTime;
  ret.origEnd = this._endTime;
  ret.orientation = 'horizontal';
  // end of stuff from superclass parser...

  ret.start = this._startTime.getTime();
  ret.end = this._endTime.getTime();
  if (this._viewStartTime)
    ret.viewStart = this._viewStartTime.getTime();
  if (this._viewEndTime)
    ret.viewEnd = this._viewEndTime.getTime();
  ret.selectionMode = 'none';
  if (this._itemSelection != null)
    ret.selectionMode = this._itemSelection;

  return ret;
};
/**
 * Renderer for DvtTimeline.
 * @class
 */
var DvtTimelineRenderer = new Object();

DvtObj.createSubclass(DvtTimelineRenderer, DvtObj, 'DvtTimelineRenderer');

/**
 * Renders a timeline.
 * @param {DvtTimeline} timeline The timeline being rendered.
 */
DvtTimelineRenderer.renderTimeline = function(timeline)
{
  DvtTimelineRenderer._renderBackground(timeline);
  DvtTimelineRenderer._renderScrollableCanvas(timeline);

  if (timeline.hasValidOptions())
  {
    DvtTimelineRenderer._renderInnerCanvas(timeline, timeline._canvas);
    DvtTimelineRenderer._renderSeries(timeline, timeline._innerCanvas);
    DvtTimelineRenderer._renderSeriesLabels(timeline);
    DvtTimelineRenderer._renderAxis(timeline, timeline._innerCanvas);

    if (timeline._hasOverview)
      DvtTimelineRenderer._renderOverview(timeline);
    else
      timeline.clearOverview();

    // just use the first object as the focus
    if (timeline._keyboardHandler)
    {
      for (var i = 0; i < timeline._series.length; i++)
      {
        var series = timeline._series[i];
        if (series._items && series._items.length > 0)
        {
          timeline.EventManager.setFocusObj(series._items[0]);
          break;
        }
      }
    }

    // render scroll hotspots now so they are on top of everything
    DvtTimelineRenderer._renderScrollHotspots(timeline);
    DvtTimelineRenderer._renderZoomControls(timeline);

    // Initial Selection
    if (timeline.SelectionHandler)
      timeline.applyInitialSelections();

    if (DvtTimeUtils.supportsTouch())
      timeline._setAriaProperty('flowto', timeline._series[0].getId());

    for (var i = 0; i < timeline._series.length; i++)
    {
      var series = timeline._series[i];
      series.triggerAnimations();
    }
    if (DvtAgent.isEnvironmentBrowser() && !timeline.isAnimating())
      timeline.showThenHideHotspots(0);
  }
  else
    DvtTimelineRenderer._renderEmptyText(timeline);
};

/**
 * Renders the background of a timeline.
 * @param {DvtTimeline} timeline The timeline being rendered.
 * @private
 */
DvtTimelineRenderer._renderBackground = function(timeline)
{
  if (timeline._background)
  {
    timeline._background.setClipPath(null);
    timeline._background.setWidth(timeline._backgroundWidth);
    timeline._background.setHeight(timeline._backgroundHeight);
  }
  else
    timeline._background = new DvtRect(timeline.getCtx(), 0, 0, timeline._backgroundWidth, timeline._backgroundHeight, 'bg');

  timeline._background.setCSSStyle(timeline._style);
  timeline._background.setPixelHinting(true);

  var cp = new DvtClipPath();
  cp.addRect(0, 0, timeline._backgroundWidth, timeline._backgroundHeight);
  timeline._background.setClipPath(cp);

  if (timeline._background.getParent() != timeline)
    timeline.addChild(timeline._background);
};

/**
 * Renders the scrollable canvas of a timeline.
 * @param {DvtTimeline} timeline The timeline being rendered.
 * @private
 */
DvtTimelineRenderer._renderScrollableCanvas = function(timeline)
{
  if (timeline._canvas)
    return;
  timeline._canvas = new DvtContainer(timeline.getCtx(), 'canvas');
  timeline.addChild(timeline._canvas);
};

/**
 * Renders the inner canvas of a timeline.
 * @param {DvtTimeline} timeline The timeline being rendered.
 * @param {DvtContainer} container The container to render into.
 * @private
 */
DvtTimelineRenderer._renderInnerCanvas = function(timeline, container)
{
  if (timeline._innerCanvas)
    timeline._innerCanvas.setClipPath(null);
  else
    timeline._innerCanvas = new DvtContainer(timeline.getCtx(), 'iCanvas');

  var cp = new DvtClipPath();
  if (timeline.isVertical())
  {
    cp.addRect(timeline._startX, timeline._startY, timeline._canvasSize, timeline._canvasLength);
    timeline._innerCanvas.setTranslateX(timeline._startX);
    timeline._innerCanvas.setTranslateY(timeline._startY + timeline._startPos);
  }
  else
  {
    cp.addRect(timeline._startX, timeline._startY, timeline._canvasLength, timeline._canvasSize);
    timeline._innerCanvas.setTranslateX(timeline._startX + timeline._startPos);
    timeline._innerCanvas.setTranslateY(timeline._startY);
  }
  container.setClipPath(cp);

  if (timeline._innerCanvas.getParent() != container)
    container.addChild(timeline._innerCanvas);
};

/**
 * Renders the series of a timeline.
 * @param {DvtTimeline} timeline The timeline being rendered.
 * @param {DvtContainer} container The container to render into.
 * @private
 */
DvtTimelineRenderer._renderSeries = function(timeline, container)
{
  if (timeline._series)
  {
    var context = timeline.getCtx();
    var isRTL = DvtAgent.isRightToLeft(context);

    var seriesCount = timeline._series.length;
    var axisSize = timeline.getTimeAxisVisibleSize(seriesCount);
    if (!timeline.isVertical())
    {
      if (seriesCount > 1 && (timeline._canvasSize % 2 != axisSize % 2))
      {
        timeline._timeAxis.setContentSize(timeline._timeAxis.getContentSize() + 1);
        axisSize = timeline.getTimeAxisVisibleSize(seriesCount);
      }
    }
    timeline._seriesSize = (timeline._canvasSize - axisSize) / seriesCount;
    for (var i = 0; i < seriesCount; i++)
    {
      var series = timeline._series[i];

      // setup overflow controls
      series.setClipPath(null);
      var cp = new DvtClipPath();
      if (timeline.isVertical())
      {
        if (isRTL)
          var key = Math.abs(i - 1);
        else
          key = i;
        if (isRTL && timeline._series.length == 1)
        {
          cp.addRect(axisSize, 0, timeline._seriesSize, timeline._contentLength);
          var posMatrix = new DvtMatrix(1, 0, 0, 1, axisSize, 0);
        }
        else
        {
          cp.addRect(key * (timeline._seriesSize + axisSize), 0, timeline._seriesSize, timeline._contentLength);
          posMatrix = new DvtMatrix(1, 0, 0, 1, key * (timeline._seriesSize + axisSize), 0);
        }
        var width = timeline._seriesSize;
        var height = timeline._contentLength;
      }
      else
      {
        cp.addRect(0, i * (timeline._seriesSize + axisSize), timeline._contentLength, timeline._seriesSize);
        posMatrix = new DvtMatrix(1, 0, 0, 1, 0, i * (timeline._seriesSize + axisSize));
        width = timeline._contentLength;
        height = timeline._seriesSize;
      }
      series.setClipPath(cp);
      series.setMatrix(posMatrix);

      if (series.getParent() != container)
        container.addChild(series);
      series.render(timeline._seriesOptions[i], width, height);
    }
  }
};

/**
 * Renders the series labels of a timeline.
 * @param {DvtTimeline} timeline The timeline being rendered.
 * @private
 */
DvtTimelineRenderer._renderSeriesLabels = function(timeline)
{
  if (timeline._series)
  {
    var context = timeline.getCtx();
    var isRTL = DvtAgent.isRightToLeft(context);

    if (timeline._seriesLabels)
    {
      for (var i = 0; i < timeline._seriesLabels.length; i++)
      {
        timeline.removeChild(timeline._seriesLabels[i]);
      }
    }
    timeline._seriesLabels = [];

    var seriesCount = timeline._series.length;
    var labelSpacing = DvtTimelineStyleUtils.getSeriesLabelSpacing();
    //TODO: Update to use zoom control spacing constant rather than '6'
    var zoomControlSpacing = DvtTransientButton._DEFAULT_RADIUS * 2 + 6;
    var doubleLabelSpacing = labelSpacing * 2;
    for (var i = 0; i < seriesCount; i++)
    {
      var series = timeline._series[i];
      var seriesLabel = series.getLabel();
      if (seriesLabel != null)
      {
        var seriesLabelStyle = DvtTimelineStyleUtils.getSeriesLabelStyle(timeline.Options);
        var seriesLabelElem = new DvtOutputText(context, seriesLabel, 0, 0, 'sl_s' + i);
        seriesLabelElem.setCSSStyle(seriesLabelStyle);

        timeline.addChild(seriesLabelElem);
        var dim = seriesLabelElem.getDimensions();
        timeline.removeChild(seriesLabelElem);
        if (timeline.isVertical())
          var totalSpace = timeline._seriesSize;
        else
          totalSpace = timeline._canvasLength;
        var width = Math.min(dim.w, totalSpace - (i - 1) * -zoomControlSpacing - doubleLabelSpacing);

        var seriesLabelPadding = DvtTimelineStyleUtils.getSeriesLabelPadding();
        var backgroundRect = new DvtRect(context, 0, 0, width + seriesLabelPadding * 2, dim.h + seriesLabelPadding * 2, 'slb_s' + i);
        backgroundRect.setCSSStyle(seriesLabelStyle);
        backgroundRect.setCornerRadius(3);

        if (!timeline.isVertical())
        {
          if (isRTL)
            var posX = timeline._canvasLength - width - labelSpacing - (i - 1) * -zoomControlSpacing;
          else
            posX = timeline._startX + labelSpacing + (i - 1) * -zoomControlSpacing;
          var posY = i * (timeline._canvasSize - dim.h - doubleLabelSpacing) + labelSpacing + timeline._startY;
        }
        else
        {
          if (isRTL)
          {
            var key = Math.abs(i - 1);
            posX = key * (timeline._canvasSize - width - doubleLabelSpacing) + labelSpacing + timeline._startX + (i - 1) * zoomControlSpacing;
          }
          else
            posX = i * (timeline._canvasSize - width - doubleLabelSpacing) + labelSpacing + timeline._startX + (i - 1) * -zoomControlSpacing;
          posY = timeline._startY + labelSpacing;
        }
        var posMatrix = new DvtMatrix(1, 0, 0, 1, posX, posY);
        seriesLabelElem.setMatrix(posMatrix);
        posMatrix = new DvtMatrix(1, 0, 0, 1, posX - seriesLabelPadding, posY - seriesLabelPadding);
        backgroundRect.setMatrix(posMatrix);

        timeline.addChild(backgroundRect);
        DvtTextUtils.fitText(seriesLabelElem, width, Infinity, timeline);
        timeline._seriesLabels.push(backgroundRect);
        timeline._seriesLabels.push(seriesLabelElem);
      }
      if (series._isEmpty)
      {
        var seriesEmptyText = series.getEmptyText();
        if (seriesEmptyText != null)
        {
          var seriesEmptyTextElem = new DvtOutputText(context, seriesEmptyText, 0, 0, 'et_s' + i);
          seriesEmptyTextElem.setCSSStyle(DvtTimelineStyleUtils.getEmptyTextStyle(timeline.Options));

          timeline.addChild(seriesEmptyTextElem);
          var dim = seriesEmptyTextElem.getDimensions();
          timeline.removeChild(seriesEmptyTextElem);

          var posMatrix = new DvtMatrix(1, 0, 0, 1, (timeline._canvasLength - dim.w) / 2 + timeline._startX, i * (timeline._seriesSize + timeline.getTimeAxisVisibleSize(seriesCount)) + ((timeline._seriesSize - dim.h) / 2) + timeline._startY);
          seriesEmptyTextElem.setMatrix(posMatrix);

          timeline.addChild(seriesEmptyTextElem);
          timeline._seriesLabels.push(seriesEmptyTextElem);
        }
      }
    }
  }
};

/**
 * Renders the minor time axis of a timeline.
 * @param {DvtTimeline} timeline The timeline being rendered.
 * @param {DvtContainer} container The container to render into.
 * @private
 */
DvtTimelineRenderer._renderAxis = function(timeline, container)
{
  var context = timeline.getCtx();
  var isRTL = DvtAgent.isRightToLeft(context);

  var seriesCount = timeline._series.length;
  var axisSize = timeline.getTimeAxisSize();
  var axisVisibleSize = timeline.getTimeAxisVisibleSize(seriesCount);
  var axisStart = seriesCount == 1 ? (timeline._canvasSize - axisVisibleSize) : (timeline._canvasSize / seriesCount - (axisVisibleSize / 2));
  if (isRTL && timeline.isVertical() && timeline._series.length == 1)
    axisStart = 0;

  if (timeline._axis == null)
  {
    var cp = new DvtClipPath();
    if (timeline.isVertical())
    {
      timeline._axis = new DvtRect(context, axisStart, -timeline._axisBorderWidth, axisSize, timeline._axisLength, 'axis');
      cp.addRect(axisStart, 0, axisSize, timeline._contentLength);
    }
    else
    {
      timeline._axis = new DvtRect(context, -timeline._axisBorderWidth, axisStart, timeline._axisLength, axisSize, 'axis');
      cp.addRect(0, axisStart, timeline._contentLength, axisSize);
    }
    timeline._axis.setCSSStyle(timeline._axisStyle);
    timeline._axis.setPixelHinting(true);
    timeline._axis.setClipPath(cp);

    container.addChild(timeline._axis);
  }
  else
  {
    timeline._axis.setClipPath(null);
    cp = new DvtClipPath();
    if (timeline.isVertical())
    {
      timeline._axis.setX(axisStart);
      timeline._axis.setY(-timeline._axisBorderWidth);
      timeline._axis.setWidth(axisSize);
      timeline._axis.setHeight(timeline._axisLength);
      cp.addRect(axisStart, 0, axisSize, timeline._contentLength);
    }
    else
    {
      timeline._axis.setX(-timeline._axisBorderWidth);
      timeline._axis.setY(axisStart);
      timeline._axis.setWidth(timeline._axisLength);
      timeline._axis.setHeight(axisSize);
      cp.addRect(0, axisStart, timeline._contentLength, axisSize);
    }
    timeline._axis.setClipPath(cp);
  }

  DvtTimelineRenderer._renderSeriesTicks(timeline, axisStart);
};

/**
 * Renders the major time axis labels of a timeline.
 * @param {DvtTimeline} timeline The timeline being rendered.
 * @param {number} axisStartPos The start position of the axis.
 * @private
 */
DvtTimelineRenderer._renderSeriesTicks = function(timeline, axisStartPos)
{
  // remove all existing ticks and labels
  timeline._axis.removeChildren();

  var separatorStyle = new DvtCSSStyle(DvtTimelineStyleUtils.getAxisSeparatorStyle());
  if (timeline._axisStyleDefaults)
  {
    var separatorColor = timeline._axisStyleDefaults['separatorColor'];
    if (separatorColor)
      separatorStyle.parseInlineStyle('color:' + separatorColor + ';');
  }
  timeline._separatorStroke = new DvtSolidStroke(separatorStyle.getStyle(DvtCSSStyle.COLOR));

  var axisSize = timeline._timeAxis.getContentSize();
  var axisStart = axisStartPos + timeline._timeAxis._borderWidth;
  var axisEnd = (axisStart + axisSize);
  DvtTimelineRenderer._renderTimeAxis(timeline, timeline._fetchStartPos, timeline._fetchEndPos, timeline._axis, timeline._contentLength, axisEnd, axisStart, axisStart);
  DvtTimelineRenderer._renderSeriesTimeAxis(timeline, timeline._fetchStartPos, timeline._fetchEndPos, timeline._innerCanvas, timeline._contentLength);
};

/**
 * Renders the minor time axis of a timeline.
 * @param {DvtTimeline} timeline The timeline being rendered.
 * @param {number} startPos The start position for rendering.
 * @param {number} endPos The end position for rendering.
 * @param {DvtContainer} container The container to render into.
 * @param {number} length The length of the axis.
 * @param {number} axisEnd The end position of the axis.
 * @param {number} tickStart The start position of the first interval.
 * @param {number} labelStart The start position of the first label.
 * @private
 */
DvtTimelineRenderer._renderTimeAxis = function(timeline, startPos, endPos, container, length, axisEnd, tickStart, labelStart)
{
  var context = timeline.getCtx();
  var isRTL = DvtAgent.isRightToLeft(context);

  var block = new DvtContainer(context, 'block_' + startPos + '_' + endPos);
  block.startPos = startPos;
  block.endPos = endPos;
  container.addChild(block);

  // the last date in dates is past the end time, and only used as the last 'next' date
  var dates = timeline._dates[timeline._zoomLevelOrder];
  var labels = timeline._labels[timeline._zoomLevelOrder];
  for (var i = 0; i < dates.length - 1; i++)
  {
    var date = dates[i];
    var next = dates[i + 1];

    var currentPos = DvtTimeUtils.getDatePosition(timeline._start, timeline._end, date, length);
    var nextPos = DvtTimeUtils.getDatePosition(timeline._start, timeline._end, next, length);
    var maxLength = nextPos - currentPos;

    if (currentPos != 0)
    {
      if (timeline.isVertical())
        var tickElem = timeline.addTick(block, axisEnd, tickStart, currentPos, currentPos, timeline._separatorStroke, 's_tick' + date);
      else if (!isRTL)
        tickElem = timeline.addTick(block, currentPos, currentPos, axisEnd, tickStart, timeline._separatorStroke, 's_tick' + date);
      else
        tickElem = timeline.addTick(block, length - currentPos, length - currentPos, axisEnd, tickStart, timeline._separatorStroke, 's_tick' + date);
      // save the time associated with the element for dynamic resize
      tickElem.time = date;
    }
    if (timeline.isVertical())
      timeline.addAxisLabel(block, labels[i], labelStart + ((axisEnd - labelStart) / 2), currentPos + ((nextPos - currentPos) / 2) - 7, axisEnd - labelStart);
    else if (!isRTL)
      timeline.addAxisLabel(block, labels[i], currentPos + ((nextPos - currentPos) / 2), labelStart + 2, maxLength);
    else
      timeline.addAxisLabel(block, labels[i], length - (currentPos + ((nextPos - currentPos) / 2)), labelStart + 2, maxLength);
  }
};

/**
 * Renders the major time axis labels of a timeline.
 * @param {DvtTimeline} timeline The timeline being rendered.
 * @param {number} startPos The start position of the rendering.
 * @param {number} endPos The end position of the rendering.
 * @param {DvtContainer} container The container to render into.
 * @param {number} length The length of the axis.
 * @private
 */
DvtTimelineRenderer._renderSeriesTimeAxis = function(timeline, startPos, endPos, container, length)
{
  var context = timeline.getCtx();
  var isRTL = DvtAgent.isRightToLeft(context);

  if (timeline._majorAxisLabels)
  {
    for (var i = 0; i < timeline._majorAxisLabels.length; i++)
    {
      container.removeChild(timeline._majorAxisLabels[i]);
    }
  }
  timeline._majorAxisLabels = [];

  if (timeline._seriesScale)
  {
    var start = timeline._start;
    var end = timeline._end;

    var startDate = DvtTimeUtils.getPositionDate(start, end, startPos, length);
    var currentDate = timeline._seriesTimeAxis.adjustDate(startDate);
    var currentPos = DvtTimeUtils.getDatePosition(start, end, currentDate, length);
    while (currentPos < endPos)
    {
      var label = timeline._seriesTimeAxis.formatDate(currentDate);
      var nextDate = timeline._seriesTimeAxis.getNextDate(currentDate.getTime());

      var next_time_pos = DvtTimeUtils.getDatePosition(start, end, nextDate, length);
      var maxLength = next_time_pos - currentPos;

      var time_pos = currentPos;

      if (!isRTL)
      {
        if (timeline.isVertical())
          var labelElem = timeline.addLabel(container, 5, label, maxLength, time_pos + 18, DvtTimelineStyleUtils.getSeriesAxisLabelStyle(timeline.Options), 'o_label' + currentPos + '_s0', true, DvtTimelineStyleUtils.getSeriesAxisLabelPadding(), timeline._majorAxisLabels, isRTL);
        else
          labelElem = timeline.addLabel(container, time_pos + 5, label, maxLength, timeline._seriesSize - 2, DvtTimelineStyleUtils.getSeriesAxisLabelStyle(timeline.Options), 'o_label' + currentPos + '_s0', true, DvtTimelineStyleUtils.getSeriesAxisLabelPadding(), timeline._majorAxisLabels, isRTL);
      }
      else
      {
        if (timeline.isVertical())
          labelElem = timeline.addLabel(container, timeline._canvasSize - 5, label, maxLength, time_pos + 18, DvtTimelineStyleUtils.getSeriesAxisLabelStyle(timeline.Options), 'o_label' + currentPos + '_s0', true, DvtTimelineStyleUtils.getSeriesAxisLabelPadding(), timeline._majorAxisLabels, isRTL);
        else
          labelElem = timeline.addLabel(container, length - (time_pos + 5), label, maxLength, timeline._seriesSize - 2, DvtTimelineStyleUtils.getSeriesAxisLabelStyle(timeline.Options), 'o_label' + currentPos + '_s0', true, DvtTimelineStyleUtils.getSeriesAxisLabelPadding(), timeline._majorAxisLabels, isRTL);
      }
      labelElem.time = currentDate.getTime();

      currentDate = nextDate;
      currentPos = next_time_pos;
    }
  }
};

/**
 * Renders the overvie of a timeline.
 * @param {DvtTimeline} timeline The timeline being rendered.
 * @private
 */
DvtTimelineRenderer._renderOverview = function(timeline)
{
  var context = timeline.getCtx();
  var isRTL = DvtAgent.isRightToLeft(context);

  if (timeline._overviewCanvas == null)
  {
    var addOverviewCanvas = true;
    timeline._overviewCanvas = new DvtContainer(context, 'oCanvas');
  }
  else
    timeline._overviewCanvas.removeChildren();

  var borderWidth = timeline._style.getBorderWidth();
  var halfBorderWidth = borderWidth / 2;
  if (timeline.isVertical())
  {
    var width = timeline._overviewSize;
    var height = timeline.Height - borderWidth;
    if (!isRTL)
      timeline._overviewCanvas.setTranslateX(timeline.Width - timeline._overviewSize - halfBorderWidth);
    else
      timeline._overviewCanvas.setTranslateX(halfBorderWidth);
    timeline._overviewCanvas.setTranslateY(halfBorderWidth);
  }
  else
  {
    width = timeline.Width - borderWidth;
    height = timeline._overviewSize;
    timeline._overviewCanvas.setTranslateY(timeline.Height - timeline._overviewSize - halfBorderWidth);
    timeline._overviewCanvas.setTranslateX(halfBorderWidth);
  }
  if (addOverviewCanvas)
    timeline.addChild(timeline._overviewCanvas);

  timeline._overview = new DvtTimelineOverview(context, timeline.HandleEvent, timeline);
  timeline._overviewCanvas.addChild(timeline._overview);

  var overviewObject = timeline._getOverviewObject();
  timeline._overview.render(overviewObject, width, height);
};

/**
 * Renders the scroll indicators of a timeline.
 * @param {DvtTimeline} timeline The timeline being rendered.
 * @private
 */
DvtTimelineRenderer._renderScrollHotspots = function(timeline)
{
  if (timeline._series)
  {
    var context = timeline.getCtx();
    var isRTL = DvtAgent.isRightToLeft(context);

    var seriesCount = timeline._series.length;
    var axisSize = timeline.getTimeAxisVisibleSize(seriesCount);
    if (timeline._scrollHotspotsContainers)
    {
      for (var i = 0; i < timeline._scrollHotspotsContainers.length; i++)
      {
        timeline._scrollHotspotsContainers[i].removeChildren();
      }
    }
    else
    {
      var addHotspotsContainers = true;
      timeline._scrollHotspotsContainers = [];
    }

    timeline._scrollHotspots = [];
    var hotspotPadding = DvtTimelineStyleUtils.getHotspotPadding();
    var hotspotWidth = DvtTimelineStyleUtils.getHotspotWidth();
    var hotspotHeight = DvtTimelineStyleUtils.getHotspotHeight();
    var hotspotArrowWidth = DvtTimelineStyleUtils.getHotspotArrowWidth();
    var hotspotArrowHeight = DvtTimelineStyleUtils.getHotspotArrowHeight();
    var hotspotBackgroundColor = DvtTimelineStyleUtils.getHotspotBackgroundColor();
    var hotspotBorderRadius = DvtTimelineStyleUtils.getHotspotBorderRadius();

    for (var i = 0; i < seriesCount; i++)
    {
      if (addHotspotsContainers)
      {
        var scrollHotspots = new DvtContainer(context, 'hotspots_s' + i);
        timeline.addChild(scrollHotspots);
        timeline._scrollHotspotsContainers.push(scrollHotspots);
      }
      else
        scrollHotspots = timeline._scrollHotspotsContainers[i];

      if (!timeline.isVertical())
      {
        var backX = timeline._startX + hotspotPadding;
        var forwardX = timeline._startX + timeline._canvasLength - hotspotWidth - hotspotPadding;
        var backY = timeline._startY + (i * (timeline._seriesSize + axisSize)) + (timeline._seriesSize - hotspotHeight) / 2;
        var forwardY = backY;
        var arrowBackX = backX + hotspotArrowWidth / 2;
        var arrowForwardX = forwardX + hotspotArrowWidth / 2;
        var arrowBackY = backY + hotspotArrowHeight / 2;
        var arrowForwardY = arrowBackY;
        var arrowBackResource = timeline._resources['scrollLeft'];
        var arrowForwardResource = timeline._resources['scrollRight'];
      }
      else
      {
        if (isRTL)
          var key = Math.abs(i - 1);
        else
          key = i;
        backX = timeline._startX + (key * (timeline._seriesSize + axisSize)) + (timeline._seriesSize - hotspotWidth) / 2;
        forwardX = backX;
        backY = timeline._startY + hotspotPadding;
        forwardY = timeline._startY + timeline._canvasLength - hotspotHeight - hotspotPadding;
        arrowBackX = backX + hotspotArrowWidth / 2;
        arrowForwardX = arrowBackX;
        arrowBackY = backY + hotspotArrowHeight / 2;
        arrowForwardY = forwardY + hotspotArrowHeight / 2;
        arrowBackResource = timeline._resources['scrollUp'];
        arrowForwardResource = timeline._resources['scrollDown'];
      }

      var leftHotspot = new DvtRect(context, backX, backY, hotspotWidth, hotspotHeight, 'lhs');
      leftHotspot.setSolidFill(hotspotBackgroundColor, 1);
      leftHotspot.setCornerRadius(hotspotBorderRadius);
      leftHotspot.hotspot = 'left';
      leftHotspot.setAlpha(0);
      leftHotspot.setMouseEnabled(false);
      var leftArrow = new DvtImage(context, arrowBackResource, arrowBackX, arrowBackY, hotspotArrowWidth, hotspotArrowHeight, 'lhs_arr');
      leftArrow.hotspot = 'left';
      leftHotspot.addChild(leftArrow);
      var rightHotspot = new DvtRect(context, forwardX, forwardY, hotspotWidth, hotspotHeight, 'rhs');
      rightHotspot.setSolidFill(hotspotBackgroundColor, 1);
      rightHotspot.setCornerRadius(hotspotBorderRadius);
      rightHotspot.hotspot = 'right';
      rightHotspot.setAlpha(0);
      rightHotspot.setMouseEnabled(false);
      var rightArrow = new DvtImage(context, arrowForwardResource, arrowForwardX, arrowForwardY, hotspotArrowWidth, hotspotArrowHeight, 'rhs_arr');
      rightArrow.hotspot = 'right';

      rightHotspot.addChild(rightArrow);
      scrollHotspots.addChild(leftHotspot);
      timeline._scrollHotspots.push(leftHotspot);
      scrollHotspots.addChild(rightHotspot);
      timeline._scrollHotspots.push(rightHotspot);

      if (!timeline.isVertical())
      {
        var topX = timeline._startX + (timeline._canvasLength - hotspotWidth) / 2;
        var bottomX = topX;
        var topY = timeline._startY + (i * (timeline._seriesSize + axisSize)) + hotspotPadding;
        var bottomY = timeline._startY + ((i + 1) * timeline._seriesSize) + (i * axisSize) - hotspotHeight - hotspotPadding;
        var arrowTopX = topX + hotspotArrowWidth / 2;
        var arrowBottomX = arrowTopX;
        var arrowTopY = topY + hotspotArrowHeight / 2;
        var arrowBottomY = bottomY + hotspotArrowHeight / 2;
        var arrowTopResource = timeline._resources['scrollUp'];
        var arrowBottomResource = timeline._resources['scrollDown'];
      }
      else
      {
        if (isRTL)
          var key = Math.abs(i - 1);
        else
          key = i;
        topX = timeline._startX + (key * (timeline._seriesSize + axisSize)) + hotspotPadding;
        bottomX = timeline._startX + ((key + 1) * timeline._seriesSize) + (key * axisSize) - hotspotWidth - hotspotPadding;
        topY = timeline._startY + (timeline._canvasLength - hotspotHeight) / 2;
        bottomY = topY;
        arrowTopX = topX + hotspotArrowWidth / 2;
        arrowBottomX = bottomX + hotspotArrowWidth / 2;
        arrowTopY = topY + hotspotArrowHeight / 2;
        arrowBottomY = arrowTopY;
        arrowTopResource = timeline._resources['scrollLeft'];
        arrowBottomResource = timeline._resources['scrollRight'];
      }

      var topHotspot = new DvtRect(context, topX, topY, hotspotWidth, hotspotHeight, 'ths');
      topHotspot.setSolidFill(hotspotBackgroundColor, 1);
      topHotspot.setCornerRadius(hotspotBorderRadius);
      topHotspot.hotspot = 'top';
      topHotspot.setAlpha(0);
      topHotspot.setMouseEnabled(false);
      var upArrow = new DvtImage(context, arrowTopResource, arrowTopX, arrowTopY, hotspotArrowWidth, hotspotArrowHeight, 'ths_arr');
      upArrow.hotspot = 'top';
      topHotspot.addChild(upArrow);
      var bottomHotspot = new DvtRect(context, bottomX, bottomY, hotspotWidth, hotspotHeight, 'bhs');
      bottomHotspot.setSolidFill(hotspotBackgroundColor, 1);
      bottomHotspot.setCornerRadius(hotspotBorderRadius);
      bottomHotspot.hotspot = 'bottom';
      bottomHotspot.setAlpha(0);
      bottomHotspot.setMouseEnabled(false);
      var downArrow = new DvtImage(context, arrowBottomResource, arrowBottomX, arrowBottomY, hotspotArrowWidth, hotspotArrowHeight, 'bhs_arr');
      downArrow.hotspot = 'bottom';

      bottomHotspot.addChild(downArrow);
      scrollHotspots.addChild(topHotspot);
      timeline._scrollHotspots.push(topHotspot);
      scrollHotspots.addChild(bottomHotspot);
      timeline._scrollHotspots.push(bottomHotspot);
    }
  }
};

/**
 * Renders the zoom controls of a timeline.
 * @param {DvtTimeline} timeline The timeline being rendered.
 * @private
 */
DvtTimelineRenderer._renderZoomControls = function(timeline)
{
  var context = timeline.getCtx();
  var isRTL = DvtAgent.isRightToLeft(context);

  var upState = DvtTransientButton.getStateFromURL(context, timeline._resources['zoomIn']);
  var overState = DvtTransientButton.getStateFromURL(context, timeline._resources['zoomIn_h']);
  var downState = DvtTransientButton.getStateFromURL(context, timeline._resources['zoomIn_a']);
  var disabledState = DvtTransientButton.getStateFromURL(context, timeline._resources['zoomIn_d']);

  if (timeline.zoomin == null)
  {
    timeline.zoomin = new DvtTransientButton(context, upState, overState, downState,
        disabledState, timeline.EventManager, timeline.EventManager.HandleZoomInClick);
    // In order for tooltips to show up, we need to associate the buttons through the event manager
    timeline.EventManager.associate(timeline.zoomin, timeline.zoomin);
  }
  else
  {
    timeline.zoomin.setUpState(upState);
    timeline.zoomin.setOverState(overState);
    timeline.zoomin.setDownState(downState);
    timeline.zoomin.setDisabledState(disabledState);
  }

  upState = DvtTransientButton.getStateFromURL(context, timeline._resources['zoomOut']);
  overState = DvtTransientButton.getStateFromURL(context, timeline._resources['zoomOut_h']);
  downState = DvtTransientButton.getStateFromURL(context, timeline._resources['zoomOut_a']);
  disabledState = DvtTransientButton.getStateFromURL(context, timeline._resources['zoomOut_d']);

  if (timeline.zoomout == null)
  {
    timeline.zoomout = new DvtTransientButton(context, upState, overState, downState,
        disabledState, timeline.EventManager, timeline.EventManager.HandleZoomOutClick);
    // In order for tooltips to show up, we need to associate the buttons through the event manager
    timeline.EventManager.associate(timeline.zoomout, timeline.zoomout);
  }
  else
  {
    timeline.zoomout.setUpState(upState);
    timeline.zoomout.setOverState(overState);
    timeline.zoomout.setDownState(downState);
    timeline.zoomout.setDisabledState(disabledState);
  }

  timeline.zoomin.setTooltip(DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'ZOOM_IN', null));
  timeline.zoomout.setTooltip(DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'ZOOM_OUT', null));
  timeline.zoomin.hide();
  timeline.zoomout.hide();

  if (DvtTimeUtils.supportsTouch())
  {
    DvtToolkitUtils.setAttrNullNS(timeline.zoomin.getElem(), 'role', 'button');
    DvtToolkitUtils.setAttrNullNS(timeline.zoomin.getElem(), 'aria-label', DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'ZOOM_IN', null));
    DvtToolkitUtils.setAttrNullNS(timeline.zoomout.getElem(), 'role', 'button');
    DvtToolkitUtils.setAttrNullNS(timeline.zoomout.getElem(), 'aria-label', DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'ZOOM_OUT', null));
  }
  if (!isRTL)
  {
    timeline.zoomin.setTranslateX(timeline._startX + 11);
    timeline.zoomout.setTranslateX(timeline._startX + 11);
  }
  else
  {
    timeline.zoomin.setTranslateX(timeline._backgroundWidth - 44);
    timeline.zoomout.setTranslateX(timeline._backgroundWidth - 44);
  }
  timeline.zoomin.setTranslateY(timeline._startY + 11);
  timeline.zoomout.setTranslateY(timeline._startY + 48);

  if (timeline.zoomin.getParent() != timeline._canvas)
    timeline._canvas.addChild(timeline.zoomin);
  if (timeline.zoomout.getParent() != timeline._canvas)
    timeline._canvas.addChild(timeline.zoomout);

  var contentLength = timeline.getContentLength();
  if (contentLength >= timeline._maxContentLength)
    timeline.disableZoomButton(true);
  if (timeline._canvasLength >= contentLength)
    timeline.disableZoomButton(false);
};

/**
 * Renders the empty text of a timeline.
 * @param {DvtTimeline} timeline The timeline being rendered.
 * @private
 */
DvtTimelineRenderer._renderEmptyText = function(timeline)
{
  // Get the empty text string
  if (timeline.Options['series'])
    var emptyTextStr = DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'INVALID_DATA', null);
  else
    emptyTextStr = DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'NO_DATA', null);

  timeline.clearTimeline();
  DvtTextUtils.renderEmptyText(timeline._canvas, emptyTextStr,
      new DvtRectangle(0, 0, timeline._backgroundWidth, timeline._backgroundHeight),
      timeline.EventManager, DvtTimelineStyleUtils.getEmptyTextStyle(timeline.Options));
};
/**
 * Style related utility functions for DvtTimeline.
 * @class
 */
var DvtTimelineStyleUtils = new Object();

DvtObj.createSubclass(DvtTimelineStyleUtils, DvtObj, 'DvtTimelineStyleUtils');

/**
 * The default Timeline style.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_TIMELINE_STYLE = 'border:1px #d9dfe3;background-color:#f9f9f9;';

/**
 * The default Axis style.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_AXIS_STYLE = 'background-color:#f9f9f9;border:1px #d9dfe3;';

/**
 * The default Axis separator style.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_AXIS_SEPARATOR_STYLE = 'color:#bcc7d2;';

/**
 * The default Series style.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_SERIES_STYLE = 'background-color:#f9f9f9;';

/**
 * The default Series label spacing.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_SERIES_LABEL_SPACING = 20;

/**
 * The default Series label padding.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_SERIES_LABEL_PADDING = 2;

/**
 * The default Series Axis separator style.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_SERIES_AXIS_SEPARATOR_STYLE = 'color:#bcc7d2';

/**
 * The default Series Axis label padding.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_SERIES_AXIS_LABEL_PADDING = 1;

/**
 * The default Overview width.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_OVERVIEW_WIDTH = 60;

/**
 * The default Overview height.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_OVERVIEW_HEIGHT = 100;

/**
 * The default hotspot background color.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_HOTSPOT_BACKGROUND_COLOR = '#000000';

/**
 * The default hotspot border radius.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_HOTSPOT_BORDER_RADIUS = 2;

/**
 * The default hotspot opacity.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_HOTSPOT_OPACITY = 0.6;

/**
 * The default hotspot width.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_HOTSPOT_WIDTH = 28;

/**
 * The default hotspot height.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_HOTSPOT_HEIGHT = 28;

/**
 * The default hotspot padding.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_HOTSPOT_PADDING = 3;

/**
 * The default hotspot arrow width.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_HOTSPOT_ARROW_WIDTH = 14;

/**
 * The default hotspot arrow height.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_HOTSPOT_ARROW_HEIGHT = 14;

/**
 * The default hotspot animation duration.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_HOTSPOT_ANIMATION_DURATION = 0.3;

/**
 * The default Item enabled stroke width.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_ITEM_ENABLED_STROKE_WIDTH = 1;

/**
 * The default Item hover stroke width.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_ITEM_HOVER_STROKE_WIDTH = 2;

/**
 * The default Item selected stroke width.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_ITEM_SELECTED_STROKE_WIDTH = 2;

/**
 * The default Item inner fill color.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_ITEM_INNER_FILL_COLOR = 'rgba(249,249,249,0)';

/**
 * The default Item active selected inner stroke color.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_ITEM_ACTIVE_INNER_STROKE_COLOR = '#e4f0fa';

/**
 * The default Item enabled inner stroke color.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_ITEM_ENABLED_INNER_STROKE_COLOR = 'rgba(249,249,249,0)';

/**
 * The default Item enabled inner stroke width.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_ITEM_INNER_STROKE_WIDTH = 2;

/**
 * The default Item bubble offset value.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_BUBBLE_OFFSET = 20;

/**
 * The default Item bubble spacing.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_BUBBLE_SPACING = 15;

/**
 * The default Item duration feeler offset value.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_DURATION_FEELER_OFFSET = 10;

/**
 * The default Item thumbnail width.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_THUMBNAIL_WIDTH = 32;

/**
 * The default Item thumbnail height.
 * @const
 * @private
 */
DvtTimelineStyleUtils._DEFAULT_THUMBNAIL_HEIGHT = 32;

/**
 * Gets the item description style.
 * @param {DvtTimelineSeriesNode} item The item to be styled.
 * @return {DvtCSSStyle} The item description style.
 */
DvtTimelineStyleUtils.getItemDescriptionStyle = function(item)
{
  var options = item._series.getOptions();
  var descriptionStyle = options['styleDefaults']['item']['descriptionStyle'];
  var style = item.getStyle();
  if (style)
  {
    var cssStyle = new DvtCSSStyle(style);
    descriptionStyle.parseInlineStyle(cssStyle);
  }
  return descriptionStyle;
};

/**
 * Gets the item title style.
 * @param {DvtTimelineSeriesNode} item The item to be styled.
 * @return {DvtCSSStyle} The item title style.
 */
DvtTimelineStyleUtils.getItemTitleStyle = function(item)
{
  var options = item._series.getOptions();
  var titleStyle = options['styleDefaults']['item']['titleStyle'];
  var style = item.getStyle();
  if (style)
  {
    var cssStyle = new DvtCSSStyle(style);
    titleStyle.parseInlineStyle(cssStyle);
  }
  return titleStyle;
};

/**
 * Gets the reference object color.
 * @param {object} options The object containing data and specifications for the component.
 * @return {string} The reference object color.
 */
DvtTimelineStyleUtils.getReferenceObjectColor = function(options)
{
  return options['styleDefaults']['referenceObject']['color'];
};

/**
 * Gets the series label style.
 * @param {object} options The object containing data and specifications for the component.
 * @return {DvtCSSStyle} The series label style.
 */
DvtTimelineStyleUtils.getSeriesLabelStyle = function(options)
{
  //Style Defaults
  return options['styleDefaults']['series']['labelStyle'];
};

/**
 * Gets the series label padding.
 * @return {number} The series label padding.
 */
DvtTimelineStyleUtils.getSeriesLabelPadding = function()
{
  return DvtTimelineStyleUtils._DEFAULT_SERIES_LABEL_PADDING;
};

/**
 * Gets the series label spacing.
 * @return {number} The series label spacing.
 */
DvtTimelineStyleUtils.getSeriesLabelSpacing = function()
{
  return DvtTimelineStyleUtils._DEFAULT_SERIES_LABEL_SPACING;
};

/**
 * Gets the empty text style.
 * @param {object} options The object containing data and specifications for the component.
 * @return {DvtCSSStyle} The empty text style.
 */
DvtTimelineStyleUtils.getEmptyTextStyle = function(options)
{
  //Style Defaults
  return options['styleDefaults']['series']['emptyTextStyle'];
};

/**
 * Gets the item bubble offset.
 * @return {number} The item bubble offset.
 */
DvtTimelineStyleUtils.getBubbleOffset = function()
{
  return DvtTimelineStyleUtils._DEFAULT_BUBBLE_OFFSET;
};

/**
 * Gets the item bubble spacing.
 * @return {number} The item bubble spacing.
 */
DvtTimelineStyleUtils.getBubbleSpacing = function()
{
  return DvtTimelineStyleUtils._DEFAULT_BUBBLE_SPACING;
};

/**
 * Gets the item fill color.
 * @param {DvtTimelineSeriesNode} item The item to be styled.
 * @return {string} The item fill color.
 */
DvtTimelineStyleUtils.getItemFillColor = function(item)
{
  var style = item.getStyle();
  if (style)
  {
    var cssStyle = new DvtCSSStyle(style);
    var fillColor = cssStyle.getStyle(DvtCSSStyle.BACKGROUND_COLOR);
    if (fillColor)
      return fillColor;
  }
  var options = item._series.getOptions();
  return options['styleDefaults']['item']['backgroundColor'];
};

/**
 * Gets the item stroke color.
 * @param {DvtTimelineSeriesNode} item The item to be styled.
 * @return {string} The item stroke color.
 */
DvtTimelineStyleUtils.getItemStrokeColor = function(item)
{
  var style = item.getStyle();
  if (style)
  {
    var cssStyle = new DvtCSSStyle(style);
    var strokeColor = cssStyle.getStyle(DvtCSSStyle.BORDER_COLOR);
    if (strokeColor)
      return strokeColor;
  }
  var options = item._series.getOptions();
  return options['styleDefaults']['item']['borderColor'];
};

/**
 * Gets the item stroke width.
 * @return {number} The item stroke width.
 */
DvtTimelineStyleUtils.getItemStrokeWidth = function()
{
  return DvtTimelineStyleUtils._DEFAULT_ITEM_ENABLED_STROKE_WIDTH;
};

/**
 * Gets the item hover fill color.
 * @param {DvtTimelineSeriesNode} item The item to be styled.
 * @return {string} The item hover fill color.
 */
DvtTimelineStyleUtils.getItemHoverFillColor = function(item)
{
  var options = item._series.getOptions();
  var hoverDefault = options['styleDefaults']['item']['hoverBackgroundColor'];
  if (hoverDefault)
    return hoverDefault;
  else
    return DvtTimelineStyleUtils.getItemFillColor(item);
};

/**
 * Gets the item hover stroke color.
 * @param {DvtTimelineSeriesNode} item The item to be styled.
 * @return {string} The item hover stroke color.
 */
DvtTimelineStyleUtils.getItemHoverStrokeColor = function(item)
{
  var options = item._series.getOptions();
  var hoverDefault = options['styleDefaults']['item']['hoverBorderColor'];
  if (hoverDefault)
    return hoverDefault;
  else
    return DvtTimelineStyleUtils.getItemStrokeColor(item);
};

/**
 * Gets the item hover stroke width.
 * @return {number} The item hover stroke width.
 */
DvtTimelineStyleUtils.getItemHoverStrokeWidth = function()
{
  return DvtTimelineStyleUtils._DEFAULT_ITEM_HOVER_STROKE_WIDTH;
};

/**
 * Gets the item selected fill color.
 * @param {DvtTimelineSeriesNode} item The item to be styled.
 * @return {string} The item selected fill color.
 */
DvtTimelineStyleUtils.getItemSelectedFillColor = function(item)
{
  var options = item._series.getOptions();
  var selectedDefault = options['styleDefaults']['item']['selectedBackgroundColor'];
  if (selectedDefault)
    return selectedDefault;
  else
    return DvtTimelineStyleUtils.getItemFillColor(item);
};

/**
 * Gets the item selected stroke color.
 * @param {DvtTimelineSeriesNode} item The item to be styled.
 * @return {string} The item selected stroke color.
 */
DvtTimelineStyleUtils.getItemSelectedStrokeColor = function(item)
{
  var options = item._series.getOptions();
  var selectedDefault = options['styleDefaults']['item']['selectedBorderColor'];
  if (selectedDefault)
    return selectedDefault;
  else
    return DvtTimelineStyleUtils.getItemStrokeColor(item);
};

/**
 * Gets the item selected stroke width.
 * @return {number} The item selected stroke width.
 */
DvtTimelineStyleUtils.getItemSelectedStrokeWidth = function()
{
  return DvtTimelineStyleUtils._DEFAULT_ITEM_SELECTED_STROKE_WIDTH;
};

/**
 * Gets the series style.
 * @return {string} The series style.
 */
DvtTimelineStyleUtils.getSeriesStyle = function()
{
  return DvtTimelineStyleUtils._DEFAULT_SERIES_STYLE;
};

/**
 * Gets the series color array.
 * @param {object} options The object containing data and specifications for the component.
 * @return {array} The series color array.
 */
DvtTimelineStyleUtils.getColorsArray = function(options)
{
  //Style Defaults
  return options['styleDefaults']['series']['colors'];
};

/**
 * Gets the duration feeler offset.
 * @return {number} The duration feeler offset.
 */
DvtTimelineStyleUtils.getDurationFeelerOffset = function()
{
  return DvtTimelineStyleUtils._DEFAULT_DURATION_FEELER_OFFSET;
};

/**
 * Gets the item thumbnail width.
 * @return {number} The item thumbnail width.
 */
DvtTimelineStyleUtils.getThumbnailWidth = function()
{
  return DvtTimelineStyleUtils._DEFAULT_THUMBNAIL_WIDTH;
};

/**
 * Gets the item thumbnail height.
 * @return {number} The item thumbnail height.
 */
DvtTimelineStyleUtils.getThumbnailHeight = function()
{
  return DvtTimelineStyleUtils._DEFAULT_THUMBNAIL_HEIGHT;
};

/**
 * Gets the series axis separator style.
 * @return {string} The series axis separator style.
 */
DvtTimelineStyleUtils.getSeriesAxisSeparatorStyle = function()
{
  return DvtTimelineStyleUtils._DEFAULT_SERIES_AXIS_SEPARATOR_STYLE;
};

/**
 * Gets the item inner active stroke color.
 * @return {string} The item inner active stroke color.
 */
DvtTimelineStyleUtils.getItemInnerActiveStrokeColor = function()
{
  return DvtTimelineStyleUtils._DEFAULT_ITEM_ACTIVE_INNER_STROKE_COLOR;
};

/**
 * Gets the item inner fill color.
 * @return {string} The item inner fill color.
 */
DvtTimelineStyleUtils.getItemInnerFillColor = function()
{
  return DvtTimelineStyleUtils._DEFAULT_ITEM_INNER_FILL_COLOR;
};

/**
 * Gets the item inner stroke color.
 * @return {string} The item inner stroke color.
 */
DvtTimelineStyleUtils.getItemInnerStrokeColor = function()
{
  return DvtTimelineStyleUtils._DEFAULT_ITEM_ENABLED_INNER_STROKE_COLOR;
};

/**
 * Gets the item inner stroke width.
 * @return {number} The item inner stroke width.
 */
DvtTimelineStyleUtils.getItemInnerStrokeWidth = function()
{
  return DvtTimelineStyleUtils._DEFAULT_ITEM_INNER_STROKE_WIDTH;
};

/**
 * Gets the hotspot animation duration.
 * @return {number} The hotspot animation duration.
 */
DvtTimelineStyleUtils.getHotspotAnimationDuration = function()
{
  return DvtTimelineStyleUtils._DEFAULT_HOTSPOT_ANIMATION_DURATION;
};

/**
 * Gets the hotspot opacity.
 * @return {number} The hotspot opacity.
 */
DvtTimelineStyleUtils.getHotspotOpacity = function()
{
  return DvtTimelineStyleUtils._DEFAULT_HOTSPOT_OPACITY;
};

/**
 * Gets the timeline style.
 * @return {string} The timeline style.
 */
DvtTimelineStyleUtils.getTimelineStyle = function()
{
  return DvtTimelineStyleUtils._DEFAULT_TIMELINE_STYLE;
};

/**
 * Gets the overview width.
 * @return {number} The overview width.
 */
DvtTimelineStyleUtils.getOverviewWidth = function()
{
  return DvtTimelineStyleUtils._DEFAULT_OVERVIEW_WIDTH;
};

/**
 * Gets the overview height.
 * @return {number} The overview height.
 */
DvtTimelineStyleUtils.getOverviewHeight = function()
{
  return DvtTimelineStyleUtils._DEFAULT_OVERVIEW_HEIGHT;
};

/**
 * Gets the axis style.
 * @return {string} The axis style.
 */
DvtTimelineStyleUtils.getAxisStyle = function()
{
  return DvtTimelineStyleUtils._DEFAULT_AXIS_STYLE;
};

/**
 * Gets the axis label style.
 * @param {object} options The object containing data and specifications for the component.
 * @return {DvtCSSStyle} The axis label style.
 */
DvtTimelineStyleUtils.getAxisLabelStyle = function(options)
{
  return options['styleDefaults']['minorAxis']['labelStyle'];
};

/**
 * Gets the overview window background color.
 * @param {object} options The object containing data and specifications for the component.
 * @return {string} The overview window background color.
 */
DvtTimelineStyleUtils.getOverviewWindowBackgroundColor = function(options)
{
  return options['styleDefaults']['overview']['window']['backgroundColor'];
};

/**
 * Gets the overview window border color.
 * @param {object} options The object containing data and specifications for the component.
 * @return {string} The overview window border color.
 */
DvtTimelineStyleUtils.getOverviewWindowBorderColor = function(options)
{
  return options['styleDefaults']['overview']['window']['borderColor'];
};

/**
 * Gets the overview background color.
 * @param {object} options The object containing data and specifications for the component.
 * @return {string} The overview background color.
 */
DvtTimelineStyleUtils.getOverviewBackgroundColor = function(options)
{
  return options['styleDefaults']['overview']['backgroundColor'];
};

/**
 * Gets the overview label style.
 * @param {object} options The object containing data and specifications for the component.
 * @return {DvtCSSStyle} The overview label style.
 */
DvtTimelineStyleUtils.getOverviewLabelStyle = function(options)
{
  return options['styleDefaults']['overview']['labelStyle'];
};

/**
 * Gets the series axis label style.
 * @param {object} options The object containing data and specifications for the component.
 * @return {DvtCSSStyle} The series axis label style.
 */
DvtTimelineStyleUtils.getSeriesAxisLabelStyle = function(options)
{
  return options['styleDefaults']['majorAxis']['labelStyle'];
};

/**
 * Gets the axis separator style.
 * @return {string} The axis separator style.
 */
DvtTimelineStyleUtils.getAxisSeparatorStyle = function()
{
  return DvtTimelineStyleUtils._DEFAULT_AXIS_SEPARATOR_STYLE;
};

/**
 * Gets the series axis label padding.
 * @return {number} The series axis label padding.
 */
DvtTimelineStyleUtils.getSeriesAxisLabelPadding = function()
{
  return DvtTimelineStyleUtils._DEFAULT_SERIES_AXIS_LABEL_PADDING;
};

/**
 * Gets the hotspot padding.
 * @return {number} The hotspot padding.
 */
DvtTimelineStyleUtils.getHotspotPadding = function()
{
  return DvtTimelineStyleUtils._DEFAULT_HOTSPOT_PADDING;
};

/**
 * Gets the hotspot width.
 * @return {number} The hotspot width.
 */
DvtTimelineStyleUtils.getHotspotWidth = function()
{
  return DvtTimelineStyleUtils._DEFAULT_HOTSPOT_WIDTH;
};

/**
 * Gets the hotspot height.
 * @return {number} The hotspot height.
 */
DvtTimelineStyleUtils.getHotspotHeight = function()
{
  return DvtTimelineStyleUtils._DEFAULT_HOTSPOT_HEIGHT;
};

/**
 * Gets the hotspot arrow width.
 * @return {number} The hotspot arrow width.
 */
DvtTimelineStyleUtils.getHotspotArrowWidth = function()
{
  return DvtTimelineStyleUtils._DEFAULT_HOTSPOT_ARROW_WIDTH;
};

/**
 * Gets the hotspot arrow height.
 * @return {number} The hotspot arrow height.
 */
DvtTimelineStyleUtils.getHotspotArrowHeight = function()
{
  return DvtTimelineStyleUtils._DEFAULT_HOTSPOT_ARROW_HEIGHT;
};

/**
 * Gets the hotspot background color.
 * @return {string} The hotspot background color.
 */
DvtTimelineStyleUtils.getHotspotBackgroundColor = function()
{
  return DvtTimelineStyleUtils._DEFAULT_HOTSPOT_BACKGROUND_COLOR;
};

/**
 * Gets the hotspot border radius.
 * @return {number} The hotspot border radius.
 */
DvtTimelineStyleUtils.getHotspotBorderRadius = function()
{
  return DvtTimelineStyleUtils._DEFAULT_HOTSPOT_BORDER_RADIUS;
};

/**
 * Returns the animation duration in seconds for the component. This duration is
 * intended to be passed to the animation handler, and is not in the same units
 * as the API.
 * @param {object} options The object containing data and specifications for the component.
 * @return {number} The animation duration in seconds.
 */
DvtTimelineStyleUtils.getAnimationDuration = function(options)
{
  return DvtStyleUtils.getTimeMilliseconds(options['styleDefaults']['animationDuration']) / 1000;
};
/**
 * TimelineSeries component.
 * @param {DvtContext} context The rendering context.
 * @param {object} callback The function that should be called to dispatch component events.
 * @param {object} callbackObj The object context for the callback function
 * @class TimelineSeries component.
 * @constructor
 * @extends {DvtContainer}
 */
var DvtTimelineSeries = function(context, callback, callbackObj)
{
  this.Init(context, callback, callbackObj);
};

DvtObj.createSubclass(DvtTimelineSeries, DvtTimeComponent, 'DvtTimelineSeries');

/**
 * Initializes the view.
 * @param {DvtContext} context The rendering context.
 * @param {object} callback The function that should be called to dispatch component events.
 * @param {object} callbackObj The object context for the callback function
 * @protected
 */
DvtTimelineSeries.prototype.Init = function(context, callback, callbackObj)
{
  DvtTimelineSeries.superclass.Init.call(this, context, callback, callbackObj);
  this._blocks = [];
  this._renderedReferenceObjects = [];
  this._seriesTicksArray = [];
  this._itemListeners = [];
};

/**
 * Starts the animations.
 */
DvtTimelineSeries.prototype.triggerAnimations = function()
{
  var context = this.getCtx();
  if (this._rmAnimationElems && this._rmAnimationElems.length != 0)
  {
    this._isAnimating = true;
    var fadeOutAnimator = new DvtParallelPlayable(context, new DvtAnimFadeOut(context, this._rmAnimationElems, DvtTimelineStyleUtils.getAnimationDuration(this.Options)));
    fadeOutAnimator.play();
    DvtPlayable.appendOnEnd(fadeOutAnimator, this._onRmAnimationEnd, this);
  }
  else if (this._mvAnimator)
  {
    this._isAnimating = true;
    this._mvAnimator.play();
    DvtPlayable.appendOnEnd(this._mvAnimator, this._onMvAnimationEnd, this);
  }
  else if (this._frAnimationElems && this._frAnimationElems.length != 0)
  {
    this._isAnimating = true;
    var fadeInAnimator = new DvtParallelPlayable(context, new DvtAnimFadeIn(context, this._frAnimationElems, DvtTimelineStyleUtils.getAnimationDuration(this.Options), this._isInitialRender ? 0 : 0));//0.8 : 0));
    fadeInAnimator.play();
    DvtPlayable.appendOnEnd(fadeInAnimator, this._onAnimationEnd, this);
  }
};

/**
 * Handler for the end of removal animations.
 * @private
 */
DvtTimelineSeries.prototype._onRmAnimationEnd = function()
{
  for (var i = 0; i < this._rmAnimationElems.length; i++)
  {
    var elem = this._rmAnimationElems[i];
    elem.getParent().removeChild(elem);
  }
  if (this._mvAnimator && this._hasMvAnimations)
  {
    this._mvAnimator.play();
    DvtPlayable.appendOnEnd(this._mvAnimator, this._onMvAnimationEnd, this);
  }
  else
    this._onMvAnimationEnd();
};

/**
 * Handler for the end of moving animations.
 * @private
 */
DvtTimelineSeries.prototype._onMvAnimationEnd = function()
{
  if (this._frAnimationElems && this._frAnimationElems.length != 0)
  {
    var fadeInAnimator = new DvtParallelPlayable(this.getCtx(), new DvtAnimFadeIn(this.getCtx(), this._frAnimationElems, DvtTimelineStyleUtils.getAnimationDuration(this.Options), this._isInitialRender ? 0 : 0));//0.8 : 0));
    fadeInAnimator.play();
    DvtPlayable.appendOnEnd(fadeInAnimator, this._onAnimationEnd, this);
  }
  else
    this._onAnimationEnd();
};

/**
 * Handler for the end of new item animations.
 * @private
 */
DvtTimelineSeries.prototype._onAnimationEnd = function()
{
  this._isAnimating = false;
  this._callbackObj.onAnimationEnd();
};

/**
 * Renders the component using the specified xml.  If no xml is supplied to a component
 * that has already been rendered, this function will rerender the component with the
 * specified size.
 * @param {string} options The json string.
 * @param {number} width The width of the component.
 * @param {number} height The height of the component.
 */
DvtTimelineSeries.prototype.render = function(options, width, height)
{
  if (options)
    this.SetOptions(options);

  if (this.Width)
    this._isInitialRender = false;
  else
    this._isInitialRender = true;

  // Store the size
  this.Width = width;
  this.Height = height;

  var orientation = this.Options['orientation'];
  if (orientation && orientation == DvtTimeline.ORIENTATION_VERTICAL)
  {
    if (this._isVertical == false)
      this._allowUpdates = false;
    else
      this._allowUpdates = true;

    this._isVertical = true;
  }
  else
  {
    if (this._isVertical)
      this._allowUpdates = false;
    else
      this._allowUpdates = true;

    this._isVertical = false;
  }
  if (this.Options)
  {
    var props = this.Parse(this.Options);
    this._applyParsedProperties(props);
  }

  this._fetchStartPos = 0;
  if (this._isVertical)
  {
    this._fetchEndPos = height;
    this._maxOverflowValue = width;
    this._length = height;
    this._size = width;
  }
  else
  {
    this._fetchEndPos = width;
    this._maxOverflowValue = height;
    this._length = width;
    this._size = height;
  }

  this._isInverted = this.Options['inverted'];
  this._colorCount = 0;
  this._maxDurationSize = 0;

  DvtTimelineSeriesRenderer.renderSeries(this, width, height);

  if (DvtTimeUtils.supportsTouch())
  {
    if (this._items.length > 0)
      this._setAriaProperty('flowto', '_bt_' + this._items[0].getId());
  }

  // Apply 'Series' label for accessibility
  var desc = this.GetComponentDescription();
  if (desc) {
    DvtToolkitUtils.setAttrNullNS(this.getElem(), 'role', 'group');
    DvtToolkitUtils.setAttrNullNS(this.getElem(), 'aria-label', DvtStringUtils.processAriaLabel(desc));
  }
};

/**
 * @override
 */
DvtTimelineSeries.prototype.GetComponentDescription = function()
{
  var seriesDescArray = [DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'TIMELINE_SERIES')];
  // Use series label if set, otherwise use series index value
  if (this._label)
    seriesDescArray.push(this._label);
  else
    seriesDescArray.push(this.Options['index'] + 1);
  return DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'COLON_SEP_LIST', seriesDescArray);
};

DvtTimelineSeries.prototype.reRender = function(width, height)
{
  this._canvas.setTranslateY(0);
  this._canvas.setTranslateX(0);

  this.Width = width;
  this.Height = height;

  this._fetchStartPos = 0;
  if (this._isVertical)
  {
    this._fetchEndPos = height;
    this._maxOverflowValue = width;
    this._length = height;
    this._size = width;
  }
  else
  {
    this._fetchEndPos = width;
    this._maxOverflowValue = height;
    this._length = width;
    this._size = height;
  }

  this._background.setWidth(width);
  this._background.setHeight(height);

  DvtTimelineSeriesRenderer.updateSeriesForZoom(this);
};

/**
 * Combines style defaults with the styles provided
 */
DvtTimelineSeries.prototype.applyStyleValues = function()
{
  this._style = new DvtCSSStyle(DvtTimelineStyleUtils.getSeriesStyle());
  this._seriesStyleDefaults = this.Options['seriesStyleDefaults'];
  this._axisStyleDefaults = this.Options['axisStyleDefaults'];
  this._colors = DvtTimelineStyleUtils.getColorsArray(this.Options);
  this._referenceObjects = this.Options['referenceObjects'];

  if (this._seriesStyleDefaults)
  {
    var style = this._seriesStyleDefaults['backgroundColor'];
    if (style)
      this._style.parseInlineStyle('background-color:' + style + ';');
  }
  DvtTimeline.superclass.applyStyleValues.call(this);
};

/**
 * @override
 */
DvtTimelineSeries.prototype.SetOptions = function(options)
{
  this.Options = options;
};

/**
 * Parses the xml String describing the component.
 * @param {object} options The xml string.
 * @protected
 */
DvtTimelineSeries.prototype.Parse = function(options)
{
  this._parser = new DvtTimelineSeriesParser();
  return this._parser.parse(options, this._items);
};


/**
 * Applies the parsed properties to this component.
 * @param {object} props An object containing the parsed properties for this component.
 * @private
 */
DvtTimelineSeries.prototype._applyParsedProperties = function(props)
{
  if (this._items)
    this._oldItems = this._items;
  this._items = props.items;
  if (this._items && this._items.length > 0)
    this._isEmpty = false;
  else
    this._isEmpty = true;

  this._isIRAnimationEnabled = props.isIRAnimationEnabled;
  this._isDCAnimationEnabled = props.isDCAnimationEnabled;

  this._label = props.label;
  this._timeAxis = props.timeAxis;
  this._emptyText = props.emptyText;
  if (this._emptyText == null)
    this._emptyText = DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, 'NO_DATA', null);

  DvtTimelineSeries.superclass._applyParsedProperties.call(this, props);
};

/**
 * Calculates the height value for the item given.
 * @protected
 */
DvtTimelineSeries.prototype.calculateSpacing = function(item, index)
{
  if (this._layoutItems == null || this._layoutItems.length == 0)
    return;

  var x = item.getLoc();
  var y = item.getSpacing();
  if (y == null)
    y = this._initialSpacing;

  var maxOverflowValue = this._maxOverflowValue;

  if (!this._isVertical)
  {
    var hOffset = DvtTimelineStyleUtils.getBubbleSpacing();
    for (var i = 0; i < index; i++)
    {
      var currItem = this._layoutItems[i];
      var currWidth = currItem.getWidth() + 10;
      var currHeight = currItem.getHeight();
      if (currItem.getLoc() != null && currItem != item)
      {
        var currx = currItem.getLoc();
        if (currx == null)
          currx = 0;

        var curry = currItem.getSpacing();
        if (curry == null)
          curry = this._initialSpacing;

        if (x >= currx && x <= currx + currWidth && y >= curry && y <= curry + currHeight)
        {
          y = curry + currHeight + hOffset;
          // y changed, do the loop again
          item.setSpacing(y);

          // calculate again from start since y changed and we might have a conflict again
          y = this.calculateSpacing(item, index);
        }
      }

      if (maxOverflowValue < y + currHeight)
        maxOverflowValue = y + currHeight;
    }
  }
  else
  {
    for (var i = 0; i < index; i++)
    {
      var currItem = this._layoutItems[i];
      var currWidth = currItem.getWidth() + 10;
      if (maxOverflowValue < y + currWidth)
        maxOverflowValue = y + currWidth;
    }
  }

  if (maxOverflowValue > this._maxOverflowValue)
    this._maxOverflowValue = maxOverflowValue + DvtTimelineStyleUtils.getBubbleSpacing();

  return y;
};


/**
 * Calculates the duration height value for the item given.
 * @protected
 */
DvtTimelineSeries.prototype.calculateDurationSize = function(item, index)
{
  if (this._items == null || this._items.length == 0)
    return;

  var initialY = 1;
  var startTime = item.getStartTime();
  var endTime = item.getEndTime();
  if (!endTime || endTime == startTime)
    return;

  var y = item.getDurationLevel();
  if (y == null)
    y = initialY;

  for (var i = 0; i < index; i++)
  {
    var currItem = this._items[i];
    if (currItem != item)
    {
      var currStartTime = currItem.getStartTime();
      var currEndTime = currItem.getEndTime();
      if (!currEndTime || currEndTime == currStartTime)
        continue;

      var curry = currItem.getDurationLevel();
      if (curry == null)
        curry = initialY;

      if (startTime >= currStartTime && startTime <= currEndTime && y == curry)
      {
        y = curry + 1;
        // y changed, do the loop again
        item.setDurationLevel(y);

        // calculate again from start since y changed and we might have a conflict again
        y = this.calculateDurationSize(item, index);
      }
    }
  }
  if (y > this._maxDurationSize)
    this._maxDurationSize = y;
  return y;
};


/**
 * Prepares the duration bars for rendering.
 * @protected
 */
DvtTimelineSeries.prototype.prepareDurations = function(nodes)
{
  for (var i = 0; i < this._items.length; i++)
  {
    var node = this._items[i];
    var startTime = node.getStartTime();
    var endTime = node.getEndTime();
    if (endTime && endTime != startTime)
    {
      node.setDurationLevel(this.calculateDurationSize(node, this._items.length));
      node.setDurationSize(22 + 10 * node.getDurationLevel() - 5);
      if (node.getDurationFillColor() == null)
      {
        node.setDurationFillColor(this._colors[this._colorCount]);
        this._colorCount++;
        if (this._colorCount == this._colors.length)
          this._colorCount = 0;
      }
    }
  }
};

/**
 * Prepares the items for rendering.
 * @param {Array<DvtTimelineSeriesItem>} items The items to be prepared.
 */
DvtTimelineSeries.prototype.prepareItems = function(items)
{
  if (this.isVertical())
    this._initialSpacing = 20 * (this._maxDurationSize > 0 ? 1 : 0) + DvtTimelineStyleUtils.getBubbleSpacing() + 10 * this._maxDurationSize;
  else
    this._initialSpacing = 20 + DvtTimelineStyleUtils.getBubbleSpacing() + 10 * this._maxDurationSize;

  this._layoutItems = new Array();
  for (var i = 0; i < items.length; i++)
  {
    var item = items[i];
    var loc = DvtTimeUtils.getDatePosition(this._start, this._end, item.getStartTime(), this._length);
    // offset position if a duration bar is rendered as well
    var endTime = item.getEndTime();
    if (endTime && endTime != item.getStartTime())
    {
      var span = DvtTimeUtils.getDatePosition(this._start, this._end, endTime, this._length) - loc;
      loc = loc + Math.min(DvtTimelineStyleUtils.getDurationFeelerOffset(), span / 2);
    }
    item.setLoc(loc);
    var add = true;
    for (var j = 0; j < this._layoutItems.length; j++)
    {
      // ensure items are sorted in ascending order
      if (loc < this._layoutItems[j].getLoc())
      {
        this._layoutItems.splice(j, 0, item);
        add = false;
        break;
      }
    }
    if (add)
      this._layoutItems.push(item);
  }

  for (var i = 0; i < this._layoutItems.length; i++)
  {
    var item = this._layoutItems[i];
    var loc = DvtTimeUtils.getDatePosition(this._start, this._end, item.getStartTime(), this._length);
    if (loc < this._fetchStartPos || loc > this._fetchEndPos)
      continue;

    DvtTimelineSeriesItemRenderer.initializeItem(item, this);
  }
};

DvtTimelineSeries.prototype.getLabel = function()
{
  return this._label;
};

DvtTimelineSeries.prototype.getEmptyText = function()
{
  return this._emptyText;
};

DvtTimelineSeries.prototype.findItem = function(itemId)
{
  if (this._items != null)
  {
    for (var i = 0; i < this._items.length; i++)
    {
      var item = this._items[i];
      if (item.getId() == itemId)
        return item;
    }
  }
  return null;
};

DvtTimelineSeries.prototype.HandleItemAction = function(item)
{
  var action = item.getAction();
  if (action)
  {
    var event = new DvtTimelineSeriesActionEvent(action, item.getId());
    DvtEventDispatcher.dispatchEvent(this._callback, this._callbackObj, this, event);
  }
};

/**
 * Timeline Series action event.
 * @param action The action triggered
 * @param itemId The id of the node triggering the action event.
 * @class
 * @constructor
 * @export
 */
var DvtTimelineSeriesActionEvent = function(action, itemId)
{
  DvtTimelineSeriesActionEvent.superclass.constructor.call(this, DvtActionEvent.SUBTYPE_ACTION, action, itemId);
};

DvtObj.createSubclass(DvtTimelineSeriesActionEvent, DvtActionEvent, 'DvtTimelineSeriesActionEvent');

DvtTimelineSeries.prototype.isInverted = function()
{
  return this._isInverted;
};
/**
 * Creates an instance of DvtTimelineSeriesItem which extends DvtContainer with hover and selection feedback.
 * @extends {DvtContainer}
 * @param {DvtContext} context The rendering context
 * @param {string=} id The optional id for the corresponding DOM element.
 * @class
 * @constructor
 */
var DvtTimelineSeriesItem = function(context, id)
{
  this.Init(context, id);
};

DvtObj.createSubclass(DvtTimelineSeriesItem, DvtContainer, 'DvtTimelineSeriesItem');

// state
DvtTimelineSeriesItem.ENABLED_STATE_KEY = 'en';
DvtTimelineSeriesItem.SELECTED_STATE_KEY = 'sel';
DvtTimelineSeriesItem.ACTIVE_SELECTED_STATE_KEY = 'asel';
DvtTimelineSeriesItem.HOVER_STATE_KEY = 'hl';

/**
 * @param {DvtContext} context The rendering context
 * @param {string=} id The optional id for the corresponding DOM element
 * @protected
 */
DvtTimelineSeriesItem.prototype.Init = function(context, id)
{
  DvtTimelineSeriesItem.superclass.Init.call(this, context, 'g', id);
};

/**
 * Sets whether the timeline series item is currently selected and shows the seleciton effect
 * @param {boolean} bSelected True if the currently selected
 */
DvtTimelineSeriesItem.prototype.setSelected = function(isSelected)
{
  if (this._isSelected == isSelected)
    return;

  this._isSelected = isSelected;

  if (isSelected)
  {
    if (this._isShowingHoverEffect)
      this.applyState(DvtTimelineSeriesItem.ACTIVE_SELECTED_STATE_KEY);
    else
      this.applyState(DvtTimelineSeriesItem.SELECTED_STATE_KEY);
  }
  else
    this.applyState(DvtTimelineSeriesItem.ENABLED_STATE_KEY);
};

/**
 * Shows the hover effect for the timeline series item
 */
DvtTimelineSeriesItem.prototype.showHoverEffect = function(isFocused)
{
  if (!this._isShowingHoverEffect)
  {
    this._isShowingHoverEffect = true;
    if (this._isSelected && isFocused)
      this.applyState(DvtTimelineSeriesItem.ACTIVE_SELECTED_STATE_KEY);
    else if (this._isSelected)
      this.applyState(DvtTimelineSeriesItem.SELECTED_STATE_KEY);
    else
      this.applyState(DvtTimelineSeriesItem.HOVER_STATE_KEY);
  }
};

/**
 * Hides the hover effect for the timeline series item
 */
DvtTimelineSeriesItem.prototype.hideHoverEffect = function(isFocused)
{
  if (this._isSelected && isFocused)
    this.applyState(DvtTimelineSeriesItem.ACTIVE_SELECTED_STATE_KEY);
  else if (this._isSelected)
    this.applyState(DvtTimelineSeriesItem.SELECTED_STATE_KEY);
  else
    this.applyState(DvtTimelineSeriesItem.ENABLED_STATE_KEY);
  this._isShowingHoverEffect = false;
};

DvtTimelineSeriesItem.prototype.applyState = function(state)
{
  var item = this._node;
  var itemElem = item.getBubble();
  // if it is null the item has not been render yet, this could happen when user
  // hovers over a marker that is not in the viewport
  if (itemElem == null)
    return;

  var bubble = itemElem.getChildAt(0);
  var bubbleInner = bubble.getChildAt(0);
  var duration = item.getDurationBar();

  if (state == DvtTimelineSeriesItem.ACTIVE_SELECTED_STATE_KEY)
  {
    var bubbleFillColor = DvtTimelineStyleUtils.getItemSelectedFillColor(item);
    var bubbleStrokeColor = DvtTimelineStyleUtils.getItemSelectedStrokeColor(item);
    var bubbleStrokeWidth = DvtTimelineStyleUtils.getItemSelectedStrokeWidth();
    var bubbleInnerStrokeColor = DvtTimelineStyleUtils.getItemInnerActiveStrokeColor();
  }
  else if (state == DvtTimelineSeriesItem.SELECTED_STATE_KEY)
  {
    bubbleFillColor = DvtTimelineStyleUtils.getItemSelectedFillColor(item);
    bubbleStrokeColor = DvtTimelineStyleUtils.getItemSelectedStrokeColor(item);
    bubbleStrokeWidth = DvtTimelineStyleUtils.getItemSelectedStrokeWidth();
    bubbleInnerStrokeColor = DvtTimelineStyleUtils.getItemInnerStrokeColor();
  }
  else if (state == DvtTimelineSeriesItem.HOVER_STATE_KEY)
  {
    bubbleFillColor = DvtTimelineStyleUtils.getItemHoverFillColor(item);
    bubbleStrokeColor = DvtTimelineStyleUtils.getItemHoverStrokeColor(item);
    bubbleStrokeWidth = DvtTimelineStyleUtils.getItemHoverStrokeWidth();
    bubbleInnerStrokeColor = DvtTimelineStyleUtils.getItemInnerActiveStrokeColor();
  }
  else
  {
    bubbleFillColor = DvtTimelineStyleUtils.getItemFillColor(item);
    bubbleStrokeColor = DvtTimelineStyleUtils.getItemStrokeColor(item);
    bubbleStrokeWidth = DvtTimelineStyleUtils.getItemStrokeWidth();
    bubbleInnerStrokeColor = DvtTimelineStyleUtils.getItemInnerStrokeColor();
  }
  var bubbleInnerStrokeWidth = DvtTimelineStyleUtils.getItemInnerStrokeWidth();

  var bubbleStroke = new DvtSolidStroke(bubbleStrokeColor, 1, bubbleStrokeWidth);
  var bubbleInnerStroke = new DvtSolidStroke(bubbleInnerStrokeColor, 1, bubbleInnerStrokeWidth);

  bubble.setSolidFill(bubbleFillColor);
  bubble.setStroke(bubbleStroke);
  bubbleInner.setStroke(bubbleInnerStroke);

  var feeler = item.getFeeler();
  if (feeler)
    feeler.setStroke(bubbleStroke);

  if (duration)
    duration.setStroke(bubbleStroke);
};
/**
 * Renderer for DvtTimelineSeriesItem.
 * @class
 */
var DvtTimelineSeriesItemRenderer = new Object();

DvtObj.createSubclass(DvtTimelineSeriesItemRenderer, DvtObj, 'DvtTimelineSeriesItemRenderer');

/**
 * Renders a timeline series item.
 * @param {DvtTimelineSeriesItem} item The item being rendered.
 * @param {DvtTimelineSeries} series The series containing this item.
 * @param {DvtContainer} container The container to render into.
 * @param {number} overflowOffset The amount of overflow.
 * @param {type} frAnimationElems The animator.
 * @param {type} mvAnimator The animator.
 */
DvtTimelineSeriesItemRenderer.renderItem = function(item, series, container, overflowOffset, frAnimationElems, mvAnimator)
{
  if (item._content)
  {
    DvtTimelineSeriesItemRenderer._renderBubble(item, series, container, frAnimationElems);
    DvtTimelineSeriesItemRenderer._displayBubble(item, series, overflowOffset, null);
  }
  else
  {
    series._hasMvAnimations = true;
    DvtTimelineSeriesItemRenderer._displayBubble(item, series, overflowOffset, mvAnimator);
  }

  // only render a feeler in horizontal orientation
  if (!series.isVertical())
  {
    if (item.getFeeler() && series._allowUpdates)
      DvtTimelineSeriesItemRenderer._updateFeeler(item, series, overflowOffset, mvAnimator);
    else
      DvtTimelineSeriesItemRenderer._renderFeeler(item, series, container.feelers, overflowOffset, frAnimationElems);
  }
};

/**
 * Initializes a timeline series item.
 * @param {DvtTimelineSeriesItem} item The item being initialized.
 * @param {DvtTimelineSeries} series The series containing this item.
 */
DvtTimelineSeriesItemRenderer.initializeItem = function(item, series)
{
  if (item.getBubble() && series._allowUpdates)
    DvtTimelineSeriesItemRenderer._updateBubble(item, series);
  else
    DvtTimelineSeriesItemRenderer._createBubble(item, series);
};

/**
 * Creates the item bubble.
 * @param {DvtTimelineSeriesItem} item The item being initialized.
 * @param {DvtTimelineSeries} series The series containing this item.
 * @private
 */
DvtTimelineSeriesItemRenderer._createBubble = function(item, series)
{
  var spacing = series.calculateSpacing(item, series._items.length);
  item.setSpacing(spacing);

  var marginTop = 5;
  var marginStart = 5;
  var content = DvtTimelineSeriesItemRenderer._getBubbleContent(item, series);
  series.addChild(content);
  var dim = content.getDimensions();
  series.removeChild(content);

  // TODO: Review this later...
  item.setWidth(dim.w + marginStart * 2);
  item.setHeight(dim.h + marginTop * 2);
  item._content = content;
};

/**
 * Renders a timeline series item bubble.
 * @param {DvtTimelineSeriesItem} item The item being rendered.
 * @param {DvtTimelineSeries} series The series containing this item.
 * @param {DvtContainer} container The container to render into.
 * @param {type} animationElems The animator.
 * @private
 */
DvtTimelineSeriesItemRenderer._renderBubble = function(item, series, container, animationElems)
{
  var context = series.getCtx();
  var isRTL = DvtAgent.isRightToLeft(context);

  var id = item.getId();
  var marginTop = 5;
  var marginStart = 5;
  var content = item._content;
  item._content = null;

  var nodeWidth = item.getWidth();
  var nodeHeight = item.getHeight();

  // draw the bubble
  var bubbleId = '_bubble_' + id;
  if (series.isVertical())
  {
    var offset = nodeHeight / 2;
    var startOffset = offset - 6;
    var endOffset = offset + 6;
    if (!isRTL && series.isInverted() || isRTL && !series.isInverted())
    {
      var bubbleArray = [0, 0, 0, startOffset, -6, offset, 0, endOffset, 0, nodeHeight, nodeWidth, nodeHeight, nodeWidth, 0, 0, 0];
      var innerBubbleArray = [2, 2, 2, startOffset, -4, offset, 2, endOffset, 2, nodeHeight - 2, nodeWidth - 2, nodeHeight - 2, nodeWidth - 2, 2, 2, 2];
    }
    else
    {
      bubbleArray = [0, 0, 0, nodeHeight, nodeWidth, nodeHeight, nodeWidth, endOffset, nodeWidth + 6, offset, nodeWidth, startOffset, nodeWidth, 0, 0, 0];
      innerBubbleArray = [2, 2, 2, nodeHeight - 2, nodeWidth - 2, nodeHeight - 2, nodeWidth - 2, endOffset, nodeWidth + 4, offset, nodeWidth - 2, startOffset, nodeWidth - 2, 2, 2, 2];
    }
  }
  else
  {
    if (!isRTL)
      offset = DvtTimelineStyleUtils.getBubbleOffset();
    else
      offset = nodeWidth - DvtTimelineStyleUtils.getBubbleOffset();
    startOffset = offset - 6;
    endOffset = offset + 6;
    if (series.isInverted())
    {
      bubbleArray = [0, 0, startOffset, 0, offset, -6, endOffset, 0, nodeWidth, 0, nodeWidth, nodeHeight, 0, nodeHeight, 0, 0];
      innerBubbleArray = [2, 2, startOffset, 2, offset, -4, endOffset, 2, nodeWidth - 2, 2, nodeWidth - 2, nodeHeight - 2, 2, nodeHeight - 2, 2, 2];
    }
    else
    {
      bubbleArray = [0, 0, 0, nodeHeight, startOffset, nodeHeight, offset, nodeHeight + 6, endOffset, nodeHeight, nodeWidth, nodeHeight, nodeWidth, 0, 0, 0];
      innerBubbleArray = [2, 2, 2, nodeHeight - 2, startOffset, nodeHeight - 2, offset, nodeHeight + 4, endOffset, nodeHeight - 2, nodeWidth - 2, nodeHeight - 2, nodeWidth - 2, 2, 2, 2];
    }
  }
  var bubble = new DvtPolygon(context, bubbleArray, bubbleId);
  var innerBubble = new DvtPolygon(context, innerBubbleArray, bubbleId + '_i');

  innerBubble.setSolidFill(DvtTimelineStyleUtils.getItemInnerFillColor());
  //bubble.setPixelHinting(true);

  // margin around content
  content.setTranslate(marginStart, marginTop);
  bubble.addChild(innerBubble);
  bubble.addChild(content);

  var bubbleContainerId = '_bt_' + id;
  var bubbleContainer = new DvtTimelineSeriesItem(context, bubbleContainerId);
  if (animationElems)
  {
    bubbleContainer.setAlpha(0);
    animationElems.push(bubbleContainer);
  }
  bubbleContainer.addChild(bubble);
  if (DvtTimeUtils.supportsTouch())
    DvtToolkitUtils.setAttrNullNS(bubbleContainer._elem, 'id', bubbleContainer._id);

  // associate the node with the marker
  bubbleContainer._node = item;

  // associate the displayable with the node
  item.setBubble(bubbleContainer);
  bubbleContainer.applyState(DvtTimelineSeriesItem.ENABLED_STATE_KEY);

  if (item.getLoc() >= 0)
    container.addChild(bubbleContainer);

  bubbleContainer.setAriaRole('group');
  item._updateAriaLabel();

  series._callbackObj.EventManager.associate(bubbleContainer, item);
};

/**
 * Displays a timeline series item bubble.
 * @param {DvtTimelineSeriesItem} item The item being rendered.
 * @param {DvtTimelineSeries} series The series containing this item.
 * @param {number} overflowOffset The amount of overflow.
 * @param {type} animator The animator.
 * @private
 */
DvtTimelineSeriesItemRenderer._displayBubble = function(item, series, overflowOffset, animator)
{
  var context = series.getCtx();
  var isRTL = DvtAgent.isRightToLeft(context);

  var loc = item.getLoc();
  var nodeWidth = item.getWidth();
  var nodeHeight = item.getHeight();
  var spacing = item.getSpacing();
  var bubbleContainer = item.getBubble();

  var transX;
  var transY;
  if (series.isVertical())
  {
    transY = loc - (nodeHeight / 2);
    if (isRTL && series.isInverted() || !isRTL && !series.isInverted())
      transX = series._size - (nodeWidth + series._initialSpacing) + overflowOffset;
    else
    {
      transX = series._initialSpacing;
      overflowOffset = 0;
    }
  }
  else
  {
    if (!isRTL)
      transX = loc - DvtTimelineStyleUtils.getBubbleOffset();
    else
      transX = series._length - loc - nodeWidth + DvtTimelineStyleUtils.getBubbleOffset();
    if (!series.isInverted())
      transY = series.Height - spacing - nodeHeight + overflowOffset;
    else
    {
      overflowOffset = 0;
      transY = spacing;
    }
  }
  if (animator)
  {
    if (!series.isVertical())
      bubbleContainer.setTranslateY(bubbleContainer.getTranslateY() + series._canvasOffsetY + overflowOffset);
    else
      bubbleContainer.setTranslateX(bubbleContainer.getTranslateX() + series._canvasOffsetX + overflowOffset);
    animator.addProp(DvtAnimator.TYPE_NUMBER, bubbleContainer, bubbleContainer.getTranslateX, bubbleContainer.setTranslateX, transX);
    animator.addProp(DvtAnimator.TYPE_NUMBER, bubbleContainer, bubbleContainer.getTranslateY, bubbleContainer.setTranslateY, transY);
  }
  else
    bubbleContainer.setTranslate(transX, transY);
};

/**
 * Returns the content of a timeline series item bubble.
 * @param {DvtTimelineSeriesItem} item The item being rendered.
 * @param {DvtTimelineSeries} series The series containing this item.
 * @return {DvtContainer} The bubble content for this item.
 * @private
 */
DvtTimelineSeriesItemRenderer._getBubbleContent = function(item, series)
{
  var context = series.getCtx();
  var isRTL = DvtAgent.isRightToLeft(context);

  var title = item.getTitle();
  var desc = item.getDescription();
  var thumbnail = item.getThumbnail();

  var container = new DvtContainer(context);
  var offsetX = 0;
  var offsetY = 0;

  if (!isRTL)
  {
    // left to right rendering
    if (thumbnail)
    {
      var thumbImage = new DvtImage(context, thumbnail, 0, 0, DvtTimelineStyleUtils.getThumbnailWidth(), DvtTimelineStyleUtils.getThumbnailHeight(), '_tn');
      thumbImage.setMouseEnabled(false);
      container.addChild(thumbImage);
      offsetX = DvtTimelineStyleUtils.getThumbnailWidth() + 2;
    }

    if (title)
    {
      var titleText = new DvtOutputText(context, title, offsetX, offsetY);
      titleText.setCSSStyle(DvtTimelineStyleUtils.getItemTitleStyle(item));
      offsetY = 15;
      container.addChild(titleText);
    }

    if (desc)
    {
      var descText = new DvtOutputText(context, desc, offsetX, offsetY);
      descText.setCSSStyle(DvtTimelineStyleUtils.getItemDescriptionStyle(item));
      container.addChild(descText);
    }
  }
  else
  {
    // right to left rendering
    if (title)
    {
      titleText = new DvtOutputText(context, title, 0, offsetY);
      titleText.setCSSStyle(DvtTimelineStyleUtils.getItemTitleStyle(item));
      offsetX = titleText.measureDimensions().w + 2;
      offsetY = 15;
      container.addChild(titleText);
    }

    if (desc)
    {
      descText = new DvtOutputText(context, desc, 0, offsetY);
      descText.setCSSStyle(DvtTimelineStyleUtils.getItemDescriptionStyle(item));
      var width = descText.measureDimensions().w + 2;
      if (offsetX != 0 && width != offsetX)
      {
        if (width > offsetX)
        {
          titleText.setX(width - offsetX);
          offsetX = width;
        }
        else
          descText.setX(offsetX - width);
      }
      else
        offsetX = width;
      container.addChild(descText);
    }

    if (thumbnail)
    {
      thumbImage = new DvtImage(context, thumbnail, offsetX, 0, DvtTimelineStyleUtils.getThumbnailWidth(), DvtTimelineStyleUtils.getThumbnailHeight(), '_tn');
      thumbImage.setMouseEnabled(false);
      container.addChild(thumbImage);
    }
  }
  return container;
};

/**
 * Updates the rendering of a timeline series item bubble.
 * @param {DvtTimelineSeriesItem} item The item being updated.
 * @param {DvtTimelineSeries} series The series containing this item.
 * @private
 */
DvtTimelineSeriesItemRenderer._updateBubble = function(item, series)
{
  var spacing = series.calculateSpacing(item, series._items.length);
  item.setSpacing(spacing);
};

/**
 * Renders a timeline series item feeler.
 * @param {DvtTimelineSeriesItem} item The item being rendered.
 * @param {DvtTimelineSeries} series The series containing this item.
 * @param {DvtContainer} container The container to render into.
 * @param {number} overflowOffset The amount of overflow.
 * @param {type} animationElems The animator.
 * @private
 */
DvtTimelineSeriesItemRenderer._renderFeeler = function(item, series, container, overflowOffset, animationElems)
{
  var context = series.getCtx();
  var isRTL = DvtAgent.isRightToLeft(context);

  var id = item.getId();
  var loc = item.getLoc();
  var spacing = item.getSpacing();

  // draw the feeler
  var feelerId = '_feeler_' + id;
  if (!series.isInverted())
  {
    var feelerY = series.Height + overflowOffset - item.getDurationSize();
    var feelerHeight = series.Height - spacing + overflowOffset;
  }
  else
  {
    feelerY = item.getDurationSize();
    feelerHeight = spacing;
  }
  var feelerX;
  if (isRTL)
    feelerX = series._length - loc;
  else
    feelerX = loc;
  var feeler = new DvtLine(context, feelerX, feelerY, feelerX, feelerHeight, feelerId);
  if (animationElems)
  {
    feeler.setAlpha(0);
    animationElems.push(feeler);
  }

  container.addChild(feeler);
  var feelerWidth = DvtTimelineStyleUtils.getItemStrokeWidth();
  var feelerColor = DvtTimelineStyleUtils.getItemStrokeColor(item);
  var stroke = new DvtSolidStroke(feelerColor, 1, feelerWidth);
  feeler.setStroke(stroke);
  feeler._node = item;
  item.setFeeler(feeler);
};

/**
 * Updates the rendering of a timeline series item feeler.
 * @param {DvtTimelineSeriesItem} item The item being updated.
 * @param {DvtTimelineSeries} series The series containing this item.
 * @param {number} overflowOffset The amount of overflow.
 * @param {type} animator The animator.
 * @private
 */
DvtTimelineSeriesItemRenderer._updateFeeler = function(item, series, overflowOffset, animator)
{
  if (series.isVertical())
  {
    item.setFeeler(null);
    return;
  }

  var context = series.getCtx();
  var isRTL = DvtAgent.isRightToLeft(context);

  var feeler = item.getFeeler();
  if (!series.isInverted())
  {
    var feelerY = series.Height + overflowOffset - item.getDurationSize();
    var feelerHeight = series.Height - item.getSpacing() + overflowOffset;
  }
  else
  {
    overflowOffset = 0;
    feelerY = item.getDurationSize();
    feelerHeight = item.getSpacing();
  }
  var feelerX;
  if (isRTL)
    feelerX = series._length - item.getLoc();
  else
    feelerX = item.getLoc();

  if (animator)
  {
    feeler.setY1(feeler.getY1() + series._canvasOffsetY + overflowOffset);
    feeler.setY2(feeler.getY2() + series._canvasOffsetY + overflowOffset);
    animator.addProp(DvtAnimator.TYPE_NUMBER, feeler, feeler.getX1, feeler.setX1, feelerX);
    animator.addProp(DvtAnimator.TYPE_NUMBER, feeler, feeler.getY1, feeler.setY1, feelerY);
    animator.addProp(DvtAnimator.TYPE_NUMBER, feeler, feeler.getX2, feeler.setX2, feelerX);
    animator.addProp(DvtAnimator.TYPE_NUMBER, feeler, feeler.getY2, feeler.setY2, feelerHeight);
  }
  else
  {
    feeler.setX1(feelerX);
    feeler.setY1(feelerY);
    feeler.setX2(feelerX);
    feeler.setY2(feelerHeight);
  }
};

/**
 * Renders a timeline series item duration.
 * @param {DvtTimelineSeriesItem} item The item being rendered.
 * @param {DvtTimelineSeries} series The series containing this item.
 * @param {DvtContainer} container The container to render into.
 * @param {number} overflowOffset The amount of overflow.
 * @param {type} frAnimationElems The animator.
 * @param {type} mvAnimator The animator.
 */
DvtTimelineSeriesItemRenderer.renderDuration = function(item, series, container, overflowOffset, frAnimationElems, mvAnimator)
{
  if (item.getDurationBar())
    DvtTimelineSeriesItemRenderer._updateDuration(item, series, overflowOffset, mvAnimator);
  else
    DvtTimelineSeriesItemRenderer._renderDuration(item, series, container, overflowOffset, frAnimationElems);
};

/**
 * Renders a timeline series item duration.
 * @param {DvtTimelineSeriesItem} item The item being rendered.
 * @param {DvtTimelineSeries} series The series containing this item.
 * @param {DvtContainer} container The container to render into.
 * @param {number} overflowOffset The amount of overflow.
 * @param {type} animationElems The animator.
 * @private
 */
DvtTimelineSeriesItemRenderer._renderDuration = function(item, series, container, overflowOffset, animationElems)
{
  var context = series.getCtx();
  var isRTL = DvtAgent.isRightToLeft(context);

  var startTime = item.getStartTime();
  var endTime = item.getEndTime();
  var loc = DvtTimeUtils.getDatePosition(series._start, series._end, startTime, series._length);
  var durationId = '_duration_' + item.getId();
  var durationSize = 22 + 10 * item.getDurationLevel();
  var endLoc = DvtTimeUtils.getDatePosition(series._start, series._end, endTime, series._length);
  if (series.isVertical())
  {
    if (!isRTL && !series.isInverted() || isRTL && series.isInverted())
      var duration = new DvtRect(context, series._size - durationSize + 5, loc, durationSize, endLoc - loc, durationId);
    else
    {
      duration = new DvtRect(context, -5, loc, durationSize, endLoc - loc, durationId);
      overflowOffset = 0;
    }
    duration.setTranslateX(overflowOffset);
    duration.setY(loc);
    duration.setWidth(durationSize);
    duration.setHeight(endLoc - loc);
  }
  else
  {
    var width = endLoc - loc;
    if (!isRTL)
      var transX = loc;
    else
      transX = series._length - loc - width;
    if (!series.isInverted())
    {
      duration = new DvtRect(context, transX, series._size - durationSize + 5, width, durationSize, durationId);
      duration.setTranslateY(overflowOffset);
    }
    else
    {
      duration = new DvtRect(context, transX, -5, width, durationSize, durationId);
      duration.setTranslateY(0);
    }
  }
  if (animationElems)
  {
    duration.setAlpha(0);
    animationElems.push(duration);
  }
  duration.setCornerRadius(5);
  duration.setSolidFill(item.getDurationFillColor());

  var feelerWidth = DvtTimelineStyleUtils.getItemStrokeWidth();
  var feelerColor = DvtTimelineStyleUtils.getItemStrokeColor(item);
  var feelerStroke = new DvtSolidStroke(feelerColor, 1, feelerWidth);
  duration.setStroke(feelerStroke);

  duration._node = item;
  series._callbackObj.EventManager.associate(duration, item);
  container.addChild(duration);
  item.setDurationBar(duration);
};

/**
 * Updates the rendering of a timeline series item duration.
 * @param {DvtTimelineSeriesItem} item The item being updated.
 * @param {DvtTimelineSeries} series The series containing this item.
 * @param {number} overflowOffset The amount of overflow.
 * @param {type} animator The animator.
 * @private
 */
DvtTimelineSeriesItemRenderer._updateDuration = function(item, series, overflowOffset, animator)
{
  var context = series.getCtx();
  var isRTL = DvtAgent.isRightToLeft(context);

  var duration = item.getDurationBar();
  if (duration != null)
  {
    var loc = DvtTimeUtils.getDatePosition(series._start, series._end, item.getStartTime(), series._length);
    var durationSize = 22 + 10 * item.getDurationLevel();
    var endLoc = DvtTimeUtils.getDatePosition(series._start, series._end, item.getEndTime(), series._length);
    if (series.isVertical())
    {
      var durationTransY = 0;
      if (!isRTL && !series.isInverted() || isRTL && series.isInverted())
        var durationX = series._size - durationSize + 5;
      else
      {
        durationX = -5;
        overflowOffset = 0;
      }
      var durationTransX = overflowOffset;
      var durationY = loc;
      var durationWidth = durationSize;
      var durationHeight = endLoc - loc;
    }
    else
    {
      durationTransX = 0;
      var width = endLoc - loc;
      if (!isRTL)
        durationX = loc;
      else
        durationX = series._length - loc - width;
      if (!series.isInverted())
      {
        durationTransY = overflowOffset;
        durationY = series._size - durationSize + 5;
        durationWidth = width;
        durationHeight = durationSize;
      }
      else
      {
        overflowOffset = 0;
        durationTransY = 0;
        durationY = -5;
        durationWidth = width;
        durationHeight = durationSize;
      }
    }
    if (animator)
    {
      if (!series.isVertical())
        duration.setTranslateY(duration.getTranslateY() + series._canvasOffsetY + overflowOffset);
      else
        duration.setTranslateX(duration.getTranslateX() + series._canvasOffsetX + overflowOffset);
      animator.addProp(DvtAnimator.TYPE_NUMBER, duration, duration.getTranslateX, duration.setTranslateX, durationTransX);
      animator.addProp(DvtAnimator.TYPE_NUMBER, duration, duration.getTranslateY, duration.setTranslateY, durationTransY);
      animator.addProp(DvtAnimator.TYPE_NUMBER, duration, duration.getX, duration.setX, durationX);
      animator.addProp(DvtAnimator.TYPE_NUMBER, duration, duration.getY, duration.setY, durationY);
      animator.addProp(DvtAnimator.TYPE_NUMBER, duration, duration.getWidth, duration.setWidth, durationWidth);
      animator.addProp(DvtAnimator.TYPE_NUMBER, duration, duration.getHeight, duration.setHeight, durationHeight);
    }
    else
    {
      duration.setTranslateX(durationTransX);
      duration.setTranslateY(durationTransY);
      duration.setX(durationX);
      duration.setY(durationY);
      duration.setWidth(durationWidth);
      duration.setHeight(durationHeight);
    }
  }
};
/**
 * Class representing a TimelineSeries node.
 * @param {object} props The properties for the node.
 * @class
 * @constructor
 *
 * @implements {DvtKeyboardNavigable}
 */
var DvtTimelineSeriesNode = function(timeline, series, props)
{
  this.Init(timeline, series, props);
};

DvtObj.createSubclass(DvtTimelineSeriesNode, DvtObj, 'DvtTimelineSeriesNode');


/**
 * @param {object} props The properties for the node.
 * @protected
 */
DvtTimelineSeriesNode.prototype.Init = function(timeline, seriesIndex, props)
{
  this._timeline = timeline;
  this._seriesIndex = seriesIndex;
  this._series = timeline._series[seriesIndex];
  this._id = props.id;
  this._rowKey = props.rowKey;

  this._startTime = parseInt(props.startTime);

  // TODO: warn user if endTime is invalid
  if (props.endTime)
    this._endTime = parseInt(props.endTime);

  this._title = props.title;
  this._desc = props.desc;
  this._thumbnail = props.thumbnail;

  this._style = props.style;
  this._data = props.data;
  this._action = props.action;
  this._durationFillColor = props.durationFillColor;
  this._durationSize = 0;
};

DvtTimelineSeriesNode.prototype.getId = function()
{
  return this._id;
};

DvtTimelineSeriesNode.prototype.getSeries = function()
{
  return this._series;
};

DvtTimelineSeriesNode.prototype.getSeriesIndex = function()
{
  return this._seriesIndex;
};

DvtTimelineSeriesNode.prototype.getRowKey = function()
{
  return this._rowKey;
};

DvtTimelineSeriesNode.prototype.getStartTime = function()
{
  return this._startTime;
};

DvtTimelineSeriesNode.prototype.setStartTime = function(startTime)
{
  this._startTime = startTime;
};

DvtTimelineSeriesNode.prototype.getEndTime = function()
{
  return this._endTime;
};

DvtTimelineSeriesNode.prototype.setEndTime = function(endTime)
{
  this._endTime = endTime;
};

DvtTimelineSeriesNode.prototype.getTitle = function()
{
  return this._title;
};

DvtTimelineSeriesNode.prototype.getDescription = function()
{
  return this._desc;
};

DvtTimelineSeriesNode.prototype.getThumbnail = function()
{
  return this._thumbnail;
};

DvtTimelineSeriesNode.prototype.getStyle = function()
{
  return this._style;
};

DvtTimelineSeriesNode.prototype.getData = function()
{
  return this._data;
};

///////////////////// association of visual parts with node /////////////////////////

DvtTimelineSeriesNode.prototype.getBubble = function()
{
  return this._displayable;
};

DvtTimelineSeriesNode.prototype.setBubble = function(displayable)
{
  this._displayable = displayable;
};

DvtTimelineSeriesNode.prototype.getFeeler = function()
{
  return this._feeler;
};

DvtTimelineSeriesNode.prototype.setFeeler = function(feeler)
{
  this._feeler = feeler;
};

DvtTimelineSeriesNode.prototype.getDurationBar = function()
{
  return this._durationBar;
};

DvtTimelineSeriesNode.prototype.setDurationBar = function(durationBar)
{
  this._durationBar = durationBar;
};

DvtTimelineSeriesNode.prototype.getLoc = function()
{
  return this._loc;
};

DvtTimelineSeriesNode.prototype.setLoc = function(loc)
{
  this._loc = loc;
};

DvtTimelineSeriesNode.prototype.getSpacing = function()
{
  return this._spacing;
};

DvtTimelineSeriesNode.prototype.setSpacing = function(spacing)
{
  this._spacing = spacing;
};

DvtTimelineSeriesNode.prototype.getDurationLevel = function()
{
  return this._durationLevel;
};

DvtTimelineSeriesNode.prototype.setDurationLevel = function(durationLevel)
{
  this._durationLevel = durationLevel;
};

DvtTimelineSeriesNode.prototype.getDurationSize = function()
{
  return this._durationSize;
};

DvtTimelineSeriesNode.prototype.setDurationSize = function(durationSize)
{
  this._durationSize = durationSize;
};

DvtTimelineSeriesNode.prototype.getDurationFillColor = function()
{
  return this._durationFillColor;
};

DvtTimelineSeriesNode.prototype.setDurationFillColor = function(durationFillColor)
{
  this._durationFillColor = durationFillColor;
};

DvtTimelineSeriesNode.prototype.getLabel = function()
{
  if (this.getEndTime() != null)
    return 'Start Time: ' + new Date(this.getStartTime()).toLocaleString() + '; End Time: ' + new Date(this.getEndTime()).toLocaleString() + '; Title: ' +
        this.getTitle() + '; Description: ' + this.getDescription();
  else
    return 'Time: ' + new Date(this.getStartTime()).toLocaleString() + '; Title: ' + this.getTitle() + '; Description: ' + this.getDescription();
};

DvtTimelineSeriesNode.prototype.getWidth = function()
{
  return this._w;
};

DvtTimelineSeriesNode.prototype.setWidth = function(w)
{
  this._w = w;
};

DvtTimelineSeriesNode.prototype.getHeight = function()
{
  return this._h;
};

DvtTimelineSeriesNode.prototype.setHeight = function(h)
{
  this._h = h;
};

DvtTimelineSeriesNode.prototype.getAction = function()
{
  return this._action;
};

/**
 * Implemented for DvtKeyboardNavigable
 * @override
 */
DvtTimelineSeriesNode.prototype.getNextNavigable = function(event)
{
  var keyboardHandler = this._timeline.EventManager.getKeyboardHandler();
  if (event.type == DvtMouseEvent.CLICK || keyboardHandler.isMultiSelectEvent(event)) {
    return this;
  }
  else if (keyboardHandler.isNavigationEvent(event)) {
    var navigableItems = [];
    for (var i = 0; i < this._timeline._series.length; i++)
    {
      navigableItems.push(this._timeline._series[i]._items);
    }
    return DvtTimelineKeyboardHandler.getNextNavigable(this, event, navigableItems);
  }
  else {
    return null;
  }
};

/**
 * Implemented for DvtKeyboardNavigable
 * @override
 */
DvtTimelineSeriesNode.prototype.getTargetElem = function()
{
  return this._displayable.getElem();
};

/**
 * Implemented for DvtKeyboardNavigable
 * @override
 */
DvtTimelineSeriesNode.prototype.getKeyboardBoundingBox = function(targetCoordinateSpace)
{
  return this._displayable.getDimensions(targetCoordinateSpace);
};

/**
 * Implemented for DvtKeyboardNavigable
 * @override
 */
DvtTimelineSeriesNode.prototype.showKeyboardFocusEffect = function()
{
  this._isShowingKeyboardFocusEffect = true;
  this.showHoverEffect();
  this._timeline.updateScrollForItemNavigation(this);
};

/**
 * Implemented for DvtKeyboardNavigable
 * @override
 */
DvtTimelineSeriesNode.prototype.hideKeyboardFocusEffect = function()
{
  this._isShowingKeyboardFocusEffect = false;
  this.hideHoverEffect();
};

/**
 * Implemented for DvtKeyboardNavigable
 * @override
 */
DvtTimelineSeriesNode.prototype.isShowingKeyboardFocusEffect = function() {
  return this._isShowingKeyboardFocusEffect;
};

/**
 * Implemented for DvtLogicalObject
 * @override
 */
DvtTimelineSeriesNode.prototype.getDisplayables = function() {
  return [this._displayable];
};

/**
 * Implemented for DvtLogicalObject
 * @override
 */
DvtTimelineSeriesNode.prototype.getAriaLabel = function()
{
  var states = [];
  if (this.isSelectable())
    states.push(DvtBundle.getTranslatedString(DvtBundle.UTIL_PREFIX, this.isSelected() ? 'STATE_SELECTED' : 'STATE_UNSELECTED'));
  return DvtDisplayable.generateAriaLabel(this.getLabel(), states);
};

/**
 * Implemented for DvtSelectable
 * @override
 */
DvtTimelineSeriesNode.prototype.setSelectable = function(isSelectable)
{
  this._isSelectable = isSelectable;
};


/**
 * Implemented for DvtSelectable
 * @override
 */
DvtTimelineSeriesNode.prototype.isSelectable = function()
{
  return this._isSelectable;
};

/**
 * Implemented for DvtSelectable
 * @override
 */
DvtTimelineSeriesNode.prototype.isSelected = function()
{
  return this._isSelected;
};

/**
 * Implemented for DvtSelectable
 * @override
 */
DvtTimelineSeriesNode.prototype.setSelected = function(isSelected)
{
  this._isSelected = isSelected;
  this._displayable.setSelected(isSelected);
  this._updateAriaLabel();
  if (this._timeline._hasOverview && this._timeline._overview)
  {
    if (isSelected)
      this._timeline._overview.selSelectItem(this.getId());
    else
      this._timeline._overview.selUnselectItem(this.getId());
  }
};

/**
 * Implemented for DvtSelectable
 * @override
 */
DvtTimelineSeriesNode.prototype.showHoverEffect = function(ignoreOverview)
{
  var isFocused = this._timeline.EventManager.getFocus() == this;
  this._displayable.showHoverEffect(isFocused);
  if (!ignoreOverview && this._timeline._hasOverview)
    this._timeline._overview.highlightItem(this.getId());
  if (this._timeline._isVertical)
  {
    if (!this._index)
      this._index = this._series._blocks[0].getChildIndex(this.getBubble());
    this._series._blocks[0].addChild(this.getBubble());
  }
};

/**
 * Implemented for DvtSelectable
 * @override
 */
DvtTimelineSeriesNode.prototype.hideHoverEffect = function(ignoreOverview)
{
  var isFocused = this._timeline.EventManager.getFocus() == this;
  this._displayable.hideHoverEffect(isFocused);
  if (!ignoreOverview && this._timeline._hasOverview)
    this._timeline._overview.unhighlightItem(this.getId());
  if (this._timeline._isVertical && this._index && !this._isSelected)
    this._series._blocks[0].addChildAt(this.getBubble(), this._index);
};


/**
 * Updates the aria-label as needed. On desktop, we can defer the aria creation, and the aria-label will be updated
 * when the activeElement is set.
 * @private
 */
DvtTimelineSeriesNode.prototype._updateAriaLabel = function() {
  if (!DvtAgent.deferAriaCreation()) {
    this._displayable.setAriaProperty('label', this.getAriaLabel());
  }
};
/**
 * TimelineSeries JSON Parser
 * @param {DvtTimelineSeries} timelineSeries The owning timelineSeries component.
 * @class
 * @constructor
 * @extends {DvtObj}
 */
var DvtTimelineSeriesParser = function()
{
};

DvtObj.createSubclass(DvtTimelineSeriesParser, DvtObj, 'DvtTimelineSeriesParser');

/**
 * Parses the specified XML String and returns the root node of the timelineSeries
 * @param {string} options The String containing XML describing the component.
 * @return {object} An object containing the parsed properties
 */
DvtTimelineSeriesParser.prototype.parse = function(options, oldItems)
{
  // Parse the XML string and get the root node
  var _data = this.buildData(options);

  // Stuff from superclass parser...
  this._startTime = new Date(options['start']);
  this._endTime = new Date(options['end']);

  var ret = this.ParseRootAttributes();

  ret.inlineStyle = options['style'];
  // end of stuff from superclass parser...

  ret.scale = options['scale'];
  ret.timeAxis = options['timeAxis'];
  ret.label = options['label'];
  ret.emptyText = options['emptyText'];

  ret.isIRAnimationEnabled = options['animationOnDisplay'] == 'auto';
  ret.isDCAnimationEnabled = options['animationOnDataChange'] == 'auto';

  ret.items = this._parseDataNode(options['timeline'], options['index'], _data.data, oldItems);
  ret.rtl = 'false';

  return ret;
};

/**
 * Constructs and returns the data array object.
 * @param {object} options The options object.
 * @protected
 */
DvtTimelineSeriesParser.prototype.buildData = function(options) {
  var data = {};

  var itemArray = [];
  var seriesItems = options['items'];
  if (seriesItems) {
    for (var j = 0; j < seriesItems.length; j++) {
      var item = seriesItems[j];
      itemArray.push(item);
    }
  }
  data.data = itemArray;
  return data;
};

/**
 * Parses the attributes on the root node.
 * @return {object} An object containing the parsed properties
 * @protected
 */
DvtTimelineSeriesParser.prototype.ParseRootAttributes = function()
{
  // stuff from superclass parser...
  // The object that will be populated with parsed values and returned
  var ret = new Object();

  ret.origStart = this._startTime;
  ret.origEnd = this._endTime;
  ret.orientation = 'horizontal';
  // end of stuff from superclass parser...

  ret.start = this._startTime.getTime();
  ret.end = this._endTime.getTime();

  return ret;
};

/**
 * Recursively parses the XML nodes, creating tree component nodes.
 * @param {DvtXmlNode} xmlNode The XML node to parse.
 * @return {DvtBaseTreeNode} The resulting tree component node.
 * @private
 */
DvtTimelineSeriesParser.prototype._parseDataNode = function(timeline, seriesIndex, data, oldItems)
{
  var treeNodes = new Array();
  var series = timeline._series[seriesIndex];
  if (data)
  {
    for (var i = 0; i < data.length; i++)
    {
      // parse the attributes and create the node
      var props = this.ParseNodeAttributes(data[i]);
      if (props)
      {
        if (series._allowUpdates)
        {
          var item = this._findExistingItem(props, oldItems);
          if (item)
          {
            var index = DvtArrayUtils.getIndex(oldItems, item);
            oldItems.splice(index, 1);
            item.setSpacing(null);
            item.setDurationLevel(null);
            item.setLoc(null);
            item.setSelected(false);
            item.setStartTime(props.startTime);
            item.setEndTime(props.endTime);
          }
          else
          {
            item = new DvtTimelineSeriesNode(timeline, seriesIndex, props);
            item.setSelectable(true);
          }
        }
        else
        {
          item = new DvtTimelineSeriesNode(timeline, seriesIndex, props);
          item.setSelectable(true);
        }
        var startTime = item.getStartTime();
        var add = true;
        for (var j = 0; j < treeNodes.length; j++)
        {
          // ensure items are sorted in ascending order
          if (startTime < treeNodes[j].getStartTime())
          {
            treeNodes.splice(j, 0, item);
            add = false;
            break;
          }
        }
        if (add)
          treeNodes.push(item);
      }
      // TODO: warn user of invalid data if prop is null
    }
  }
  return treeNodes;
};

DvtTimelineSeriesParser.prototype._findExistingItem = function(props, items)
{
  if (items)
  {
    for (var i = 0; i < items.length; i++)
    {
      var item = items[i];
      if (props.id == item.getId() && props.title == item.getTitle() &&
          props.desc == item.getDescription() && props.thumbnail == item.getThumbnail())
        return item;
    }
  }
};

DvtTimelineSeriesParser.prototype.getDate = function(date)
{
  if (date == null)
    return null;
  else if (date.getTime) // check function reference
    return date.getTime();
  else if (!isNaN(date))
    return date;
  else
    return (new Date(date)).getTime() + 0 * 60 * 60 * 1000; // for twitter, replace 0 with 5
};

/**
 * Parses the attributes on a tree node.
 * @param {DvtXmlNode} xmlNode The xml node defining the tree node
 * @return {object} An object containing the parsed properties
 * @protected
 */
DvtTimelineSeriesParser.prototype.ParseNodeAttributes = function(data)
{
  // The object that will be populated with parsed values and returned
  var ret = new Object();

  ret.id = data['id'];
  ret.rowKey = ret.id;

  ret.startTime = this.getDate(data['start']);
  ret.endTime = this.getDate(data['end']);

  // only return an object if at least part of the event is visible
  var checkTime = ret.endTime ? ret.endTime : ret.startTime;
  if (checkTime < this._startTime.getTime() || ret.startTime > this._endTime.getTime())
    return null;

  ret.title = data['title'];
  ret.desc = data['description'];
  ret.thumbnail = data['thumbnail'];

  ret.data = data;
  ret.style = data['style'];
  ret.action = data['action'];
  ret.durationFillColor = data['durationFillColor'];

  return ret;
};
/**
 * Renderer for DvtTimelineSeries.
 * @class
 */
var DvtTimelineSeriesRenderer = new Object();

DvtObj.createSubclass(DvtTimelineSeriesRenderer, DvtObj, 'DvtTimelineSeriesRenderer');

/**
 * Renders a timeline series.
 * @param {DvtTimelineSeries} series The series being rendered.
 * @param {number} width The width of the series.
 * @param {number} height The height of the series.
 */
DvtTimelineSeriesRenderer.renderSeries = function(series, width, height)
{
  DvtTimelineSeriesRenderer._renderBackground(series, width, height);
  DvtTimelineSeriesRenderer._renderScrollableCanvas(series);
  DvtTimelineSeriesRenderer._renderReferenceObjects(series, series._canvas);
  DvtTimelineSeriesRenderer._renderSeriesTicks(series);

  if (series._items == null || series._items.length == 0)
    return;

  if (series._blocks.length == 0)
  {
    var context = series.getCtx();

    var block = new DvtContainer(context, 'itemBlock_' + series._fetchStartPos + '_' + series._fetchEndPos);
    block.startPos = series._fetchStartPos;
    block.endPos = series._fetchEndPos;

    var feelerBlock = new DvtContainer(context, 'feelers');
    block.addChild(feelerBlock);
    block.feelers = feelerBlock;

    var durationBlock = new DvtContainer(context, 'durations');
    block.addChild(durationBlock);
    block.durations = durationBlock;

    series._canvas.addChild(block);
    series._blocks.push(block);
  }
  else
    block = series._blocks[0];

  series.prepareDurations(series._items);
  series.prepareItems(series._items);

  if (series._isInitialRender)
  {
    if (series._isIRAnimationEnabled)
      series._frAnimationElems = [];
    else
      series._frAnimationElems = null;
    series._mvAnimator = null;
    series._rmAnimationElems = null;
  }
  else
  {
    if (series._allowUpdates && series._isDCAnimationEnabled)
    {
      series._frAnimationElems = [];
      series._mvAnimator = new DvtAnimator(series.getCtx(), DvtTimelineStyleUtils.getAnimationDuration(series.Options), 0, DvtEasing.cubicInOut);
      series._rmAnimationElems = [];
    }
    else
    {
      series._frAnimationElems = null;
      series._mvAnimator = null;
      series._rmAnimationElems = null;
    }
  }
  series._hasMvAnimations = false;

  //make sure to take overflow into consideration
  var overflowOffset = Math.max(0, series._maxOverflowValue - series._size);
  series._overflowOffset = overflowOffset;
  DvtTimelineSeriesRenderer._adjustBackground(series, overflowOffset);

  if (series._oldItems)
    DvtTimelineSeriesRenderer._removeItems(series._oldItems, series, block, series._rmAnimationElems);
  series._oldItems = null;

  if (series.isVertical())
    block.feelers.removeChildren();

  DvtTimelineSeriesRenderer._renderItems(series._items, series, block, series._fetchStartPos, series._fetchEndPos, overflowOffset, series._frAnimationElems, series._mvAnimator);

  //todo: make these update call unnecessary.... although not sure how to put them behind items...
  DvtTimelineSeriesRenderer._updateReferenceObjects(series);
  DvtTimelineSeriesRenderer._updateSeriesTicks(series);
};

/**
 * Updates the size and positioning of a timeline series for zooming.
 * @param {DvtTimelineSeries} series The series being updated.
 */
DvtTimelineSeriesRenderer.updateSeriesForZoom = function(series)
{
  DvtTimelineSeriesRenderer._updateItemsForZoom(series._items, series);
  DvtTimelineSeriesRenderer._updateReferenceObjects(series);
  DvtTimelineSeriesRenderer._updateSeriesTicks(series);
};

/**
 * Renders the background of a timeline series.
 * @param {DvtTimelineSeries} series The series being rendered.
 * @param {number} width The width of the series.
 * @param {number} height The height of the series.
 * @private
 */
DvtTimelineSeriesRenderer._renderBackground = function(series, width, height)
{
  if (series._background)
  {
    var addBackground = false;
    series._background.setWidth(width);
    series._background.setHeight(height);
  }
  else
  {
    addBackground = true;
    series._background = new DvtRect(series.getCtx(), 0, 0, width, height, 'bg');
  }
  series._background.setCSSStyle(series._style);
  series._background.setPixelHinting(true);
  series._background.setCursor('move');

  if (addBackground)
    series.addChild(series._background);
};

/**
 * Adjusts the size and positioning of the background of a timeline series.
 * @param {DvtTimelineSeries} series The series being rendered.
 * @param {number} overflowOffset The amount of overflow.
 * @private
 */
DvtTimelineSeriesRenderer._adjustBackground = function(series, overflowOffset)
{
  var context = series.getCtx();
  var isRTL = DvtAgent.isRightToLeft(context);

  if (overflowOffset > 0)
  {
    if (series.isVertical())
      series._background.setWidth(series._maxOverflowValue);
    else
      series._background.setHeight(series._maxOverflowValue);
  }

  if (series.isVertical())
  {
    if ((!series.isInverted() && !isRTL) || (series.isInverted() && isRTL))
    {
      series._background.setTranslateX(-overflowOffset);
      series.setHScrollPos(overflowOffset);
    }
  }
  else if (!series.isInverted())
  {
    series._background.setTranslateY(-overflowOffset);
    series.setVScrollPos(overflowOffset);
  }
};

/**
 * Renders the scrollable canvas of a timeline series.
 * @param {DvtTimelineSeries} series The series being rendered.
 * @private
 */
DvtTimelineSeriesRenderer._renderScrollableCanvas = function(series)
{
  if (series._canvas)
  {
    series._canvasOffsetX = series._canvas.getTranslateX();
    series._canvasOffsetY = series._canvas.getTranslateY();
    series._canvas.setTranslateX(0);
    series._canvas.setTranslateY(0);
    return;
  }
  series._canvas = new DvtContainer(series.getCtx(), 'canvas');
  series.addChild(series._canvas);
};

/**
 * Renders the items of a timeline series.
 * @param {Array<DvtTimelineSeriesItem>} items The items to be rendered.
 * @param {DvtTimelineSeries} series The series being rendered.
 * @param {DvtContainer} container The container to render into.
 * @param {number} startPos The start position for rendering.
 * @param {number} endPos The end position for rendering.
 * @param {number} overflowOffset The amount of overflow.
 * @param {type} frAnimationElems The animator.
 * @param {type} mvAnimator The animator.
 * @private
 */
DvtTimelineSeriesRenderer._renderItems = function(items, series, container, startPos, endPos, overflowOffset, frAnimationElems, mvAnimator)
{
  for (var i = 0; i < series._layoutItems.length; i++)
  {
    var item = series._layoutItems[i];
    var loc = DvtTimeUtils.getDatePosition(series._start, series._end, item.getStartTime(), series._length);
    if (loc < startPos || loc > endPos)
      continue;

    DvtTimelineSeriesItemRenderer.renderItem(item, series, container, overflowOffset, frAnimationElems, mvAnimator);
  }

  if (DvtTimeUtils.supportsTouch())
  {
    for (var i = 0; i < series._layoutItems.length - 1; i++)
    {
      var item = series._layoutItems[i];
      var next = series._layoutItems[i + 1];
      item.getBubble()._setAriaProperty('flowto', '_bt_' + next.getId());
    }
  }
  DvtTimelineSeriesRenderer._renderDurations(items, series, container, overflowOffset, frAnimationElems, mvAnimator);
};

/**
 * Updates the size and positioning of the items of a timeline series for zooming.
 * @param {Array<DvtTimelineSeriesItem>} items The items to be updated.
 * @param {DvtTimelineSeries} series The series being rendered.
 * @private
 */
DvtTimelineSeriesRenderer._updateItemsForZoom = function(items, series)
{
  if (items == null || items.length == 0)
    return;

  var startPos = series._fetchStartPos;
  var endPos = series._fetchEndPos;
  // only one block for now
  var block = series._blocks[0];
  block.startPos = startPos;
  block.endPos = endPos;

  series.prepareDurations(items);
  if (series.isVertical())
    series._initialSpacing = 20 * (series._maxDurationSize > 0 ? 1 : 0) + DvtTimelineStyleUtils.getBubbleSpacing() + 10 * series._maxDurationSize;
  else
    series._initialSpacing = 20 + DvtTimelineStyleUtils.getBubbleSpacing() + 10 * series._maxDurationSize;

  for (var i = 0; i < items.length; i++)
  {
    var item = items[i];
    var startTime = item.getStartTime();
    var loc = DvtTimeUtils.getDatePosition(series._start, series._end, startTime, series._length);
    // offset position if a duration bar is rendered as well
    var endTime = item.getEndTime();
    if (endTime && endTime != startTime)
    {
      var span = DvtTimeUtils.getDatePosition(series._start, series._end, endTime, series._length) - loc;
      loc = loc + Math.min(DvtTimelineStyleUtils.getDurationFeelerOffset(), span / 2);
    }
    item.setLoc(loc);
    item.setSpacing(null);
  }
  for (var i = 0; i < items.length; i++)
  {
    var item = items[i];
    var itemTime = item.getStartTime();
    if (itemTime < series._start || itemTime > series._end)
      continue;

    DvtTimelineSeriesItemRenderer._updateBubble(item, series);
  }
  var overflowOffset = Math.max(0, series._maxOverflowValue - series._size);
  DvtTimelineSeriesRenderer._adjustBackground(series, overflowOffset);

  for (var i = 0; i < items.length; i++)
  {
    var item = items[i];
    DvtTimelineSeriesItemRenderer._displayBubble(item, series, overflowOffset, null);
    DvtTimelineSeriesItemRenderer._updateFeeler(item, series, overflowOffset, null);
    DvtTimelineSeriesItemRenderer._updateDuration(item, series, overflowOffset, null);
  }
};

/**
 * Renders the item durations of a timeline series.
 * @param {Array<DvtTimelineSeriesItem>} items The items to be rendered.
 * @param {DvtTimelineSeries} series The series being rendered.
 * @param {DvtContainer} container The container to render into.
 * @param {number} overflowOffset The amount of overflow.
 * @param {type} frAnimationElems The animator.
 * @param {type} mvAnimator The animator.
 * @private
 */
DvtTimelineSeriesRenderer._renderDurations = function(items, series, container, overflowOffset, frAnimationElems, mvAnimator)
{
  var durationBlock = container.durations;
  for (var i = series._maxDurationSize; i > 0; i--)
  {
    for (var j = 0; j < items.length; j++)
    {
      var item = items[j];
      var startTime = item.getStartTime();
      var endTime = item.getEndTime();
      if (endTime && endTime != startTime && i == item.getDurationLevel())
        DvtTimelineSeriesItemRenderer.renderDuration(item, series, durationBlock, overflowOffset, frAnimationElems, mvAnimator);
    }
  }
};

/**
 * Renders the major time axis intervals of a timeline series.
 * @param {DvtTimelineSeries} series The series being rendered.
 * @private
 */
DvtTimelineSeriesRenderer._renderSeriesTicks = function(series)
{
  if (series._seriesTicks == null)
  {
    series._seriesTicks = new DvtContainer(series.getCtx());
    series._canvas.addChild(series._seriesTicks);
  }
  else
  {
    // remove all existing ticks and labels
    series._seriesTicks.removeChildren();
    series._seriesTicksArray = [];
  }
  if (series._scale && series._timeAxis)
  {
    var separatorStyle = new DvtCSSStyle(DvtTimelineStyleUtils.getSeriesAxisSeparatorStyle());
    if (series._axisStyleDefaults)
    {
      var separatorColor = series._axisStyleDefaults['separatorColor'];
      if (separatorColor)
        separatorStyle.parseInlineStyle('color:' + separatorColor + ';');
    }
    series._separatorStroke = new DvtSolidStroke(separatorStyle.getStyle(DvtCSSStyle.COLOR));
    series._separatorStroke.setStyle(DvtStroke.DASHED, 3);
    DvtTimelineSeriesRenderer._renderSeriesTimeAxis(series, series._fetchStartPos, series._fetchEndPos, series._seriesTicks);
  }
};

/**
 * Updates the size and positioning of the major axis intervals of a timeline series.
 * @param {DvtTimelineSeries} series The series being updated.
 * @private
 */
DvtTimelineSeriesRenderer._updateSeriesTicks = function(series)
{
  var context = series.getCtx();
  var isRTL = DvtAgent.isRightToLeft(context);

  for (var i = 0; i < series._seriesTicksArray.length; i++)
  {
    var tick = series._seriesTicksArray[i];
    if (!series.isVertical() && isRTL)
      var pos = series._length - DvtTimeUtils.getDatePosition(series._start, series._end, tick.time, series._length);
    else
      pos = DvtTimeUtils.getDatePosition(series._start, series._end, tick.time, series._length);
    if (series.isVertical())
    {
      tick.setX1(0);
      tick.setY1(pos);
      tick.setX2(series._maxOverflowValue);
      tick.setY2(pos);
    }
    else
    {
      tick.setX1(pos);
      tick.setY1(0);
      tick.setX2(pos);
      tick.setY2(series._maxOverflowValue);
    }
  }
};

/**
 * Renders the major axis of a timeline series.
 * @param {DvtTimelineSeries} series The series being rendered.
 * @param {number} startPos The start position for rendering.
 * @param {number} endPos The end position for rendering.
 * @param {DvtContainer} container The container to render into.
 * @private
 */
DvtTimelineSeriesRenderer._renderSeriesTimeAxis = function(series, startPos, endPos, container)
{
  var context = series.getCtx();
  var isRTL = DvtAgent.isRightToLeft(context);

  var start = series._start;
  var end = series._end;

  var startDate = DvtTimeUtils.getPositionDate(start, end, startPos, series._length);
  var currentDate = series._timeAxis.adjustDate(startDate);
  var currentPos = DvtTimeUtils.getDatePosition(start, end, currentDate, series._length);
  while (currentPos < endPos)
  {
    var nextDate = series._timeAxis.getNextDate(currentDate.getTime());
    var next_time_pos = DvtTimeUtils.getDatePosition(start, end, nextDate, series._length);

    if (!series.isVertical() && isRTL)
      var pos = series._length - currentPos;
    else
      pos = currentPos;
    if (series.isVertical())
    {
      var x1 = 0;
      var y1 = pos;
      var x2 = series._maxOverflowValue;
      var y2 = pos;
    }
    else
    {
      x1 = pos;
      y1 = 0;
      x2 = pos;
      y2 = series._maxOverflowValue;
    }

    var tickElem = series.addTick(container, x1, x2, y1, y2, series._separatorStroke, 'o_tick' + currentPos);
    // save the time associated with the element for dynamic resize
    tickElem.time = currentDate.getTime();
    series._seriesTicksArray.push(tickElem);

    currentDate = nextDate;
    currentPos = next_time_pos;
  }
};

/**
 * Renders the reference objects of a timeline series.
 * @param {DvtTimelineSeries} series The series being rendered.
 * @param {DvtContainer} container The container to render into.
 * @private
 */
DvtTimelineSeriesRenderer._renderReferenceObjects = function(series, container)
{
  var context = series.getCtx();
  var isRTL = DvtAgent.isRightToLeft(context);

  if (series._refObjectsContainer == null)
  {
    series._refObjectsContainer = new DvtContainer(context);
    container.addChild(series._refObjectsContainer);
  }
  var referenceObjects = series._referenceObjects;
  if (referenceObjects)
  {
    var maxRefObjects = Math.min(1, referenceObjects.length);
    for (var i = 0; i < maxRefObjects; i++)
    {
      var refObject = referenceObjects[i];
      if (refObject)
      {
        var pos = DvtTimeUtils.getDatePosition(series._start, series._end, refObject, series._length);
        if (series._renderedReferenceObjects.length == 0)
        {
          if (series.isVertical())
            var ref = new DvtLine(context, 0, pos, series._maxOverflowValue, pos, 'zoomOrder[i]');
          else
          {
            if (isRTL)
              pos = series._length - pos;
            ref = new DvtLine(context, pos, 0, pos, series._maxOverflowValue, 'zoomOrder[i]');
          }
          var referenceObjectStroke = new DvtSolidStroke(DvtTimelineStyleUtils.getReferenceObjectColor(series.Options));
          ref.setStroke(referenceObjectStroke);
          ref.setPixelHinting(true);
          ref.date = refObject;
          series._refObjectsContainer.addChild(ref);
          series._renderedReferenceObjects[i] = ref;
        }
      }
    }
  }
  else
  {
    // clear any existing reference objects
    series._refObjectsContainer.removeChildren();
    series._renderedReferenceObjects = [];
  }
};

/**
 * Updates the size and positioning of the reference objects of a timeline series.
 * @param {DvtTimelineSeries} series The series being udpated.
 * @private
 */
DvtTimelineSeriesRenderer._updateReferenceObjects = function(series)
{
  var context = series.getCtx();
  var isRTL = DvtAgent.isRightToLeft(context);

  for (var i = 0; i < series._renderedReferenceObjects.length; i++)
  {
    var ref = series._renderedReferenceObjects[i];
    var pos = DvtTimeUtils.getDatePosition(series._start, series._end, ref.date, series._length);
    if (series.isVertical())
    {
      ref.setX1(0);
      ref.setY1(pos);
      ref.setX2(series._maxOverflowValue);
      ref.setY2(pos);
    }
    else
    {
      if (isRTL)
        pos = series._length - pos;

      ref.setX1(pos);
      ref.setY1(0);
      ref.setX2(pos);
      ref.setY2(series._maxOverflowValue);
    }
  }
};

/**
 * Removes the specified items from a timeline series.
 * @param {type} items The items to be removed.
 * @param {DvtTimelineSeries} series The series being updated.
 * @param {DvtContainer} container The container to remove the items from.
 * @param {type} animationElems An array of elements corresponding to items.
 * @private
 */
DvtTimelineSeriesRenderer._removeItems = function(items, series, container, animationElems)
{
  if (animationElems)
  {
    DvtTimelineSeriesRenderer._animateItemRemoval(items, series, animationElems);
    return;
  }
  for (var i = 0; i < items.length; i++)
  {
    var item = items[i];
    var bubble = item.getBubble();
    container.removeChild(bubble);
    //item.setBubble(null);

    if (!series.isVertical())
    {
      var feelerBlock = container.feelers;
      var feeler = item.getFeeler();
      feelerBlock.removeChild(feeler);
      //item.setFeeler(null);
    }

    var startTime = item.getStartTime();
    var endTime = item.getEndTime();
    if (endTime && endTime != startTime)
    {
      var durationBlock = container.durations;
      var durationBar = item.getDurationBar();
      durationBlock.removeChild(durationBar);
      //item.setDurationBar(null);
    }
  }
};

/**
 * Animates item removal.
 * @param {type} items
 * @param {type} series
 * @param {type} animationElems
 * @private
 */
DvtTimelineSeriesRenderer._animateItemRemoval = function(items, series, animationElems)
{
  for (var i = 0; i < items.length; i++)
  {
    var item = items[i];
    var bubble = item.getBubble();
    if (!series.isVertical())
      bubble.setTranslateY(bubble.getTranslateY() + series._canvasOffsetY + series._overflowOffset);
    else
      bubble.setTranslateX(bubble.getTranslateX() + series._canvasOffsetX + series._overflowOffset);
    animationElems.push(bubble);

    if (!series.isVertical())
    {
      var feeler = item.getFeeler();
      feeler.setTranslateY(feeler.getTranslateY() + series._canvasOffsetY + series._overflowOffset);
      animationElems.push(feeler);
    }

    var startTime = item.getStartTime();
    var endTime = item.getEndTime();
    if (endTime && endTime != startTime)
    {
      var durationBar = item.getDurationBar();
      if (!series.isVertical())
        durationBar.setTranslateY(durationBar.getTranslateY() + series._canvasOffsetY + series._overflowOffset);
      else
        durationBar.setTranslateX(durationBar.getTranslateX() + series._canvasOffsetX + series._overflowOffset);
      animationElems.push(durationBar);
    }
  }
};
/**
 * Timeline viewport change event.
 * @param {string} type
 * @param {number=} viewportStart The start value of the viewport.
 * @param {number=} viewportEnd The end value of the viewport.
 * @param {string=} minorAxisScale The scale value of the minor axis.
 * @class DvtTimelineViewportChangeEvent
 * @extends {DvtBaseComponentEvent}
 * @constructor
 * @export
 **/
var DvtTimelineViewportChangeEvent = function(type, viewportStart, viewportEnd, minorAxisScale)
{
  DvtTimelineViewportChangeEvent.superclass.Init.call(this, type);
  this._viewportStart = viewportStart;
  this._viewportEnd = viewportEnd;
  this._minorAxisScale = minorAxisScale;
};

DvtObj.createSubclass(DvtTimelineViewportChangeEvent, DvtBaseComponentEvent, 'DvtTimelineViewportChangeEvent');

/**
 * @export
 */
DvtTimelineViewportChangeEvent.TYPE = 'viewportChange';

/**
 * Returns the start value of the viewport.
 * @return {number} viewportStart.
 * @export
 */
DvtTimelineViewportChangeEvent.prototype.getViewportStart = function()
{
  return this._viewportStart;
};

/**
 * Returns the end value of the viewport.
 * @return {number} viewportEnd.
 * @export
 */
DvtTimelineViewportChangeEvent.prototype.getViewportEnd = function()
{
  return this._viewportEnd;
};

/**
 * Returns the scale value of the minor axis.
 * @return {string} minorAxisScale.
 * @export
 */
DvtTimelineViewportChangeEvent.prototype.getMinorAxisScale = function()
{
  return this._minorAxisScale;
};

  return D;
});