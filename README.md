This project demonstrates an issue with the Strapi GraphQL API when attempting to fetch relational models that have been deleted.

First, run a local PostgreSQL database. Here's an example using Docker:

    docker run -d --name postgres -v db:/var/lib/postgresql/data -e POSTGRES_PASSWORD=password -p 5432:5432 postgres:13.1

Set up the DB and schema like so:

    # Create the database
    CREATE DATABASE content;
    \connect content;
    
    # Create the schema
    CREATE SCHEMA strapi_graphql_issue;
    GRANT USAGE, CREATE ON SCHEMA strapi_graphql_issue TO postgres;

Install dependencies:

    npm install

Run Strapi:

    npm run develop

Within Strapi, create two new **Header Nav** content types and save.

Create a **Header Widget** and choose the created header navs in the `Navs` field. Save and publish.

Create an API user and configure permissions to be able to call the GraphQL API. Obtain an access token from the Strapi auth endpoint.

Call the GraphQL API to fetch the data:

    POST http://localhost:1337/graphql
    query {
        headerWidgets {
            Navs {
                Nav {
                    id
                    Name
                }
            }
        }
    }

The response contains both Navs with the correct information:

    {
        "data": {
            "headerWidgets": [
                {
                    "Navs": [
                        {
                            "Nav": {
                                "id": "1",
                                "Name": "First"
                            }
                        },
                        {
                            "Nav": {
                                "id": "2",
                                "Name": "Second"
                            }
                        }
                    ]
                }
            ]
        }
    }

