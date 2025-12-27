const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

//-------------------------------------------------------------------------------------
// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());

//-------------------------------------------------------------------------------------
// Configuração do banco de dados MySQL
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestao_bovina' // ✅ agora está usando o novo banco
};

// Criando pool de conexões (melhor que abrir/fechar toda hora)
const pool = mysql.createPool(dbConfig);

//-------------------------------------------------------------------------------------
// 📌 1 - Cadastro de Usuário
app.post('/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios.' });
    }

    try {
        const [existing] = await pool.execute(
            'SELECT id_usuario FROM usuarios WHERE email = ?',
            [email]
        );

        if (existing.length > 0) {
            return res.status(409).json({ success: false, message: 'E-mail já cadastrado.' });
        }

        await pool.execute(
            'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, senha]
        );

        res.status(201).json({ success: true, message: 'Usuário cadastrado com sucesso!' });

    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
});

//-------------------------------------------------------------------------------------
// 📌 2 - Login de Usuário
app.post('/login', async (req, res) => {
    const { nome, senha } = req.body;

    if (!nome || !senha) {
        return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios.' });
    }

    try {
        const [rows] = await pool.execute(
            'SELECT * FROM usuarios WHERE nome = ? AND senha = ?',
            [, senha]
        );

        if (rows.length > 0) {
            res.status(200).json({ success: true, message: 'Login efetuado com sucesso!', usuario: rows[0] });
        } else {
            res.status(401).json({ success: false, message: 'E-mail ou senha inválidos.' });
        }

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
});

//-------------------------------------------------------------------------------------
// 📌 3 - Cadastro de Fazenda
app.post('/cadastrar-fazenda', async (req, res) => {
    const { id_usuario, nome_fazenda, localizacao } = req.body;

    if (!id_usuario || !nome_fazenda) {
        return res.status(400).json({ success: false, message: 'ID do usuário e nome da fazenda são obrigatórios.' });
    }

    try {
        await pool.execute(
            'INSERT INTO fazendas (id_usuario, nome_fazenda, localizacao) VALUES (?, ?, ?)',
            [id_usuario, nome_fazenda, localizacao || null]
        );

        res.status(201).json({ success: true, message: 'Fazenda cadastrada com sucesso!' });

    } catch (error) {
        console.error('Erro ao cadastrar fazenda:', error);
        res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
});

//-------------------------------------------------------------------------------------
// 📌 4 - Cadastro de Bovino
app.post('/cadastrar-bovino', async (req, res) => {
    const { id_fazenda, numero_brinco, peso, data_nascimento, raca } = req.body;

    if (!id_fazenda || !numero_brinco || !peso || !data_nascimento) {
        return res.status(400).json({ success: false, message: 'ID da fazenda, número do brinco, peso e data de nascimento são obrigatórios.' });
    }

    try {
        const [existing] = await pool.execute(
            'SELECT id_bovino FROM bovinos WHERE numero_brinco = ? AND id_fazenda = ?',
            [numero_brinco, id_fazenda]
        );

        if (existing.length > 0) {
            return res.status(409).json({ success: false, message: 'Já existe um bovino com este número de brinco nesta fazenda.' });
        }

        await pool.execute(
            'INSERT INTO bovinos (id_fazenda, numero_brinco, peso, data_nascimento, raca) VALUES (?, ?, ?, ?, ?)',
            [id_fazenda, numero_brinco, peso, data_nascimento, raca || null]
        );

        res.status(201).json({ success: true, message: 'Bovino cadastrado com sucesso!' });

    } catch (error) {
        console.error('Erro ao cadastrar bovino:', error);
        res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
});

//-------------------------------------------------------------------------------------
// 📌 5 - Listar Bovinos de uma Fazenda
app.get('/bovinos/:id_fazenda', async (req, res) => {
    const { id_fazenda } = req.params;

    try {
        const [rows] = await pool.execute(
            'SELECT * FROM bovinos WHERE id_fazenda = ?',
            [id_fazenda]
        );

        res.json(rows);

    } catch (error) {
        console.error('Erro ao listar bovinos:', error);
        res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
});

//-------------------------------------------------------------------------------------
// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
