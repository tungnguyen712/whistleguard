const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand, ScanCommand, QueryCommand, GetCommand } = require("@aws-sdk/lib-dynamodb");
const { get } = require("../routes/org");

const TABLE_NAME = "organizations-dev";
const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

async function saveOrganization(org) {
    const params = {
        TableName: TABLE_NAME,
        Item: org,
    };
    try {
        console.log("DynamoDB PutCommand params:", params);
        await docClient.send(new PutCommand(params));
    } catch (error) {
        console.error("Error saving organization to DynamoDB:", error);
        throw new Error("Failed to save organization");
    }
}

// async function getOrganizationsByType(type) {
//     const params = {
//         TableName: TABLE_NAME,
//         FilterExpression: "contains(orgTypes, :type)",
//         ExpressionAttributeValues: {
//             ":type": type,
//         },
//     };
//     const data = await docClient.send(new ScanCommand(params));
//     return data.Items || [];
// }

async function getOrganizationByEmail(email) {
    try {
        const params = {
            TableName: TABLE_NAME,
            IndexName: "email-index",
            KeyConditionExpression: "email = :email",
            ExpressionAttributeValues: {
                ':email': email
            }
        };
        const result = await docClient.send(new QueryCommand(params));
        return result.Items && result.Items.length > 0 ? result.Items[0] : null;
    } catch (error) {
        console.error("DynamoDB query error:", error);
        return null;
    }
}

async function getOrganizationById(orgId) {
    const params = {
        TableName: TABLE_NAME,
        Key: { orgId }
    };
    try {
        const result = await docClient.send(new GetCommand(params));
        return result.Item || null;
    } catch (error) {
        console.error("DynamoDB getOrganizationById error:", error);
        return null;
    }
}

module.exports = {
    saveOrganization,
    getOrganizationByEmail,
    getOrganizationById
};