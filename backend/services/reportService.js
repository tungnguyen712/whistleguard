const { PutCommand, GetCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb');
const docClient = require('../utils/dynamoClient');
const TABLE_NAME = process.env.REPORTS_TABLE;

// async function createReport(data) {
//     const { token, title, description, category } = data;
//     const params = {
//         TableName: TABLE_NAME,
//         Item: {
//             token,
//             title,
//             description,
//             category,
//             status: 'received',
//             createdAt: new Date().toISOString(),
//         },
//     }

//     console.log("Saved report:", params.Item);

//     try {
//         await docClient.send(new PutCommand(params));
//     } catch (error) {
//         console.error('Error creating report:', error);
//         throw new Error('Could not create report');
//     }
// }

async function createStub(token, fileKey) {
    const params = {
        TableName: TABLE_NAME,
        Item: {
            token,
            fileKey,
            status: 'uploading',
            createdAt: new Date().toISOString(),
        },
        ConditionExpression: 'attribute_not_exists(#token)',
        ExpressionAttributeNames: {'#token':'token'}
    }
    try {
        await docClient.send(new PutCommand(params));
    } catch (error) {
        console.error('Error creating stub:', error);
        throw new Error('Could not create stub');
    }
    
}

async function updateReport(token, title, description, category) {
    const params = {
        TableName: TABLE_NAME,
        Key: { token },
        UpdateExpression: 'SET #title = :title, #description = :description, #category = :category, #status = :status',
        ExpressionAttributeNames: {
            "#title": 'title',
            "#description": 'description',
            "#category": 'category',
            "#status": 'status',
            "#token": 'token',
        },
        ExpressionAttributeValues: {
            ":title": title,
            ":description": description,
            ":category": category,
            ":status": 'received',
        },
        ConditionExpression: 'attribute_exists(#token)',
    }

    try {
        await docClient.send(new UpdateCommand(params));
    } catch (error) {
        console.error('Error updating report:', error);
        throw new Error('Could not update report');
    }
}


async function getReportByToken(token) {
    const params = {
        TableName: TABLE_NAME,
        Key: { token },
    }

    console.log("Looking for token:", token, "in table:", process.env.REPORTS_TABLE);

    try {
        const data = await docClient.send(new GetCommand(params));
        return data.Item;
    } catch (error) {
        console.error('Error fetching report:', error);
        throw new Error('Could not fetch report');
    }
}

module.exports = {
    createStub,
    updateReport,
    getReportByToken,
}