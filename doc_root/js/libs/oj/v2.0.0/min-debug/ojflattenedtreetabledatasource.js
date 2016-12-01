/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
/*
 Copyright 2013 jQuery Foundation and other contributors
 Released under the MIT license.
 http://jquery.org/license
*/
define(["ojs/ojcore", "jquery", "ojs/ojdatasource-common"], function($oj$$78$$) {
  $oj$$78$$.$FlattenedTreeTableDataSource$ = function $$oj$$78$$$$FlattenedTreeTableDataSource$$($data$$183$$, $options$$404$$) {
    $options$$404$$ = $options$$404$$ || {};
    if (!($data$$183$$ instanceof $oj$$78$$.$FlattenedTreeDataSource$)) {
      throw Error($oj$$78$$.$TableDataSource$.$_LOGGER_MSG$._ERR_DATA_INVALID_TYPE_SUMMARY + "\n" + $oj$$78$$.$TableDataSource$.$_LOGGER_MSG$._ERR_DATA_INVALID_TYPE_DETAIL);
    }
    this.$_data$ = $data$$183$$;
    this.$_eventHandlers$ = [];
    this.$_startIndex$ = 0;
    this.$_nodeSetList$ = [];
    null == this.$_data$.$getOption$("fetchSize") && (this.$_data$.$getFetchSize$ = function $this$$_data$$$getFetchSize$$() {
      return-1;
    });
    var $self$$225$$ = this;
    this.$_data$.$insertRows$ = function $this$$_data$$$insertRows$$($insertAtIndex$$2$$, $i$$482_insertAtKey$$1$$, $nodeSet$$35$$) {
      var $row$$51$$, $rowIdx$$41$$, $rowKey$$41$$, $rowArray$$14$$ = [], $keyArray$$6$$ = [], $indexArray$$5$$ = [];
      for ($i$$482_insertAtKey$$1$$ = 0;$i$$482_insertAtKey$$1$$ < $nodeSet$$35$$.$getCount$();$i$$482_insertAtKey$$1$$++) {
        $row$$51$$ = $nodeSet$$35$$.getData($i$$482_insertAtKey$$1$$), $rowKey$$41$$ = $nodeSet$$35$$.getMetadata($i$$482_insertAtKey$$1$$).key, $rowIdx$$41$$ = $insertAtIndex$$2$$ + $i$$482_insertAtKey$$1$$, $self$$225$$.$_nodeSetList$[$rowIdx$$41$$] = {}, $self$$225$$.$_nodeSetList$[$rowIdx$$41$$].nodeSet = $nodeSet$$35$$, $self$$225$$.$_nodeSetList$[$rowIdx$$41$$].startIndex = $insertAtIndex$$2$$, $rowArray$$14$$.push($row$$51$$), $keyArray$$6$$.push($rowKey$$41$$), $indexArray$$5$$.push($rowIdx$$41$$), 
        $self$$225$$.$_rows$.data.splice($rowIdx$$41$$, 0, $row$$51$$), $self$$225$$.$_rows$.keys.splice($rowIdx$$41$$, 0, $rowKey$$41$$), $self$$225$$.$_rows$.indexes.splice($rowIdx$$41$$, 0, $rowIdx$$41$$);
      }
      $self$$225$$.$_pageSize$ || $oj$$78$$.$TableDataSource$.$superclass$.handleEvent.call($self$$225$$, $oj$$78$$.$TableDataSource$.$EventType$.ADD, {data:$rowArray$$14$$, keys:$keyArray$$6$$, indexes:$indexArray$$5$$});
      $self$$225$$.$_realignRowIndices$();
      $self$$225$$.$_pageSize$ && setTimeout(function() {
        $self$$225$$.fetch();
      }, 0);
    };
    this.$_data$.$removeRows$ = function $this$$_data$$$removeRows$$($rowKeys$$2$$) {
      var $i$$483$$, $rowIdx$$42$$, $rowArray$$15$$ = [], $keyArray$$7$$ = [], $indexArray$$6$$ = [];
      for ($i$$483$$ = 0;$i$$483$$ < $rowKeys$$2$$.length;$i$$483$$++) {
        $rowIdx$$42$$ = $rowKeys$$2$$[$i$$483$$].index - $i$$483$$, $rowArray$$15$$.push(""), $keyArray$$7$$.push(""), $indexArray$$6$$.push($rowIdx$$42$$), $self$$225$$.$_rows$.data.splice($rowIdx$$42$$, 1), $self$$225$$.$_rows$.keys.splice($rowIdx$$42$$, 1), $self$$225$$.$_rows$.indexes.splice($rowIdx$$42$$, 1);
      }
      $self$$225$$.$_pageSize$ || $oj$$78$$.$TableDataSource$.$superclass$.handleEvent.call($self$$225$$, $oj$$78$$.$TableDataSource$.$EventType$.REMOVE, {data:$rowArray$$15$$, keys:$keyArray$$7$$, indexes:$indexArray$$6$$});
      $self$$225$$.$_realignRowIndices$();
      $self$$225$$.$_pageSize$ && setTimeout(function() {
        $self$$225$$.fetch();
      }, 0);
    };
    this.Init();
    if (null != $options$$404$$ && ("enabled" == $options$$404$$.startFetch || null == $options$$404$$.startFetch) || null == $options$$404$$) {
      this.$_startFetchEnabled$ = !0;
    }
  };
  $goog$exportPath_$$("FlattenedTreeTableDataSource", $oj$$78$$.$FlattenedTreeTableDataSource$, $oj$$78$$);
  $oj$$78$$.$Object$.$createSubclass$($oj$$78$$.$FlattenedTreeTableDataSource$, $oj$$78$$.$TableDataSource$, "oj.FlattenedTreeTableDataSource");
  $oj$$78$$.$FlattenedTreeTableDataSource$.prototype.Init = function $$oj$$78$$$$FlattenedTreeTableDataSource$$$Init$() {
    $oj$$78$$.$FlattenedTreeTableDataSource$.$superclass$.Init.call(this);
  };
  $oj$$78$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeTableDataSource.prototype.Init", {Init:$oj$$78$$.$FlattenedTreeTableDataSource$.prototype.Init});
  $oj$$78$$.$FlattenedTreeTableDataSource$.prototype.getCapability = function $$oj$$78$$$$FlattenedTreeTableDataSource$$$getCapability$() {
    return "full";
  };
  $oj$$78$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeTableDataSource.prototype.getCapability", {getCapability:$oj$$78$$.$FlattenedTreeTableDataSource$.prototype.getCapability});
  $oj$$78$$.$FlattenedTreeTableDataSource$.prototype.getWrappedDataSource = function $$oj$$78$$$$FlattenedTreeTableDataSource$$$getWrappedDataSource$() {
    return this.$_data$;
  };
  $oj$$78$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeTableDataSource.prototype.getWrappedDataSource", {getWrappedDataSource:$oj$$78$$.$FlattenedTreeTableDataSource$.prototype.getWrappedDataSource});
  $oj$$78$$.$FlattenedTreeTableDataSource$.prototype.fetch = function $$oj$$78$$$$FlattenedTreeTableDataSource$$$fetch$($options$$405$$) {
    $options$$405$$ = $options$$405$$ || {};
    return "init" != $options$$405$$.fetchType || this.$_startFetchEnabled$ ? this.$_fetchInternal$($options$$405$$) : Promise.resolve();
  };
  $oj$$78$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeTableDataSource.prototype.fetch", {fetch:$oj$$78$$.$FlattenedTreeTableDataSource$.prototype.fetch});
  $oj$$78$$.$FlattenedTreeTableDataSource$.prototype.at = function $$oj$$78$$$$FlattenedTreeTableDataSource$$$at$($index$$297$$) {
    var $row$$53$$;
    $row$$53$$ = 0 > $index$$297$$ || $index$$297$$ >= this.$_rows$.length ? null : {data:this.$_rows$.data[$index$$297$$], index:$index$$297$$, key:this.$_rows$.keys[$index$$297$$]};
    return new Promise(function($resolve$$65$$) {
      $resolve$$65$$($row$$53$$);
    });
  };
  $oj$$78$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeTableDataSource.prototype.at", {at:$oj$$78$$.$FlattenedTreeTableDataSource$.prototype.at});
  $oj$$78$$.$FlattenedTreeTableDataSource$.prototype.collapse = function $$oj$$78$$$$FlattenedTreeTableDataSource$$$collapse$($rowKey$$42$$) {
    this.$_data$.collapse($rowKey$$42$$);
  };
  $oj$$78$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeTableDataSource.prototype.collapse", {collapse:$oj$$78$$.$FlattenedTreeTableDataSource$.prototype.collapse});
  $oj$$78$$.$FlattenedTreeTableDataSource$.prototype.expand = function $$oj$$78$$$$FlattenedTreeTableDataSource$$$expand$($rowKey$$43$$) {
    this.$_data$.expand($rowKey$$43$$);
  };
  $oj$$78$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeTableDataSource.prototype.expand", {expand:$oj$$78$$.$FlattenedTreeTableDataSource$.prototype.expand});
  $oj$$78$$.$FlattenedTreeTableDataSource$.prototype.get = function $$oj$$78$$$$FlattenedTreeTableDataSource$$$get$() {
    $oj$$78$$.$Assert$.$failedInAbstractFunction$();
    return null;
  };
  $oj$$78$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeTableDataSource.prototype.get", {get:$oj$$78$$.$FlattenedTreeTableDataSource$.prototype.get});
  $oj$$78$$.$FlattenedTreeTableDataSource$.prototype.on = function $$oj$$78$$$$FlattenedTreeTableDataSource$$$on$($eventType$$56$$, $eventHandler$$7$$) {
    if ("expand" == $eventType$$56$$ || "collapse" == $eventType$$56$$) {
      this.$_data$.on($eventType$$56$$, $eventHandler$$7$$);
    } else {
      $oj$$78$$.$FlattenedTreeTableDataSource$.$superclass$.on.call(this, $eventType$$56$$, $eventHandler$$7$$);
    }
  };
  $oj$$78$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeTableDataSource.prototype.on", {on:$oj$$78$$.$FlattenedTreeTableDataSource$.prototype.on});
  $oj$$78$$.$FlattenedTreeTableDataSource$.prototype.off = function $$oj$$78$$$$FlattenedTreeTableDataSource$$$off$($eventType$$57$$, $eventHandler$$8$$) {
    "expand" == $eventType$$57$$ || "collapse" == $eventType$$57$$ ? this.$_data$.off($eventType$$57$$, $eventHandler$$8$$) : $oj$$78$$.$FlattenedTreeTableDataSource$.$superclass$.off.call(this, $eventType$$57$$, $eventHandler$$8$$);
  };
  $oj$$78$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeTableDataSource.prototype.off", {off:$oj$$78$$.$FlattenedTreeTableDataSource$.prototype.off});
  $oj$$78$$.$FlattenedTreeTableDataSource$.prototype.sort = function $$oj$$78$$$$FlattenedTreeTableDataSource$$$sort$($criteria$$12$$) {
    if (null == $criteria$$12$$) {
      return Promise.resolve();
    }
    var $self$$227$$ = this;
    $criteria$$12$$.axis = "column";
    return new Promise(function($resolve$$66$$, $reject$$63$$) {
      $self$$227$$.$_data$.getWrappedDataSource().sort($criteria$$12$$, {success:function() {
        setTimeout(function() {
          $self$$227$$.$_data$.refresh();
          $self$$227$$.$_rows$ = null;
          var $result$$78$$ = {header:$criteria$$12$$.key, direction:$criteria$$12$$.direction};
          $oj$$78$$.$TableDataSource$.$superclass$.handleEvent.call($self$$227$$, $oj$$78$$.$TableDataSource$.$EventType$.SORT, $result$$78$$);
          $resolve$$66$$($result$$78$$);
        }, 0);
      }.bind(this), error:function($status$$33$$) {
        $reject$$63$$($status$$33$$);
      }.bind(this)});
    });
  };
  $oj$$78$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeTableDataSource.prototype.sort", {sort:$oj$$78$$.$FlattenedTreeTableDataSource$.prototype.sort});
  $oj$$78$$.$FlattenedTreeTableDataSource$.prototype.totalSize = function $$oj$$78$$$$FlattenedTreeTableDataSource$$$totalSize$() {
    return-1;
  };
  $oj$$78$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeTableDataSource.prototype.totalSize", {totalSize:$oj$$78$$.$FlattenedTreeTableDataSource$.prototype.totalSize});
  $oj$$78$$.$FlattenedTreeTableDataSource$.prototype.$_getMetadata$ = function $$oj$$78$$$$FlattenedTreeTableDataSource$$$$_getMetadata$$($index$$298$$) {
    return this.$_nodeSetList$[$index$$298$$].nodeSet.getMetadata($index$$298$$ - this.$_nodeSetList$[$index$$298$$].startIndex);
  };
  $oj$$78$$.$FlattenedTreeTableDataSource$.prototype.$_fetchInternal$ = function $$oj$$78$$$$FlattenedTreeTableDataSource$$$$_fetchInternal$$($options$$408$$) {
    $options$$408$$ = $options$$408$$ || {};
    this.$_startFetch$($options$$408$$);
    this.$_startIndex$ = null == $options$$408$$.startIndex ? this.$_startIndex$ : $options$$408$$.startIndex;
    var $rangeCount$$1_rowArray$$16$$ = Number.MAX_VALUE;
    this.$_pageSize$ = null == $options$$408$$.pageSize ? this.$_pageSize$ : $options$$408$$.pageSize;
    null != this.$_pageSize$ && ($rangeCount$$1_rowArray$$16$$ = this.$_pageSize$);
    var $keyArray$$8_startIndex$$32$$ = this.$_startIndex$;
    if (null != this.$_rows$) {
      if (null != this.$_pageSize$) {
        var $endIndex$$8_result$$79$$ = this.$_rows$.data.length - 1;
        if (this.$_startIndex$ + this.$_pageSize$ - 1 <= $endIndex$$8_result$$79$$) {
          var $endIndex$$8_result$$79$$ = $oj$$78$$.$FlattenedTreeTableDataSource$.$_getEndIndex$(this.$_rows$, this.$_startIndex$, this.$_pageSize$), $rangeCount$$1_rowArray$$16$$ = [], $keyArray$$8_startIndex$$32$$ = [], $i$$484$$;
          for ($i$$484$$ = this.$_startIndex$;$i$$484$$ <= $endIndex$$8_result$$79$$;$i$$484$$++) {
            $rangeCount$$1_rowArray$$16$$[$i$$484$$ - this.$_startIndex$] = this.$_rows$.data[$i$$484$$], $keyArray$$8_startIndex$$32$$[$i$$484$$ - this.$_startIndex$] = "";
          }
          $endIndex$$8_result$$79$$ = {data:$rangeCount$$1_rowArray$$16$$, keys:$keyArray$$8_startIndex$$32$$, startIndex:this.$_startIndex$};
          this.$_endFetch$($options$$408$$, $endIndex$$8_result$$79$$, null);
          return Promise.resolve($endIndex$$8_result$$79$$);
        }
        this.$_startIndex$ <= $endIndex$$8_result$$79$$ && ($keyArray$$8_startIndex$$32$$ = $endIndex$$8_result$$79$$ + 1);
      } else {
        this.$_data$.refresh(), this.$_rows$ = null;
      }
    }
    var $rangeOption$$ = {start:$keyArray$$8_startIndex$$32$$, count:$rangeCount$$1_rowArray$$16$$}, $self$$228$$ = this;
    return new Promise(function($resolve$$67$$, $reject$$64$$) {
      $self$$228$$.$_data$.$fetchRows$($rangeOption$$, {success:function($nodeSet$$37_result$$80$$) {
        $self$$228$$.$_handleFetchRowsSuccess$($nodeSet$$37_result$$80$$);
        $options$$408$$.refresh = !0;
        var $endIndex$$9$$ = $oj$$78$$.$FlattenedTreeTableDataSource$.$_getEndIndex$($self$$228$$.$_rows$, $self$$228$$.$_startIndex$, $self$$228$$.$_pageSize$), $rowArray$$17$$ = [], $keyArray$$9$$ = [], $i$$485$$;
        for ($i$$485$$ = $self$$228$$.$_startIndex$;$i$$485$$ <= $endIndex$$9$$;$i$$485$$++) {
          $rowArray$$17$$[$i$$485$$ - $self$$228$$.$_startIndex$] = $self$$228$$.$_rows$.data[$i$$485$$], $keyArray$$9$$[$i$$485$$ - $self$$228$$.$_startIndex$] = $nodeSet$$37_result$$80$$.getMetadata($i$$485$$).key;
        }
        $nodeSet$$37_result$$80$$ = {data:$rowArray$$17$$, keys:$keyArray$$9$$, startIndex:$self$$228$$.$_startIndex$};
        $self$$228$$.$_endFetch$($options$$408$$, $nodeSet$$37_result$$80$$, null);
        $resolve$$67$$($nodeSet$$37_result$$80$$);
      }.bind(this), error:function($error$$51$$) {
        $self$$228$$.$_endFetch$($options$$408$$, null, $error$$51$$);
        $reject$$64$$($error$$51$$);
      }.bind(this)});
    });
  };
  $oj$$78$$.$FlattenedTreeTableDataSource$.prototype.$_handleFetchRowsSuccess$ = function $$oj$$78$$$$FlattenedTreeTableDataSource$$$$_handleFetchRowsSuccess$$($nodeSet$$38$$) {
    var $i$$486$$, $rowIdx$$43$$;
    for ($i$$486$$ = 0;$i$$486$$ < $nodeSet$$38$$.$getCount$();$i$$486$$++) {
      $rowIdx$$43$$ = this.$_startIndex$ + $i$$486$$, this.$_nodeSetList$[$rowIdx$$43$$] = {}, this.$_nodeSetList$[$rowIdx$$43$$].nodeSet = $nodeSet$$38$$, this.$_nodeSetList$[$rowIdx$$43$$].startIndex = this.$_startIndex$;
    }
    this.$_rows$ || (this.$_rows$ = {}, this.$_rows$.data = [], this.$_rows$.keys = [], this.$_rows$.indexes = []);
    $oj$$78$$.$FlattenedTreeTableDataSource$.$_getRowArray$($nodeSet$$38$$, this, this.$_rows$);
  };
  $oj$$78$$.$FlattenedTreeTableDataSource$.prototype.$_startFetch$ = function $$oj$$78$$$$FlattenedTreeTableDataSource$$$$_startFetch$$($options$$409$$) {
    $options$$409$$.silent || $oj$$78$$.$TableDataSource$.$superclass$.handleEvent.call(this, $oj$$78$$.$TableDataSource$.$EventType$.REQUEST, {startIndex:$options$$409$$.startIndex});
  };
  $oj$$78$$.$FlattenedTreeTableDataSource$.prototype.$_endFetch$ = function $$oj$$78$$$$FlattenedTreeTableDataSource$$$$_endFetch$$($options$$410$$, $result$$81$$, $error$$52$$) {
    null != $error$$52$$ ? $oj$$78$$.$TableDataSource$.$superclass$.handleEvent.call(this, $oj$$78$$.$TableDataSource$.$EventType$.ERROR, $error$$52$$) : $options$$410$$.silent || $oj$$78$$.$TableDataSource$.$superclass$.handleEvent.call(this, $oj$$78$$.$TableDataSource$.$EventType$.SYNC, $result$$81$$);
  };
  $oj$$78$$.$FlattenedTreeTableDataSource$.$_getEndIndex$ = function $$oj$$78$$$$FlattenedTreeTableDataSource$$$_getEndIndex$$($rows$$8$$, $startIndex$$33$$, $pageSize$$11$$) {
    var $endIndex$$10$$ = $rows$$8$$.data.length - 1;
    0 < $pageSize$$11$$ && ($endIndex$$10$$ = $startIndex$$33$$ + $pageSize$$11$$ - 1, $endIndex$$10$$ = $endIndex$$10$$ > $rows$$8$$.data.length - 1 ? $rows$$8$$.data.length - 1 : $endIndex$$10$$);
    return $endIndex$$10$$;
  };
  $oj$$78$$.$FlattenedTreeTableDataSource$.$_getRowArray$ = function $$oj$$78$$$$FlattenedTreeTableDataSource$$$_getRowArray$$($nodeSet$$39$$, $endIndex$$11_rowSet$$, $rows$$9$$) {
    $endIndex$$11_rowSet$$ = $nodeSet$$39$$.$getCount$() - 1;
    var $i$$487$$;
    for ($i$$487$$ = $nodeSet$$39$$.$getStart$();$i$$487$$ <= $endIndex$$11_rowSet$$;$i$$487$$++) {
      var $row$$54$$ = $nodeSet$$39$$.getData($i$$487$$);
      $rows$$9$$.data[$i$$487$$] = $row$$54$$;
      $rows$$9$$.keys[$i$$487$$] = "";
      $rows$$9$$.indexes[$i$$487$$] = $i$$487$$;
    }
  };
  $oj$$78$$.$FlattenedTreeTableDataSource$.prototype.$_realignRowIndices$ = function $$oj$$78$$$$FlattenedTreeTableDataSource$$$$_realignRowIndices$$() {
    for (var $i$$488$$ = 0;$i$$488$$ < this.$_rows$.data.length;$i$$488$$++) {
      this.$_rows$.indexes[$i$$488$$] = $i$$488$$;
    }
  };
});
