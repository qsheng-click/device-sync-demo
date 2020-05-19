var AWS = require('aws-sdk');
var fs = require('fs');

AWS.config.update({
  region: 'eu-west-2',
  endpoint: 'http://localhost:8000',
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log('Importing data into DynamoDB. Please wait.');

var items = JSON.parse(fs.readFileSync('data.json', 'utf8'));

items.forEach(function (item) {
  console.log(item);

  var params = {
    TableName: 'ct152',
    Item: {
      userId: item.userId,
      entity: item.entity,
      data: item.data,
      version: item.version
    },
  };

  docClient.put(params, function (err, data) {
    if (err) {
      console.error(
        'Unable to add item',
        item.entity,
        '. Error JSON:',
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log('PutItem succeeded:', item.entity);
    }
  });
});
