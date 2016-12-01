/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore", "jquery", "ojs/ojpagingtabledatasource"], function($oj$$70$$) {
  $oj$$70$$.$PagingHeaderSet$ = function $$oj$$70$$$$PagingHeaderSet$$($headerSet$$5$$, $startIndex$$30$$) {
    this.$m_headerSet$ = $headerSet$$5$$;
    this.$m_startIndex$ = $startIndex$$30$$;
  };
  $goog$exportPath_$$("PagingHeaderSet", $oj$$70$$.$PagingHeaderSet$, $oj$$70$$);
  $oj$$70$$.$PagingHeaderSet$.prototype.getData = function $$oj$$70$$$$PagingHeaderSet$$$getData$($index$$281$$, $level$$43$$) {
    return this.$m_headerSet$.getData($index$$281$$ + this.$m_startIndex$, $level$$43$$);
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingHeaderSet.prototype.getData", {getData:$oj$$70$$.$PagingHeaderSet$.prototype.getData});
  $oj$$70$$.$PagingHeaderSet$.prototype.getMetadata = function $$oj$$70$$$$PagingHeaderSet$$$getMetadata$($index$$282$$, $level$$44$$) {
    return this.$m_headerSet$.getMetadata($index$$282$$ + this.$m_startIndex$, $level$$44$$);
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingHeaderSet.prototype.getMetadata", {getMetadata:$oj$$70$$.$PagingHeaderSet$.prototype.getMetadata});
  $oj$$70$$.$PagingHeaderSet$.prototype.$getCount$ = function $$oj$$70$$$$PagingHeaderSet$$$$getCount$$() {
    return this.$m_headerSet$.$getCount$();
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingHeaderSet.prototype.getCount", {$getCount$:$oj$$70$$.$PagingHeaderSet$.prototype.$getCount$});
  $oj$$70$$.$PagingHeaderSet$.prototype.$getLevelCount$ = function $$oj$$70$$$$PagingHeaderSet$$$$getLevelCount$$() {
    return this.$m_headerSet$.$getLevelCount$();
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingHeaderSet.prototype.getLevelCount", {$getLevelCount$:$oj$$70$$.$PagingHeaderSet$.prototype.$getLevelCount$});
  $oj$$70$$.$PagingHeaderSet$.prototype.$getExtent$ = function $$oj$$70$$$$PagingHeaderSet$$$$getExtent$$($index$$283$$, $level$$45$$) {
    return this.$m_headerSet$.$getExtent$($index$$283$$ + this.$m_startIndex$, $level$$45$$);
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingHeaderSet.prototype.getExtent", {$getExtent$:$oj$$70$$.$PagingHeaderSet$.prototype.$getExtent$});
  $oj$$70$$.$PagingHeaderSet$.prototype.$getDepth$ = function $$oj$$70$$$$PagingHeaderSet$$$$getDepth$$($index$$284$$, $level$$46$$) {
    return this.$m_headerSet$.$getDepth$($index$$284$$ + this.$m_startIndex$, $level$$46$$);
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingHeaderSet.prototype.getDepth", {$getDepth$:$oj$$70$$.$PagingHeaderSet$.prototype.$getDepth$});
  $oj$$70$$.$PagingHeaderSet$.prototype.$getHeaderSet$ = function $$oj$$70$$$$PagingHeaderSet$$$$getHeaderSet$$() {
    return this.$m_headerSet$;
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingHeaderSet.prototype.getHeaderSet", {$getHeaderSet$:$oj$$70$$.$PagingHeaderSet$.prototype.$getHeaderSet$});
  $oj$$70$$.$PagingHeaderSet$.prototype.$getStartIndex$ = function $$oj$$70$$$$PagingHeaderSet$$$$getStartIndex$$() {
    return this.$m_startIndex$;
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingHeaderSet.prototype.getStartIndex", {$getStartIndex$:$oj$$70$$.$PagingHeaderSet$.prototype.$getStartIndex$});
  $oj$$70$$.$PagingDataGridDataSource$ = function $$oj$$70$$$$PagingDataGridDataSource$$($dataSource$$9$$) {
    if (!($dataSource$$9$$ instanceof $oj$$70$$.$DataGridDataSource$)) {
      throw new $oj$$70$$.$Message$("Not a datagridatasource", "Not a datagridatasource", $oj$$70$$.$Message$.$SEVERITY_LEVEL$.ERROR);
    }
    this.$dataSource$ = $dataSource$$9$$;
    this.$_startIndex$ = 0;
    this.Init();
  };
  $goog$exportPath_$$("PagingDataGridDataSource", $oj$$70$$.$PagingDataGridDataSource$, $oj$$70$$);
  $oj$$70$$.$Object$.$createSubclass$($oj$$70$$.$PagingDataGridDataSource$, $oj$$70$$.$DataGridDataSource$, "oj.PagingDataGridDataSource");
  $oj$$70$$.$PagingDataGridDataSource$.prototype.Init = function $$oj$$70$$$$PagingDataGridDataSource$$$Init$() {
    $oj$$70$$.$PagingDataGridDataSource$.$superclass$.Init.call(this);
    this.$_registerEventListeners$();
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingDataGridDataSource.prototype.Init", {Init:$oj$$70$$.$PagingDataGridDataSource$.prototype.Init});
  $oj$$70$$.$PagingDataGridDataSource$.prototype.$_registerEventListeners$ = function $$oj$$70$$$$PagingDataGridDataSource$$$$_registerEventListeners$$() {
    this.$dataSource$.on("change", this.$_handleChange$.bind(this));
  };
  $oj$$70$$.$PagingDataGridDataSource$.prototype.getPage = function $$oj$$70$$$$PagingDataGridDataSource$$$getPage$() {
    return this.$_page$;
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingDataGridDataSource.prototype.getPage", {getPage:$oj$$70$$.$PagingDataGridDataSource$.prototype.getPage});
  $oj$$70$$.$PagingDataGridDataSource$.prototype.setPage = function $$oj$$70$$$$PagingDataGridDataSource$$$setPage$($value$$292$$, $options$$365$$) {
    $options$$365$$ = $options$$365$$ || {};
    $value$$292$$ = parseInt($value$$292$$, 10);
    try {
      $oj$$70$$.$PagingDataGridDataSource$.$superclass$.handleEvent.call(this, $oj$$70$$.$PagingModel$.$EventType$.BEFOREPAGE, {page:$value$$292$$, previousPage:this.$_page$});
    } catch ($err$$29$$) {
      return Promise.reject(null);
    }
    this.$_pageSize$ = null != $options$$365$$.pageSize ? $options$$365$$.pageSize : this.$_pageSize$;
    $options$$365$$.startIndex = $value$$292$$ * this.$_pageSize$;
    var $previousPage$$3$$ = this.$_page$;
    this.$_page$ = $value$$292$$;
    this.$_startIndex$ = $options$$365$$.startIndex;
    var $self$$210$$ = this;
    return new Promise(function($resolve$$61$$, $reject$$58$$) {
      $self$$210$$.$_fetchInternal$($options$$365$$).then(function() {
        $resolve$$61$$(null);
      }, function() {
        $self$$210$$.$_page$ = $previousPage$$3$$;
        $self$$210$$.$_startIndex$ = $self$$210$$.$_page$ * $self$$210$$.$_pageSize$;
        $reject$$58$$(null);
      });
    });
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingDataGridDataSource.prototype.setPage", {setPage:$oj$$70$$.$PagingDataGridDataSource$.prototype.setPage});
  $oj$$70$$.$PagingDataGridDataSource$.prototype.$_fetchInternal$ = function $$oj$$70$$$$PagingDataGridDataSource$$$$_fetchInternal$$($options$$366$$) {
    this.$_initialized$ = !0;
    this.$_startIndex$ = $options$$366$$.startIndex;
    var $self$$211$$ = this;
    return new Promise(function($resolve$$62$$) {
      $self$$211$$.handleEvent("change", {operation:"sync", pageSize:$self$$211$$.$_pageSize$});
      $resolve$$62$$(void 0);
    });
  };
  $oj$$70$$.$PagingDataGridDataSource$.prototype.fetch = function $$oj$$70$$$$PagingDataGridDataSource$$$fetch$($options$$367$$) {
    this.$_pageSize$ = $options$$367$$.pageSize + $options$$367$$.startIndex;
    $options$$367$$.startIndex = 0;
    return this.$_fetchInternal$($options$$367$$);
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingDataGridDataSource.prototype.fetch", {fetch:$oj$$70$$.$PagingDataGridDataSource$.prototype.fetch});
  $oj$$70$$.$PagingDataGridDataSource$.prototype.getStartItemIndex = function $$oj$$70$$$$PagingDataGridDataSource$$$getStartItemIndex$() {
    return this.$_startIndex$;
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingDataGridDataSource.prototype.getStartItemIndex", {getStartItemIndex:$oj$$70$$.$PagingDataGridDataSource$.prototype.getStartItemIndex});
  $oj$$70$$.$PagingDataGridDataSource$.prototype.getEndItemIndex = function $$oj$$70$$$$PagingDataGridDataSource$$$getEndItemIndex$() {
    return this.$_endIndex$;
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingDataGridDataSource.prototype.getEndItemIndex", {getEndItemIndex:$oj$$70$$.$PagingDataGridDataSource$.prototype.getEndItemIndex});
  $oj$$70$$.$PagingDataGridDataSource$.prototype.getPageCount = function $$oj$$70$$$$PagingDataGridDataSource$$$getPageCount$() {
    var $totalSize$$5$$ = this.totalSize();
    return-1 == $totalSize$$5$$ ? -1 : Math.ceil($totalSize$$5$$ / this.$_pageSize$);
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingDataGridDataSource.prototype.getPageCount", {getPageCount:$oj$$70$$.$PagingDataGridDataSource$.prototype.getPageCount});
  $oj$$70$$.$PagingDataGridDataSource$.prototype.$_handleChange$ = function $$oj$$70$$$$PagingDataGridDataSource$$$$_handleChange$$($options$$368$$) {
    switch($options$$368$$.operation) {
      case "refresh":
        this.$_startIndex$ = 0;
        this.handleEvent("change", {operation:"sync", pageSize:this.$_pageSize$});
        this.handleEvent($oj$$70$$.$PagingTableDataSource$.$EventType$.REFRESH, null);
        break;
      case "reset":
        this.handleEvent($oj$$70$$.$PagingTableDataSource$.$EventType$.RESET, null);
        break;
      case "insert":
        this.handleEvent($oj$$70$$.$PagingTableDataSource$.$EventType$.ADD, {index:$options$$368$$.indexes.row});
        break;
      case "delete":
        this.handleEvent($oj$$70$$.$PagingTableDataSource$.$EventType$.REMOVE, null);
        break;
      case "update":
        $options$$368$$.indexes.row = 0 <= $options$$368$$.indexes.row - this.$_startIndex$ ? $options$$368$$.indexes.row - this.$_startIndex$ : -1;
        this.handleEvent("change", $options$$368$$);
        break;
      default:
        this.handleEvent("change", $options$$368$$), this.handleEvent($oj$$70$$.$PagingTableDataSource$.$EventType$.SYNC, null);
    }
  };
  $oj$$70$$.$PagingDataGridDataSource$.prototype.$getCount$ = function $$oj$$70$$$$PagingDataGridDataSource$$$$getCount$$($axis$$51$$) {
    var $count$$59$$ = this.$dataSource$.$getCount$($axis$$51$$);
    return "row" === $axis$$51$$ && 0 <= $count$$59$$ ? this.$_startIndex$ + this.$_pageSize$ < $count$$59$$ ? this.$_pageSize$ : $count$$59$$ - this.$_startIndex$ : $count$$59$$;
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingDataGridDataSource.prototype.getCount", {$getCount$:$oj$$70$$.$PagingDataGridDataSource$.prototype.$getCount$});
  $oj$$70$$.$PagingDataGridDataSource$.prototype.$getCountPrecision$ = function $$oj$$70$$$$PagingDataGridDataSource$$$$getCountPrecision$$($axis$$52$$) {
    return this.$dataSource$.$getCountPrecision$($axis$$52$$);
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingDataGridDataSource.prototype.getCountPrecision", {$getCountPrecision$:$oj$$70$$.$PagingDataGridDataSource$.prototype.$getCountPrecision$});
  $oj$$70$$.$PagingDataGridDataSource$.prototype.$fetchHeaders$ = function $$oj$$70$$$$PagingDataGridDataSource$$$$fetchHeaders$$($headerRange$$10$$, $callbacks$$52$$, $callbackObjects$$28$$) {
    var $headerSet$$6$$;
    null == this.$_initialized$ ? ($headerSet$$6$$ = new $oj$$70$$.$ArrayHeaderSet$(0, 0, $headerRange$$10$$.axis, null), null != $callbacks$$52$$ && $callbacks$$52$$.success && $callbacks$$52$$.success.call($callbackObjects$$28$$.success, $headerSet$$6$$, $headerRange$$10$$)) : "row" === $headerRange$$10$$.axis ? ($headerRange$$10$$.start += this.$_startIndex$, $headerRange$$10$$.start + $headerRange$$10$$.count > this.$_startIndex$ + this.$_pageSize$ && ($headerRange$$10$$.count = this.$_pageSize$ - 
    $headerRange$$10$$.start), this.$_pendingRowHeaderCallback$ = {callbacks:$callbacks$$52$$, callbackObjects:$callbackObjects$$28$$}, this.$dataSource$.$fetchHeaders$($headerRange$$10$$, {success:this.$_handleRowHeaderFetchSuccess$.bind(this), error:this.$_handleRowHeaderFetchError$.bind(this)}, $callbackObjects$$28$$)) : this.$dataSource$.$fetchHeaders$($headerRange$$10$$, $callbacks$$52$$, $callbackObjects$$28$$);
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingDataGridDataSource.prototype.fetchHeaders", {$fetchHeaders$:$oj$$70$$.$PagingDataGridDataSource$.prototype.$fetchHeaders$});
  $oj$$70$$.$PagingDataGridDataSource$.prototype.$_handleRowHeaderFetchSuccess$ = function $$oj$$70$$$$PagingDataGridDataSource$$$$_handleRowHeaderFetchSuccess$$($headerSet$$7$$, $headerRange$$11$$) {
    var $pagingHeaderSet$$, $callback$$127$$, $callbackObject$$;
    $headerRange$$11$$.start -= this.$_startIndex$;
    $headerRange$$11$$.count += 1;
    $pagingHeaderSet$$ = new $oj$$70$$.$PagingHeaderSet$($headerSet$$7$$, this.$_startIndex$);
    $callback$$127$$ = this.$_pendingRowHeaderCallback$.callbacks.success;
    $callbackObject$$ = this.$_pendingRowHeaderCallback$.callbackObjects.success;
    this.$_pendingRowHeaderCallback$ = null;
    $callback$$127$$.call($callbackObject$$, $pagingHeaderSet$$, $headerRange$$11$$);
  };
  $oj$$70$$.$PagingDataGridDataSource$.prototype.$_handleRowHeaderFetchError$ = function $$oj$$70$$$$PagingDataGridDataSource$$$$_handleRowHeaderFetchError$$($error$$48$$) {
    var $callback$$128$$, $callbackObject$$1$$;
    $callback$$128$$ = this.$_pendingRowHeaderCallback$.callbacks.error;
    $callbackObject$$1$$ = this.$_pendingRowHeaderCallback$.callbackObjects.error;
    this.$_pendingRowHeaderCallback$ = null;
    $callback$$128$$.call($callbackObject$$1$$, $error$$48$$);
  };
  $oj$$70$$.$PagingDataGridDataSource$.prototype.$fetchCells$ = function $$oj$$70$$$$PagingDataGridDataSource$$$$fetchCells$$($cellRanges$$9$$, $callbacks$$53$$, $callbackObjects$$29$$) {
    var $cellSet$$4_i$$452$$;
    if (null == this.$_initialized$) {
      $cellSet$$4_i$$452$$ = new $oj$$70$$.$ArrayCellSet$(0, 0, 0, 0, null), null != $callbacks$$53$$ && $callbacks$$53$$.success && $callbacks$$53$$.success.call($callbackObjects$$29$$.success, $cellSet$$4_i$$452$$, $cellRanges$$9$$);
    } else {
      for ($cellSet$$4_i$$452$$ = 0;$cellSet$$4_i$$452$$ < $cellRanges$$9$$.length;$cellSet$$4_i$$452$$ += 1) {
        "row" === $cellRanges$$9$$[$cellSet$$4_i$$452$$].axis && ($cellRanges$$9$$[$cellSet$$4_i$$452$$].start += this.$_startIndex$, $cellRanges$$9$$[$cellSet$$4_i$$452$$].start + $cellRanges$$9$$[$cellSet$$4_i$$452$$].count > this.$_startIndex$ + this.$_pageSize$ && ($cellRanges$$9$$[$cellSet$$4_i$$452$$].count = this.$_pageSize$ - $cellRanges$$9$$[$cellSet$$4_i$$452$$].start));
      }
      this.$_pendingCellCallback$ = {callbacks:$callbacks$$53$$, callbackObjects:$callbackObjects$$29$$};
      this.$dataSource$.$fetchCells$($cellRanges$$9$$, {success:this.$_handleCellsFetchSuccess$.bind(this), error:this.$_handleCellsFetchError$.bind(this)}, $callbackObjects$$29$$);
    }
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingDataGridDataSource.prototype.fetchCells", {$fetchCells$:$oj$$70$$.$PagingDataGridDataSource$.prototype.$fetchCells$});
  $oj$$70$$.$PagingDataGridDataSource$.prototype.$_handleCellsFetchSuccess$ = function $$oj$$70$$$$PagingDataGridDataSource$$$$_handleCellsFetchSuccess$$($cellSet$$5$$, $cellRanges$$10$$) {
    var $i$$453_pagedCellSet$$, $callback$$129$$, $callbackObject$$2$$;
    for ($i$$453_pagedCellSet$$ = 0;$i$$453_pagedCellSet$$ < $cellRanges$$10$$.length;$i$$453_pagedCellSet$$ += 1) {
      "row" === $cellRanges$$10$$[$i$$453_pagedCellSet$$].axis && ($cellRanges$$10$$[$i$$453_pagedCellSet$$].start -= this.$_startIndex$, $cellRanges$$10$$[$i$$453_pagedCellSet$$].count += 1);
    }
    $i$$453_pagedCellSet$$ = new $oj$$70$$.$PagingCellSet$($cellSet$$5$$, this.$_startIndex$);
    $callback$$129$$ = this.$_pendingCellCallback$.callbacks.success;
    $callbackObject$$2$$ = this.$_pendingCellCallback$.callbackObjects.success;
    this.$_pendingCellCallback$ = null;
    this.$_endIndex$ = this.$_startIndex$ + $cellSet$$5$$.$getCount$("row") - 1;
    this.handleEvent("sync", {data:Array($cellSet$$5$$.$getCount$("row")), startIndex:this.$_startIndex$});
    $callback$$129$$.call($callbackObject$$2$$, $i$$453_pagedCellSet$$, $cellRanges$$10$$);
  };
  $oj$$70$$.$PagingDataGridDataSource$.prototype.$_handleCellsFetchError$ = function $$oj$$70$$$$PagingDataGridDataSource$$$$_handleCellsFetchError$$($error$$49$$) {
    var $callback$$130$$, $callbackObject$$3$$;
    $callback$$130$$ = this.$_pendingCellCallback$.callbacks.error;
    $callbackObject$$3$$ = this.$_pendingCellCallback$.callbackObjects.error;
    this.$_pendingCellCallback$ = null;
    $callback$$130$$.call($callbackObject$$3$$, $error$$49$$);
  };
  $oj$$70$$.$PagingDataGridDataSource$.prototype.keys = function $$oj$$70$$$$PagingDataGridDataSource$$$keys$($indexes$$22$$) {
    return this.$dataSource$.keys({column:$indexes$$22$$.column, row:$indexes$$22$$.row + this.$_startIndex$});
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingDataGridDataSource.prototype.keys", {keys:$oj$$70$$.$PagingDataGridDataSource$.prototype.keys});
  $oj$$70$$.$PagingDataGridDataSource$.prototype.$indexes$ = function $$oj$$70$$$$PagingDataGridDataSource$$$$indexes$$($indexes$$23_keys$$44$$) {
    $indexes$$23_keys$$44$$ = this.$dataSource$.$indexes$($indexes$$23_keys$$44$$);
    -1 != $indexes$$23_keys$$44$$.row && ($indexes$$23_keys$$44$$.row -= this.$_startIndex$);
    return $indexes$$23_keys$$44$$;
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingDataGridDataSource.prototype.indexes", {$indexes$:$oj$$70$$.$PagingDataGridDataSource$.prototype.$indexes$});
  $oj$$70$$.$PagingDataGridDataSource$.prototype.getCapability = function $$oj$$70$$$$PagingDataGridDataSource$$$getCapability$($feature$$14$$) {
    return this.$dataSource$.getCapability($feature$$14$$);
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingDataGridDataSource.prototype.getCapability", {getCapability:$oj$$70$$.$PagingDataGridDataSource$.prototype.getCapability});
  $oj$$70$$.$PagingDataGridDataSource$.prototype.size = function $$oj$$70$$$$PagingDataGridDataSource$$$size$() {
    var $count$$60$$;
    if (null == this.$_initialized$) {
      return-1;
    }
    $count$$60$$ = this.$dataSource$.$getCount$("row");
    return this.$dataSource$.$getCount$("row") > this.$_pageSize$ ? this.$_pageSize$ : $count$$60$$;
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingDataGridDataSource.prototype.size", {size:$oj$$70$$.$PagingDataGridDataSource$.prototype.size});
  $oj$$70$$.$PagingDataGridDataSource$.prototype.sort = function $$oj$$70$$$$PagingDataGridDataSource$$$sort$($criteria$$9$$, $callbacks$$54$$, $callbackObjects$$30$$) {
    this.$dataSource$.sort($criteria$$9$$, $callbacks$$54$$, $callbackObjects$$30$$);
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingDataGridDataSource.prototype.sort", {sort:$oj$$70$$.$PagingDataGridDataSource$.prototype.sort});
  $oj$$70$$.$PagingDataGridDataSource$.prototype.totalSize = function $$oj$$70$$$$PagingDataGridDataSource$$$totalSize$() {
    return null == this.$_initialized$ ? -1 : this.$dataSource$.$getCount$("row");
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingDataGridDataSource.prototype.totalSize", {totalSize:$oj$$70$$.$PagingDataGridDataSource$.prototype.totalSize});
  $oj$$70$$.$PagingDataGridDataSource$.prototype.totalSizeConfidence = function $$oj$$70$$$$PagingDataGridDataSource$$$totalSizeConfidence$() {
    return "actual";
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingDataGridDataSource.prototype.totalSizeConfidence", {totalSizeConfidence:$oj$$70$$.$PagingDataGridDataSource$.prototype.totalSizeConfidence});
  $oj$$70$$.$PagingDataGridDataSource$.prototype.$moveOK$ = function $$oj$$70$$$$PagingDataGridDataSource$$$$moveOK$$($rowToMove$$9$$, $referenceRow$$9$$, $position$$41$$) {
    return this.$dataSource$.$moveOK$($rowToMove$$9$$, $referenceRow$$9$$, $position$$41$$);
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingDataGridDataSource.prototype.moveOK", {$moveOK$:$oj$$70$$.$PagingDataGridDataSource$.prototype.$moveOK$});
  $oj$$70$$.$PagingDataGridDataSource$.prototype.move = function $$oj$$70$$$$PagingDataGridDataSource$$$move$($moveKey$$2$$, $atKey$$2$$, $position$$42$$, $callbacks$$55$$, $callbackObjects$$31$$) {
    this.$dataSource$.move($moveKey$$2$$, $atKey$$2$$, $position$$42$$, $callbacks$$55$$, $callbackObjects$$31$$);
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingDataGridDataSource.prototype.move", {move:$oj$$70$$.$PagingDataGridDataSource$.prototype.move});
  $oj$$70$$.$PagingCellSet$ = function $$oj$$70$$$$PagingCellSet$$($cellSet$$6$$, $startIndex$$31$$) {
    this.$m_cellSet$ = $cellSet$$6$$;
    this.$m_startIndex$ = $startIndex$$31$$;
  };
  $goog$exportPath_$$("PagingCellSet", $oj$$70$$.$PagingCellSet$, $oj$$70$$);
  $oj$$70$$.$PagingCellSet$.prototype.getData = function $$oj$$70$$$$PagingCellSet$$$getData$($indexes$$24$$) {
    return this.$m_cellSet$.getData({column:$indexes$$24$$.column, row:$indexes$$24$$.row + this.$m_startIndex$});
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingCellSet.prototype.getData", {getData:$oj$$70$$.$PagingCellSet$.prototype.getData});
  $oj$$70$$.$PagingCellSet$.prototype.getMetadata = function $$oj$$70$$$$PagingCellSet$$$getMetadata$($indexes$$25$$) {
    return this.$m_cellSet$.getMetadata({column:$indexes$$25$$.column, row:$indexes$$25$$.row + this.$m_startIndex$});
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingCellSet.prototype.getMetadata", {getMetadata:$oj$$70$$.$PagingCellSet$.prototype.getMetadata});
  $oj$$70$$.$PagingCellSet$.prototype.$getCount$ = function $$oj$$70$$$$PagingCellSet$$$$getCount$$($axis$$53$$) {
    return this.$m_cellSet$.$getCount$($axis$$53$$);
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingCellSet.prototype.getCount", {$getCount$:$oj$$70$$.$PagingCellSet$.prototype.$getCount$});
  $oj$$70$$.$PagingCellSet$.prototype.$getCellSet$ = function $$oj$$70$$$$PagingCellSet$$$$getCellSet$$() {
    return this.$m_cellSet$;
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingCellSet.prototype.getCellSet", {$getCellSet$:$oj$$70$$.$PagingCellSet$.prototype.$getCellSet$});
  $oj$$70$$.$PagingCellSet$.prototype.$getStartIndex$ = function $$oj$$70$$$$PagingCellSet$$$$getStartIndex$$() {
    return this.$m_startIndex$;
  };
  $oj$$70$$.$Object$.$exportPrototypeSymbol$("PagingCellSet.prototype.getStartIndex", {$getStartIndex$:$oj$$70$$.$PagingCellSet$.prototype.$getStartIndex$});
});
