const AWS = require('aws-sdk');

const fetchItem = async(event) => {

    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const { itemStatus } = JSON.parse(event.body);
    const { id } = event.pathParameters;

    await dynamoDB.update({
        TableName: "ItemTableNew",
        Key: { id },
        UpdateExpression: 'set itemStatus = :itemStatus',
        ExpressionAttributeValues: {
            ":itemStatus": itemStatus
        },
        ReturnValues: "ALL_NEW"
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify({
            msg: 'item updated'
        })
    }

}

module.exports = {
    handler: fetchItem
}