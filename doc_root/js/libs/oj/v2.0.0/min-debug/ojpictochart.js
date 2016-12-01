/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore", "jquery", "ojs/ojcomponentcore", "ojs/ojdvt-base", "ojs/internal-deps/dvt/DvtPictoChart"], function($oj$$50$$, $$$$45$$, $comp$$12$$, $base$$11$$, $dvt$$8$$) {
  $oj$$50$$.$__registerWidget$("oj.ojPictoChart", $$$$45$$.oj.dvtBaseComponent, {widgetEventPrefix:"oj", options:{optionChange:null, drill:null}, $_CreateDvtComponent$:function($context$$148$$, $callback$$115$$, $callbackObj$$10$$) {
    return $dvt$$8$$.DvtPictoChart.newInstance($context$$148$$, $callback$$115$$, $callbackObj$$10$$);
  }, $_ConvertLocatorToSubId$:function($locator$$50$$) {
    var $subId$$54$$ = $locator$$50$$.subId;
    "oj-pictochart-item" == $subId$$54$$ ? $subId$$54$$ = "item[" + $locator$$50$$.index + "]" : "oj-pictochart-tooltip" == $subId$$54$$ && ($subId$$54$$ = "tooltip");
    return $subId$$54$$;
  }, $_ConvertSubIdToLocator$:function($subId$$55$$) {
    var $locator$$51$$ = {};
    0 == $subId$$55$$.indexOf("item") ? ($locator$$51$$.subId = "oj-pictochart-item", $locator$$51$$.index = this.$_GetFirstIndex$($subId$$55$$)) : "tooltip" == $subId$$55$$ && ($locator$$51$$.subId = "oj-pictochart-tooltip");
    return $locator$$51$$;
  }, $_GetComponentStyleClasses$:function() {
    var $styleClasses$$17$$ = this._super();
    $styleClasses$$17$$.push("oj-pictochart");
    return $styleClasses$$17$$;
  }, $_GetChildStyleClasses$:function() {
    var $styleClasses$$18$$ = this._super();
    $styleClasses$$18$$["oj-pictochart-item"] = {path:"_defaultColor", property:"background-color"};
    return $styleClasses$$18$$;
  }, $_GetEventTypes$:function() {
    return["optionChange"];
  }, $_HandleEvent$:function($event$$515$$) {
    var $type$$96$$ = $event$$515$$ && $event$$515$$.getType ? $event$$515$$.getType() : null;
    $type$$96$$ === $dvt$$8$$.DvtSelectionEvent.TYPE ? this.$_UserOptionChange$("selection", $event$$515$$.getSelection()) : $type$$96$$ === $dvt$$8$$.DvtCategoryRolloverEvent.TYPE_OVER || $type$$96$$ === $dvt$$8$$.DvtCategoryRolloverEvent.TYPE_OUT ? this.$_UserOptionChange$("highlightedCategories", $event$$515$$.categories) : $type$$96$$ === $dvt$$8$$.DvtDrillEvent.TYPE ? this._trigger("drill", null, {id:$event$$515$$.getId()}) : this._super($event$$515$$);
  }, getItem:function($index$$223$$) {
    return this.$_component$.getAutomation().getItem($index$$223$$);
  }, getItemCount:function() {
    return this.$_component$.getAutomation().getItemCount();
  }, getContextByNode:function($context$$149_node$$105$$) {
    return($context$$149_node$$105$$ = this.getSubIdByNode($context$$149_node$$105$$)) && "oj-pictochart-tooltip" !== $context$$149_node$$105$$.subId ? $context$$149_node$$105$$ : null;
  }, $_GetComponentDeferredDataPaths$:function() {
    return{root:["items"]};
  }, $_IsFlowingLayoutSupported$:function() {
    return!0;
  }});
});
