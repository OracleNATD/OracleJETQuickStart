/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore", "knockout", "ojs/ojmodel"], function($oj$$74$$, $ko$$9$$) {
  $oj$$74$$.$KnockoutUtils$ = function $$oj$$74$$$$KnockoutUtils$$() {
  };
  $goog$exportPath_$$("KnockoutUtils", $oj$$74$$.$KnockoutUtils$, $oj$$74$$);
  $oj$$74$$.$KnockoutUtils$.$internalObjectProperty$ = "oj._internalObj";
  $oj$$74$$.$KnockoutUtils$.$underUpdateProp$ = "oj._underUpdate";
  $oj$$74$$.$KnockoutUtils$.$collUpdatingProp$ = "oj.collectionUpdating";
  $oj$$74$$.$KnockoutUtils$.$subscriptionProp$ = "oj.collectionSubscription";
  $oj$$74$$.$KnockoutUtils$.$updatingCollectionFunc$ = "oj.collectionUpdatingFunc";
  $oj$$74$$.$KnockoutUtils$.map = function $$oj$$74$$$$KnockoutUtils$$map$($m$$26$$, $callback$$131$$, $array$$18_data$$180_updateObservable_updateObservableArrayRemove$$) {
    function $_makeUpdateModel$$($argProp$$) {
      return function($value$$295$$) {
        $koObject$$[$oj$$74$$.$KnockoutUtils$.$underUpdateProp$] || $m$$26$$.set($argProp$$, $value$$295$$);
      };
    }
    var $koObject$$, $i$$461_prealloc_prop$$74_updateCollection_updateObservableArrayAdd$$, $converted_index$$285_updateObservableArrayReset$$, $updateModel_updateObservableArraySort$$;
    if ($m$$26$$ instanceof $oj$$74$$.$Collection$) {
      $i$$461_prealloc_prop$$74_updateCollection_updateObservableArrayAdd$$ = Array($m$$26$$.$_getLength$());
      $koObject$$ = $array$$18_data$$180_updateObservable_updateObservableArrayRemove$$ ? $ko$$9$$.observableArray($i$$461_prealloc_prop$$74_updateCollection_updateObservableArrayAdd$$) : $i$$461_prealloc_prop$$74_updateCollection_updateObservableArrayAdd$$;
      $oj$$74$$.$KnockoutUtils$.$_storeOriginalObject$($koObject$$, $m$$26$$);
      if ($array$$18_data$$180_updateObservable_updateObservableArrayRemove$$) {
        for ($i$$461_prealloc_prop$$74_updateCollection_updateObservableArrayAdd$$ = 0;$i$$461_prealloc_prop$$74_updateCollection_updateObservableArrayAdd$$ < $m$$26$$.$_modelIndices$.length;$i$$461_prealloc_prop$$74_updateCollection_updateObservableArrayAdd$$++) {
          $converted_index$$285_updateObservableArrayReset$$ = $m$$26$$.$_modelIndices$[$i$$461_prealloc_prop$$74_updateCollection_updateObservableArrayAdd$$], $koObject$$()[$converted_index$$285_updateObservableArrayReset$$] = $oj$$74$$.$KnockoutUtils$.map($m$$26$$.$_atInternal$($converted_index$$285_updateObservableArrayReset$$, null, !0, !1), $callback$$131$$);
        }
      } else {
        for ($i$$461_prealloc_prop$$74_updateCollection_updateObservableArrayAdd$$ = 0;$i$$461_prealloc_prop$$74_updateCollection_updateObservableArrayAdd$$ < $m$$26$$.$_modelIndices$.length;$i$$461_prealloc_prop$$74_updateCollection_updateObservableArrayAdd$$++) {
          $converted_index$$285_updateObservableArrayReset$$ = $m$$26$$.$_modelIndices$[$i$$461_prealloc_prop$$74_updateCollection_updateObservableArrayAdd$$], $koObject$$[$converted_index$$285_updateObservableArrayReset$$] = $oj$$74$$.$KnockoutUtils$.map($m$$26$$.$_atInternal$($converted_index$$285_updateObservableArrayReset$$, null, !0, !1), $callback$$131$$);
        }
      }
      $i$$461_prealloc_prop$$74_updateCollection_updateObservableArrayAdd$$ = function $$i$$461_prealloc_prop$$74_updateCollection_updateObservableArrayAdd$$$($changes$$7$$) {
        var $i$$462$$;
        try {
          if (!$koObject$$[$oj$$74$$.$KnockoutUtils$.$underUpdateProp$]) {
            $koObject$$[$oj$$74$$.$KnockoutUtils$.$collUpdatingProp$] = !0;
            for ($i$$462$$ = 0;$i$$462$$ < $changes$$7$$.length;$i$$462$$++) {
              var $index$$286$$ = $changes$$7$$[$i$$462$$].index, $model$$94$$ = $oj$$74$$.$KnockoutUtils$.$_getModel$($changes$$7$$[$i$$462$$].value), $status$$32$$ = $changes$$7$$[$i$$462$$].status;
              "added" === $status$$32$$ ? $index$$286$$ >= $m$$26$$.length - 1 ? $m$$26$$.add($model$$94$$) : $m$$26$$.add($model$$94$$, {at:$index$$286$$}) : "deleted" === $status$$32$$ && $m$$26$$.$_removeInternal$($model$$94$$, $index$$286$$);
            }
            $m$$26$$.comparator && ($koObject$$[$oj$$74$$.$KnockoutUtils$.$underUpdateProp$] = !0, $koObject$$.sort(function($a$$126$$, $b$$76$$) {
              return $oj$$74$$.$KnockoutUtils$.$_callSort$($a$$126$$, $b$$76$$, $m$$26$$.comparator, $m$$26$$, this);
            }), $koObject$$[$oj$$74$$.$KnockoutUtils$.$underUpdateProp$] = !1);
          }
        } catch ($e$$135$$) {
          throw $e$$135$$;
        } finally {
          $koObject$$[$oj$$74$$.$KnockoutUtils$.$collUpdatingProp$] = !1;
        }
      };
      $array$$18_data$$180_updateObservable_updateObservableArrayRemove$$ && $koObject$$.subscribe && ($koObject$$[$oj$$74$$.$KnockoutUtils$.$updatingCollectionFunc$] = $i$$461_prealloc_prop$$74_updateCollection_updateObservableArrayAdd$$, $koObject$$[$oj$$74$$.$KnockoutUtils$.$subscriptionProp$] = $koObject$$.subscribe($i$$461_prealloc_prop$$74_updateCollection_updateObservableArrayAdd$$, null, "arrayChange"));
      $array$$18_data$$180_updateObservable_updateObservableArrayRemove$$ = function $$array$$18_data$$180_updateObservable_updateObservableArrayRemove$$$($model$$95$$, $collection$$59$$, $options$$387$$) {
        var $index$$287$$;
        try {
          !$koObject$$[$oj$$74$$.$KnockoutUtils$.$collUpdatingProp$] && $collection$$59$$ instanceof $oj$$74$$.$Collection$ && ($koObject$$[$oj$$74$$.$KnockoutUtils$.$underUpdateProp$] = !0, $index$$287$$ = $options$$387$$.index, $koObject$$.splice($index$$287$$, 1));
        } catch ($e$$136$$) {
          throw $e$$136$$;
        } finally {
          $koObject$$[$oj$$74$$.$KnockoutUtils$.$underUpdateProp$] = !1;
        }
      };
      $i$$461_prealloc_prop$$74_updateCollection_updateObservableArrayAdd$$ = function $$i$$461_prealloc_prop$$74_updateCollection_updateObservableArrayAdd$$$($model$$96$$, $collection$$60$$, $options$$388$$) {
        var $index$$288$$, $newObservable$$;
        try {
          if (!$koObject$$[$oj$$74$$.$KnockoutUtils$.$collUpdatingProp$] && $collection$$60$$ instanceof $oj$$74$$.$Collection$ && ($koObject$$[$oj$$74$$.$KnockoutUtils$.$underUpdateProp$] = !0, $index$$288$$ = $collection$$60$$.$_localIndexOf$($model$$96$$), void 0 !== $index$$288$$ && -1 < $index$$288$$)) {
            if ($newObservable$$ = $oj$$74$$.$KnockoutUtils$.map($model$$96$$, $callback$$131$$), $options$$388$$.fillIn) {
              for (var $i$$463$$ = Array.isArray($koObject$$) ? $koObject$$.length : $koObject$$().length;$i$$463$$ < $index$$288$$;$i$$463$$++) {
                $koObject$$.splice($i$$463$$, 0, $oj$$74$$.$KnockoutUtils$.map($collection$$60$$.$_atInternal$($i$$463$$, null, !0, !1), $callback$$131$$));
              }
              $koObject$$.splice($index$$288$$, 1, $newObservable$$);
            } else {
              $koObject$$.splice($index$$288$$, 0, $newObservable$$);
            }
          }
        } catch ($e$$137$$) {
          throw $e$$137$$;
        } finally {
          $koObject$$[$oj$$74$$.$KnockoutUtils$.$underUpdateProp$] = !1;
        }
      };
      $converted_index$$285_updateObservableArrayReset$$ = function $$converted_index$$285_updateObservableArrayReset$$$($collection$$61$$) {
        try {
          !$koObject$$[$oj$$74$$.$KnockoutUtils$.$collUpdatingProp$] && $collection$$61$$ instanceof $oj$$74$$.$Collection$ && ($koObject$$[$oj$$74$$.$KnockoutUtils$.$underUpdateProp$] = !0, $ko$$9$$.isObservable($koObject$$) ? ($koObject$$[$oj$$74$$.$KnockoutUtils$.$subscriptionProp$] && $koObject$$[$oj$$74$$.$KnockoutUtils$.$subscriptionProp$].dispose(), $koObject$$.removeAll(), $koObject$$[$oj$$74$$.$KnockoutUtils$.$updatingCollectionFunc$] && $koObject$$.subscribe($koObject$$[$oj$$74$$.$KnockoutUtils$.$updatingCollectionFunc$], 
          null, "arrayChange")) : $koObject$$ = []);
        } catch ($e$$138$$) {
          throw $e$$138$$;
        } finally {
          $koObject$$[$oj$$74$$.$KnockoutUtils$.$underUpdateProp$] = !1;
        }
      };
      $updateModel_updateObservableArraySort$$ = function $$updateModel_updateObservableArraySort$$$($collection$$62$$) {
        try {
          !$koObject$$[$oj$$74$$.$KnockoutUtils$.$collUpdatingProp$] && $collection$$62$$ instanceof $oj$$74$$.$Collection$ && ($koObject$$[$oj$$74$$.$KnockoutUtils$.$underUpdateProp$] = !0, $koObject$$.sort(function($a$$127$$, $b$$77$$) {
            return $oj$$74$$.$KnockoutUtils$.$_callSort$($a$$127$$, $b$$77$$, $m$$26$$.comparator, $collection$$62$$, this);
          }));
        } catch ($e$$139$$) {
          throw $e$$139$$;
        } finally {
          $koObject$$[$oj$$74$$.$KnockoutUtils$.$underUpdateProp$] = !1;
        }
      };
      $m$$26$$.$OnInternal$($oj$$74$$.$Events$.$EventType$.ADD, $i$$461_prealloc_prop$$74_updateCollection_updateObservableArrayAdd$$, void 0, void 0, !0);
      $m$$26$$.$OnInternal$($oj$$74$$.$Events$.$EventType$.REMOVE, $array$$18_data$$180_updateObservable_updateObservableArrayRemove$$, void 0, void 0, !0);
      $m$$26$$.$OnInternal$($oj$$74$$.$Events$.$EventType$.RESET, $converted_index$$285_updateObservableArrayReset$$, void 0, void 0, !0);
      $m$$26$$.$OnInternal$($oj$$74$$.$Events$.$EventType$.SORT, $updateModel_updateObservableArraySort$$, void 0, void 0, !0);
    } else {
      if (void 0 === $m$$26$$) {
        return;
      }
      $koObject$$ = {};
      $array$$18_data$$180_updateObservable_updateObservableArrayRemove$$ = $m$$26$$.attributes;
      $i$$461_prealloc_prop$$74_updateCollection_updateObservableArrayAdd$$ = null;
      for ($i$$461_prealloc_prop$$74_updateCollection_updateObservableArrayAdd$$ in $array$$18_data$$180_updateObservable_updateObservableArrayRemove$$) {
        $array$$18_data$$180_updateObservable_updateObservableArrayRemove$$.hasOwnProperty($i$$461_prealloc_prop$$74_updateCollection_updateObservableArrayAdd$$) && ($converted_index$$285_updateObservableArrayReset$$ = $ko$$9$$.observable($m$$26$$.get($i$$461_prealloc_prop$$74_updateCollection_updateObservableArrayAdd$$)), $koObject$$[$i$$461_prealloc_prop$$74_updateCollection_updateObservableArrayAdd$$] = $converted_index$$285_updateObservableArrayReset$$, $updateModel_updateObservableArraySort$$ = 
        $_makeUpdateModel$$($i$$461_prealloc_prop$$74_updateCollection_updateObservableArrayAdd$$), $updateModel_updateObservableArraySort$$.$_prop$ = $i$$461_prealloc_prop$$74_updateCollection_updateObservableArrayAdd$$, $converted_index$$285_updateObservableArrayReset$$.subscribe && $converted_index$$285_updateObservableArrayReset$$.subscribe($updateModel_updateObservableArraySort$$));
      }
      $array$$18_data$$180_updateObservable_updateObservableArrayRemove$$ = function $$array$$18_data$$180_updateObservable_updateObservableArrayRemove$$$($model$$97$$) {
        var $attrs$$22$$, $prop$$75$$;
        try {
          for ($prop$$75$$ in $koObject$$[$oj$$74$$.$KnockoutUtils$.$underUpdateProp$] = !0, $attrs$$22$$ = $model$$97$$.$changedAttributes$(), $attrs$$22$$) {
            if ($attrs$$22$$.hasOwnProperty($prop$$75$$)) {
              $koObject$$[$prop$$75$$]($model$$97$$.get($prop$$75$$));
            }
          }
        } catch ($e$$140$$) {
          throw $e$$140$$;
        } finally {
          $koObject$$[$oj$$74$$.$KnockoutUtils$.$underUpdateProp$] = !1;
        }
      };
      $m$$26$$.$OnInternal$($oj$$74$$.$Events$.$EventType$.CHANGE, $array$$18_data$$180_updateObservable_updateObservableArrayRemove$$, void 0, void 0, !0);
      $oj$$74$$.$KnockoutUtils$.$_storeOriginalObject$($koObject$$, $m$$26$$);
      $callback$$131$$ && $callback$$131$$($koObject$$);
    }
    return $koObject$$;
  };
  $goog$exportPath_$$("KnockoutUtils.map", $oj$$74$$.$KnockoutUtils$.map, $oj$$74$$);
  $oj$$74$$.$KnockoutUtils$.$_getModel$ = function $$oj$$74$$$$KnockoutUtils$$$_getModel$$($val$$80$$) {
    return $val$$80$$ instanceof $oj$$74$$.$Model$ ? $val$$80$$ : $val$$80$$.hasOwnProperty($oj$$74$$.$KnockoutUtils$.$internalObjectProperty$) ? $val$$80$$[$oj$$74$$.$KnockoutUtils$.$internalObjectProperty$] : $val$$80$$;
  };
  $oj$$74$$.$KnockoutUtils$.$_callSort$ = function $$oj$$74$$$$KnockoutUtils$$$_callSort$$($a$$128$$, $b$$78$$, $comparator$$16$$, $collection$$63$$, $caller$$8$$) {
    return $oj$$74$$.$Collection$.$SortFunc$($oj$$74$$.$KnockoutUtils$.$_getModel$($a$$128$$), $oj$$74$$.$KnockoutUtils$.$_getModel$($b$$78$$), $comparator$$16$$, $collection$$63$$, $caller$$8$$);
  };
  $oj$$74$$.$KnockoutUtils$.$_storeOriginalObject$ = function $$oj$$74$$$$KnockoutUtils$$$_storeOriginalObject$$($object$$6$$, $value$$296$$) {
    Object.defineProperty($object$$6$$, $oj$$74$$.$KnockoutUtils$.$internalObjectProperty$, {value:$value$$296$$, enumerable:!1});
  };
});
