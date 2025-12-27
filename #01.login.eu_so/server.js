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
            [nome, senha]
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
// 📌 3 - Cadastro de Fazenda (ATUALIZADO)
app.post('/cadastrar-fazenda', async (req, res) => {
    const { id_usuario, nome_fazenda, cnpj, endereco, data_ultima_pesagem } = req.body;

    if (!id_usuario || !nome_fazenda) {
        return res.status(400).json({ success: false, message: 'ID do usuário e nome da fazenda são obrigatórios.' });
    }

    try {
        // Validação adicional para CNPJ se for obrigatório
        // if (!cnpj) {
        //    return res.status(400).json({ success: false, message: 'O CNPJ é obrigatório.' });
        // }

        // Verifica se já existe uma fazenda com o mesmo CNPJ
        if (cnpj) {
            const [existing] = await pool.execute(
                'SELECT id_fazenda FROM fazendas WHERE cnpj = ?',
                [cnpj]
            );

            if (existing.length > 0) {
                return res.status(409).json({ success: false, message: 'Já existe uma fazenda com este CNPJ cadastrado.' });
            }
        }

        await pool.execute(
            'INSERT INTO fazendas (id_usuario, nome_fazenda, cnpj, endereco, data_ultima_pesagem) VALUES (?, ?, ?, ?, ?)',
            [id_usuario, nome_fazenda, cnpj || null, endereco || null, data_ultima_pesagem || null]
        );

        res.status(201).json({ success: true, message: 'Fazenda cadastrada com sucesso!' });

    } catch (error) {
        console.error('Erro ao cadastrar fazenda:', error);
        res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
});
// 📌 6 - Listar Fazendas de um Usuário
app.get('/fazendas/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;

    try {
        const [rows] = await pool.execute(
            'SELECT id_fazenda, nome_fazenda, localizacao FROM fazendas WHERE id_usuario = ?',
            [id_usuario]
        );

        if (rows.length > 0) {
            res.json({ success: true, fazendas: rows });
        } else {
            res.status(404).json({ success: false, message: 'Nenhuma fazenda encontrada para este usuário.' });
        }
    } catch (error) {
        console.error('Erro ao listar fazendas:', error);
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

// 📌 7 - Consultar Status da Conta do Usuário
app.get('/usuarios/:id_usuario/status', async (req, res) => {
    const { id_usuario } = req.params;

    try {
        const [rows] = await pool.execute(
            'SELECT nome, status_conta FROM usuarios WHERE id_usuario = ?',
            [id_usuario]
        );

        if (rows.length > 0) {
            res.json({ success: true, usuario: rows[0] });
        } else {
            res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao consultar status do usuário:', error);
        res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
});
// 📌 8 - Alterar Status da Conta do Usuário
app.put('/usuarios/:id_usuario/status', async (req, res) => {
    const { id_usuario } = req.params;
    const { status_conta } = req.body;

    // Garante que o status_conta é 0 ou 1
    if (status_conta !== 0 && status_conta !== 1) {
        return res.status(400).json({ success: false, message: 'O status da conta deve ser 0 (desabilitado) ou 1 (ativo).' });
    }

    try {
        const [result] = await pool.execute(
            'UPDATE usuarios SET status_conta = ? WHERE id_usuario = ?',
            [status_conta, id_usuario]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
        }

        res.json({ success: true, message: 'Status da conta atualizado com sucesso!' });

    } catch (error) {
        console.error('Erro ao atualizar status do usuário:', error);
        res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
});
// 📌 9 - Listar Todos os Usuários
app.get('/usuarios', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT id_usuario, nome, email, status_conta FROM usuarios');
        res.json({ success: true, usuarios: rows });
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
});


//-------------------------------------------------------------------------------------
// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
