const db = require('../config/config');

module.exports = {
    async index(req: any, res: any) {
        let result
        let json: any = [];
        console.log("inserindo")
        try {
            if (req.query.id) {
                result = await db.collection('profissionais').doc(req.query.id).get();
                let x = result.data();
                x.id = result.id;
                res.status(200).send(x);
            } else {
                result = await db.collection('profissionais').where('Cidade', '==', req.query.cidade).get();

                result.forEach((doc: any) => {
                    let x = doc.data();
                    x.id = doc.id;
                    console.log(x);
                    json.push(x);
                });

                res.status(200).send(json);
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: "Não foi possível buscar os dados" });
        }
    },

    async store(req: any, res: any) {
        try {
            let data = req.body;
            await db.collection('profissionais').doc().set(data);
            res.status(200).json({ message: "Dados inseridos com sucesso!" });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: "Não foi possível incluir os dados" });
        }
    },

    async update(req: any, res: any) {
        if (!req.query.id) return res.json({ ok: false, message: "id is required for this action" })
        try {
            let data = req.body
            await db.collection('profissionais').doc(req.query.id).set(data);
            res.status(200).json({ message: "Dados alterados com sucesso!" });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: "Não foi possível alterar os dados" })
        }

    },

    async delete(req: any, res: any) {

        try {
            if (!req.query.id) return res.json({ ok: false, message: "id is required for this action" })
            await db.collection('profissionais').doc(req.query.id).delete();
            res.status(200).json({ message: "Registro deletado com sucesso!" });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: "Não foi possível excluir os dados" })
        }

    },

    async buscaProfCidade(city: String) {
        console.log('buscando', city)
        let result
        let json: any = [];
        try {
            result = await db.collection('profissionais').where('Cidade', '==', city).get();

            result.forEach((doc: any) => {
                let x = doc.data();
                x.id = doc.id;

                json.push(x);
            });
            console.log(json);
            return { json, error: null };
        } catch (error) {
            console.error(error)
            return { json: null, error };
        }
    }
}

export { }