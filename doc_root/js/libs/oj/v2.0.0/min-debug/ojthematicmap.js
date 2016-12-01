/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore", "jquery", "ojs/ojcomponentcore", "ojs/ojdvt-base", "ojs/internal-deps/dvt/DvtThematicMap"], function($oj$$55$$, $$$$50$$, $comp$$14$$, $base$$13$$, $dvt$$10$$) {
  $oj$$55$$.$__registerWidget$("oj.ojThematicMap", $$$$50$$.oj.dvtBaseComponent, {widgetEventPrefix:"oj", options:{load:null, optionChange:null}, $_currentLocale$:"", $_loadedBasemaps$:[], $_supportedLocales$:{ar:"ar", cs:"cs", da:"da", de:"de", el:"el", es:"es", fi:"fi", fr:"fr", "fr-ca":"fr_CA", he:"iw", hu:"hu", it:"it", ja:"ja", ko:"ko", nl:"nl", no:"no", pl:"pl", pt:"pt_BR", "pt-pt":"pt", ro:"ro", ru:"ru", sk:"sk", sv:"sv", th:"th", tr:"tr", "zh-hans":"zh_CN", "zh-hant":"zh_TW"}, _ComponentCreate:function() {
    this._super();
    this.$_checkBasemaps$ = [];
    this.$_initiallyRendered$ = !1;
    this.$_dataLayersToUpdate$ = [];
  }, $_CreateDvtComponent$:function($context$$154$$, $callback$$118$$, $callbackObj$$13$$) {
    return $dvt$$10$$.DvtThematicMap.newInstance($context$$154$$, $callback$$118$$, $callbackObj$$13$$);
  }, $_ConvertLocatorToSubId$:function($locator$$56$$) {
    var $subId$$60$$ = $locator$$56$$.subId;
    "oj-thematicmap-area" == $subId$$60$$ ? $subId$$60$$ = $locator$$56$$.dataLayer + ":area[" + $locator$$56$$.index + "]" : "oj-thematicmap-marker" == $subId$$60$$ ? $subId$$60$$ = $locator$$56$$.dataLayer + ":marker[" + $locator$$56$$.index + "]" : "oj-thematicmap-tooltip" == $subId$$60$$ && ($subId$$60$$ = "tooltip");
    return $subId$$60$$;
  }, $_ConvertSubIdToLocator$:function($subId$$61$$) {
    var $locator$$57$$ = {};
    0 < $subId$$61$$.indexOf(":area") ? ($locator$$57$$.subId = "oj-thematicmap-area", $locator$$57$$.dataLayer = $subId$$61$$.substring(0, $subId$$61$$.indexOf(":")), $locator$$57$$.index = this.$_GetFirstIndex$($subId$$61$$)) : 0 < $subId$$61$$.indexOf(":marker") ? ($locator$$57$$.subId = "oj-thematicmap-marker", $locator$$57$$.dataLayer = $subId$$61$$.substring(0, $subId$$61$$.indexOf(":")), $locator$$57$$.index = this.$_GetFirstIndex$($subId$$61$$)) : "tooltip" == $subId$$61$$ && ($locator$$57$$.subId = 
    "oj-thematicmap-tooltip");
    return $locator$$57$$;
  }, $_GetComponentStyleClasses$:function() {
    var $styleClasses$$22$$ = this._super();
    $styleClasses$$22$$.push("oj-thematicmap");
    return $styleClasses$$22$$;
  }, $_GetChildStyleClasses$:function() {
    var $styleClasses$$23$$ = this._super();
    $styleClasses$$23$$["oj-dvtbase oj-thematicmap"] = {path:"animationDuration", property:"animation-duration"};
    $styleClasses$$23$$["oj-thematicmap-arealayer"] = [{path:"styleDefaults/areaStyle", property:"CSS_BACKGROUND_PROPERTIES"}, {path:"styleDefaults/labelStyle", property:"CSS_TEXT_PROPERTIES"}];
    $styleClasses$$23$$["oj-thematicmap-area"] = {path:"styleDefaults/dataAreaDefaults/borderColor", property:"border-top-color"};
    $styleClasses$$23$$["oj-thematicmap-area oj-hover"] = {path:"styleDefaults/dataAreaDefaults/hoverColor", property:"border-top-color"};
    $styleClasses$$23$$["oj-thematicmap-area oj-selected"] = [{path:"styleDefaults/dataAreaDefaults/selectedInnerColor", property:"border-top-color"}, {path:"styleDefaults/dataAreaDefaults/selectedOuterColor", property:"border-bottom-color"}];
    $styleClasses$$23$$["oj-thematicmap-marker"] = [{path:"styleDefaults/dataMarkerDefaults/labelStyle", property:"CSS_TEXT_PROPERTIES"}, {path:"styleDefaults/dataMarkerDefaults/color", property:"background-color"}, {path:"styleDefaults/dataMarkerDefaults/opacity", property:"opacity"}, {path:"styleDefaults/dataMarkerDefaults/borderColor", property:"border-top-color"}];
    return $styleClasses$$23$$;
  }, $_GetEventTypes$:function() {
    return["load", "optionChange"];
  }, _setOptions:function($options$$324$$, $flags$$48$$) {
    var $i$$370_numUpdates$$ = Object.keys($options$$324$$).length, $newAreaLayers$$ = $options$$324$$.areaLayers, $oldAreaLayers$$ = this.options.areaLayers, $newAreaLayer_pointDataLayers$$ = $options$$324$$.pointDataLayers;
    if (1 == $i$$370_numUpdates$$ && $newAreaLayers$$ && $oldAreaLayers$$ && 0 < $oldAreaLayers$$.length) {
      for ($i$$370_numUpdates$$ = 0;$i$$370_numUpdates$$ < $newAreaLayers$$.length;$i$$370_numUpdates$$++) {
        var $newAreaLayer_pointDataLayers$$ = $newAreaLayers$$[$i$$370_numUpdates$$], $currAreaLayer$$ = $oldAreaLayers$$[$i$$370_numUpdates$$], $updateDataLayer$$ = !0, $areaLayerKey$$;
        for ($areaLayerKey$$ in $newAreaLayer_pointDataLayers$$) {
          "areaDataLayer" != $areaLayerKey$$ && $newAreaLayer_pointDataLayers$$[$areaLayerKey$$] != $currAreaLayer$$[$areaLayerKey$$] && ($updateDataLayer$$ = $updateDataLayer$$ && !1);
        }
        $updateDataLayer$$ && !$oj$$55$$.$Object$.$compareValues$($currAreaLayer$$.areaDataLayer, $newAreaLayer_pointDataLayers$$.areaDataLayer) && this.$_dataLayersToUpdate$.push({options:$newAreaLayer_pointDataLayers$$.areaDataLayer, parentLayer:$newAreaLayer_pointDataLayers$$.layer, isADL:!0});
      }
    } else {
      if (1 == $i$$370_numUpdates$$ && $newAreaLayer_pointDataLayers$$ && this.options.pointDataLayers && 0 < this.options.pointDataLayers.length) {
        for ($i$$370_numUpdates$$ = 0;$i$$370_numUpdates$$ < $newAreaLayer_pointDataLayers$$.length;$i$$370_numUpdates$$++) {
          $oj$$55$$.$Object$.$compareValues$(this.options.pointDataLayers[$i$$370_numUpdates$$], $newAreaLayer_pointDataLayers$$[$i$$370_numUpdates$$]) || this.$_dataLayersToUpdate$.push({options:$newAreaLayer_pointDataLayers$$[$i$$370_numUpdates$$], parentLayer:$newAreaLayer_pointDataLayers$$[$i$$370_numUpdates$$].id, isADL:!1});
        }
      }
    }
    this._super($options$$324$$, $flags$$48$$);
  }, $_Render$:function() {
    this.$_loadBasemap$();
    for (var $i$$371$$ = 0;$i$$371$$ < this.$_checkBasemaps$.length;$i$$371$$++) {
      if (!this.$_loadedBasemaps$[this.$_checkBasemaps$[$i$$371$$]]) {
        return;
      }
    }
    this.$_checkBasemaps$ = [];
    this.$_updateDataLayerSelection$();
    var $areaLayers_pointDataLayers$$1$$ = this.options.areaLayers;
    if ($areaLayers_pointDataLayers$$1$$) {
      for ($i$$371$$ = 0;$i$$371$$ < $areaLayers_pointDataLayers$$1$$.length;$i$$371$$++) {
        var $areaDataLayer$$1_pointDataLayer$$ = $areaLayers_pointDataLayers$$1$$[$i$$371$$].areaDataLayer;
        if ($areaDataLayer$$1_pointDataLayer$$) {
          var $dl_renderer$$2$$ = $areaDataLayer$$1_pointDataLayer$$._templateRenderer;
          $dl_renderer$$2$$ && ($areaDataLayer$$1_pointDataLayer$$.renderer = this.$_getTemplateRenderer$($dl_renderer$$2$$, $areaDataLayer$$1_pointDataLayer$$.markers));
        }
      }
    }
    if ($areaLayers_pointDataLayers$$1$$ = this.options.pointDataLayers) {
      for ($i$$371$$ = 0;$i$$371$$ < $areaLayers_pointDataLayers$$1$$.length;$i$$371$$++) {
        ($areaDataLayer$$1_pointDataLayer$$ = $areaLayers_pointDataLayers$$1$$[$i$$371$$]) && ($dl_renderer$$2$$ = $areaDataLayer$$1_pointDataLayer$$._templateRenderer) && ($areaDataLayer$$1_pointDataLayer$$.renderer = this.$_getTemplateRenderer$($dl_renderer$$2$$, $areaDataLayer$$1_pointDataLayer$$.markers));
      }
    }
    this.options._contextHandler = this.$_getContextHandler$();
    if (this.$_initiallyRendered$ && 0 < this.$_dataLayersToUpdate$.length) {
      if (this.$_context$.isReadyToRender()) {
        for ($i$$371$$ = 0;$i$$371$$ < this.$_dataLayersToUpdate$.length;$i$$371$$++) {
          $dl_renderer$$2$$ = this.$_dataLayersToUpdate$[$i$$371$$], this.$_component$.updateLayer($dl_renderer$$2$$.options, $dl_renderer$$2$$.parentLayer, $dl_renderer$$2$$.isADL);
        }
        this.$_dataLayersToUpdate$ = [];
      }
    } else {
      this._super(), this.$_initiallyRendered$ = !0;
    }
    this._trigger("load", null, null);
  }, $_getTemplateRenderer$:function($templateFunction$$) {
    var $thisRef$$ = this;
    return function($context$$155_elem$$76$$) {
      var $dummyDiv$$ = document.createElement("div");
      $dummyDiv$$.style.display = "none";
      $dummyDiv$$.$_dvtcontext$ = $thisRef$$.$_context$;
      $thisRef$$.element.append($dummyDiv$$);
      $templateFunction$$({parentElement:$dummyDiv$$, data:$context$$155_elem$$76$$.data});
      return($context$$155_elem$$76$$ = $dummyDiv$$.children[0]) ? "http://www.w3.org/2000/svg" === $context$$155_elem$$76$$.namespaceURI ? ($$$$50$$($dummyDiv$$).remove(), $context$$155_elem$$76$$) : $thisRef$$.$_GetDvtComponent$($context$$155_elem$$76$$) : null;
    };
  }, $_getContextHandler$:function() {
    var $thisRef$$1$$ = this;
    return function($parentElement$$8$$, $rootElement$$2$$, $data$$155$$, $state$$12$$, $previousState$$) {
      return{component:$oj$$55$$.Components.$getWidgetConstructor$($thisRef$$1$$.element), parentElement:$parentElement$$8$$, rootElement:$rootElement$$2$$, data:$data$$155$$, state:$state$$12$$, previousState:$previousState$$, id:$data$$155$$.id, label:$data$$155$$.label, color:$data$$155$$.color, location:$data$$155$$.location, x:$data$$155$$.x, y:$data$$155$$.y};
    };
  }, renderDefaultHover:function($context$$157$$) {
    $context$$157$$.previousState && $context$$157$$.state.hovered == $context$$157$$.previousState.hovered || this.$_component$.processDefaultHoverEffect($context$$157$$.id, $context$$157$$.state.hovered);
  }, renderDefaultSelection:function($context$$158$$) {
    $context$$158$$.previousState && $context$$158$$.state.selected == $context$$158$$.previousState.selected || this.$_component$.processDefaultSelectionEffect($context$$158$$.id, $context$$158$$.state.selected);
  }, renderDefaultFocus:function($context$$159$$) {
    $context$$159$$.previousState && $context$$159$$.state.focused == $context$$159$$.previousState.focused || this.$_component$.processDefaultFocusEffect($context$$159$$.id, $context$$159$$.state.focused);
  }, $_loadBasemap$:function() {
    var $basemap$$ = this.options.basemap;
    if ($basemap$$) {
      var $locale$$22$$ = $oj$$55$$.$Config$.$getLocale$();
      $locale$$22$$ !== this.$_currentLocale$ && (this.$_currentLocale$ = $locale$$22$$, this.$_loadedBasemaps$ = []);
      var $basemap$$ = $basemap$$.charAt(0).toUpperCase() + $basemap$$.slice(1), $areaLayers$$1_pointDataLayers$$2$$ = this.options.areaLayers;
      if ($areaLayers$$1_pointDataLayers$$2$$) {
        for (var $i$$372$$ = 0;$i$$372$$ < $areaLayers$$1_pointDataLayers$$2$$.length;$i$$372$$++) {
          var $layer$$21$$ = $areaLayers$$1_pointDataLayers$$2$$[$i$$372$$].layer;
          $layer$$21$$ && ($layer$$21$$ = $layer$$21$$.charAt(0).toUpperCase() + $layer$$21$$.slice(1), this.$_loadBasemapHelper$($basemap$$, $layer$$21$$, $locale$$22$$));
        }
      }
      ($areaLayers$$1_pointDataLayers$$2$$ = this.options.pointDataLayers) && 0 < $areaLayers$$1_pointDataLayers$$2$$.length && this.$_loadBasemapHelper$($basemap$$, "Cities", $locale$$22$$);
    }
  }, $_loadResourceByUrl$:function($url$$35$$) {
    if (!this.$_loadedBasemaps$[$url$$35$$]) {
      var $resolvedUrl$$ = $oj$$55$$.$Config$.$getResourceUrl$($url$$35$$), $thisRef$$2$$ = this, $loadedBundles$$ = this.$_loadedBasemaps$;
      $$$$50$$.getScript($resolvedUrl$$, function() {
        $loadedBundles$$[$url$$35$$] = !0;
        $thisRef$$2$$.$_Render$();
      });
    }
  }, $_loadBasemapHelper$:function($basemap$$1_bundleName_bundleUrl$$, $i$$373_layer$$22$$, $locale$$23_localeList$$) {
    var $relativeUrl_splitLocale$$ = "resources/internal-deps/dvt/thematicMap/basemaps/DvtBaseMap" + $basemap$$1_bundleName_bundleUrl$$ + $i$$373_layer$$22$$ + ".js";
    -1 == this.$_checkBasemaps$.indexOf($relativeUrl_splitLocale$$) && (this.$_checkBasemaps$.push($relativeUrl_splitLocale$$), this.$_loadResourceByUrl$($relativeUrl_splitLocale$$));
    if (-1 === $locale$$23_localeList$$.indexOf("en")) {
      for ($relativeUrl_splitLocale$$ = $locale$$23_localeList$$.toLowerCase().split("-"), $locale$$23_localeList$$ = [$relativeUrl_splitLocale$$[0]], 1 < $relativeUrl_splitLocale$$.length && $locale$$23_localeList$$.unshift($relativeUrl_splitLocale$$[0] + "-" + $relativeUrl_splitLocale$$[1]), 2 < $relativeUrl_splitLocale$$.length && $locale$$23_localeList$$.unshift($relativeUrl_splitLocale$$[0] + "-" + $relativeUrl_splitLocale$$[2], $relativeUrl_splitLocale$$[0] + "-" + $relativeUrl_splitLocale$$[1] + 
      "-" + $relativeUrl_splitLocale$$[2]), $basemap$$1_bundleName_bundleUrl$$ = "resources/internal-deps/dvt/thematicMap/resourceBundles/" + $basemap$$1_bundleName_bundleUrl$$ + $i$$373_layer$$22$$ + "Bundle", $i$$373_layer$$22$$ = 0;$i$$373_layer$$22$$ < $locale$$23_localeList$$.length;$i$$373_layer$$22$$++) {
        if (this.$_supportedLocales$[$locale$$23_localeList$$[$i$$373_layer$$22$$]]) {
          $basemap$$1_bundleName_bundleUrl$$ = $basemap$$1_bundleName_bundleUrl$$ + "_" + this.$_supportedLocales$[$locale$$23_localeList$$[$i$$373_layer$$22$$]] + ".js";
          -1 == this.$_checkBasemaps$.indexOf($basemap$$1_bundleName_bundleUrl$$) && (this.$_checkBasemaps$.push($basemap$$1_bundleName_bundleUrl$$), this.$_loadResourceByUrl$($basemap$$1_bundleName_bundleUrl$$));
          break;
        }
      }
    }
  }, $_HandleEvent$:function($event$$529$$) {
    var $selection$$15$$, $id$$53$$;
    if (($event$$529$$ && $event$$529$$.getType ? $event$$529$$.getType() : null) === $dvt$$10$$.DvtSelectionEvent.TYPE) {
      $selection$$15$$ = {};
      $id$$53$$ = $event$$529$$.getParamValue("clientId");
      $selection$$15$$[$id$$53$$] = $event$$529$$.getSelection();
      if (this.options.selection) {
        for (var $dataLayerId$$ in this.options.selection) {
          $id$$53$$ !== $dataLayerId$$ && ($selection$$15$$[$dataLayerId$$] = this.options.selection[$dataLayerId$$]);
        }
      }
      this.$_UserOptionChange$("selection", $selection$$15$$);
    } else {
      this._super($event$$529$$);
    }
  }, $_GetTranslationMap$:function() {
    var $translations$$20$$ = this.options.translations, $ret$$56$$ = this._super();
    $ret$$56$$["DvtUtilBundle.THEMATIC_MAP"] = $translations$$20$$.componentName;
    return $ret$$56$$;
  }, $_updateDataLayerSelection$:function() {
    var $selection$$16$$ = this.options.selection;
    if ($selection$$16$$) {
      var $als_pdls$$ = this.options.pointDataLayers;
      if ($als_pdls$$) {
        for (var $i$$374$$ = 0;$i$$374$$ < $als_pdls$$.length;$i$$374$$++) {
          $selection$$16$$[$als_pdls$$[$i$$374$$].id] && ($als_pdls$$[$i$$374$$].selection = $selection$$16$$[$als_pdls$$[$i$$374$$].id]);
        }
      }
      if ($als_pdls$$ = this.options.areaLayers) {
        for ($i$$374$$ = 0;$i$$374$$ < $als_pdls$$.length;$i$$374$$++) {
          var $adl$$ = $als_pdls$$[$i$$374$$].areaDataLayer;
          $adl$$ && $selection$$16$$[$adl$$.id] && ($adl$$.selection = $selection$$16$$[$adl$$.id]);
        }
      }
    }
  }, getArea:function($dataLayerId$$1$$, $index$$241$$) {
    var $ret$$57$$ = this.$_component$.getAutomation().getData($dataLayerId$$1$$, "area", $index$$241$$);
    this.$_AddAutomationGetters$($ret$$57$$);
    return $ret$$57$$;
  }, getMarker:function($dataLayerId$$2$$, $index$$242$$) {
    var $ret$$58$$ = this.$_component$.getAutomation().getData($dataLayerId$$2$$, "marker", $index$$242$$);
    this.$_AddAutomationGetters$($ret$$58$$);
    return $ret$$58$$;
  }, getContextByNode:function($context$$160_node$$109$$) {
    return($context$$160_node$$109$$ = this.getSubIdByNode($context$$160_node$$109$$)) && "oj-thematicmap-tooltip" !== $context$$160_node$$109$$.subId ? $context$$160_node$$109$$ : null;
  }, $_GetComponentDeferredDataPaths$:function() {
    return{areaLayers:["areaDataLayer/areas", "areaDataLayer/markers"], pointDataLayers:["markers"]};
  }, $_GetDataContext$:function($layer$$23_options$$325$$) {
    var $basemap$$2$$ = this.options.basemap;
    $layer$$23_options$$325$$ = $layer$$23_options$$325$$.layer ? $layer$$23_options$$325$$.layer : "cities";
    return{basemap:$basemap$$2$$, layer:$layer$$23_options$$325$$, ids:$dvt$$10$$.DvtBaseMapManager.getLayerIds($basemap$$2$$, $layer$$23_options$$325$$)};
  }});
});
