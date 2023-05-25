const { Pool } = require('pg');


const pool = new Pool({
    user: 'postgres',
    host: 'cositamiaapi.c64q2jpilfie.us-east-2.rds.amazonaws.com',
    database: 'MediComBD',
    password: 'ClaveRDS#1',
    port: 5432,
});


const getUsuarios = async (req, res) => {
    const consulta = `select * from usuarios`;
    try {
        const response = await pool.query(consulta);
        console.log(response.rows);
        res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
    }
}

const NewUsuario = async (req, res) => {
    const {usuario, contraseña, rol} = req.body;
    const consulta = `insert into usuarios (usuario, contraseña, rol) values ('${usuario}', '${contraseña}', '${rol}')`;

    try {
        const response = await pool.query(consulta);
        console.log(response.rows);
        res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
    }
}


module.exports = {
    getUsuarios,
    NewUsuario
}