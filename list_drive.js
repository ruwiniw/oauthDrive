'use strict';

// to read the file system
const path = require('path');
// to use the Google and Google Drive API
const {google} = require('googleapis');
// to use the Google OAuth API
const {authenticate} = require('@google-cloud/local-auth');

// We are using Google Drive API V3
const drive = google.drive('v3');

async function showList(query) {

  // This will force the Google to show Google account selector
  // so that the user can pick the correct Google Account.
  const auth = await authenticate({
    // JSON file has the verified Google Client ID, secret and the redirectUri from
    // obtained from https://console.cloud.google.com/apis/credentials
    keyfilePath: path.join(__dirname, 'oauth2.keys.json'),
    // Here we set the scope for the obtained token saying that
    // we only need to access Google Drive on read only mode
    scopes: 'https://www.googleapis.com/auth/drive.metadata.readonly',
  });

  // Passing the obtained the token to Google API
  google.options({auth});

  // Set the number of items we need to see from the Drive
  const params = {pageSize: 20};
  params.q = query;
  // use the async call to get the list of the drive
  const file_list = await drive.files.list(params);
  // print the results on the console
  console.log(file_list.data);
  return file_list.data;
}

if (module === require.main) {
  showList().catch(console.error);
}
module.exports = showList;
