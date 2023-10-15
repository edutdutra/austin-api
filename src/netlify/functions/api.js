// const app = require("../../index");
// const serverless = require('serverless-http');
//
//
// export const handler = serverless(app)


// YOUR_BASE_DIRECTORY/netlify/functions/api.ts
const express = require('express');
const serverless = require('serverless-http');

const api = express();

api.get("/hello", (req, res) => res.send("Hello World!"));

export const handler = serverless(api);
