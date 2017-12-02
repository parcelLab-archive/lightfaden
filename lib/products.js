var AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-central-1"
});
const docClient = new AWS.DynamoDB.DocumentClient();

const TABLE = "lightfaden";

function addProduct(userId, name, price, peruse, callback) {
  console.log('adding ' + name + ' ' + price + ' ' + peruse + ' to ' + userId);
  var data = {
    name: name,
    price: price,
    peruse: peruse
  };
  params = {
    TableName: TABLE,
    Key:{
      "userId": userId
    },
    UpdateExpression: "set #product= list_append(if_not_exists(#product, :emptyList), :attrValue)",
    ExpressionAttributeNames:{
      "#product": "products"
    },
    ExpressionAttributeValues:{
      ":attrValue": data,
      ":emptyList": []
    },
  };
  docClient.update(params, function(err, data) {
      if (err) {
          callback("Unable to add product. Error JSON:" + JSON.stringify(err, null, 2));
      } else {
          callback(null, "Added product:" + JSON.stringify(data, null, 2));
      }
  });
}

module.exports = {
  addProduct: addProduct
}