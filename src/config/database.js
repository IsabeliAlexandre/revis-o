import 'dotenv/config';
import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host:process.env.BD_HOST || 'localhost',
    user:process.env.BD_USER || 'root',
    password:process.env.BD_PASSWORD !== undefined ? process.env.BD_PASSWORD : '1234',
    database:process.env.BD_NAME || 'oficina_db',
    port:process.env.BD_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0

});

async function testConn(params) {
    try {
        const conn = await pool.getConnection();
        console.log('Conexão com o banco de dados estabelecida com sucesso');
        conn.release();

    } catch (error) {
        console.error('Falha ao se conectar com o banco de dados', error.message);
    }
}

testConn();

export default pool;    