"use strict";
exports.__esModule = true;
var users_1 = require("./users");
var jwt = require("jsonwebtoken");
var api_config_1 = require("./api.config");
exports.handleAuthentication = function (req, resp) {
    var user = req.body;
    if (isValid(user)) {
        var dbUser = users_1.users[user.email];
        var token = jwt.sign({ sub: dbUser.email, iss: 'meat-api-password' }, api_config_1.apiConfig.secret); // gerando um token de acesso
        resp.json({ name: dbUser.name, email: dbUser.email, perfil: dbUser.perfil, accessToken: token });
    }
    else {
        resp.status(403).json({ mensagem: 'Dados inválidos.' });
    }
};
function isValid(user) {
    if (!user) {
        return false;
    }
    var dbUser = users_1.users[user.email];
    return dbUser !== undefined && dbUser.matches(user);
}
