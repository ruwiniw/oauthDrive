
'use strict';
// to read the file system
const fs = require('fs');
// to read the file system
const path = require('path');
// to use the string read line
const readline = require('readline');
// to use the Google and Google Drive API
const {google} = require('googleapis');
// to use the Google OAuth API
const {authenticate} = require('@google-cloud/local-auth');

// We are using Google Drive API V3
const drive = google.drive('v3');

async function upload(fileName) {

  // This will force the Google to show Google account selector
  // so that the user can pick the correct Google Account.
  const auth = await authenticate({
    // JSON file has the verified Google Client ID, secret and the redirectUri from
    // obtained from https://console.cloud.google.com/apis/credentials
    keyfilePath: path.join(__dirname, 'oauth2.keys.json'),
    // Here we set the scope for the obtained token saying that
    // we need full file write access to the Google Drive to upload
    // the file
    scopes: 'https://www.googleapis.com/auth/drive.file',
  });

  // Passing the obtained the token to Google API
  google.options({auth});

  // Use the Drive API to create a file in the Drive
  // which is equivalent to upload a file.
  const res = await drive.files.create(
    {
      resource: {
        // Set the name of the file to upload
        'name': 'oauth.txt'
      },
      media: {
        // set the media type of the file
        mimeType: 'text/plain',
        // passing the bytestream of the new file
        body: fs.createReadStream(fileName),
      },
    },
    {
    }
  );
  // print the final output
  console.log(res.data);
  return res.data;
}

if (module === require.main) {
  const fileName = "./test_upload";
  upload(fileName).catch(console.error);
}
module.exports = upload;