Now delete one of the **Header Nav** content types and retry the request. Response:

    {
        "errors": [
            {
                "message": "select \"header_navs\".* from \"header_navs\" where \"header_navs\".\"id\" = $1 limit $2 - invalid input syntax for type integer: \"{}\"",
                "locations": [
                    {
                        "line": 4,
                        "column": 13
                    }
                ],
                "path": [
                    "headerWidgets",
                    0,
                    "Navs",
                    0,
                    "Nav"
                ],
                "extensions": {
                    "code": "INTERNAL_SERVER_ERROR",
                    "exception": {
                        "length": 103,
                        "name": "error",
                        "severity": "ERROR",
                        "code": "22P02",
                        "file": "numutils.c",
                        "line": "323",
                        "routine": "pg_strtoint32",
                        "stacktrace": [
                            "error: select \"header_navs\".* from \"header_navs\" where \"header_navs\".\"id\" = $1 limit $2 - invalid input syntax for type integer: \"{}\"",
                            "    at Parser.parseErrorMessage (/Users/tt438837/Desktop/strapi-graphql-issue/node_modules/pg-protocol/dist/parser.js:287:98)",
                            "    at Parser.handlePacket (/Users/tt438837/Desktop/strapi-graphql-issue/node_modules/pg-protocol/dist/parser.js:126:29)",
                            "    at Parser.parse (/Users/tt438837/Desktop/strapi-graphql-issue/node_modules/pg-protocol/dist/parser.js:39:38)",
                            "    at Socket.<anonymous> (/Users/tt438837/Desktop/strapi-graphql-issue/node_modules/pg-protocol/dist/index.js:11:42)",
                            "    at Socket.emit (events.js:376:20)",
                            "    at addChunk (internal/streams/readable.js:309:12)",
                            "    at readableAddChunk (internal/streams/readable.js:284:9)",
                            "    at Socket.Readable.push (internal/streams/readable.js:223:10)",
                            "    at TCP.onStreamRead (internal/stream_base_commons.js:188:23)",
                            "From previous event:",
                            "    at processImmediate (internal/timers.js:462:21)",
                            "From previous event:",
                            "    at Sync.<anonymous> (/Users/tt438837/Desktop/strapi-graphql-issue/node_modules/bookshelf/lib/sync.js:204:8)",
                            "From previous event:",
                            "    at Child.<anonymous> (/Users/tt438837/Desktop/strapi-graphql-issue/node_modules/bookshelf/lib/collection.js:160:12)",
                            "From previous event:",
                            "    at Child.fetchAll (/Users/tt438837/Desktop/strapi-graphql-issue/node_modules/bookshelf/lib/model.js:878:10)",
                            "    at find (/Users/tt438837/Desktop/strapi-graphql-issue/node_modules/strapi-connector-bookshelf/lib/queries.js:81:8)",
                            "    at Object.findOne (/Users/tt438837/Desktop/strapi-graphql-issue/node_modules/strapi-connector-bookshelf/lib/queries.js:68:27)",
                            "    at fn (/Users/tt438837/Desktop/strapi-graphql-issue/node_modules/strapi-database/lib/queries/helpers.js:31:54)",
                            "    at Object.findOne (/Users/tt438837/Desktop/strapi-graphql-issue/node_modules/strapi-database/lib/queries/helpers.js:15:24)",
                            "    at processTicksAndRejections (internal/process/task_queues.js:95:5)",
                            "    at async Promise.all (index 1)"
                        ]
                    }
                }
            },
            {
                "message": "select \"header_navs\".* from \"header_navs\" where \"header_navs\".\"id\" = $1 limit $2 - invalid input syntax for type integer: \"{}\"",
                "locations": [
                    {
                        "line": 4,
                        "column": 13
                    }
                ],
                "path": [
                    "headerWidgets",
                    0,
                    "Navs",
                    1,
                    "Nav"
                ],
                "extensions": {
                    "code": "INTERNAL_SERVER_ERROR",
                    "exception": {
                        "length": 103,
                        "name": "error",
                        "severity": "ERROR",
                        "code": "22P02",
                        "file": "numutils.c",
                        "line": "323",
                        "routine": "pg_strtoint32",
                        "stacktrace": [
                            "error: select \"header_navs\".* from \"header_navs\" where \"header_navs\".\"id\" = $1 limit $2 - invalid input syntax for type integer: \"{}\"",
                            "    at Parser.parseErrorMessage (/Users/tt438837/Desktop/strapi-graphql-issue/node_modules/pg-protocol/dist/parser.js:287:98)",
                            "    at Parser.handlePacket (/Users/tt438837/Desktop/strapi-graphql-issue/node_modules/pg-protocol/dist/parser.js:126:29)",
                            "    at Parser.parse (/Users/tt438837/Desktop/strapi-graphql-issue/node_modules/pg-protocol/dist/parser.js:39:38)",
                            "    at Socket.<anonymous> (/Users/tt438837/Desktop/strapi-graphql-issue/node_modules/pg-protocol/dist/index.js:11:42)",
                            "    at Socket.emit (events.js:376:20)",
                            "    at addChunk (internal/streams/readable.js:309:12)",
                            "    at readableAddChunk (internal/streams/readable.js:284:9)",
                            "    at Socket.Readable.push (internal/streams/readable.js:223:10)",
                            "    at TCP.onStreamRead (internal/stream_base_commons.js:188:23)",
                            "From previous event:",
                            "    at processImmediate (internal/timers.js:462:21)",
                            "From previous event:",
                            "    at Sync.<anonymous> (/Users/tt438837/Desktop/strapi-graphql-issue/node_modules/bookshelf/lib/sync.js:204:8)",
                            "From previous event:",
                            "    at Child.<anonymous> (/Users/tt438837/Desktop/strapi-graphql-issue/node_modules/bookshelf/lib/collection.js:160:12)",
                            "From previous event:",
                            "    at Child.fetchAll (/Users/tt438837/Desktop/strapi-graphql-issue/node_modules/bookshelf/lib/model.js:878:10)",
                            "    at find (/Users/tt438837/Desktop/strapi-graphql-issue/node_modules/strapi-connector-bookshelf/lib/queries.js:81:8)",
                            "    at Object.findOne (/Users/tt438837/Desktop/strapi-graphql-issue/node_modules/strapi-connector-bookshelf/lib/queries.js:68:27)",
                            "    at fn (/Users/tt438837/Desktop/strapi-graphql-issue/node_modules/strapi-database/lib/queries/helpers.js:31:54)",
                            "    at Object.findOne (/Users/tt438837/Desktop/strapi-graphql-issue/node_modules/strapi-database/lib/queries/helpers.js:15:24)",
                            "    at processTicksAndRejections (internal/process/task_queues.js:95:5)",
                            "    at async Promise.all (index 1)"
                        ]
                    }
                }
            }
        ],
        "data": {
            "headerWidgets": [
                {
                    "Navs": [
                        {
                            "Nav": null
                        },
                        {
                            "Nav": null
                        }
                    ]
                }
            ]
        }
    }


**Expected:** The response includes the `Navs` that still exist, and does not throw an error.

**Actual:** The response does not include any `Navs`.