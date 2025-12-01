const TABLA = "users";
const auth = require('../auth')

module.exports = function (dbInjected) {

let db = dbInjected;

if(!db){
    db = require("../../database/mysqlConnection");
}

    function selectAll() {
        return db.selectAll(TABLA);
    }

    function select(id) {
        return db.select(TABLA, id);
    }

    async function aggregate(body) {
        const user = {
            id: body.id,
            nombre: body.nombre,
            activo: body.activo,
        }


        const response = await db.aggregate(TABLA, user);

        var insertId = 0;
        if(body.id == 0){
            insertId = response.insertId;
        }else{
            insertId = body.id;
        }

        var responseAuth = '';

        if(body.user || body.password){
            responseAuth = await auth.aggregate({
                id: insertId,
                user: body.usuario,
                password: body.password
            })
        }

        return responseAuth;
    }

    function deletee(body) {
        return db.deletee(TABLA, body);
    }

    return {
        selectAll,
        select,
        aggregate,
        deletee,
    };
};
