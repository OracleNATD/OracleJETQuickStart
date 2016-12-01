/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
/*
 jQuery UI Touch Punch 0.2.3

 Copyright 2011-2014, Dave Furfero
 Dual licensed under the MIT or GPL Version 2 licenses.
*/
define(["ojs/ojcore", "jquery"], function($oj$$22$$, $$$$21$$) {
  $oj$$22$$.$_TouchProxy$ = function $$oj$$22$$$$_TouchProxy$$($elem$$64$$) {
    this._init($elem$$64$$);
  };
  $oj$$22$$.$_TouchProxy$.prototype._init = function $$oj$$22$$$$_TouchProxy$$$_init$($elem$$65$$) {
    this.$_elem$ = $elem$$65$$;
    this.$_touchMoved$ = this.$_touchHandled$ = !1;
    this.$_touchStartHandler$ = $$$$21$$.proxy(this.$_touchStart$, this);
    this.$_touchEndHandler$ = $$$$21$$.proxy(this.$_touchEnd$, this);
    this.$_touchMoveHandler$ = $$$$21$$.proxy(this.$_touchMove$, this);
    this.$_elem$.on({touchstart:this.$_touchStartHandler$, touchend:this.$_touchEndHandler$, touchmove:this.$_touchMoveHandler$, touchcancel:this.$_touchEndHandler$});
  };
  $oj$$22$$.$_TouchProxy$.prototype._destroy = function $$oj$$22$$$$_TouchProxy$$$_destroy$() {
    this.$_elem$ && this.$_touchStartHandler$ && (this.$_elem$.off({touchstart:this.$_touchStartHandler$, touchmove:this.$_touchMoveHandler$, touchend:this.$_touchEndHandler$, touchcancel:this.$_touchEndHandler$}), this.$_touchMoveHandler$ = this.$_touchEndHandler$ = this.$_touchStartHandler$ = void 0);
  };
  $oj$$22$$.$_TouchProxy$.prototype.$_touchHandler$ = function $$oj$$22$$$$_TouchProxy$$$$_touchHandler$$($event$$345$$, $simulatedType$$) {
    if (!(1 < $event$$345$$.originalEvent.touches.length)) {
      "touchstart" != $event$$345$$.type && "touchend" != $event$$345$$.type && $event$$345$$.preventDefault();
      var $touch$$ = $event$$345$$.originalEvent.changedTouches[0], $simulatedEvent$$ = document.createEvent("MouseEvent");
      $simulatedEvent$$.initMouseEvent($simulatedType$$, !0, !0, window, 1, $touch$$.screenX, $touch$$.screenY, $touch$$.clientX, $touch$$.clientY, !1, !1, !1, !1, 0, null);
      $touch$$.target.dispatchEvent($simulatedEvent$$);
    }
  };
  $oj$$22$$.$_TouchProxy$.prototype.$_touchStart$ = function $$oj$$22$$$$_TouchProxy$$$$_touchStart$$($event$$346$$) {
    this.$_touchHandled$ || (this.$_touchHandled$ = !0, this.$_touchMoved$ = !1, this.$_touchHandler$($event$$346$$, "mouseover"), this.$_touchHandler$($event$$346$$, "mousemove"), this.$_touchHandler$($event$$346$$, "mousedown"));
  };
  $oj$$22$$.$_TouchProxy$.prototype.$_touchMove$ = function $$oj$$22$$$$_TouchProxy$$$$_touchMove$$($event$$347$$) {
    this.$_touchHandled$ && (this.$_touchMoved$ = !0, this.$_touchHandler$($event$$347$$, "mousemove"));
  };
  $oj$$22$$.$_TouchProxy$.prototype.$_touchEnd$ = function $$oj$$22$$$$_TouchProxy$$$$_touchEnd$$($event$$348$$) {
    this.$_touchHandled$ && (this.$_touchHandler$($event$$348$$, "mouseup"), this.$_touchHandler$($event$$348$$, "mouseout"), this.$_touchMoved$ || "touchend" != $event$$348$$.type || this.$_touchHandler$($event$$348$$, "click"), this.$_touchHandled$ = !1);
  };
  $oj$$22$$.$_TouchProxy$.$_TOUCH_PROXY_KEY$ = "_ojTouchProxy";
  $oj$$22$$.$_TouchProxy$.$addTouchListeners$ = function $$oj$$22$$$$_TouchProxy$$$addTouchListeners$$($elem$$66_jelem$$8$$) {
    $elem$$66_jelem$$8$$ = $$$$21$$($elem$$66_jelem$$8$$);
    var $proxy$$ = $elem$$66_jelem$$8$$.data($oj$$22$$.$_TouchProxy$.$_TOUCH_PROXY_KEY$);
    $proxy$$ || ($proxy$$ = new $oj$$22$$.$_TouchProxy$($elem$$66_jelem$$8$$), $elem$$66_jelem$$8$$.data($oj$$22$$.$_TouchProxy$.$_TOUCH_PROXY_KEY$, $proxy$$));
    return $proxy$$;
  };
  $oj$$22$$.$_TouchProxy$.$removeTouchListeners$ = function $$oj$$22$$$$_TouchProxy$$$removeTouchListeners$$($elem$$67_jelem$$9$$) {
    $elem$$67_jelem$$9$$ = $$$$21$$($elem$$67_jelem$$9$$);
    var $proxy$$1$$ = $elem$$67_jelem$$9$$.data($oj$$22$$.$_TouchProxy$.$_TOUCH_PROXY_KEY$);
    $proxy$$1$$ && ($proxy$$1$$._destroy(), $elem$$67_jelem$$9$$.removeData($oj$$22$$.$_TouchProxy$.$_TOUCH_PROXY_KEY$));
  };
});
