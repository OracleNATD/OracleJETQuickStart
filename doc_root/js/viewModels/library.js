/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojcheckboxset', 'ojs/ojinputtext', 'ojs/ojtable', 'ojs/ojarraytabledatasource'],
        function (oj, ko, $) {

            function DashboardViewModel() {
                
                var self = this;
                
                var root = 'https://nodeapicontainer-gse00001975.apaas.em2.oraclecloud.com/instructional/instructors/disciplines/';
                
                // Switch to this URL to run through the API Platform (note, http content isn't allowed to be served in an https page). 
                // To demo this, just run this application locally
                //var root = 'http://153.92.39.42:8001/webassign/instructors/disciplines/';

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

                self.discipline = ko.observable("");

                // Create empty array for the results...
                self.data = ko.observableArray([]);
                
                // Create observable for messages
                self.message = ko.observable('');

                self.fetch = function () {

                    // Get discipline and build request URL...
                    var discipline = self.discipline().toString();
                    console.log(discipline);
                    var url = root + discipline;
                             
                    // Need to use $.ajax instead of $.json in order to set 
                    // header values required by APIPCS.
                    $.ajax({
                        url: url,
                        crossDomain: true,
                        //"headers": {
                        //    "tenant-id": "2",
                        //    "cache-control": "no-cache"
                        //},
                        type: 'GET',
                        dataType: 'json',
                        
                        //beforeSend: function(request) {
                        //    console.log(request);
                        //    request.setRequestHeader("tenant-id", "2");
                        //    console.log(request);
                        //},
                        success: function (data) {
                            console.log('success: ' + data);
                            if (data == 'Unknown discipline') {
                                console.log('no results');
                                self.data([]); // Clear the table
                                self.message("Try another discipline...");
                            } else {

                                var tempArray = [];
                                data.forEach(function (value) {
                                    console.log(value.valueOf());
                                    tempArray.push({
                                        title: value.title,
                                        authors: value.authors,
                                        publisher: value.publisher,
                                        coverImage: value.cover_image
                                    });
                                });
                                self.data(tempArray);
                                $('#table').ojTable('refresh');
                                self.message("");
                              
                            }
                        },
                        statusCode: {
                          403: function() {
                              console.log('403');
                          }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log('error:', jqXHR);
                            self.data([]); // Clear the table
                            self.message("Slow Down Cowboy!");   
                            // Maybe I can't see these errors becaose of the CORS exception. However, the CORS exception only occurs when a policy violation occurs.
                            console.log('Request Status: ' + jqXHR.status + ' Status Text: ' + textStatus + ' Error Thrown: ' + errorThrown);
                        }
                    });
                };

                self.changeHandler = function (event, data) {
                    if (data.option === "value") {
                        console.log(data.value);
                        self.fetch();
                    }
                };

                self.books = new oj.ArrayTableDataSource(self.data, {idAttribute: 'title'});
                
                self.handleActivated = function (info) {
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
                self.handleAttached = function (info) {
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
                self.handleBindingsApplied = function (info) {
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
                self.handleDetached = function (info) {
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
