import pool from '../config/database.js';

class AgendamentoController {

    async listar(req, res) {
        const { termo } = req.query;
        try {
            let clientes;
            if (termo && termo.trim() != '') {
                // termo = paulo
                const busca = `%${termo.trim()}%`
                const [rows] = await pool.query(
                    `SELECT * FROM clientes WHERE nome LIKE ? OR email LIKE ? ORDER BY id DESC`,
                    [busca, busca]
                );
                clientes = rows

            } else {
                const [rows] = await pool.query(
                    `SELECT * FROM clientes ORDER BY id DESC`
                );
                clientes = rows;
            }

            return res.json(clientes);
        } catch (error) {
            console.error('Ocorreu um erro', error);
            return res.status(500).json(
                {
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                })
        }
    }

    async criar(req, res) {
        const {data_agendamento, descricao_servico, veiculo_id, status} = req.body

        if (!data_agendamento || !descricao_servico || !veiculo_id || !status) {
            return res.status(400).json({ message: 'Verifique os dados enviados' })
        }
        try {
            const [rows] = await pool.query(
                `INSERT INTO agendamentos (data_agendamento, descricao_servico, veiculo_id, status) VALUES (?,?,?,?)`,
                [data_agendamento, descricao_servico, veiculo_id, status]
            );
            res.status(201).json({ message: 'Registro criado com sucesso', id: rows.insertId })

        } catch (error) {
            console.error('Ocorreu um erro', error);
            return res.status(500).json(
                {
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                })
        }
    }

    async editar(req, res) {
        const { id } = req.params;
        const { nome, cpf, telefone, email } = req.body;

        if (!id || !nome || !cpf || !telefone || !email) {
            return res.status(400).json({ message: 'Verifique os dados enviados' });
        }

        try {
            const cpfCriptografado = cryptoService.encrypt(cpf);
            const [result] = await pool.query(
                `UPDATE clientes SET nome = ?, cpf = ?, telefone = ?, email = ? WHERE id = ?`,
                [nome, cpfCriptografado, telefone, email, id]
            );
            return res.json({ message: 'Registro alterado com sucesso' });

        } catch (error) {
            console.error('Ocorreu um erro', error);
            return res.status(500).json(
                {
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                })
        }
    }

}

export default new AgendamentoController()