const bcrypt = require('bcrypt');
const auth = require('../../authentication');
const TABLA = "auth";


module.exports = function (dbInjected) {

let db = dbInjected;

if(!db){
    db = require("../../database/mysqlConnection");
}

    // function selectAll() {
    //     return db.selectAll(TABLA);
    // }

    // function select(id) {
    //     return db.select(TABLA, id);
    // }

    async function aggregate(data) {
        const authData = {
            id: data.id
        }

        if(data.user){
            authData.user = data.user
        }

        if(data.password){
            authData.password = await bcrypt.hash(data.password.toString(), 5)
        }

        return db.aggregate(TABLA, authData);
    }

    async function login(user, password){
        const data = await db.query(TABLA, {user: user});

        return bcrypt.compare(password, data.password)
        .then(result => {
            if(result ===true){
                return auth.assignToken({...data})
            }else{
                throw new Error('Información Inválida');
            }
        })
    }
    // function deletee(body) {
    //     return db.deletee(TABLA, body);
    // }

    return {
        // selectAll,
        // select,
        aggregate,
        login,
        // deletee,
    };
};
