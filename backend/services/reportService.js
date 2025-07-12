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
        Key: { token},
        UpdateExpression: 'SET #status = :status, #createdAt = if_not_exists(#createdAt, :createdAt), #files = list_append(if_not_exists(#files, :emptyList), :fileKey)',
        ExpressionAttributeNames: {
            '#status': 'status',
            '#createdAt': 'createdAt',
            '#files': 'files',
        },
        ExpressionAttributeValues: {
            ':status': 'Uploading',
            ':createdAt': new Date().toISOString(),
            ':fileKey': [fileKey],
            ':emptyList': [],
        }
    }
    try {
        await docClient.send(new UpdateCommand(params));
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
            ":status": 'Received',
        },
        ConditionExpression: 'attribute_exists(#token)',
    }
    console.log("Updating report with params:", params);

    try {
        await docClient.send(new UpdateCommand(params));
    } catch (error) {
        if (error.name === 'ConditionalCheckFailedException') {
            // Fallback: create the item if it doesn't exist
            const putParams = {
                TableName: TABLE_NAME,
                Item: {
                    token,
                    title,
                    description,
                    category,
                    status: 'Received',
                    createdAt: new Date().toISOString(),
                },
            };
        console.error('Error updating report:', error);
        throw new Error('Could not update report');
        }
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
        if (!data.Item) {
            console.error('Report not found for token:', token);
            throw new Error('Report not found');
        }

        const { title, description, category, status, createdAt } = data.Item;

        return  {
            title,
            description,
            category,
            status,
            createdAt
        }

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