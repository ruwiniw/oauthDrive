This code uses Google Drive v3 API and Node JS.

Change the directory to the root folder and then run the following commands

```
npm install
```

```
npm install googleapis
```

The above commands will make sure all the required dependencies are properly installed.

There are two functionalities provided in this project.

1. Upload "test_upload" file in this root folder to the drive of the authenticated google drive.
2. List all the files in the authenticated google drive.

## Running the code

To upload the file run

```
node upload_file.js
```

To list files in the google drive

```
node list_drive.js
```

In both cases, the results will be printed on the console.
