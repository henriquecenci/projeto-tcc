con = require("../config/db.js").pool;

    const vagaRoutes = {
        anunciarVaga: (req, res) => {
            if(req.session.loggedin)
                res.render('anunciarVaga.ejs', {logado: req.session.userdata});
            else
                res.redirect('/login');
        }
    }

module.exports = vagaRoutes;