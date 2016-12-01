/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore", "jquery", "ojs/ojcomponentcore", "ojs/ojdvt-base", "ojs/internal-deps/dvt/DvtLegend"], function($oj$$62$$, $$$$57$$, $comp$$15$$, $base$$14$$, $dvt$$11$$) {
  $oj$$62$$.$__registerWidget$("oj.ojLegend", $$$$57$$.oj.dvtBaseComponent, {widgetEventPrefix:"oj", options:{categoryFilter:null, categoryHighlight:null, drill:null}, $_CreateDvtComponent$:function($context$$161$$, $callback$$121$$, $callbackObj$$14$$) {
    return $dvt$$11$$.DvtLegend.newInstance($context$$161$$, $callback$$121$$, $callbackObj$$14$$);
  }, $_ConvertLocatorToSubId$:function($locator$$59$$) {
    var $subId$$64$$ = $locator$$59$$.subId;
    "oj-legend-section" == $subId$$64$$ ? $subId$$64$$ = "section" + this.$_GetStringFromIndexPath$($locator$$59$$.indexPath) : "oj-legend-item" == $subId$$64$$ ? ($subId$$64$$ = "section" + this.$_GetStringFromIndexPath$($locator$$59$$.sectionIndexPath), $subId$$64$$ += ":item[" + $locator$$59$$.itemIndex + "]") : "oj-legend-tooltip" == $subId$$64$$ && ($subId$$64$$ = "tooltip");
    return $subId$$64$$;
  }, $_ConvertSubIdToLocator$:function($itemSubstr$$1_subId$$65$$) {
    var $locator$$60$$ = {};
    if (0 < $itemSubstr$$1_subId$$65$$.indexOf(":item")) {
      var $itemStartIndex$$1$$ = $itemSubstr$$1_subId$$65$$.indexOf(":item"), $sectionSubstr$$1$$ = $itemSubstr$$1_subId$$65$$.substring(0, $itemStartIndex$$1$$);
      $itemSubstr$$1_subId$$65$$ = $itemSubstr$$1_subId$$65$$.substring($itemStartIndex$$1$$);
      $locator$$60$$.subId = "oj-legend-item";
      $locator$$60$$.sectionIndexPath = this.$_GetIndexPath$($sectionSubstr$$1$$);
      $locator$$60$$.itemIndex = this.$_GetFirstIndex$($itemSubstr$$1_subId$$65$$);
    } else {
      0 == $itemSubstr$$1_subId$$65$$.indexOf("section") ? ($locator$$60$$.subId = "oj-legend-section", $locator$$60$$.indexPath = this.$_GetIndexPath$($itemSubstr$$1_subId$$65$$)) : "tooltip" == $itemSubstr$$1_subId$$65$$ && ($locator$$60$$.subId = "oj-legend-tooltip");
    }
    return $locator$$60$$;
  }, $_GetComponentStyleClasses$:function() {
    var $styleClasses$$24$$ = this._super();
    $styleClasses$$24$$.push("oj-legend");
    return $styleClasses$$24$$;
  }, $_GetChildStyleClasses$:function() {
    var $styleClasses$$25$$ = this._super();
    $styleClasses$$25$$["oj-legend"] = {path:"textStyle", property:"CSS_TEXT_PROPERTIES"};
    $styleClasses$$25$$["oj-legend-title"] = {path:"titleStyle", property:"CSS_TEXT_PROPERTIES"};
    $styleClasses$$25$$["oj-legend-section-title"] = {path:"_sectionTitleStyle", property:"CSS_TEXT_PROPERTIES"};
    $styleClasses$$25$$["oj-legend-section-close-icon"] = {path:"_resources/closedEnabled", property:"CSS_URL"};
    $styleClasses$$25$$["oj-legend-section-close-icon oj-hover"] = {path:"_resources/closedOver", property:"CSS_URL"};
    $styleClasses$$25$$["oj-legend-section-close-icon oj-active"] = {path:"_resources/closedDown", property:"CSS_URL"};
    $styleClasses$$25$$["oj-legend-section-open-icon"] = {path:"_resources/openEnabled", property:"CSS_URL"};
    $styleClasses$$25$$["oj-legend-section-open-icon oj-hover"] = {path:"_resources/openOver", property:"CSS_URL"};
    $styleClasses$$25$$["oj-legend-section-open-icon oj-active"] = {path:"_resources/openDown", property:"CSS_URL"};
    return $styleClasses$$25$$;
  }, $_GetTranslationMap$:function() {
    var $translations$$21$$ = this.options.translations, $ret$$59$$ = this._super();
    $ret$$59$$["DvtUtilBundle.LEGEND"] = $translations$$21$$.componentName;
    return $ret$$59$$;
  }, $_GetEventTypes$:function() {
    return["categoryFilter", "categoryHighlight", "drill"];
  }, $_HandleEvent$:function($event$$551$$) {
    var $filterType$$1_highlightType$$1_type$$101$$ = $event$$551$$ && $event$$551$$.getType ? $event$$551$$.getType() : null;
    $filterType$$1_highlightType$$1_type$$101$$ === $dvt$$11$$.DvtCategoryHideShowEvent.TYPE_HIDE || $filterType$$1_highlightType$$1_type$$101$$ === $dvt$$11$$.DvtCategoryHideShowEvent.TYPE_SHOW ? ($filterType$$1_highlightType$$1_type$$101$$ = $filterType$$1_highlightType$$1_type$$101$$ === $dvt$$11$$.DvtCategoryHideShowEvent.TYPE_HIDE ? "out" : "in", this._trigger("categoryFilter", null, {category:$event$$551$$.getCategory(), type:$filterType$$1_highlightType$$1_type$$101$$}), this.$_UserOptionChange$("hiddenCategories", 
    $event$$551$$.hiddenCategories)) : $filterType$$1_highlightType$$1_type$$101$$ === $dvt$$11$$.DvtCategoryRolloverEvent.TYPE_OVER || $filterType$$1_highlightType$$1_type$$101$$ === $dvt$$11$$.DvtCategoryRolloverEvent.TYPE_OUT ? ($filterType$$1_highlightType$$1_type$$101$$ = $filterType$$1_highlightType$$1_type$$101$$ === $dvt$$11$$.DvtCategoryRolloverEvent.TYPE_OVER ? "on" : "off", this._trigger("categoryHighlight", null, {categories:$event$$551$$.categories, type:$filterType$$1_highlightType$$1_type$$101$$}), 
    this.$_UserOptionChange$("highlightedCategories", $event$$551$$.categories)) : $filterType$$1_highlightType$$1_type$$101$$ === $dvt$$11$$.DvtDrillEvent.TYPE ? this._trigger("drill", null, {id:$event$$551$$.getId()}) : this._super($event$$551$$);
  }, $_LoadResources$:function() {
    null == this.options._resources && (this.options._resources = {});
    this.options._resources.overviewGrippy = $oj$$62$$.$Config$.$getResourceUrl$("resources/internal-deps/dvt/chart/drag_horizontal.png");
  }, $_Render$:function() {
    this._super();
    this.element.attr("role") || this.element.attr("tabIndex", null);
  }, getTitle:function() {
    return this.$_component$.getAutomation().getTitle();
  }, getSection:function($subIdPath$$2$$) {
    var $ret$$60$$ = this.$_component$.getAutomation().getSection($subIdPath$$2$$);
    if ($ret$$60$$) {
      var $ojComponent$$ = this;
      this.$_AddAutomationGetters$($ret$$60$$);
      $ret$$60$$.getSection = function $$ret$$60$$$getSection$($section$$1_sectionIndex$$) {
        ($section$$1_sectionIndex$$ = $ret$$60$$.sections ? $ret$$60$$.sections[$section$$1_sectionIndex$$] : null) && $ojComponent$$.$_AddAutomationGetters$($section$$1_sectionIndex$$);
        return $section$$1_sectionIndex$$;
      };
      $ret$$60$$.getItem = function $$ret$$60$$$getItem$($item$$121_itemIndex$$1$$) {
        ($item$$121_itemIndex$$1$$ = $ret$$60$$.items ? $ret$$60$$.items[$item$$121_itemIndex$$1$$] : null) && $ojComponent$$.$_AddAutomationGetters$($item$$121_itemIndex$$1$$);
        return $item$$121_itemIndex$$1$$;
      };
    }
    return $ret$$60$$;
  }, getItem:function($ret$$61_subIdPath$$3$$) {
    $ret$$61_subIdPath$$3$$ = this.$_component$.getAutomation().getItem($ret$$61_subIdPath$$3$$);
    this.$_AddAutomationGetters$($ret$$61_subIdPath$$3$$);
    return $ret$$61_subIdPath$$3$$;
  }, getPreferredSize:function($width$$31$$, $height$$32$$) {
    var $dims$$ = this.$_component$.getPreferredSize(this.options, $width$$31$$, $height$$32$$);
    return{width:$dims$$.getWidth(), height:$dims$$.getHeight()};
  }, getContextByNode:function($context$$162_node$$111$$) {
    return($context$$162_node$$111$$ = this.getSubIdByNode($context$$162_node$$111$$)) && "oj-legend-tooltip" !== $context$$162_node$$111$$.subId ? $context$$162_node$$111$$ : null;
  }, $_GetComponentDeferredDataPaths$:function() {
    return{sections:["items"]};
  }});
});
