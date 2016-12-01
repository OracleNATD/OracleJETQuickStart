/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore", "knockout", "promise"], function($oj$$23$$, $ko$$4$$) {
  $oj$$23$$.$ModuleBinding$ = {};
  $oj$$23$$.$ModuleBinding$.$defaults$ = {viewPath:"text!views/", viewSuffix:".html", modelPath:"viewModels/", initializeMethod:"initialize", disposeMethod:"dispose", activatedHandler:"handleActivated", attachedHandler:"handleAttached", detachedHandler:"handleDetached", bindingsAppliedHandler:"handleBindingsApplied", deactivatedHandler:"handleDeactivated", transitionCompletedHandler:"handleTransitionCompleted"};
  $goog$exportPath_$$("ModuleBinding.defaults", $oj$$23$$.$ModuleBinding$.$defaults$, $oj$$23$$);
  (function() {
    function $_animate$$($actx$$, $animation$$, $element$$113$$, $oldDomNodes$$, $insertAndActivateFunc$$, $removeOldDomNodes$$, $transitionComplete$$) {
      var $canAnimateFunc_settings$$4$$ = $animation$$.canAnimate;
      if (null == $canAnimateFunc_settings$$4$$ || $canAnimateFunc_settings$$4$$.call($animation$$, $actx$$)) {
        var $newViewParent$$, $oldViewParent$$;
        if ($canAnimateFunc_settings$$4$$ = $animation$$.prepareAnimation.call($animation$$, $actx$$)) {
          $newViewParent$$ = $canAnimateFunc_settings$$4$$.newViewParent, $oldViewParent$$ = $canAnimateFunc_settings$$4$$.oldViewParent;
        }
        var $targetElement$$ = $newViewParent$$ || $element$$113$$;
        $oldViewParent$$ && $oldViewParent$$ !== $element$$113$$ ? $_moveDomNodes$$($oldDomNodes$$, $oldViewParent$$) : $targetElement$$ === $element$$113$$ && $removeOldDomNodes$$(null);
        $targetElement$$ !== $element$$113$$ && $ko$$4$$.virtualElements.setDomNodeChildren($targetElement$$, []);
        $insertAndActivateFunc$$($targetElement$$);
        var $newDomNodes$$ = Array.prototype.slice.call($targetElement$$.childNodes), $viewInserted$$ = !1, $insertNewView$$ = function $$insertNewView$$$() {
          $viewInserted$$ || ($viewInserted$$ = !0, $element$$113$$ !== $targetElement$$ && $_insertNodes$$($element$$113$$, $newDomNodes$$));
        }, $removeOldView$$ = $removeOldDomNodes$$.bind(null, $oldViewParent$$);
        $actx$$.newViewParent = $newViewParent$$;
        $actx$$.oldViewParent = $oldViewParent$$;
        $actx$$.oldViewNodes = $oldDomNodes$$;
        $actx$$.removeOldView = $removeOldView$$;
        $actx$$.insertNewView = $insertNewView$$;
        var $postAnimation$$ = function $$postAnimation$$$() {
          $removeOldView$$();
          $insertNewView$$();
          $transitionComplete$$();
        };
        return $animation$$.animate.call($animation$$, $actx$$).then($postAnimation$$, function() {
          $postAnimation$$();
          $oj$$23$$.$Logger$.error("ojModule animation promise was rejected");
        });
      }
    }
    function $_detachOldView$$($element$$114$$, $oldViewParent$$1$$, $cacheHolder$$) {
      $oldViewParent$$1$$ = $oldViewParent$$1$$ || $element$$114$$;
      var $empty$$2$$ = [];
      $cacheHolder$$ && $element$$114$$ === $oldViewParent$$1$$ && ($cacheHolder$$.parentNode.removeChild($cacheHolder$$), $empty$$2$$.push($cacheHolder$$));
      $ko$$4$$.virtualElements.setDomNodeChildren($oldViewParent$$1$$, $empty$$2$$);
    }
    function $_moveDomNodes$$($nodes$$, $target$$87$$) {
      $nodes$$.forEach(function($n$$22$$) {
        $target$$87$$.appendChild($n$$22$$);
      });
    }
    function $_invokeLifecycleListener$$($listener$$36$$, $method$$7$$, $params$$23$$) {
      if ($listener$$36$$ && $listener$$36$$[$method$$7$$]) {
        var $data$$138$$ = {element:$params$$23$$[0], valueAccessor:$params$$23$$[1]};
        2 < $params$$23$$.length && ($data$$138$$.viewModel = $params$$23$$[2], 3 < $params$$23$$.length && ($data$$138$$["boolean" === typeof $params$$23$$[3] ? "fromCache" : "cachedNodes"] = $params$$23$$[3]));
        return $ko$$4$$.ignoreDependencies($listener$$36$$[$method$$7$$], $listener$$36$$, [$data$$138$$]);
      }
    }
    function $_invokeViewModelMethod$$($model$$58$$, $handler$$49_key$$129_name$$110$$, $params$$24$$) {
      if (null != $model$$58$$ && ($handler$$49_key$$129_name$$110$$ = $oj$$23$$.$ModuleBinding$.$defaults$[$handler$$49_key$$129_name$$110$$], null != $handler$$49_key$$129_name$$110$$ && $model$$58$$ && ($handler$$49_key$$129_name$$110$$ = $model$$58$$[$handler$$49_key$$129_name$$110$$], "function" === typeof $handler$$49_key$$129_name$$110$$))) {
        var $data$$139$$ = void 0;
        $params$$24$$ && ($data$$139$$ = {element:$params$$24$$[0], valueAccessor:$params$$24$$[1]}, 2 < $params$$24$$.length && ($data$$139$$["boolean" === typeof $params$$24$$[2] ? "fromCache" : "cachedNodes"] = $params$$24$$[2]));
        return $ko$$4$$.ignoreDependencies($handler$$49_key$$129_name$$110$$, $model$$58$$, [$data$$139$$]);
      }
    }
    function $_getContainedNodes$$($container$$25_node$$79$$, $cacheHolder$$1$$, $endCommentNode$$) {
      var $childList$$ = [];
      for ($container$$25_node$$79$$ = $ko$$4$$.virtualElements.firstChild($container$$25_node$$79$$);null != $container$$25_node$$79$$ && $container$$25_node$$79$$ != $endCommentNode$$;$container$$25_node$$79$$ = $container$$25_node$$79$$.nextSibling) {
        $container$$25_node$$79$$ != $cacheHolder$$1$$ && $childList$$.push($container$$25_node$$79$$);
      }
      return $childList$$;
    }
    function $_getKoNodes$$($container$$26$$, $cacheHolder$$2$$) {
      var $nodes$$1$$ = [], $firstChild$$2$$ = $ko$$4$$.virtualElements.firstChild($container$$26$$);
      $_koNodesForEach$$($firstChild$$2$$, $cacheHolder$$2$$, function($node$$80$$) {
        $nodes$$1$$.push($node$$80$$);
      });
      return $nodes$$1$$;
    }
    function $_koNodesForEach$$($first$$6_node$$81$$, $cacheHolder$$3$$, $callback$$101$$) {
      for (;null != $first$$6_node$$81$$;) {
        var $next$$6$$ = $ko$$4$$.virtualElements.nextSibling($first$$6_node$$81$$), $type$$86$$ = $first$$6_node$$81$$.nodeType;
        $first$$6_node$$81$$ === $cacheHolder$$3$$ || 1 !== $type$$86$$ && 8 !== $type$$86$$ || $callback$$101$$($first$$6_node$$81$$);
        $first$$6_node$$81$$ = $next$$6$$;
      }
    }
    function $_insertNodes$$($container$$27$$, $nodes$$2$$) {
      for (var $i$$304$$ = $nodes$$2$$.length - 1;0 <= $i$$304$$;$i$$304$$--) {
        $ko$$4$$.virtualElements.prepend($container$$27$$, $nodes$$2$$[$i$$304$$]);
      }
    }
    function $_propagateSubtreeVisibilityToComponents$$($nodeArray$$, $visible$$) {
      if (null != $oj$$23$$.Components) {
        for (var $i$$305$$ = 0;$i$$305$$ < $nodeArray$$.length;$i$$305$$++) {
          $visible$$ ? $oj$$23$$.Components.$subtreeShown$($nodeArray$$[$i$$305$$]) : $oj$$23$$.Components.$subtreeHidden$($nodeArray$$[$i$$305$$]);
        }
      }
    }
    function $_getDomNodes$$($content$$22$$) {
      if ("string" === typeof $content$$22$$) {
        $content$$22$$ = $ko$$4$$.utils.parseHtmlFragment($content$$22$$);
      } else {
        if (window.DocumentFragment ? $content$$22$$ instanceof DocumentFragment : $content$$22$$ && 11 === $content$$22$$.nodeType) {
          $content$$22$$ = $ko$$4$$.utils.arrayPushAll([], $content$$22$$.childNodes);
        } else {
          if (Array.isArray($content$$22$$)) {
            $content$$22$$ = $ko$$4$$.utils.arrayPushAll([], $content$$22$$);
          } else {
            throw "The View (" + $content$$22$$ + ") has an unsupported type";
          }
        }
      }
      return $content$$22$$;
    }
    function $_getRequirePromise$$($module$$1$$) {
      return new Promise(function($resolve$$33$$) {
        require([$module$$1$$], function($loaded$$) {
          $resolve$$33$$($loaded$$);
        }, function() {
          throw Error("ojModule failed to load " + $module$$1$$);
        });
      });
    }
    function $_createNoFailPromise$$($promise$$5$$) {
      return $promise$$5$$ ? new Promise(function($resolve$$34$$) {
        $promise$$5$$.then($resolve$$34$$, $resolve$$34$$);
      }) : $promise$$5$$;
    }
    $ko$$4$$.bindingHandlers.ojModule = {init:function $$ko$$4$$$bindingHandlers$ojModule$init$($element$$115$$, $valueAccessor$$20$$, $allBindingsAccessor$$15$$, $viewModel$$4$$, $bindingContext$$35$$) {
      function $checkPeningId$$($id$$30$$) {
        if ($id$$30$$ != $pendingViewId$$) {
          throw Error("Promise cancelled because ojModule is fetching new View and ViewModel");
        }
      }
      function $invokeModelDispose$$($model$$59$$) {
        $_invokeViewModelMethod$$($model$$59$$, "disposeMethod", [$element$$115$$, $valueAccessor$$20$$]);
      }
      var $currentViewModel$$, $currentAnimationPromise$$, $cache$$ = {}, $currentCacheKey$$, $pendingViewId$$ = -1, $cacheHolder$$4$$, $endCommentNode$$1$$;
      $ko$$4$$.utils.domNodeDisposal.addDisposeCallback($element$$115$$, function() {
        $invokeModelDispose$$($currentViewModel$$);
        for (var $keys$$34$$ = Object.keys($cache$$), $i$$306$$ = 0;$i$$306$$ < $keys$$34$$.length;$i$$306$$++) {
          $invokeModelDispose$$($cache$$[$keys$$34$$[$i$$306$$]].$model$);
        }
      });
      8 === $element$$115$$.nodeType && ($ko$$4$$.virtualElements.setDomNodeChildren($element$$115$$, []), $endCommentNode$$1$$ = $element$$115$$.nextSibling);
      $ko$$4$$.computed(function() {
        $pendingViewId$$++;
        var $isInitial$$1$$ = 0 === $pendingViewId$$, $attachPromise_unwrap$$ = $ko$$4$$.utils.unwrapObservable, $value$$249$$ = $attachPromise_unwrap$$($valueAccessor$$20$$()), $moduleName$$, $viewName$$, $params$$25$$, $modelFactory$$, $viewFunction$$, $cacheKey$$, $lifecycleListener$$, $animation$$1$$;
        "string" === typeof $value$$249$$ ? $moduleName$$ = $value$$249$$ : ($moduleName$$ = $attachPromise_unwrap$$($value$$249$$.name), $viewName$$ = $attachPromise_unwrap$$($value$$249$$.viewName), $params$$25$$ = $attachPromise_unwrap$$($value$$249$$.params), $modelFactory$$ = $attachPromise_unwrap$$($value$$249$$.viewModelFactory), $viewFunction$$ = $attachPromise_unwrap$$($value$$249$$.createViewFunction), $cacheKey$$ = $attachPromise_unwrap$$($value$$249$$.cacheKey), $lifecycleListener$$ = 
        $attachPromise_unwrap$$($value$$249$$.lifecycleListener), $animation$$1$$ = $attachPromise_unwrap$$($value$$249$$.animation));
        var $attachPromise_unwrap$$ = $_invokeLifecycleListener$$($lifecycleListener$$, "activated", [$element$$115$$, $valueAccessor$$20$$]), $viewPromise$$, $modelPromise$$, $cached$$ = null == $cacheKey$$ ? null : $cache$$[$cacheKey$$];
        if (null != $cached$$) {
          delete $cache$$[$cacheKey$$], $viewPromise$$ = Promise.resolve($cached$$.view), $modelPromise$$ = Promise.resolve($cached$$.$model$);
        } else {
          if (null != $modelFactory$$ && ($modelPromise$$ = $ko$$4$$.ignoreDependencies($modelFactory$$.createViewModel, $modelFactory$$, [$params$$25$$, $valueAccessor$$20$$])), null == $modelPromise$$ && null != $moduleName$$ && ($modelPromise$$ = $_getRequirePromise$$($oj$$23$$.$ModuleBinding$.$defaults$.modelPath + $moduleName$$)), null != $modelPromise$$ && ($modelPromise$$ = $modelPromise$$.then(function($id$$31$$, $viewModel$$5$$) {
            $checkPeningId$$($id$$31$$);
            return $viewModel$$5$$ = "function" === typeof $viewModel$$5$$ ? new $viewModel$$5$$($params$$25$$) : $_invokeViewModelMethod$$($viewModel$$5$$, "initializeMethod", [$element$$115$$, $valueAccessor$$20$$]) || $viewModel$$5$$;
          }.bind(null, $pendingViewId$$)), null != $viewFunction$$ && ($viewPromise$$ = $modelPromise$$.then(function($id$$32$$, $model$$61$$) {
            $checkPeningId$$($id$$32$$);
            if (null == $model$$61$$) {
              throw "createViewFunction option cannot be used when the ViewModel is null";
            }
            var $viewMethod$$ = $model$$61$$[$viewFunction$$];
            if (null == $viewMethod$$) {
              throw "function specified by the createViewFunction option was not found on the ViewModel";
            }
            return $viewMethod$$.call($model$$61$$);
          }.bind(null, $pendingViewId$$)))), null == $viewPromise$$) {
            if ($viewName$$ = null == $viewName$$ ? $moduleName$$ : $viewName$$, null != $viewName$$) {
              $viewPromise$$ = $_getRequirePromise$$($oj$$23$$.$ModuleBinding$.$defaults$.viewPath + $viewName$$ + $oj$$23$$.$ModuleBinding$.$defaults$.viewSuffix);
            } else {
              throw Error("View name must be specified");
            }
          }
        }
        if (null == $viewPromise$$) {
          throw Error("ojModule is missing a View");
        }
        var $modelAttachPromise$$;
        null != $modelPromise$$ && ($modelAttachPromise$$ = $modelPromise$$.then(function($id$$33$$, $viewModel$$6$$) {
          $checkPeningId$$($id$$33$$);
          return $_invokeViewModelMethod$$($viewModel$$6$$, "activatedHandler", [$element$$115$$, $valueAccessor$$20$$]);
        }.bind(null, $pendingViewId$$)));
        Promise.all([$viewPromise$$, $modelPromise$$, $attachPromise_unwrap$$, $modelAttachPromise$$, $currentAnimationPromise$$]).then(function($id$$34$$, $values$$12$$) {
          if ($id$$34$$ == $pendingViewId$$) {
            var $removeOldDomNodes$$1_view$$3$$ = $values$$12$$[0];
            if (null == $removeOldDomNodes$$1_view$$3$$) {
              throw "The module's View was resolved to null";
            }
            var $nodes$$3$$ = $_getDomNodes$$($removeOldDomNodes$$1_view$$3$$), $model$$62$$ = $values$$12$$[1], $saveInCache$$ = !1, $cachedNodeArray$$, $oldDomNodes$$1$$ = $_getContainedNodes$$($element$$115$$, $cacheHolder$$4$$, $endCommentNode$$1$$), $oldKoNodes$$ = $_getKoNodes$$($element$$115$$, $cacheHolder$$4$$);
            null != $currentCacheKey$$ && ($saveInCache$$ = !0, $cachedNodeArray$$ = $oldDomNodes$$1$$, $cacheHolder$$4$$ || ($cacheHolder$$4$$ = document.createElement("div"), $cacheHolder$$4$$.className = "oj-helper-module-cache", $ko$$4$$.virtualElements.prepend($element$$115$$, $cacheHolder$$4$$)));
            var $oldNodesRemoved$$ = !1, $removeOldDomNodes$$1_view$$3$$ = function $$removeOldDomNodes$$1_view$$3$$$($oldViewParent$$2$$) {
              $oldNodesRemoved$$ || ($oldNodesRemoved$$ = !0, $saveInCache$$ ? $_moveDomNodes$$($oldDomNodes$$1$$, $cacheHolder$$4$$) : $oldKoNodes$$.forEach(function($n$$23$$) {
                $ko$$4$$.cleanNode($n$$23$$);
              }), $_detachOldView$$($element$$115$$, $oldViewParent$$2$$ || $element$$115$$, $cacheHolder$$4$$), $isInitial$$1$$ || ($_invokeLifecycleListener$$($lifecycleListener$$, "detached", [$element$$115$$, $valueAccessor$$20$$, $currentViewModel$$, $cachedNodeArray$$]), $_invokeViewModelMethod$$($currentViewModel$$, "detachedHandler", [$element$$115$$, $valueAccessor$$20$$, $cachedNodeArray$$]), $_invokeLifecycleListener$$($lifecycleListener$$, "deactivated", [$element$$115$$, $valueAccessor$$20$$, 
              $currentViewModel$$]), $_invokeViewModelMethod$$($currentViewModel$$, "deactivatedHandler", [$element$$115$$, $valueAccessor$$20$$])), $saveInCache$$ ? ($_propagateSubtreeVisibilityToComponents$$($cachedNodeArray$$, !1), $cache$$[$currentCacheKey$$] = {$model$:$currentViewModel$$, view:$cachedNodeArray$$}) : $invokeModelDispose$$($currentViewModel$$), $currentViewModel$$ = $model$$62$$, $currentCacheKey$$ = $cacheKey$$);
            }, $insertAndActivateNewNodes$$ = function $$insertAndActivateNewNodes$$$($targetElement$$1$$) {
              $targetElement$$1$$ = $targetElement$$1$$ || $element$$115$$;
              $_insertNodes$$($targetElement$$1$$, $nodes$$3$$);
              var $fromCache$$ = null != $cached$$;
              $fromCache$$ && $_propagateSubtreeVisibilityToComponents$$($nodes$$3$$, !0);
              $_invokeLifecycleListener$$($lifecycleListener$$, "attached", [$targetElement$$1$$, $valueAccessor$$20$$, $model$$62$$, $fromCache$$]);
              $_invokeViewModelMethod$$($model$$62$$, "attachedHandler", [$targetElement$$1$$, $valueAccessor$$20$$, $fromCache$$]);
              if (!$fromCache$$) {
                var $childBindingContext$$ = $bindingContext$$35$$.createChildContext($model$$62$$, void 0, function($ctx$$3$$) {
                  $ctx$$3$$.$module = $model$$62$$;
                  $ctx$$3$$.$params = $params$$25$$;
                });
                $_koNodesForEach$$($nodes$$3$$[0], $cacheHolder$$4$$, function($node$$83$$) {
                  $ko$$4$$.applyBindings($childBindingContext$$, $node$$83$$);
                });
                $_invokeLifecycleListener$$($lifecycleListener$$, "bindingsApplied", [$targetElement$$1$$, $valueAccessor$$20$$, $model$$62$$]);
                $_invokeViewModelMethod$$($model$$62$$, "bindingsAppliedHandler", [$targetElement$$1$$, $valueAccessor$$20$$]);
              }
            }, $transitionComplete$$1$$ = function $$transitionComplete$$1$$$() {
              $_invokeLifecycleListener$$($lifecycleListener$$, "transitionCompleted", [$element$$115$$, $valueAccessor$$20$$, $model$$62$$]);
              $_invokeViewModelMethod$$($model$$62$$, "transitionCompletedHandler", [$element$$115$$, $valueAccessor$$20$$]);
            };
            if (null != $animation$$1$$) {
              var $promise$$6$$ = $_animate$$({node:$element$$115$$, valueAccessor:$valueAccessor$$20$$, isInitial:$isInitial$$1$$, oldViewModel:$currentViewModel$$, newViewModel:$model$$62$$}, $animation$$1$$, $element$$115$$, $oldDomNodes$$1$$, $insertAndActivateNewNodes$$, $removeOldDomNodes$$1_view$$3$$, $transitionComplete$$1$$);
              $currentAnimationPromise$$ = $_createNoFailPromise$$($promise$$6$$);
            } else {
              $currentAnimationPromise$$ = void 0;
            }
            $currentAnimationPromise$$ || ($removeOldDomNodes$$1_view$$3$$(null), $insertAndActivateNewNodes$$(null), $transitionComplete$$1$$());
          }
        }.bind(null, $pendingViewId$$), function($id$$35$$, $reason$$7$$) {
          $id$$35$$ == $pendingViewId$$ && null != $reason$$7$$ && $oj$$23$$.$Logger$.error($reason$$7$$);
        }.bind(null, $pendingViewId$$));
      }, null, {disposeWhenNodeIsRemoved:$element$$115$$});
      return{controlsDescendantBindings:!0};
    }};
    $ko$$4$$.virtualElements.allowedBindings.ojModule = !0;
  })();
});
