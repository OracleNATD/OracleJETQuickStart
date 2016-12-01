/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore", "jquery", "ojs/ojcomponentcore", "ojdnd"], function($oj$$65$$, $$$$60$$) {
  function $TreeUtils$$() {
  }
  $TreeUtils$$.$_OJ_EXPANDED$ = "oj-expanded";
  $TreeUtils$$.$_OJ_COLLAPSED$ = "oj-collapsed";
  $TreeUtils$$.$_OJ_HOVER$ = "oj-hover";
  $TreeUtils$$.$_OJ_SELECTED$ = "oj-selected";
  $TreeUtils$$.$_OJ_DISABLED$ = "oj-disabled";
  $TreeUtils$$.$_OJ_DEFAULT$ = "oj-default";
  $TreeUtils$$.$_OJ_TEMPNODE$ = "oj-treenode-temp";
  $oj$$65$$.$TreeDndContext$ = function $$oj$$65$$$$TreeDndContext$$($component$$28$$) {
    this.Init($component$$28$$);
  };
  $oj$$65$$.$Object$.$createSubclass$($oj$$65$$.$TreeDndContext$, $oj$$65$$.$Object$, "oj.TreeDndContext");
  $oj$$65$$.$TreeDndContext$.prototype.Init = function $$oj$$65$$$$TreeDndContext$$$Init$($component$$29$$) {
    $oj$$65$$.$TreeDndContext$.$superclass$.Init.call(this);
    this.$component$ = $component$$29$$;
    this.options = $component$$29$$.options;
    this.$_reset$();
  };
  $oj$$65$$.$Object$.$exportPrototypeSymbol$("TreeDndContext.prototype.Init", {Init:$oj$$65$$.$TreeDndContext$.prototype.Init});
  $oj$$65$$.$TreeDndContext$.prototype.$isDragEnabled$ = function $$oj$$65$$$$TreeDndContext$$$$isDragEnabled$$() {
    var $dnd$$ = this.$_dnd$;
    return $dnd$$.reorder || $dnd$$.$dragFromEnabled$;
  };
  $oj$$65$$.$TreeDndContext$.prototype.$isDropEnabled$ = function $$oj$$65$$$$TreeDndContext$$$$isDropEnabled$$() {
    var $dnd$$1$$ = this.$_dnd$;
    return $dnd$$1$$.reorder || $dnd$$1$$.$dropToEnabled$;
  };
  $oj$$65$$.$TreeDndContext$.prototype.$handleDnDOptionChange$ = function $$oj$$65$$$$TreeDndContext$$$$handleDnDOptionChange$$() {
    var $dnd$$2$$ = this.$_dnd$, $cons$$ = $oj$$65$$.$TreeDndContext$, $reorder$$ = $dnd$$2$$.reorder, $dragFromEnabled$$ = $dnd$$2$$.$dragFromEnabled$;
    this.$_dndCleanAll$();
    this.$initDnDOpts$();
    $dnd$$2$$ = this.$_dnd$;
    if ($reorder$$ != $dnd$$2$$.reorder || $dragFromEnabled$$ != $dnd$$2$$.$dragFromEnabled$) {
      $dnd$$2$$.reorder || $dnd$$2$$.$dragFromEnabled$ || this.$component$.$_$container_ul$.find("li").removeClass($cons$$.$_OJ_DRAGGABLE$).removeClass($cons$$.$_OJ_DRAG$).removeClass($cons$$.$_OJ_VALID_DROP$).removeAttr("draggable");
    }
    this.$initDnD$();
  };
  $oj$$65$$.$TreeDndContext$.prototype.$initDnDOpts$ = function $$oj$$65$$$$TreeDndContext$$$$initDnDOpts$$() {
    var $odnd$$ = this.options.dnd, $dnd$$3$$ = this.$_dnd$, $cons$$1$$ = $oj$$65$$.$TreeDndContext$, $bSetDisable_cb$$1$$ = !0, $n$$27_opts$$36$$;
    $dnd$$3$$.reorder = !1;
    "object" != typeof $odnd$$ ? this.options.dnd = {reorder:"disable"} : ($n$$27_opts$$36$$ = $odnd$$[$cons$$1$$.$_DND_REORDER$], "string" === typeof $n$$27_opts$$36$$ && ("enable" === $n$$27_opts$$36$$ ? ($dnd$$3$$.reorder = !0, $bSetDisable_cb$$1$$ = !1) : "disable" == $n$$27_opts$$36$$ && ($bSetDisable_cb$$1$$ = !1)), $bSetDisable_cb$$1$$ && (this.options.dnd.reorder = "disable"), $n$$27_opts$$36$$ = $odnd$$[$cons$$1$$.$_DND_DRAG$], "object" == typeof $n$$27_opts$$36$$ && ($n$$27_opts$$36$$ = 
    $n$$27_opts$$36$$[$cons$$1$$.$_DND_NODE$], "object" == typeof $n$$27_opts$$36$$ && ($bSetDisable_cb$$1$$ = $n$$27_opts$$36$$[$cons$$1$$.$_DND_DRAGSTART_CB$], "function" == typeof $bSetDisable_cb$$1$$ && ($dnd$$3$$.$dragStartCallback$ = $bSetDisable_cb$$1$$, $dnd$$3$$.$dragFromEnabled$ = !0), $bSetDisable_cb$$1$$ = $n$$27_opts$$36$$[$cons$$1$$.$_DND_DRAGDRAG_CB$], "function" == typeof $bSetDisable_cb$$1$$ && ($dnd$$3$$.$dragDragCallback$ = $bSetDisable_cb$$1$$, $dnd$$3$$.$dragFromEnabled$ = !0), 
    $bSetDisable_cb$$1$$ = $n$$27_opts$$36$$[$cons$$1$$.$_DND_DRAGEND_CB$], "function" == typeof $bSetDisable_cb$$1$$ && ($dnd$$3$$.$dragEndCallback$ = $bSetDisable_cb$$1$$, $dnd$$3$$.$dragFromEnabled$ = !0), $bSetDisable_cb$$1$$ = $n$$27_opts$$36$$[$cons$$1$$.$_DND_DATATYPES$], $$$$60$$.isArray($bSetDisable_cb$$1$$) ? ($dnd$$3$$.$dragDataTypes$ = $bSetDisable_cb$$1$$.slice(), $dnd$$3$$.$dragFromEnabled$ = !0) : "string" == typeof $bSetDisable_cb$$1$$ && ($dnd$$3$$.$dragDataTypes$ = [$bSetDisable_cb$$1$$], 
    $dnd$$3$$.$dragFromEnabled$ = !0))), $n$$27_opts$$36$$ = $odnd$$[$cons$$1$$.$_DND_DROP$], "object" == typeof $n$$27_opts$$36$$ && ($n$$27_opts$$36$$ = $n$$27_opts$$36$$[$cons$$1$$.$_DND_NODE$], "object" == typeof $n$$27_opts$$36$$ && ($bSetDisable_cb$$1$$ = $n$$27_opts$$36$$[$cons$$1$$.$_DND_DROPDRAGENTER_CB$], "function" == typeof $bSetDisable_cb$$1$$ && ($dnd$$3$$.$dropDragEnterCallback$ = $bSetDisable_cb$$1$$, $dnd$$3$$.$dropToEnabled$ = !0), $bSetDisable_cb$$1$$ = $n$$27_opts$$36$$[$cons$$1$$.$_DND_DROPDRAGOVER_CB$], 
    "function" == typeof $bSetDisable_cb$$1$$ && ($dnd$$3$$.$dropDragOverCallback$ = $bSetDisable_cb$$1$$, $dnd$$3$$.$dropToEnabled$ = !0), $bSetDisable_cb$$1$$ = $n$$27_opts$$36$$[$cons$$1$$.$_DND_DROPDRAGLEAVE_CB$], "function" == typeof $bSetDisable_cb$$1$$ && ($dnd$$3$$.$dropDragLeaveCallback$ = $bSetDisable_cb$$1$$, $dnd$$3$$.$dropToEnabled$ = !0), $bSetDisable_cb$$1$$ = $n$$27_opts$$36$$[$cons$$1$$.$_DND_DROPDROP_CB$], "function" == typeof $bSetDisable_cb$$1$$ && ($dnd$$3$$.$dropDropCallback$ = 
    $bSetDisable_cb$$1$$, $dnd$$3$$.$dropToEnabled$ = !0), $bSetDisable_cb$$1$$ = $n$$27_opts$$36$$[$cons$$1$$.$_DND_DATATYPES$], $$$$60$$.isArray($bSetDisable_cb$$1$$) ? ($dnd$$3$$.$dropDataTypes$ = $bSetDisable_cb$$1$$.slice(), $dnd$$3$$.$dropToEnabled$ = !0) : "string" == typeof $bSetDisable_cb$$1$$ && ($dnd$$3$$.$dropDataTypes$ = [$bSetDisable_cb$$1$$], $dnd$$3$$.$dropToEnabled$ = !0))), $dnd$$3$$.reorder || ($dnd$$3$$.$dragDataTypes$ || $dnd$$3$$.$dragStartCallback$ || ($dnd$$3$$.$dragFromEnabled$ = 
    !1, $dnd$$3$$.$dragStartCallback$ = $dnd$$3$$.$dragDragCallback$ = $dnd$$3$$.$dragEndCallback$ = $dnd$$3$$.$dragDataTypes$ = null), $dnd$$3$$.$dropDropCallback$ || ($dnd$$3$$.$dropToEnabled$ = !1, $dnd$$3$$.$dropDragEnterCallback$ = $dnd$$3$$.$dropDragOverCallback$ = $dnd$$3$$.$dropDragLeaveCallback$ = $dnd$$3$$.$dropDropCallback$ = $dnd$$3$$.$dropDataTypes$ = null)), $dnd$$3$$.$pureReorder$ = $dnd$$3$$.reorder && !$dnd$$3$$.$dragFromEnabled$);
  };
  $oj$$65$$.$TreeDndContext$.prototype.$initDnD$ = function $$oj$$65$$$$TreeDndContext$$$$initDnD$$() {
    var $dnd$$4$$ = this.$_dnd$, $div$$7_vars$$ = $dnd$$4$$.$vars$, $cons$$2$$ = $oj$$65$$.$TreeDndContext$;
    if ($dnd$$4$$.$dragFromEnabled$ || $dnd$$4$$.$dropToEnabled$ || $dnd$$4$$.reorder) {
      $oj$$65$$.$TreeDndContext$.$_dragMarker$ ? ($div$$7_vars$$.$m$ = $oj$$65$$.$TreeDndContext$.$_dragMarker$, $div$$7_vars$$.$ml$ = $oj$$65$$.$TreeDndContext$.$_dragMarkerLine$) : ($div$$7_vars$$.$m$ = $$$$60$$("\x3cdiv class\x3d'oj-tree-drop-marker'\x3e\x3cspan class\x3d'oj-tree-drop-ptr oj-component-icon'\x3e\x26#160;\x3c/span\x3e\x3c/div\x3e").css("pointer-events", "none").hide().appendTo("body"), $div$$7_vars$$.$ml$ = $$$$60$$("\x3cdiv /\x3e").addClass($cons$$2$$.$_OJT_DROP_MARKER_LINE$).css("pointer-events", 
      "none").hide().appendTo("body"), $oj$$65$$.$TreeDndContext$.$_dragMarker$ = $div$$7_vars$$.$m$, $oj$$65$$.$TreeDndContext$.$_dragMarkerLine$ = $div$$7_vars$$.$ml$);
      $dnd$$4$$.$ml_width$ = $div$$7_vars$$.$ml$.width();
      var $div$$7_vars$$ = this.$component$.element[0], $$ul$$1$$ = $$$$60$$($div$$7_vars$$).children("ul:eq(0)");
      if ($dnd$$4$$.reorder || $dnd$$4$$.$dragFromEnabled$) {
        $dnd$$4$$.$fnDragStart$ = this.$_dragStart$.bind(this), $dnd$$4$$.$fnDragEnd$ = this.$_dragEnd$.bind(this), $$$$60$$($div$$7_vars$$).on("dragstart", $dnd$$4$$.$fnDragStart$), $$$$60$$($div$$7_vars$$).on("dragend", $dnd$$4$$.$fnDragEnd$), $$ul$$1$$.length && $$ul$$1$$.find("li").addClass($cons$$2$$.$_OJ_DRAGGABLE$).addClass($cons$$2$$.$_OJ_DRAG$).addClass($cons$$2$$.$_OJ_VALID_DROP$).attr("draggable", "true");
      }
      if ($dnd$$4$$.reorder || $dnd$$4$$.$dropToEnabled$) {
        $dnd$$4$$.$fnDrag$ = this.$_drag$.bind(this), $dnd$$4$$.$fnDragEnter$ = this.$_dragEnter$.bind(this), $dnd$$4$$.$fnDragOver$ = this.$_dragOver$.bind(this), $dnd$$4$$.$fnDragLeave$ = this.$_dragLeave$.bind(this), $dnd$$4$$.$fnDragDrop$ = this.$_dragDrop$.bind(this), $$$$60$$($div$$7_vars$$).on("drag", $dnd$$4$$.$fnDrag$), $$$$60$$($div$$7_vars$$).on("dragenter", $dnd$$4$$.$fnDragEnter$), $$$$60$$($div$$7_vars$$).on("dragover", $dnd$$4$$.$fnDragOver$), $$$$60$$($div$$7_vars$$).on("dragleave", 
        $dnd$$4$$.$fnDragLeave$), $$$$60$$($div$$7_vars$$).on("drop", $dnd$$4$$.$fnDragDrop$);
      }
    }
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_closedown$ = function $$oj$$65$$$$TreeDndContext$$$$_closedown$$() {
    this.$_dndCleanAll$();
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_dragStart$ = function $$oj$$65$$$$TreeDndContext$$$$_dragStart$$($e$$104$$) {
    var $dnd$$5$$, $$nodes_vars$$1$$, $$node$$ = $$$$60$$($e$$104$$.target).closest("li"), $dt$$ = $e$$104$$.originalEvent.dataTransfer, $ret$$62$$;
    $dnd$$5$$ = this.$_dnd$;
    $$nodes_vars$$1$$ = $dnd$$5$$.$vars$;
    $$nodes_vars$$1$$.$o$ = null;
    $$nodes_vars$$1$$.$r$ = null;
    $dnd$$5$$.$nodeLastEnter$ = null;
    $dnd$$5$$.$nodeLastLeft$ = null;
    $dnd$$5$$.$nodeDraggedId$ = null;
    $dnd$$5$$.$dragStarted$ = !1;
    if (!$dnd$$5$$.reorder && !$dnd$$5$$.$dragFromEnabled$ || $$node$$.hasClass($TreeUtils$$.$_OJ_DISABLED$) || this.$component$.$_data$.$core$.locked) {
      $e$$104$$.preventDefault();
    } else {
      $$nodes_vars$$1$$ = this.$component$.isSelected($$node$$) ? this.$component$.$_getNode$(null, !0) : $$nodes_vars$$1$$ = $$node$$;
      ($dnd$$5$$.$dragFromEnabled$ || $dnd$$5$$.$pureReorder$) && this.$_setDataTypes$($dt$$, $$nodes_vars$$1$$);
      if ($dnd$$5$$.$dragStartCallback$) {
        $ret$$62$$ = $dnd$$5$$.$dragStartCallback$($e$$104$$, {item:void 0});
        if ($e$$104$$.isDefaultPrevented() || "boolean" === typeof $ret$$62$$ && !$ret$$62$$) {
          return $ret$$62$$;
        }
        if (!$dnd$$5$$.$dragDataTypes$ && !this.$_checkAddedDataTypes$($dt$$) && !$dnd$$5$$.reorder) {
          return $e$$104$$.preventDefault(), !1;
        }
      }
      "uninitialized" === $dt$$.effectAllowed && ($dt$$.effectAllowed = $dnd$$5$$.$pureReorder$ ? "move" : $oj$$65$$.$DomUtils$.$isMetaKeyPressed$($e$$104$$) ? "copy" : "move");
      this.$_dndStartDrag$($$nodes_vars$$1$$, $$node$$, $e$$104$$);
    }
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_drag$ = function $$oj$$65$$$$TreeDndContext$$$$_drag$$($e$$105$$) {
    var $dnd$$6$$ = this.$_dnd$;
    $dnd$$6$$.$dragDragCallback$ && $dnd$$6$$.$dragDragCallback$($e$$105$$);
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_dragEnter$ = function $$oj$$65$$$$TreeDndContext$$$$_dragEnter$$($e$$106$$) {
    this.$component$.$_$container_ul$[0].firstChild || this.$_addInternalNode$();
    var $$targ$$1$$ = $$$$60$$($e$$106$$.target), $$node$$1$$ = this.$component$.$_getNode$($$targ$$1$$), $dnd$$7$$ = this.$_dnd$, $vars$$2$$ = $dnd$$7$$.$vars$, $bNode$$ = $$node$$1$$ && 0 < $$node$$1$$.length && $$node$$1$$.hasClass("oj-tree-node"), $dt$$1$$ = $e$$106$$.originalEvent.dataTransfer, $cons$$4$$ = $oj$$65$$.$TreeDndContext$, $bForeignTree$$ = !1, $bClean$$ = !1, $ret$$63$$;
    $bNode$$ && $$node$$1$$.hasClass($TreeUtils$$.$_OJ_TEMPNODE$) && ($dnd$$7$$.$bInternalNode$ = !0);
    if (!$bNode$$ || "UL" != $e$$106$$.target.tagName || "group" != $e$$106$$.target.getAttribute("role")) {
      if ($dnd$$7$$.$foreign$ = !$dnd$$7$$.$dragStarted$, !$dnd$$7$$.$foreign$ && !$dnd$$7$$.reorder || $dnd$$7$$.$foreign$ && this.$_isDtType$($dt$$1$$, $cons$$4$$.$_DND_INTERNAL_DT_REORDER$)) {
        this.$_dndClean$();
      } else {
        if ($dnd$$7$$.$foreign$ && ($bForeignTree$$ = this.$_isDtType$($dt$$1$$, $cons$$4$$.$_DND_INTERNAL_DT$), !$dnd$$7$$.$dropToEnabled$)) {
          this.$_dndClean$();
          return;
        }
        $vars$$2$$.$r$ = !1;
        $dnd$$7$$.$nodeLastEnter$ && this.$_clearDropClasses$($dnd$$7$$.$nodeLastEnter$);
        $$targ$$1$$.hasClass("oj-tree") && ($$node$$1$$ = $dnd$$7$$.$nodeLastEnter$);
        if (!$$node$$1$$ || !$$node$$1$$.length || $$node$$1$$.attr("id") != $dnd$$7$$.$nodeDraggedId$) {
          $bForeignTree$$ && $bNode$$ && ($dnd$$7$$.$nodeLastEnter$ = null, $vars$$2$$.$o$ = 2);
          $dnd$$7$$.$foreign$ && !$bForeignTree$$ && ($vars$$2$$.$o$ = 1);
          $vars$$2$$.$r$ = $$node$$1$$;
          $dnd$$7$$.$nodeLastEnter$ = $$node$$1$$;
          this.$_dndPlacement$($e$$106$$, $$node$$1$$);
          if (this.$_dndEnter$()) {
            $vars$$2$$.$r$.removeClass($cons$$4$$.$_OJ_INVALID_DROP$).addClass($cons$$4$$.$_OJ_VALID_DROP$).addClass($cons$$4$$.$_OJ_ACTIVE_DROP$);
            $dnd$$7$$.$dropDragEnterCallback$ && ($ret$$63$$ = $dnd$$7$$.$dropDragEnterCallback$($e$$106$$, {item:$dnd$$7$$.$bInternalNode$ ? null : $$node$$1$$, position:$dnd$$7$$.$bInternalNode$ ? "first" : $dnd$$7$$.$place$, reference:$dnd$$7$$.$bInternalNode$ ? null : $vars$$2$$.$r$}));
            if (void 0 === $ret$$63$$) {
              this.$_isDtAcceptDataTypes$($dt$$1$$) ? ($e$$106$$.preventDefault(), $e$$106$$.stopPropagation()) : $bClean$$ = $dnd$$7$$.$foreign$ || !$dnd$$7$$.reorder;
            } else {
              if (!1 === $ret$$63$$ || $e$$106$$.isDefaultPrevented()) {
                $e$$106$$.preventDefault(), $e$$106$$.stopPropagation();
              } else {
                if ($dnd$$7$$.$foreign$ || !$dnd$$7$$.reorder) {
                  $bClean$$ = $dnd$$7$$.$foreign$ || !$dnd$$7$$.reorder;
                }
              }
            }
            $bClean$$ && this.$_dndClean$();
            return $ret$$63$$;
          }
          this.$_clearDropClasses$($vars$$2$$.$r$);
          $vars$$2$$.$r$ = null;
        }
        this.$_dndHideMarker$();
      }
    }
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_dragOver$ = function $$oj$$65$$$$TreeDndContext$$$$_dragOver$$($e$$107$$) {
    var $dnd$$8$$ = this.$_dnd$, $vars$$3$$ = $dnd$$8$$.$vars$, $dt$$2$$ = $e$$107$$.originalEvent.dataTransfer, $bClean$$1$$ = !1, $elemId$$1$$, $$node$$2$$, $ret$$64$$;
    if ($vars$$3$$.$r$ && $vars$$3$$.$r$.length && ($$node$$2$$ = $vars$$3$$.$r$, $$node$$2$$.hasClass("oj-tree-node") && ($elemId$$1$$ = $$node$$2$$.attr("id"), $elemId$$1$$ != $dnd$$8$$.$nodeDraggedId$ && (this.$_dndPlacement$($e$$107$$, $$node$$2$$), this.$_dndPrepare$())))) {
      $dnd$$8$$.$dropDragOverCallback$ && ($ret$$64$$ = $dnd$$8$$.$dropDragOverCallback$($e$$107$$, {item:$dnd$$8$$.$bInternalNode$ ? null : $$node$$2$$, reference:$dnd$$8$$.$bInternalNode$ ? null : $vars$$3$$.$r$, position:$dnd$$8$$.$bInternalNode$ ? "first" : $vars$$3$$.$last_pos$}));
      if (void 0 === $ret$$64$$) {
        this.$_isDtAcceptDataTypes$($dt$$2$$) ? ($e$$107$$.preventDefault(), $e$$107$$.stopPropagation()) : $bClean$$1$$ = $dnd$$8$$.$foreign$ || !$dnd$$8$$.reorder;
      } else {
        if (!1 === $ret$$64$$ || $e$$107$$.isDefaultPrevented()) {
          $e$$107$$.preventDefault(), $e$$107$$.stopPropagation();
        } else {
          if ($dnd$$8$$.$foreign$ || !$dnd$$8$$.reorder) {
            $bClean$$1$$ = $dnd$$8$$.$foreign$ || !$dnd$$8$$.reorder;
          }
        }
      }
      $bClean$$1$$ && this.$_dndClean$();
      return $ret$$64$$;
    }
    this.$_dndHideMarker$();
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_dragDrop$ = function $$oj$$65$$$$TreeDndContext$$$$_dragDrop$$($e$$108$$) {
    var $dnd$$9$$ = this.$_dnd$, $vars$$4$$ = $dnd$$9$$.$vars$, $veto$$ = !1, $ret$$65$$;
    if ($vars$$4$$.$r$) {
      if ($dnd$$9$$.$dropDropCallback$) {
        $ret$$65$$ = $dnd$$9$$.$dropDropCallback$($e$$108$$, {reference:$dnd$$9$$.$bInternalNode$ ? null : $vars$$4$$.$r$, position:$dnd$$9$$.$bInternalNode$ ? "first" : $vars$$4$$.$last_pos$, reorder:!$dnd$$9$$.$foreign$ && $dnd$$9$$.reorder});
      } else {
        if ($dnd$$9$$.$foreign$ || !$dnd$$9$$.reorder) {
          $veto$$ = !0;
        }
      }
      $veto$$ || $ret$$65$$ && !$e$$108$$.isDefaultPrevented() || this.$_dndFinishReorder$($e$$108$$);
    }
    $dnd$$9$$.$foreign$ && this.$_dndClean$();
    $veto$$ || ($e$$108$$.preventDefault(), $e$$108$$.stopPropagation());
    $dnd$$9$$.$nodeLastLeft$ = null;
    return $ret$$65$$;
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_dragEnd$ = function $$oj$$65$$$$TreeDndContext$$$$_dragEnd$$($e$$109$$) {
    var $dnd$$10$$ = this.$_dnd$, $vars$$5$$ = $dnd$$10$$.$vars$;
    $dnd$$10$$.$dragEndCallback$ && $dnd$$10$$.$dragEndCallback$($e$$109$$, {reorder:$dnd$$10$$.reorder && !1 === $vars$$5$$.$o$});
    this.$_dndStopDrag$();
    this.$_dndClean$();
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_addInternalNode$ = function $$oj$$65$$$$TreeDndContext$$$$_addInternalNode$$() {
    this.$_internalNode$ || (this.$_internalNode$ = $$$$60$$("\x3cli class\x3d'" + $TreeUtils$$.$_OJ_TEMPNODE$ + " oj-tree-node oj-tree-leaf oj-valid-drop' id\x3d'" + $TreeUtils$$.$_OJ_TEMPNODE$ + "'\x3e\x3cins class\x3d'oj-tree-icon'\x3e\x3c/ins\x3e\x3ca href\x3d'#'\x3e\x3cins class\x3d'oj-tree-icon'\x3e\x3c/ins\x3e\x3cspan class\x3d'oj-tree-title'\x3e\x3c/span\x3e\x3c/a\x3e\x3c/li\x3e"));
    this.$component$.$_$container_ul$.append(this.$_internalNode$);
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_dragLeave$ = function $$oj$$65$$$$TreeDndContext$$$$_dragLeave$$($e$$110$$) {
    var $dnd$$11$$ = this.$_dnd$, $vars$$6$$ = $dnd$$11$$.$vars$, $$targ$$2$$ = $$$$60$$($e$$110$$.target), $$node$$3$$ = $$targ$$2$$.closest("li"), $bNode$$1$$ = $$node$$3$$ && 0 < $$node$$3$$.length && $$node$$3$$.hasClass("oj-tree-node");
    $$node$$3$$.attr("id");
    var $dt$$4$$ = $e$$110$$.originalEvent.dataTransfer;
    $dnd$$11$$.$dropDragLeaveCallback$ && $dnd$$11$$.$dropDragLeaveCallback$($e$$110$$, {item:$dnd$$11$$.$bInternalNode$ ? null : $$node$$3$$});
    $$targ$$2$$.hasClass("oj-tree") || !$bNode$$1$$ || "none" == $dt$$4$$.dropEffect ? this.$_dndLeave$($e$$110$$) : $dnd$$11$$.$nodeLastLeft$ = $$node$$3$$;
    $vars$$6$$.$r$ && this.$_clearDropClasses$($vars$$6$$.$r$);
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_dndEnter$ = function $$oj$$65$$$$TreeDndContext$$$$_dndEnter$$() {
    var $dnd$$12_t$$2$$ = this.$_dnd$, $vars$$7$$ = $dnd$$12_t$$2$$.$vars$, $ret$$67$$;
    $dnd$$12_t$$2$$.$prepared$ = !1;
    $ret$$67$$ = this.$_dndPrepare$();
    var $ms$$1$$ = $dnd$$12_t$$2$$.$openTimeoutMs$;
    $ms$$1$$ && ($dnd$$12_t$$2$$.$openTimer_Id$ && clearTimeout($dnd$$12_t$$2$$.$openTimerId$), $vars$$7$$.$r$ && $vars$$7$$.$r$.length && $vars$$7$$.$r$.hasClass($TreeUtils$$.$_OJ_COLLAPSED$) && ($dnd$$12_t$$2$$.$openTimerId$ = setTimeout(this.$_dndOpen$.bind(this), $ms$$1$$)));
    $dnd$$12_t$$2$$ = typeof $ret$$67$$;
    return "boolean" == $dnd$$12_t$$2$$ && $ret$$67$$ || "string" == $dnd$$12_t$$2$$;
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_dndOpen$ = function $$oj$$65$$$$TreeDndContext$$$$_dndOpen$$() {
    var $dnd$$13$$ = this.$_dnd$, $vars$$8$$ = $dnd$$13$$.$vars$;
    $dnd$$13$$.$openTimerId$ = !1;
    this.$component$.$_expand$($vars$$8$$.$r$, this.$_dndPrepare$.bind(this), !0);
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_dndFinishReorder$ = function $$oj$$65$$$$TreeDndContext$$$$_dndFinishReorder$$($e$$111$$) {
    var $dnd$$14$$ = this.$_dnd$, $vars$$9$$ = $dnd$$14$$.$vars$;
    $dnd$$14$$.$dragStarted$ && $dnd$$14$$.reorder && "object" == typeof $vars$$9$$.$o$ && 0 < $vars$$9$$.$o$.length && (this.$component$.$_moveNode$($vars$$9$$.$o$, $vars$$9$$.$r$, $vars$$9$$.$last_pos$, $oj$$65$$.$DomUtils$.$isMetaKeyPressed$($e$$111$$)), $vars$$9$$.$o$ = !1);
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_dndFinishSelection$ = function $$oj$$65$$$$TreeDndContext$$$$_dndFinishSelection$$($children$$13_node$$112$$) {
    $children$$13_node$$112$$.hasClass($TreeUtils$$.$_OJ_SELECTED$) && ($children$$13_node$$112$$.removeClass($TreeUtils$$.$_OJ_SELECTED$), this.$component$.$_select$($children$$13_node$$112$$, !0));
    var $len$$19$$ = ($children$$13_node$$112$$ = this.$component$.getChildren($children$$13_node$$112$$)) && $children$$13_node$$112$$.length ? $children$$13_node$$112$$.length : 0, $i$$391$$;
    for ($i$$391$$ = 0;$i$$391$$ < $len$$19$$;$i$$391$$++) {
      this.$_dndFinishSelection$($$$$60$$($children$$13_node$$112$$[$i$$391$$]));
    }
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_dndPlacement$ = function $$oj$$65$$$$TreeDndContext$$$$_dndPlacement$$($e$$112$$, $$node$$4$$) {
    var $dnd$$15$$ = this.$_dnd$;
    $$node$$4$$ && ($$node$$4$$.hasClass($TreeUtils$$.$_OJ_TEMPNODE$) ? $dnd$$15$$.$place$ = "after" : ($e$$112$$ = $e$$112$$.originalEvent, $dnd$$15$$.off = $$node$$4$$.offset(), $dnd$$15$$.$place$ = $e$$112$$.pageY - ($dnd$$15$$.off.top || 0), $dnd$$15$$.$place$ = $dnd$$15$$.$place$ >= this.$component$.$_data$.$core$.$li_height$ ? "after" : 0 > $dnd$$15$$.$place$ ? "before" : "inside", "after" === $dnd$$15$$.$place$ && $$node$$4$$.hasClass($TreeUtils$$.$_OJ_EXPANDED$) && ($dnd$$15$$.$place$ = "first")));
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_dndLeave$ = function $$oj$$65$$$$TreeDndContext$$$$_dndLeave$$($e$$113$$) {
    var $dnd$$16$$ = this.$_dnd$, $vars$$10$$ = $dnd$$16$$.$vars$;
    $dnd$$16$$.after = !1;
    $dnd$$16$$.before = !1;
    $dnd$$16$$.$inside$ = !1;
    $dnd$$16$$.$lastNodeEnter$ = null;
    this.$_dndHideMarker$();
    $vars$$10$$.$r$ && $vars$$10$$.$r$[0] === $e$$113$$.target.parentNode && $dnd$$16$$.$openTimerId$ && (clearTimeout($dnd$$16$$.$openTimerId$), $dnd$$16$$.$openTimerId$ = !1);
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_dndClean$ = function $$oj$$65$$$$TreeDndContext$$$$_dndClean$$() {
    this.$_dndHideMarker$();
    var $dnd$$17$$ = this.$_dnd$, $vars$$11$$ = $dnd$$17$$.$vars$;
    $vars$$11$$.$o$ = !1;
    $vars$$11$$.$r$ = !1;
    $dnd$$17$$.$openTimerId$ && clearTimeout($dnd$$17$$.$openTimerId$);
    $dnd$$17$$.$nodeDraggedId$ = null;
    $dnd$$17$$.$foreign$ = !1;
    $dnd$$17$$.$nodeLastEnter$ = null;
    $dnd$$17$$.$nodeLastLeft$ = null;
    $dnd$$17$$.after = !1;
    $dnd$$17$$.before = !1;
    $dnd$$17$$.$inside$ = !1;
    $dnd$$17$$.off = !1;
    $dnd$$17$$.$prepared$ = !1;
    $dnd$$17$$.$openTimerId$ = !1;
    $dnd$$17$$.$foreign$ = !1;
    $dnd$$17$$.$bInternalNode$ = !1;
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_dndCleanAll$ = function $$oj$$65$$$$TreeDndContext$$$$_dndCleanAll$$() {
    var $dnd$$18$$ = this.$_dnd$, $$div$$;
    $$div$$ = $$$$60$$(this.$component$.$_$container$[0]);
    $$div$$.off("dragstart", $dnd$$18$$.$fnDragStart$);
    $$div$$.off("dragend", $dnd$$18$$.$fnDragEnd$);
    $$div$$.off("drag", $dnd$$18$$.$fnDrag$);
    $$div$$.off("dragenter", $dnd$$18$$.$fnDragEnter$);
    $$div$$.off("dragover", $dnd$$18$$.$fnDragOver$);
    $$div$$.off("dragleave", $dnd$$18$$.$fnDragLeave$);
    $$div$$.off("drop", $dnd$$18$$.$fnDragDrop$);
    this.$_dndClean$();
    this.$_reset$();
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_dndPrepare$ = function $$oj$$65$$$$TreeDndContext$$$$_dndPrepare$$() {
    var $dnd$$19$$ = this.$_dnd$, $vars$$12$$ = $dnd$$19$$.$vars$, $tree$$ = this.$component$, $foreignObj$$1$$ = !1;
    if (!$vars$$12$$.$r$ || !$vars$$12$$.$r$.length) {
      return!1;
    }
    if ("number" == typeof $vars$$12$$.$o$ && (1 === $vars$$12$$.$o$ || 2 === $vars$$12$$.$o$)) {
      $foreignObj$$1$$ = !0;
    } else {
      if (!$vars$$12$$.$o$) {
        return!1;
      }
    }
    $dnd$$19$$.off = $vars$$12$$.$r$.offset();
    this.$component$.$_isRtl$ && ($dnd$$19$$.off.right = $dnd$$19$$.off.left + $vars$$12$$.$r$.width() - $vars$$12$$.$r$.find("\x3ea").width() - 30);
    $dnd$$19$$.$targ_ml_width$ = $vars$$12$$.$r$.find("a").width();
    $foreignObj$$1$$ ? ($dnd$$19$$.before = "before" == $dnd$$19$$.$place$, $dnd$$19$$.after = "after" == $dnd$$19$$.$place$, $dnd$$19$$.$inside$ = "inside" == $dnd$$19$$.$place$) : ($tree$$.$_prepare_move$($vars$$12$$.$o$, $vars$$12$$.$r$, "before"), $dnd$$19$$.before = $tree$$.$_checkMove$(), $tree$$.$_prepare_move$($vars$$12$$.$o$, $vars$$12$$.$r$, "after"), $dnd$$19$$.after = $tree$$.$_checkMove$(), this.$component$.$_is_loaded$($vars$$12$$.$r$) ? ($tree$$.$_prepare_move$($vars$$12$$.$o$, $vars$$12$$.$r$, 
    "inside"), $dnd$$19$$.$inside$ = $tree$$.$_checkMove$()) : $dnd$$19$$.$inside$ = !1);
    $dnd$$19$$.$prepared$ = !0;
    return this.$_dndShowMarker$();
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_dndShowMarker$ = function $$oj$$65$$$$TreeDndContext$$$$_dndShowMarker$$() {
    var $dnd$$20$$ = this.$_dnd$, $fc_isParent$$1$$ = !1, $cons$$7$$ = $oj$$65$$.$TreeDndContext$, $vars$$13$$ = $dnd$$20$$.$vars$, $rtl$$2$$ = this.$component$.$_isRtl$, $mLeft$$, $mlLeft_pos$$13$$, $lineTop$$, $nodeHeight$$ = this.$component$.$_data$.$core$.$li_height$, $r$$1$$ = !1;
    if (!$dnd$$20$$.$prepared$) {
      return this.$_dndHideMarker$(), $r$$1$$;
    }
    if ("after" == $dnd$$20$$.$place$ && $dnd$$20$$.after || "inside" == $dnd$$20$$.$place$ && $dnd$$20$$.$inside$ || "before" == $dnd$$20$$.$place$ && $dnd$$20$$.before || "first" == $dnd$$20$$.$place$) {
      $r$$1$$ = $dnd$$20$$.$place$;
    }
    "first" === $r$$1$$ && ($fc_isParent$$1$$ = $vars$$13$$.$r$.find("li:eq(0)"), $dnd$$20$$.off = $fc_isParent$$1$$.offset());
    $mlLeft_pos$$13$$ = $rtl$$2$$ ? $dnd$$20$$.off.right - 18 : $dnd$$20$$.off.left + 5;
    $fc_isParent$$1$$ = !this.$component$.isLeaf($vars$$13$$.$r$);
    $mLeft$$ = $rtl$$2$$ ? $mlLeft_pos$$13$$ + $dnd$$20$$.$targ_ml_width$ + 18 : $mlLeft_pos$$13$$;
    $mlLeft_pos$$13$$ = $rtl$$2$$ ? $mLeft$$ - $dnd$$20$$.$ml_width$ : $mlLeft_pos$$13$$ + 8;
    $lineTop$$ = $dnd$$20$$.off.top - 3;
    switch($r$$1$$) {
      case "before":
      ;
      case "first":
        this.$_moveMarkerUI$($vars$$13$$.$m$, {left:$mLeft$$, top:$lineTop$$ - 7});
        $vars$$13$$.$ml$ && this.$_moveMarkerUI$($vars$$13$$.$ml$, {left:$mlLeft_pos$$13$$, top:$lineTop$$});
        break;
      case "after":
        $lineTop$$ += $nodeHeight$$;
        this.$_moveMarkerUI$($vars$$13$$.$m$, {left:$mLeft$$, top:$lineTop$$ - 2});
        $vars$$13$$.$ml$ && this.$_moveMarkerUI$($vars$$13$$.$ml$, {left:$mlLeft_pos$$13$$, top:$lineTop$$ + 6});
        break;
      case "inside":
        this.$_moveMarkerUI$($vars$$13$$.$m$, {left:$mLeft$$ + ($rtl$$2$$ ? $fc_isParent$$1$$ ? -4 : 0 : 4), top:$dnd$$20$$.off.top + $nodeHeight$$ / 2 - 8});
        $vars$$13$$.$ml$ && $vars$$13$$.$ml$.hide();
        break;
      default:
        this.$_dndHideMarker$();
    }
    $r$$1$$ ? $vars$$13$$.$r$.removeClass($cons$$7$$.$_OJ_INVALID_DROP$).addClass($cons$$7$$.$_OJ_VALID_DROP$) : $vars$$13$$.$r$.removeClass($cons$$7$$.$_OJ_VALID_DROP$).removeClass($cons$$7$$.$_OJ_VALID_DROP$);
    return $vars$$13$$.$last_pos$ = $r$$1$$;
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_dndHideMarker$ = function $$oj$$65$$$$TreeDndContext$$$$_dndHideMarker$$() {
    var $vars$$14$$ = this.$_dnd$.$vars$;
    $vars$$14$$ && ($vars$$14$$.$m$ && $vars$$14$$.$m$.hide(), $vars$$14$$.$ml$ && $vars$$14$$.$ml$.hide(), $vars$$14$$.$r$ && this.$_clearDropClasses$($vars$$14$$.$r$));
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_moveMarkerUI$ = function $$oj$$65$$$$TreeDndContext$$$$_moveMarkerUI$$($$obj$$, $styles$$1$$) {
    $styles$$1$$.left += "px";
    $styles$$1$$.top += "px";
    $$obj$$.css($styles$$1$$).show();
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_dndStartDrag$ = function $$oj$$65$$$$TreeDndContext$$$$_dndStartDrag$$($$cnt_$nodes$$1$$, $$node$$5$$, $e$$114$$) {
    var $dnd$$21$$ = this.$_dnd$, $vars$$16$$ = $dnd$$21$$.$vars$, $cons$$9$$ = $oj$$65$$.$TreeDndContext$;
    $vars$$16$$.$o$ = $$cnt_$nodes$$1$$;
    $vars$$16$$.$o$.addClass($cons$$9$$.$_OJ_DRAG$);
    $dnd$$21$$.$nodeDraggedId$ = $$node$$5$$.attr("id");
    try {
      $e$$114$$.currentTarget.unselectable = "on", $e$$114$$.currentTarget.onselectstart = function $$e$$114$$$currentTarget$onselectstart$() {
        return!1;
      }, $e$$114$$.currentTarget.style && ($e$$114$$.currentTarget.style.MozUserSelect = "none");
    } catch ($err$$25$$) {
    }
    this.$component$.$_isTheme$() && $vars$$16$$.$m$ && $vars$$16$$.$m$.addClass("oj-tree-" + this.$component$.$_data$.$themes$.$theme$);
    $$cnt_$nodes$$1$$ = this.$component$.$_$container$;
    $dnd$$21$$.$cof$ = $$cnt_$nodes$$1$$.offset();
    $dnd$$21$$.$cw$ = parseInt($$cnt_$nodes$$1$$.width(), 10);
    $dnd$$21$$.ch = parseInt($$cnt_$nodes$$1$$.height(), 10);
    $dnd$$21$$.$dragStarted$ = !0;
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_dndStopDrag$ = function $$oj$$65$$$$TreeDndContext$$$$_dndStopDrag$$() {
    var $dnd$$22$$ = this.$_dnd$, $vars$$17$$ = $dnd$$22$$.$vars$, $cons$$10$$ = $oj$$65$$.$TreeDndContext$;
    $vars$$17$$.$r$ && this.$_clearDropClasses$($vars$$17$$.$r$);
    "number" != typeof $vars$$17$$.$o$ && $vars$$17$$.$o$ && $vars$$17$$.$o$.removeClass($cons$$10$$.$_OJ_DRAG$);
    $dnd$$22$$.$dragStarted$ = !1;
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_setDataTypes$ = function $$oj$$65$$$$TreeDndContext$$$$_setDataTypes$$($dt$$5$$, $$nodes$$2$$) {
    var $dnd$$23$$ = this.$_dnd$, $cons$$11$$ = $oj$$65$$.$TreeDndContext$, $adata$$1_i$$392$$, $data$$168$$;
    ($adata$$1_i$$392$$ = this.$component$.$__getJson$($$nodes$$2$$)) && ($data$$168$$ = JSON.stringify($adata$$1_i$$392$$));
    if ($dnd$$23$$.$dragDataTypes$) {
      for ($adata$$1_i$$392$$ = 0;$adata$$1_i$$392$$ < $dnd$$23$$.$dragDataTypes$.length;$adata$$1_i$$392$$++) {
        $dt$$5$$.setData($dnd$$23$$.$dragDataTypes$[$adata$$1_i$$392$$], $data$$168$$);
      }
    }
    $dt$$5$$.setData($cons$$11$$.$_DND_INTERNAL_DT$, "0");
    $dnd$$23$$.$pureReorder$ && $dt$$5$$.setData($cons$$11$$.$_DND_INTERNAL_DT_REORDER$, "0");
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_isDtType$ = function $$oj$$65$$$$TreeDndContext$$$$_isDtType$$($dt$$6$$, $type$$102$$) {
    var $aTypes$$ = $dt$$6$$.types, $len$$20$$ = $aTypes$$.length, $i$$393$$;
    for ($i$$393$$ = 0;$i$$393$$ < $len$$20$$;$i$$393$$++) {
      if ($type$$102$$ == $aTypes$$[$i$$393$$]) {
        return!0;
      }
    }
    return!1;
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_isDtAcceptDataTypes$ = function $$oj$$65$$$$TreeDndContext$$$$_isDtAcceptDataTypes$$($dt$$7$$) {
    var $comps$$1$$ = this.$_dnd$.$dropDataTypes$, $ret$$68$$ = !1, $i$$394$$;
    if ($comps$$1$$) {
      for ($ret$$68$$ = !(0 < $comps$$1$$.length), $i$$394$$ = 0;$i$$394$$ < $comps$$1$$.length;$i$$394$$++) {
        if (this.$_isDtType$($dt$$7$$, $comps$$1$$[$i$$394$$])) {
          $ret$$68$$ = !0;
          break;
        }
      }
    } else {
      $ret$$68$$ = !0;
    }
    return $ret$$68$$;
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_checkAddedDataTypes$ = function $$oj$$65$$$$TreeDndContext$$$$_checkAddedDataTypes$$($aTypes$$1_dt$$8$$) {
    var $len$$21$$ = ($aTypes$$1_dt$$8$$ = $aTypes$$1_dt$$8$$.types) && $aTypes$$1_dt$$8$$.length ? $aTypes$$1_dt$$8$$.length : 0, $cons$$12$$ = $oj$$65$$.$TreeDndContext$, $ret$$69$$ = !1, $type$$103$$, $i$$395$$;
    for ($i$$395$$ = 0;$i$$395$$ < $len$$21$$;$i$$395$$++) {
      if ($type$$103$$ = $aTypes$$1_dt$$8$$[$i$$395$$], $type$$103$$ != $cons$$12$$.$_DND_INTERNAL_DT$ && $type$$103$$ != $cons$$12$$.$_DND_INTERNAL_DT_REORDER$) {
        $ret$$69$$ = !0;
        break;
      }
    }
    return $ret$$69$$;
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_clearDropClasses$ = function $$oj$$65$$$$TreeDndContext$$$$_clearDropClasses$$($$var$$) {
    var $cons$$13$$ = $oj$$65$$.$TreeDndContext$;
    $$var$$ && $$var$$.removeClass($cons$$13$$.$_OJ_VALID_DROP$).removeClass($cons$$13$$.$_OJ_INVALID_DROP$).removeClass($cons$$13$$.$_OJ_ACTIVE_DROP$);
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_reset$ = function $$oj$$65$$$$TreeDndContext$$$$_reset$$() {
    var $_dnd$$ = {};
    this.$_dnd$ = $_dnd$$;
    $_dnd$$.reorder = !1;
    $_dnd$$.$pureReorder$ = !1;
    $_dnd$$.$foreign$ = !1;
    $_dnd$$.$dragStarted$ = !1;
    $_dnd$$.$nodeDraggedId$ = null;
    $_dnd$$.$nodeLastEnter$ = null;
    $_dnd$$.$fnDragStart$ = null;
    $_dnd$$.$fnDragEnd$ = null;
    $_dnd$$.$fnDrag$ = null;
    $_dnd$$.$fnDragEnter$ = null;
    $_dnd$$.$fnDragOver$ = null;
    $_dnd$$.$fnDragLeave$ = null;
    $_dnd$$.$fnDragDrop$ = null;
    $_dnd$$.$dragFromEnabled$ = !1;
    $_dnd$$.$dropToEnabled$ = !1;
    $_dnd$$.$dragStartCallback$ = null;
    $_dnd$$.$dragDragCallback$ = null;
    $_dnd$$.$dragDragEndCallback$ = null;
    $_dnd$$.$dropDragEnterCallback$ = null;
    $_dnd$$.$dropDragOverCallback$ = null;
    $_dnd$$.$dropDragLeaveCallback$ = null;
    $_dnd$$.$dragDropCallback$ = null;
    $_dnd$$.$dropDataTypes$ = null;
    $_dnd$$.after = !1;
    $_dnd$$.$inside$ = !1;
    $_dnd$$.before = !1;
    $_dnd$$.off = !1;
    $_dnd$$.$prepared$ = !1;
    $_dnd$$.$openTimerId$ = !1;
    $_dnd$$.$cof$ = !1;
    $_dnd$$.$cw$ = !1;
    $_dnd$$.ch = !1;
    $_dnd$$.$ml_width$ = 100;
    $_dnd$$.$targ_ml_width$ = 100;
    $_dnd$$.$openTimeoutMs$ = 500;
    $_dnd$$.$vars$ = {};
    $_dnd$$.$vars$.$o$ = !1;
    $_dnd$$.$vars$.$r$ = !1;
    $_dnd$$.$vars$.$m$ = !1;
    $_dnd$$.$vars$.$ml$ = !1;
  };
  $oj$$65$$.$TreeDndContext$.prototype.$_trace$ = function $$oj$$65$$$$TreeDndContext$$$$_trace$$($s$$9$$) {
    this.$component$.$_trace$($s$$9$$);
  };
  $oj$$65$$.$TreeDndContext$.$_OJ_DRAGGABLE$ = "oj-draggable";
  $oj$$65$$.$TreeDndContext$.$_OJ_DRAG$ = "oj-drag";
  $oj$$65$$.$TreeDndContext$.$_OJ_ACTIVE_DROP$ = "oj-active-drop";
  $oj$$65$$.$TreeDndContext$.$_OJ_VALID_DROP$ = "oj-valid-drop";
  $oj$$65$$.$TreeDndContext$.$_OJ_INVALID_DROP$ = "oj-invalid-drop";
  $oj$$65$$.$TreeDndContext$.$_OJ_DROP$ = "oj-drop";
  $oj$$65$$.$TreeDndContext$.$_OJT_DROP_MARKER$ = "oj-tree-drop-marker";
  $oj$$65$$.$TreeDndContext$.$_OJT_DROP_MARKER_LINE$ = "oj-tree-drop-marker-line";
  $oj$$65$$.$TreeDndContext$.$_DND_REORDER$ = "reorder";
  $oj$$65$$.$TreeDndContext$.$_DND_DRAG$ = "drag";
  $oj$$65$$.$TreeDndContext$.$_DND_DROP$ = "drop";
  $oj$$65$$.$TreeDndContext$.$_DND_NODE$ = "node";
  $oj$$65$$.$TreeDndContext$.$_DND_DATATYPES$ = "dataTypes";
  $oj$$65$$.$TreeDndContext$.$_DND_DRAGSTART_CB$ = "dragStart";
  $oj$$65$$.$TreeDndContext$.$_DND_DRAGDRAG_CB$ = "drag";
  $oj$$65$$.$TreeDndContext$.$_DND_DRAGEND_CB$ = "dragEnd";
  $oj$$65$$.$TreeDndContext$.$_DND_DROPDRAGENTER_CB$ = "dragEnter";
  $oj$$65$$.$TreeDndContext$.$_DND_DROPDRAGOVER_CB$ = "dragOver";
  $oj$$65$$.$TreeDndContext$.$_DND_DROPDRAGLEAVE_CB$ = "dragLeave";
  $oj$$65$$.$TreeDndContext$.$_DND_DROPDROP_CB$ = "drop";
  $oj$$65$$.$TreeDndContext$.$_DND_INTERNAL_DT$ = "_ojtree";
  $oj$$65$$.$TreeDndContext$.$_DND_INTERNAL_DT_REORDER$ = "_ojtreereorder";
  (function() {
    function $_addKeyFilter$$($obj$$59$$) {
      $_aKeyHandlerStack$$.push($obj$$59$$);
      $$$$60$$($obj$$59$$.$_selector$).keydown($_KeyFilterHandler$$);
    }
    function $_KeyFilterHandler$$($e$$115$$) {
      var $s$$10$$ = "";
      $oj$$65$$.$DomUtils$.$isMetaKeyPressed$($e$$115$$) ? $s$$10$$ += "ctrl+" : $e$$115$$.shiftKey && ($s$$10$$ += "shift+");
      var $key$$172$$ = $e$$115$$.which;
      switch($key$$172$$) {
        case 32:
          $s$$10$$ += "space";
          break;
        case 37:
          $s$$10$$ += "left";
          break;
        case 38:
          $s$$10$$ += "up";
          break;
        case 39:
          $s$$10$$ += "right";
          break;
        case 40:
          $s$$10$$ += "down";
          break;
        case 46:
          $s$$10$$ += "del";
          break;
        case 33:
          $s$$10$$ += "pgup";
          break;
        case 34:
          $s$$10$$ += "pgdn";
          break;
        case 35:
          $s$$10$$ += "end";
          break;
        case 36:
          $s$$10$$ += "home";
          break;
        case 56:
          $s$$10$$ = "*";
          break;
        case 113:
        ;
        case 121:
          $s$$10$$ += "f" + (1 - (112 - $key$$172$$));
      }
      if (0 === $s$$10$$.length || "shift+" == $s$$10$$ || "ctrl+" == $s$$10$$) {
        return!0;
      }
      var $retHandler$$ = null;
      $$$$60$$.each($_aKeyHandlerStack$$, function($i$$396$$, $obj$$60$$) {
        if ($obj$$60$$.$_this$.$_data$.ui.$focused$) {
          return $obj$$60$$.$_this$.$_data$.ui.$touchEvent$ = !1, "shift+f10" == $s$$10$$ ? $obj$$60$$.$_this$.$_data$.menu.$activenode$ = $obj$$60$$.$_this$.$_data$.ui.$hovered$ : $obj$$60$$.$_handler$[$s$$10$$] && ($e$$115$$.preventDefault(), $retHandler$$ = $obj$$60$$.$_handler$[$s$$10$$].call($obj$$60$$.$_this$, $e$$115$$)), !1;
        }
      });
      if (null != $retHandler$$) {
        return $retHandler$$;
      }
    }
    function $_removeKeyFilter$$($selector$$38$$) {
      $$$$60$$.each($_aKeyHandlerStack$$, function($i$$397$$) {
        if ($_aKeyHandlerStack$$[$i$$397$$].$_selector$ === $selector$$38$$) {
          return $$$$60$$($selector$$38$$).off("keydown"), $_aKeyHandlerStack$$[$i$$397$$] = null, $_aKeyHandlerStack$$.splice($i$$397$$, 1), !1;
        }
      });
    }
    function $isPureObjEmpty$$($o$$13$$) {
      var $ret$$70$$ = !0, $prop$$72$$;
      for ($prop$$72$$ in $o$$13$$) {
        if ($o$$13$$.hasOwnProperty($prop$$72$$)) {
          $ret$$70$$ = !1;
          break;
        }
      }
      return $ret$$70$$;
    }
    function $_addSheet$$($opts$$37$$) {
      var $tmp$$3$$ = !1, $isNew$$7$$ = !0;
      $opts$$37$$.$str$ && ($opts$$37$$.title && ($tmp$$3$$ = $$$$60$$("style[id\x3d'" + $opts$$37$$.title + "-stylesheet']")[0]), $tmp$$3$$ ? $isNew$$7$$ = !1 : ($tmp$$3$$ = document.createElement("style"), $tmp$$3$$.setAttribute("type", "text/css"), $opts$$37$$.title && $tmp$$3$$.setAttribute("id", $opts$$37$$.title + "-stylesheet")), $tmp$$3$$.styleSheet ? $isNew$$7$$ ? (document.getElementsByTagName("head")[0].appendChild($tmp$$3$$), $tmp$$3$$.styleSheet.cssText = $opts$$37$$.$str$) : $tmp$$3$$.styleSheet.cssText = 
      $tmp$$3$$.styleSheet.cssText + " " + $opts$$37$$.$str$ : ($tmp$$3$$.appendChild(document.createTextNode($opts$$37$$.$str$)), document.getElementsByTagName("head")[0].appendChild($tmp$$3$$)));
    }
    var $_arMenuCmdMap$$1$$ = {cut:"ojtreecut", copy:"ojtreecopy", paste:"ojtreepaste", remove:"ojtreeremove", rename:"ojtreerename"}, $_arMenuKeyMap$$1$$ = {cut:"labelCut", copy:"labelCopy", paste:"labelPaste", remove:"labelRemove", rename:"labelRename"}, $scrollbar_width$$, $e1$$2$$, $e2$$2$$;
    $$$$60$$(function() {
      /msie/.test(navigator.userAgent.toLowerCase()) ? ($e1$$2$$ = $$$$60$$('\x3ctextarea cols\x3d"10" rows\x3d"2"\x3e\x3c/textarea\x3e').css({position:"absolute", top:-1E3, left:0}).appendTo("body"), $e2$$2$$ = $$$$60$$('\x3ctextarea cols\x3d"10" rows\x3d"2" style\x3d"overflow: hidden;"\x3e\x3c/textarea\x3e').css({position:"absolute", top:-1E3, left:0}).appendTo("body"), $scrollbar_width$$ = $e1$$2$$.width() - $e2$$2$$.width(), $e1$$2$$.add($e2$$2$$).remove()) : ($e1$$2$$ = $$$$60$$("\x3cdiv /\x3e").css({width:100, 
      height:100, overflow:"auto", position:"absolute", top:-1E3, left:0}).prependTo("body").append("\x3cdiv /\x3e").find("div").css({width:"100%", height:200}), $scrollbar_width$$ = 100 - $e1$$2$$.width(), $e1$$2$$.parent().remove());
    });
    var $_aKeyHandlerStack$$ = [], $_instance$$ = -1;
    $oj$$65$$.$__registerWidget$("oj.ojTree", $$$$60$$.oj.baseComponent, {widgetEventPrefix:"oj", defaultElement:"\x3cdiv\x3e", options:{dnd:{reorder:"disable"}, expandParents:!1, initExpanded:null, $initLoaded$:[], selection:[], selectionMode:"single", selectedParentCollapse:!1, selectedParentExpand:!0, selectPrevOnDelete:!1, data:null, emptyText:null, icons:!0, types:null, before:null, collapse:null, create:null, collapseAll:null, cut:null, dehover:null, remove:null, destroy:null, expand:null, 
    expandAll:null, hover:null, loaded:null, move:null, optionChange:null, paste:null, refresh:null, rename:null}, collapse:function($node$$113$$, $skipAnim$$) {
      var $dur$$ = ($skipAnim$$ = $skipAnim$$ || !1) ? 0 : this.$_animDuration$;
      $node$$113$$ = this.$_getNode$($node$$113$$);
      if (!$node$$113$$.length || -1 === $node$$113$$ || !$node$$113$$.hasClass($TreeUtils$$.$_OJ_EXPANDED$) || this.$_data$.$core$.locked || $node$$113$$.hasClass($TreeUtils$$.$_OJ_DISABLED$)) {
        return!1;
      }
      var $rslt$$ = this.$_emitEvent$({obj:$node$$113$$, func:"collapse"}, "before");
      if ("boolean" != typeof $rslt$$ || $rslt$$) {
        $node$$113$$.removeClass($TreeUtils$$.$_OJ_EXPANDED$).addClass($TreeUtils$$.$_OJ_COLLAPSED$).attr("aria-expanded", "false"), $$$$60$$($node$$113$$.children()[0]).removeClass($TreeUtils$$.$_OJ_SELECTED$).addClass("oj-default"), !$skipAnim$$ && $dur$$ ? this.$_slide$($node$$113$$, !0) : this.$_transitionEnd$($$$$60$$($node$$113$$.children("UL")[0]), $node$$113$$);
      }
    }, $_slide$:function($node$$114$$, $bSlideUp$$) {
      var $$ul$$2$$, $hNow$$, $hFinal$$;
      $$ul$$2$$ = $$$$60$$($node$$114$$.children("ul"));
      this.$_isSafari$ ? $$ul$$2$$[0].addEventListener("webkitTransitionEnd", this.$_proxyTransitionEndHandler$) : $$ul$$2$$[0].addEventListener("transitionend", this.$_proxyTransitionEndHandler$);
      $bSlideUp$$ ? ($hNow$$ = $$ul$$2$$[0].offsetHeight, $hFinal$$ = 0) : ($hNow$$ = 0, $hFinal$$ = this.$_getElemHeight$($$ul$$2$$[0]));
      $$ul$$2$$.css("max-height", $hNow$$ + "px");
      $$ul$$2$$.css("overflow", "hidden");
      $bSlideUp$$ || ($$ul$$2$$[0].style.display = "block");
      setTimeout(function() {
        $$ul$$2$$.addClass("oj-tree-transition");
        $$ul$$2$$.css("max-height", $hFinal$$ + "px");
      }, 20);
    }, $_getElemHeight$:function($el$$17$$) {
      var $parent$$44$$, $nextSib$$, $h$$7$$, $disp$$, $div$$8$$ = $$$$60$$("\x3cdiv style\x3d'position: absolute'\x3e");
      $parent$$44$$ = $el$$17$$.parentNode;
      $nextSib$$ = $el$$17$$.nextSibling;
      $parent$$44$$.removeChild($el$$17$$);
      $disp$$ = $el$$17$$.style.display;
      $el$$17$$.style.display = "block";
      $div$$8$$.append($el$$17$$);
      this.$_$container$[0].appendChild($div$$8$$[0]);
      $h$$7$$ = $el$$17$$.offsetHeight || $el$$17$$.scrollHeight;
      $el$$17$$.style.display = $disp$$;
      this.$_$container$[0].removeChild($div$$8$$[0]);
      $div$$8$$[0].removeChild($el$$17$$);
      $nextSib$$ ? $parent$$44$$.insertBefore($el$$17$$, $nextSib$$) : $parent$$44$$.appendChild($el$$17$$);
      return $h$$7$$ + 10;
    }, $_transitionEndHandler$:function($$ul$$3_e$$116$$) {
      $$ul$$3_e$$116$$ = $$$$60$$($$ul$$3_e$$116$$.target);
      var $node$$115$$ = $$ul$$3_e$$116$$.closest("li");
      this.$_isSafari$ ? $$ul$$3_e$$116$$[0].removeEventListener("webkitTransitionEnd", this.$_proxyTransitionEndHandler$) : $$ul$$3_e$$116$$[0].removeEventListener("transitionend", this.$_proxyTransitionEndHandler$);
      $$ul$$3_e$$116$$.removeClass("oj-tree-transition");
      this.$_transitionEnd$($$ul$$3_e$$116$$, $node$$115$$);
    }, $_transitionEnd$:function($$ul$$4$$, $node$$116$$) {
      $node$$116$$.hasClass($TreeUtils$$.$_OJ_COLLAPSED$) ? ($$ul$$4$$[0].style.display = "none", $$ul$$4$$.css("max-height", ""), this.$_emitEvent$({obj:$node$$116$$}, "collapse"), this.after_close($node$$116$$)) : ($$ul$$4$$[0].style.display = "block", $$ul$$4$$.css("max-height", ""), this.$_emitEvent$({obj:$node$$116$$}, "expand"));
    }, collapseAll:function($node$$117$$, $anim$$) {
      var $origTarg$$ = $node$$117$$ ? $node$$117$$ : -1, $_this$$1$$ = this;
      if (!this.$_data$.$core$.locked && (($node$$117$$ = $node$$117$$ ? this.$_getNode$($node$$117$$) : this.$_$container$) && -1 !== $origTarg$$ && ($origTarg$$ = $node$$117$$), $node$$117$$ && -1 !== $origTarg$$ || ($node$$117$$ = this.$_$container_ul$), !$node$$117$$.hasClass($TreeUtils$$.$_OJ_DISABLED$))) {
        var $subject$$;
        -1 !== $origTarg$$ && this.isExpanded($node$$117$$) && ($subject$$ = $node$$117$$[0]);
        var $objs$$ = $node$$117$$.find("li.oj-expanded");
        $objs$$.length && $objs$$.each(function() {
          $_this$$1$$.collapse(this, !$anim$$);
        });
        $subject$$ && (this.collapse($subject$$, !$anim$$), $objs$$.splice(0, 0, $subject$$));
        $objs$$.length && this.$_emitEvent$({obj:$objs$$, targ:$origTarg$$}, "collapseAll");
      }
    }, expand:function($node$$118$$, $skipAnim$$1$$) {
      this.$_expand$($node$$118$$, !1, $skipAnim$$1$$);
    }, expanded:function($nodes$$4$$, $skipAnim$$2$$) {
      var $exlr$$, $exlen$$, $_this$$2$$ = this;
      if ($nodes$$4$$ && "array" === $$$$60$$.type($nodes$$4$$)) {
        if (this.$_data$.$core$.locked) {
          return null;
        }
        $exlen$$ = $nodes$$4$$.length;
        $$$$60$$.each($nodes$$4$$, function($i$$398$$, $val$$64$$) {
          $_this$$2$$.$_expand$($val$$64$$, !1, $skipAnim$$2$$);
        });
        return null;
      }
      $nodes$$4$$ = this.$_$container_ul$.find("li.oj-expanded");
      $exlen$$ = $nodes$$4$$.length;
      $exlr$$ = [];
      for (var $n$$28$$ = 0;$n$$28$$ < $exlen$$;$n$$28$$++) {
        $exlr$$.push($nodes$$4$$[$n$$28$$]);
      }
      return $$$$60$$($exlr$$);
    }, expandAll:function($node$$119$$, $anim$$1$$) {
      this.$_expandAll$($node$$119$$, $anim$$1$$);
    }, toggleExpand:function($node$$120$$, $skipAnim$$3$$) {
      if (($node$$120$$ = this.$_getNode$($node$$120$$)) && $node$$120$$.length && -1 !== $node$$120$$ && !$node$$120$$.hasClass($TreeUtils$$.$_OJ_DISABLED$) && !this.$_data$.$core$.locked) {
        if ($node$$120$$.hasClass($TreeUtils$$.$_OJ_COLLAPSED$)) {
          return this.expand($node$$120$$, $skipAnim$$3$$);
        }
        if ($node$$120$$.hasClass($TreeUtils$$.$_OJ_EXPANDED$)) {
          return this.collapse($node$$120$$, $skipAnim$$3$$);
        }
      }
    }, deselect:function($node$$121$$) {
      var $prevSelections$$ = this.options.selection.slice(0);
      this.$_deselect$($node$$121$$);
      this.$_fireOptionChangeEvent$("selection", $prevSelections$$, null, null);
    }, deselectAll:function($context$$163$$) {
      if (!this.$_data$.$core$.locked) {
        var $prevSelections$$1$$ = this.options.selection.slice(0);
        this.$_deselectAll$($context$$163$$);
        this.$_fireOptionChangeEvent$("selection", $prevSelections$$1$$, null, null);
      }
    }, select:function($node$$122$$) {
      this.$_select$($node$$122$$, !0);
    }, toggleSelect:function($node$$123$$) {
      $node$$123$$ = this.$_getNode$($node$$123$$);
      if (!$node$$123$$.length || $node$$123$$.hasClass($TreeUtils$$.$_OJ_DISABLED$) || this.$_data$.$core$.locked) {
        return!1;
      }
      this.isSelected($node$$123$$) ? this.deselect($node$$123$$) : this.$_select$($node$$123$$, !0);
      return!0;
    }, isCollapsed:function($node$$124$$) {
      return($node$$124$$ = this.$_getNode$($node$$124$$)) && -1 !== $node$$124$$ && $node$$124$$.hasClass($TreeUtils$$.$_OJ_COLLAPSED$);
    }, isExpanded:function($node$$125$$) {
      return($node$$125$$ = this.$_getNode$($node$$125$$)) && -1 !== $node$$125$$ && $node$$125$$.hasClass($TreeUtils$$.$_OJ_EXPANDED$);
    }, isLeaf:function($node$$126$$) {
      return this.$_isLeaf$($node$$126$$);
    }, isSelected:function($n$$29_node$$127$$) {
      $n$$29_node$$127$$ = this.$_getNode$($n$$29_node$$127$$);
      var $r$$2$$ = !1;
      $n$$29_node$$127$$ && $n$$29_node$$127$$.length && this.$_data$.ui.selected && ($r$$2$$ = 0 <= this.$_data$.ui.selected.index($n$$29_node$$127$$));
      return $r$$2$$;
    }, create:function($refnode$$, $position$$34$$, $data$$169$$) {
      var $node$$128$$, $ar$$1$$, $i$$399$$;
      $ar$$1$$ = $$$$60$$.isArray($data$$169$$);
      if (!$ar$$1$$ || 1 == $data$$169$$.length) {
        return $node$$128$$ = this.$_createNode$($refnode$$, $position$$34$$, $ar$$1$$ ? $data$$169$$[0] : $data$$169$$), this.$_getDndContext$().$_dndFinishSelection$($node$$128$$), $node$$128$$;
      }
      $ar$$1$$ = [];
      if ("before" != $position$$34$$) {
        for ($i$$399$$ = $data$$169$$.length - 1;0 <= $i$$399$$;$i$$399$$--) {
          $node$$128$$ = this.$_createNode$($refnode$$, $position$$34$$, $data$$169$$[$i$$399$$]), $ar$$1$$.unshift($node$$128$$[0]), this.$_getDndContext$().$_dndFinishSelection$($node$$128$$);
        }
      } else {
        for ($i$$399$$ = 0;$i$$399$$ < $data$$169$$.length;$i$$399$$++) {
          $node$$128$$ = this.$_createNode$($refnode$$, $position$$34$$, $data$$169$$[$i$$399$$]), $ar$$1$$.push($node$$128$$[0]), this.$_getDndContext$().$_dndFinishSelection$($node$$128$$);
        }
      }
      return $$$$60$$($ar$$1$$);
    }, remove:function($node$$129$$) {
      $node$$129$$ = this.$_getNode$($node$$129$$);
      if (!$node$$129$$.length || $node$$129$$.hasClass($TreeUtils$$.$_OJ_DISABLED$) || this.$_data$.$core$.locked) {
        return!1;
      }
      var $p$$7_rslt$$1$$ = this.$_emitEvent$({obj:$node$$129$$, func:"remove"}, "before");
      if ("boolean" == typeof $p$$7_rslt$$1$$ && !$p$$7_rslt$$1$$) {
        return!1;
      }
      this.$__rollback$();
      var $p$$7_rslt$$1$$ = this.$_getParent$($node$$129$$), $prev$$2$$ = $$$$60$$([]), $t$$3$$ = this, $sib$$ = this.$_getPrev$($node$$129$$);
      $node$$129$$.each(function() {
        $prev$$2$$ = $prev$$2$$.add($t$$3$$.$_getPrev$(this));
      });
      $node$$129$$ = $node$$129$$.detach();
      -1 !== $p$$7_rslt$$1$$ && 0 === $p$$7_rslt$$1$$.find("\x3e ul \x3e li").length && $p$$7_rslt$$1$$.removeClass("oj-expanded oj-collapsed").addClass("oj-tree-leaf").removeAttr("aria-expanded");
      this.$_cleanNode$($p$$7_rslt$$1$$);
      this.$_emitEvent$({obj:$node$$129$$, prev:$sib$$, parent:$p$$7_rslt$$1$$}, "remove");
      return $node$$129$$;
    }, getText:function($node$$130$$) {
      $node$$130$$ = this.$_getNode$($node$$130$$);
      if (!$node$$130$$.length) {
        return!1;
      }
      $node$$130$$ = $node$$130$$.children("a:eq(0)");
      $node$$130$$ = $node$$130$$.find("span:eq(0)");
      return $node$$130$$[0].textContent;
    }, rename:function($node$$131$$, $text$$19$$) {
      this.$_renameNode$($node$$131$$, $text$$19$$);
    }, hover:function($node$$132$$) {
      if (!this.$_data$.menu.$activenode$ && ($node$$132$$ = this.$_getNode$($node$$132$$), $node$$132$$.length && !$node$$132$$.hasClass($TreeUtils$$.$_OJ_DISABLED$) && !this.$_data$.$core$.locked && !$node$$132$$.hasClass($TreeUtils$$.$_OJ_HOVER$))) {
        var $rslt$$2$$ = this.$_emitEvent$({obj:$node$$132$$, func:"hover"}, "before");
        if ("boolean" != typeof $rslt$$2$$ || $rslt$$2$$) {
          $node$$132$$.hasClass($TreeUtils$$.$_OJ_HOVER$) || this.dehover(), this.$_data$.ui.$hovered$ = $node$$132$$.children("a").addClass($TreeUtils$$.$_OJ_HOVER$).parent(), this.$_$container_ul$.attr("aria-activedescendant", this.$_data$.ui.$hovered$.attr("id")), this.$_fix_scroll$($node$$132$$), this.$_emitEvent$({obj:$node$$132$$}, "hover");
        }
      }
    }, dehover:function() {
      if (!this.$_data$.menu.$activenode$) {
        var $obj$$61$$ = this.$_data$.ui.$hovered$, $p$$8$$;
        if ($obj$$61$$ && $obj$$61$$.length && !$obj$$61$$.hasClass($TreeUtils$$.$_OJ_DISABLED$) && !this.$_data$.$core$.locked) {
          $p$$8$$ = $obj$$61$$.find("a.oj-hover");
          if (!$p$$8$$.length && ($p$$8$$ = this.$_$container_ul$.find("a.oj-hover"), !$p$$8$$.length)) {
            return;
          }
          $p$$8$$.removeClass($TreeUtils$$.$_OJ_HOVER$).parent();
          this.$_$container_ul$.removeAttr("aria-activedescendant");
          this.$_data$.ui.$hovered$ = null;
          void 0 != $obj$$61$$.attr("id") && this.$_emitEvent$({obj:$obj$$61$$}, "dehover");
        }
      }
    }, getPath:function($node$$133$$, $idMode$$) {
      var $p$$9$$ = [], $_this$$3$$ = this;
      $node$$133$$ = this.$_getNode$($node$$133$$);
      if (-1 === $node$$133$$ || !$node$$133$$ || !$node$$133$$.length) {
        return!1;
      }
      $node$$133$$.parentsUntil(".oj-tree", "li").each(function() {
        $p$$9$$.push($idMode$$ ? this.id : $_this$$3$$.getText(this));
      });
      $p$$9$$.reverse();
      $p$$9$$.push($idMode$$ ? $node$$133$$.attr("id") : this.getText($node$$133$$));
      return $p$$9$$;
    }, getRoot:function() {
      return this.$_$container$.children("ul:eq(0)");
    }, refresh:function($node$$134$$) {
      this._super();
      this.$_data$.$core$.locked || this.$_refresh$($node$$134$$ ? $node$$134$$ : -1);
    }, move:function($node$$135$$, $refnode$$1$$, $position$$35$$, $iscopy$$) {
      this.$_moveNode$($node$$135$$, $refnode$$1$$, $position$$35$$, $iscopy$$);
    }, getType:function($node$$136$$) {
      return this.$_getType$($node$$136$$);
    }, setType:function($node$$137$$, $str$$20$$) {
      return this.$_setType$($node$$137$$, $str$$20$$);
    }, getNodeBySubId:function($locator$$61$$) {
      return $locator$$61$$ ? this.$_processSubId$($locator$$61$$) : this.element ? this.element[0] : null;
    }, getSubIdByNode:function($node$$138$$) {
      return this.$_getSubIdFromNodeElem$($node$$138$$);
    }, getContextByNode:function($node$$139$$) {
      var $bNode$$2$$, $bTree$$;
      $node$$139$$ = this.$_getNode$(null == $node$$139$$ || void 0 == $node$$139$$ ? 0 : $node$$139$$);
      $bNode$$2$$ = -1 != $node$$139$$ && 0 < $node$$139$$.length;
      $bTree$$ = -1 == $node$$139$$;
      return $bNode$$2$$ || $bTree$$ ? {subId:$bNode$$2$$ ? "oj-tree-node" : "oj-tree", node:$bNode$$2$$ ? $node$$139$$ : !1, leaf:$bNode$$2$$ ? this.$_isLeaf$($node$$139$$) : !1} : null;
    }, getParent:function($l$$11_node$$140$$) {
      return($l$$11_node$$140$$ = this.$_getParent$($l$$11_node$$140$$)) && 0 < $l$$11_node$$140$$.length ? $l$$11_node$$140$$ : null;
    }, getPrevSibling:function($l$$12_node$$141$$) {
      return($l$$12_node$$141$$ = this.$_getPrev$($l$$12_node$$141$$, !0)) && 0 < $l$$12_node$$141$$.length ? $l$$12_node$$141$$ : null;
    }, getNextSibling:function($l$$13_node$$142$$) {
      return($l$$13_node$$142$$ = this.$_getNext$($l$$13_node$$142$$, !0)) && 0 < $l$$13_node$$142$$.length ? $l$$13_node$$142$$ : null;
    }, getChildren:function($c$$48_node$$143$$) {
      return($c$$48_node$$143$$ = ($c$$48_node$$143$$ = this.$_getChildren$($c$$48_node$$143$$ ? $c$$48_node$$143$$ : -1)) && $c$$48_node$$143$$.length ? $c$$48_node$$143$$.not("." + $TreeUtils$$.$_OJ_TEMPNODE$) : $c$$48_node$$143$$) && 0 < $c$$48_node$$143$$.length ? $c$$48_node$$143$$ : null;
    }, scrollIntoView:function($node$$144_obj$$62$$, $alignTo_toTop$$, $setActive$$) {
      $node$$144_obj$$62$$ ? ($node$$144_obj$$62$$ = $node$$144_obj$$62$$.node, $node$$144_obj$$62$$ = this.$_getNode$($node$$144_obj$$62$$)) : $node$$144_obj$$62$$ = -1;
      -1 == $node$$144_obj$$62$$ && ($node$$144_obj$$62$$ = this.$_$container$.find("\x3e ul \x3e li:first-child"));
      if ($node$$144_obj$$62$$ && $node$$144_obj$$62$$.length) {
        return $alignTo_toTop$$ = "top" == $alignTo_toTop$$, $setActive$$ && (this.$_$container_ul$.focus(), this.hover($node$$144_obj$$62$$)), $node$$144_obj$$62$$[0].scrollIntoView($alignTo_toTop$$), this;
      }
    }, _ComponentCreate:function() {
      this._super();
      this.$_index$ = this.$_newIndex$();
      this.$_elemId$ = this.element.attr("id");
      void 0 === this.$_elemId$ && (this.$_elemId$ = "oj-tree-" + this.$_getIndex$(), this.element.attr("id", this.$_elemId$));
      this.$_elemId$ = "#" + this.$_elemId$;
      this.$_$container$ = this.element;
      this.$_$container_ul$ = null;
      this.$_data$ = {};
      this.$_tds$ = null;
      this.$_isRtl$ = "rtl" === this.$_GetReadingDirection$();
      this.$_isTouch$ = $oj$$65$$.$DomUtils$.$isTouchSupported$();
      this.$_initTree$();
      if (this.$_animDuration$ = this.$_getAnimDuration$()) {
        this.$_isSafari$ = $oj$$65$$.$AgentUtils$.$getAgentInfo$().browser === $oj$$65$$.$AgentUtils$.$BROWSER$.$SAFARI$, this.$_proxyTransitionEndHandler$ = $$$$60$$.proxy(this.$_transitionEndHandler$, this);
      }
      this.$_start$();
    }, _destroy:function() {
      this.$_clearTree$();
      this.$_data$.html.$markup_ul$ && (this.$_$container$.append(this.$_data$.html.$markup_ul$), this.$_data$.html.$markup_div$.remove(), this.$_data$.html.$markup_div$ = !1, this.$_data$.html.$useExistingMarkup$ = !1);
      this.$_data$.$ds$.type = 0;
      this._super();
    }, _setOption:function($key$$173$$, $newval$$1$$, $flags$$52$$) {
      var $val$$65$$;
      if ("selection" === $key$$173$$) {
        $newval$$1$$ = "string" == typeof $newval$$1$$ ? [$newval$$1$$] : $newval$$1$$ && $newval$$1$$.length ? $newval$$1$$ : [], this.$_data$.$core$.$suppressSelectEvent$ = !0, this.$_handleSelectionOptionChange$($newval$$1$$), this.$_data$.$core$.$suppressSelectEvent$ = !1, $newval$$1$$ = this.$_getSelected$();
      } else {
        if ("selectionMode" === $key$$173$$) {
          "none" === $newval$$1$$ ? $val$$65$$ = 0 : "single" === $newval$$1$$ ? $val$$65$$ = 1 : "multiple" === $newval$$1$$ ? $val$$65$$ = -1 : ($val$$65$$ = 0, $newval$$1$$ = "none"), $val$$65$$ != this.$_data$.$core$.$selectMode$ && (this.$_data$.$core$.$selectMode$ = $val$$65$$);
        } else {
          if ("icons" === $key$$173$$) {
            "boolean" == $$$$60$$.type($newval$$1$$) && $newval$$1$$ != this.$_data$.$themes$.icons && ((this.$_data$.$themes$.icons = $newval$$1$$) ? this.$_showIcons$() : this.$_hideIcons$());
          } else {
            if ("contextMenu" === $key$$173$$) {
              this.$_clearMenu$(), $newval$$1$$ && this.$_initMenu$($newval$$1$$);
            } else {
              if ("disabled" === $key$$173$$) {
                this.$_handleDisabledChanged$($newval$$1$$);
              } else {
                if ("data" === $key$$173$$) {
                  this._super($key$$173$$, $newval$$1$$, $flags$$52$$);
                  this.$_initDSOpts$();
                  this.$_initDataSource$();
                  this.$_initExpandedOpts$();
                  this.$_loadNodes$();
                  return;
                }
                if ("dnd" === $key$$173$$) {
                  this._super($key$$173$$, $newval$$1$$, $flags$$52$$);
                  this.$_getDndContext$().$handleDnDOptionChange$();
                  return;
                }
                "emptyText" == $key$$173$$ && ($newval$$1$$ = this.$_escapeHtml$($newval$$1$$));
              }
            }
          }
        }
      }
      this._super($key$$173$$, $newval$$1$$, $flags$$52$$);
    }, $_CompareOptionValues$:function($option$$39$$, $value1$$10$$, $value2$$9$$) {
      return "selection" === $option$$39$$ ? this.$_compareSelectionValues$($value1$$10$$, $value2$$9$$) : this._superApply(arguments);
    }, $_compareSelectionValues$:function($value1$$11$$, $value2$$10$$) {
      var $i$$400$$, $j$$45$$, $id$$57$$, $len$$22$$, $len2$$, $bDiff$$ = !1, $bInList$$ = !1;
      $len$$22$$ = $value1$$11$$ && $value1$$11$$.length ? $value1$$11$$.length : 0;
      $len2$$ = $value2$$10$$ && $value2$$10$$.length ? $value2$$10$$.length : 0;
      if ($len$$22$$ !== $len2$$) {
        $bDiff$$ = !0;
      } else {
        if (0 == $len$$22$$ && 0 === $len2$$) {
          $bDiff$$ = !1;
        } else {
          for ($i$$400$$ = 0;$i$$400$$ < $len$$22$$;$i$$400$$++) {
            $id$$57$$ = $$$$60$$($value1$$11$$[$i$$400$$]).attr("id");
            $bInList$$ = !1;
            for ($j$$45$$ = 0;$j$$45$$ < $len2$$;$j$$45$$++) {
              if ($id$$57$$ == $$$$60$$($value2$$10$$[$j$$45$$]).attr("id")) {
                $bInList$$ = !0;
                break;
              }
            }
            if (!$bInList$$) {
              $bDiff$$ = !0;
              break;
            }
          }
        }
      }
      return!$bDiff$$;
    }, $_clearTree$:function() {
      this.$_TreeDndContext$ && (this.$_TreeDndContext$.$_closedown$(), this.$_TreeDndContext$ = null);
      var $n$$30$$ = this.$_getIndex$();
      this.$_$container$.unbind(".oj-tree").undelegate(".oj-tree").removeData("oj-tree-instance-id").find("[class^\x3d'oj-tree']").addBack().attr("class", function() {
        return this.className.replace(/oj-tree[^ ]*|$/ig, "");
      });
      var $cl$$ = this.$_$container$.attr("class"), $cl$$ = $cl$$.trim();
      0 === $cl$$.length && this.$_$container$.removeAttr("class");
      $_removeKeyFilter$$(this.$_$container_ul$);
      $$$$60$$(document).unbind(".oj-tree-" + $n$$30$$).undelegate(".oj-tree-" + $n$$30$$);
      this.$_$container_ul$.remove();
      this.$_$container_ul$ = null;
    }, $_getNode$:function($obj$$63$$, $allowMultiple$$) {
      if ("undefined" === typeof $obj$$63$$ || null === $obj$$63$$) {
        return $allowMultiple$$ ? this.$_data$.ui.selected : this.$_data$.ui.$lastSelected$;
      }
      var $$obj$$1$$ = $$$$60$$($obj$$63$$, this.$_$container$);
      if ($$obj$$1$$.is(".oj-tree") || -1 === $obj$$63$$) {
        return-1;
      }
      $$obj$$1$$ = $$obj$$1$$.closest("li", this.$_$container$);
      return $$obj$$1$$.length ? $$obj$$1$$ : !1;
    }, $_getPrev$:function($obj$$64$$, $strict$$) {
      $obj$$64$$ = this.$_getNode$($obj$$64$$);
      if (-1 === $obj$$64$$) {
        return this.$_$container$.find("\x3e ul \x3e li:last-child");
      }
      if (!$obj$$64$$.length) {
        return!1;
      }
      if ($strict$$) {
        return 0 < $obj$$64$$.prevAll("li").length ? $obj$$64$$.prevAll("li:eq(0)") : !1;
      }
      if ($obj$$64$$.prev("li").length) {
        for ($obj$$64$$ = $obj$$64$$.prev("li").eq(0);$obj$$64$$.hasClass($TreeUtils$$.$_OJ_EXPANDED$);) {
          $obj$$64$$ = $obj$$64$$.children("ul:eq(0)").children("li:last");
        }
        return $obj$$64$$;
      }
      var $o$$14$$ = $obj$$64$$.parentsUntil(".oj-tree", "li:eq(0)");
      return $o$$14$$.length ? $o$$14$$ : !1;
    }, $_getNext$:function($obj$$65$$, $strict$$1$$) {
      $obj$$65$$ = this.$_getNode$($obj$$65$$);
      return-1 === $obj$$65$$ ? this.$_$container$.find("\x3e ul \x3e li:first-child") : $obj$$65$$.length ? $strict$$1$$ ? 0 < $obj$$65$$.nextAll("li").size() ? $obj$$65$$.nextAll("li:eq(0)") : !1 : $obj$$65$$.hasClass($TreeUtils$$.$_OJ_EXPANDED$) ? $obj$$65$$.find("li:eq(0)") : 0 < $obj$$65$$.nextAll("li").size() ? $obj$$65$$.nextAll("li:eq(0)") : $obj$$65$$.parentsUntil(".oj-tree", "li").next("li").eq(0) : !1;
    }, $_getParent$:function($o$$15_obj$$66$$) {
      $o$$15_obj$$66$$ = this.$_getNode$($o$$15_obj$$66$$);
      if (-1 == $o$$15_obj$$66$$ || !$o$$15_obj$$66$$.length) {
        return!1;
      }
      $o$$15_obj$$66$$ = $o$$15_obj$$66$$.parentsUntil(".oj-tree", "li:eq(0)");
      return $o$$15_obj$$66$$.length ? $o$$15_obj$$66$$ : -1;
    }, $_getChildren$:function($obj$$67$$) {
      $obj$$67$$ = this.$_getNode$($obj$$67$$);
      return-1 === $obj$$67$$ ? this.$_$container$.children("ul:eq(0)").children("li") : $obj$$67$$.length ? $obj$$67$$.children("ul:eq(0)").children("li") : !1;
    }, $_isLeaf$:function($node$$145$$) {
      return($node$$145$$ = this.$_getNode$($node$$145$$)) && -1 !== $node$$145$$ && $node$$145$$.hasClass("oj-tree-leaf");
    }, $_getNodeElem$:function($el$$18_node$$146$$) {
      $el$$18_node$$146$$ = this.$_$container_ul$.find($el$$18_node$$146$$);
      var $ret$$71$$ = !1;
      $el$$18_node$$146$$ && $el$$18_node$$146$$.length && 0 < $el$$18_node$$146$$.length && $$$$60$$($el$$18_node$$146$$).is("li") && ($ret$$71$$ = $el$$18_node$$146$$);
      return $ret$$71$$;
    }, $_reference$:function($node$$147$$, $o$$16$$) {
      var $ctor$$2_div$$9$$ = $node$$147$$.parents("div").eq(0);
      ($ctor$$2_div$$9$$ = $oj$$65$$.Components.$getWidgetConstructor$($ctor$$2_div$$9$$)) && $o$$16$$ && $ctor$$2_div$$9$$("getCI", $o$$16$$);
      return this;
    }, getCI:function($o$$17$$) {
      $o$$17$$.$ot$ = this;
    }, $_applyDefaults$:function($to$$4$$, $from$$4$$) {
      void 0 != $to$$4$$ && void 0 != $from$$4$$ && $$$$60$$.each($from$$4$$, function($prop$$73$$, $val$$66$$) {
        void 0 == $to$$4$$[$prop$$73$$] && ($to$$4$$[$prop$$73$$] = $val$$66$$);
      });
    }, $_handleDisabledChanged$:function($newval$$2$$) {
      var $curState$$;
      "undefined" !== typeof $newval$$2$$ && (($curState$$ = this.$_$container_ul$.hasClass($TreeUtils$$.$_OJ_DISABLED$)) || ($curState$$ = !1), $curState$$ != $newval$$2$$ && ($newval$$2$$ ? (this.$_$container_ul$.addClass($TreeUtils$$.$_OJ_DISABLED$), this.$_$container_ul$.prop("disabled", !0)) : (this.$_$container_ul$.removeClass($TreeUtils$$.$_OJ_DISABLED$), this.$_$container_ul$.prop("disabled", !1)), this.$_treeDisable$($newval$$2$$)));
    }, $_treeDisable$:function($lstate$$) {
      $lstate$$ ? (this.$_data$.$core$.locked = !0, this.$_data$.ui.opacity = this.$_$container$.children("ul").css("opacity"), this.$_$container_ul$.addClass($TreeUtils$$.$_OJ_DISABLED$).css("opacity", "0.9")) : (this.$_data$.$core$.locked = !1, this.$_$container_ul$.removeClass($TreeUtils$$.$_OJ_DISABLED$).css("opacity", this.$_data$.ui.opacity));
    }, $_isTreeDisabled$:function() {
      return this.$_data$.$core$.locked;
    }, $_handleSelectionOptionChange$:function($aSelected_newSels$$) {
      var $sels$$ = $aSelected_newSels$$.slice(0), $cur$$2$$ = [], $_this$$5$$ = this, $$elem$$3$$, $id$$58$$, $inList$$, $len$$23$$;
      $$$$60$$.grep($sels$$, function($node$$148$$, $i$$401$$) {
        if ($$elem$$3$$ = $_this$$5$$.$_getNodeElem$($node$$148$$)) {
          $cur$$2$$.push($$elem$$3$$), $sels$$[$i$$401$$] = $$elem$$3$$[0];
        } else {
          return!1;
        }
        return!0;
      });
      $aSelected_newSels$$ = this.$_getSelected$();
      $$$$60$$.each($aSelected_newSels$$, function($i$$402$$, $node$$149$$) {
        $len$$23$$ = $cur$$2$$.length;
        $id$$58$$ = $$$$60$$($node$$149$$).attr("id");
        $inList$$ = !1;
        for ($i$$402$$ = 0;$i$$402$$ < $len$$23$$;$i$$402$$++) {
          if ($id$$58$$ == $cur$$2$$[$i$$402$$].attr("id")) {
            $inList$$ = !0;
            break;
          }
        }
        $inList$$ || $_this$$5$$.$_deselect$($node$$149$$);
      });
      this.$_setSelected$($cur$$2$$, null);
    }, $_prepare_move$:function($o$$18$$, $r$$3$$, $pos$$14$$, $cb$$2$$, $is_cb$$) {
      var $p$$10$$ = {};
      $r$$3$$ = -1 !== $r$$3$$ && $r$$3$$ ? this.$_getNode$($r$$3$$) : -1;
      this.$_reference$($o$$18$$, $p$$10$$);
      $p$$10$$.$rt$ = this;
      $p$$10$$.$o$ = $p$$10$$.$ot$.$_getNode$($o$$18$$);
      $p$$10$$.$r$ = $r$$3$$;
      $p$$10$$.$p$ = "undefined" === typeof $pos$$14$$ || !1 === $pos$$14$$ ? "last" : $pos$$14$$;
      if (!$is_cb$$ && this.$_data$.$core$.$prepMoveBlk$.$o$ && this.$_data$.$core$.$prepMoveBlk$.$o$[0] === $p$$10$$.$o$[0] && this.$_data$.$core$.$prepMoveBlk$.$r$[0] === $p$$10$$.$r$[0] && this.$_data$.$core$.$prepMoveBlk$.$p$ === $p$$10$$.$p$) {
        $cb$$2$$ && $cb$$2$$.call(this, this.$_data$.$core$.$prepMoveBlk$);
      } else {
        if (-1 !== $p$$10$$.$r$ && $p$$10$$.$r$) {
          if (!/^(before|after)$/.test($p$$10$$.$p$) && !this.$_is_loaded$($p$$10$$.$r$)) {
            return this.$_load_node$($p$$10$$.$r$, function() {
              this.$_prepare_move$($o$$18$$, $r$$3$$, $pos$$14$$, $cb$$2$$, !0);
            });
          }
          switch($p$$10$$.$p$) {
            case "before":
              $p$$10$$.$cp$ = $p$$10$$.$r$.index();
              $p$$10$$.$cr$ = $p$$10$$.$rt$.$_getParent$($p$$10$$.$r$);
              break;
            case "after":
              $p$$10$$.$cp$ = $p$$10$$.$r$.index() + 1;
              $p$$10$$.$cr$ = $p$$10$$.$rt$.$_getParent$($p$$10$$.$r$);
              break;
            case "inside":
            ;
            case "first":
              $p$$10$$.$cp$ = 0;
              $p$$10$$.$cr$ = $p$$10$$.$r$;
              break;
            case "last":
              $p$$10$$.$cp$ = $p$$10$$.$r$.find(" \x3e ul \x3e li").length;
              $p$$10$$.$cr$ = $p$$10$$.$r$;
              break;
            default:
              $p$$10$$.$cp$ = $p$$10$$.$p$, $p$$10$$.$cr$ = $p$$10$$.$r$;
          }
        } else {
          switch($p$$10$$.$cr$ = -1, $p$$10$$.$p$) {
            case "first":
            ;
            case "before":
            ;
            case "inside":
              $p$$10$$.$cp$ = 0;
              break;
            case "after":
            ;
            case "last":
              $p$$10$$.$cp$ = $p$$10$$.$rt$.$_$container$.find(" \x3e ul \x3e li").length;
              break;
            default:
              $p$$10$$.$cp$ = $p$$10$$.$p$;
          }
        }
        $p$$10$$.$np$ = -1 == $p$$10$$.$cr$ ? $p$$10$$.$rt$.$_$container$ : $p$$10$$.$cr$;
        $p$$10$$.$op$ = $p$$10$$.$ot$.$_getParent$($p$$10$$.$o$);
        $p$$10$$.$cop$ = $p$$10$$.$o$.index();
        -1 === $p$$10$$.$op$ && ($p$$10$$.$op$ = $p$$10$$.$ot$ ? $p$$10$$.$ot$.$_$container$ : this.$_$container$);
        !/^(before|after)$/.test($p$$10$$.$p$) && $p$$10$$.$op$ && $p$$10$$.$np$ && $p$$10$$.$op$[0] === $p$$10$$.$np$[0] && $p$$10$$.$o$.index() < $p$$10$$.$cp$ && $p$$10$$.$cp$++;
        $p$$10$$.$or$ = $p$$10$$.$np$.find(" \x3e ul \x3e li:nth-child(" + ($p$$10$$.$cp$ + 1) + ")");
        this.$_data$.$core$.$prepMoveBlk$ = $p$$10$$;
        $cb$$2$$ && $cb$$2$$.call(this, this.$_data$.$core$.$prepMoveBlk$, "prepare_move");
      }
    }, $_checkMove$:function() {
      var $obj$$68$$ = this.$_data$.$core$.$prepMoveBlk$, $ret$$72$$ = !0, $r$$4$$;
      $r$$4$$ = -1 === $obj$$68$$.$r$ ? this.$_$container$ : $obj$$68$$.$r$;
      if (!$obj$$68$$ || !$obj$$68$$.$o$ || $obj$$68$$.$or$[0] === $obj$$68$$.$o$[0] || !$obj$$68$$.$r$) {
        return!1;
      }
      if (!$obj$$68$$.$cy$) {
        if ($obj$$68$$.$op$ && $obj$$68$$.$np$ && $obj$$68$$.$op$[0] === $obj$$68$$.$np$[0] && $obj$$68$$.$cp$ - 1 === $obj$$68$$.$o$.index()) {
          return!1;
        }
        $obj$$68$$.$o$.each(function() {
          if (-1 !== $r$$4$$.parentsUntil(".oj-tree", "li").addBack().index(this)) {
            return $ret$$72$$ = !1;
          }
        });
      }
      return $ret$$72$$;
    }, $_renameNode$:function($node$$150$$, $text$$20$$) {
      var $t$$4$$;
      $node$$150$$ = this.$_getNode$($node$$150$$);
      this.$__rollback$();
      $t$$4$$ = this.getText($node$$150$$);
      if ($node$$150$$ && $node$$150$$.length) {
        var $rslt$$3$$ = this.$_emitEvent$({obj:$node$$150$$, func:"rename", title:$text$$20$$, prevTitle:$t$$4$$}, "before");
        if ("boolean" == typeof $rslt$$3$$ && !$rslt$$3$$) {
          return;
        }
      }
      $node$$150$$ && $node$$150$$.length && this.$_set_text$.apply(this, Array.prototype.slice.call(arguments)) && this.$_emitEvent$({obj:$node$$150$$, title:$text$$20$$, prevTitle:$t$$4$$}, "rename");
    }, $_moveNode$:function($obj$$69$$, $d$$8_o$$19_ref$$3$$, $position$$36$$, $is_copy$$, $is_prepared$$, $skip_check$$) {
      $is_prepared$$ || ($obj$$69$$ = this.$_getNode$($obj$$69$$));
      if (!($obj$$69$$.hasClass && $obj$$69$$.hasClass($TreeUtils$$.$_OJ_DISABLED$) || this.$_data$.$core$.locked)) {
        if (!$is_prepared$$) {
          return this.$_prepare_move$($obj$$69$$, $d$$8_o$$19_ref$$3$$, $position$$36$$, function($p$$11$$) {
            $p$$11$$.$ot$ === $p$$11$$.$rt$ || $p$$11$$.$cy$ || $p$$11$$.$ot$.deselect($p$$11$$.$o$);
            this.$_moveNode$($p$$11$$, !1, !1, $is_copy$$, !0, $skip_check$$);
          });
        }
        $is_copy$$ && (this.$_data$.$core$.$prepMoveBlk$.$cy$ = !0);
        if (!$skip_check$$ && !this.$_checkMove$()) {
          return!1;
        }
        this.$__rollback$();
        $d$$8_o$$19_ref$$3$$ = !1;
        $is_copy$$ ? ($d$$8_o$$19_ref$$3$$ = $obj$$69$$.$o$.clone(!0), $d$$8_o$$19_ref$$3$$.find("*[id]").addBack().each(function() {
          this.id && (this.id = "copy_" + this.id);
        })) : $d$$8_o$$19_ref$$3$$ = $obj$$69$$.$o$;
        $obj$$69$$.$or$.length ? $obj$$69$$.$or$.before($d$$8_o$$19_ref$$3$$) : ($obj$$69$$.$np$.children("ul").length || $$$$60$$("\x3cul /\x3e").appendTo($obj$$69$$.$np$), $obj$$69$$.$np$.children("ul:eq(0)").append($d$$8_o$$19_ref$$3$$));
        try {
          $obj$$69$$.$ot$.$_cleanNode$($obj$$69$$.$op$), $obj$$69$$.$rt$.$_cleanNode$($obj$$69$$.$np$), $obj$$69$$.$op$.find("\x3e ul \x3e li").length || $obj$$69$$.$op$.removeClass("oj-expanded oj-collapsed").removeAttr("aria-expanded").addClass("oj-tree-leaf").children("ul").remove();
        } catch ($e$$117$$) {
        }
        $is_copy$$ && (this.$_data$.$core$.$prepMoveBlk$.$cy$ = !0, this.$_data$.$core$.$prepMoveBlk$.$oc$ = $d$$8_o$$19_ref$$3$$);
        $d$$8_o$$19_ref$$3$$ = $$$$60$$.extend(!0, {}, this.$_data$.$core$.$prepMoveBlk$);
        $d$$8_o$$19_ref$$3$$.obj = $obj$$69$$.$o$;
        this.$_emitEvent$($d$$8_o$$19_ref$$3$$, "move");
        return this.$_data$.$core$.$prepMoveBlk$;
      }
    }, $_getMoveBlk$:function() {
      return this.$_data$.$crrm$.$prepMoveBlk$;
    }, $_getType$:function($node$$151$$) {
      var $n$$31$$ = null;
      this.options.types && ($n$$31$$ = this.$_getNode$($node$$151$$));
      return $n$$31$$ && $n$$31$$.length ? $n$$31$$.attr(this.options.types.attr) || "default" : !1;
    }, $_setType$:function($node$$152$$, $str$$21$$) {
      var $s$$11$$ = this.options.types, $tattr$$, $ret$$73$$ = !1;
      $node$$152$$ = this.$_getNode$($node$$152$$);
      $s$$11$$ && $node$$152$$ && -1 != $node$$152$$ && $node$$152$$.length && $str$$21$$ && ($tattr$$ = $s$$11$$.attr) && $s$$11$$[$str$$21$$] && ($node$$152$$.attr($tattr$$, $str$$21$$), $node$$152$$.addClass("oj-tree-type"), $ret$$73$$ = !0);
      return $ret$$73$$;
    }, $_check$:function($rule$$3$$, $obj$$70$$) {
      $obj$$70$$ = this.$_getNode$($obj$$70$$);
      var $v$$2$$ = !1, $ty$$ = this.$_getType$($obj$$70$$), $s$$12$$ = this.$_getOptions$().types, $data$$170$$ = !1;
      if (-1 === $obj$$70$$) {
        if ($s$$12$$[$rule$$3$$]) {
          $v$$2$$ = $s$$12$$[$rule$$3$$];
        } else {
          return;
        }
      } else {
        if (!1 === $ty$$) {
          return;
        }
        ($data$$170$$ = this.$_data$.types.$defaults$.useData ? $obj$$70$$.data("oj-tree") : !1) && $data$$170$$.types && "undefined" !== typeof $data$$170$$.types[$rule$$3$$] ? $v$$2$$ = $data$$170$$.types[$rule$$3$$] : $s$$12$$.types[$ty$$] && "undefined" !== typeof $s$$12$$.types[$ty$$][$rule$$3$$] ? $v$$2$$ = $s$$12$$.types[$ty$$][$rule$$3$$] : $s$$12$$.types["default"] && "undefined" !== typeof $s$$12$$.types["default"][$rule$$3$$] && ($v$$2$$ = $s$$12$$.types["default"][$rule$$3$$]);
      }
      $$$$60$$.isFunction($v$$2$$) && ($v$$2$$ = $v$$2$$.call(this, $obj$$70$$));
      return $v$$2$$;
    }, $_cleanNode$:function($obj$$71$$) {
      var $dndClasses$$, $draggableAttr$$, $draggableAttrVal$$, $dndContext$$ = this.$_getDndContext$(), $cons$$14$$ = $oj$$65$$.$TreeDndContext$;
      $dndContext$$.$isDragEnabled$() && ($dndClasses$$ = $cons$$14$$.$_OJ_DRAGGABLE$, $draggableAttr$$ = "draggable", $draggableAttrVal$$ = !0);
      $dndContext$$.$isDropEnabled$() && ($dndClasses$$ += " " + $cons$$14$$.$_OJ_VALID_DROP$);
      $obj$$71$$ = $obj$$71$$ && -1 != $obj$$71$$ ? $$$$60$$($obj$$71$$) : this.$_$container_ul$;
      $obj$$71$$ = $obj$$71$$.is("li") ? $obj$$71$$.find("li").addBack() : $obj$$71$$.find("li");
      $obj$$71$$.removeClass("oj-tree-last").addClass("oj-tree-node").addClass($dndClasses$$).attr($draggableAttr$$, $draggableAttrVal$$).filter("li:last-child").addClass("oj-tree-last").end().filter(":has(li)").not(".oj-expanded").removeClass("oj-tree-leaf").addClass($TreeUtils$$.$_OJ_COLLAPSED$).attr("aria-expanded", "false");
      $obj$$71$$.not(".oj-expanded, .oj-collapsed").addClass("oj-tree-leaf").children("ul").remove();
      var $typeAttr$$ = this.options.types ? this.options.types.attr : !1;
      $obj$$71$$.find("li");
      var $disc$$, $t$$6$$;
      $$$$60$$.each($obj$$71$$, function() {
        $t$$6$$ = $$$$60$$(this);
        $disc$$ = $t$$6$$.find("\x3e ins");
        1 < $disc$$.length && ($disc$$ = $$$$60$$($disc$$[0]));
        $t$$6$$.hasClass("oj-tree-leaf") ? ($disc$$.removeClass("oj-tree-icon oj-tree-disclosure-icon oj-component-icon oj-clickable-icon oj-default"), $disc$$.addClass("oj-tree-icon")) : ($disc$$.addClass("oj-tree-icon oj-tree-disclosure-icon oj-component-icon oj-clickable-icon oj-default"), $disc$$.removeClass("oj-tree-node-icon"));
        $typeAttr$$ && $t$$6$$.attr($typeAttr$$) && $t$$6$$.addClass("oj-tree-type");
      });
    }, $_createNode$:function($obj$$72$$, $position$$37$$, $js$$, $callback$$123$$, $d$$10_is_loaded$$) {
      $obj$$72$$ = $obj$$72$$ || -1;
      $obj$$72$$ = this.$_getNode$($obj$$72$$);
      if (-1 !== $obj$$72$$ && !$obj$$72$$.length) {
        return null;
      }
      var $tmp$$4$$;
      $position$$37$$ = "undefined" === typeof $position$$37$$ ? "last" : $position$$37$$;
      if (!$d$$10_is_loaded$$ && !this.$_is_loaded$($obj$$72$$)) {
        return this.$_load_node$($obj$$72$$, function() {
          this.$_createNode$($obj$$72$$, $position$$37$$, $js$$, $callback$$123$$, !0);
        }), null;
      }
      this.$__rollback$();
      $js$$ = this.$_parseJson$($js$$);
      if (!$js$$) {
        return null;
      }
      $js$$ = $js$$.children();
      $d$$10_is_loaded$$ = $$$$60$$($js$$[0]);
      -1 === $obj$$72$$ && ($obj$$72$$ = this.$_$container$, "before" === $position$$37$$ && ($position$$37$$ = "first"), "after" === $position$$37$$ && ($position$$37$$ = "last"));
      switch($position$$37$$) {
        case "before":
          $obj$$72$$.before($d$$10_is_loaded$$);
          $tmp$$4$$ = this.$_getParent$($obj$$72$$);
          break;
        case "after":
          $obj$$72$$.after($d$$10_is_loaded$$);
          $tmp$$4$$ = this.$_getParent$($obj$$72$$);
          break;
        case "inside":
        ;
        case "first":
          $obj$$72$$.children("ul").length || $obj$$72$$.append("\x3cul /\x3e");
          $obj$$72$$.children("ul").prepend($d$$10_is_loaded$$);
          $tmp$$4$$ = $obj$$72$$;
          break;
        case "last":
          $obj$$72$$.children("ul").length || $obj$$72$$.append("\x3cul /\x3e");
          $obj$$72$$.children("ul").append($d$$10_is_loaded$$);
          $tmp$$4$$ = $obj$$72$$;
          break;
        default:
          $obj$$72$$.children("ul").length || $obj$$72$$.append("\x3cul /\x3e"), $position$$37$$ || ($position$$37$$ = 0), $tmp$$4$$ = $obj$$72$$.children("ul").children("li").eq($position$$37$$), $tmp$$4$$.length ? $tmp$$4$$.before($d$$10_is_loaded$$) : $obj$$72$$.children("ul").append($d$$10_is_loaded$$), $tmp$$4$$ = $obj$$72$$;
      }
      if (-1 === $tmp$$4$$ || $tmp$$4$$.get(0) === this.$_$container$.get(0)) {
        $tmp$$4$$ = -1;
      }
      this.$_cleanNode$($tmp$$4$$);
      this.$_emitEvent$({obj:$d$$10_is_loaded$$, parent:$tmp$$4$$}, "create");
      $callback$$123$$ && $callback$$123$$.call(this, $d$$10_is_loaded$$);
      1 < this.$_$container_ul$[0].childNodes.length && this.$_$container_ul$.find("." + $TreeUtils$$.$_OJ_TEMPNODE$).remove();
      return $d$$10_is_loaded$$;
    }, $_expand$:function($obj$$73$$, $callback$$124$$, $skipAnim$$4$$) {
      $obj$$73$$ = this.$_getNode$($obj$$73$$);
      if (!$obj$$73$$ || !$obj$$73$$.length) {
        return!1;
      }
      $skipAnim$$4$$ = $skipAnim$$4$$ || !1;
      if (!$obj$$73$$.hasClass($TreeUtils$$.$_OJ_DISABLED$) && !this.$_data$.$core$.locked) {
        if (!$obj$$73$$.hasClass($TreeUtils$$.$_OJ_COLLAPSED$)) {
          return $callback$$124$$ && $callback$$124$$.call(), !1;
        }
        var $dur$$1_rslt$$4$$ = this.$_emitEvent$({obj:$obj$$73$$, func:"expand"}, "before");
        if ("boolean" != typeof $dur$$1_rslt$$4$$ || $dur$$1_rslt$$4$$) {
          var $dur$$1_rslt$$4$$ = $skipAnim$$4$$ ? 0 : this.$_animDuration$, $t$$7$$ = this;
          this.$_is_loaded$($obj$$73$$) ? (this.options.expandParents && $obj$$73$$.parentsUntil(".oj-tree", ".oj-collapsed").each(function() {
            $t$$7$$.$_expand$(this, !1, !0);
          }), $obj$$73$$.removeClass($TreeUtils$$.$_OJ_COLLAPSED$).addClass($TreeUtils$$.$_OJ_EXPANDED$).attr("aria-expanded", "true").children("a").removeClass("oj-tree-loading"), $$$$60$$($obj$$73$$.children()[0]).removeClass($TreeUtils$$.$_OJ_SELECTED$).addClass("oj-default"), !$skipAnim$$4$$ && $dur$$1_rslt$$4$$ ? this.$_slide$($obj$$73$$, !1) : this.$_transitionEnd$($$$$60$$($obj$$73$$.children("UL")[0]), $obj$$73$$), $callback$$124$$ && $callback$$124$$.call()) : ($obj$$73$$.children("a").addClass("oj-tree-loading"), 
          this.$_load_node$($obj$$73$$, function() {
            $t$$7$$.$_expand$($obj$$73$$, $callback$$124$$, $skipAnim$$4$$);
          }, $callback$$124$$));
        }
      }
    }, $_expandAll$:function($obj$$74$$, $animate$$13$$, $original_obj$$) {
      var $origTarg$$1$$ = $obj$$74$$ ? $obj$$74$$ : -1;
      ($obj$$74$$ = $obj$$74$$ ? this.$_getNode$($obj$$74$$) : -1) && -1 !== $obj$$74$$ ? $origTarg$$1$$ = $obj$$74$$ : $obj$$74$$ = this.$_$container_ul$;
      $original_obj$$ ? $obj$$74$$ = $obj$$74$$.find("li.oj-collapsed") : ($original_obj$$ = $obj$$74$$, $obj$$74$$ = $obj$$74$$.is(".oj-collapsed") ? $obj$$74$$.find("li.oj-collapsed").addBack() : $obj$$74$$.find("li.oj-collapsed"));
      var $_this$$7$$ = this;
      $obj$$74$$.each(function() {
        var $__this$$ = this;
        $_this$$7$$.$_is_loaded$(this) ? $_this$$7$$.$_expand$(this, !1, !$animate$$13$$) : $_this$$7$$.expand(this, function() {
          $_this$$7$$.$_expandAll$($__this$$, $animate$$13$$, $original_obj$$);
        }, !$animate$$13$$);
      });
      0 === $original_obj$$.find("li.oj-collapsed").length && this.$_emitEvent$({obj:$obj$$74$$, targ:$origTarg$$1$$}, "expandAll");
    }, $_select$:function($node$$153$$, $bRet_check$$, $e$$118$$) {
      var $core$$ = this.$_data$.$core$, $ui$$40$$ = this.$_data$.ui, $selectMode$$ = $core$$.$selectMode$;
      if (0 == $selectMode$$) {
        return!1;
      }
      $node$$153$$ = this.$_getNode$($node$$153$$);
      if (-1 == $node$$153$$ || !$node$$153$$ || !$node$$153$$.length || $node$$153$$.hasClass($TreeUtils$$.$_OJ_DISABLED$) || $core$$.locked) {
        return!1;
      }
      $e$$118$$ && "touchend" == $e$$118$$.type || ($ui$$40$$.$touchEvent$ = !1);
      var $isSelected$$ = this.isSelected($node$$153$$);
      if (!$isSelected$$) {
        var $prevSelections$$2_rslt$$5$$ = this.$_emitEvent$({obj:$node$$153$$, func:"select"}, "before");
        if ("boolean" == typeof $prevSelections$$2_rslt$$5$$ && !$prevSelections$$2_rslt$$5$$) {
          return!1;
        }
      }
      var $prevSelections$$2_rslt$$5$$ = this.options.selection.slice(0), $s$$14$$ = this.options, $isMultiple_selMultMod$$ = $ui$$40$$.$defaults$.selectMultipleModifier, $isRange_selRangeMod$$ = $ui$$40$$.$defaults$.selectRangeModifier, $disSelChildren$$ = $ui$$40$$.$defaults$.disableSelectingChildren, $isMultiple_selMultMod$$ = "on" == $isMultiple_selMultMod$$ || !1 !== $isMultiple_selMultMod$$ && $e$$118$$ && $oj$$65$$.$DomUtils$.$isMetaKeyPressed$($e$$118$$), $isRange_selRangeMod$$ = !1 !== $isRange_selRangeMod$$ && 
      $e$$118$$ && $e$$118$$[$isRange_selRangeMod$$ + "Key"] && $ui$$40$$.$lastSelected$ && this.$_data$.ui.$lastSelected$[0] !== $node$$153$$[0] && $ui$$40$$.$lastSelected$.parent()[0] === $node$$153$$.parent()[0], $proceed$$1$$ = !0, $t$$8$$ = this;
      if ($bRet_check$$) {
        if ($disSelChildren$$ && $isMultiple_selMultMod$$ && ($node$$153$$.parentsUntil(".oj-tree", "li").children("a.oj-selected").length || $node$$153$$.children("ul").find("a.oj-selected:eq(0)").length)) {
          return!1;
        }
        $proceed$$1$$ = !1;
        switch(!0) {
          case $isRange_selRangeMod$$:
            $ui$$40$$.$lastSelected$.addClass("oj-tree-last-selected");
            $node$$153$$ = $node$$153$$[$node$$153$$.index() < $ui$$40$$.$lastSelected$.index() ? "nextUntil" : "prevUntil"](".oj-tree-last-selected").addBack();
            -1 == $selectMode$$ || $node$$153$$.length < $selectMode$$ ? ($ui$$40$$.$lastSelected$.removeClass("oj-tree-last-selected"), $ui$$40$$.selected.each(function() {
              this !== $ui$$40$$.$lastSelected$[0] && $t$$8$$.$_deselect$(this);
            }), $isSelected$$ = !1, $proceed$$1$$ = !0) : $proceed$$1$$ = !1;
            break;
          case $ui$$40$$.$touchEvent$ && -1 == $selectMode$$:
            $ui$$40$$.$touchEvent$ = !1;
            this.toggleSelect($node$$153$$);
            $proceed$$1$$ = !1;
            break;
          case $isSelected$$ && !$isMultiple_selMultMod$$:
            if (!$e$$118$$) {
              break;
            }
            this.$_deselectAll$();
            $ui$$40$$.$spacebar$ || ($isSelected$$ = !1);
            $proceed$$1$$ = !0;
            break;
          case !$isSelected$$ && !$isMultiple_selMultMod$$:
            $e$$118$$ ? $ui$$40$$.selected && 1 == $ui$$40$$.selected.length ? this.$_deselect$($ui$$40$$.selected) : this.$_deselectAll$($ui$$40$$.selected) : 1 === $selectMode$$ ? this.$_deselect$($ui$$40$$.selected) : 1 < $selectMode$$ && this.$_deselectAll$();
            $proceed$$1$$ = !0;
            break;
          case $isSelected$$ && $isMultiple_selMultMod$$:
            this.deselect($node$$153$$);
            break;
          case !$isSelected$$ && $isMultiple_selMultMod$$:
            if (-1 == $selectMode$$ || $ui$$40$$.selected.length + 1 <= $selectMode$$) {
              $proceed$$1$$ = !0;
            }
          ;
        }
      }
      $bRet_check$$ = !1;
      $proceed$$1$$ && !$isSelected$$ && ($isRange_selRangeMod$$ || ($ui$$40$$.$lastSelected$ = $node$$153$$), $node$$153$$.children("a").addClass($TreeUtils$$.$_OJ_SELECTED$), $node$$153$$.attr("aria-selected", "true"), $bRet_check$$ = !0, $s$$14$$.selectedParentExpand && $node$$153$$.parents(".oj-collapsed").each(function() {
        $t$$8$$.$_expand$(this, !1, !0);
      }), $ui$$40$$.selected = $ui$$40$$.selected.add($node$$153$$), this.$_fix_scroll$($node$$153$$.eq(0)), $core$$.$suppressSelectEvent$ || this.$_fireOptionChangeEvent$("selection", $prevSelections$$2_rslt$$5$$, null, $e$$118$$));
      return $bRet_check$$;
    }, $_deselect$:function($node$$154$$) {
      $node$$154$$ = this.$_getNode$($node$$154$$);
      if (!$node$$154$$.length) {
        return!1;
      }
      $node$$154$$.hasClass($TreeUtils$$.$_OJ_DISABLED$) || this.$_data$.$core$.locked || !this.isSelected($node$$154$$) || ($node$$154$$.children("a").removeClass($TreeUtils$$.$_OJ_SELECTED$), $node$$154$$.removeAttr("aria-selected"), this.$_data$.ui.selected = this.$_data$.ui.selected.not($node$$154$$), this.$_data$.ui.$lastSelected$ && this.$_data$.ui.$lastSelected$.length && this.$_data$.ui.$lastSelected$.get(0) === $node$$154$$.get(0) && (this.$_data$.ui.$lastSelected$ = this.$_data$.ui.selected.eq(0)));
    }, $_deselectAll$:function($context$$164_ret$$74$$) {
      if (!this.$_data$.$core$.locked && ($context$$164_ret$$74$$ = $context$$164_ret$$74$$ ? $$$$60$$($context$$164_ret$$74$$).find("a.oj-selected").parent() : this.$_$container$.find("a.oj-selected").parent(), $context$$164_ret$$74$$.not(".oj-disabled"), 0 !== $context$$164_ret$$74$$.length)) {
        var $_this$$8$$ = this;
        $$$$60$$.each($context$$164_ret$$74$$, function() {
          $_this$$8$$.$_deselect$(this);
        });
      }
    }, $_setSelected$:function($nodes$$6$$, $e$$119$$) {
      if (this.$_data$.$core$.locked) {
        return null;
      }
      if ($nodes$$6$$ && 0 < $nodes$$6$$.length) {
        var $_this$$9$$ = this;
        $$$$60$$.each($nodes$$6$$, function($i$$404$$, $val$$68$$) {
          $val$$68$$ && $_this$$9$$.$_select$($val$$68$$, !0, $e$$119$$);
        });
      }
    }, $_handleNodeTapClick$:function($event$$561$$) {
      $event$$561$$.preventDefault();
      $event$$561$$.currentTarget.blur();
      $$$$60$$($event$$561$$.currentTarget).hasClass("oj-tree-loading") || (this.$_setFocus$(), this.$_select$($event$$561$$.currentTarget, !0, $event$$561$$) && this.$_$container_ul$.focus());
      this.$_data$.ui.$touchEvent$ = !1;
    }, $_disclosureHover$:function($elem$$77$$, $bHover$$) {
      $elem$$77$$ = $$$$60$$($elem$$77$$);
      if (!$elem$$77$$.hasClass($TreeUtils$$.$_OJ_DISABLED$) && !this.$_data$.$core$.locked) {
        var $par$$ = $elem$$77$$.parent(), $bClosed$$ = $par$$.hasClass($TreeUtils$$.$_OJ_COLLAPSED$);
        if ($par$$.hasClass($TreeUtils$$.$_OJ_EXPANDED$) || $bClosed$$) {
          $bHover$$ ? ($elem$$77$$.addClass($TreeUtils$$.$_OJ_HOVER$), $elem$$77$$.removeClass("oj-default"), $elem$$77$$.removeClass($TreeUtils$$.$_OJ_SELECTED$)) : ($elem$$77$$.removeClass($TreeUtils$$.$_OJ_HOVER$), $elem$$77$$.addClass("oj-default"));
        }
      }
    }, $_refresh$:function($node$$155$$) {
      this.$_refresh_core$($node$$155$$);
    }, $_refresh_core$:function($node$$156$$) {
      var $origTarg$$3$$ = $node$$156$$ ? $node$$156$$ : -1, $_this$$10$$ = this;
      this.$_save_opened$();
      $node$$156$$ || ($node$$156$$ = -1);
      ($node$$156$$ = this.$_getNode$($node$$156$$)) ? $origTarg$$3$$ = $node$$156$$ : $node$$156$$ = -1;
      -1 !== $node$$156$$ ? $node$$156$$.children("UL").remove() : (this.$_$container_ul$.empty(), this.$_processExistingMarkup$());
      this.$_load_node$($node$$156$$, function() {
        $_this$$10$$.$_emitEvent$({obj:$origTarg$$3$$}, "refresh");
        $_this$$10$$.$_reload_nodes$();
      });
    }, $_refresh_ui$:function($obj$$75$$) {
      this.saveSelected();
      this.$_refresh_core$($obj$$75$$);
    }, after_close:function($obj$$76$$) {
      this.$_emitEvent$({obj:$obj$$76$$}, "after_close", !0);
    }, $_reopen$:function() {
      var $_this$$11$$ = this;
      this.$_data$.$core$.$toExpand$.length && $$$$60$$.each(this.$_data$.$core$.$toExpand$, function($i$$405$$, $val$$69$$) {
        $_this$$11$$.$_expand$($val$$69$$, !1, !0);
      });
      this.$_emitEvent$({}, "reopen", !0);
    }, $_getSelected$:function($context$$165_sel$$2$$) {
      var $ar$$2$$, $i$$406$$, $len$$24$$;
      $context$$165_sel$$2$$ = $context$$165_sel$$2$$ ? $$$$60$$($context$$165_sel$$2$$).find("a.oj-selected").parent() : this.$_data$.ui.selected;
      $ar$$2$$ = [];
      $len$$24$$ = $context$$165_sel$$2$$.length;
      for ($i$$406$$ = 0;$i$$406$$ < $len$$24$$;$i$$406$$++) {
        $ar$$2$$.push($context$$165_sel$$2$$[$i$$406$$]);
      }
      return $ar$$2$$;
    }, $_set_text$:function($obj$$77$$, $val$$70$$) {
      $obj$$77$$ = this.$_getNode$($obj$$77$$);
      if (!$obj$$77$$.length) {
        return!1;
      }
      $obj$$77$$ = $obj$$77$$.children("a:eq(0)");
      $obj$$77$$ = $obj$$77$$.find("span:eq(0)");
      this.$_emitEvent$({obj:$obj$$77$$, name:$val$$70$$}, "set_text", !0);
      return $obj$$77$$[0].textContent = $val$$70$$;
    }, $_loadNodes$:function() {
      0 !== this.$_data$.$ds$.type && -1 !== this.$_data$.$ds$.type ? this.$_load_node$(-1, function() {
        this.$_loaded$();
        this.$_reload_nodes$();
      }) : (this.$_applyEmptyText$(), this.$_loaded$());
    }, $_load_node$:function($obj$$78$$) {
      this.$_emitEvent$({obj:$obj$$78$$}, "load_node", !0);
    }, $_is_loaded$:function() {
      return!0;
    }, $_load_node_DS$:function($obj$$80$$, $s_call$$, $e_call$$) {
      var $_this$$12$$ = this;
      this.$_load_node_tree$($obj$$80$$, function() {
        $_this$$12$$.$_emitEvent$({obj:$_this$$12$$.$_getNode$($obj$$80$$)}, "load_node", !0);
        $s_call$$.call(this);
      }, $e_call$$);
    }, $_is_loaded_DS$:function($obj$$81$$) {
      $obj$$81$$ = this.$_getNode$($obj$$81$$);
      return-1 === $obj$$81$$ || !$obj$$81$$ || $obj$$81$$.is(".oj-expanded, .oj-tree-leaf") || 0 < $obj$$81$$.children("ul").children("li").length;
    }, $_refresh_DS$:function($obj$$82$$) {
      ($obj$$82$$ = this.$_getNode$($obj$$82$$)) && -1 !== $obj$$82$$ && $obj$$82$$.removeData("oj-tree-children");
      return this.$_refresh_ui$($obj$$82$$);
    }, $_load_node_J$:function($obj$$83$$, $s_call$$1$$, $e_call$$1$$) {
      var $_this$$13$$ = this;
      this.$_loadNodeJson$($obj$$83$$, function() {
        $_this$$13$$.$_emitEvent$({obj:$_this$$13$$.$_getNode$($obj$$83$$)}, "load_node", !0);
        $s_call$$1$$.call(this);
      }, $e_call$$1$$);
    }, $_is_loaded_J$:function($obj$$84$$) {
      var $s$$15$$ = this.options.data;
      $obj$$84$$ = this.$_getNode$($obj$$84$$);
      return-1 == $obj$$84$$ || !$obj$$84$$ || !$s$$15$$.ajax && !this.$_data$.$ds$.$progressiveRender$ && !$$$$60$$.isFunction($s$$15$$.data) || $obj$$84$$.is(".oj-expanded, .oj-tree-leaf") || 0 < $obj$$84$$.children("ul").children("li").length;
    }, $_load_node_H$:function($obj$$85$$, $s_call$$2$$, $e_call$$2$$) {
      var $_this$$14$$ = this;
      this.$_loadNodeHtml$($obj$$85$$, function() {
        $_this$$14$$.$_emitEvent$({obj:$_this$$14$$.$_getNode$($obj$$85$$)}, "load_node", !0);
        $s_call$$2$$.call(this);
      }, $e_call$$2$$);
    }, $_is_loaded_H$:function($obj$$86$$) {
      var $s$$16$$ = this.options.data, $data$$171$$ = null, $ajax$$ = null;
      $s$$16$$ && ($data$$171$$ = $s$$16$$.data || null, $ajax$$ = $s$$16$$.ajax || null);
      $obj$$86$$ = this.$_getNode$($obj$$86$$);
      return-1 == $obj$$86$$ || !$obj$$86$$ || !$ajax$$ && !$$$$60$$.isFunction($data$$171$$) || $obj$$86$$.is(".oj-expanded, .oj-tree-leaf") || 0 < $obj$$86$$.children("ul").children("li").size();
    }, reselect:function() {
      var $_this$$15$$ = this, $s$$17$$ = this.$_data$.ui.$to_select$, $s$$17$$ = $$$$60$$.map($$$$60$$.makeArray($s$$17$$), function($n$$32$$) {
        return "#" + $n$$32$$.toString().replace(/^#/, "").replace(/\\\//g, "/").replace(/\//g, "\\/").replace(/\\\./g, ".").replace(/\./g, "\\.").replace(/\:/g, "\\:");
      });
      $$$$60$$.each($s$$17$$, function($i$$407$$, $val$$71$$) {
        $val$$71$$ && "#" !== $val$$71$$ && $_this$$15$$.select($val$$71$$);
      });
      this.$_data$.ui.selected = this.$_data$.ui.selected.filter(function() {
        return this.parentNode;
      });
      this.$_emitEvent$(null, "reselect", !0);
    }, saveSelected:function() {
      var $ui$$41$$ = this.$_data$.ui;
      $ui$$41$$.$to_select$ = [];
      $ui$$41$$.selected.each(function() {
        this.id && $ui$$41$$.$to_select$.push("#" + this.id.toString().replace(/^#/, "").replace(/\\\//g, "/").replace(/\//g, "\\/").replace(/\\\./g, ".").replace(/\./g, "\\.").replace(/\:/g, "\\:"));
      });
      this.$_emitEvent$($ui$$41$$.$to_select$, "savedselected", !0);
    }, rollback:function($rb$$1$$) {
      $rb$$1$$ && $$$$60$$.isArray($rb$$1$$);
    }, get_rollback:function() {
      this.$_emitEvent$(null, "get_rollback", !0);
      return{$i$:this.$_getIndex$(), $h$:this.$_$container$.children("ul").clone(!0), $d$:this.data};
    }, $_load_node_tree$:function($obj$$87$$, $s_call$$3$$) {
      var $d$$11_rslt$$6$$ = this.$_JsonDSToJson$($obj$$87$$ && -1 != $obj$$87$$ ? $obj$$87$$[0].id : $obj$$87$$ ? $obj$$87$$ : -1, $obj$$87$$);
      if ($d$$11_rslt$$6$$.success && $d$$11_rslt$$6$$.$js$) {
        var $$u_bTree$$1$$ = !$obj$$87$$ || -1 === $obj$$87$$, $s$$18$$ = this.options.data;
        if ($s$$18$$.data && !$s$$18$$.ajax || $s$$18$$.data && $s$$18$$.ajax && $$u_bTree$$1$$) {
          $$u_bTree$$1$$ && (($d$$11_rslt$$6$$ = this.$_parseJson$($d$$11_rslt$$6$$.$js$, $obj$$87$$)) ? (this.$_$container_ul$.empty().append($d$$11_rslt$$6$$.children()), this.$_cleanNode$()) : this.$_data$.$ds$.$correctState$ && this.$_$container_ul$.empty()), $s_call$$3$$ && $s_call$$3$$.call(this);
        } else {
          if (!$s$$18$$.data && $s$$18$$.ajax || $s$$18$$.data && $s$$18$$.ajax && !$$u_bTree$$1$$) {
            ($d$$11_rslt$$6$$ = this.$_parseJson$($d$$11_rslt$$6$$.$js$, $obj$$87$$)) ? ($$u_bTree$$1$$ ? ($$u_bTree$$1$$ = this.$_$container_ul$, $$u_bTree$$1$$.empty().append($d$$11_rslt$$6$$.children()), $$u_bTree$$1$$.attr("role", "tree").attr("tabindex", "0").css("outline", "none"), -1 === this.$_data$.$core$.$selectMode$ && $$u_bTree$$1$$.attr("aria-multiselectable", !0)) : ($obj$$87$$.append($d$$11_rslt$$6$$).children("a.oj-tree-loading").removeClass("oj-tree-loading"), $obj$$87$$.removeData("oj-tree-is-loading")), 
            this.$_cleanNode$($obj$$87$$), $s_call$$3$$ && $s_call$$3$$.call(this)) : $$u_bTree$$1$$ ? this.$_data$.$ds$.$correctState$ && (this.$_$container_ul$.empty(), $s_call$$3$$ && $s_call$$3$$.call(this)) : ($obj$$87$$.children("a.oj-tree-loading").removeClass("oj-tree-loading"), $obj$$87$$.removeData("oj-tree-is-loading"), $s$$18$$.correct_state && (this.$_correct_state$($obj$$87$$), $s_call$$3$$ && $s_call$$3$$.call(this)));
          }
        }
      }
    }, $_JsonDSToJson$:function($parentKey$$9$$, $node$$157$$) {
      var $arJson$$ = [], $ds$$ = this.$_tds$, $cc$$, $range$$18$$ = {}, $rslt$$7$$ = {success:!1, $js$:null};
      -1 == $parentKey$$9$$ && ($parentKey$$9$$ = null, $range$$18$$.start = 0);
      $cc$$ = $ds$$.$getChildCount$($parentKey$$9$$);
      0 < $cc$$ && ($range$$18$$.count = $cc$$, $ds$$.$fetchChildren$($parentKey$$9$$, $range$$18$$, {success:$$$$60$$.proxy(function($jns$$) {
        for (var $c$$49$$ = $jns$$.$getCount$(), $attr$$18_n$$33_r$$5$$, $i$$408$$ = 0;$i$$408$$ < $c$$49$$;$i$$408$$++) {
          $node$$157$$ = {};
          ($attr$$18_n$$33_r$$5$$ = $jns$$.getData($i$$408$$)) && ($node$$157$$.attr = $attr$$18_n$$33_r$$5$$);
          $node$$157$$.title = $jns$$.$m_nodes$[$i$$408$$].title;
          $attr$$18_n$$33_r$$5$$.$metadata$ && ($node$$157$$.metadata = $jns$$.$m_nodes$[$i$$408$$].metadata);
          var $key$$174$$ = $node$$157$$.attr.id;
          $attr$$18_n$$33_r$$5$$ = $ds$$.$getChildCount$($key$$174$$);
          0 < $attr$$18_n$$33_r$$5$$ && ($attr$$18_n$$33_r$$5$$ = this.$_JsonDSToJson$($key$$174$$, $node$$157$$), $node$$157$$.children = $attr$$18_n$$33_r$$5$$.$js$);
          $arJson$$.push($node$$157$$);
        }
        $rslt$$7$$.success = !0;
        $rslt$$7$$.$js$ = $arJson$$;
      }, this), error:function() {
        $rslt$$7$$.success = !1;
      }}));
      return $rslt$$7$$;
    }, $_refresh_json$:function($obj$$88$$) {
      $obj$$88$$ = this.$_getNode$($obj$$88$$);
      if (!this.$_data$.$core$.locked) {
        var $bTree$$2$$ = !$obj$$88$$ || -1 !== $obj$$88$$ || !$obj$$88$$.length;
        if ($bTree$$2$$ || !$obj$$88$$.hasClass($TreeUtils$$.$_OJ_DISABLED$)) {
          var $s$$19$$ = this.options.data.json;
          !$bTree$$2$$ && this.$_data$.$ds$.$progressiveUnload$ && ($$$$60$$.isFunction($s$$19$$.data) || $s$$19$$.ajax) && $obj$$88$$.removeData("oj-tree-children");
          return this.$_refresh_ui$($obj$$88$$);
        }
      }
    }, $_loadNodeJson$:function($obj$$89$$, $s_call$$4$$, $e_call$$4$$) {
      function $success_func$$() {
      }
      function $error_func$$() {
      }
      var $d$$12_s$$20$$ = this.$_getOptions$().data, $data$$172$$ = $d$$12_s$$20$$ && $d$$12_s$$20$$.data || null, $ajax$$1$$ = $d$$12_s$$20$$ && $d$$12_s$$20$$.ajax || null;
      !$d$$12_s$$20$$ || $data$$172$$ || $ajax$$1$$ || ($data$$172$$ = $d$$12_s$$20$$);
      if (($obj$$89$$ = this.$_getNode$($obj$$89$$)) && -1 !== $obj$$89$$ && (this.$_data$.$ds$.$progressiveRender$ || this.$_data$.$ds$.$progressiveUnload$) && !$obj$$89$$.is(".oj-expanded, .oj-tree-leaf") && 0 === $obj$$89$$.children("ul").children("li").length && $obj$$89$$.data("oj-tree-children")) {
        if ($d$$12_s$$20$$ = this.$_parseJson$($obj$$89$$.data("oj-tree-children"), $obj$$89$$)) {
          $obj$$89$$.append($d$$12_s$$20$$), this.$_data$.$ds$.$progressiveUnload$ || $obj$$89$$.removeData("oj-tree-children");
        }
        this.$_cleanNode$($obj$$89$$);
        $s_call$$4$$ && $s_call$$4$$.call(this);
      } else {
        if ($obj$$89$$ && -1 !== $obj$$89$$) {
          if ($obj$$89$$.data("oj-tree-is-loading")) {
            return;
          }
          $obj$$89$$.data("oj-tree-is-loading", !0);
        }
        switch(!0) {
          case !$data$$172$$ && !$ajax$$1$$:
            throw "ojTree - neither data nor ajax settings supplied.";;
          case $$$$60$$.isFunction($data$$172$$):
            $data$$172$$.call(this, $obj$$89$$, $$$$60$$.proxy(function($d$$13$$) {
              ($d$$13$$ = this.$_parseJson$($d$$13$$, $obj$$89$$)) ? (-1 !== $obj$$89$$ && $obj$$89$$ ? ($obj$$89$$.append($d$$13$$).children("a.oj-tree-loading").removeClass("oj-tree-loading"), $obj$$89$$.removeData("oj-tree-is-loading")) : this.$_$container_ul$.empty().append($d$$13$$.children()), this.$_cleanNode$($obj$$89$$), $s_call$$4$$ && $s_call$$4$$.call(this)) : (-1 !== $obj$$89$$ && $obj$$89$$ ? ($obj$$89$$.children("a.oj-tree-loading").removeClass("oj-tree-loading"), $obj$$89$$.removeData("oj-tree-is-loading"), 
              this.$_data$.$ds$.$correctState$ && this.$_correct_state$($obj$$89$$)) : this.$_data$.$ds$.$correctState$ && this.$_$container_ul$.empty(), $e_call$$4$$ && $e_call$$4$$.call(this));
            }, this));
            break;
          case !!$data$$172$$ && !$ajax$$1$$ || !!$data$$172$$ && !!$ajax$$1$$ && (!$obj$$89$$ || -1 === $obj$$89$$):
            $obj$$89$$ && -1 != $obj$$89$$ || (($d$$12_s$$20$$ = this.$_parseJson$($data$$172$$, $obj$$89$$)) ? (this.$_$container_ul$.empty().append($d$$12_s$$20$$.children()), this.$_cleanNode$()) : this.$_data$.$ds$.$correctState$ && this.$_$container_ul$.empty());
            $s_call$$4$$ && $s_call$$4$$.call(this);
            break;
          case !$data$$172$$ && !!$ajax$$1$$ || !!$data$$172$$ && !!$ajax$$1$$ && $obj$$89$$ && -1 !== $obj$$89$$:
            $error_func$$ = function $$error_func$$$($x$$56$$, $status$$28$$, $e$$120$$) {
              var $ef$$ = this.$_getOptions$().data.ajax.error;
              $ef$$ && $ef$$.call(this, $status$$28$$, $e$$120$$, $x$$56$$);
              -1 != $obj$$89$$ && $obj$$89$$.length ? ($obj$$89$$.children("a.oj-tree-loading").removeClass("oj-tree-loading"), $obj$$89$$.removeData("oj-tree-is-loading"), "success" === $status$$28$$ && this.$_data$.$ds$.$correctState$ && this.$_correct_state$($obj$$89$$)) : ("error" == $status$$28$$ || "success" === $status$$28$$ && this.$_data$.$ds$.$correctState$) && this.$_$container_ul$.empty();
              $e_call$$4$$ && $e_call$$4$$.call(this);
            }, $success_func$$ = function $$success_func$$$($d$$14$$, $status$$29_tempd$$, $$u$$1_x$$57$$) {
              var $sf$$ = this.$_getOptions$().data.ajax.success;
              $sf$$ && ($d$$14$$ = $sf$$.call(this, $d$$14$$, $status$$29_tempd$$, $$u$$1_x$$57$$) || $d$$14$$);
              if ("string" == typeof $d$$14$$) {
                $status$$29_tempd$$ = $d$$14$$.replace(/^[\s\n]+$/, "");
                try {
                  $status$$29_tempd$$ = $$$$60$$.parseJSON($status$$29_tempd$$);
                } catch ($err$$26$$) {
                  $status$$29_tempd$$ = null;
                }
                if (!$status$$29_tempd$$) {
                  return $error_func$$.call(this, $$u$$1_x$$57$$, "Bad JSON", "");
                }
              }
              ($d$$14$$ = this.$_parseJson$($d$$14$$, $obj$$89$$)) ? (-1 !== $obj$$89$$ && $obj$$89$$ ? ($obj$$89$$.append($d$$14$$).children("a.oj-tree-loading").removeClass("oj-tree-loading"), $obj$$89$$.removeData("oj-tree-is-loading")) : ($$u$$1_x$$57$$ = this.$_$container_ul$, $$u$$1_x$$57$$.empty().append($d$$14$$.children()), $$u$$1_x$$57$$.attr("role", "tree").attr("tabindex", "0").css("outline", "none"), -1 === this.$_data$.$core$.$selectMode$ && $$u$$1_x$$57$$.attr("aria-multiselectable", 
              !0)), this.$_cleanNode$($obj$$89$$), $s_call$$4$$ && $s_call$$4$$.call(this)) : -1 !== $obj$$89$$ && $obj$$89$$ ? ($obj$$89$$.children("a.oj-tree-loading").removeClass("oj-tree-loading"), $obj$$89$$.removeData("oj-tree-is-loading"), this.$_data$.$ds$.$correctState$ && (this.$_correct_state$($obj$$89$$), $s_call$$4$$ && $s_call$$4$$.call(this))) : this.$_data$.$ds$.$correctState$ && (this.$_$container_ul$.empty(), $s_call$$4$$ && $s_call$$4$$.call(this));
            }, $d$$12_s$$20$$.ajax.context = this, $d$$12_s$$20$$.ajax.error = $error_func$$, $d$$12_s$$20$$.ajax.success = $success_func$$, $d$$12_s$$20$$.dataType || ($d$$12_s$$20$$.ajax.dataType = "json"), $$$$60$$.isFunction($d$$12_s$$20$$.ajax.url) && ($d$$12_s$$20$$.ajax.url = $d$$12_s$$20$$.ajax.url.call(this, $obj$$89$$)), $$$$60$$.isFunction($d$$12_s$$20$$.ajax.data) && ($d$$12_s$$20$$.ajax.data = $d$$12_s$$20$$.ajax.data.call(this, $obj$$89$$)), $$$$60$$.ajax($d$$12_s$$20$$.ajax);
        }
      }
    }, $_parseJson$:function($js$$1$$, $obj$$90_ul2$$, $isRecurse_ul1$$) {
      var $d$$15$$ = !1, $tmp$$5$$, $i$$409$$, $j$$46$$, $title$$12$$;
      if (!$js$$1$$) {
        return $d$$15$$;
      }
      this.$_data$.$ds$.$progressiveUnload$ && $obj$$90_ul2$$ && -1 !== $obj$$90_ul2$$ && $obj$$90_ul2$$.data("oj-tree-children", $d$$15$$);
      if ("string" == typeof $js$$1$$) {
        try {
          $js$$1$$ = $$$$60$$.parseJSON($js$$1$$);
        } catch ($err$$27$$) {
          $js$$1$$ = [];
        }
      }
      if ($$$$60$$.isArray($js$$1$$)) {
        $d$$15$$ = $$$$60$$("\x3cul\x3e");
        if (!$js$$1$$.length) {
          return!1;
        }
        $i$$409$$ = 0;
        for ($j$$46$$ = $js$$1$$.length;$i$$409$$ < $j$$46$$;$i$$409$$++) {
          $tmp$$5$$ = this.$_parseJson$($js$$1$$[$i$$409$$], $obj$$90_ul2$$, !0), $tmp$$5$$.length && ($d$$15$$ = $d$$15$$.append($tmp$$5$$));
        }
        $d$$15$$ = $d$$15$$.children();
      } else {
        "string" == typeof $js$$1$$ && ($js$$1$$ = {data:$js$$1$$});
        $title$$12$$ = "string" == typeof $js$$1$$.title ? $js$$1$$.title : " ";
        $d$$15$$ = $$$$60$$("\x3cli role\x3d'treeitem' /\x3e");
        $js$$1$$.attr && (this.$_data$.types.$defType$ && !$js$$1$$.attr.type && ($js$$1$$.attr.type = "oj-tree-deftype", $d$$15$$.addClass("oj-tree-type")), $d$$15$$.attr($js$$1$$.attr));
        $js$$1$$.metadata && $d$$15$$.data($js$$1$$.metadata);
        $js$$1$$.children && 0 === $js$$1$$.children.length && $d$$15$$.addClass($TreeUtils$$.$_OJ_COLLAPSED$);
        $js$$1$$.state && "s" === $js$$1$$.state && $d$$15$$.addClass($TreeUtils$$.$_OJ_SELECTED$);
        $js$$1$$.data || ($js$$1$$.data = {dummy:0});
        var $bIns$$ = !1, $sp$$2$$;
        $tmp$$5$$ = $$$$60$$("\x3ca tabindex\x3d'-1' /\x3e");
        $$$$60$$.each($js$$1$$.data, function($i$$410$$, $m$$24$$) {
          $$$$60$$.isFunction($m$$24$$) && ($m$$24$$ = $m$$24$$.call(this, $js$$1$$));
          "string" != typeof $m$$24$$ && ("attr" == $i$$410$$ ? $tmp$$5$$.attr($m$$24$$) : "style" == $i$$410$$ && $tmp$$5$$.css($m$$24$$), "language" == $i$$410$$ && $tmp$$5$$.addClass($m$$24$$));
          $bIns$$ || ($sp$$2$$ = $$$$60$$("\x3cspan class\x3d'oj-tree-title'\x3e"), $sp$$2$$[0].textContent = $title$$12$$, $tmp$$5$$.prepend("\x3cins class\x3d'oj-tree-icon oj-tree-node-icon oj-component-icon'\x3e\x26#160;\x3c/ins\x3e", $sp$$2$$), $bIns$$ = !0);
          !$m$$24$$.icon && $js$$1$$.icon && ($m$$24$$.icon = $js$$1$$.icon);
          $m$$24$$.icon && (-1 === $m$$24$$.icon.indexOf("/") ? $tmp$$5$$.children("ins").addClass($m$$24$$.icon) : $tmp$$5$$.children("ins").css("background", "url('" + $m$$24$$.icon + "') center center no-repeat"));
        });
        $d$$15$$.append($tmp$$5$$);
        $d$$15$$.prepend("\x3cins class\x3d'oj-tree-icon oj-tree-disclosure-icon oj-component-icon oj-clickable-icon oj-default'\x3e\x26#160;\x3c/ins\x3e");
        $js$$1$$.children && (this.$_data$.$ds$.$progressiveRender$ && "expanded" !== $js$$1$$.state ? $d$$15$$.addClass($TreeUtils$$.$_OJ_COLLAPSED$).attr("aria-expanded", "false").data("oj-tree-children", $js$$1$$.children) : (this.$_data$.$ds$.$progressiveUnload$ && $d$$15$$.data("oj-tree-children", $js$$1$$.children), $$$$60$$.isArray($js$$1$$.children) && $js$$1$$.children.length && ($tmp$$5$$ = this.$_parseJson$($js$$1$$.children, $obj$$90_ul2$$, !0), $tmp$$5$$.length && ($obj$$90_ul2$$ = $$$$60$$("\x3cul role\x3d'group' /\x3e"), 
        $obj$$90_ul2$$.append($tmp$$5$$), $d$$15$$.append($obj$$90_ul2$$)))));
      }
      $isRecurse_ul1$$ || ($isRecurse_ul1$$ = $$$$60$$("\x3cul /\x3e"), $isRecurse_ul1$$.append($d$$15$$), $d$$15$$ = $isRecurse_ul1$$);
      return $d$$15$$;
    }, $__getJson$:function($obj$$91$$, $li_attr$$, $a_attr$$, $isCallback$$) {
      var $result$$74$$ = [], $s$$21$$ = this.options, $_this$$17$$ = this, $tmp1$$, $tmp2$$, $val$$72$$, $li$$3$$, $a$$121$$, $t$$9$$, $sAttr$$, $title$$13$$;
      ($obj$$91$$ = this.$_getNode$($obj$$91$$)) && -1 !== $obj$$91$$ || ($obj$$91$$ = this.$_$container$.find("\x3e ul \x3e li"));
      $li_attr$$ = $$$$60$$.isArray($li_attr$$) ? $li_attr$$ : ["id", "class"];
      !$isCallback$$ && $s$$21$$.types && $li_attr$$.push($s$$21$$.types.attr);
      $a_attr$$ = $$$$60$$.isArray($a_attr$$) ? $a_attr$$ : [];
      $obj$$91$$.each(function() {
        $li$$3$$ = $$$$60$$(this);
        $tmp1$$ = {};
        $li_attr$$.length && ($tmp1$$.attr = {});
        $$$$60$$.each($li_attr$$, function($i$$411$$, $v$$3$$) {
          ($tmp2$$ = $li$$3$$.attr($v$$3$$)) && $tmp2$$.length && $tmp2$$.replace(/oj-tree[^ ]*/ig, "").length && ($tmp2$$ = (" " + $tmp2$$).replace(/ oj-tree[^ ]*/ig, "").replace(/ oj-[^ ]*/ig, "").replace(/\s+$/ig, " ").replace(/^ /, "").replace(/ $/, ""), $tmp2$$.length && ($tmp1$$.attr[$v$$3$$] = $tmp2$$));
        });
        $_this$$17$$.$_getDndContext$().$isDragEnabled$() && $_this$$17$$.isSelected($li$$3$$) && ($tmp1$$.state = "s");
        $val$$72$$ = $li$$3$$.data();
        $isPureObjEmpty$$($val$$72$$) || ($tmp1$$.metadata = $val$$72$$);
        $a$$121$$ = $li$$3$$.children("a");
        $tmp2$$ = null;
        $a$$121$$.each(function() {
          $t$$9$$ = $$$$60$$(this);
          $a_attr$$.length || $t$$9$$.children("ins").get(0).style.backgroundImage.length || $t$$9$$.children("ins").get(0).className && $t$$9$$.children("ins").get(0).className.replace(/oj-tree[^ ]*|$/ig, "").length ? ($title$$13$$ = $_this$$17$$.getText($t$$9$$), $$$$60$$.each($a_attr$$, function($k$$14$$, $z$$2$$) {
            $sAttr$$ = (" " + ($t$$9$$.attr($z$$2$$) || "")).replace(/ oj-tree[^ ]*/ig, "").replace(/ oj-[^ ]*/ig, "").replace(/\s+$/ig, " ").replace(/^ /, "").replace(/ $/, "");
            $sAttr$$.length && ($tmp2$$ || ($tmp2$$ = {attr:{}}), $tmp2$$.attr[$z$$2$$] = $sAttr$$);
          }), $t$$9$$.children("ins").get(0).className.replace(/oj-tree[^ ]*|$/ig, "").replace(/^\s+$/ig, "").length && ($sAttr$$ = $t$$9$$.children("ins").get(0).className.replace(/oj-tree[^ ]*|$/ig, "").replace(/ oj-[^ ]*/ig, "").replace(/\s+$/ig, " ").replace(/^ /, "").replace(/ $/, ""), $sAttr$$.length && ($tmp2$$ || ($tmp2$$ = {}), $tmp2$$.icon = $sAttr$$)), $t$$9$$.children("ins").get(0).style.backgroundImage.length && ($sAttr$$ = $t$$9$$.children("ins").get(0).style.backgroundImage.replace("url(", 
          "").replace(")", ""), $sAttr$$.length && ($tmp2$$ || ($tmp2$$ = {}), $tmp2$$.icon = $sAttr$$))) : $title$$13$$ = $_this$$17$$.getText($t$$9$$);
          null != $tmp2$$ && ($tmp1$$.data || ($tmp1$$.data = []), 1 < $a$$121$$.length ? $tmp1$$.data.push($tmp2$$) : $tmp1$$.data = $tmp2$$);
          $tmp1$$.title = $title$$13$$;
        });
        $li$$3$$ = $li$$3$$.find("\x3e ul \x3e li");
        $li$$3$$.length && ($tmp1$$.children = $_this$$17$$.$__getJson$($li$$3$$, $li_attr$$, $a_attr$$, !0));
        $result$$74$$.push($tmp1$$);
      });
      return $result$$74$$;
    }, $_correct_state$:function($obj$$92$$) {
      $obj$$92$$ = this.$_getNode$($obj$$92$$);
      if (!$obj$$92$$ || -1 === $obj$$92$$) {
        return!1;
      }
      $obj$$92$$.removeClass("oj-collapsed oj-expanded").removeAttr("aria-expanded").addClass("oj-tree-leaf").children("ul").remove();
      $obj$$92$$.find("ins:first-child").removeClass("oj-tree-icon oj-tree-disclosure-icon oj-component-icon oj-clickable-icon oj-default").addClass("oj-tree-icon");
      this.$_emitEvent$({obj:$obj$$92$$}, "correct_state", !0);
    }, $_loaded$:function() {
      this.$_emitEvent$(null, "loaded");
    }, $_loadNodeHtml$:function($obj$$93$$, $s_call$$5$$, $e_call$$5$$) {
      function $success_func$$1$$() {
      }
      function $error_func$$1$$() {
      }
      var $d$$16_s$$22$$ = this.$_getOptions$().data, $data$$173$$ = $d$$16_s$$22$$ && $d$$16_s$$22$$.data || null, $ajax$$2$$ = $d$$16_s$$22$$ && $d$$16_s$$22$$.ajax || null;
      if (($obj$$93$$ = this.$_getNode$($obj$$93$$)) && -1 !== $obj$$93$$) {
        if ($obj$$93$$.data("oj-tree-is-loading")) {
          return;
        }
        $obj$$93$$.data("oj-tree-is-loading", !0);
      }
      switch(!0) {
        case !$data$$173$$ && !$ajax$$2$$ && $d$$16_s$$22$$ && "string" === typeof $d$$16_s$$22$$:
          this.$_loadHtmlString$($d$$16_s$$22$$, $obj$$93$$, $s_call$$5$$, $e_call$$5$$);
          break;
        case $$$$60$$.isFunction($data$$173$$):
          $data$$173$$.call(this, $obj$$93$$, $$$$60$$.proxy(function($d$$17$$) {
            this.$_loadHtmlString$($d$$17$$, $obj$$93$$, $s_call$$5$$, $e_call$$5$$);
          }, this));
          break;
        case !$data$$173$$ && !$ajax$$2$$:
          $obj$$93$$ && -1 != $obj$$93$$ || (this.$_$container_ul$.empty().append(this.$_data$.html.$cloneMarkup$).find("li, a").filter(function() {
            return!this.firstChild || !this.firstChild.tagName || "INS" !== this.firstChild.tagName;
          }).prepend("\x3cins class\x3d'oj-tree-icon' \x3e\x26#160;\x3c/ins\x3e").end().filter("a").children("ins:first-child").not(".oj-tree-node-icon").addClass("oj-tree-node-icon").addClass("oj-tree-icon"), this.$_$container_ul$.find("li").children("ins:first-child").addClass("oj-tree-icon oj-tree-disclosure-icon oj-component-icon oj-clickable-icon oj-default"), this.$_insertHtmlTextSpan$(this.$_$container_ul$), this.$_data$.types.$defType$ && this.$_addDefType$(this.$_$container_ul$), this.$_cleanNode$(), 
          this.$_$container_ul$.find("ul").attr("role", "group"), this.$_$container_ul$.find("li").attr("role", "treeitem"), this.$_$container_ul$.find("a").attr("tabindex", -1));
          $s_call$$5$$ && $s_call$$5$$.call(this);
          break;
        case !!$data$$173$$ && !$ajax$$2$$ || !!$data$$173$$ && !!$ajax$$2$$ && (!$obj$$93$$ || -1 === $obj$$93$$):
          $obj$$93$$ && -1 != $obj$$93$$ || ($d$$16_s$$22$$ = $$$$60$$($data$$173$$), $d$$16_s$$22$$.is("ul") || ($d$$16_s$$22$$ = $$$$60$$("\x3cul /\x3e").append($d$$16_s$$22$$)), this.$_$container_ul$.empty().append($d$$16_s$$22$$.children()).find("li, a").filter(function() {
            return!this.firstChild || !this.firstChild.tagName || "INS" !== this.firstChild.tagName;
          }).prepend("\x3cins class\x3d'oj-tree-icon'\x3e\x26#160;\x3c/ins\x3e").end().filter("a").children("ins:first-child").not(".oj-tree-node-icon").addClass("oj-tree-node-icon").addClass("oj-tree-icon"), this.$_$container_ul$.find("li.oj-tree-leaf ins:first-child").removeClass("oj-tree-icon oj-tree-disclosure-icon oj-component-icon oj-clickable-icon oj-default").removeClass("oj-tree-node-icon").addClass("oj-tree-icon"), this.$_insertHtmlTextSpan$(this.$_$container_ul$), this.$_data$.types.$defType$ && 
          this.$_addDefType$(this.$_$container_ul$), this.$_cleanNode$(), this.$_$container_ul$.find("ul").attr("role", "group"), this.$_$container_ul$.find("li").attr("role", "treeitem"), this.$_$container_ul$.find("a").attr("tabindex", "-1"));
          $s_call$$5$$ && $s_call$$5$$.call(this);
          break;
        case !$data$$173$$ && !!$ajax$$2$$ || !!$data$$173$$ && !!$ajax$$2$$ && $obj$$93$$ && -1 !== $obj$$93$$:
          $obj$$93$$ = this.$_getNode$($obj$$93$$), $error_func$$1$$ = function $$error_func$$1$$$($x$$58$$, $t$$10$$, $e$$121$$) {
            var $ef$$1$$ = this.$_getOptions$().data.ajax.error;
            $ef$$1$$ && $ef$$1$$.call(this, $x$$58$$, $t$$10$$, $e$$121$$);
            -1 != $obj$$93$$ && $obj$$93$$.length ? ($obj$$93$$.children("a.oj-tree-loading").removeClass("oj-tree-loading"), $obj$$93$$.removeData("oj-tree-is-loading"), "success" === $t$$10$$ && this.$_data$.$ds$.$correctState$ && this.$_correct_state$($obj$$93$$)) : "success" === $t$$10$$ && this.$_data$.$ds$.$correctState$ && this.$_$container_ul$.empty();
            $e_call$$5$$ && $e_call$$5$$.call(this);
          }, $success_func$$1$$ = function $$success_func$$1$$$($d$$18_parent$$45$$, $nodes$$7_t$$11$$, $x$$59$$) {
            var $sf$$1$$ = this.$_getOptions$().data.ajax.success;
            $sf$$1$$ && ($d$$18_parent$$45$$ = $sf$$1$$.call(this, $d$$18_parent$$45$$, $nodes$$7_t$$11$$, $x$$59$$) || $d$$18_parent$$45$$);
            if ("" === $d$$18_parent$$45$$ || $d$$18_parent$$45$$ && $d$$18_parent$$45$$.toString && "" === $d$$18_parent$$45$$.toString().replace(/^[\s\n]+$/, "")) {
              return $error_func$$1$$.call(this, $x$$59$$, $nodes$$7_t$$11$$, "");
            }
            if ($d$$18_parent$$45$$) {
              $d$$18_parent$$45$$ = $$$$60$$($d$$18_parent$$45$$);
              $d$$18_parent$$45$$.is("ul") || ($d$$18_parent$$45$$ = $$$$60$$("\x3cul /\x3e").append($d$$18_parent$$45$$));
              -1 != $obj$$93$$ && $obj$$93$$ ? ($obj$$93$$.children("a.oj-tree-loading").removeClass("oj-tree-loading"), this.$_removeEmptyUL$($obj$$93$$), $obj$$93$$.append($d$$18_parent$$45$$).children("ul").find("li, a").filter(function() {
                return!this.firstChild || !this.firstChild.tagName || "INS" !== this.firstChild.tagName;
              }).prepend("\x3cins class\x3d'oj-tree-icon'\x3e\x26#160;\x3c/ins\x3e").end().filter("a").children("ins:first-child").not(".oj-tree-node-icon").addClass("oj-tree-node-icon").addClass("oj-tree-icon"), $obj$$93$$.removeData("oj-tree-is-loading"), $obj$$93$$.find("li.oj-tree-leaf ins:first-child").removeClass("oj-tree-icon oj-tree-disclosure-icon oj-component-icon oj-clickable-icon oj-default").removeClass("oj-tree-node-icon").addClass("oj-tree-icon"), $d$$18_parent$$45$$ = $obj$$93$$) : 
              (this.$_$container_ul$.empty().append($d$$18_parent$$45$$.children()).find("li, a").filter(function() {
                return!this.firstChild || !this.firstChild.tagName || "INS" !== this.firstChild.tagName;
              }).prepend("\x3cins class\x3d'oj-tree-icon'\x3e\x26#160;\x3c/ins\x3e").end().filter("a").children("ins:first-child").not(".oj-tree-node-icon").addClass("oj-tree-node-icon").addClass("oj-tree-icon"), this.$_$container_ul$.find("li.oj-tree-leaf ins:first-child").removeClass("oj-tree-icon oj-tree-disclosure-icon oj-component-icon oj-clickable-icon oj-default").removeClass("oj-tree-node-icon").addClass("oj-tree-icon"), $d$$18_parent$$45$$ = this.$_$container_ul$);
              this.$_handleHtmlParentNoChildren$($d$$18_parent$$45$$);
              this.$_insertHtmlTextSpan$($d$$18_parent$$45$$);
              $nodes$$7_t$$11$$ = $d$$18_parent$$45$$.children("UL");
              if (1 <= $nodes$$7_t$$11$$.length) {
                $nodes$$7_t$$11$$ = $nodes$$7_t$$11$$.first().find("span.oj-tree-title");
                var $_this$$18$$ = this;
                $$$$60$$.each($nodes$$7_t$$11$$, function() {
                  this.textContent = $_this$$18$$.$_escapeHtml$(this.textContent);
                });
              }
              this.$_data$.types.$defType$ && $d$$18_parent$$45$$ && this.$_addDefType$(this.$_$container_ul$);
              this.$_cleanNode$($obj$$93$$);
              $s_call$$5$$ && $s_call$$5$$.call(this);
            } else {
              $obj$$93$$ && -1 !== $obj$$93$$ ? ($obj$$93$$.children("a.oj-tree-loading").removeClass("oj-tree-loading"), $obj$$93$$.removeData("oj-tree-is-loading"), this.$_data$.$ds$.$correctState$ && (this.$_correct_state$($obj$$93$$), $s_call$$5$$ && $s_call$$5$$.call(this))) : this.$_data$.$ds$.$correctState$ && (this.$_$container_ul$.empty(), $s_call$$5$$ && $s_call$$5$$.call(this)), this.$_$container_ul$.find("ul").attr("role", "group"), this.$_$container_ul$.find("li").attr("role", "treeitem")
              ;
            }
          }, $d$$16_s$$22$$.ajax.context = this, $d$$16_s$$22$$.ajax.error = $error_func$$1$$, $d$$16_s$$22$$.ajax.success = $success_func$$1$$, $d$$16_s$$22$$.ajax.dataType || ($d$$16_s$$22$$.ajax.dataType = "html"), $$$$60$$.isFunction($d$$16_s$$22$$.ajax.url) && ($d$$16_s$$22$$.ajax.url = $d$$16_s$$22$$.ajax.url.call(this, $obj$$93$$)), $$$$60$$.isFunction($d$$16_s$$22$$.ajax.data) && ($d$$16_s$$22$$.ajax.data = $d$$16_s$$22$$.ajax.data.call(this, $obj$$93$$)), $$$$60$$.ajax($d$$16_s$$22$$.ajax);
      }
    }, $_handleHtmlParentNoChildren$:function($lazy$$1_parent$$46$$) {
      $lazy$$1_parent$$46$$ = $lazy$$1_parent$$46$$.find($lazy$$1_parent$$46$$.is("ul") ? "li ul" : "ul").filter(function() {
        return!this.firstChild || 0 == this.childNodes.length || 1 == this.childNodes.length && 3 == this.firstChild.nodeType;
      });
      $$$$60$$.each($lazy$$1_parent$$46$$, function() {
        $$$$60$$(this).closest("li").addClass($TreeUtils$$.$_OJ_COLLAPSED$);
      });
    }, $_removeEmptyUL$:function($l$$14_parent$$47$$) {
      $l$$14_parent$$47$$ = $l$$14_parent$$47$$.find("ul").filter(function() {
        return!this.firstChild || 0 == this.childNodes.length || 1 == this.childNodes.length && 3 == this.firstChild.nodeType;
      });
      0 < $l$$14_parent$$47$$.length && $l$$14_parent$$47$$.remove();
    }, $_loadHtmlString$:function($nodes$$8_parent$$48_s$$23$$, $obj$$94$$, $s_call$$6$$) {
      if ($nodes$$8_parent$$48_s$$23$$ && "" !== $nodes$$8_parent$$48_s$$23$$ && $nodes$$8_parent$$48_s$$23$$.toString && "" !== $nodes$$8_parent$$48_s$$23$$.toString().replace(/^[\s\n]+$/, "")) {
        $nodes$$8_parent$$48_s$$23$$ = $$$$60$$($nodes$$8_parent$$48_s$$23$$);
        $nodes$$8_parent$$48_s$$23$$.is("ul") || ($nodes$$8_parent$$48_s$$23$$ = $$$$60$$("\x3cul /\x3e").append($nodes$$8_parent$$48_s$$23$$));
        -1 != $obj$$94$$ && $obj$$94$$ ? ($obj$$94$$.children("a.oj-tree-loading").removeClass("oj-tree-loading"), $obj$$94$$.append($nodes$$8_parent$$48_s$$23$$).children("ul").find("li, a").filter(function() {
          return!this.firstChild || !this.firstChild.tagName || "INS" !== this.firstChild.tagName;
        }).prepend("\x3cins class\x3d'oj-tree-icon'\x3e\x26#160;\x3c/ins\x3e").end().filter("a").children("ins:first-child").not(".oj-tree-node-icon").addClass("oj-tree-node-icon").addClass("oj-tree-icon"), $obj$$94$$.removeData("oj-tree-is-loading"), $nodes$$8_parent$$48_s$$23$$ = $obj$$94$$, this.$_addDefType$(this.$obj$)) : (this.$_$container_ul$.empty().append($nodes$$8_parent$$48_s$$23$$.children()).find("li, a").filter(function() {
          return!this.firstChild || !this.firstChild.tagName || "INS" !== this.firstChild.tagName;
        }).prepend("\x3cins class\x3d'oj-tree-icon oj-tree-disclosure-icon'\x3e\x26#160;\x3c/ins\x3e").end().filter("a").children("ins:first-child").not(".oj-tree-node-icon").addClass("oj-tree-node-icon").addClass("oj-tree-icon"), this.$_$container_ul$.find("li.oj-tree-leaf ins:first-child").removeClass("oj-tree-icon oj-tree-disclosure-icon oj-component-icon oj-clickable-icon oj-default").removeClass("oj-tree-node-icon").addClass("oj-tree-icon"), $nodes$$8_parent$$48_s$$23$$ = this.$_$container_ul$, 
        this.$_addDefType$(this.$_$container_ul$));
        $nodes$$8_parent$$48_s$$23$$ && this.$_insertHtmlTextSpan$($nodes$$8_parent$$48_s$$23$$);
        $nodes$$8_parent$$48_s$$23$$ = $nodes$$8_parent$$48_s$$23$$.children("UL");
        if (1 <= $nodes$$8_parent$$48_s$$23$$.length) {
          $nodes$$8_parent$$48_s$$23$$ = $nodes$$8_parent$$48_s$$23$$.first().find("span.oj-tree-title");
          var $_this$$19$$ = this;
          $$$$60$$.each($nodes$$8_parent$$48_s$$23$$, function() {
            this.textContent = $_this$$19$$.$_escapeHtml$(this.textContent);
          });
        }
        this.$_cleanNode$($obj$$94$$);
        $s_call$$6$$ && $s_call$$6$$.call(this);
      } else {
        $obj$$94$$ && -1 !== $obj$$94$$ ? ($obj$$94$$.children("a.oj-tree-loading").removeClass("oj-tree-loading"), $obj$$94$$.removeData("oj-tree-is-loading"), this.$_data$.$ds$.$correctState$ && (this.$_correct_state$($obj$$94$$), $s_call$$6$$ && $s_call$$6$$.call(this))) : this.$_data$.$ds$.$correctState$ && (this.$_$container_ul$.empty(), $s_call$$6$$ && $s_call$$6$$.call(this));
      }
    }, $_insertHtmlTextSpan$:function($elem$$78$$) {
      $$$$60$$.each($elem$$78$$.find("li a"), function($i$$412$$, $val$$73$$) {
        var $ih$$ = $val$$73$$.innerHTML, $ih$$ = $ih$$.replace("ins\x3e", "ins\x3e\x3cspan class\x3d'oj-tree-title'\x3e");
        $val$$73$$.innerHTML = $ih$$ + "\x3c/span\x3e";
      });
    }, $_addDefType$:function($obj$$95$$) {
      var $s$$24$$, $typeAttr$$1$$;
      this.$_data$.types.$defType$ && ($typeAttr$$1$$ = ($s$$24$$ = this.options.types) ? $s$$24$$.attr : this.$_data$.types.$defaults$.attr, $$$$60$$.each($obj$$95$$.find("li"), function($i$$413$$, $val$$74$$) {
        $val$$74$$ = $$$$60$$($val$$74$$);
        $val$$74$$.attr($typeAttr$$1$$) || $val$$74$$.attr($typeAttr$$1$$, "oj-tree-deftype").addClass("oj-tree-type");
      }));
    }, $_save_opened$:function() {
      var $_this$$20$$ = this;
      this.$_data$.$core$.$toExpand$ = [];
      this.$_$container_ul$.find("li.oj-expanded").each(function() {
        this.id && $_this$$20$$.$_data$.$core$.$toExpand$.push("#" + this.id.toString().replace(/^#/, "").replace(/\\\//g, "/").replace(/\//g, "\\/").replace(/\\\./g, ".").replace(/\./g, "\\.").replace(/\:/g, "\\:"));
      });
    }, $_reload_nodes$:function($bIsCallback$$) {
      var $_this$$21$$ = this, $bDone$$ = !0, $current$$25$$ = [], $remaining$$1$$ = [], $n$$34$$, $id$$59$$;
      $bIsCallback$$ || (this.$_data$.$core$.$reopen$ = !1, this.$_data$.$core$.$refreshing$ = !0);
      this.$_isOptExpandAll$() && (this.$_data$.$core$.$toExpand$ = [], this.$_$container_ul$.find("li.oj-collapsed").each(function() {
        $id$$59$$ = "#" + $$$$60$$(this).attr("id");
        $_this$$21$$.isExpanded($id$$59$$) || $_this$$21$$.$_data$.$core$.$toExpand$.push($id$$59$$);
      }));
      this.$_data$.$core$.$toExpand$ = $$$$60$$.map($$$$60$$.makeArray(this.$_data$.$core$.$toExpand$), function($n$$35$$) {
        return "#" + $n$$35$$.toString().replace(/^#/, "").replace(/\\\//g, "/").replace(/\//g, "\\/").replace(/\\\./g, ".").replace(/\./g, "\\.").replace(/\:/g, "\\:");
      });
      this.$_data$.$core$.$toLoad$ = $$$$60$$.map($$$$60$$.makeArray(this.$_data$.$core$.$toLoad$), function($n$$36$$) {
        return "#" + $n$$36$$.toString().replace(/^#/, "").replace(/\\\//g, "/").replace(/\//g, "\\/").replace(/\\\./g, ".").replace(/\./g, "\\.").replace(/\:/g, "\\:");
      });
      this.$_data$.$core$.$toExpand$.length && (this.$_data$.$core$.$toLoad$ = this.$_data$.$core$.$toLoad$.concat(this.$_data$.$core$.$toExpand$), this.$_data$.$core$.$toLoad$ = this.$_data$.$core$.$toLoad$.reduce(function($a$$122$$, $b$$75$$) {
        0 > $a$$122$$.indexOf($b$$75$$) && $a$$122$$.push($b$$75$$);
        return $a$$122$$;
      }, []));
      this.$_data$.$core$.$toLoad$.length && ($$$$60$$.each(this.$_data$.$core$.$toLoad$, function($i$$414$$, $val$$75$$) {
        if ("#" == $val$$75$$) {
          return!0;
        }
        $n$$34$$ = $_this$$21$$.$_$container$.find($val$$75$$);
        $n$$34$$.length ? $_this$$21$$.isExpanded($val$$75$$) || $current$$25$$.push($val$$75$$) : $remaining$$1$$.push($val$$75$$);
      }), $current$$25$$.length && (this.$_data$.$core$.$toLoad$ = $remaining$$1$$, $$$$60$$.each($current$$25$$, function($i$$415$$, $val$$76$$) {
        $_this$$21$$.$_is_loaded$($val$$76$$) || ($_this$$21$$.$_load_node$($val$$76$$, function() {
          $_this$$21$$.$_reload_nodes$(!0);
        }, function() {
          $_this$$21$$.$_reload_nodes$(!0);
        }), $bDone$$ = !1);
      })));
      this.$_data$.$core$.$toExpand$.length && $$$$60$$.each(this.$_data$.$core$.$toExpand$, function($i$$416$$, $val$$77$$) {
        $_this$$21$$.isExpanded($val$$77$$) || $_this$$21$$.$_expand$($val$$77$$, !1, !0);
      });
      $bDone$$ && (this.$_data$.$core$.$reopen$ && clearTimeout(this.$_data$.$core$.$reopen$), this.$_data$.$core$.$reopen$ = setTimeout(function() {
        $_this$$21$$.$_emitEvent$({}, "reload_nodes", !0);
      }, 50), this.$_data$.$core$.$refreshing$ = !1, this.$_reopen$());
    }, setTheme:function($theme_name$$, $theme_url$$) {
      if (!$theme_name$$) {
        return!1;
      }
      $theme_url$$ || ($theme_url$$ = this.$_data$.$themes$.$_themes$ + $theme_name$$ + "/style.css");
      -1 == $$$$60$$.inArray($theme_url$$, this.$_data$.$themes$.$themes_loaded$) && ($_addSheet$$({url:$theme_url$$}), this.$_data$.$themes$.$themes_loaded$.push($theme_url$$));
      this.$_data$.$themes$.$theme$ != $theme_name$$ && (this.$_$container$.removeClass("oj-tree-" + this.$_data$.$themes$.$theme$), this.$_data$.$themes$.$theme$ = $theme_name$$);
      this.$_$container$.addClass("oj-tree-" + $theme_name$$);
      this.$_data$.$themes$.$dots$ ? this.$_showDots$() : this.$_hideDots$();
      this.$_data$.$themes$.icons ? this.$_showIcons$() : this.$_hideIcons$();
    }, $_isTheme$:function() {
      return null != this.$_data$.$themes$;
    }, $_getTheme$:function() {
      return this.$_data$.$themes$.$theme$;
    }, isIcons:function() {
      return this.$_data$.$themes$.icons;
    }, $_showIcons$:function() {
      this.$_data$.$themes$.icons = !0;
      this.$_$container$.children("ul").removeClass("oj-tree-no-icons");
    }, $_hideIcons$:function() {
      this.$_data$.$themes$.icons = !1;
      this.$_$container$.children("ul").addClass("oj-tree-no-icons");
    }, toggleIcons:function() {
    }, $_enableKeys$:function() {
      this.$_data$.keys.$enabled$ = !0;
    }, $_initTree$:function() {
      this.$_initData$();
      this.$_initCoreOpts$();
      this.$_initDSOpts$(!0);
      this.$_initTypeOpts$();
      this.$_getDndContext$().$initDnDOpts$();
      this.$_initCore$();
      this.$_initUI$();
      this.$_initThemes$();
      this.$_initDataSource$();
      this.$_initTypes$();
      this.$_getDndContext$().$initDnD$();
      this.$_initMenu$();
    }, $_emitEvent$:function($data$$174$$, $evname$$, $bInternal$$) {
      if ($evname$$ && "string" === $$$$60$$.type($evname$$) && (!0 !== this.$_data$.$core$.locked || "unlock" === $evname$$ || "isLocked" === $evname$$ || "lock" === $evname$$)) {
        var $func$$11_inst$$, $args$$22_bContinue$$ = Array.prototype.slice.call(arguments);
        $func$$11_inst$$ = this.$_$container$;
        var $isBefore$$ = "before" === $evname$$, $isPublic$$ = $bInternal$$ ? !1 : !0;
        $isPublic$$ || ($evname$$ = "_tree" + $evname$$);
        var $eventdata$$ = {};
        $eventdata$$.item = $data$$174$$ ? $data$$174$$.obj : void 0;
        $eventdata$$.inst = $func$$11_inst$$;
        $isBefore$$ ? ($func$$11_inst$$ = $data$$174$$.func, $eventdata$$.func = $func$$11_inst$$, $eventdata$$.args = $args$$22_bContinue$$, "rename" === $func$$11_inst$$ && ($eventdata$$.title = $data$$174$$.title, $eventdata$$.prevTitle = $data$$174$$.prevTitle)) : $isPublic$$ && ("move" == $evname$$ ? ($eventdata$$.position = $data$$174$$.$p$, $eventdata$$.reference = $data$$174$$.$r$, $eventdata$$.data = $data$$174$$) : "rename" == $evname$$ ? ($eventdata$$.title = $data$$174$$.title, $eventdata$$.prevTitle = 
        $data$$174$$.prevTitle) : "remove" == $evname$$ ? ($eventdata$$.parent = $data$$174$$.parent, $eventdata$$.prev = $data$$174$$.prev) : "delete" == $evname$$ ? ($eventdata$$.prev = $data$$174$$.prev, $eventdata$$.parent = $data$$174$$.parent) : "expandAll" === $evname$$ || "collapseAll" === $evname$$ || "deselectAll" === $evname$$ ? $eventdata$$.targ = $data$$174$$.targ : "loaded" === $evname$$ && ($eventdata$$.item = -1));
        if ($isPublic$$) {
          if ($args$$22_bContinue$$ = this._trigger($evname$$, new $$$$60$$.Event("oj" + $evname$$), $eventdata$$), $isBefore$$) {
            return "undefined" != typeof $args$$22_bContinue$$ && ($args$$22_bContinue$$ = $args$$22_bContinue$$ ? !0 : !1), $args$$22_bContinue$$;
          }
        } else {
          this.$_$container$.trigger($evname$$, $eventdata$$);
        }
      }
    }, $_fireOptionChangeEvent$:function($key$$175$$, $prevVal$$, $newVal$$4$$, $origEvent$$) {
      "selection" === $key$$175$$ && (null == $newVal$$4$$ && ($newVal$$4$$ = this.$_getSelected$()), this.$_compareSelectionValues$($prevVal$$, $newVal$$4$$) || this.option($key$$175$$, $newVal$$4$$, {_context:{originalEvent:$origEvent$$, $internalSet$:!0}, changed:!0}));
    }, $__rollback$:function() {
      return this.get_rollback();
    }, $_start$:function() {
      this.$_isRtl$ && this.$_$container$.addClass("oj-tree-rtl").css("direction", "rtl");
      this.$_$container$.html("\x3cul role\x3d'tree' tabindex\x3d'0' class\x3d'oj-tree-list' style\x3d'outline:none'" + (-1 === this.$_data$.$core$.$selectMode$ ? " aria-multiselectable\x3d'true'" : "") + "\x3e\x3cli class\x3d'oj-tree-last oj-tree-leaf'\x3e\x3cins class\x3d'oj-tree-icon'\x3e\x26#160;\x3c/ins\x3e\x3ca class\x3d'oj-tree-loading' href\x3d'#'\x3e\x3cins class\x3d'oj-tree-icon'\x3e\x26#160;\x3c/ins\x3e" + this.$_getString$("stateLoading") + "\x3c/a\x3e\x3c/li\x3e\x3c/ul\x3e");
      this.$_$container_ul$ = this.$_$container$.children("ul:eq(0)");
      this.$_$container$.data("oj-tree-instance-id", this.$_getIndex$());
      this.$_data$.$core$.$li_height$ = this.$_$container_ul$.find("li.oj-collapsed, li.oj-tree-leaf").eq(0).height() || 18;
      this.$_isTouch$ && this.$_$container$.delegate(".oj-tree-list ins.oj-tree-disclosure-icon", "touchend.ojtree", $$$$60$$.proxy(function($event$$562_trgt$$) {
        $event$$562_trgt$$.preventDefault();
        $event$$562_trgt$$ = $$$$60$$($event$$562_trgt$$.target);
        this.toggleExpand($event$$562_trgt$$);
      }, this));
      this.$_$container$.delegate(".oj-tree-list ins.oj-tree-disclosure-icon", "click.ojtree", $$$$60$$.proxy(function($event$$563_trgt$$1$$) {
        $event$$563_trgt$$1$$ = $$$$60$$($event$$563_trgt$$1$$.target);
        this.toggleExpand($event$$563_trgt$$1$$);
      }, this)).delegate(".oj-tree-list ins.oj-tree-disclosure-icon", "mousedown", $$$$60$$.proxy(function($event$$564$$) {
        this.$_data$.ui.$disclosureClick$ = !0;
        $$$$60$$($event$$564$$.target).removeClass("oj-default").removeClass($TreeUtils$$.$_OJ_HOVER$).addClass($TreeUtils$$.$_OJ_SELECTED$);
      }, this)).delegate(".oj-tree-list ins.oj-tree-disclosure-icon", "mouseup", $$$$60$$.proxy(function($event$$565$$) {
        $$$$60$$($event$$565$$.target).removeClass($TreeUtils$$.$_OJ_SELECTED$).addClass("oj-default");
      }, this)).bind("mousedown.ojtree", $$$$60$$.proxy(function() {
        this.$_setFocus$();
      }, this)).bind("dblclick.ojtree", function() {
        var $sel$$3$$;
        if (document.selection && document.selection.empty) {
          document.selection.empty();
        } else {
          if (window.getSelection) {
            $sel$$3$$ = window.getSelection();
            try {
              $sel$$3$$.removeAllRanges(), $sel$$3$$.collapse(document.getElementsByTagName("body")[0], 0);
            } catch ($err$$28$$) {
            }
          }
        }
      });
      this.$_$container_ul$.focus($$$$60$$.proxy(function() {
        if (this.$_data$.ui.$disclosureClick$) {
          this.$_data$.ui.$disclosureClick$ = !1;
        } else {
          this.$_data$.ui.$focused$ = !0;
          var $n$$37$$;
          this.$_data$.ui.$lastHovered$ ? (this.$_data$.ui.$hovered$ = this.$_data$.ui.$lastHovered$, $n$$37$$ = this.$_data$.ui.$hovered$) : this.$_data$.ui.$lastSelected$ && 0 < this.$_data$.ui.$lastSelected$.length ? (this.$_data$.ui.$hovered$ = this.$_data$.ui.$lastSelected$, $n$$37$$ = this.$_data$.ui.$hovered$) : $n$$37$$ = this.$_$container_ul$.find("li:first");
          $n$$37$$ && (this.hover($n$$37$$), this.$_data$.ui.$lastHovered$ = null, this.$_$container_ul$.find("a.oj-selected").removeClass("oj-tree-inactive"));
        }
      }, this)).blur($$$$60$$.proxy(function() {
        this.$_data$.ui.$focused$ = !1;
        this.$_data$.ui.$lastHovered$ = this.$_data$.ui.$hovered$;
        this.$_data$.ui.$lastHovered$ && this.dehover(this.$_data$.ui.$hovered$);
        this.$_$container_ul$.find("a.oj-selected").addClass("oj-tree-inactive");
      }, this));
      this.$_emitEvent$({}, "init", !0);
      this.$_loadNodes$();
      this.$_data$.menu.$usermenu$ && this.$_applyMenu$();
      $_addKeyFilter$$({$_handler$:this.$_keyHandler$, $_selector$:this.$_$container_ul$, $_this$:this});
      this.$_enableKeys$();
    }, $_initCore$:function() {
      this.$_data$.$core$.locked = !1;
      this.$_$container$.addClass("oj-tree oj-tree-" + this.$_getIndex$());
      this.$_$container$.css("outline", "none");
      this.$_$container$.css("MozUserSelect", "none");
      this.$_$container$.css("WebkitTouchCallout", "none");
      this.$_$container$.css("WebkitUserSelect", "none");
      this.$_$container$.css("WebkitTapHighlightColor", "rgba(0,0,0,0)");
    }, $_initUI$:function() {
      this.$_data$.ui.selected = $$$$60$$();
      this.$_data$.ui.$lastSelected$ = !1;
      this.$_data$.ui.$hovered$ = null;
      var $a$$123$$ = this.options.selection;
      $a$$123$$ && "array" === $$$$60$$.type($a$$123$$) && 0 < $a$$123$$.length && (this.$_data$.ui.$to_select$ = $a$$123$$, this.options.selection = []);
      this.$_isTouch$ && this.$_$container$.delegate(".oj-tree-list a", "touchend.ojtree", $$$$60$$.proxy(function($event$$567$$) {
        this.$_data$.ui.$touchEvent$ = !0;
        this.$_handleNodeTapClick$($event$$567$$);
        $$$$60$$($event$$567$$.currentTarget).hasClass("oj-tree-loading") || this.dehover();
      }, this));
      this.$_$container$.delegate(".oj-tree-list a", "click.ojtree", $$$$60$$.proxy(function($event$$568$$) {
        this.$_data$.ui.$touchEvent$ = !1;
        this.$_handleNodeTapClick$($event$$568$$);
      }, this)).delegate(".oj-tree-list a", "mouseenter.ojtree", $$$$60$$.proxy(function($event$$569$$) {
        $$$$60$$($event$$569$$.currentTarget).hasClass("oj-tree-loading") || this.hover($event$$569$$.target);
      }, this)).delegate(".oj-tree-list a", "mouseleave.ojtree", $$$$60$$.proxy(function($event$$570$$) {
        $$$$60$$($event$$570$$.currentTarget).hasClass("oj-tree-loading") || this.dehover($event$$570$$.target);
      }, this)).delegate(".oj-tree-list .oj-tree-disclosure-icon", "mouseenter.ojtree", $$$$60$$.proxy(function($event$$571$$) {
        $$$$60$$($event$$571$$.currentTarget).hasClass("oj-tree-loading") || this.$_disclosureHover$($event$$571$$.target, !0);
      }, this)).delegate(".oj-tree-list .oj-tree-disclosure-icon", "mouseleave.ojtree", $$$$60$$.proxy(function($event$$572$$) {
        $$$$60$$($event$$572$$.currentTarget).hasClass("oj-tree-loading") || this.$_disclosureHover$($event$$572$$.target, !1);
      }, this)).bind("_treereopen", $$$$60$$.proxy(function() {
        this.reselect();
      }, this)).bind("_treeget_rollback", $$$$60$$.proxy(function() {
        this.dehover();
        this.saveSelected();
      }, this)).bind("ojcollapse", $$$$60$$.proxy(function($event$$573$$, $ui$$42$$) {
        var $obj$$96$$ = this.$_getNode$($ui$$42$$.item), $clk$$ = $obj$$96$$ && $obj$$96$$.length ? $obj$$96$$.children("ul").find("a.oj-selected") : $$$$60$$();
        !1 !== this.options.selectedParentCollapse && $clk$$.length && $clk$$.each(function() {
          this.deselect(this);
          "selectParent" === this.options.selectedParentCollapse && this.select($obj$$96$$);
        });
      }, this)).bind("ojremove", $$$$60$$.proxy(function($event$$574$$, $ui$$43$$) {
        var $s$$25$$ = this.options.selectPrevOnDelete, $clk$$1_obj$$97$$ = this.$_getNode$($ui$$43$$.item), $clk$$1_obj$$97$$ = $clk$$1_obj$$97$$ && $clk$$1_obj$$97$$.length ? $clk$$1_obj$$97$$.find("a.oj-selected") : [], $_this$$23$$ = this, $n$$38$$;
        $clk$$1_obj$$97$$.each(function() {
          $_this$$23$$.deselect(this);
          $_this$$23$$.$_data$.ui.$lastHovered$ && ($n$$38$$ = $_this$$23$$.$_getNode$(this)) && $_this$$23$$.$_data$.ui.$lastHovered$.attr("id") == $n$$38$$.attr("id") && ($_this$$23$$.$_data$.ui.$lastHovered$ = null);
        });
        $s$$25$$ && $clk$$1_obj$$97$$.length && $ui$$43$$.prev && $ui$$43$$.prev.each(function() {
          if (this.parentNode) {
            return $_this$$23$$.select(this), !1;
          }
        });
      }, this)).bind("ojmove", $$$$60$$.proxy(function($event$$575$$, $ui$$44$$) {
        var $data$$175$$ = $ui$$44$$.data, $copy$$1_p$$12$$ = $data$$175$$.$cy$;
        $copy$$1_p$$12$$ && $data$$175$$.$oc$ && ($data$$175$$.$oc$.find("a.oj-selected").removeClass($TreeUtils$$.$_OJ_SELECTED$), $data$$175$$.$oc$.removeAttr("aria-selected"));
        $data$$175$$.$ot$ === $data$$175$$.$rt$ || $copy$$1_p$$12$$ || ($copy$$1_p$$12$$ = $data$$175$$.$ot$.$_data$.ui, $copy$$1_p$$12$$.$lastHovered$ && ($data$$175$$.$o$.attr("id") == $copy$$1_p$$12$$.$lastHovered$.attr("id") && ($copy$$1_p$$12$$.$lastHovered$ = null), $copy$$1_p$$12$$.$lastSelected$ && $data$$175$$.$o$.attr("id") == $copy$$1_p$$12$$.$lastSelected$.attr("id") && ($copy$$1_p$$12$$.$lastSelected$ = null)));
      }, this));
    }, $_initDataSource$:function() {
      this.$_initTreeData$();
      this.$_initJsonData$();
      this.$_initHtmlData$();
    }, $_initTreeData$:function() {
      1 === this.$_data$.$ds$.type && (this.$_tds$ = this.options.data || null, this.$_load_node$ = this.$_load_node_DS$, this.$_is_loaded$ = this.$_is_loaded_DS$, this.$_refresh$ = this.$_refresh_DS$);
    }, $_initJsonData$:function() {
      3 === this.$_data$.$ds$.type && (this.$_data$.$ds$.$progressiveUnload$ && this.$_$container$.bind("_treeafter_close", function($e$$124$$, $ui$$45$$) {
        $ui$$45$$.item.children("ul").remove();
      }), this.$_load_node$ = this.$_load_node_J$, this.$_is_loaded$ = this.$_is_loaded_J$, this.$_refresh$ = this.$_refresh_json$);
    }, $_initHtmlData$:function() {
      4 === this.$_data$.$ds$.type && (this.$_processExistingMarkup$(), this.$_load_node$ = this.$_load_node_H$, this.$_is_loaded$ = this.$_is_loaded_H$, this.$_refresh$ = this.$_refresh_ui$);
    }, $_processExistingMarkup$:function() {
      this.$_data$.html.$useExistingMarkup$ && (this.$_data$.html.$markup_ul$ || (this.$_data$.html.$markup_ul$ = this.$_$container$.find(" \x3e ul"), this.$_data$.html.$markup_div$ = $$$$60$$("\x3cdiv id\x3d'oj-tree-existing-markup-" + this.$_getIndex$() + "' style\x3d'display:none'\x3e").append(this.$_data$.html.$markup_ul$), this.$_$container$.after(this.$_data$.html.$markup_div$)), this.$_data$.html.$markup$ = this.$_data$.html.$markup_ul$.find(" \x3e li"), this.$_data$.html.$cloneMarkup$ = this.$_data$.html.$markup$.clone(!0), 
      this.$_data$.html.$cloneMarkup$.find("li").addBack().contents().filter(function() {
        return 3 == this.nodeType;
      }).remove());
    }, $_initThemes$:function() {
      !1 === this.$_data$.$themes$.$_themes$ && $$$$60$$("script").each(function() {
        if (this.src.toString().match(/jquery\.oj-tree[^\/]*?\.js(\?.*)?$/)) {
          return this.$_data$.$themes$.$_themes$ = this.src.toString().replace(/jquery\.oj-tree[^\/]*?\.js(\?.*)?$/, "") + "themes/", !1;
        }
      });
      !1 === this.$_data$.$themes$.$_themes$ && (this.$_data$.$themes$.$_themes$ = "themes/");
      this.$_$container$.bind("_treeinit", $$$$60$$.proxy(function() {
        var $s$$26$$ = this.options;
        this.$_data$.$themes$.$dots$ = $s$$26$$.dots;
        this.$_data$.$themes$.icons = $s$$26$$.icons;
        this.setTheme(this.$_data$.$themes$.$theme$, this.$_data$.$themes$.url);
      }, this)).bind("ojloaded", $$$$60$$.proxy(function() {
        this.$_data$.$themes$.$dots$ ? this.$_showDots$() : this.$_hideDots$();
        this.$_data$.$themes$.icons ? this.$_showIcons$() : this.$_hideIcons$();
      }, this));
    }, $_initTypes$:function() {
      var $s$$27$$ = this.options.types;
      $s$$27$$ && this.$_$container$.bind("_treeinit", $$$$60$$.proxy(function() {
        var $types$$ = $$$$60$$.extend(!0, {}, $s$$27$$.types), $attr$$19$$ = $s$$27$$.attr || this.$_data$.types.$defaults$.attr, $icons_css$$ = "", $_this$$24$$ = this;
        $$$$60$$.each($types$$, function($i$$417$$, $tp$$) {
          $$$$60$$.each($tp$$, function($k$$15$$) {
            /^(maxDepth|maxChildren|icon|validChildren)$/.test($k$$15$$) || $_this$$24$$.$_data$.types.$attachTo$.push($k$$15$$);
          });
          var $ot$$1$$ = typeof $tp$$.icon;
          if ("undefined" === $ot$$1$$) {
            $ot$$1$$ = typeof $tp$$.image;
            if ("boolean" === $ot$$1$$ && !$tp$$.image) {
              $tp$$.image = "ojt$none";
            } else {
              if (!$tp$$.image && !$tp$$.position) {
                return!0;
              }
            }
            $tp$$.icon = {};
            $tp$$.image && ($tp$$.icon.image = $tp$$.image, delete $tp$$.image);
            void 0 !== $tp$$.position && ($tp$$.icon.position = $tp$$.position, delete $tp$$.position);
          }
          if ($tp$$.icon.image || $tp$$.icon.position) {
            "default" == $i$$417$$ ? ($_this$$24$$.$_data$.types.$defType$ = !0, $icons_css$$ += ".oj-tree-" + $_this$$24$$.$_getIndex$() + " .oj-tree-list li.oj-tree-type a \x3e .oj-tree-node-icon { ", $icons_css$$ += $_this$$24$$.$_addTypeCss$($tp$$, $icons_css$$), $icons_css$$ += "} ", $icons_css$$ += ".oj-tree-" + $_this$$24$$.$_getIndex$() + " .oj-tree-list li[" + $attr$$19$$ + '\x3d"oj-tree-deftype"].oj-tree-type \x3e a ins.oj-tree-node-icon { ') : $tp$$.icon.image && ($icons_css$$ += ".oj-tree-" + 
            $_this$$24$$.$_getIndex$() + " .oj-tree-list li[" + $attr$$19$$ + '\x3d"' + $i$$417$$ + '"].oj-tree-type \x3e a \x3e ins.oj-tree-node-icon { '), $icons_css$$ += $_this$$24$$.$_addTypeCss$($tp$$, $icons_css$$), $icons_css$$ += "} ";
          }
        });
        "" !== $icons_css$$ && $_addSheet$$({$str$:$icons_css$$, title:"oj-tree-types"});
      }, this)).bind("ojbefore", $$$$60$$.proxy(function($e$$125$$, $data$$176$$) {
        var $d$$19_o$$20_s$$28$$, $ty$$1$$, $func$$12$$ = $data$$176$$.func, $item$$122$$ = $data$$176$$.item;
        if (($d$$19_o$$20_s$$28$$ = ($d$$19_o$$20_s$$28$$ = this.$_data$.types.$defaults$.useData ? this.$_getNode$($item$$122$$) : !1) && -1 !== $d$$19_o$$20_s$$28$$ && $d$$19_o$$20_s$$28$$.length ? $d$$19_o$$20_s$$28$$.data("oj-tree") : !1) && $d$$19_o$$20_s$$28$$.types && !1 === $d$$19_o$$20_s$$28$$[$func$$12$$] || -1 !== $$$$60$$.inArray($func$$12$$, this.$_data$.types.$attachTo$) && $data$$176$$.item && ($data$$176$$.item.tagName || $data$$176$$.item.jquery) && ($d$$19_o$$20_s$$28$$ = this.options.types.types, 
        $ty$$1$$ = this.$_getType$($item$$122$$), ($d$$19_o$$20_s$$28$$[$ty$$1$$] && "undefined" !== typeof $d$$19_o$$20_s$$28$$[$ty$$1$$][$func$$12$$] || $d$$19_o$$20_s$$28$$["default"] && "undefined" !== typeof $d$$19_o$$20_s$$28$$["default"][$func$$12$$]) && !1 === this.$_check$($func$$12$$, $item$$122$$))) {
          return $e$$125$$.stopImmediatePropagation(), !1;
        }
      }, this));
    }, $_addTypeCss$:function($tp$$1$$) {
      var $css$$1$$ = "", $css$$1$$ = "ojt$none" !== $tp$$1$$.icon.image ? $css$$1$$ + (" background-image:url(" + $tp$$1$$.icon.image + "); ") : $css$$1$$ + " background-image:none; ";
      return $css$$1$$ = $tp$$1$$.icon.position ? $css$$1$$ + (" background-position:" + $tp$$1$$.icon.position + "; ") : $css$$1$$ + " background-position:0 0; ";
    }, $_getDndContext$:function() {
      this.$_TreeDndContext$ || (this.$_TreeDndContext$ = new $oj$$65$$.$TreeDndContext$(this));
      return this.$_TreeDndContext$;
    }, $_initKeys$:function() {
    }, $_initMenu$:function($newVal$$5$$) {
      var $$m$$1_menu$$19$$, $dm_t$$12$$;
      $newVal$$5$$ || this.options.contextMenu || ($$m$$1_menu$$19$$ = this.$_$container$.attr("contextmenu")) && (this.options.contextMenu = "#" + $$m$$1_menu$$19$$);
      if ($newVal$$5$$ || this.options.contextMenu) {
        $$m$$1_menu$$19$$ = $newVal$$5$$ || this.options.contextMenu;
        $dm_t$$12$$ = $$$$60$$.type($$m$$1_menu$$19$$);
        if ("function" == $dm_t$$12$$) {
          try {
            $$m$$1_menu$$19$$ = $$m$$1_menu$$19$$();
          } catch ($e$$126$$) {
            $$m$$1_menu$$19$$ = null;
          }
          $dm_t$$12$$ = $$$$60$$.type($$m$$1_menu$$19$$);
        }
        if ("string" === $dm_t$$12$$) {
          if ($$m$$1_menu$$19$$ = $$$$60$$($$m$$1_menu$$19$$)) {
            $$m$$1_menu$$19$$.css("display", "none"), $dm_t$$12$$ = this.$_data$.menu, $dm_t$$12$$.$$container$ = $$m$$1_menu$$19$$, $dm_t$$12$$.$usermenu$ = !0;
          }
          this.$_data$.menu.$usermenu$ && $newVal$$5$$ && this.$_applyMenu$();
        }
      }
    }, $_handleContextMenuSelect$:function($ev$$5$$, $ui$$46$$) {
      if (!$ui$$46$$.inst && this.$_data$.menu.$treeDivId$ == this.$_elemId$.substr(1)) {
        var $id$$60$$ = $ui$$46$$ ? $ui$$46$$.item.attr("id") : void 0;
        "ojtreecopy" === $id$$60$$ ? this.$_crrm_copy$(this.$_data$.menu.$node$) : "ojtreecut" === $id$$60$$ ? this.$_crrm_cut$(this.$_data$.menu.$node$) : "ojtreepaste" === $id$$60$$ ? this.$_crrm_paste$(this.$_data$.menu.$node$) : "ojtreeremove" === $id$$60$$ ? this.isSelected(this.$_data$.menu.$node$) ? this.$_crrm_remove$() : this.$_crrm_remove$(this.$_data$.menu.$node$) : "ojtreerename" === $id$$60$$ ? this.$_crrm_rename$(this.$_data$.menu.$node$) : "ojtreecreate" === $id$$60$$ && this.$_crrm_create$(this.$_data$.menu.$node$);
      }
    }, $_NotifyContextMenuGesture$:function($menu$$20_openOptions$$6$$, $event$$576$$, $eventType$$50$$) {
      var $disabledState$$1_keyboard$$1$$ = "keyboard" === $eventType$$50$$;
      if ("contextmenu" == $event$$576$$.type || $disabledState$$1_keyboard$$1$$ || "touch" == $eventType$$50$$) {
        this.$_data$.menu.$node$ = $disabledState$$1_keyboard$$1$$ ? this.$_data$.ui.$hovered$ : $$$$60$$($event$$576$$.target);
        var $textElem$$ = this.$_data$.menu.$node$.find(".oj-tree-title")[0];
        this.$_data$.menu.$activenode$ = null;
        this.$_data$.menu.$node$ ? (this.$_data$.menu.$treeDivId$ = this.$_data$.menu.$node$.closest("div").attr("id"), $menu$$20_openOptions$$6$$ = {launcher:this.$_$container_ul$}, $disabledState$$1_keyboard$$1$$ && ($menu$$20_openOptions$$6$$.position = {of:$textElem$$}), this.$_data$.menu.$usermenu$ && this.$_data$.menu.$$elemPaste$ && ($disabledState$$1_keyboard$$1$$ = !this.$_data$.$crrm$.$ct_nodes$ && !this.$_data$.$crrm$.$cp_nodes$, !!this.$_data$.menu.$$elemPaste$.hasClass($TreeUtils$$.$_OJ_DISABLED$) != 
        $disabledState$$1_keyboard$$1$$ && ($disabledState$$1_keyboard$$1$$ ? this.$_data$.menu.$$elemPaste$.addClass($TreeUtils$$.$_OJ_DISABLED$) : this.$_data$.menu.$$elemPaste$.removeClass($TreeUtils$$.$_OJ_DISABLED$), this.$_data$.menu.$$container$.ojMenu("refresh"))), this.$_OpenContextMenu$($event$$576$$, $eventType$$50$$, $menu$$20_openOptions$$6$$)) : $event$$576$$.preventDefault();
      }
    }, $_initCoreOpts$:function() {
      var $val$$78$$ = this.options.selectionMode, $val$$78$$ = void 0 == $val$$78$$ ? "single" : $val$$78$$;
      "none" === $val$$78$$ ? $val$$78$$ = 0 : "single" === $val$$78$$ ? $val$$78$$ = 1 : "multiple" === $val$$78$$ && ($val$$78$$ = -1);
      this.$_data$.$core$.$selectMode$ = $val$$78$$;
      this.$_data$.$themes$.icons = this.options.icons;
      this.$_initExpandedOpts$();
      this.$_data$.$core$.$toLoad$ = this.options.initLoaded;
    }, $_initUIOpts$:function() {
    }, $_initDSOpts$:function($bInit$$) {
      var $s$$29$$ = this.options.data, $dt$$9_ot$$2$$;
      this.$_data$.$ds$.type = 0;
      this.$_data$.html.$useExistingMarkup$ = !1;
      this.$_data$.html.$cloneMarkup$ = !1;
      if ($s$$29$$) {
        if ($dt$$9_ot$$2$$ = $$$$60$$.type($s$$29$$), "string" === $dt$$9_ot$$2$$) {
          this.$_isHtml$($s$$29$$) ? this.$_data$.$ds$.type = 4 : this.$_data$.$ds$.type = 3;
        } else {
          if ("array" === $dt$$9_ot$$2$$) {
            this.$_data$.$ds$.type = 3;
          } else {
            if ("object" === $dt$$9_ot$$2$$) {
              try {
                $s$$29$$ instanceof $oj$$65$$.$JsonTreeDataSource$ && (this.$_data$.$ds$.type = 1);
              } catch ($e$$127$$) {
                this.$_data$.$ds$.type = -1;
              }
              if (1 !== this.$_data$.$ds$.type) {
                try {
                  $s$$29$$ instanceof $oj$$65$$.$CollectionTreeDataSource$ && (this.$_data$.$ds$.type = 2);
                } catch ($e$$128$$) {
                  this.$_data$.$ds$.type = -1;
                }
              }
              1 !== this.$_data$.$ds$.type && 2 !== this.$_data$.$ds$.type && ($s$$29$$.data || $s$$29$$.ajax) && (($dt$$9_ot$$2$$ = $s$$29$$.dataType) ? "json" === $dt$$9_ot$$2$$ ? this.$_data$.$ds$.type = 3 : "html" === $dt$$9_ot$$2$$ && (this.$_data$.$ds$.type = 4) : ($s$$29$$.dataType = "json", this.$_data$.$ds$.type = 3));
            }
          }
        }
      }
      $bInit$$ && 0 == this.$_data$.$ds$.type && 0 < this.$_$container$.find("ul").length && (this.$_data$.$ds$.type = 4, this.$_data$.html.$useExistingMarkup$ = !0);
    }, $_initTreeDSOpts$:function() {
    }, $_initJsonOpts$:function() {
    }, $_initHtmlOpts$:function() {
    }, $_initMenuOpts$:function() {
    }, $_initTypeOpts$:function() {
      var $o$$21$$ = this.options.types;
      "object" === typeof $o$$21$$ && this.$_applyDefaults$($o$$21$$, {attr:this.$_data$.types.$defaults$.attr});
    }, $_initExpandedOpts$:function() {
      this.$_data$.$core$.$toExpand$ = this.$_varCopy$(this.options, "initExpanded");
      null == this.$_data$.$core$.$toExpand$ && (this.$_data$.$core$.$toExpand$ = []);
    }, $_initData$:function() {
      var $data$$177$$ = this.$_data$;
      $data$$177$$.$core$ = {$initLoaded$:[], $selectMode$:1, $load_open$:!1, $li_height$:0, $toExpand$:!1, $toLoad$:!1, $prepMoveBlk$:{}, $suppressSelectEvent$:!1, $strings$:{}};
      $data$$177$$.ui = {selected:$$$$60$$(), $lastSelected$:!1, $hovered$:null, $lastHovered$:null, $disclosureClick$:!1, $to_select$:null, opacity:1, $spacebar$:!1, $focused$:!1, $animDurDiv$:null, $touchEvent$:!1};
      $data$$177$$.ui.$defaults$ = {selectMultipleModifier:"ctrl", selectRangeModifier:"shift", disableSelectingChildren:!1};
      $data$$177$$.$crrm$ = {};
      $data$$177$$.$crrm$.$cp_nodes$ = !1;
      $data$$177$$.$crrm$.$ct_nodes$ = !1;
      $data$$177$$.$crrm$.$defaults$ = {inputWidthLimit:200, move:{alwaysCopy:!1, openOnMove:!0, defaultPosition:"last", checkMove:function $$data$$177$$$$crrm$$$defaults$$move$checkMove$() {
        return!0;
      }}};
      $data$$177$$.$crrm$.$prepMoveBlk$ = {};
      $data$$177$$.$ds$ = {};
      $data$$177$$.$ds$.$progressiveRender$ = !1;
      $data$$177$$.$ds$.$progressiveUnload$ = !1;
      $data$$177$$.$ds$.$correctState$ = !0;
      $data$$177$$.$ds$.type = 0;
      $data$$177$$.$json$ = {};
      $data$$177$$.$json$.$defaults$ = {data:!1, ajax:!1};
      $data$$177$$.html = {};
      $data$$177$$.html.$defaults$ = {data:!1, ajax:!1};
      $data$$177$$.html.$useExistingMarkup$ = !1;
      $data$$177$$.html.$markup_ul$ = !1;
      $data$$177$$.html.$markup_div$ = !1;
      $data$$177$$.html.$markup$ = !1;
      $data$$177$$.html.$cloneMarkup$ = !1;
      $data$$177$$.$themes$ = {};
      $data$$177$$.$themes$.icons = !0;
      $data$$177$$.$themes$.$dots$ = !1;
      $data$$177$$.$themes$.$theme$ = "default";
      $data$$177$$.$themes$.url = !1;
      $data$$177$$.$themes$.$themes_loaded$ = [];
      $data$$177$$.$themes$.$_themes$ = !1;
      $data$$177$$.types = {};
      $data$$177$$.types.$attachTo$ = [];
      $data$$177$$.types.$defType$ = !1;
      $data$$177$$.types.$defaults$ = {maxChildren:-1, maxDepth:-1, validChildren:"all", useData:!1, attr:"type", types:{"default":{maxChildren:-1, maxDepth:-1, validChildren:"all"}}};
      $data$$177$$.menu = {};
      $data$$177$$.menu.$usermenu$ = !1;
      $data$$177$$.menu.$$container$ = !1;
      $data$$177$$.menu.$$elemPaste$ = !1;
      $data$$177$$.menu.$node$ = !1;
      $data$$177$$.menu.$activenode$ = !1;
      $data$$177$$.keys = {};
      $data$$177$$.keys.$enabled$ = !0;
      $data$$177$$.keys.bound = [];
    }, $_fix_scroll$:function($obj$$98_t$$13$$) {
      var $c$$50$$ = this.$_$container$[0];
      $c$$50$$.scrollHeight > $c$$50$$.offsetHeight && ($obj$$98_t$$13$$ = this.$_getNode$($obj$$98_t$$13$$)) && -1 !== $obj$$98_t$$13$$ && $obj$$98_t$$13$$.length && $obj$$98_t$$13$$.is(":visible") && ($obj$$98_t$$13$$ = $obj$$98_t$$13$$.offset().top - this.$_$container$.offset().top, 0 > $obj$$98_t$$13$$ && ($c$$50$$.scrollTop = $c$$50$$.scrollTop + $obj$$98_t$$13$$ - 1), $obj$$98_t$$13$$ + this.$_data$.$core$.$li_height$ + ($c$$50$$.scrollWidth > $c$$50$$.offsetWidth ? $scrollbar_width$$ : 0) > 
      $c$$50$$.offsetHeight && ($c$$50$$.scrollTop += $obj$$98_t$$13$$ - $c$$50$$.offsetHeight + this.$_data$.$core$.$li_height$ + 1 + ($c$$50$$.scrollWidth > $c$$50$$.offsetWidth ? $scrollbar_width$$ : 0)));
    }, $_setFocus$:function() {
    }, $_unsetFocus$:function() {
    }, $_newIndex$:function() {
      return++$_instance$$;
    }, $_getIndex$:function() {
      return this.$_index$;
    }, $_getOptions$:function() {
      return $$$$60$$.extend(!0, {}, this.options);
    }, $_getContainer$:function() {
      return this.$_$container$;
    }, $_getContainerList$:function() {
      return this.$_$container_ul$;
    }, $_keyHandler$:{up:function() {
      this.hover(this.$_getPrev$(this.$_data$.ui.$hovered$ || this.$_data$.ui.$lastSelected$ || -1));
      return!1;
    }, "ctrl+up":function() {
      this.hover(this.$_getPrev$(this.$_data$.ui.$hovered$ || this.$_data$.ui.$lastSelected$ || -1));
      return!1;
    }, "shift+up":function() {
      this.select(this.$_getPrev$(this.$_data$.ui.$hovered$ || this.$_data$.ui.$lastSelected$ || -1), -1 !== this.$_data$.ui.$selectMode$);
      return!1;
    }, down:function() {
      this.hover(this.$_getNext$(this.$_data$.ui.$hovered$ || this.$_data$.ui.$lastSelected$ || -1));
      return!1;
    }, "ctrl+down":function() {
      this.hover(this.$_getNext$(this.$_data$.ui.$hovered$ || this.$_data$.ui.$lastSelected$ || -1));
      return!1;
    }, "shift+down":function() {
      this.select(this.$_getNext$(this.$_data$.ui.$hovered$ || this.$_data$.ui.$lastSelected$ || -1), -1 !== this.$_data$.ui.$selectMode$);
      return!1;
    }, left:function() {
      var $o$$28$$ = this.$_data$.ui.$hovered$ || this.$_data$.ui.$lastSelected$;
      $o$$28$$ && ($o$$28$$.hasClass($TreeUtils$$.$_OJ_EXPANDED$) ? this.collapse($o$$28$$) : this.hover(this.$_getPrev$($o$$28$$)));
      return!1;
    }, "ctrl+left":function() {
      var $o$$29$$ = this.$_data$.ui.$hovered$ || this.$_data$.ui.$lastSelected$;
      $o$$29$$ && ($o$$29$$.hasClass($TreeUtils$$.$_OJ_EXPANDED$) ? this.collapse($o$$29$$) : this.hover(this.$_getPrev$($o$$29$$)));
      return!1;
    }, "shift+left":function() {
      var $o$$30$$ = this.$_data$.ui.$hovered$ || this.$_data$.ui.$lastSelected$;
      $o$$30$$ && ($o$$30$$.hasClass($TreeUtils$$.$_OJ_EXPANDED$) ? this.collapse($o$$30$$) : this.hover(this.$_getPrev$($o$$30$$)));
      return!1;
    }, right:function() {
      var $o$$31$$ = this.$_data$.ui.$hovered$ || this.$_data$.ui.$lastSelected$;
      $o$$31$$ && $o$$31$$.length && ($o$$31$$.hasClass($TreeUtils$$.$_OJ_COLLAPSED$) ? this.expand($o$$31$$) : this.hover(this.$_getNext$($o$$31$$)));
      return!1;
    }, "ctrl+right":function() {
      var $o$$32$$ = this.$_data$.ui.$hovered$ || this.$_data$.ui.$lastSelected$;
      $o$$32$$ && $o$$32$$.length && ($o$$32$$.hasClass($TreeUtils$$.$_OJ_COLLAPSED$) ? this.expand($o$$32$$) : this.hover(this.$_getNext$($o$$32$$)));
      return!1;
    }, "shift+right":function() {
      var $o$$33$$ = this.$_data$.ui.$hovered$ || this.$_data$.ui.$lastSelected$;
      $o$$33$$ && $o$$33$$.length && ($o$$33$$.hasClass($TreeUtils$$.$_OJ_COLLAPSED$) ? this.expand($o$$33$$) : this.hover(this.$_getNext$($o$$33$$)));
      return!1;
    }, space:function() {
      this.$_data$.ui.$hovered$ && (this.$_data$.ui.$spacebar$ = !0, this.$_data$.ui.$hovered$.children("a:eq(0)").click(), this.$_data$.ui.$spacebar$ = !1);
      return!1;
    }, home:function() {
      this.hover(this.$_$container_ul$.find("li:first"));
      return!1;
    }, end:function() {
      var $a$$124$$ = this.$_$container_ul$.find("li.oj-tree-last:visible");
      $a$$124$$ && $a$$124$$.length && this.hover($a$$124$$[$a$$124$$.length - 1]);
      return!1;
    }, "*":function() {
      this.$_$container_ul$.find("a");
      this.$_expandAll$(-1, !1);
      return!1;
    }, "ctrl+space":function() {
      if (this.$_data$.ui.$hovered$) {
        var $ev$$6$$ = $$$$60$$.Event("click");
        $ev$$6$$.ctrlKey = !0;
        this.$_data$.ui.$hovered$.children("a:eq(0)").trigger($ev$$6$$);
      }
      return!1;
    }, "shift+space":function() {
      if (this.$_data$.ui.$hovered$) {
        var $ev$$7$$ = $$$$60$$.Event("click");
        $ev$$7$$.shiftKey = !0;
        this.$_data$.ui.$hovered$.children("a:eq(0)").trigger($ev$$7$$);
      }
      return!1;
    }, "shift+home":function($event$$579$$) {
      var $prevSelections$$3$$, $hover$$1$$ = this.$_data$.ui.$hovered$;
      if ($hover$$1$$) {
        var $bContinue$$1$$ = !0, $_this$$25$$ = this, $nodes$$9$$ = this.$_$container_ul$.find("li:visible");
        this.$_data$.$core$.$suppressSelectEvent$ = !0;
        $prevSelections$$3$$ = this.options.selection.slice(0);
        $hover$$1$$ = $hover$$1$$[0];
        $$$$60$$.each($nodes$$9$$, function($i$$418$$, $node$$158$$) {
          $node$$158$$ == $hover$$1$$ && ($bContinue$$1$$ = !1);
          $_this$$25$$.$_select$($node$$158$$, !0);
          return $bContinue$$1$$;
        });
        this.$_data$.$core$.$suppressSelectEvent$ = !1;
        this.$_fireOptionChangeEvent$("selection", $prevSelections$$3$$, null, $event$$579$$);
      }
      return!1;
    }, "shift+pgdn":function($event$$580$$) {
      var $prevSelections$$4$$, $hover$$2$$ = this.$_data$.ui.$lastSelected$ || this.$_data$.ui.$hovered$;
      if ($hover$$2$$) {
        var $bFound$$ = !1, $_this$$26$$ = this, $l$$16$$ = this.$_$container_ul$.find("li:visible");
        this.$_data$.$core$.$suppressSelectEvent$ = !0;
        $prevSelections$$4$$ = this.options.selection.slice(0);
        $hover$$2$$ = $hover$$2$$[0];
        $$$$60$$.each($l$$16$$, function($i$$419$$, $node$$159$$) {
          $bFound$$ || ($bFound$$ = $node$$159$$ == $hover$$2$$);
          $bFound$$ && !$_this$$26$$.isSelected($node$$159$$) && $_this$$26$$.$_select$($node$$159$$, !0);
          return!0;
        });
        this.$_data$.$core$.$suppressSelectEvent$ = !1;
        this.$_fireOptionChangeEvent$("selection", $prevSelections$$4$$, null, $event$$580$$);
      }
      return!1;
    }, f2:function() {
      this.$_crrm_rename$(this.$_data$.ui.$hovered$ || this.$_data$.ui.$lastSelected$);
      return!1;
    }, del:function() {
      this.remove(this.$_data$.ui.$hovered$ || this.$_getNode$(null));
      return!1;
    }}, $_applyMenu$:function() {
      if (this.$_data$.menu.$usermenu$) {
        var $$menuContainer$$1$$ = this.$_data$.menu.$$container$, $_this$$27$$ = this;
        $$menuContainer$$1$$.on("ojselect", $$$$60$$.proxy(this.$_handleContextMenuSelect$, this));
        var $bChanged$$ = !1;
        $$menuContainer$$1$$.find("[data-oj-command]").each(function() {
          var $cmd$$1$$;
          0 === $$$$60$$(this).children("a").length && ($cmd$$1$$ = $$$$60$$(this).attr("data-oj-command").split("oj-tree-"), $$$$60$$(this).replaceWith($_this$$27$$.$_buildContextMenuItem$($cmd$$1$$[$cmd$$1$$.length - 1])), $$$$60$$(this).hasClass("oj-menu-divider") && $$$$60$$(this).removeClass("oj-menu-divider").addClass("oj-menu-item"), $bChanged$$ = !0);
        });
        $bChanged$$ && $$menuContainer$$1$$.ojMenu("refresh");
        this.$_data$.menu.$$elemPaste$ = $$menuContainer$$1$$.find("#ojtreepaste");
      }
    }, $_clearMenu$:function() {
      var $um$$ = this.$_data$.menu;
      $um$$.$usermenu$ && ($um$$.$usermenu$ = !1, $um$$.$$container$.off("ojselect"), $um$$.$$container$ = null);
    }, $_buildContextMenuItem$:function($cmd$$2$$) {
      return $$$$60$$(this.$_buildContextMenuListItem$($cmd$$2$$));
    }, $_buildContextMenuListItem$:function($cmd$$3$$) {
      return "\x3cli id\x3d" + $_arMenuCmdMap$$1$$[$cmd$$3$$] + "\x3e" + this.$_buildContextMenuLabel$($cmd$$3$$) + "\x3c/li\x3e";
    }, $_buildContextMenuLabel$:function($cmd$$4$$) {
      return'\x3ca href\x3d"#"\x3e' + this.$_getString$($_arMenuKeyMap$$1$$[$cmd$$4$$]) + "\x3c/a\x3e";
    }, $_crrm_cut$:function($obj$$99$$) {
      $obj$$99$$ = this.$_getNode$($obj$$99$$, !0);
      if (!$obj$$99$$ || !$obj$$99$$.length) {
        return!1;
      }
      this.$_data$.$crrm$.$cp_nodes$ = !1;
      this.$_data$.$crrm$.$ct_nodes$ = $obj$$99$$;
      this.$_emitEvent$({obj:$obj$$99$$}, "cut");
    }, $_crrm_copy$:function($obj$$100$$) {
      $obj$$100$$ = this.$_getNode$($obj$$100$$, !0);
      if (!$obj$$100$$ || !$obj$$100$$.length) {
        return!1;
      }
      this.$_data$.$crrm$.$ct_nodes$ = !1;
      this.$_data$.$crrm$.$cp_nodes$ = $obj$$100$$;
      this.$_emitEvent$({obj:$obj$$100$$}, "copy");
    }, $_crrm_paste$:function($obj$$101$$) {
      $obj$$101$$ = this.$_getNode$($obj$$101$$);
      if (!$obj$$101$$ || !$obj$$101$$.length) {
        return!1;
      }
      var $nodes$$10$$ = this.$_data$.$crrm$.$ct_nodes$ ? this.$_data$.$crrm$.$ct_nodes$ : this.$_data$.$crrm$.$cp_nodes$;
      if (!this.$_data$.$crrm$.$ct_nodes$ && !this.$_data$.$crrm$.$cp_nodes$) {
        return!1;
      }
      this.$_data$.$crrm$.$ct_nodes$ && (this.$_crrm_move_node$(this.$_data$.$crrm$.$ct_nodes$, $obj$$101$$), this.$_data$.$crrm$.$ct_nodes$ = !1);
      this.$_data$.$crrm$.$ct_nodes$ && (this.$_crrm_move_node$(this.$_data$.$crrm$.$ct_nodes$, $obj$$101$$), this.$_data$.$crrm$.$ct_nodes$ = !1);
      this.$_data$.$crrm$.$cp_nodes$ && this.$_crrm_move_node$(this.$_data$.$crrm$.$cp_nodes$, $obj$$101$$, !1, !0);
      this.$_emitEvent$({obj:$obj$$101$$, nodes:$nodes$$10$$}, "paste");
    }, $_crrm_move_node$:function($obj$$102$$, $ref$$4$$, $position$$38$$, $is_copy$$1$$, $is_prepared$$1$$, $skip_check$$1$$) {
      var $s$$30$$ = this.$_data$.$crrm$.$defaults$.move;
      if (!$is_prepared$$1$$) {
        return "undefined" === typeof $position$$38$$ && ($position$$38$$ = $s$$30$$.defaultPosition), "inside" !== $position$$38$$ || $s$$30$$.defaultPosition.match(/^(before|after)$/) || ($position$$38$$ = $s$$30$$.defaultPosition), this.$_moveNode$($obj$$102$$, $ref$$4$$, $position$$38$$, $is_copy$$1$$, !1, $skip_check$$1$$);
      }
      if (!0 === $s$$30$$.alwaysCopy || "multitree" === $s$$30$$.alwaysCopy && $obj$$102$$.$rt$.$_getIndex$() !== $obj$$102$$.$ot$.$_getIndex$()) {
        $is_copy$$1$$ = !0;
      }
      this.$_moveNode$($obj$$102$$, $ref$$4$$, $position$$38$$, $is_copy$$1$$, !0, $skip_check$$1$$);
    }, $_crrm_remove$:function($obj$$103$$) {
      $obj$$103$$ = this.$_getNode$($obj$$103$$, !0);
      this.$__rollback$();
      this.remove($obj$$103$$);
    }, $_crrm_rename$:function($obj$$104$$) {
      $obj$$104$$ = this.$_getNode$($obj$$104$$);
      this.$__rollback$();
      this.$_crrm_showInput$($obj$$104$$, function() {
      });
    }, $_crrm_showInput$:function($obj$$106$$, $callback$$125$$) {
      $obj$$106$$ = this.$_getNode$($obj$$106$$);
      var $rtl$$3$$ = this.$_isRtl$, $w$$8$$ = this.$_data$.$crrm$.$defaults$.inputWidthLimit, $w1$$ = $obj$$106$$.children("ins").width(), $w2$$ = $obj$$106$$.find("\x3e a:visible \x3e ins").width() * $obj$$106$$.find("\x3e a:visible \x3e ins").length, $t$$15$$ = this.getText($obj$$106$$), $_this$$28$$ = this, $h1$$ = $$$$60$$("\x3cdiv /\x3e", {css:{position:"absolute", top:"-200px", left:$rtl$$3$$ ? "0px" : "-1000px", visibility:"hidden"}}).appendTo("body"), $h2$$ = $obj$$106$$.css("position", 
      "relative").append($$$$60$$("\x3cinput /\x3e", {value:$t$$15$$, "class":"oj-tree-rename-input", css:{padding:"0", border:"1px solid silver", position:"absolute", left:$rtl$$3$$ ? "auto" : $w1$$ + $w2$$ + 4 + "px", right:$rtl$$3$$ ? $w1$$ + $w2$$ + 4 + "px" : "auto", top:"0px", height:this.$_data$.$core$.$li_height$ - 2 + "px", lineHeight:this.$_data$.$core$.$li_height$ - 2 + "px", width:"150px"}, blur:$$$$60$$.proxy(function() {
        var $i$$420$$ = $obj$$106$$.children(".oj-tree-rename-input"), $v$$5$$ = $i$$420$$.val();
        "" === $v$$5$$ && ($v$$5$$ = $t$$15$$);
        $h1$$.remove();
        $i$$420$$.remove();
        this.$_set_text$($obj$$106$$, $t$$15$$);
        this.$_renameNode$($obj$$106$$, $v$$5$$);
        $callback$$125$$.call(this, $obj$$106$$, $v$$5$$, $t$$15$$);
        $obj$$106$$.css("position", "");
      }, this), keyup:function($event$$581_key$$177$$) {
        $event$$581_key$$177$$ = $event$$581_key$$177$$.keyCode || $event$$581_key$$177$$.which;
        if (!$_this$$28$$.$_done$) {
          return $_this$$28$$.$_done$ = !0, !1;
        }
        27 == $event$$581_key$$177$$ ? ($_this$$28$$.$_done$ = !1, this.value = $t$$15$$, this.blur()) : 13 == $event$$581_key$$177$$ ? ($_this$$28$$.$_done$ = !1, this.blur()) : $h2$$.width(Math.min($h1$$.text("pW" + this.value).width(), $w$$8$$));
      }, keypress:function($event$$582$$) {
        if (13 == ($event$$582$$.keyCode || $event$$582$$.which)) {
          return!1;
        }
      }})).children(".oj-tree-rename-input");
      this.$_set_text$($obj$$106$$, "");
      $h1$$.css({fontFamily:$h2$$.css("fontFamily") || "", fontSize:$h2$$.css("fontSize") || "", fontWeight:$h2$$.css("fontWeight") || "", fontStyle:$h2$$.css("fontStyle") || "", fontStretch:$h2$$.css("fontStretch") || "", fontVariant:$h2$$.css("fontVariant") || "", letterSpacing:$h2$$.css("letterSpacing") || "", wordSpacing:$h2$$.css("wordSpacing") || ""});
      $h2$$.width(Math.min($h1$$.text("pW" + $h2$$[0].value).width(), $w$$8$$))[0].select();
    }, $_crrm_create$:function($obj$$107$$, $position$$39$$, $js$$2$$, $callback$$126$$, $skip_rename$$) {
      var $_this$$29$$ = this;
      ($obj$$107$$ = this.$_getNode$($obj$$107$$)) || ($obj$$107$$ = -1);
      this.$__rollback$();
      return this.$_createNode$($obj$$107$$, $position$$39$$, $js$$2$$, function($t$$17$$) {
        var $p$$13$$ = this.$_getParent$($t$$17$$), $pos$$15$$ = $$$$60$$($t$$17$$).index();
        $callback$$126$$ && $callback$$126$$.call(this, $t$$17$$);
        $p$$13$$.length && $p$$13$$.hasClass($TreeUtils$$.$_OJ_COLLAPSED$) && this.expand($p$$13$$, !1, !0);
        $skip_rename$$ ? $_this$$29$$.$_emitEvent$({obj:$t$$17$$, name:this.getText($t$$17$$), parent:$p$$13$$, position:$pos$$15$$}) : this.$_crrm_showInput$($t$$17$$, function($obj$$108$$, $new_name$$1$$) {
          $_this$$29$$.$_emitEvent$({obj:$obj$$108$$, name:$new_name$$1$$, parent:$p$$13$$, position:$pos$$15$$});
        });
      });
    }, $_isHtml$:function($s$$31$$) {
      var $ret$$75$$ = !1;
      $s$$31$$ && 3 <= $s$$31$$.length && ($s$$31$$ = $s$$31$$.trim(), $ret$$75$$ = "\x3c" === $s$$31$$.charAt(0));
      return $ret$$75$$;
    }, $_applyEmptyText$:function() {
      var $txt$$ = this.options.emptyText;
      "string" !== typeof $txt$$ && ($txt$$ = this.$_getString$("labelNoData"));
      if ($txt$$ && 0 < $txt$$.length) {
        var $$u$$2$$ = this.$_$container_ul$, $$d$$ = $$$$60$$("\x3cli class\x3d'oj-tree-empty'\x3e\x3c/li\x3e");
        $$d$$[0].textContent = $txt$$;
        $$u$$2$$.empty().append($$d$$);
      }
    }, $_processSubId$:function($locator$$62_sNode$$) {
      var $c$$51_i$$421_subId$$66$$, $node$$160$$, $a$$125_sKey$$;
      $a$$125_sKey$$ = null;
      var $ret$$76$$;
      $locator$$62_sNode$$ && ($c$$51_i$$421_subId$$66$$ = $locator$$62_sNode$$.subId);
      if (!$c$$51_i$$421_subId$$66$$) {
        return null;
      }
      $a$$125_sKey$$ = $c$$51_i$$421_subId$$66$$.split("[");
      if (3 === $a$$125_sKey$$.length && ($a$$125_sKey$$[0] = $a$$125_sKey$$[0].trim(), "oj-tree-node" === $a$$125_sKey$$[0] && ($a$$125_sKey$$[1] = $a$$125_sKey$$[1].trim(), $c$$51_i$$421_subId$$66$$ = $a$$125_sKey$$[1].charAt(0), $c$$51_i$$421_subId$$66$$ = $a$$125_sKey$$[1].indexOf($c$$51_i$$421_subId$$66$$, 1), 0 <= $c$$51_i$$421_subId$$66$$ && ($locator$$62_sNode$$ = $a$$125_sKey$$[1].substring(1, $c$$51_i$$421_subId$$66$$).trim(), $a$$125_sKey$$[2] = $a$$125_sKey$$[2].trim(), $c$$51_i$$421_subId$$66$$ = 
      $a$$125_sKey$$[2].charAt(0), $c$$51_i$$421_subId$$66$$ = $a$$125_sKey$$[2].indexOf($c$$51_i$$421_subId$$66$$, 1), 0 <= $c$$51_i$$421_subId$$66$$)))) {
        $a$$125_sKey$$ = $a$$125_sKey$$[2].substring(1, $c$$51_i$$421_subId$$66$$).trim();
        try {
          $node$$160$$ = this.$_getNode$($locator$$62_sNode$$);
        } catch ($e$$129$$) {
          $node$$160$$ = null;
        }
        if ($a$$125_sKey$$ && $node$$160$$ && -1 !== $node$$160$$) {
          switch($a$$125_sKey$$) {
            case "icon":
              this.$_data$.$themes$.icons && ($ret$$76$$ = $node$$160$$.find(" \x3e a \x3e ins:eq(0)"));
              break;
            case "link":
              $ret$$76$$ = $node$$160$$.find(" \x3e a:eq(0)");
              break;
            case "disclosure":
              this.$_isLeaf$($node$$160$$) || ($ret$$76$$ = $node$$160$$.find(" \x3e ins:eq(0)"));
              break;
            case "title":
              $ret$$76$$ = $node$$160$$.find(" \x3e a \x3e span");
          }
        }
      }
      return $ret$$76$$ ? $ret$$76$$.length ? $ret$$76$$[0] : null : null;
    }, $_getSubIdFromNodeElem$:function($elem$$79$$) {
      var $node$$161_type$$104$$ = $elem$$79$$ ? this.$_getNode$($elem$$79$$) : null, $parent$$49_parentType$$, $subid$$ = null;
      $node$$161_type$$104$$ && -1 != $node$$161_type$$104$$ && $node$$161_type$$104$$.length && $node$$161_type$$104$$.hasClass("oj-tree-node") && $elem$$79$$.tagName && $elem$$79$$.parentNode && ($node$$161_type$$104$$ = $elem$$79$$.tagName, $parent$$49_parentType$$ = $elem$$79$$.parentNode, $parent$$49_parentType$$ = $parent$$49_parentType$$.tagName, "SPAN" === $node$$161_type$$104$$ ? $subid$$ = "title" : "A" === $node$$161_type$$104$$ ? $subid$$ = "link" : "INS" === $node$$161_type$$104$$ && 
      ($elem$$79$$ = $$$$60$$($elem$$79$$), "LI" === $parent$$49_parentType$$ && $elem$$79$$.hasClass("oj-tree-disclosure-icon") ? $subid$$ = "disclosure" : "A" === $parent$$49_parentType$$ && $elem$$79$$.hasClass("oj-tree-node-icon") && ($subid$$ = "icon")));
      return $subid$$;
    }, $_hideDots$:function() {
      this.$_data$.$themes$.$dots$ = !1;
      this.$_$container$.children("ul").addClass("oj-tree-no-dots");
    }, $_showDots$:function() {
      this.$_data$.$themes$.$dots$ = !0;
      this.$_$container$.children("ul").removeClass("oj-tree-no-dots");
    }, $_isOptExpandAll$:function() {
      var $s$$32$$ = this.options.initExpanded;
      return $s$$32$$ && "all" == $s$$32$$ || $$$$60$$.isArray($s$$32$$) && $s$$32$$.length && "all" == $s$$32$$[0];
    }, $_getString$:function($key$$179$$) {
      var $oStrings$$ = this.$_data$.$core$.$strings$, $s$$33$$;
      $s$$33$$ = $oStrings$$[$key$$179$$];
      $s$$33$$ || ($s$$33$$ = this.$getTranslatedString$($key$$179$$), $s$$33$$ = this.$_escapeHtml$($s$$33$$), $oStrings$$[$key$$179$$] = $s$$33$$);
      return $s$$33$$;
    }, $_escapeHtml$:function($text$$21$$) {
      var $div$$10$$ = document.createElement("div");
      $$$$60$$($div$$10$$).text($text$$21$$);
      return $div$$10$$.textContent;
    }, $_getNodeHeight$:function() {
      return this.$_data$.$core$.$li_height$;
    }, $_getAnimDuration$:function() {
      var $ret$$77$$ = 0, $span$$1_val$$79$$, $$div$$1_c$$52_s$$34$$;
      window.getComputedStyle && ($$div$$1_c$$52_s$$34$$ = this.$_data$.ui.$animDurDiv$, $$div$$1_c$$52_s$$34$$ || ($$div$$1_c$$52_s$$34$$ = $$$$60$$("\x3cdiv id\x3d'ojtree-comp-animduration'\x3e\x3cspan class\x3d'oj-tree-transition'\x3edummy\x3c/span\x3e\x3c/div\x3e"), this.$_data$.ui.$animDurDiv$ = $$div$$1_c$$52_s$$34$$, $$$$60$$("body").append($$div$$1_c$$52_s$$34$$)), $span$$1_val$$79$$ = $$div$$1_c$$52_s$$34$$[0].childNodes[0], $span$$1_val$$79$$ = window.getComputedStyle($span$$1_val$$79$$), 
      $span$$1_val$$79$$ = $span$$1_val$$79$$.transitionDuration ? $span$$1_val$$79$$.transitionDuration : $span$$1_val$$79$$["-webkit-transition-duration"] ? $span$$1_val$$79$$["-webkit-transition-duration"] : 0, $$div$$1_c$$52_s$$34$$.detach(), "string" == typeof $span$$1_val$$79$$ && 1 < $span$$1_val$$79$$.length && ($$div$$1_c$$52_s$$34$$ = $span$$1_val$$79$$.charAt($span$$1_val$$79$$.length - 1).toLowerCase(), "s" == $$div$$1_c$$52_s$$34$$ ? ($span$$1_val$$79$$ = $span$$1_val$$79$$.substring(0, 
      $span$$1_val$$79$$.length - 1), $span$$1_val$$79$$ = parseFloat($span$$1_val$$79$$), isNaN($span$$1_val$$79$$) || ($ret$$77$$ = 1E3 * $span$$1_val$$79$$)) : 2 < $span$$1_val$$79$$.length && ($$div$$1_c$$52_s$$34$$ = $span$$1_val$$79$$.substring($span$$1_val$$79$$.length - 2).toLowerCase(), "ms" == $$div$$1_c$$52_s$$34$$ && ($span$$1_val$$79$$ = parseFloat($span$$1_val$$79$$), isNaN($span$$1_val$$79$$) || ($ret$$77$$ = $span$$1_val$$79$$)))));
      return $ret$$77$$;
    }, $_varCopy$:function($obj$$109$$, $s$$35$$) {
      var $o$$34$$ = {};
      $o$$34$$[$s$$35$$] = $obj$$109$$[$s$$35$$];
      return $$$$60$$.extend(!0, {}, $o$$34$$)[$s$$35$$];
    }, $_trace$:function($s$$36$$) {
      this.$_emitEvent$({obj:{msg:$s$$36$$}}, "trace", !0);
    }});
  })();
});
