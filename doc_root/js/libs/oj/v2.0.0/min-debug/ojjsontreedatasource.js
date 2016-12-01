/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore", "jquery", "ojs/ojdatasource-common"], function($oj$$75$$) {
  $oj$$75$$.$_JsonTreeNodeDataSource$ = function $$oj$$75$$$$_JsonTreeNodeDataSource$$() {
    this.id = null;
    this.depth = 0;
    this.parent = null;
    this.children = [];
    this.$leaf$ = this.attr = this.title = null;
  };
  $oj$$75$$.$_JsonTreeNodeDataSource$.prototype.$_ascending$ = function $$oj$$75$$$$_JsonTreeNodeDataSource$$$$_ascending$$($key$$185$$) {
    return function($a$$129$$, $b$$79$$) {
      return $a$$129$$.attr && $b$$79$$.attr && $a$$129$$.attr[$key$$185$$] && $b$$79$$.attr[$key$$185$$] ? $a$$129$$.attr[$key$$185$$] < $b$$79$$.attr[$key$$185$$] ? -1 : $a$$129$$.attr[$key$$185$$] === $b$$79$$.attr[$key$$185$$] ? 0 : 1 : $a$$129$$[$key$$185$$] < $b$$79$$[$key$$185$$] ? -1 : $a$$129$$[$key$$185$$] === $b$$79$$[$key$$185$$] ? 0 : 1;
    };
  };
  $oj$$75$$.$_JsonTreeNodeDataSource$.prototype.$_descending$ = function $$oj$$75$$$$_JsonTreeNodeDataSource$$$$_descending$$($key$$186$$) {
    return function($a$$130$$, $b$$80$$) {
      return $a$$130$$.attr && $b$$80$$.attr && $a$$130$$.attr[$key$$186$$] && $b$$80$$.attr[$key$$186$$] ? $a$$130$$.attr[$key$$186$$] < $b$$80$$.attr[$key$$186$$] ? 1 : $a$$130$$.attr[$key$$186$$] === $b$$80$$.attr[$key$$186$$] ? 0 : -1 : $a$$130$$[$key$$186$$] < $b$$80$$[$key$$186$$] ? 1 : $a$$130$$[$key$$186$$] === $b$$80$$[$key$$186$$] ? 0 : -1;
    };
  };
  $oj$$75$$.$_JsonTreeNodeDataSource$.prototype.$_sortRecursive$ = function $$oj$$75$$$$_JsonTreeNodeDataSource$$$$_sortRecursive$$($criteria$$10$$) {
    var $i$$464_key$$187$$ = $criteria$$10$$.key;
    "ascending" === $criteria$$10$$.direction ? this.children.sort(this.$_ascending$($i$$464_key$$187$$)) : "descending" === $criteria$$10$$.direction && this.children.sort(this.$_descending$($i$$464_key$$187$$));
    for (var $i$$464_key$$187$$ = 0, $l$$17$$ = this.children.length;$i$$464_key$$187$$ < $l$$17$$;$i$$464_key$$187$$++) {
      this.children[$i$$464_key$$187$$].$_sortRecursive$($criteria$$10$$);
    }
  };
  $oj$$75$$.$JsonTreeDataSource$ = function $$oj$$75$$$$JsonTreeDataSource$$($data$$181$$) {
    var $tree$$1$$;
    $tree$$1$$ = new $oj$$75$$.$_JsonTreeNodeDataSource$;
    $data$$181$$.id || ($tree$$1$$.id = "root");
    this.data = this.$_createTreeDataSource$({count:0}, $tree$$1$$, $data$$181$$);
    $oj$$75$$.$JsonTreeDataSource$.$superclass$.constructor.call(this, $tree$$1$$);
  };
  $goog$exportPath_$$("JsonTreeDataSource", $oj$$75$$.$JsonTreeDataSource$, $oj$$75$$);
  $oj$$75$$.$Object$.$createSubclass$($oj$$75$$.$JsonTreeDataSource$, $oj$$75$$.$TreeDataSource$, "oj.JsonTreeDataSource");
  $oj$$75$$.$JsonTreeDataSource$.prototype.Init = function $$oj$$75$$$$JsonTreeDataSource$$$Init$() {
    $oj$$75$$.$JsonTreeDataSource$.$superclass$.Init.call(this);
  };
  $oj$$75$$.$Object$.$exportPrototypeSymbol$("JsonTreeDataSource.prototype.Init", {Init:$oj$$75$$.$JsonTreeDataSource$.prototype.Init});
  $oj$$75$$.$JsonTreeDataSource$.prototype.$_createTreeDataSource$ = function $$oj$$75$$$$JsonTreeDataSource$$$$_createTreeDataSource$$($c$$56$$, $target$$98$$, $source$$12$$, $depth$$26$$) {
    var $children$$29$$, $node$$168$$, $child$$22$$, $prop$$76$$, $propr$$, $prp$$, $j$$47$$;
    $depth$$26$$ || ($depth$$26$$ = 0);
    for ($prop$$76$$ in $source$$12$$) {
      if ("children" == $prop$$76$$ || 0 == $depth$$26$$ && $source$$12$$ instanceof Array) {
        for ($children$$29$$ = 0 == $depth$$26$$ && $source$$12$$ instanceof Array ? $source$$12$$ : $source$$12$$[$prop$$76$$], $depth$$26$$++, $j$$47$$ = 0;$j$$47$$ < $children$$29$$.length;$j$$47$$++) {
          $child$$22$$ = $children$$29$$[$j$$47$$];
          $node$$168$$ = new $oj$$75$$.$_JsonTreeNodeDataSource$;
          $child$$22$$.id || ($c$$56$$.count++, $child$$22$$.attr ? $child$$22$$.attr.id || ($child$$22$$.attr.id = "rid_" + $c$$56$$.count) : $node$$168$$.id = "rid_" + $c$$56$$.count);
          for ($propr$$ in $child$$22$$) {
            for ($prp$$ in $node$$168$$) {
              $propr$$ == $prp$$ && "children" != $propr$$ && ($node$$168$$[$prp$$] = $child$$22$$[$propr$$]), "depth" == $prp$$ && ($node$$168$$[$prp$$] = $depth$$26$$);
            }
          }
          $target$$98$$.children.push($node$$168$$);
          for ($prp$$ in $child$$22$$) {
            "children" == $prp$$ && this.$_createTreeDataSource$($c$$56$$, $target$$98$$.children[$j$$47$$], $child$$22$$, $depth$$26$$);
          }
        }
      }
    }
    return $target$$98$$;
  };
  $oj$$75$$.$JsonTreeDataSource$.prototype.$getChildCount$ = function $$oj$$75$$$$JsonTreeDataSource$$$$getChildCount$$($parent$$51_parentKey$$10$$) {
    $parent$$51_parentKey$$10$$ || ($parent$$51_parentKey$$10$$ = this.data.id);
    $parent$$51_parentKey$$10$$ = this.$_searchTreeById$(this.data, $parent$$51_parentKey$$10$$);
    return $parent$$51_parentKey$$10$$.children ? $parent$$51_parentKey$$10$$.children.length : 0;
  };
  $oj$$75$$.$Object$.$exportPrototypeSymbol$("JsonTreeDataSource.prototype.getChildCount", {$getChildCount$:$oj$$75$$.$JsonTreeDataSource$.prototype.$getChildCount$});
  $oj$$75$$.$JsonTreeDataSource$.prototype.$fetchChildren$ = function $$oj$$75$$$$JsonTreeDataSource$$$$fetchChildren$$($nodeSet$$33_parentKey$$11$$, $i$$465_range$$21$$, $callbacks$$56$$) {
    var $childStart$$, $childEnd$$, $results$$12$$, $parent$$52$$, $node$$169$$;
    $results$$12$$ = [];
    $nodeSet$$33_parentKey$$11$$ || ($nodeSet$$33_parentKey$$11$$ = this.data.id);
    $parent$$52$$ = this.$_searchTreeById$(this.data, $nodeSet$$33_parentKey$$11$$);
    $i$$465_range$$21$$ || ($i$$465_range$$21$$ = [], $i$$465_range$$21$$.start = 0, $i$$465_range$$21$$.count = $parent$$52$$.children.length);
    $i$$465_range$$21$$.count || ($i$$465_range$$21$$.count = $parent$$52$$.children.length);
    $i$$465_range$$21$$.start || ($i$$465_range$$21$$.start = 0);
    $childStart$$ = $i$$465_range$$21$$.start;
    $childEnd$$ = Math.min($parent$$52$$.children.length, $childStart$$ + $i$$465_range$$21$$.count);
    for ($i$$465_range$$21$$ = $childStart$$;$i$$465_range$$21$$ < $childEnd$$;$i$$465_range$$21$$ += 1) {
      $node$$169$$ = new $oj$$75$$.$_JsonTreeNodeDataSource$, $parent$$52$$.children[$i$$465_range$$21$$].attr && ($node$$169$$.attr = $parent$$52$$.children[$i$$465_range$$21$$].attr), $parent$$52$$.children[$i$$465_range$$21$$].id && ($node$$169$$.id = $parent$$52$$.children[$i$$465_range$$21$$].id), $parent$$52$$.children[$i$$465_range$$21$$].depth && ($node$$169$$.depth = $parent$$52$$.children[$i$$465_range$$21$$].depth), $parent$$52$$.children[$i$$465_range$$21$$].title && ($node$$169$$.title = 
      $parent$$52$$.children[$i$$465_range$$21$$].title), $parent$$52$$.children[$i$$465_range$$21$$].parent && ($node$$169$$.parent = $parent$$52$$.children[$i$$465_range$$21$$].parent), $node$$169$$.$leaf$ = 0 < $parent$$52$$.children[$i$$465_range$$21$$].children.length ? !1 : !0, $results$$12$$.push($node$$169$$);
    }
    $nodeSet$$33_parentKey$$11$$ = new $oj$$75$$.$JsonNodeSet$($childStart$$, $childEnd$$, $results$$12$$, $nodeSet$$33_parentKey$$11$$);
    null != $callbacks$$56$$ && null != $callbacks$$56$$.success && $callbacks$$56$$.success.call(null, $nodeSet$$33_parentKey$$11$$);
  };
  $oj$$75$$.$Object$.$exportPrototypeSymbol$("JsonTreeDataSource.prototype.fetchChildren", {$fetchChildren$:$oj$$75$$.$JsonTreeDataSource$.prototype.$fetchChildren$});
  $oj$$75$$.$JsonTreeDataSource$.prototype.$fetchDescendants$ = function $$oj$$75$$$$JsonTreeDataSource$$$$fetchDescendants$$($parentKey$$12$$, $callbacks$$57$$) {
    var $childEnd$$1_range$$22$$, $childStart$$1_i$$466$$, $nodeSet$$34_results$$13$$, $parent$$53$$;
    $nodeSet$$34_results$$13$$ = [];
    $parentKey$$12$$ || ($parentKey$$12$$ = this.data.id);
    $parent$$53$$ = this.$_searchTreeById$(this.data, $parentKey$$12$$);
    $childEnd$$1_range$$22$$ = [];
    $childEnd$$1_range$$22$$.start = 0;
    $childEnd$$1_range$$22$$.count = $parent$$53$$.children.length;
    $childStart$$1_i$$466$$ = $childEnd$$1_range$$22$$.start;
    for ($childEnd$$1_range$$22$$ = Math.min($parent$$53$$.children.length, $childStart$$1_i$$466$$ + $childEnd$$1_range$$22$$.count);$childStart$$1_i$$466$$ < $childEnd$$1_range$$22$$;$childStart$$1_i$$466$$ += 1) {
      $parent$$53$$.children[$childStart$$1_i$$466$$].$leaf$ = 0 < $parent$$53$$.children[$childStart$$1_i$$466$$].children.length ? !1 : !0, $nodeSet$$34_results$$13$$.push($parent$$53$$.children[$childStart$$1_i$$466$$]);
    }
    $nodeSet$$34_results$$13$$ = new $oj$$75$$.$JsonNodeSet$(0, $nodeSet$$34_results$$13$$.length, $nodeSet$$34_results$$13$$, $parentKey$$12$$);
    null != $callbacks$$57$$ && null != $callbacks$$57$$.success && $callbacks$$57$$.success.call(null, $nodeSet$$34_results$$13$$);
  };
  $oj$$75$$.$Object$.$exportPrototypeSymbol$("JsonTreeDataSource.prototype.fetchDescendants", {$fetchDescendants$:$oj$$75$$.$JsonTreeDataSource$.prototype.$fetchDescendants$});
  $oj$$75$$.$JsonTreeDataSource$.prototype.$moveOK$ = function $$oj$$75$$$$JsonTreeDataSource$$$$moveOK$$() {
    return "valid";
  };
  $oj$$75$$.$Object$.$exportPrototypeSymbol$("JsonTreeDataSource.prototype.moveOK", {$moveOK$:$oj$$75$$.$JsonTreeDataSource$.prototype.$moveOK$});
  $oj$$75$$.$JsonTreeDataSource$.prototype.move = function $$oj$$75$$$$JsonTreeDataSource$$$move$($moveNode_nodeToMove$$, $refNode$$8_referenceNode$$1$$, $index$$289_position$$44$$, $callbacks$$58$$) {
    var $parent$$54_refNodeKey$$;
    $parent$$54_refNodeKey$$ = $refNode$$8_referenceNode$$1$$;
    if (!$parent$$54_refNodeKey$$ || $parent$$54_refNodeKey$$ == this.data.id) {
      if ("inside" != $index$$289_position$$44$$) {
        $oj$$75$$.$Logger$.log("Error: root can not be the reference node if position equals to " + $index$$289_position$$44$$);
        return;
      }
      $parent$$54_refNodeKey$$ || ($parent$$54_refNodeKey$$ = this.data.id);
    }
    $moveNode_nodeToMove$$ = this.$_searchTreeById$(null, $moveNode_nodeToMove$$);
    this.$_searchTreeById$($moveNode_nodeToMove$$, $parent$$54_refNodeKey$$) ? $oj$$75$$.$Logger$.log("Error: the node to move contains the reference node as its sub-tree.") : ($refNode$$8_referenceNode$$1$$ = this.$_searchTreeById$(null, $parent$$54_refNodeKey$$), $parent$$54_refNodeKey$$ = this.$_getParentById$($parent$$54_refNodeKey$$), this.$_removeFromTree$($moveNode_nodeToMove$$), "inside" == $index$$289_position$$44$$ ? (this.$_updateDepth$($moveNode_nodeToMove$$, $moveNode_nodeToMove$$.depth - 
    ($refNode$$8_referenceNode$$1$$.depth + 1)), $refNode$$8_referenceNode$$1$$.children.push($moveNode_nodeToMove$$)) : "before" == $index$$289_position$$44$$ ? (this.$_updateDepth$($moveNode_nodeToMove$$, $moveNode_nodeToMove$$.depth - $refNode$$8_referenceNode$$1$$.depth), $index$$289_position$$44$$ = $parent$$54_refNodeKey$$.children.indexOf($refNode$$8_referenceNode$$1$$), -1 < $index$$289_position$$44$$ && (0 != $index$$289_position$$44$$ ? $parent$$54_refNodeKey$$.children.splice($index$$289_position$$44$$ - 
    1, 0, $moveNode_nodeToMove$$) : $parent$$54_refNodeKey$$.children.unshift($moveNode_nodeToMove$$))) : "after" == $index$$289_position$$44$$ ? (this.$_updateDepth$($moveNode_nodeToMove$$, $moveNode_nodeToMove$$.depth - $refNode$$8_referenceNode$$1$$.depth), $index$$289_position$$44$$ = $parent$$54_refNodeKey$$.children.indexOf($refNode$$8_referenceNode$$1$$), -1 < $index$$289_position$$44$$ && $parent$$54_refNodeKey$$.children.splice($index$$289_position$$44$$, 0, $moveNode_nodeToMove$$)) : "first" == 
    $index$$289_position$$44$$ ? (this.$_updateDepth$($moveNode_nodeToMove$$, $moveNode_nodeToMove$$.depth - $refNode$$8_referenceNode$$1$$.depth), $parent$$54_refNodeKey$$.children.unshift($moveNode_nodeToMove$$)) : "last" == $index$$289_position$$44$$ && (this.$_updateDepth$($moveNode_nodeToMove$$, $moveNode_nodeToMove$$.depth - $refNode$$8_referenceNode$$1$$.depth), $parent$$54_refNodeKey$$.children.push($moveNode_nodeToMove$$)), null != $callbacks$$58$$ && null != $callbacks$$58$$.success && 
    $callbacks$$58$$.success.call(null, this.data));
  };
  $oj$$75$$.$Object$.$exportPrototypeSymbol$("JsonTreeDataSource.prototype.move", {move:$oj$$75$$.$JsonTreeDataSource$.prototype.move});
  $oj$$75$$.$JsonTreeDataSource$.prototype.sort = function $$oj$$75$$$$JsonTreeDataSource$$$sort$($criteria$$11$$, $callbacks$$59$$) {
    var $parent$$55$$;
    $parent$$55$$ = this.$_searchTreeById$(this.data, this.data.id);
    $parent$$55$$.$_sortRecursive$($criteria$$11$$);
    null != $callbacks$$59$$ && null != $callbacks$$59$$.success && $callbacks$$59$$.success.call(null, $parent$$55$$);
  };
  $oj$$75$$.$Object$.$exportPrototypeSymbol$("JsonTreeDataSource.prototype.sort", {sort:$oj$$75$$.$JsonTreeDataSource$.prototype.sort});
  $oj$$75$$.$JsonTreeDataSource$.prototype.$getSortCriteria$ = function $$oj$$75$$$$JsonTreeDataSource$$$$getSortCriteria$$() {
    return{key:null, direction:"none"};
  };
  $oj$$75$$.$Object$.$exportPrototypeSymbol$("JsonTreeDataSource.prototype.getSortCriteria", {$getSortCriteria$:$oj$$75$$.$JsonTreeDataSource$.prototype.$getSortCriteria$});
  $oj$$75$$.$JsonTreeDataSource$.prototype.$_getParentById$ = function $$oj$$75$$$$JsonTreeDataSource$$$$_getParentById$$($refNodeKey$$1$$, $currNode$$4$$) {
    var $i$$467$$, $parent$$56$$ = null;
    if ($refNodeKey$$1$$ == this.data.id) {
      return null;
    }
    $currNode$$4$$ || ($currNode$$4$$ = this.data);
    if ($currNode$$4$$.children && 0 < $currNode$$4$$.children.length) {
      for ($i$$467$$ = 0;$i$$467$$ < $currNode$$4$$.children.length;$i$$467$$++) {
        if ($currNode$$4$$.children[$i$$467$$].id && $currNode$$4$$.children[$i$$467$$].id == $refNodeKey$$1$$ || $currNode$$4$$.children[$i$$467$$].attr && $currNode$$4$$.children[$i$$467$$].attr.id == $refNodeKey$$1$$) {
          return $currNode$$4$$;
        }
      }
      for ($i$$467$$ = 0;$i$$467$$ < $currNode$$4$$.children.length && !($parent$$56$$ = this.$_getParentById$($refNodeKey$$1$$, $currNode$$4$$.children[$i$$467$$]));$i$$467$$++) {
      }
    }
    return $parent$$56$$;
  };
  $oj$$75$$.$JsonTreeDataSource$.prototype.$_searchTreeById$ = function $$oj$$75$$$$JsonTreeDataSource$$$$_searchTreeById$$($currChild$$2$$, $parentKey$$14$$) {
    var $i$$468$$, $result$$77$$ = null;
    $currChild$$2$$ || ($currChild$$2$$ = this.data);
    if ($currChild$$2$$.id && $currChild$$2$$.id == $parentKey$$14$$ || $currChild$$2$$.attr && $currChild$$2$$.attr.id == $parentKey$$14$$) {
      return $currChild$$2$$;
    }
    if (null != $currChild$$2$$.children) {
      for ($i$$468$$ = 0;$i$$468$$ < $currChild$$2$$.children.length && !$result$$77$$;$i$$468$$++) {
        $result$$77$$ = $currChild$$2$$.children[$i$$468$$].id && $currChild$$2$$.children[$i$$468$$].id == $parentKey$$14$$ || $currChild$$2$$.children[$i$$468$$].attr && $currChild$$2$$.children[$i$$468$$].attr.id == $parentKey$$14$$ ? $currChild$$2$$.children[$i$$468$$] : this.$_searchTreeById$($currChild$$2$$.children[$i$$468$$], $parentKey$$14$$);
      }
    }
    return $result$$77$$;
  };
  $oj$$75$$.$JsonTreeDataSource$.prototype.$_updateDepth$ = function $$oj$$75$$$$JsonTreeDataSource$$$$_updateDepth$$($currChild$$3$$, $offset$$31$$) {
    var $i$$469$$;
    $currChild$$3$$.depth -= $offset$$31$$;
    if ($currChild$$3$$.children && 0 != $currChild$$3$$.children.length) {
      for ($i$$469$$ = 0;$i$$469$$ < $currChild$$3$$.children.length;$i$$469$$++) {
        this.$_updateDepth$($currChild$$3$$.children[$i$$469$$], $offset$$31$$);
      }
    }
  };
  $oj$$75$$.$JsonTreeDataSource$.prototype.$_removeFromTree$ = function $$oj$$75$$$$JsonTreeDataSource$$$$_removeFromTree$$($currChild$$4_index$$290$$) {
    var $key$$188_parent$$57$$;
    $currChild$$4_index$$290$$.id ? $key$$188_parent$$57$$ = $currChild$$4_index$$290$$.id : $currChild$$4_index$$290$$.attr && ($key$$188_parent$$57$$ = $currChild$$4_index$$290$$.attr.id);
    ($key$$188_parent$$57$$ = this.$_getParentById$($key$$188_parent$$57$$)) || ($key$$188_parent$$57$$ = this.data);
    $currChild$$4_index$$290$$ = $key$$188_parent$$57$$.children.indexOf($currChild$$4_index$$290$$);
    -1 < $currChild$$4_index$$290$$ && $key$$188_parent$$57$$.children.splice($currChild$$4_index$$290$$, 1);
  };
  $oj$$75$$.$JsonTreeDataSource$.prototype.getCapability = function $$oj$$75$$$$JsonTreeDataSource$$$getCapability$($feature$$16$$) {
    return "fetchDescendants" === $feature$$16$$ ? "enable" : "sort" === $feature$$16$$ ? "default" : "batchFetch" === $feature$$16$$ ? "disable" : "move" === $feature$$16$$ ? "full" : null;
  };
  $oj$$75$$.$Object$.$exportPrototypeSymbol$("JsonTreeDataSource.prototype.getCapability", {getCapability:$oj$$75$$.$JsonTreeDataSource$.prototype.getCapability});
  $oj$$75$$.$JsonNodeSet$ = function $$oj$$75$$$$JsonNodeSet$$($startNode$$, $endNode$$, $data$$182$$, $currKey$$1$$) {
    $oj$$75$$.$Assert$.$assertNumber$($startNode$$, null);
    $oj$$75$$.$Assert$.$assertNumber$($endNode$$, null);
    this.$m_key$ = $currKey$$1$$;
    this.$m_startNode$ = $startNode$$;
    this.$m_endNode$ = $endNode$$;
    this.$m_nodes$ = $data$$182$$;
  };
  $goog$exportPath_$$("JsonNodeSet", $oj$$75$$.$JsonNodeSet$, $oj$$75$$);
  $oj$$75$$.$JsonNodeSet$.prototype.getParent = function $$oj$$75$$$$JsonNodeSet$$$getParent$() {
    return this.$m_key$;
  };
  $oj$$75$$.$Object$.$exportPrototypeSymbol$("JsonNodeSet.prototype.getParent", {getParent:$oj$$75$$.$JsonNodeSet$.prototype.getParent});
  $oj$$75$$.$JsonNodeSet$.prototype.$getStart$ = function $$oj$$75$$$$JsonNodeSet$$$$getStart$$() {
    return this.$m_startNode$;
  };
  $oj$$75$$.$Object$.$exportPrototypeSymbol$("JsonNodeSet.prototype.getStart", {$getStart$:$oj$$75$$.$JsonNodeSet$.prototype.$getStart$});
  $oj$$75$$.$JsonNodeSet$.prototype.$getCount$ = function $$oj$$75$$$$JsonNodeSet$$$$getCount$$() {
    return Math.max(0, this.$m_endNode$ - this.$m_startNode$);
  };
  $oj$$75$$.$Object$.$exportPrototypeSymbol$("JsonNodeSet.prototype.getCount", {$getCount$:$oj$$75$$.$JsonNodeSet$.prototype.$getCount$});
  $oj$$75$$.$JsonNodeSet$.prototype.getData = function $$oj$$75$$$$JsonNodeSet$$$getData$($index$$291$$) {
    $oj$$75$$.$Assert$.assert($index$$291$$ <= this.$m_endNode$ && $index$$291$$ >= this.$m_startNode$);
    $index$$291$$ -= this.$m_startNode$;
    return this.$m_nodes$[$index$$291$$] ? this.$m_nodes$[$index$$291$$].attr : null;
  };
  $oj$$75$$.$Object$.$exportPrototypeSymbol$("JsonNodeSet.prototype.getData", {getData:$oj$$75$$.$JsonNodeSet$.prototype.getData});
  $oj$$75$$.$JsonNodeSet$.prototype.getMetadata = function $$oj$$75$$$$JsonNodeSet$$$getMetadata$($index$$292$$) {
    var $metadata$$16$$ = [];
    $oj$$75$$.$Assert$.assert($index$$292$$ <= this.$m_endNode$ && $index$$292$$ >= this.$m_startNode$);
    $index$$292$$ -= this.$m_startNode$;
    $metadata$$16$$.key = this.$m_nodes$[$index$$292$$].id ? this.$m_nodes$[$index$$292$$].id : this.$m_nodes$[$index$$292$$].attr.id;
    $metadata$$16$$.leaf = this.$m_nodes$[$index$$292$$].$leaf$;
    $metadata$$16$$.depth = this.$m_nodes$[$index$$292$$].depth;
    null == $metadata$$16$$.leaf && ($metadata$$16$$.leaf = this.$m_nodes$[$index$$292$$].children && 0 < this.$m_nodes$[$index$$292$$].children.length ? !1 : !0);
    return $metadata$$16$$;
  };
  $oj$$75$$.$Object$.$exportPrototypeSymbol$("JsonNodeSet.prototype.getMetadata", {getMetadata:$oj$$75$$.$JsonNodeSet$.prototype.getMetadata});
  $oj$$75$$.$JsonNodeSet$.prototype.$_updateDepth$ = function $$oj$$75$$$$JsonNodeSet$$$$_updateDepth$$($currChild$$5$$, $offset$$32$$) {
    var $i$$470$$;
    $offset$$32$$++;
    $currChild$$5$$.depth = $offset$$32$$;
    if ($currChild$$5$$.children && 0 != $currChild$$5$$.children.length) {
      for ($i$$470$$ = 0;$i$$470$$ < $currChild$$5$$.children.length;$i$$470$$++) {
        this.$_updateDepth$($currChild$$5$$.children[$i$$470$$], $offset$$32$$);
      }
    }
  };
  $oj$$75$$.$JsonNodeSet$.prototype.$getChildNodeSet$ = function $$oj$$75$$$$JsonNodeSet$$$$getChildNodeSet$$($index$$293_key$$189$$) {
    var $results$$14$$, $depth$$28$$, $i$$471$$;
    $oj$$75$$.$Assert$.assert($index$$293_key$$189$$ <= this.$m_endNode$ && $index$$293_key$$189$$ >= this.$m_startNode$);
    $index$$293_key$$189$$ -= this.$m_startNode$;
    $depth$$28$$ = this.$m_nodes$[$index$$293_key$$189$$].depth;
    $results$$14$$ = this.$m_nodes$[$index$$293_key$$189$$].children;
    if (0 == $results$$14$$.length) {
      return null;
    }
    $index$$293_key$$189$$ = this.$m_nodes$[$index$$293_key$$189$$].id ? this.$m_nodes$[$index$$293_key$$189$$].id : this.$m_nodes$[$index$$293_key$$189$$].attr.id;
    for ($i$$471$$ = 0;$i$$471$$ < $results$$14$$.length;$i$$471$$++) {
      this.$_updateDepth$($results$$14$$[$i$$471$$], $depth$$28$$);
    }
    return new $oj$$75$$.$JsonNodeSet$(0, $results$$14$$.length, $results$$14$$, $index$$293_key$$189$$);
  };
  $oj$$75$$.$Object$.$exportPrototypeSymbol$("JsonNodeSet.prototype.getChildNodeSet", {$getChildNodeSet$:$oj$$75$$.$JsonNodeSet$.prototype.$getChildNodeSet$});
});
