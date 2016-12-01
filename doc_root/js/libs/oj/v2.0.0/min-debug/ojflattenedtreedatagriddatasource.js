/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore", "jquery", "ojs/ojdatasource-common", "ojs/ojrowexpander"], function($oj$$68$$) {
  $oj$$68$$.$FlattenedTreeHeaderSet$ = function $$oj$$68$$$$FlattenedTreeHeaderSet$$($start$$57$$, $end$$19$$, $headers$$5$$, $nodeSet$$27$$, $rowHeader$$2$$) {
    $oj$$68$$.$Assert$.$assertArrayOrNull$($headers$$5$$);
    this.$m_start$ = $start$$57$$;
    this.$m_end$ = $end$$19$$;
    this.$m_headers$ = $headers$$5$$;
    this.$m_nodeSet$ = $nodeSet$$27$$;
    this.$m_rowHeader$ = $rowHeader$$2$$;
  };
  $goog$exportPath_$$("FlattenedTreeHeaderSet", $oj$$68$$.$FlattenedTreeHeaderSet$, $oj$$68$$);
  $oj$$68$$.$FlattenedTreeHeaderSet$.prototype.getData = function $$oj$$68$$$$FlattenedTreeHeaderSet$$$getData$($index$$277$$, $level$$39$$) {
    var $rowData$$5$$;
    $oj$$68$$.$Assert$.assert($index$$277$$ <= this.$m_end$ && $index$$277$$ >= this.$m_start$, "index out of bounds");
    $oj$$68$$.$Assert$.assert(null == $level$$39$$ || 0 == $level$$39$$, "level out of bounds");
    return null != this.$m_rowHeader$ && null != this.$m_nodeSet$ ? ($rowData$$5$$ = this.$m_nodeSet$.getData($index$$277$$ - this.$m_start$ + this.$m_nodeSet$.$getStart$()), null != $rowData$$5$$ ? $rowData$$5$$.get ? $rowData$$5$$.get(this.$m_rowHeader$) : $rowData$$5$$[this.$m_rowHeader$] : null) : this.$m_headers$[$index$$277$$];
  };
  $oj$$68$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeHeaderSet.prototype.getData", {getData:$oj$$68$$.$FlattenedTreeHeaderSet$.prototype.getData});
  $oj$$68$$.$FlattenedTreeHeaderSet$.prototype.getMetadata = function $$oj$$68$$$$FlattenedTreeHeaderSet$$$getMetadata$($index$$278$$, $level$$40$$) {
    $oj$$68$$.$Assert$.assert($index$$278$$ <= this.$m_end$ && $index$$278$$ >= this.$m_start$, "index out of bounds");
    $oj$$68$$.$Assert$.assert(null == $level$$40$$ || 0 == $level$$40$$, "level out of bounds");
    return null != this.$m_rowHeader$ && null != this.$m_nodeSet$ ? this.$m_nodeSet$.getMetadata($index$$278$$ - this.$m_start$ + this.$m_nodeSet$.$getStart$()) : {key:this.getData($index$$278$$)};
  };
  $oj$$68$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeHeaderSet.prototype.getMetadata", {getMetadata:$oj$$68$$.$FlattenedTreeHeaderSet$.prototype.getMetadata});
  $oj$$68$$.$FlattenedTreeHeaderSet$.prototype.$getCount$ = function $$oj$$68$$$$FlattenedTreeHeaderSet$$$$getCount$$() {
    return null != this.$m_rowHeader$ && null != this.$m_nodeSet$ ? Math.min(this.$m_nodeSet$.$getCount$(), this.$m_end$ - this.$m_start$) : Math.max(0, this.$m_end$ - this.$m_start$);
  };
  $oj$$68$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeHeaderSet.prototype.getCount", {$getCount$:$oj$$68$$.$FlattenedTreeHeaderSet$.prototype.$getCount$});
  $oj$$68$$.$FlattenedTreeHeaderSet$.prototype.$getLevelCount$ = function $$oj$$68$$$$FlattenedTreeHeaderSet$$$$getLevelCount$$() {
    return 0 < this.$getCount$() ? 1 : 0;
  };
  $oj$$68$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeHeaderSet.prototype.getLevelCount", {$getLevelCount$:$oj$$68$$.$FlattenedTreeHeaderSet$.prototype.$getLevelCount$});
  $oj$$68$$.$FlattenedTreeHeaderSet$.prototype.$getExtent$ = function $$oj$$68$$$$FlattenedTreeHeaderSet$$$$getExtent$$($index$$279$$, $level$$41$$) {
    $oj$$68$$.$Assert$.assert($index$$279$$ <= this.$m_end$ && $index$$279$$ >= this.$m_start$, "index out of bounds");
    $oj$$68$$.$Assert$.assert(null == $level$$41$$ || 0 == $level$$41$$, "level out of bounds");
    return{extent:1, more:{before:!1, after:!1}};
  };
  $oj$$68$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeHeaderSet.prototype.getExtent", {$getExtent$:$oj$$68$$.$FlattenedTreeHeaderSet$.prototype.$getExtent$});
  $oj$$68$$.$FlattenedTreeHeaderSet$.prototype.$getDepth$ = function $$oj$$68$$$$FlattenedTreeHeaderSet$$$$getDepth$$($index$$280$$, $level$$42$$) {
    $oj$$68$$.$Assert$.assert($index$$280$$ <= this.$m_end$ && $index$$280$$ >= this.$m_start$, "index out of bounds");
    $oj$$68$$.$Assert$.assert(null == $level$$42$$ || 0 == $level$$42$$, "level out of bounds");
    return 1;
  };
  $oj$$68$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeHeaderSet.prototype.getDepth", {$getDepth$:$oj$$68$$.$FlattenedTreeHeaderSet$.prototype.$getDepth$});
  $oj$$68$$.$FlattenedTreeCellSet$ = function $$oj$$68$$$$FlattenedTreeCellSet$$($startRow$$3$$, $endRow$$2$$, $startColumn$$3$$, $endColumn$$2$$, $nodeSet$$28$$, $columns$$24$$) {
    $oj$$68$$.$Assert$.$assertArrayOrNull$($columns$$24$$);
    this.$m_startRow$ = $startRow$$3$$;
    this.$m_endRow$ = $endRow$$2$$;
    this.$m_startColumn$ = $startColumn$$3$$;
    this.$m_endColumn$ = $endColumn$$2$$;
    this.$m_nodeSet$ = $nodeSet$$28$$;
    this.$m_columns$ = $columns$$24$$;
  };
  $goog$exportPath_$$("FlattenedTreeCellSet", $oj$$68$$.$FlattenedTreeCellSet$, $oj$$68$$);
  $oj$$68$$.$FlattenedTreeCellSet$.prototype.getData = function $$oj$$68$$$$FlattenedTreeCellSet$$$getData$($indexes$$16_row$$48_rowData$$6$$) {
    var $column$$26_columnKey$$6_relIndex$$2$$;
    $column$$26_columnKey$$6_relIndex$$2$$ = this.$_getRelIndexes$($indexes$$16_row$$48_rowData$$6$$);
    if (null == $column$$26_columnKey$$6_relIndex$$2$$) {
      return null;
    }
    $indexes$$16_row$$48_rowData$$6$$ = $column$$26_columnKey$$6_relIndex$$2$$[0];
    $column$$26_columnKey$$6_relIndex$$2$$ = $column$$26_columnKey$$6_relIndex$$2$$[1];
    $oj$$68$$.$Assert$.assert($indexes$$16_row$$48_rowData$$6$$ < this.$m_nodeSet$.$getStart$() + this.$m_nodeSet$.$getCount$() && $column$$26_columnKey$$6_relIndex$$2$$ < this.$m_columns$.length);
    $column$$26_columnKey$$6_relIndex$$2$$ = this.$m_columns$[$column$$26_columnKey$$6_relIndex$$2$$];
    $indexes$$16_row$$48_rowData$$6$$ = this.$m_nodeSet$.getData($indexes$$16_row$$48_rowData$$6$$);
    return null != $indexes$$16_row$$48_rowData$$6$$ ? $indexes$$16_row$$48_rowData$$6$$.get ? $indexes$$16_row$$48_rowData$$6$$.get($column$$26_columnKey$$6_relIndex$$2$$) : $indexes$$16_row$$48_rowData$$6$$[$column$$26_columnKey$$6_relIndex$$2$$] : null;
  };
  $oj$$68$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeCellSet.prototype.getData", {getData:$oj$$68$$.$FlattenedTreeCellSet$.prototype.getData});
  $oj$$68$$.$FlattenedTreeCellSet$.prototype.getMetadata = function $$oj$$68$$$$FlattenedTreeCellSet$$$getMetadata$($indexes$$17_metadata$$14_row$$49$$) {
    var $column$$27_columnKey$$7_relIndex$$3$$;
    $column$$27_columnKey$$7_relIndex$$3$$ = this.$_getRelIndexes$($indexes$$17_metadata$$14_row$$49$$);
    if (null == $column$$27_columnKey$$7_relIndex$$3$$) {
      return null;
    }
    $indexes$$17_metadata$$14_row$$49$$ = $column$$27_columnKey$$7_relIndex$$3$$[0];
    $column$$27_columnKey$$7_relIndex$$3$$ = $column$$27_columnKey$$7_relIndex$$3$$[1];
    $oj$$68$$.$Assert$.assert($indexes$$17_metadata$$14_row$$49$$ < this.$m_nodeSet$.$getStart$() + this.$m_nodeSet$.$getCount$() && $column$$27_columnKey$$7_relIndex$$3$$ < this.$m_columns$.length);
    $column$$27_columnKey$$7_relIndex$$3$$ = this.$m_columns$[$column$$27_columnKey$$7_relIndex$$3$$];
    $indexes$$17_metadata$$14_row$$49$$ = this.$m_nodeSet$.getMetadata($indexes$$17_metadata$$14_row$$49$$);
    $indexes$$17_metadata$$14_row$$49$$.keys = {row:$indexes$$17_metadata$$14_row$$49$$.key, column:$column$$27_columnKey$$7_relIndex$$3$$};
    return $indexes$$17_metadata$$14_row$$49$$;
  };
  $oj$$68$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeCellSet.prototype.getMetadata", {getMetadata:$oj$$68$$.$FlattenedTreeCellSet$.prototype.getMetadata});
  $oj$$68$$.$FlattenedTreeCellSet$.prototype.$_getRelIndexes$ = function $$oj$$68$$$$FlattenedTreeCellSet$$$$_getRelIndexes$$($column$$28_indexes$$18$$) {
    var $row$$50$$;
    $oj$$68$$.$Assert$.$assertObject$($column$$28_indexes$$18$$);
    if (null == this.$m_nodeSet$ || 0 == this.$m_nodeSet$.length) {
      return null;
    }
    $row$$50$$ = $column$$28_indexes$$18$$.row - this.$m_startRow$ + this.$m_nodeSet$.$getStart$();
    $column$$28_indexes$$18$$ = $column$$28_indexes$$18$$.column;
    $oj$$68$$.$Assert$.$assertNumber$($row$$50$$, null);
    $oj$$68$$.$Assert$.$assertNumber$($column$$28_indexes$$18$$, null);
    $oj$$68$$.$Assert$.assert(0 <= $row$$50$$ && 0 <= $column$$28_indexes$$18$$);
    return[$row$$50$$, $column$$28_indexes$$18$$];
  };
  $oj$$68$$.$FlattenedTreeCellSet$.prototype.$getStart$ = function $$oj$$68$$$$FlattenedTreeCellSet$$$$getStart$$($axis$$46$$) {
    return "row" === $axis$$46$$ ? this.$m_startRow$ : "column" === $axis$$46$$ ? this.$m_startColumn$ : 0;
  };
  $oj$$68$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeCellSet.prototype.getStart", {$getStart$:$oj$$68$$.$FlattenedTreeCellSet$.prototype.$getStart$});
  $oj$$68$$.$FlattenedTreeCellSet$.prototype.$getCount$ = function $$oj$$68$$$$FlattenedTreeCellSet$$$$getCount$$($axis$$47$$) {
    return "row" === $axis$$47$$ ? Math.min(this.$m_endRow$ - this.$m_startRow$, this.$m_nodeSet$.$getCount$()) : "column" === $axis$$47$$ ? this.$m_endColumn$ - this.$m_startColumn$ : 0;
  };
  $oj$$68$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeCellSet.prototype.getCount", {$getCount$:$oj$$68$$.$FlattenedTreeCellSet$.prototype.$getCount$});
  $oj$$68$$.$FlattenedTreeDataGridDataSource$ = function $$oj$$68$$$$FlattenedTreeDataGridDataSource$$($treeDataSource$$2$$, $options$$363$$) {
    $oj$$68$$.$FlattenedTreeDataGridDataSource$.$superclass$.constructor.call(this, $treeDataSource$$2$$, $options$$363$$);
  };
  $goog$exportPath_$$("FlattenedTreeDataGridDataSource", $oj$$68$$.$FlattenedTreeDataGridDataSource$, $oj$$68$$);
  $oj$$68$$.$Object$.$createSubclass$($oj$$68$$.$FlattenedTreeDataGridDataSource$, $oj$$68$$.$FlattenedTreeDataSource$, "oj.FlattenedTreeDataGridDataSource");
  $oj$$68$$.$FlattenedTreeDataGridDataSource$.prototype.Init = function $$oj$$68$$$$FlattenedTreeDataGridDataSource$$$Init$() {
    $oj$$68$$.$FlattenedTreeDataGridDataSource$.$superclass$.Init.call(this);
    this.$m_columns$ = $oj$$68$$.$FlattenedTreeDataGridDataSource$.$superclass$.$getOption$.call(this, "columns");
    this.$m_rowHeader$ = $oj$$68$$.$FlattenedTreeDataGridDataSource$.$superclass$.$getOption$.call(this, "rowHeader");
  };
  $oj$$68$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeDataGridDataSource.prototype.Init", {Init:$oj$$68$$.$FlattenedTreeDataGridDataSource$.prototype.Init});
  $oj$$68$$.$FlattenedTreeDataGridDataSource$.prototype.$getCountPrecision$ = function $$oj$$68$$$$FlattenedTreeDataGridDataSource$$$$getCountPrecision$$($axis$$48$$) {
    return "row" === $axis$$48$$ ? "estimate" : "actual";
  };
  $oj$$68$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeDataGridDataSource.prototype.getCountPrecision", {$getCountPrecision$:$oj$$68$$.$FlattenedTreeDataGridDataSource$.prototype.$getCountPrecision$});
  $oj$$68$$.$FlattenedTreeDataGridDataSource$.prototype.$getCount$ = function $$oj$$68$$$$FlattenedTreeDataGridDataSource$$$$getCount$$($axis$$49$$) {
    return "row" === $axis$$49$$ ? -1 : "column" === $axis$$49$$ ? this.$m_columns$.length : 0;
  };
  $oj$$68$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeDataGridDataSource.prototype.getCount", {$getCount$:$oj$$68$$.$FlattenedTreeDataGridDataSource$.prototype.$getCount$});
  $oj$$68$$.$FlattenedTreeDataGridDataSource$.prototype.$fetchHeaders$ = function $$oj$$68$$$$FlattenedTreeDataGridDataSource$$$$fetchHeaders$$($headerRange$$6$$, $callbacks$$43$$, $callbackObjects$$21$$) {
    var $axis$$50_columnCount$$3$$, $headerSet$$2$$;
    $axis$$50_columnCount$$3$$ = $headerRange$$6$$.axis;
    if ("column" === $axis$$50_columnCount$$3$$) {
      $axis$$50_columnCount$$3$$ = $headerRange$$6$$.start + $headerRange$$6$$.count, $axis$$50_columnCount$$3$$ > this.$getCount$("column") && ($axis$$50_columnCount$$3$$ = this.$getCount$("column") - $headerRange$$6$$.start), $headerSet$$2$$ = new $oj$$68$$.$FlattenedTreeHeaderSet$($headerRange$$6$$.start, $axis$$50_columnCount$$3$$, this.$m_columns$);
    } else {
      if ("row" === $axis$$50_columnCount$$3$$) {
        if (null != this.$m_rowHeader$) {
          this.$m_fetchHeaderRequest$ = {range:$headerRange$$6$$, callbacks:$callbacks$$43$$, callbackObjects:$callbackObjects$$21$$};
          return;
        }
        $headerSet$$2$$ = new $oj$$68$$.$ArrayHeaderSet$($headerRange$$6$$.start, $headerRange$$6$$.start, $axis$$50_columnCount$$3$$, null);
      }
    }
    null != $headerSet$$2$$ && null != $callbacks$$43$$ && null != $callbacks$$43$$.success && (null == $callbackObjects$$21$$ && ($callbackObjects$$21$$ = {}), $callbacks$$43$$.success.call($callbackObjects$$21$$.success, $headerSet$$2$$, $headerRange$$6$$));
  };
  $oj$$68$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeDataGridDataSource.prototype.fetchHeaders", {$fetchHeaders$:$oj$$68$$.$FlattenedTreeDataGridDataSource$.prototype.$fetchHeaders$});
  $oj$$68$$.$FlattenedTreeDataGridDataSource$.prototype.$fetchCells$ = function $$oj$$68$$$$FlattenedTreeDataGridDataSource$$$$fetchCells$$($cellRanges$$7$$, $callbacks$$44$$, $callbackObjects$$22$$) {
    var $i$$447$$, $cellRange$$4$$, $rowStart$$6$$, $rowCount$$8$$;
    for ($i$$447$$ = 0;$i$$447$$ < $cellRanges$$7$$.length;$i$$447$$++) {
      if ($cellRange$$4$$ = $cellRanges$$7$$[$i$$447$$], "row" == $cellRange$$4$$.axis) {
        $rowStart$$6$$ = $cellRange$$4$$.start;
        $rowCount$$8$$ = $cellRange$$4$$.count;
        break;
      }
    }
    $oj$$68$$.$FlattenedTreeDataGridDataSource$.$superclass$.$fetchRows$.call(this, {start:$rowStart$$6$$, count:$rowCount$$8$$}, {success:function($nodeSet$$29$$) {
      this.$_handleFetchRowsSuccess$($nodeSet$$29$$, $cellRanges$$7$$, $callbacks$$44$$, $callbackObjects$$22$$, 0);
    }.bind(this), error:function($status$$30$$) {
      this.$_handleFetchRowsError$($status$$30$$, {start:$rowStart$$6$$, count:$rowCount$$8$$}, $callbacks$$44$$, $callbackObjects$$22$$);
    }.bind(this)});
  };
  $oj$$68$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeDataGridDataSource.prototype.fetchCells", {$fetchCells$:$oj$$68$$.$FlattenedTreeDataGridDataSource$.prototype.$fetchCells$});
  $oj$$68$$.$FlattenedTreeDataGridDataSource$.prototype.keys = function $$oj$$68$$$$FlattenedTreeDataGridDataSource$$$keys$($indexes$$19$$) {
    var $rowIndex$$12$$, $colIndex$$;
    $rowIndex$$12$$ = $indexes$$19$$.row;
    $colIndex$$ = $indexes$$19$$.column;
    return new Promise(function($resolve$$59$$) {
      $rowIndex$$12$$ > $oj$$68$$.$FlattenedTreeDataGridDataSource$.$superclass$.$getFetchedRange$.call(this).end || $colIndex$$ > this.$m_columns$.length ? $resolve$$59$$(null) : $resolve$$59$$({row:$oj$$68$$.$FlattenedTreeDataGridDataSource$.$superclass$.getKey.call(this, $rowIndex$$12$$), column:this.$m_columns$[$colIndex$$]});
    }.bind(this));
  };
  $oj$$68$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeDataGridDataSource.prototype.keys", {keys:$oj$$68$$.$FlattenedTreeDataGridDataSource$.prototype.keys});
  $oj$$68$$.$FlattenedTreeDataGridDataSource$.prototype.$indexes$ = function $$oj$$68$$$$FlattenedTreeDataGridDataSource$$$$indexes$$($keys$$41$$) {
    var $rowIndex$$13$$, $colIndex$$1$$, $rowKey$$40$$, $colKey$$, $i$$448$$;
    $rowKey$$40$$ = $keys$$41$$.row;
    $colKey$$ = $keys$$41$$.column;
    return new Promise(function($resolve$$60$$) {
      $rowIndex$$13$$ = $oj$$68$$.$FlattenedTreeDataGridDataSource$.$superclass$.$getIndex$.call(this, $rowKey$$40$$);
      for ($i$$448$$ = 0;$i$$448$$ < this.$m_columns$.length;$i$$448$$++) {
        if (this.$m_columns$[$i$$448$$] === $colKey$$) {
          $colIndex$$1$$ = $i$$448$$;
          break;
        }
      }
      0 <= $rowIndex$$13$$ || 0 <= $colIndex$$1$$ ? $resolve$$60$$({row:$rowIndex$$13$$, column:$colIndex$$1$$}) : $resolve$$60$$(null);
    }.bind(this));
  };
  $oj$$68$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeDataGridDataSource.prototype.indexes", {$indexes$:$oj$$68$$.$FlattenedTreeDataGridDataSource$.prototype.$indexes$});
  $oj$$68$$.$FlattenedTreeDataGridDataSource$.prototype.sort = function $$oj$$68$$$$FlattenedTreeDataGridDataSource$$$sort$($criteria$$8$$, $callbacks$$45$$, $callbackObjects$$23$$) {
    return $oj$$68$$.$FlattenedTreeDataGridDataSource$.$superclass$.getWrappedDataSource.call(this).sort($criteria$$8$$, {success:function() {
      this.$_handleSortSuccess$($callbacks$$45$$, $callbackObjects$$23$$);
    }.bind(this), error:$callbacks$$45$$.error});
  };
  $oj$$68$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeDataGridDataSource.prototype.sort", {sort:$oj$$68$$.$FlattenedTreeDataGridDataSource$.prototype.sort});
  $oj$$68$$.$FlattenedTreeDataGridDataSource$.prototype.$_handleSortSuccess$ = function $$oj$$68$$$$FlattenedTreeDataGridDataSource$$$$_handleSortSuccess$$($callbacks$$46$$, $callbackObjects$$24$$) {
    this.refresh();
    $callbacks$$46$$.success && (null == $callbackObjects$$24$$ && ($callbackObjects$$24$$ = {}), $callbacks$$46$$.success.call($callbackObjects$$24$$.success));
  };
  $oj$$68$$.$FlattenedTreeDataGridDataSource$.prototype.move = function $$oj$$68$$$$FlattenedTreeDataGridDataSource$$$move$($rowToMove$$8$$, $referenceRow$$8$$, $position$$40$$, $callbacks$$47$$) {
    $oj$$68$$.$FlattenedTreeDataGridDataSource$.$superclass$.getWrappedDataSource.call(this).move($rowToMove$$8$$, $referenceRow$$8$$, $position$$40$$, $callbacks$$47$$);
  };
  $oj$$68$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeDataGridDataSource.prototype.move", {move:$oj$$68$$.$FlattenedTreeDataGridDataSource$.prototype.move});
  $oj$$68$$.$FlattenedTreeDataGridDataSource$.prototype.getCapability = function $$oj$$68$$$$FlattenedTreeDataGridDataSource$$$getCapability$($feature$$13$$) {
    return "default" === $oj$$68$$.$FlattenedTreeDataGridDataSource$.$superclass$.getWrappedDataSource.call(this).getCapability($feature$$13$$) ? "column" : "none";
  };
  $oj$$68$$.$Object$.$exportPrototypeSymbol$("FlattenedTreeDataGridDataSource.prototype.getCapability", {getCapability:$oj$$68$$.$FlattenedTreeDataGridDataSource$.prototype.getCapability});
  $oj$$68$$.$FlattenedTreeDataGridDataSource$.prototype.$insertMetadata$ = function $$oj$$68$$$$FlattenedTreeDataGridDataSource$$$$insertMetadata$$($key$$182$$, $metadata$$15$$) {
    $oj$$68$$.$FlattenedTreeDataGridDataSource$.$superclass$.$insertMetadata$.call(this, $key$$182$$, $metadata$$15$$);
  };
  $oj$$68$$.$FlattenedTreeDataGridDataSource$.prototype.$_handleFetchRowsSuccess$ = function $$oj$$68$$$$FlattenedTreeDataGridDataSource$$$$_handleFetchRowsSuccess$$($cellSet$$2_nodeSet$$30$$, $cellRanges$$8$$, $callbacks$$48$$, $callbackObjects$$25$$) {
    var $headerRange$$7_i$$449$$, $cellRange$$5$$, $rowStart$$7$$, $rowCount$$9$$, $columnStart$$, $columnCount$$4$$;
    for ($headerRange$$7_i$$449$$ = 0;$headerRange$$7_i$$449$$ < $cellRanges$$8$$.length;$headerRange$$7_i$$449$$++) {
      $cellRange$$5$$ = $cellRanges$$8$$[$headerRange$$7_i$$449$$], "row" == $cellRange$$5$$.axis ? ($rowStart$$7$$ = $cellRange$$5$$.start, $rowCount$$9$$ = $cellRange$$5$$.count) : "column" == $cellRange$$5$$.axis && ($columnStart$$ = $cellRange$$5$$.start, $columnCount$$4$$ = $cellRange$$5$$.count, $columnStart$$ + $columnCount$$4$$ > this.$getCount$("column") && ($columnCount$$4$$ = this.$getCount$("column") - $columnStart$$));
    }
    this.$m_fetchHeaderRequest$ && ($headerRange$$7_i$$449$$ = this.$m_fetchHeaderRequest$.range, $headerRange$$7_i$$449$$.start == $rowStart$$7$$ && $headerRange$$7_i$$449$$.count == $rowCount$$9$$ && this.$_handleRowHeaderFetchSuccess$($cellSet$$2_nodeSet$$30$$, $headerRange$$7_i$$449$$, this.$m_fetchHeaderRequest$.callbacks, this.$m_fetchHeaderRequest$.callbackObjects), this.$m_fetchHeaderRequest$ = null);
    $cellSet$$2_nodeSet$$30$$ = new $oj$$68$$.$FlattenedTreeCellSet$($rowStart$$7$$, $rowStart$$7$$ + $rowCount$$9$$, $columnStart$$, $columnStart$$ + $columnCount$$4$$, $cellSet$$2_nodeSet$$30$$, this.$m_columns$);
    $callbacks$$48$$.success && (null == $callbackObjects$$25$$ && ($callbackObjects$$25$$ = {}), $callbacks$$48$$.success.call($callbackObjects$$25$$.success, $cellSet$$2_nodeSet$$30$$, $cellRanges$$8$$));
  };
  $oj$$68$$.$FlattenedTreeDataGridDataSource$.prototype.$_handleFetchRowsError$ = function $$oj$$68$$$$FlattenedTreeDataGridDataSource$$$$_handleFetchRowsError$$($status$$31$$, $headerCallbacks_range$$19$$, $callbacks$$49$$, $callbackObjects$$26$$) {
    var $headerCallbackObjects_headerRange$$8$$;
    this.$m_fetchHeaderRequest$ && ($headerCallbackObjects_headerRange$$8$$ = this.$m_fetchHeaderRequest$.range, $headerCallbackObjects_headerRange$$8$$.start == $headerCallbacks_range$$19$$.start && $headerCallbackObjects_headerRange$$8$$.count == $headerCallbacks_range$$19$$.count && ($headerCallbacks_range$$19$$ = this.$m_fetchHeaderRequest$.callbacks, $headerCallbackObjects_headerRange$$8$$ = this.$m_fetchHeaderRequest$.callbackObjects, $headerCallbacks_range$$19$$.error && (null == $headerCallbackObjects_headerRange$$8$$ && 
    ($headerCallbackObjects_headerRange$$8$$ = {}), $headerCallbacks_range$$19$$.error.call($headerCallbackObjects_headerRange$$8$$.error, $status$$31$$))), this.$m_fetchHeaderRequest$ = null);
    $callbacks$$49$$.error && (null == $callbackObjects$$26$$ && ($callbackObjects$$26$$ = {}), $callbacks$$49$$.success.call($callbackObjects$$26$$.error, $status$$31$$));
  };
  $oj$$68$$.$FlattenedTreeDataGridDataSource$.prototype.$_handleRowHeaderFetchSuccess$ = function $$oj$$68$$$$FlattenedTreeDataGridDataSource$$$$_handleRowHeaderFetchSuccess$$($headerSet$$3_nodeSet$$31$$, $headerRange$$9$$, $callbacks$$50$$, $callbackObjects$$27$$) {
    $headerSet$$3_nodeSet$$31$$ = new $oj$$68$$.$FlattenedTreeHeaderSet$($headerRange$$9$$.start, $headerRange$$9$$.start + $headerRange$$9$$.count, this.$m_columns$, $headerSet$$3_nodeSet$$31$$, this.$m_rowHeader$);
    $callbacks$$50$$.success && (null == $callbackObjects$$27$$ && ($callbackObjects$$27$$ = {}), $callbacks$$50$$.success.call($callbackObjects$$27$$.success, $headerSet$$3_nodeSet$$31$$, $headerRange$$9$$));
  };
  $oj$$68$$.$FlattenedTreeDataGridDataSource$.prototype.$insertRows$ = function $$oj$$68$$$$FlattenedTreeDataGridDataSource$$$$insertRows$$($event$$607_insertAtIndex$$1$$, $cellSet$$3_insertAtRowKey$$, $nodeSet$$32$$) {
    var $headerSet$$4$$, $i$$450$$, $keys$$42$$, $indexes$$20$$;
    $headerSet$$4$$ = null;
    this.$m_rowHeader$ && ($headerSet$$4$$ = new $oj$$68$$.$FlattenedTreeHeaderSet$($event$$607_insertAtIndex$$1$$, $event$$607_insertAtIndex$$1$$ + $nodeSet$$32$$.$getCount$(), this.$m_columns$, $nodeSet$$32$$, this.$m_rowHeader$));
    $cellSet$$3_insertAtRowKey$$ = new $oj$$68$$.$FlattenedTreeCellSet$($event$$607_insertAtIndex$$1$$, $event$$607_insertAtIndex$$1$$ + $nodeSet$$32$$.$getCount$(), 0, this.$m_columns$.length, $nodeSet$$32$$, this.$m_columns$);
    $keys$$42$$ = [];
    $indexes$$20$$ = [];
    for ($i$$450$$ = 0;$i$$450$$ < $nodeSet$$32$$.$getCount$();$i$$450$$++) {
      $keys$$42$$.push({row:this.$_getEntry$($event$$607_insertAtIndex$$1$$ + $i$$450$$).key}), $indexes$$20$$.push({row:$event$$607_insertAtIndex$$1$$ + $i$$450$$, column:-1});
    }
    $event$$607_insertAtIndex$$1$$ = {source:this, operation:"insert"};
    $event$$607_insertAtIndex$$1$$.result = $cellSet$$3_insertAtRowKey$$;
    $headerSet$$4$$ && ($event$$607_insertAtIndex$$1$$.header = $headerSet$$4$$);
    $event$$607_insertAtIndex$$1$$.keys = $keys$$42$$;
    $event$$607_insertAtIndex$$1$$.indexes = $indexes$$20$$;
    $oj$$68$$.$FlattenedTreeDataGridDataSource$.$superclass$.handleEvent.call(this, "change", $event$$607_insertAtIndex$$1$$);
  };
  $oj$$68$$.$FlattenedTreeDataGridDataSource$.prototype.$removeRows$ = function $$oj$$68$$$$FlattenedTreeDataGridDataSource$$$$removeRows$$($event$$608_rowKeys$$1$$) {
    var $keys$$43$$, $i$$451$$, $indexes$$21$$;
    $keys$$43$$ = [];
    $indexes$$21$$ = [];
    for ($i$$451$$ = 0;$i$$451$$ < $event$$608_rowKeys$$1$$.length;$i$$451$$++) {
      $keys$$43$$.push({row:$event$$608_rowKeys$$1$$[$i$$451$$].key}), $indexes$$21$$.push({row:$event$$608_rowKeys$$1$$[$i$$451$$].index, column:-1});
    }
    $event$$608_rowKeys$$1$$ = {source:this, operation:"delete"};
    $event$$608_rowKeys$$1$$.keys = $keys$$43$$;
    $event$$608_rowKeys$$1$$.indexes = $indexes$$21$$;
    $oj$$68$$.$FlattenedTreeDataGridDataSource$.$superclass$.handleEvent.call(this, "change", $event$$608_rowKeys$$1$$);
  };
  $oj$$68$$.$FlattenedTreeDataGridDataSource$.prototype.$handleMaxCountReached$ = function $$oj$$68$$$$FlattenedTreeDataGridDataSource$$$$handleMaxCountReached$$($range$$20$$, $callbacks$$51$$) {
    $callbacks$$51$$.success.call(null, new $oj$$68$$.$EmptyNodeSet$(null, $range$$20$$.start));
  };
});
