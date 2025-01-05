import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";

async function paginar(req, res, next) {

    try {
        //Campo ordenacao = campo que será utilizado para ordenar a lista de livros (titulo, por exemplo)
        //Ordem = 1 para crescente e -1 para decrescente
        let { limite = 6, pagina = 1, ordenacao = "_id:1" } = req.query;

        let [campoOrdenacao, ordem] = ordenacao.split(":");

        limite = parseInt(limite);
        pagina = parseInt(pagina);
        ordem = parseInt(ordem);

        const resultado = req.resultado;

        if (limite > 0 && pagina > 0) {
            const resultadoPaginado = await resultado.find()
                .sort({ [campoOrdenacao]: ordem })
                .skip((pagina - 1) * limite)
                .limit(limite)
                .exec();

            res.status(200).json(resultadoPaginado);
        } else {
            next(new RequisicaoIncorreta());
        }

    } catch (error) {
        next(error);
    }

}

export default paginar;