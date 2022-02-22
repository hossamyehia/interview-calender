const username = process.env.USER;
const password = process.env.PASSWORD;
const clusterUrl = process.env.DBHOST;
const DB =process.env.DB;

const authMechanism = "DEFAULT";

const MONGOURI = `mongodb+srv://${username}:${password}@${clusterUrl}/${DB}?retryWrites=true&w=majority`;

module.exports = {
    'secretKey': process.env.SECRETKEY,
    'mongoUri' : MONGOURI,
}
