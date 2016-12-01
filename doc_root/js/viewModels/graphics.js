define(['ojs/ojcore', 'knockout', 'ojs/ojtable'], function(oj, ko) {

  function mainContentViewModel() {

     // change this root variable to point to YOUR environment
    var root = 'https://javatwittermicroservice-gse00001975.apaas.em2.oraclecloud.com/';

    var self = this;
    var uri = 'tweets/';
    var recordCount = '25';

    // strip the href description from the tweet
    var prettySource = function(source) {
      return source.substring(source.indexOf('>') + 1, source.lastIndexOf('<'));
    };

    var url = root + uri + recordCount;

    self.items = ko.observableArray([]);
    self.tweets = new oj.ArrayTableDataSource(self.items, {
      idAttribute: 'Id'
    });

    $.ajax({
      url: url,
      method: 'GET'
    }).success(function(result) {
      console.log(result.tweets);
      var items = self.items();
      ko.utils.arrayForEach(result.tweets, function(value) {
        // make sure this is a creation tweet
        if (!!value.user) {
          items.push({
            Id: value.id,
            Location: value.user.location,
            Text: value.text,
            Source: prettySource(value.source),
            User: value.user.name
          });
        }
      });
      self.items.valueHasMutated();
    });
  }
  return mainContentViewModel;
});
