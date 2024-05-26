# file-bucket-service
Project Flow Diagram
+------------------+         +-----------------------+         +-----------------+
|   Client         |         |       API Server      |         |   MongoDB       |
| (Postman/Browser)|         |    (Express.js)       |         |  (Mongoose)     |
+------------------+         +-----------------------+         +-----------------+
        |                            |                              |
        |      Create Bucket         |                              |
        +--------------------------> |   POST /buckets              |
        |                            |  (Creates a new bucket)      |
        |                            |                              |
        |                            |   Save bucket to DB          |
        |                            |----------------------------> |
        |                            |                              |
        |                            |                              |
        |    List Buckets            |                              |
        +--------------------------> |   GET /buckets               |
        |                            |  (Lists all buckets)         |
        |                            |                              |
        |                            |   Retrieve buckets from DB   |
        |                            |<---------------------------- |
        |                            |                              |
        |                            |                              |
        |     Upload File            |                              |
        +--------------------------> |   POST /files                |
        |                            |  (Uploads a file to a bucket)|
        |                            |                              |
        |                            |   Save file details to DB    |
        |                            |----------------------------> |
        |                            |                              |
        |                            |                              |
        |      List Files            |                              |
        +--------------------------> |   GET /files/bucket/:bucketId|
        |                            |  (Lists files in a bucket)   |
        |                            |                              |
        |                            |   Retrieve files from DB     |
        |                            |<---------------------------- |
        |                            |                              |
        |                            |                              |
        |     Get File               |                              |
        +--------------------------> |   GET /files/:id             |
        |                            |  (Streams the file)          |
        |                            |                              |
        |                            |   Retrieve file details from DB|
        |                            |<---------------------------- |
        |                            |                              |
        |                            |   Stream file                |
        |                            |<---------------------------- |
        |                            |                              |
        +------------------+         +-----------------------+         +-----------------+


Project Structure

file-bucket-service/
├── models/
│   ├── bucket.js
│   └── file.js
├── uploads/
├── server.js
├── package.json
└── README.md
