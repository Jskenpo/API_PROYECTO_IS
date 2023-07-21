const { Pool } = require('pg');
const {generateRSAKeys, encryptMessage, decryptMessage} = require('../Security.js');


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'ClavePOST#1',
    database: 'Cositamia',
    port: 5432,
});


const getUsuarios = async (req, res) => {
    const consulta = `select * from users`;
  
    try {
      const response = await pool.query(consulta);
  
      // Desencriptamos las contraseñas usando la clave privada
      const p = 61; // Este valor debe ser el mismo que se usó para generar las claves RSA
      const q = 53; // Este valor debe ser el mismo que se usó para generar las claves RSA
      const { privateKey } = generateRSAKeys(p, q);
      const usuarios = response.rows.map((usuario) => {
        const { id_user, username, password, id_role } = usuario;
        return {
          id_user,
          username,
          password: decryptMessage(privateKey, password),
          id_role,
        };
      });
  
      console.log(usuarios);
      res.status(200).json(usuarios);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  };
  

const NewUsuario = async (req, res) => {
    const { username, password, id_role } = req.body;
    
    // Generamos las claves RSA (asumiendo que p y q son números primos grandes)
    const p = 61;
    const q = 53;
    const { publicKey } = generateRSAKeys(p, q);
  
    try {
      // Encriptamos la contraseña usando la clave pública
      const encryptedPass = encryptMessage(publicKey, password);
  
      const consulta = `insert into users (username, password, id_role) values ('${username}', '${encryptedPass}', '${id_role}')`;
      const response = await pool.query(consulta);
      
      console.log(response.rows);
      res.status(200).json(response.rows);
    } catch (e) {
      console.log(e);
      console.log(encryptedPass);
      res.status(500).json({ error: 'Error en el servidor' });
    }

  };

module.exports = {
    getUsuarios,
    NewUsuario
}