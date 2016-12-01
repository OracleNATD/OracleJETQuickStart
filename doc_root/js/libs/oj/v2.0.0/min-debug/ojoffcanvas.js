/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore", "jquery", "hammerjs", "promise", "ojs/ojjquery-hammer", "ojs/ojcomponentcore"], function($oj$$35$$, $$$$32$$, $Hammer$$5$$) {
  $oj$$35$$.$OffcanvasUtils$ = {};
  $goog$exportPath_$$("OffcanvasUtils", $oj$$35$$.$OffcanvasUtils$, $oj$$35$$);
  $oj$$35$$.$OffcanvasUtils$.$_DATA_EDGE_KEY$ = "oj-offcanvasEdge";
  $oj$$35$$.$OffcanvasUtils$.$_DATA_OFFCANVAS_KEY$ = "oj-offcanvas";
  $oj$$35$$.$OffcanvasUtils$.$_DATA_MEDIA_QUERY_KEY$ = "oj-mediaQueryListener";
  $oj$$35$$.$OffcanvasUtils$.$_DATA_HAMMER_KEY$ = "oj-offcanvasHammer";
  $oj$$35$$.$OffcanvasUtils$.$SELECTOR_KEY$ = "selector";
  $oj$$35$$.$OffcanvasUtils$.$EDGE_START$ = "start";
  $oj$$35$$.$OffcanvasUtils$.$EDGE_END$ = "end";
  $oj$$35$$.$OffcanvasUtils$.$EDGE_TOP$ = "top";
  $oj$$35$$.$OffcanvasUtils$.$EDGE_BOTTOM$ = "bottom";
  $oj$$35$$.$OffcanvasUtils$.$DISPLAY_MODE_KEY$ = "displayMode";
  $oj$$35$$.$OffcanvasUtils$.$DISPLAY_MODE_PUSH$ = "push";
  $oj$$35$$.$OffcanvasUtils$.$DISPLAY_MODE_OVERLAY$ = "overlay";
  $oj$$35$$.$OffcanvasUtils$.$MODALITY_KEY$ = "modality";
  $oj$$35$$.$OffcanvasUtils$.$MODALITY_NONE$ = "none";
  $oj$$35$$.$OffcanvasUtils$.$MODALITY_MODAL$ = "modal";
  $oj$$35$$.$OffcanvasUtils$.$DISMISS_HANDLER_KEY$ = "_dismissHandler";
  $oj$$35$$.$OffcanvasUtils$.$OPEN_PROMISE_KEY$ = "_openPromise";
  $oj$$35$$.$OffcanvasUtils$.$CLOSE_PROMISE_KEY$ = "_closePromise";
  $oj$$35$$.$OffcanvasUtils$.$GLASS_PANE_KEY$ = "_glassPane";
  $oj$$35$$.$OffcanvasUtils$.$SURROGATE_KEY$ = "_surrogate";
  $oj$$35$$.$OffcanvasUtils$.$SURROGATE_ATTR$ = "data-oj-surrogate-id";
  $oj$$35$$.$OffcanvasUtils$.$OUTER_WRAPPER_SELECTOR$ = "oj-offcanvas-outer-wrapper";
  $oj$$35$$.$OffcanvasUtils$.$OPEN_SELECTOR$ = "oj-offcanvas-open";
  $oj$$35$$.$OffcanvasUtils$.$TRANSITION_SELECTOR$ = "oj-offcanvas-transition";
  $oj$$35$$.$OffcanvasUtils$.$GLASSPANE_SELECTOR$ = "oj-offcanvas-glasspane";
  $oj$$35$$.$OffcanvasUtils$.$GLASSPANE_DIM_SELECTOR$ = "oj-offcanvas-glasspane-dim";
  $oj$$35$$.$OffcanvasUtils$.$WRAPPER_GENERATED_SELECTOR$ = "oj-offcanvas-generated";
  $oj$$35$$.$OffcanvasUtils$.$_shiftSelector$ = {start:"oj-offcanvas-shift-start", end:"oj-offcanvas-shift-end", top:"oj-offcanvas-shift-down", bottom:"oj-offcanvas-shift-up"};
  $oj$$35$$.$OffcanvasUtils$.$_drawerSelector$ = {start:"oj-offcanvas-start", end:"oj-offcanvas-end", top:"oj-offcanvas-top", bottom:"oj-offcanvas-bottom"};
  $oj$$35$$.$OffcanvasUtils$.$_getDisplayMode$ = function $$oj$$35$$$$OffcanvasUtils$$$_getDisplayMode$$($displayMode_offcanvas$$) {
    $displayMode_offcanvas$$ = $displayMode_offcanvas$$[$oj$$35$$.$OffcanvasUtils$.$DISPLAY_MODE_KEY$];
    $displayMode_offcanvas$$ !== $oj$$35$$.$OffcanvasUtils$.$DISPLAY_MODE_OVERLAY$ && $displayMode_offcanvas$$ !== $oj$$35$$.$OffcanvasUtils$.$DISPLAY_MODE_PUSH$ && ($displayMode_offcanvas$$ = $oj$$35$$.$ThemeUtils$.$getOptionDefaultMap$("offcanvas").displayMode);
    return $displayMode_offcanvas$$;
  };
  $oj$$35$$.$OffcanvasUtils$.$_getDrawer$ = function $$oj$$35$$$$OffcanvasUtils$$$_getDrawer$$($offcanvas$$1$$) {
    return $$$$32$$($offcanvas$$1$$[$oj$$35$$.$OffcanvasUtils$.$SELECTOR_KEY$]);
  };
  $oj$$35$$.$OffcanvasUtils$.$_isModal$ = function $$oj$$35$$$$OffcanvasUtils$$$_isModal$$($offcanvas$$2$$) {
    return $offcanvas$$2$$[$oj$$35$$.$OffcanvasUtils$.$MODALITY_KEY$] === $oj$$35$$.$OffcanvasUtils$.$MODALITY_MODAL$;
  };
  $oj$$35$$.$OffcanvasUtils$.$_isOpen$ = function $$oj$$35$$$$OffcanvasUtils$$$_isOpen$$($drawer$$) {
    return $drawer$$.hasClass($oj$$35$$.$OffcanvasUtils$.$OPEN_SELECTOR$);
  };
  $oj$$35$$.$OffcanvasUtils$.$_getOuterWrapper$ = function $$oj$$35$$$$OffcanvasUtils$$$_getOuterWrapper$$($drawer$$1$$) {
    return $drawer$$1$$.closest("." + $oj$$35$$.$OffcanvasUtils$.$OUTER_WRAPPER_SELECTOR$);
  };
  $oj$$35$$.$OffcanvasUtils$.$_getAnimateWrapper$ = function $$oj$$35$$$$OffcanvasUtils$$$_getAnimateWrapper$$($offcanvas$$3$$) {
    var $wrapper$$1$$ = $oj$$35$$.$OffcanvasUtils$.$_getDrawer$($offcanvas$$3$$);
    return $offcanvas$$3$$[$oj$$35$$.$OffcanvasUtils$.$DISPLAY_MODE_KEY$] === $oj$$35$$.$OffcanvasUtils$.$DISPLAY_MODE_PUSH$ ? $wrapper$$1$$.parent() : $wrapper$$1$$;
  };
  $oj$$35$$.$OffcanvasUtils$.$_getShiftSelector$ = function $$oj$$35$$$$OffcanvasUtils$$$_getShiftSelector$$($edge$$2$$) {
    var $selector$$31$$ = $oj$$35$$.$OffcanvasUtils$.$_shiftSelector$[$edge$$2$$];
    if (!$selector$$31$$) {
      throw "Invalid edge: " + $edge$$2$$;
    }
    return $selector$$31$$;
  };
  $oj$$35$$.$OffcanvasUtils$.$_isRTL$ = function $$oj$$35$$$$OffcanvasUtils$$$_isRTL$$() {
    return "rtl" === $oj$$35$$.$DomUtils$.$getReadingDirection$();
  };
  $oj$$35$$.$OffcanvasUtils$.$_setTransform$ = function $$oj$$35$$$$OffcanvasUtils$$$_setTransform$$($wrapper$$2$$, $transform$$) {
    $wrapper$$2$$.css({"-webkit-transform":$transform$$, "-ms-transform":$transform$$, transform:$transform$$});
  };
  $oj$$35$$.$OffcanvasUtils$.$_setTranslationX$ = function $$oj$$35$$$$OffcanvasUtils$$$_setTranslationX$$($wrapper$$3$$, $edge$$3_minus$$, $width$$28$$) {
    $edge$$3_minus$$ = $edge$$3_minus$$ === $oj$$35$$.$OffcanvasUtils$.$EDGE_END$;
    $oj$$35$$.$OffcanvasUtils$.$_isRTL$() && ($edge$$3_minus$$ = !$edge$$3_minus$$);
    $oj$$35$$.$OffcanvasUtils$.$_setTransform$($wrapper$$3$$, "translate3d(" + ($edge$$3_minus$$ ? "-" : "") + $width$$28$$ + ", 0, 0)");
  };
  $oj$$35$$.$OffcanvasUtils$.$_setTranslationY$ = function $$oj$$35$$$$OffcanvasUtils$$$_setTranslationY$$($wrapper$$4$$, $edge$$4$$, $height$$29$$) {
    $oj$$35$$.$OffcanvasUtils$.$_setTransform$($wrapper$$4$$, "translate3d(0, " + ($edge$$4$$ === $oj$$35$$.$OffcanvasUtils$.$EDGE_BOTTOM$ ? "-" : "") + $height$$29$$ + ", 0)");
  };
  $oj$$35$$.$OffcanvasUtils$.$_saveEdge$ = function $$oj$$35$$$$OffcanvasUtils$$$_saveEdge$$($drawer$$2_offcanvas$$4$$) {
    var $edge$$5$$ = $drawer$$2_offcanvas$$4$$.edge;
    $drawer$$2_offcanvas$$4$$ = $oj$$35$$.$OffcanvasUtils$.$_getDrawer$($drawer$$2_offcanvas$$4$$);
    $edge$$5$$ && $edge$$5$$.length || ($edge$$5$$ = $drawer$$2_offcanvas$$4$$.hasClass("oj-offcanvas-start") ? $oj$$35$$.$OffcanvasUtils$.$EDGE_START$ : $drawer$$2_offcanvas$$4$$.hasClass("oj-offcanvas-end") ? $oj$$35$$.$OffcanvasUtils$.$EDGE_END$ : $drawer$$2_offcanvas$$4$$.hasClass("oj-offcanvas-top") ? $oj$$35$$.$OffcanvasUtils$.$EDGE_TOP$ : $drawer$$2_offcanvas$$4$$.hasClass("oj-offcanvas-bottom") ? $oj$$35$$.$OffcanvasUtils$.$EDGE_BOTTOM$ : $oj$$35$$.$OffcanvasUtils$.$EDGE_START$);
    $$$$32$$.data($drawer$$2_offcanvas$$4$$[0], $oj$$35$$.$OffcanvasUtils$.$_DATA_EDGE_KEY$, $edge$$5$$);
    return $edge$$5$$;
  };
  $oj$$35$$.$OffcanvasUtils$.$_getEdge$ = function $$oj$$35$$$$OffcanvasUtils$$$_getEdge$$($drawer$$3$$) {
    return $$$$32$$.data($drawer$$3$$[0], $oj$$35$$.$OffcanvasUtils$.$_DATA_EDGE_KEY$);
  };
  $oj$$35$$.$OffcanvasUtils$.$_toggleClass$ = function $$oj$$35$$$$OffcanvasUtils$$$_toggleClass$$($offcanvas$$5$$, $wrapper$$5$$, $isOpen$$1_oTabIndex$$) {
    var $displayMode$$1_wrapperClass$$ = $offcanvas$$5$$[$oj$$35$$.$OffcanvasUtils$.$DISPLAY_MODE_KEY$], $drawer$$4$$ = $oj$$35$$.$OffcanvasUtils$.$_getDrawer$($offcanvas$$5$$), $drawerClass$$ = $oj$$35$$.$OffcanvasUtils$.$OPEN_SELECTOR$, $displayMode$$1_wrapperClass$$ = $displayMode$$1_wrapperClass$$ === $oj$$35$$.$OffcanvasUtils$.$DISPLAY_MODE_OVERLAY$ ? $oj$$35$$.$OffcanvasUtils$.$TRANSITION_SELECTOR$ + " oj-offcanvas-overlay" : $oj$$35$$.$OffcanvasUtils$.$TRANSITION_SELECTOR$;
    $isOpen$$1_oTabIndex$$ ? ($isOpen$$1_oTabIndex$$ = $drawer$$4$$.attr("tabIndex"), void 0 !== $isOpen$$1_oTabIndex$$ && ($offcanvas$$5$$.tabIndex = $isOpen$$1_oTabIndex$$), $drawer$$4$$.addClass($drawerClass$$).attr("tabIndex", "-1"), $wrapper$$5$$.addClass($displayMode$$1_wrapperClass$$)) : ($isOpen$$1_oTabIndex$$ = $offcanvas$$5$$.tabIndex, void 0 === $isOpen$$1_oTabIndex$$ ? $drawer$$4$$.removeAttr("tabIndex") : $drawer$$4$$.attr("tabIndex", $isOpen$$1_oTabIndex$$), $drawer$$4$$.removeClass($drawerClass$$), 
    $wrapper$$5$$.removeClass($displayMode$$1_wrapperClass$$));
  };
  $oj$$35$$.$OffcanvasUtils$.$_isAutoDismiss$ = function $$oj$$35$$$$OffcanvasUtils$$$_isAutoDismiss$$($offcanvas$$6$$) {
    return "none" != $offcanvas$$6$$.autoDismiss;
  };
  $oj$$35$$.$OffcanvasUtils$.$_onTransitionEnd$ = function $$oj$$35$$$$OffcanvasUtils$$$_onTransitionEnd$$($wrapper$$6$$, $handler$$51$$) {
    function $listener$$38$$() {
      $handler$$51$$();
      $wrapper$$6$$.off("transitionend webkitTransitionEnd otransitionend oTransitionEnd", $listener$$38$$);
    }
    $wrapper$$6$$.on("transitionend webkitTransitionEnd otransitionend oTransitionEnd", $listener$$38$$);
  };
  $oj$$35$$.$OffcanvasUtils$.$_registerCloseHandler$ = function $$oj$$35$$$$OffcanvasUtils$$$_registerCloseHandler$$($offcanvas$$7$$) {
    $oj$$35$$.$OffcanvasUtils$.$_unregisterCloseHandler$($offcanvas$$7$$);
    if ($oj$$35$$.$OffcanvasUtils$.$_isAutoDismiss$($offcanvas$$7$$)) {
      var $drawer$$5$$ = $oj$$35$$.$OffcanvasUtils$.$_getDrawer$($offcanvas$$7$$), $dismisHandler$$ = $offcanvas$$7$$[$oj$$35$$.$OffcanvasUtils$.$DISMISS_HANDLER_KEY$] = function $$offcanvas$$7$$$$oj$$35$$$$OffcanvasUtils$$$DISMISS_HANDLER_KEY$$($event$$416$$) {
        var $target$$92$$ = $event$$416$$.target;
        $oj$$35$$.$DomUtils$.$isChromeEvent$($event$$416$$) || "focus" === $event$$416$$.type && !$$$$32$$($target$$92$$).is(":focusable") || (null == $$$$32$$.data($drawer$$5$$[0], $oj$$35$$.$OffcanvasUtils$.$_DATA_OFFCANVAS_KEY$) ? $oj$$35$$.$OffcanvasUtils$.$_unregisterCloseHandler$($offcanvas$$7$$) : $oj$$35$$.$DomUtils$.$isLogicalAncestorOrSelf$($drawer$$5$$[0], $target$$92$$) || $oj$$35$$.$OffcanvasUtils$.close($offcanvas$$7$$));
      }, $documentElement$$1$$ = document.documentElement;
      $oj$$35$$.$DomUtils$.$isTouchSupported$() && $documentElement$$1$$.addEventListener("touchstart", $dismisHandler$$, !0);
      $documentElement$$1$$.addEventListener("mousedown", $dismisHandler$$, !0);
      $documentElement$$1$$.addEventListener("focus", $dismisHandler$$, !0);
    }
    $oj$$35$$.$OffcanvasUtils$.$_registerSwipeHandler$($offcanvas$$7$$);
  };
  $oj$$35$$.$OffcanvasUtils$.$_unregisterCloseHandler$ = function $$oj$$35$$$$OffcanvasUtils$$$_unregisterCloseHandler$$($offcanvas$$8$$) {
    var $dismisHandler$$1$$ = $offcanvas$$8$$[$oj$$35$$.$OffcanvasUtils$.$DISMISS_HANDLER_KEY$];
    if ($dismisHandler$$1$$) {
      var $documentElement$$2$$ = document.documentElement;
      $oj$$35$$.$DomUtils$.$isTouchSupported$() && $documentElement$$2$$.removeEventListener("touchstart", $dismisHandler$$1$$, !0);
      $documentElement$$2$$.removeEventListener("mousedown", $dismisHandler$$1$$, !0);
      $documentElement$$2$$.removeEventListener("focus", $dismisHandler$$1$$, !0);
      delete $offcanvas$$8$$[$oj$$35$$.$OffcanvasUtils$.$DISMISS_HANDLER_KEY$];
      $offcanvas$$8$$[$oj$$35$$.$OffcanvasUtils$.$DISMISS_HANDLER_KEY$] = null;
    }
    $oj$$35$$.$OffcanvasUtils$.$_unregisterSwipeHandler$($offcanvas$$8$$);
  };
  $oj$$35$$.$OffcanvasUtils$.$_registerSwipeHandler$ = function $$oj$$35$$$$OffcanvasUtils$$$_registerSwipeHandler$$($offcanvas$$9$$) {
    if ($oj$$35$$.$DomUtils$.$isTouchSupported$()) {
      var $selector$$32$$ = $offcanvas$$9$$[$oj$$35$$.$OffcanvasUtils$.$SELECTOR_KEY$], $drawer$$6_drawerHammer$$ = $$$$32$$($selector$$32$$), $edge$$6$$ = $oj$$35$$.$OffcanvasUtils$.$_getEdge$($drawer$$6_drawerHammer$$), $swipeEvent$$, $options$$307$$;
      $edge$$6$$ === $oj$$35$$.$OffcanvasUtils$.$EDGE_START$ && !$oj$$35$$.$OffcanvasUtils$.$_isRTL$() || $edge$$6$$ === $oj$$35$$.$OffcanvasUtils$.$EDGE_END$ && $oj$$35$$.$OffcanvasUtils$.$_isRTL$() ? ($options$$307$$ = {recognizers:[[$Hammer$$5$$.Swipe, {direction:$Hammer$$5$$.DIRECTION_LEFT}]]}, $swipeEvent$$ = "swipeleft") : $edge$$6$$ === $oj$$35$$.$OffcanvasUtils$.$EDGE_START$ && $oj$$35$$.$OffcanvasUtils$.$_isRTL$() || $edge$$6$$ === $oj$$35$$.$OffcanvasUtils$.$EDGE_END$ && !$oj$$35$$.$OffcanvasUtils$.$_isRTL$() ? 
      ($options$$307$$ = {recognizers:[[$Hammer$$5$$.Swipe, {direction:$Hammer$$5$$.DIRECTION_RIGHT}]]}, $swipeEvent$$ = "swiperight") : $edge$$6$$ === $oj$$35$$.$OffcanvasUtils$.$EDGE_TOP$ ? ($options$$307$$ = {recognizers:[[$Hammer$$5$$.Swipe, {direction:$Hammer$$5$$.DIRECTION_UP}]]}, $swipeEvent$$ = "swipeup") : $edge$$6$$ === $oj$$35$$.$OffcanvasUtils$.$EDGE_BOTTOM$ && ($options$$307$$ = {recognizers:[[$Hammer$$5$$.Swipe, {direction:$Hammer$$5$$.DIRECTION_DOWN}]]}, $swipeEvent$$ = "swipedown");
      $drawer$$6_drawerHammer$$ = $drawer$$6_drawerHammer$$.$ojHammer$($options$$307$$).on($swipeEvent$$, function($event$$417$$) {
        $event$$417$$.preventDefault();
        $oj$$35$$.$OffcanvasUtils$.close($offcanvas$$9$$);
      });
      $$$$32$$.data($$$$32$$($selector$$32$$)[0], $oj$$35$$.$OffcanvasUtils$.$_DATA_HAMMER_KEY$, {event:$swipeEvent$$, hammer:$drawer$$6_drawerHammer$$});
    }
  };
  $oj$$35$$.$OffcanvasUtils$.$_unregisterSwipeHandler$ = function $$oj$$35$$$$OffcanvasUtils$$$_unregisterSwipeHandler$$($dHammer_drawer$$7_offcanvas$$10$$) {
    $dHammer_drawer$$7_offcanvas$$10$$ = $oj$$35$$.$OffcanvasUtils$.$_getDrawer$($dHammer_drawer$$7_offcanvas$$10$$);
    0 < $dHammer_drawer$$7_offcanvas$$10$$.length && ($dHammer_drawer$$7_offcanvas$$10$$ = $$$$32$$.data($dHammer_drawer$$7_offcanvas$$10$$[0], $oj$$35$$.$OffcanvasUtils$.$_DATA_HAMMER_KEY$)) && $dHammer_drawer$$7_offcanvas$$10$$.hammer.off($dHammer_drawer$$7_offcanvas$$10$$.event);
  };
  $oj$$35$$.$OffcanvasUtils$.$_afterCloseHandler$ = function $$oj$$35$$$$OffcanvasUtils$$$_afterCloseHandler$$($offcanvas$$11$$) {
    var $drawer$$8$$ = $oj$$35$$.$OffcanvasUtils$.$_getDrawer$($offcanvas$$11$$);
    if ($$$$32$$.data($drawer$$8$$[0], $oj$$35$$.$OffcanvasUtils$.$_DATA_OFFCANVAS_KEY$) === $offcanvas$$11$$) {
      $oj$$35$$.$OffcanvasUtils$.$_getEdge$($drawer$$8$$);
      var $wrapper$$7$$ = $oj$$35$$.$OffcanvasUtils$.$_getAnimateWrapper$($offcanvas$$11$$);
      $oj$$35$$.$OffcanvasUtils$.$_toggleClass$($offcanvas$$11$$, $wrapper$$7$$, !1);
      $oj$$35$$.$OffcanvasUtils$.$_removeModality$($offcanvas$$11$$);
      $oj$$35$$.$OffcanvasUtils$.$_unregisterCloseHandler$($offcanvas$$11$$);
      $drawer$$8$$.trigger("ojclose", $offcanvas$$11$$);
      $$$$32$$.removeData($drawer$$8$$[0], $oj$$35$$.$OffcanvasUtils$.$_DATA_OFFCANVAS_KEY$);
    }
  };
  $oj$$35$$.$OffcanvasUtils$.$_setVisible$ = function $$oj$$35$$$$OffcanvasUtils$$$_setVisible$$($selector$$33$$, $visible$$1$$, $edge$$8$$) {
    var $drawer$$9$$ = $$$$32$$($selector$$33$$);
    ($visible$$1$$ = !!$visible$$1$$) && $oj$$35$$.$OffcanvasUtils$.$_isOpen$($drawer$$9$$) && $oj$$35$$.$OffcanvasUtils$.$_close$($selector$$33$$, !1);
    $drawer$$9$$.toggleClass($oj$$35$$.$OffcanvasUtils$.$_drawerSelector$[$edge$$8$$], !$visible$$1$$);
  };
  $oj$$35$$.$OffcanvasUtils$.$setupResponsive$ = function $$oj$$35$$$$OffcanvasUtils$$$setupResponsive$$($mqListener_offcanvas$$12$$) {
    var $mqs_query$$11$$ = $mqListener_offcanvas$$12$$.query;
    if (null !== $mqs_query$$11$$) {
      var $selector$$34$$ = $mqListener_offcanvas$$12$$[$oj$$35$$.$OffcanvasUtils$.$SELECTOR_KEY$], $mqs_query$$11$$ = window.matchMedia($mqs_query$$11$$), $edge$$9$$ = $oj$$35$$.$OffcanvasUtils$.$_saveEdge$($mqListener_offcanvas$$12$$);
      $mqListener_offcanvas$$12$$ = function $$mqListener_offcanvas$$12$$$($event$$418$$) {
        $oj$$35$$.$OffcanvasUtils$.$_setVisible$($selector$$34$$, $event$$418$$.matches, $edge$$9$$);
      };
      $mqs_query$$11$$.addListener($mqListener_offcanvas$$12$$);
      $oj$$35$$.$OffcanvasUtils$.$_setVisible$($selector$$34$$, $mqs_query$$11$$.matches, $edge$$9$$);
      $$$$32$$.data($$$$32$$($selector$$34$$)[0], $oj$$35$$.$OffcanvasUtils$.$_DATA_MEDIA_QUERY_KEY$, {mqList:$mqs_query$$11$$, mqListener:$mqListener_offcanvas$$12$$});
    }
  };
  $goog$exportPath_$$("OffcanvasUtils.setupResponsive", $oj$$35$$.$OffcanvasUtils$.$setupResponsive$, $oj$$35$$);
  $oj$$35$$.$OffcanvasUtils$.$tearDownResponsive$ = function $$oj$$35$$$$OffcanvasUtils$$$tearDownResponsive$$($drawer$$10_offcanvas$$13$$) {
    $drawer$$10_offcanvas$$13$$ = $oj$$35$$.$OffcanvasUtils$.$_getDrawer$($drawer$$10_offcanvas$$13$$);
    var $mql$$ = $$$$32$$.data($drawer$$10_offcanvas$$13$$[0], $oj$$35$$.$OffcanvasUtils$.$_DATA_MEDIA_QUERY_KEY$);
    $mql$$ && ($mql$$.mqList.removeListener($mql$$.mqListener), $$$$32$$.removeData($drawer$$10_offcanvas$$13$$[0], $oj$$35$$.$OffcanvasUtils$.$_DATA_MEDIA_QUERY_KEY$));
  };
  $goog$exportPath_$$("OffcanvasUtils.tearDownResponsive", $oj$$35$$.$OffcanvasUtils$.$tearDownResponsive$, $oj$$35$$);
  $oj$$35$$.$OffcanvasUtils$.open = function $$oj$$35$$$$OffcanvasUtils$$open$($offcanvas$$14$$) {
    var $drawer$$11$$ = $oj$$35$$.$OffcanvasUtils$.$_getDrawer$($offcanvas$$14$$), $oldOffcanvas_promise$$7$$ = $$$$32$$.data($drawer$$11$$[0], $oj$$35$$.$OffcanvasUtils$.$_DATA_OFFCANVAS_KEY$);
    if ($oldOffcanvas_promise$$7$$) {
      if ($oldOffcanvas_promise$$7$$[$oj$$35$$.$OffcanvasUtils$.$CLOSE_PROMISE_KEY$]) {
        return $oldOffcanvas_promise$$7$$[$oj$$35$$.$OffcanvasUtils$.$CLOSE_PROMISE_KEY$];
      }
      if ($oldOffcanvas_promise$$7$$[$oj$$35$$.$OffcanvasUtils$.$OPEN_PROMISE_KEY$]) {
        return $oldOffcanvas_promise$$7$$[$oj$$35$$.$OffcanvasUtils$.$OPEN_PROMISE_KEY$];
      }
    }
    var $oldOffcanvas_promise$$7$$ = new Promise(function($resolve$$39$$, $reject$$36$$) {
      $oj$$35$$.$Assert$.$assertPrototype$($drawer$$11$$, jQuery);
      var $edge$$10$$ = $oj$$35$$.$OffcanvasUtils$.$_saveEdge$($offcanvas$$14$$), $displayMode$$2_event$$419$$ = $$$$32$$.Event("ojbeforeopen");
      $drawer$$11$$.trigger($displayMode$$2_event$$419$$, $offcanvas$$14$$);
      if (!1 === $displayMode$$2_event$$419$$.result) {
        $reject$$36$$("ojbeforeopen veto");
      } else {
        var $size$$24$$, $displayMode$$2_event$$419$$ = $oj$$35$$.$OffcanvasUtils$.$_getDisplayMode$($offcanvas$$14$$), $myOffcanvas$$ = $$$$32$$.extend({}, $offcanvas$$14$$);
        $myOffcanvas$$[$oj$$35$$.$OffcanvasUtils$.$DISPLAY_MODE_KEY$] = $displayMode$$2_event$$419$$;
        $$$$32$$.data($drawer$$11$$[0], $oj$$35$$.$OffcanvasUtils$.$_DATA_OFFCANVAS_KEY$, $myOffcanvas$$);
        var $wrapper$$8$$;
        $wrapper$$8$$ = $oj$$35$$.$OffcanvasUtils$.$_getAnimateWrapper$($myOffcanvas$$);
        $oj$$35$$.$Assert$.$assertPrototype$($wrapper$$8$$, jQuery);
        $oj$$35$$.$OffcanvasUtils$.$_toggleClass$($myOffcanvas$$, $wrapper$$8$$, !0);
        $edge$$10$$ === $oj$$35$$.$OffcanvasUtils$.$EDGE_START$ || $edge$$10$$ === $oj$$35$$.$OffcanvasUtils$.$EDGE_END$ ? ($size$$24$$ = void 0 === $size$$24$$ ? $drawer$$11$$.outerWidth(!0) + "px" : $size$$24$$, $displayMode$$2_event$$419$$ === $oj$$35$$.$OffcanvasUtils$.$DISPLAY_MODE_PUSH$ && $oj$$35$$.$OffcanvasUtils$.$_setTranslationX$($wrapper$$8$$, $edge$$10$$, $size$$24$$)) : ($size$$24$$ = void 0 === $size$$24$$ ? $drawer$$11$$.outerHeight(!0) + "px" : $size$$24$$, $displayMode$$2_event$$419$$ === 
        $oj$$35$$.$OffcanvasUtils$.$DISPLAY_MODE_PUSH$ && $oj$$35$$.$OffcanvasUtils$.$_setTranslationY$($wrapper$$8$$, $edge$$10$$, $size$$24$$));
        var $outerWrapper$$;
        window.setTimeout(function() {
          $outerWrapper$$ = $oj$$35$$.$OffcanvasUtils$.$_getOuterWrapper$($drawer$$11$$);
          $oj$$35$$.$Assert$.$assertPrototype$($outerWrapper$$, jQuery);
          $outerWrapper$$.addClass($oj$$35$$.$OffcanvasUtils$.$_getShiftSelector$($edge$$10$$));
        }, 10);
        $oj$$35$$.$OffcanvasUtils$.$_applyModality$($myOffcanvas$$, $drawer$$11$$);
        $oj$$35$$.$OffcanvasUtils$.$_onTransitionEnd$($wrapper$$8$$, function() {
          $wrapper$$8$$.removeClass($oj$$35$$.$OffcanvasUtils$.$TRANSITION_SELECTOR$);
          $oj$$35$$.$FocusUtils$.$focusElement$($drawer$$11$$[0]);
          $drawer$$11$$.trigger("ojopen", $myOffcanvas$$);
          $oj$$35$$.$OffcanvasUtils$.$_registerCloseHandler$($myOffcanvas$$);
          $resolve$$39$$(!0);
        });
      }
    }), $nOffcanvas$$ = $$$$32$$.data($drawer$$11$$[0], $oj$$35$$.$OffcanvasUtils$.$_DATA_OFFCANVAS_KEY$);
    $nOffcanvas$$ && ($nOffcanvas$$[$oj$$35$$.$OffcanvasUtils$.$OPEN_PROMISE_KEY$] = $oldOffcanvas_promise$$7$$);
    return $oldOffcanvas_promise$$7$$;
  };
  $goog$exportPath_$$("OffcanvasUtils.open", $oj$$35$$.$OffcanvasUtils$.open, $oj$$35$$);
  $oj$$35$$.$OffcanvasUtils$.close = function $$oj$$35$$$$OffcanvasUtils$$close$($offcanvas$$15$$) {
    return $oj$$35$$.$OffcanvasUtils$.$_close$($offcanvas$$15$$[$oj$$35$$.$OffcanvasUtils$.$SELECTOR_KEY$], !0);
  };
  $goog$exportPath_$$("OffcanvasUtils.close", $oj$$35$$.$OffcanvasUtils$.close, $oj$$35$$);
  $oj$$35$$.$OffcanvasUtils$.$_close$ = function $$oj$$35$$$$OffcanvasUtils$$$_close$$($selector$$35$$, $animation$$2$$) {
    var $drawer$$12$$ = $$$$32$$($selector$$35$$);
    $oj$$35$$.$Assert$.$assertPrototype$($drawer$$12$$, jQuery);
    var $offcanvas$$16$$ = $$$$32$$.data($drawer$$12$$[0], $oj$$35$$.$OffcanvasUtils$.$_DATA_OFFCANVAS_KEY$);
    if ($offcanvas$$16$$ && $offcanvas$$16$$[$oj$$35$$.$OffcanvasUtils$.$CLOSE_PROMISE_KEY$]) {
      return $offcanvas$$16$$[$oj$$35$$.$OffcanvasUtils$.$CLOSE_PROMISE_KEY$];
    }
    var $promise$$8$$ = new Promise(function($resolve$$40$$, $reject$$37$$) {
      if ($oj$$35$$.$OffcanvasUtils$.$_isOpen$($drawer$$12$$)) {
        $selector$$35$$ != $offcanvas$$16$$[$oj$$35$$.$OffcanvasUtils$.$SELECTOR_KEY$] && $resolve$$40$$(!0);
        var $edge$$11_shiftSelector$$ = $oj$$35$$.$OffcanvasUtils$.$_getEdge$($drawer$$12$$), $displayMode$$3$$ = $offcanvas$$16$$[$oj$$35$$.$OffcanvasUtils$.$DISPLAY_MODE_KEY$], $edge$$11_shiftSelector$$ = $oj$$35$$.$OffcanvasUtils$.$_getShiftSelector$($edge$$11_shiftSelector$$), $outerWrapper$$1$$ = $oj$$35$$.$OffcanvasUtils$.$_getOuterWrapper$($drawer$$12$$);
        $oj$$35$$.$Assert$.$assertPrototype$($outerWrapper$$1$$, jQuery);
        $outerWrapper$$1$$.hasClass($edge$$11_shiftSelector$$) || $resolve$$40$$(!0);
        var $event$$420_wrapper$$9$$ = $$$$32$$.Event("ojbeforeclose");
        $drawer$$12$$.trigger($event$$420_wrapper$$9$$, $offcanvas$$16$$);
        if (!1 === $event$$420_wrapper$$9$$.result) {
          $reject$$37$$("beforeClose veto");
        } else {
          $event$$420_wrapper$$9$$ = $oj$$35$$.$OffcanvasUtils$.$_getAnimateWrapper$($offcanvas$$16$$);
          if ($animation$$2$$) {
            var $rafId$$ = 0, $endHandler$$1$$ = function $$endHandler$$1$$$() {
              $oj$$35$$.$OffcanvasUtils$.$_afterCloseHandler$($offcanvas$$16$$);
              0 !== $rafId$$ && window.cancelAnimationFrame($rafId$$);
              $resolve$$40$$(!0);
            }, $checkDetachedHandler$$ = function $$checkDetachedHandler$$$() {
              null == $drawer$$12$$[0].offsetParent ? $endHandler$$1$$() : $rafId$$ = window.requestAnimationFrame($checkDetachedHandler$$);
            };
            $oj$$35$$.$OffcanvasUtils$.$_onTransitionEnd$($event$$420_wrapper$$9$$, $endHandler$$1$$);
            $rafId$$ = window.requestAnimationFrame($checkDetachedHandler$$);
          }
          $displayMode$$3$$ === $oj$$35$$.$OffcanvasUtils$.$DISPLAY_MODE_PUSH$ && $oj$$35$$.$OffcanvasUtils$.$_setTransform$($event$$420_wrapper$$9$$, "");
          $outerWrapper$$1$$.removeClass($edge$$11_shiftSelector$$);
          $oj$$35$$.$OffcanvasUtils$.$_isModal$($offcanvas$$16$$) && $offcanvas$$16$$[$oj$$35$$.$OffcanvasUtils$.$GLASS_PANE_KEY$].removeClass($oj$$35$$.$OffcanvasUtils$.$GLASSPANE_DIM_SELECTOR$);
          $animation$$2$$ ? $event$$420_wrapper$$9$$.addClass($oj$$35$$.$OffcanvasUtils$.$TRANSITION_SELECTOR$) : ($oj$$35$$.$OffcanvasUtils$.$_afterCloseHandler$($offcanvas$$16$$), $resolve$$40$$(!0));
        }
      } else {
        $resolve$$40$$(!0);
      }
    });
    ($offcanvas$$16$$ = $$$$32$$.data($drawer$$12$$[0], $oj$$35$$.$OffcanvasUtils$.$_DATA_OFFCANVAS_KEY$)) && ($offcanvas$$16$$[$oj$$35$$.$OffcanvasUtils$.$CLOSE_PROMISE_KEY$] = $promise$$8$$);
    return $promise$$8$$;
  };
  $oj$$35$$.$OffcanvasUtils$.toggle = function $$oj$$35$$$$OffcanvasUtils$$toggle$($offcanvas$$17$$) {
    var $drawer$$13$$ = $oj$$35$$.$OffcanvasUtils$.$_getDrawer$($offcanvas$$17$$);
    $oj$$35$$.$Assert$.$assertPrototype$($drawer$$13$$, jQuery);
    return $oj$$35$$.$OffcanvasUtils$.$_isOpen$($drawer$$13$$) ? $oj$$35$$.$OffcanvasUtils$.close($offcanvas$$17$$) : $oj$$35$$.$OffcanvasUtils$.open($offcanvas$$17$$);
  };
  $goog$exportPath_$$("OffcanvasUtils.toggle", $oj$$35$$.$OffcanvasUtils$.toggle, $oj$$35$$);
  $oj$$35$$.$OffcanvasUtils$.$_addGlassPane$ = function $$oj$$35$$$$OffcanvasUtils$$$_addGlassPane$$($drawer$$14$$) {
    var $overlay$$2$$ = $$$$32$$("\x3cdiv\x3e");
    $overlay$$2$$.addClass($oj$$35$$.$OffcanvasUtils$.$GLASSPANE_SELECTOR$);
    $overlay$$2$$.attr("role", "presentation");
    $overlay$$2$$.attr("aria-hidden", "true");
    $overlay$$2$$.appendTo($drawer$$14$$.parent());
    $overlay$$2$$.on("keydown keyup keypress mousedown mouseup mouseover mouseout click focusin focus", function($event$$421$$) {
      $event$$421$$.stopPropagation();
      $event$$421$$.preventDefault();
    });
    return $overlay$$2$$;
  };
  $oj$$35$$.$OffcanvasUtils$.$_createSurrogate$ = function $$oj$$35$$$$OffcanvasUtils$$$_createSurrogate$$($layer$$20$$) {
    var $surrogate$$4$$ = $$$$32$$("\x3cscript\x3e"), $layerId$$2_surrogateId$$3$$ = $layer$$20$$.attr("id");
    $layerId$$2_surrogateId$$3$$ ? ($layerId$$2_surrogateId$$3$$ = [$layerId$$2_surrogateId$$3$$, "surrogate"].join("_"), $surrogate$$4$$.attr("id", $layerId$$2_surrogateId$$3$$)) : $layerId$$2_surrogateId$$3$$ = $surrogate$$4$$.uniqueId();
    $surrogate$$4$$.insertBefore($layer$$20$$);
    $layer$$20$$.attr($oj$$35$$.$OffcanvasUtils$.$SURROGATE_ATTR$, $layerId$$2_surrogateId$$3$$);
    return $surrogate$$4$$;
  };
  $oj$$35$$.$OffcanvasUtils$.$_swapOrder$ = function $$oj$$35$$$$OffcanvasUtils$$$_swapOrder$$($offcanvas$$18$$, $drawer$$15$$) {
    $offcanvas$$18$$[$oj$$35$$.$OffcanvasUtils$.$SURROGATE_KEY$] = $oj$$35$$.$OffcanvasUtils$.$_createSurrogate$($drawer$$15$$);
    $drawer$$15$$.appendTo($drawer$$15$$.parent());
  };
  $oj$$35$$.$OffcanvasUtils$.$_restoreOrder$ = function $$oj$$35$$$$OffcanvasUtils$$$_restoreOrder$$($offcanvas$$19_surrogate$$5$$) {
    var $drawer$$16$$ = $oj$$35$$.$OffcanvasUtils$.$_getDrawer$($offcanvas$$19_surrogate$$5$$);
    $offcanvas$$19_surrogate$$5$$ = $offcanvas$$19_surrogate$$5$$[$oj$$35$$.$OffcanvasUtils$.$SURROGATE_KEY$];
    $drawer$$16$$ && $offcanvas$$19_surrogate$$5$$ && $drawer$$16$$.attr($oj$$35$$.$OffcanvasUtils$.$SURROGATE_ATTR$) === $offcanvas$$19_surrogate$$5$$.attr("id") && ($drawer$$16$$.insertAfter($offcanvas$$19_surrogate$$5$$), $drawer$$16$$.removeAttr($oj$$35$$.$OffcanvasUtils$.$SURROGATE_ATTR$), $offcanvas$$19_surrogate$$5$$.remove());
  };
  $oj$$35$$.$OffcanvasUtils$.$_applyModality$ = function $$oj$$35$$$$OffcanvasUtils$$$_applyModality$$($offcanvas$$20$$, $drawer$$17$$) {
    $oj$$35$$.$OffcanvasUtils$.$_isModal$($offcanvas$$20$$) && ($offcanvas$$20$$[$oj$$35$$.$OffcanvasUtils$.$GLASS_PANE_KEY$] = $oj$$35$$.$OffcanvasUtils$.$_addGlassPane$($drawer$$17$$), $oj$$35$$.$OffcanvasUtils$.$_swapOrder$($offcanvas$$20$$, $drawer$$17$$), window.setTimeout(function() {
      $offcanvas$$20$$[$oj$$35$$.$OffcanvasUtils$.$GLASS_PANE_KEY$].addClass($oj$$35$$.$OffcanvasUtils$.$GLASSPANE_DIM_SELECTOR$);
    }, 0));
  };
  $oj$$35$$.$OffcanvasUtils$.$_removeModality$ = function $$oj$$35$$$$OffcanvasUtils$$$_removeModality$$($offcanvas$$21$$) {
    $oj$$35$$.$OffcanvasUtils$.$_isModal$($offcanvas$$21$$) && ($offcanvas$$21$$[$oj$$35$$.$OffcanvasUtils$.$GLASS_PANE_KEY$].remove(), $oj$$35$$.$OffcanvasUtils$.$_restoreOrder$($offcanvas$$21$$));
  };
  $oj$$35$$.$OffcanvasUtils$.$setupPanToReveal$ = function $$oj$$35$$$$OffcanvasUtils$$$setupPanToReveal$$($offcanvas$$22$$) {
    var $drawer$$19$$, $size$$25$$, $outerWrapper$$2$$, $wrapper$$10$$, $mOptions$$, $proceed$$, $direction$$7$$, $ui$$21$$, $evt$$26$$, $delta$$6$$, $edge$$12$$, $listener$$39$$;
    null == $$$$32$$($offcanvas$$22$$).attr("oj-data-pansetup") && ($$$$32$$($offcanvas$$22$$).attr("oj-data-pansetup", "true"), $offcanvas$$22$$.displayMode = "push", $drawer$$19$$ = $oj$$35$$.$OffcanvasUtils$.$_getDrawer$($offcanvas$$22$$), $size$$25$$ = $offcanvas$$22$$.size, null == $size$$25$$ && ($size$$25$$ = $drawer$$19$$.outerWidth()), $outerWrapper$$2$$ = $oj$$35$$.$OffcanvasUtils$.$_getOuterWrapper$($drawer$$19$$), $wrapper$$10$$ = $oj$$35$$.$OffcanvasUtils$.$_getAnimateWrapper$($offcanvas$$22$$), 
    $mOptions$$ = {recognizers:[[$Hammer$$5$$.Pan, {direction:$Hammer$$5$$.DIRECTION_HORIZONTAL}]]}, $proceed$$ = !1, $$$$32$$($outerWrapper$$2$$).$ojHammer$($mOptions$$).on("panstart", function($event$$422$$) {
      $direction$$7$$ = null;
      switch($event$$422$$.gesture.direction) {
        case $Hammer$$5$$.DIRECTION_LEFT:
          Math.abs($event$$422$$.gesture.deltaY) < Math.abs($event$$422$$.gesture.deltaX) && ($direction$$7$$ = $oj$$35$$.$OffcanvasUtils$.$_isRTL$() ? "end" : "start");
          break;
        case $Hammer$$5$$.DIRECTION_RIGHT:
          Math.abs($event$$422$$.gesture.deltaY) < Math.abs($event$$422$$.gesture.deltaX) && ($direction$$7$$ = $oj$$35$$.$OffcanvasUtils$.$_isRTL$() ? "start" : "end");
      }
      null != $direction$$7$$ && ($ui$$21$$ = {direction:$direction$$7$$, distance:Math.abs($event$$422$$.gesture.deltaX)}, $evt$$26$$ = $$$$32$$.Event("ojpanstart"), $drawer$$19$$.trigger($evt$$26$$, $ui$$21$$), $evt$$26$$.isDefaultPrevented() || ($offcanvas$$22$$._closePromise = null, $oj$$35$$.$OffcanvasUtils$.$_toggleClass$($offcanvas$$22$$, $wrapper$$10$$, !0), $proceed$$ = !0, $event$$422$$.stopPropagation()));
    }).on("panmove", function($event$$423$$) {
      $proceed$$ && ($delta$$6$$ = Math.abs($event$$423$$.gesture.deltaX), $drawer$$19$$.css("width", $delta$$6$$), $wrapper$$10$$.removeClass($oj$$35$$.$OffcanvasUtils$.$TRANSITION_SELECTOR$), $oj$$35$$.$OffcanvasUtils$.$_setTranslationX$($wrapper$$10$$, "start", $event$$423$$.gesture.deltaX + "px"), $ui$$21$$ = {direction:$direction$$7$$, distance:$delta$$6$$}, $evt$$26$$ = $$$$32$$.Event("ojpanmove"), $drawer$$19$$.trigger($evt$$26$$, $ui$$21$$), $event$$423$$.stopPropagation());
    }).on("panend", function($event$$424$$) {
      $proceed$$ && ($proceed$$ = !1, $delta$$6$$ = Math.abs($event$$424$$.gesture.deltaX), $ui$$21$$ = {distance:$delta$$6$$}, $evt$$26$$ = $$$$32$$.Event("ojpanend"), $drawer$$19$$.trigger($evt$$26$$, $ui$$21$$), $event$$424$$.stopPropagation(), $evt$$26$$.isDefaultPrevented() ? ($listener$$39$$ = function $$listener$$39$$$() {
        $oj$$35$$.$OffcanvasUtils$.$_toggleClass$($offcanvas$$22$$, $wrapper$$10$$, !1);
        $wrapper$$10$$.removeClass($oj$$35$$.$OffcanvasUtils$.$TRANSITION_SELECTOR$);
        $wrapper$$10$$.off("transitionend webkitTransitionEnd otransitionend oTransitionEnd", $listener$$39$$);
      }, $wrapper$$10$$.on("transitionend webkitTransitionEnd otransitionend oTransitionEnd", $listener$$39$$), $wrapper$$10$$.addClass($oj$$35$$.$OffcanvasUtils$.$TRANSITION_SELECTOR$), $oj$$35$$.$OffcanvasUtils$.$_setTranslationX$($wrapper$$10$$, "start", "0px")) : ($wrapper$$10$$.addClass($oj$$35$$.$OffcanvasUtils$.$TRANSITION_SELECTOR$), $drawer$$19$$.css("width", $size$$25$$ + "px"), $edge$$12$$ = $offcanvas$$22$$.edge, null == $edge$$12$$ && ($edge$$12$$ = $drawer$$19$$.hasClass("oj-offcanvas-start") ? 
      "start" : "end"), $oj$$35$$.$OffcanvasUtils$.$_setTranslationX$($wrapper$$10$$, $edge$$12$$, $size$$25$$ + "px"), $$$$32$$.data($drawer$$19$$[0], $oj$$35$$.$OffcanvasUtils$.$_DATA_OFFCANVAS_KEY$, $offcanvas$$22$$), $$$$32$$.data($drawer$$19$$[0], $oj$$35$$.$OffcanvasUtils$.$_DATA_EDGE_KEY$, $edge$$12$$), $oj$$35$$.$OffcanvasUtils$.$_registerCloseHandler$($offcanvas$$22$$)));
    }));
  };
  $goog$exportPath_$$("OffcanvasUtils.setupPanToReveal", $oj$$35$$.$OffcanvasUtils$.$setupPanToReveal$, $oj$$35$$);
  $oj$$35$$.$OffcanvasUtils$.$tearDownPanToReveal$ = function $$oj$$35$$$$OffcanvasUtils$$$tearDownPanToReveal$$($drawer$$20_offcanvas$$23$$) {
    $drawer$$20_offcanvas$$23$$ = $oj$$35$$.$OffcanvasUtils$.$_getDrawer$($drawer$$20_offcanvas$$23$$);
    $$$$32$$($oj$$35$$.$OffcanvasUtils$.$_getOuterWrapper$($drawer$$20_offcanvas$$23$$)).off("panstart panmove panend");
  };
  $goog$exportPath_$$("OffcanvasUtils.tearDownPanToReveal", $oj$$35$$.$OffcanvasUtils$.$tearDownPanToReveal$, $oj$$35$$);
});
