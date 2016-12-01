/**
 *
 Performance content module
 *
 */
define(['ojs/ojcore' ,'knockout', 'ojs/ojselectcombobox', 'ojs/ojchart'
   ], function(oj, ko) {

   /**
    * The view model for the main content view template
    */
    function mainContentViewModel() {
        var self = this;
        //var root = 'http://localhost:3000';
        var root = 'https://javatwittermicroservice-gse00001975.apaas.em2.oraclecloud.com/';

        /******************************************************************
         Callback methods
         *****************************************************************/
        this.getTimeSeriesData = function(id) {
            var url = root + '/timeseries/' + id;
            $.ajax({
                url: url,
                method: 'GET',
                async: true
            }).success(function (result) {
                self.barSeriesValue(result.timeSeriesData);
                self.barGroupsValue(result.timeSeriesGroups);
            });
        }

        this.optionChangedHandler = function (event, data) {
          if (data.option == "value") {
            self.getTimeSeriesData(data.value[0]);
          }
        }

        /******************************************************************
         Main Body
         *****************************************************************/

        // get select list names/values
        self.availableDataSets = ko.observableArray();
        var url = root + '/timeseriesIndex';
            $.ajax({
                url: url,
                method: 'GET',
                async: false
            }).success(function (result) {
                //console.log(result.data);
                self.availableDataSets(result.data);
            });

        // get initial dataset
        self.dataSetVal = ko.observableArray([self.availableDataSets()[0].value]);
        self.getTimeSeriesData(self.dataSetVal()[0]);

        // bind observables for graph type, stack value, and orientation
        self.graphVal = ko.observableArray(["bar"]);
        self.stackValue = ko.observable('off');
        self.orientationValue = ko.observable('vertical');

        // bind dataset observables
        self.barSeriesValue = ko.observableArray();
        self.barGroupsValue = ko.observableArray();
    }

   return mainContentViewModel;
});
