
con = require("../config/db.js").pool;
const candidaturaController = require("../controller/candidaturaController.js");

    const candidaturaRoutes = {
        candidatura: (req, res) => {
            var id_vaga = req.params.id;
            candidaturaController.candidatar(req, res, id_vaga)
        },

        confirmarCandidatura: (req, res) => {
            var id_vaga = req.params.idvaga;
            var id_candidato = req.params.idusuario;
            candidaturaController.confirmaCandidatura(req, res, id_vaga, id_candidato, "em andamento");
        },

        listarCandidaturas: (req, res) => {
            var id_vaga = req.params.idvaga;
            candidaturaController.listarCandidatura(req, res, id_vaga);
        },

        cancelarCandidatura: (req, res) => {
            var id_candidatura = req.params.id;
            var id_vaga = req.params.idvaga;
            candidaturaController.cancelarCandidatura(req, res, id_candidatura, id_vaga);
        },

        excluirCandidatura: (req, res) => {
            var id_candidatura = req.params.id;
            candidaturaController.excluirCandidatura(req, res, id_candidatura);
        }
    }

module.exports = candidaturaRoutes;