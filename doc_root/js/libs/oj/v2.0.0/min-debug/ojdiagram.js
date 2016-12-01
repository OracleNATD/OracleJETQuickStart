/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore", "jquery", "ojs/ojcomponentcore", "ojs/ojdvt-base", "ojs/internal-deps/dvt/DvtDiagram"], function($oj$$80$$, $$$$74$$, $comp$$17$$, $base$$15$$, $dvt$$12$$) {
  $oj$$80$$.$__registerWidget$("oj.ojDiagram", $$$$74$$.oj.dvtBaseComponent, {widgetEventPrefix:"oj", options:{optionChange:null}, $_Render$:function($isResize$$1$$) {
    this.options._logger = $oj$$80$$.$Logger$;
    this.options._templateFunction && (this.options.renderer = this.$_getTemplateRenderer$(this.options._templateFunction));
    this.options.renderer && (this.options._contextHandler = this.$_getContextHandler$());
    return this._super($isResize$$1$$);
  }, $_getTemplateRenderer$:function($templateFunction$$1$$) {
    var $thisRef$$3$$ = this;
    return function($context$$167_elem$$170$$) {
      var $dummyDiv$$1$$ = document.createElement("div");
      $dummyDiv$$1$$.style.display = "none";
      $dummyDiv$$1$$.$_dvtcontext$ = $thisRef$$3$$.$_context$;
      $thisRef$$3$$.element.append($dummyDiv$$1$$);
      $templateFunction$$1$$({parentElement:$dummyDiv$$1$$, data:$context$$167_elem$$170$$.data});
      return($context$$167_elem$$170$$ = $dummyDiv$$1$$.children[0]) && "http://www.w3.org/2000/svg" === $context$$167_elem$$170$$.namespaceURI ? ($$$$74$$($dummyDiv$$1$$).remove(), $context$$167_elem$$170$$) : $context$$167_elem$$170$$ ? $thisRef$$3$$.$_GetDvtComponent$($context$$167_elem$$170$$) : null;
    };
  }, $_getContextHandler$:function() {
    var $thisRef$$4$$ = this;
    return function($parentElement$$9$$, $rootElement$$21$$, $data$$184$$, $state$$14$$, $previousState$$1$$) {
      return{component:$oj$$80$$.Components.$getWidgetConstructor$($thisRef$$4$$.element), parentElement:$parentElement$$9$$, rootElement:$rootElement$$21$$, data:$data$$184$$, state:$state$$14$$, previousState:$previousState$$1$$, id:$data$$184$$.id, type:"node", label:$data$$184$$.label};
    };
  }, renderDefaultHover:function($context$$169$$) {
    $context$$169$$.previousState && $context$$169$$.state.hovered == $context$$169$$.previousState.hovered || this.$_GetDvtComponent$(this.element).processDefaultHoverEffect($context$$169$$.id, $context$$169$$.state.hovered);
  }, renderDefaultSelection:function($context$$170$$) {
    $context$$170$$.previousState && $context$$170$$.state.selected == $context$$170$$.previousState.selected || this.$_GetDvtComponent$(this.element).processDefaultSelectionEffect($context$$170$$.id, $context$$170$$.state.selected);
  }, renderDefaultFocus:function($context$$171$$) {
    $context$$171$$.previousState && $context$$171$$.state.focused == $context$$171$$.previousState.focused || this.$_GetDvtComponent$(this.element).processDefaultFocusEffect($context$$171$$.id, $context$$171$$.state.focused);
  }, $_CreateDvtComponent$:function($context$$172$$, $callback$$133$$, $callbackObj$$15$$) {
    return $dvt$$12$$.DvtDiagram.newInstance($context$$172$$, $callback$$133$$, $callbackObj$$15$$);
  }, $_ConvertLocatorToSubId$:function($locator$$67$$) {
    var $subId$$70$$ = $locator$$67$$.subId;
    "oj-diagram-link" == $subId$$70$$ ? $subId$$70$$ = "link[" + $locator$$67$$.index + "]" : "oj-diagram-node" == $subId$$70$$ ? $subId$$70$$ = "node[" + $locator$$67$$.index + "]" : "oj-diagram-tooltip" == $subId$$70$$ && ($subId$$70$$ = "tooltip");
    return $subId$$70$$;
  }, $_ConvertSubIdToLocator$:function($subId$$71$$) {
    var $locator$$68$$ = {};
    0 == $subId$$71$$.indexOf("link") ? ($locator$$68$$.subId = "oj-diagram-link", $locator$$68$$.index = this.$_GetFirstIndex$($subId$$71$$)) : 0 == $subId$$71$$.indexOf("node") ? ($locator$$68$$.subId = "oj-diagram-node", $locator$$68$$.index = this.$_GetFirstIndex$($subId$$71$$)) : "tooltip" == $subId$$71$$ && ($locator$$68$$.subId = "oj-diagram-tooltip");
    return $locator$$68$$;
  }, $_GetComponentStyleClasses$:function() {
    var $styleClasses$$26$$ = this._super();
    $styleClasses$$26$$.push("oj-diagram");
    return $styleClasses$$26$$;
  }, $_GetChildStyleClasses$:function() {
    var $styleClasses$$27$$ = this._super();
    $styleClasses$$27$$["oj-diagram-node-label"] = {path:"styleDefaults/nodeDefaults/labelStyle", property:"CSS_TEXT_PROPERTIES"};
    $styleClasses$$27$$["oj-diagram-node oj-selected"] = {path:"styleDefaults/nodeDefaults/selectionColor", property:"border-color"};
    $styleClasses$$27$$["oj-diagram-node oj-hover"] = [{path:"styleDefaults/nodeDefaults/hoverOuterColor", property:"border-top-color"}, {path:"styleDefaults/nodeDefaults/hoverInnerColor", property:"border-bottom-color"}];
    $styleClasses$$27$$["oj-diagram-link"] = {path:"styleDefaults/linkDefaults/color", property:"color"};
    $styleClasses$$27$$["oj-diagram-link-label"] = {path:"styleDefaults/linkDefaults/labelStyle", property:"CSS_TEXT_PROPERTIES"};
    $styleClasses$$27$$["oj-diagram-link oj-selected"] = {path:"styleDefaults/linkDefaults/selectionColor", property:"border-color"};
    $styleClasses$$27$$["oj-diagram-link oj-hover"] = [{path:"styleDefaults/linkDefaults/hoverOuterColor", property:"border-top-color"}, {path:"styleDefaults/linkDefaults/hoverInnerColor", property:"border-bottom-color"}];
    return $styleClasses$$27$$;
  }, $_GetEventTypes$:function() {
    return["optionChange"];
  }, $_GetTranslationMap$:function() {
    var $translations$$22$$ = this.options.translations, $ret$$81$$ = this._super();
    $ret$$81$$["DvtUtilBundle.DIAGRAM"] = $translations$$22$$.componentName;
    return $ret$$81$$;
  }, $_HandleEvent$:function($event$$683$$) {
    ($event$$683$$ && $event$$683$$.getType ? $event$$683$$.getType() : null) === $dvt$$12$$.DvtSelectionEvent.TYPE ? this.$_UserOptionChange$("selection", $event$$683$$.getSelection()) : this._super($event$$683$$);
  }, getNodeCount:function() {
    return this.$_component$.getAutomation().getNodeCount();
  }, getNode:function($nodeIndex$$2$$) {
    return this.$_component$.getAutomation().getNode($nodeIndex$$2$$);
  }, getLinkCount:function() {
    return this.$_component$.getAutomation().getLinkCount();
  }, getLink:function($linkIndex$$) {
    return this.$_component$.getAutomation().getLink($linkIndex$$);
  }, getContextByNode:function($context$$173_node$$173$$) {
    return($context$$173_node$$173$$ = this.getSubIdByNode($context$$173_node$$173$$)) && "oj-diagram-tooltip" !== $context$$173_node$$173$$.subId ? $context$$173_node$$173$$ : null;
  }, $_GetComponentDeferredDataPaths$:function() {
    return{root:["nodes", "links"]};
  }});
});
