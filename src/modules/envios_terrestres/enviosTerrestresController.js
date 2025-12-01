const TABLA = "envios_terrestres";

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

    function aggregate(body) {
        return db.aggregate(TABLA, body);
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
