/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/* 
 * Your viewModel code goes here
 */

define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojinputtext', 'ojs/ojtable'], function (oj, ko) {

    function mainContentViewModel() {

        var root = 'https://wildflystocktickerservice-gse00001975.apaas.em2.oraclecloud.com/ticker-tracker/api/'

        var self = this;
        var uri = 'stocks?ticker='

        self.ticker = ko.observable("");
        self.price = ko.observable("");

        // Create empty array for the results...
        self.data = ko.observableArray([]);

        self.fetch = function () {

            // Get ticker and build request URL...
            var symbol = self.ticker().toString();
            console.log(symbol);
            var url = root + uri + symbol;

            $.ajax({
                url: url,
                method: 'GET',
                dataType: "json"
            }).success(function (records) {

                ko.utils.arrayForEach(records, function (value) {
                    console.log(value.valueOf());
                    // Fill data ko.observableArray with results
                    self.data.push({
                        symbol: value.t,
                        exchange: value.e,
                        price: value.l,
                        time: value.lt
                    });
                });
            });
        };

        self.ticker.subscribe(function (newValue) {
            console.log(newValue)
            self.fetch();
        });

        self.stocks = new oj.ArrayTableDataSource(self.data, {idAttribute: 'symbol'});
        //this.price = symbol;

    }

    return mainContentViewModel;
});
