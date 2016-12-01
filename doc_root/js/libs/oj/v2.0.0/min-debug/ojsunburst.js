/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore", "jquery", "ojs/ojcomponentcore", "ojs/ojdvt-base", "ojs/internal-deps/dvt/DvtSunburst"], function($oj$$33$$, $$$$30$$, $comp$$8$$, $base$$7$$, $dvt$$4$$) {
  $oj$$33$$.$__registerWidget$("oj.ojSunburst", $$$$30$$.oj.dvtBaseComponent, {widgetEventPrefix:"oj", options:{optionChange:null, rotateInput:null}, $_CreateDvtComponent$:function($context$$121$$, $callback$$109$$, $callbackObj$$6$$) {
    return $dvt$$4$$.DvtSunburst.newInstance($context$$121$$, $callback$$109$$, $callbackObj$$6$$);
  }, $_ConvertLocatorToSubId$:function($locator$$35$$) {
    var $subId$$39$$ = $locator$$35$$.subId;
    "oj-sunburst-node" == $subId$$39$$ ? $subId$$39$$ = "node" + this.$_GetStringFromIndexPath$($locator$$35$$.indexPath) : "oj-sunburst-tooltip" == $subId$$39$$ && ($subId$$39$$ = "tooltip");
    return $subId$$39$$;
  }, $_ConvertSubIdToLocator$:function($subId$$40$$) {
    var $locator$$36$$ = {};
    0 == $subId$$40$$.indexOf("node") ? ($locator$$36$$.subId = "oj-sunburst-node", $locator$$36$$.indexPath = this.$_GetIndexPath$($subId$$40$$)) : "tooltip" == $subId$$40$$ && ($locator$$36$$.subId = "oj-sunburst-tooltip");
    return $locator$$36$$;
  }, $_GetComponentStyleClasses$:function() {
    var $styleClasses$$9$$ = this._super();
    $styleClasses$$9$$.push("oj-sunburst");
    return $styleClasses$$9$$;
  }, $_GetChildStyleClasses$:function() {
    var $styleClasses$$10$$ = this._super();
    $styleClasses$$10$$["oj-sunburst-attribute-type-text"] = {path:"styleDefaults/_attributeTypeTextStyle", property:"CSS_TEXT_PROPERTIES"};
    $styleClasses$$10$$["oj-sunburst-attribute-value-text"] = {path:"styleDefaults/_attributeValueTextStyle", property:"CSS_TEXT_PROPERTIES"};
    $styleClasses$$10$$["oj-sunburst-node"] = {path:"nodeDefaults/labelStyle", property:"CSS_TEXT_PROPERTIES"};
    $styleClasses$$10$$["oj-sunburst-node oj-hover"] = {path:"nodeDefaults/hoverColor", property:"border-top-color"};
    $styleClasses$$10$$["oj-sunburst-node oj-selected"] = [{path:"nodeDefaults/selectedOuterColor", property:"border-top-color"}, {path:"nodeDefaults/selectedInnerColor", property:"border-bottom-color"}];
    return $styleClasses$$10$$;
  }, $_GetEventTypes$:function() {
    return["optionChange", "rotateInput"];
  }, $_GetTranslationMap$:function() {
    var $translations$$13$$ = this.options.translations, $ret$$36$$ = this._super();
    $ret$$36$$["DvtSunburstBundle.COLOR"] = $translations$$13$$.labelColor;
    $ret$$36$$["DvtSunburstBundle.SIZE"] = $translations$$13$$.labelSize;
    $ret$$36$$["DvtUtilBundle.SUNBURST"] = $translations$$13$$.componentName;
    return $ret$$36$$;
  }, $_HandleEvent$:function($event$$404$$) {
    var $type$$90$$ = $event$$404$$ && $event$$404$$.getType ? $event$$404$$.getType() : null;
    $type$$90$$ === $dvt$$4$$.DvtSelectionEvent.TYPE ? this.$_UserOptionChange$("selection", $event$$404$$.getSelection()) : $type$$90$$ === $dvt$$4$$.DvtSunburstRotationEvent.TYPE ? this.$_UserOptionChange$("startAngle", $event$$404$$.getStartAngle()) : $type$$90$$ === $dvt$$4$$.DvtSunburstRotationEvent.TYPE_INPUT ? this._trigger("rotateInput", null, {value:$event$$404$$.getStartAngle()}) : this._super($event$$404$$);
  }, $_LoadResources$:function() {
    null == this.options._resources && (this.options._resources = {});
    this.options._resources.rotateCursor = $oj$$33$$.$Config$.$getResourceUrl$("resources/internal-deps/dvt/sunburst/rotate.cur");
  }, getNode:function($ret$$37_subIdPath$$) {
    $ret$$37_subIdPath$$ = this.$_component$.getAutomation().getNode($ret$$37_subIdPath$$);
    this.$_AddAutomationGetters$($ret$$37_subIdPath$$);
    return $ret$$37_subIdPath$$;
  }, getContextByNode:function($context$$122_node$$87$$) {
    return($context$$122_node$$87$$ = this.getSubIdByNode($context$$122_node$$87$$)) && "oj-sunburst-tooltip" !== $context$$122_node$$87$$.subId ? $context$$122_node$$87$$ : null;
  }, $_GetComponentDeferredDataPaths$:function() {
    return{root:["nodes"]};
  }});
});
