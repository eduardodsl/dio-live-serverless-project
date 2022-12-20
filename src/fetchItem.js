const AWS = require('aws-sdk');

const fetchItem = async(event) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;
    let item = null;
    try {
        const result = await dynamoDB.get({
            TableName: "ItemTableNew",
            Key: { id }
        }).promise();
        item =  result.Item;
    } catch (e) {
        console.log(e);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(item)
    }

}

module.exports = {
    handler: fetchItem
};