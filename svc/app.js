var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var AWS = require('aws-sdk');
var moment = require('moment');
const { v4: uuidv4 } = require('uuid');

var app = express();

app.listen(3000, () => console.log('API listening on port 3000!'));

AWS.config.update({
  region: 'eu-west-2',
  endpoint: 'http://localhost:8000',
});

var docClient = new AWS.DynamoDB.DocumentClient();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.send({ title: 'API Entry Point' });
});

app.get('/schedule', function (req, res) {
  // var userID = parseInt(req.url.slice(6));
  const userID = req.query.userId
  console.log(req.url);
  console.log(userID);

  var params = {
    TableName: 'ct152',
    KeyConditionExpression: '#userId = :id and #entity = :entity',
    ExpressionAttributeNames: {
      '#userId': 'userId',
      '#entity': 'entity'
    },
    ExpressionAttributeValues: {
      ':id': userID,
      ':entity': 'Schedule'
    },
  };

  docClient.query(params, function (err, data) {
    if (err) {
      console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
    } else {
      console.log('Query succeeded.');
      res.send(data.Items);
      data.Items.forEach(function (item) {
        console.log(item.userId, item.entity);
      });
    }
  });
});

app.get('/settings', function (req, res) {
  // var userID = parseInt(req.url.slice(6));
  const userID = req.query.userId
  console.log(req.url);
  console.log(userID);

  var params = {
    TableName: 'ct152',
    KeyConditionExpression: '#userId = :id and #entity = :entity',
    ExpressionAttributeNames: {
      '#userId': 'userId',
      '#entity': 'entity'
    },
    ExpressionAttributeValues: {
      ':id': userID,
      ':entity': 'Settings'
    },
  };

  docClient.query(params, function (err, data) {
    if (err) {
      console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
    } else {
      console.log('Query succeeded.');
      res.send(data.Items);
      data.Items.forEach(function (item) {
        console.log(item.userId, item.entity);
      });
    }
  });
});

app.get('/sessionType', function (req, res) {
  // var userID = parseInt(req.url.slice(6));
  const userID = req.query.userId
  console.log(req.url);
  console.log(userID);

  var params = {
    TableName: 'ct152',
    KeyConditionExpression: '#userId = :id and #entity = :entity',
    ExpressionAttributeNames: {
      '#userId': 'userId',
      '#entity': 'entity'
    },
    ExpressionAttributeValues: {
      ':id': userID,
      ':entity': 'SessionType'
    },
  };

  docClient.query(params, function (err, data) {
    if (err) {
      console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
    } else {
      console.log('Query succeeded.');
      res.send(data.Items);
      data.Items.forEach(function (item) {
        console.log(item.userId, item.entity);
      });
    }
  });
});

app.post('/sessionType', function (req, res) {
  // var userID = parseInt(req.url.slice(6));
  const userID = req.query.userId
  console.log(req.url);
  console.log(userID);
  const val = { 'SessionType': 'SHAM' };
  const t = moment.utc().toISOString();

  var params = {
    TableName: 'ct152',
    Key:{
      "userId": '1',
      "entity": 'SessionType'
    },
    UpdateExpression: 'set version = :v',
    ExpressionAttributeValues:{
      ':v': t
    },
    ReturnValues:"UPDATED_NEW"
  };

  docClient.update(params, function (err, data) {
    if (err) {
      console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
    } else {
      console.log('Query succeeded.');
      // res.send(data.Items);
      // data.Items.forEach(function (item) {
      //   console.log(item.userId, item.entity);
      // });
    }
  });
});

app.get('/exercises', function (req, res) {
  // var userID = parseInt(req.url.slice(6));
  const userID = req.query.userId
  console.log(req.url);
  console.log(userID);

  var params = {
    TableName: 'ct152',
    KeyConditionExpression: '#userId = :id and begins_with(#entity, :entity)',
    ExpressionAttributeNames: {
      '#userId': 'userId',
      '#entity': 'entity'
    },
    ExpressionAttributeValues: {
      ':id': userID,
      ':entity': 'Exercise'
    },
  };

  docClient.query(params, function (err, data) {
    if (err) {
      console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
    } else {
      console.log('Query succeeded.');
      res.send(data.Items);
      data.Items.forEach(function (item) {
        console.log(item.userId, item.entity);
      });
    }
  });
});

app.post('/exercises', function (req, res) {
  // var userID = parseInt(req.url.slice(6));
  // const userID = req.query.userId
  console.log(req.url);
  // console.log(userID);
  const t = moment.utc().toISOString();
  const id = 'Exercise#' + uuidv4();

  var params = {
    TableName: 'ct152',
    Item: {
      // data: {
      //   createdAt: '2020-05-10T03:59:56+0000',
      //   score: 18,
      //   startTime: '2020-05-10T03:59:56+0000',
      //   endTime: '2020-05-10T04:59:56+0000',
      //   roundId: 2,
      //   seqId: 1,
      //   n: 2,
      //   stageId: 1,
      // },
      userId: '1',
      version: t,
      entity: id,
    }
  };

  docClient.put(params, function (err, data) {
    if (err) {
      console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
    } else {
      console.log('Query succeeded.');
    }
  });
});

app.get('/lessons', function (req, res) {
  // var userID = parseInt(req.url.slice(6));
  const userID = req.query.userId
  console.log(req.url);
  console.log(userID);

  var params = {
    TableName: 'ct152',
    KeyConditionExpression: '#userId = :id and begins_with(#entity, :entity)',
    ExpressionAttributeNames: {
      '#userId': 'userId',
      '#entity': 'entity'
    },
    ExpressionAttributeValues: {
      ':id': userID,
      ':entity': 'Lesson'
    },
  };

  docClient.query(params, function (err, data) {
    if (err) {
      console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
    } else {
      console.log('Query succeeded.');
      res.send(data.Items);
      data.Items.forEach(function (item) {
        console.log(item.userId, item.entity);
      });
    }
  });
});


app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
