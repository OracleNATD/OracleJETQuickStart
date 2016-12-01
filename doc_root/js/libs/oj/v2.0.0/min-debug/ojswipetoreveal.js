/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore", "jquery", "hammerjs", "promise", "ojs/ojjquery-hammer", "ojs/ojoffcanvas"], function($oj$$46$$, $$$$42$$) {
  $oj$$46$$.$SwipeToRevealUtils$ = {};
  $goog$exportPath_$$("SwipeToRevealUtils", $oj$$46$$.$SwipeToRevealUtils$, $oj$$46$$);
  $oj$$46$$.$SwipeToRevealUtils$.$setupSwipeActions$ = function $$oj$$46$$$$SwipeToRevealUtils$$$setupSwipeActions$$($elem$$71$$, $options$$317$$) {
    var $drawer$$21$$, $direction$$10$$, $offcanvas$$24$$, $outerWrapper$$4$$, $threshold$$2$$, $minimum$$2$$, $drawerShown$$, $evt$$27$$, $checkpoint$$, $defaultAction$$, $distance$$2$$;
    $drawer$$21$$ = $$$$42$$($elem$$71$$);
    $drawer$$21$$.hasClass("oj-swipetoreveal") || ($drawer$$21$$.addClass("oj-swipetoreveal"), $direction$$10$$ = $drawer$$21$$.hasClass("oj-offcanvas-start") ? "end" : "start", $offcanvas$$24$$ = {}, $offcanvas$$24$$.selector = $drawer$$21$$, $oj$$46$$.$OffcanvasUtils$.$setupPanToReveal$($offcanvas$$24$$), $outerWrapper$$4$$ = $oj$$46$$.$OffcanvasUtils$.$_getOuterWrapper$($drawer$$21$$), null != $options$$317$$ && ($threshold$$2$$ = $options$$317$$.threshold), null != $threshold$$2$$ ? ($threshold$$2$$ = 
    parseInt($threshold$$2$$, 10), /%$/.test($options$$317$$.threshold) && ($threshold$$2$$ = $threshold$$2$$ / 100 * $outerWrapper$$4$$.outerWidth())) : $threshold$$2$$ = .55 * $outerWrapper$$4$$.outerWidth(), $minimum$$2$$ = Math.min(.3 * $outerWrapper$$4$$.outerWidth(), $drawer$$21$$.outerWidth()), $drawerShown$$ = !1, $outerWrapper$$4$$.on("click.swipetoreveal", function($event$$491$$) {
      $drawerShown$$ && ($event$$491$$.stopImmediatePropagation(), $drawerShown$$ = !1);
    }), $drawer$$21$$.on("ojpanstart", function($event$$492$$, $ui$$35$$) {
      $ui$$35$$.direction != $direction$$10$$ ? $event$$492$$.preventDefault() : ($drawer$$21$$.children().addClass("oj-swipetoreveal-action"), $defaultAction$$ = $drawer$$21$$.children(".oj-swipetoreveal-default").get(0), $checkpoint$$ = (new Date).getTime());
    }).on("ojpanmove", function($event$$493$$, $ui$$36$$) {
      $drawerShown$$ = !0;
      null != $defaultAction$$ && ($ui$$36$$.distance > $threshold$$2$$ ? $drawer$$21$$.children().each(function() {
        this != $defaultAction$$ && $$$$42$$(this).addClass("oj-swipetoreveal-hide-when-full");
      }) : $drawer$$21$$.children().removeClass("oj-swipetoreveal-hide-when-full"));
    }).on("ojpanend", function($event$$494$$, $ui$$37$$) {
      $distance$$2$$ = $ui$$37$$.distance;
      null != $defaultAction$$ && $distance$$2$$ > $threshold$$2$$ && ($evt$$27$$ = $$$$42$$.Event("ojdefaultaction"), $drawer$$21$$.trigger($evt$$27$$, $offcanvas$$24$$), $event$$494$$.preventDefault());
      $distance$$2$$ < $minimum$$2$$ && (200 < (new Date).getTime() - $checkpoint$$ || 10 > $distance$$2$$) && $event$$494$$.preventDefault();
    }));
  };
  $goog$exportPath_$$("SwipeToRevealUtils.setupSwipeActions", $oj$$46$$.$SwipeToRevealUtils$.$setupSwipeActions$, $oj$$46$$);
  $oj$$46$$.$SwipeToRevealUtils$.$tearDownSwipeActions$ = function $$oj$$46$$$$SwipeToRevealUtils$$$tearDownSwipeActions$$($elem$$72_offcanvas$$25$$) {
    var $drawer$$22_outerWrapper$$5$$;
    $drawer$$22_outerWrapper$$5$$ = $$$$42$$($elem$$72_offcanvas$$25$$);
    $elem$$72_offcanvas$$25$$ = {};
    $elem$$72_offcanvas$$25$$.selector = $drawer$$22_outerWrapper$$5$$;
    $drawer$$22_outerWrapper$$5$$ = $oj$$46$$.$OffcanvasUtils$.$_getOuterWrapper$($drawer$$22_outerWrapper$$5$$);
    null != $drawer$$22_outerWrapper$$5$$ && $drawer$$22_outerWrapper$$5$$.off("click.swipetoreveal");
    $oj$$46$$.$OffcanvasUtils$.$tearDownPanToReveal$($elem$$72_offcanvas$$25$$);
  };
  $goog$exportPath_$$("SwipeToRevealUtils.tearDownSwipeActions", $oj$$46$$.$SwipeToRevealUtils$.$tearDownSwipeActions$, $oj$$46$$);
});
