const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const cors = require('cors');

// Carrega variáveis de ambiente de um arquivo .env em desenvolvimento
try {
    require('dotenv').config();
} catch (e) {
    // noop - dotenv é opcional em produção (Render fornece env vars)
}

const app = express();
const PORT = process.env.PORT || 3000;

//-------------------------------------------------------------------------------------
// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());

//-------------------------------------------------------------------------------------
// Configuração do banco de dados MySQL
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'gestao_bovina'
};

// Criando pool de conexões (melhor que abrir/fechar toda hora)
// Cria pool de conexões com suporte a DATABASE_URL ou variáveis separadas
function parseDatabaseUrl(databaseUrl) {
    try {
        const url = new URL(databaseUrl);
        return {
            host: url.hostname,
            port: url.port ? Number(url.port) : undefined,
            user: url.username,
            password: url.password,
            database: url.pathname ? url.pathname.replace(/^\//, '') : undefined
        };
    } catch (err) {
        console.warn('Falha ao parsear DATABASE_URL:', err.message);
        return null;
    }
}

let pool;
const parsed = process.env.DATABASE_URL ? parseDatabaseUrl(process.env.DATABASE_URL) : null;
if (parsed) {
    const cfg = {
        host: process.env.DB_HOST || parsed.host,
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : parsed.port,
        user: process.env.DB_USER || parsed.user,
        password: process.env.DB_PASSWORD || parsed.password,
        database: process.env.DB_NAME || parsed.database,
        waitForConnections: true,
        connectionLimit: Number(process.env.DB_CONN_LIMIT) || 10,
        queueLimit: 0
    };

    // Se precisar forçar SSL (Railway às vezes requer), use DB_SSL=true
    if (process.env.DB_SSL === 'true') {
        cfg.ssl = { rejectUnauthorized: false };
    }

    pool = mysql.createPool(cfg);
} else {
    pool = mysql.createPool({
        host: process.env.DB_HOST || dbConfig.host,
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
        user: process.env.DB_USER || dbConfig.user,
        password: process.env.DB_PASSWORD || dbConfig.password,
        database: process.env.DB_NAME || dbConfig.database,
        waitForConnections: true,
        connectionLimit: Number(process.env.DB_CONN_LIMIT) || 10,
        queueLimit: 0
    });
}

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
            'INSERT INTO usuarios (nome, email, senha, status_conta) VALUES (?, ?, ?, ?)',
            [nome, email, senha, 1] // status_conta 1 = ativo
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
    const { id_fazenda, numero_brinco, data_nascimento, raca } = req.body;

    if (!id_fazenda || !numero_brinco) {
        return res.status(400).json({ success: false, message: 'ID da fazenda e número do brinco são obrigatórios.' });
    }

    try {
        const [existing] = await pool.execute(
            'SELECT id_bovino FROM bovinos WHERE numero_boi = ? AND id_fazenda = ?',
            [numero_brinco, id_fazenda]
        );

        if (existing.length > 0) {
            return res.status(409).json({ success: false, message: 'Já existe um bovino com este número nesta fazenda.' });
        }

        await pool.execute(
            'INSERT INTO bovinos (id_fazenda, numero_boi, data_nascimento, raca) VALUES (?, ?, ?, ?)',
            [id_fazenda, numero_brinco, data_nascimento || null, raca || null]
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
// 📌 10 - Registrar Pesagem de Bovino
app.post('/pesagens', async (req, res) => {
    const { id_bovino, peso, data_pesagem, observacao } = req.body;

    if (!id_bovino || !peso || !data_pesagem) {
        return res.status(400).json({ success: false, message: 'ID do bovino, peso e data da pesagem são obrigatórios.' });
    }

    try {
        await pool.execute(
            'INSERT INTO pesagens (id_bovino, peso, data_pesagem, observacao, criado_em) VALUES (?, ?, ?, ?, NOW())',
            [id_bovino, peso, data_pesagem, observacao || null]
        );

        res.status(201).json({ success: true, message: 'Pesagem registrada com sucesso!' });

    } catch (error) {
        console.error('Erro ao registrar pesagem:', error);
        res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
});

//-------------------------------------------------------------------------------------
// 📌 11 - Listar Pesagens de um Bovino
app.get('/pesagens/bovino/:id_bovino', async (req, res) => {
    const { id_bovino } = req.params;

    try {
        const [rows] = await pool.execute(
            'SELECT * FROM pesagens WHERE id_bovino = ? ORDER BY data_pesagem DESC',
            [id_bovino]
        );

        res.json({ success: true, pesagens: rows });

    } catch (error) {
        console.error('Erro ao listar pesagens:', error);
        res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
});

//-------------------------------------------------------------------------------------
// 📌 12 - Listar Pesagens de uma Fazenda (últimas pesagens de cada bovino)
app.get('/pesagens/fazenda/:id_fazenda', async (req, res) => {
    const { id_fazenda } = req.params;

    try {
        const [rows] = await pool.execute(
            `SELECT p.*, b.numero_boi, b.id_bovino
             FROM pesagens p
             JOIN bovinos b ON p.id_bovino = b.id_bovino
             WHERE b.id_fazenda = ?
             AND p.id_pesagem IN (
                 SELECT MAX(p2.id_pesagem)
                 FROM pesagens p2
                 WHERE p2.id_bovino = b.id_bovino
             )
             ORDER BY p.data_pesagem DESC`,
            [id_fazenda]
        );

        res.json({ success: true, pesagens: rows });

    } catch (error) {
        console.error('Erro ao listar pesagens da fazenda:', error);
        res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
});

//-------------------------------------------------------------------------------------
// 📌 13 - Obter Peso Total do Rebanho (APENAS BOVINOS ATIVOS - SEM BAIXA)
app.get('/rebanho/peso-total/:id_fazenda', async (req, res) => {
    const { id_fazenda } = req.params;

    try {
        const [rows] = await pool.execute(
            `SELECT SUM(p.peso) as peso_total
             FROM pesagens p
             JOIN bovinos b ON p.id_bovino = b.id_bovino
             LEFT JOIN baixas bx ON b.id_bovino = bx.id_bovino
             WHERE b.id_fazenda = ?
             AND bx.id_baixa IS NULL
             AND p.id_pesagem IN (
                 SELECT MAX(p2.id_pesagem)
                 FROM pesagens p2
                 WHERE p2.id_bovino = b.id_bovino
             )`,
            [id_fazenda]
        );

        const pesoTotal = rows[0]?.peso_total || 0;
        res.json({ success: true, peso_total: parseFloat(pesoTotal) });

    } catch (error) {
        console.error('Erro ao calcular peso total do rebanho:', error);
        res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
});


//-------------------------------------------------------------------------------------
// 📌 14 - Registrar Baixa de Bovino
app.post('/baixas', async (req, res) => {
    const { id_bovino, motivo, data_baixa, observacao } = req.body;

    if (!id_bovino || !motivo || !data_baixa) {
        return res.status(400).json({ success: false, message: 'ID do bovino, motivo e data da baixa são obrigatórios.' });
    }

    try {
        // Verificar se o bovino existe
        const [bovino] = await pool.execute(
            'SELECT id_bovino FROM bovinos WHERE id_bovino = ?',
            [id_bovino]
        );

        if (bovino.length === 0) {
            return res.status(404).json({ success: false, message: 'Bovino não encontrado.' });
        }

        // Verificar se já existe baixa para este bovino
        const [existingBaixa] = await pool.execute(
            'SELECT id_baixa FROM baixas WHERE id_bovino = ?',
            [id_bovino]
        );

        if (existingBaixa.length > 0) {
            return res.status(409).json({ success: false, message: 'Este bovino já possui uma baixa registrada.' });
        }

        // Registrar a baixa
        await pool.execute(
            'INSERT INTO baixas (id_bovino, motivo, data_baixa, observacao, criado_em) VALUES (?, ?, ?, ?, NOW())',
            [id_bovino, motivo, data_baixa, observacao || null]
        );

        res.status(201).json({ success: true, message: 'Baixa registrada com sucesso!' });

    } catch (error) {
        console.error('Erro ao registrar baixa:', error);
        res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
});

//-------------------------------------------------------------------------------------
// 📌 15 - Verificar se Bovino tem Baixa
app.get('/baixas/bovino/:id_bovino', async (req, res) => {
    const { id_bovino } = req.params;

    try {
        const [rows] = await pool.execute(
            'SELECT * FROM baixas WHERE id_bovino = ?',
            [id_bovino]
        );

        if (rows.length > 0) {
            res.json({ success: true, tem_baixa: true, baixa: rows[0] });
        } else {
            res.json({ success: true, tem_baixa: false });
        }

    } catch (error) {
        console.error('Erro ao verificar baixa:', error);
        res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
});

//-------------------------------------------------------------------------------------
// 📌 16 - Listar Todas as Baixas de uma Fazenda
app.get('/baixas/fazenda/:id_fazenda', async (req, res) => {
    const { id_fazenda } = req.params;

    try {
        const [rows] = await pool.execute(
            `SELECT b.*, bov.numero_boi, bov.raca
             FROM baixas b
             JOIN bovinos bov ON b.id_bovino = bov.id_bovino
             WHERE bov.id_fazenda = ?
             ORDER BY b.data_baixa DESC`,
            [id_fazenda]
        );

        res.json({ success: true, baixas: rows });

    } catch (error) {
        console.error('Erro ao listar baixas da fazenda:', error);
        res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
});

//-------------------------------------------------------------------------------------
// 📌 5.1 - Listar Bovinos ATIVOS de uma Fazenda (sem baixa) COM ÚLTIMA PESAGEM
app.get('/bovinos/ativos/:id_fazenda', async (req, res) => {
    const { id_fazenda } = req.params;

    try {
        const [rows] = await pool.execute(
            `SELECT 
                b.*,
                p.peso,
                p.data_pesagem,
                p.observacao as observacao_pesagem
             FROM bovinos b
             LEFT JOIN baixas bx ON b.id_bovino = bx.id_bovino
             LEFT JOIN (
                 SELECT p1.*
                 FROM pesagens p1
                 INNER JOIN (
                     SELECT id_bovino, MAX(id_pesagem) as max_id
                     FROM pesagens
                     GROUP BY id_bovino
                 ) p2 ON p1.id_bovino = p2.id_bovino AND p1.id_pesagem = p2.max_id
             ) p ON b.id_bovino = p.id_bovino
             WHERE b.id_fazenda = ? AND bx.id_baixa IS NULL
             ORDER BY b.numero_boi`,
            [id_fazenda]
        );

        res.json(rows);

    } catch (error) {
        console.error('Erro ao listar bovinos ativos:', error);
        res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
});

//-------------------------------------------------------------------------------------
// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});