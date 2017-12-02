var AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-central-1"
});
const docClient = new AWS.DynamoDB.DocumentClient();

const TABLE = "lightfaden";

function setActivity(activity, target, callback) {
  params = {
    TableName: TABLE,
    Key:{
      "userId": userId
    },
    Item:{
      UpdateExpression: "set #activities= list_append(if_not_exists(#product, :emptyList), :attrValue)",
      ExpressionAttributeNames:{
        "#activities": "activities"
      },
      ExpressionAttributeValues:{
        ":attrValue": activity,
        ":emptyList": []
      },
    }
  };
  docClient.update(params, function(err, data) {
    if (err) {
        callback("Unable to add activity. Error JSON:" + JSON.stringify(err, null, 2));
    } else {
        callback(null, "Added activity:" + JSON.stringify(data, null, 2));
    }
});
}

module.exports = {
  setActivity: setActivity
}