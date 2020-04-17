'use strict'

import * as functions from 'firebase-functions';
const express = require("express");

const dialogFlowRoute = require('./routes/dialogFlowRoute');
const profissionaisRoute = require('./routes/profissionaisRoute');

const app = express();

app.use((req: any, res: any, next: any) => { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", req.headers.origin ? req.headers.origin : '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Id, filetype, Authorization, codigoImovel, nome");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.get("/", (req: any, res: any) => {
    console.log("index")
    res.status(200).send("Bem vindo a API de envio de WHATSAPP");
});


app.use('/dialogFlow', dialogFlowRoute);
app.use('/profissionais', profissionaisRoute);

exports.teste_twilio = functions.https.onRequest(app);