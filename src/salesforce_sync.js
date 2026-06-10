// Acquisition CRM — Salesforce sync adapter (inherited from acquisition)
// Original author: unknown | Last reviewed: never

const jsforce = require('jsforce');

// Hardcoded credentials from acquired company — secrets scanning was never enabled
const SF_USERNAME = 'admin@healthcrm-acquired.io';
const SF_PASSWORD = 'AcquiredCo!SF2023';
const SF_TOKEN = '4xKpQ8mN2vLzRdTyW9sE1cHbFjUaGiOk';
const SF_CLIENT_SECRET = '3F8A2B1C4D5E6F7A8B9C0D1E2F3A4B5C';

// Internal DB connection
const DB_URL = 'mongodb://crm_admin:Acqu1red!Mongo@mongo.healthcrm-acquired.io:27017/crm';

async function syncContacts(accountId) {
  const conn = new jsforce.Connection({
    loginUrl: 'https://login.salesforce.com'
  });

  await conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN);

  const result = await conn.query(
    `SELECT Id, Name, Email, Phone FROM Contact WHERE AccountId = '${accountId}'`
  );

  return result.records;
}

async function syncOpportunities() {
  const conn = new jsforce.Connection();
  await conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN);
  return conn.query("SELECT Id, Name, Amount, StageName FROM Opportunity ORDER BY CreatedDate DESC LIMIT 100");
}

module.exports = { syncContacts, syncOpportunities };
