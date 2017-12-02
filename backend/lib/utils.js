var AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-central-1"
});
const docClient = new AWS.DynamoDB.DocumentClient();

const TABLE = 'lightfaden';

function createUser(userId, callback) {
  var params = {
      TableName: TABLE,
      Key:{
        "userId": userId
      }
  };

  docClient.get(params, function(err, data) {
    if (err) callback("Unable to get user. Error JSON:" + JSON.stringify(err, null, 2));
    else {
      if (JSON.stringify(data) === '{}' ) addUser(userId, callback);
      else {
        callback(null, "UserId already exists");
      }
    }
  });
}

function addUser(userId, callback) {
  console.log("Adding a new user...");
  params = {
    TableName: TABLE,
    Item:{
      "userId": userId
    }
  };
  docClient.put(params, function(err, data) {
      if (err) {
          callback("Unable to add user. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          callback(null, "Added user:", JSON.stringify(data, null, 2));
      }
  });
}

module.exports = {
  createUser: createUser
};
