const AWS = require('aws-sdk');

const fetchItems = async(event) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    let items = null;
    try {
        const results = await dynamoDB.scan({
            TableName: "ItemTableNew",
        }).promise();
        items =  results.Items;
    } catch (e) {
        console.log(e);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(items)
    }

}

module.exports = {
    handler: fetchItems
};