/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore", "jquery", "ojs/ojcomponentcore", "ojs/ojdvt-base", "ojs/internal-deps/dvt/DvtTagCloud"], function($oj$$37$$, $$$$34$$, $comp$$10$$, $base$$9$$, $dvt$$6$$) {
  $oj$$37$$.$__registerWidget$("oj.ojTagCloud", $$$$34$$.oj.dvtBaseComponent, {widgetEventPrefix:"oj", options:{optionChange:null}, $_CreateDvtComponent$:function($context$$125$$, $callback$$111$$, $callbackObj$$8$$) {
    return $dvt$$6$$.DvtTagCloud.newInstance($context$$125$$, $callback$$111$$, $callbackObj$$8$$);
  }, $_ConvertLocatorToSubId$:function($locator$$41$$) {
    var $subId$$44$$ = $locator$$41$$.subId;
    "oj-tagcloud-item" == $subId$$44$$ ? $subId$$44$$ = "item[" + $locator$$41$$.index + "]" : "oj-tagcloud-tooltip" == $subId$$44$$ && ($subId$$44$$ = "tooltip");
    return $subId$$44$$;
  }, $_ConvertSubIdToLocator$:function($subId$$45$$) {
    var $locator$$42$$ = {};
    0 == $subId$$45$$.indexOf("item") ? ($locator$$42$$.subId = "oj-tagcloud-item", $locator$$42$$.index = this.$_GetFirstIndex$($subId$$45$$)) : "tooltip" == $subId$$45$$ && ($locator$$42$$.subId = "oj-tagcloud-tooltip");
    return $locator$$42$$;
  }, $_GetComponentStyleClasses$:function() {
    var $styleClasses$$13$$ = this._super();
    $styleClasses$$13$$.push("oj-tagcloud");
    return $styleClasses$$13$$;
  }, $_GetChildStyleClasses$:function() {
    var $styleClasses$$14$$ = this._super();
    $styleClasses$$14$$["oj-tagcloud"] = {path:"styleDefaults/style", property:"CSS_TEXT_PROPERTIES"};
    return $styleClasses$$14$$;
  }, $_GetEventTypes$:function() {
    return["optionChange"];
  }, $_GetTranslationMap$:function() {
    var $translations$$15$$ = this.options.translations, $ret$$41$$ = this._super();
    $ret$$41$$["DvtUtilBundle.TAG_CLOUD"] = $translations$$15$$.componentName;
    return $ret$$41$$;
  }, $_HandleEvent$:function($event$$426$$) {
    ($event$$426$$ && $event$$426$$.getType ? $event$$426$$.getType() : null) === $dvt$$6$$.DvtSelectionEvent.TYPE ? this.$_UserOptionChange$("selection", $event$$426$$.getSelection()) : this._super($event$$426$$);
  }, getItem:function($index$$199$$) {
    return this.$_component$.getAutomation().getItem($index$$199$$);
  }, getItemCount:function() {
    return this.$_component$.getAutomation().getItemCount();
  }, getContextByNode:function($context$$126_node$$92$$) {
    return($context$$126_node$$92$$ = this.getSubIdByNode($context$$126_node$$92$$)) && "oj-tagcloud-tooltip" !== $context$$126_node$$92$$.subId ? $context$$126_node$$92$$ : null;
  }, $_GetComponentDeferredDataPaths$:function() {
    return{root:["items"]};
  }});
});
