'use strict'
const express = require("express");
const profissionaisController = require("../controllers/profissionaisController");

const router = new express.Router();

/* find all */
router.get('/', (req: any, res: any) => {
    res.status(200).send("Bem vindo a rota dialog flow");
})

router.post('/'/*, authMiddleware(roles.anunciante, roles.admin)*/, (req: any, res: any) => {
    const param = req.body.queryResult.parameters
    console.log('param', param);

    let str = JSON.stringify(param);

    console.log('str', str);

    str = str.replace('{"geo-city":"', "");
    str = str.replace('"}', "");

    console.log('str depois', str);

    let prof: any;

    console.log("antes banco");

    profissionaisController.buscaProfCidade(str).then((data: any) => {
        prof = "";

        data.json.forEach((element: any) => {
            console.log('nome', element.Nome)
            prof += element.Nome;
            prof += "\r\n";
        });
        console.log('prof: ', prof)
        const resposta = {
            "fulfillmentText": "Encontramos os seguintes profissionais na cidade de " + str + ": \r\n" + prof+
            ". \r\n Qual o nome do profissional que você deseja marcar o horário?"
        }

        res.status(200).send(JSON.stringify(resposta));
    }).catch((e: any) => {
        console.log("erro retorno banco", e);
    })

});

module.exports = router;
export { };
