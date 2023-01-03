con = require("../config/db.js").pool;
const candidaturaController = require("../controller/candidaturaController.js")
    const candidaturaRoutes = {
        candidatura: (req, res) => {
            var id_vaga = req.params.id;
            candidaturaController.candidatar(req, res, id_vaga)
        },

        confirmarCandidatura: (req, res) => {
            var id_vaga = req.params.idvaga;
            var id_candidato = req.params.idusuario;
            candidaturaController.confirmaCandidatura(req, res, id_vaga, id_candidato, "em andamento");
        }
    }

module.exports = candidaturaRoutes;