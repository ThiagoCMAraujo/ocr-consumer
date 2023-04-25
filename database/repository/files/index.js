const queryByUuid = (tableName, uuid) => ({
  TableName: tableName,
  ExpressionAttributeValues: {
    ':uuid': uuid,
  },
  ExpressionAttributeNames: {
    '#uuid': 'uuid',
  },
  KeyConditionExpression: '#uuid = :uuid',
});

module.exports = { queryByUuid };
