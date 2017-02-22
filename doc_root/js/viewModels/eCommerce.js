/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojinputtext', 'ojs/ojtable', 'ojs/ojarraytabledatasource'],
 function(oj, ko, $) {
  
    function DashboardViewModel() {
		
      var root = 'http://153.92.39.42:8001/lm/bealls/bySearchTerm/'

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
	   
        self.searchTerm = ko.observable("");
        
        // Create empty string for the results...
        self.results = ko.observable("");

        self.fetch = function () {

            // Get search terms and build request URL...
            var searchTerm = self.searchTerm().toString();
            console.log("searchTerm = " + searchTerm);
            var url = root + searchTerm;
            console.log("URL = " + url);

            $.getJSON(url).then(function(records){
                var tempArray = [];
                var json = records.valueOf();
                var jsonString = JSON.stringify(json)
                console.log(JSON);
                console.log(jsonString);
                
                // I'm not using this data here yet, but leaving the code for 
                // future reference...
                var items = [];
                $.each( records, function (key, value) {
                    console.log("Key = " + key + ", Value = " + value);
                    tempArray.push({
                        
                    });
                });
                self.results(jsonString);
            });

 
        
        };
        

      self.changeHandler = function(event, results){
              if(results.option === "value"){
                      console.log(results.value)
                      self.fetch();				
              };
      };     
      
      self.stocks = new oj.DataSource(self.results);
        
        
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
    return new DashboardViewModel();
  }
);
