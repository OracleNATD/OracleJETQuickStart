/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojselectcombobox', 'ojs/ojchart'],
 function(oj, ko, $) {
  
    function AboutViewModel() {
      var self = this;
      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additionaly available methods.

      /**
       * Optional ViewModel method invoked when this ViewModel is about to be
       * used for the View transition.  The application can put data fetch logic
       * here that can return a Promise which will delay the handleAttached function
       * call below until the Promise is resolved.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
       * the promise is resolved
       */
	   
	    //var root = 'http://localhost:3000';
        var root = 'https://javatwittermicroservice-gse00001975.apaas.em2.oraclecloud.com/';

        // bind observables for graph type, stack value, and orientation
        self.graphVal = ko.observableArray(["bar"]);
        self.stackValue = ko.observable('off');
        self.orientationValue = ko.observable('vertical');

        // bind dataset observables
        self.barSeriesValue = ko.observableArray();
        self.barGroupsValue = ko.observableArray();
	   
        /******************************************************************
         Callback methods
         *****************************************************************/
        this.getTimeSeriesData = function(id) {
            var url = root + '/timeseries/' + id;
			$.getJSON(url).then(function(result){
				self.barSeriesValue(result.timeSeriesData);
				self.barGroupsValue(result.timeSeriesGroups);				
			})
/*             $.ajax({
                url: url,
                method: 'GET',
                async: true
            }).success(function (result) {
                self.barSeriesValue(result.timeSeriesData);
                self.barGroupsValue(result.timeSeriesGroups);
            }); */
        }

       // get select list names/values
        self.availableDataSets = ko.observableArray();
        var url = root + '/timeseriesIndex';
			$.getJSON(url).then(function(result){
				//console.log(result.data);
				self.availableDataSets(result.data);
				// get initial dataset
				self.dataSetVal = ko.observableArray([self.availableDataSets()[0].value]);
				self.getTimeSeriesData(self.dataSetVal()[0]);				
			})
/*             $.ajax({
                url: url,
                method: 'GET',
                async: false
            }).success(function (result) {
                //console.log(result.data);
                self.availableDataSets(result.data);
            });
 */

		
        this.optionChangedHandler = function (event, data) {
          if (data.option == "value") {
            self.getTimeSeriesData(data.value[0]);
          }
        }

    
	   
      self.handleActivated = function(info) {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
       */
      self.handleAttached = function(info) {
        // Implement if needed
      };


      /**
       * Optional ViewModel method invoked after the bindings are applied on this View. 
       * If the current View is retrieved from cache, the bindings will not be re-applied
       * and this callback will not be invoked.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       */
      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      /*
       * Optional ViewModel method invoked after the View is removed from the
       * document DOM.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
       */
      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new AboutViewModel();
  }
);
