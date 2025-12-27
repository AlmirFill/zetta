<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Gestão Bovina - Zetta Automação</title>
<style>
    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #F0F2F5; /* Cinza claro, quase branco, para um fundo profissional */
        color: #333333; /* Cor de texto padrão */
        margin: 0;
        padding: 0;
    }

    .header-top {
        background-color: #001F3F; /* Azul escuro principal */
        color: #FFFFFF;
        text-align: center;
        padding: 10px 0;
        font-size: 14px;
        letter-spacing: 2px;
        text-transform: uppercase;
    }

    .container {
        max-width: 800px; /* Reduzi a largura para centralizar melhor as informações */
        margin: 20px auto;
        padding: 20px;
        background-color: #FFFFFF;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .farm-header-card {
        background-color: #003366; /* Azul um pouco mais claro para contraste */
        color: #FFFFFF;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        margin-bottom: 20px;
    }

    .farm-header-card h1 {
        margin: 0;
        font-size: 2.5em;
        font-weight: 600;
    }

    .search-container {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 5px;
    }

    input[type="text"] {
        flex: 1;
        padding: 12px;
        border-radius: 5px;
        border: 1px solid #CCCCCC;
        font-size: 16px;
        color: #333333;
        background-color: #F9F9F9;
        transition: border-color 0.3s ease;
    }

    input[type="text"]:focus {
        outline: none;
        border-color: #007BFF;
    }

    button {
        padding: 12px 25px;
        border: none;
        border-radius: 5px;
        background-color: #007BFF;
        color: #FFFFFF;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        font-weight: 600;
    }

    button:hover {
        background-color: #0056b3;
    }

    .error-message {
        color: red;
        text-align: center;
        margin-top: 8px;
        font-weight: 600;
    }

    .info-list {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-bottom: 30px;
    }

    .info-card {
        background-color: #F0F8FF;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        border: 1px solid #E0E0E0;
    }

    .info-card h3 {
        margin: 0 0 10px 0;
        font-size: 18px;
        color: #003366;
        font-weight: 500;
    }

    .info-card p {
        margin: 0;
        font-size: 20px;
        font-weight: bold;
        color: #001F3F;
    }

    .valor-rebanho-card {
        text-align: center;
        padding: 20px;
        border-radius: 8px;
        background-color: #F8D7DA;
        border: 1px solid #F5C6CB;
        margin-bottom: 30px;
    }

    .valor-rebanho-card p {
        margin: 0;
        font-size: 20px;
        color: #721C24;
        font-weight: 600;
    }

    .valor-rebanho-card .price {
        font-size: 3em;
        color: #DC3545;
        font-weight: 700;
    }

    .button-cadastrar {
        text-align: center;
    }

    /* Modal de Cadastro */
    .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0,0,0,0.6);
        backdrop-filter: blur(5px);
    }

    .modal-content {
        background-color: #FFFFFF;
        margin: 10% auto;
        padding: 30px;
        border-radius: 10px;
        width: 90%;
        max-width: 500px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        position: relative;
    }

    .close {
        color: #AAAAAA;
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 35px;
        font-weight: bold;
        transition: color 0.3s;
    }

    .close:hover, .close:focus {
        color: #333333;
        text-decoration: none;
        cursor: pointer;
    }

    .modal-content h2 {
        text-align: center;
        margin-top: 0;
        color: #003366;
        font-size: 2em;
    }

    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
        color: #555555;
    }

    .form-group input, .form-group select {
        width: 100%;
        padding: 12px;
        border-radius: 5px;
        border: 1px solid #CCCCCC;
        background-color: #F9F9F9;
        color: #333333;
        font-size: 16px;
    }

    /* Tela de Exibição de Dados */
    #exibicaoDados {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #FFFFFF;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    #exibicaoDados.hidden {
        display: none;
    }

    #exibicaoDados h1 {
        color: #003366;
        text-align: center;
    }

    #exibicaoDados .info-card {
        background-color: #FFFFFF;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        margin-bottom: 20px;
    }

    #exibicaoDados .info-card label {
        display: block;
        font-weight: bold;
        margin-top: 10px;
    }

    #exibicaoDados .info-card input,
    #exibicaoDados .info-card select {
        width: 100%;
        padding: 10px;
        margin-top: 5px;
        border-radius: 5px;
        border: 1px solid #CCCCCC;
        font-size: 16px;
    }

    #exibicaoDados button {
        width: 100%;
        margin-top: 15px;
    }

    #exibicaoDados .message {
        margin-top: 15px;
        text-align: center;
        color: green;
        font-weight: 600;
    }
</style>
</head>
<body>
<div class="header-top">Zetta Automação Bovina</div>

<!-- TELA INICIAL -->
<div id="telaInicial" class="container">
    <div class="farm-header-card">
        <h1>Fazenda "Boa Vista"</h1>
    </div>

    <div class="search-container">
        <input type="text" id="searchInput" placeholder="Buscar bovino por identificação..." />
        <button id="btnBuscar">Buscar</button>
    </div>
    <div id="errorMsg" class="error-message"></div>

    <div class="info-list">
        <div class="info-card">
            <h3>Endereço da fazenda</h3>
            <p>Rua dos Pastos, 123 - Zona Rural</p>
        </div>
        <div class="info-card">
            <h3>Quantidade de bovinos</h3>
            <p id="qtdBovinos">0</p>
        </div>
        <div class="info-card">
            <h3>Data da última pesagem</h3>
            <p id="dataPesagem">N/A</p>
        </div>
        <div class="info-card">
            <h3>Peso do rebanho</h3>
            <p><span id="pesoRebanho">0</span> kg</p>
        </div>
    </div>

    <div class="valor-rebanho-card">
        <p>Valor do Rebanho</p>
        <p class="price" id="valorRebanho">R$ 0,00</p>
    </div>

    <div class="button-cadastrar">
        <button id="btnCadastrar">Cadastrar Bovino</button>
    </div>
</div>

<!-- MODAL CADASTRO -->
<div id="cadastroModal" class="modal">
    <div class="modal-content">
        <span class="close" id="closeModal">&times;</span>
        <h2>Cadastrar Bovino</h2>
        <form id="cadastroForm">
            <div class="form-group">
                <label for="identificacaoCadastro">Identificação do Bovino:</label>
                <input type="text" id="identificacaoCadastro" name="identificacaoCadastro" placeholder="Ex: 001" required />
            </div>
            <div class="form-group">
                <label for="racaCadastro">Raça:</label>
                <input type="text" id="racaCadastro" name="racaCadastro" placeholder="Ex: Nelore" required />
            </div>
            <div class="form-group">
                <label for="pesoCadastro">Peso (kg):</label>
                <input type="number" id="pesoCadastro" name="pesoCadastro" placeholder="Ex: 450" required />
            </div>
            <div class="form-group">
                <label for="dataNascimentoCadastro">Data de Nascimento:</label>
                <input type="date" id="dataNascimentoCadastro" name="dataNascimentoCadastro" required />
            </div>
            <div class="form-group">
                <label for="statusCadastro">Status:</label>
                <select id="statusCadastro" name="statusCadastro">
                    <option value="saudavel">Saudável</option>
                    <option value="doente">Doente</option>
                    <option value="prenha">Prenha</option>
                </select>
            </div>
            <button type="submit">Salvar Bovino</button>
        </form>
    </div>
</div>

<!-- TELA DE EXIBIÇÃO DE DADOS -->
<div id="exibicaoDados" class="hidden">
    <button id="btnVoltar" style="background-color:#007BFF; color: white; margin-bottom: 15px; border-radius:8px; padding:12px 25px; font-size:16px; cursor:pointer; font-weight:600; border:none;">Voltar</button>
    <h1>Dados do Bovino</h1>
    <div class="info-card">
        <label for="identificacaoExib">Número do Boi:</label>
        <input type="text" id="identificacaoExib" readonly />

        <label for="pesoExib">Peso do Boi (kg):</label>
        <input type="number" id="pesoExib" />

        <label for="dataPesagemExib">Data da Última Pesagem:</label>
        <input type="date" id="dataPesagemExib" />

        <label for="vacinaExib">Vacina já Tomada:</label>
        <select id="vacinaExib">
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
        </select>

        <label for="racaExib">Raça do Boi:</label>
        <input type="text" id="racaExib" />

        <label for="racaPaiExib">Raça do Pai:</label>
        <input type="text" id="racaPaiExib" />

        <label for="racaMaeExib">Raça da Mãe:</label>
        <input type="text" id="racaMaeExib" />

        <button id="btnExcluir">Excluir</button>
        <div class="message" id="msgStatus"></div>
    </div>
</div>

<script>
    // Helper functions para localStorage
    function getBovinos() {
        return JSON.parse(localStorage.getItem('bovinos') || '[]');
    }

    function salvarBovinos(bovinos) {
        localStorage.setItem('bovinos', JSON.stringify(bovinos));
    }

    // Atualiza informações da fazenda na tela inicial
    function atualizarInfoFazenda() {
        const bovinos = getBovinos();
        document.getElementById('qtdBovinos').textContent = bovinos.length;

        // Soma dos pesos
        const pesoTotal = bovinos.reduce((acc, b) => acc + (parseFloat(b.peso) || 0), 0);
        document.getElementById('pesoRebanho').textContent = pesoTotal.toFixed(0);

        // Data mais recente de pesagem
        let datasPesagem = bovinos
            .map(b => b.dataPesagem)
            .filter(d => d)
            .sort()
            .reverse();

        document.getElementById('dataPesagem').textContent = datasPesagem.length > 0 ? datasPesagem[0] : 'N/A';

        // Atualiza valor do rebanho (exemplo: R$ 6 por kg)
        const valorPorKg = 6;
        const valorTotal = pesoTotal * valorPorKg;
        document.getElementById('valorRebanho').textContent = `R$ ${valorTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }

    // Mostrar tela inicial e esconder tela de exibição
    function mostrarTelaInicial() {
        document.getElementById('telaInicial').classList.remove('hidden');
        document.getElementById('exibicaoDados').classList.add('hidden');
        document.getElementById('errorMsg').textContent = '';
        document.getElementById('searchInput').value = '';
    }

    // Mostrar tela de exibição de dados do bovino
    function mostrarTelaExibicao(bovino) {
        document.getElementById('telaInicial').classList.add('hidden');
        document.getElementById('exibicaoDados').classList.remove('hidden');

        document.getElementById('identificacaoExib').value = bovino.identificacao || '';
        document.getElementById('pesoExib').value = bovino.peso || '';
        document.getElementById('dataPesagemExib').value = bovino.dataPesagem || '';
        document.getElementById('vacinaExib').value = bovino.vacina || 'nao';
        document.getElementById('racaExib').value = bovino.raca || '';
        document.getElementById('racaPaiExib').value = bovino.racaPai || '';
        document.getElementById('racaMaeExib').value = bovino.racaMae || '';
        document.getElementById('msgStatus').textContent = '';
    }

    // Evento Buscar
    document.getElementById('btnBuscar').addEventListener('click', buscarBovino);
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            buscarBovino();
        }
    });

    function buscarBovino() {
        const termoBusca = document.getElementById('searchInput').value.trim();
        if (!termoBusca) {
            document.getElementById('errorMsg').textContent = 'Digite um número para buscar.';
            return;
        }

        // Bovino exemplo fixo para 123
        if (termoBusca === '123') {
            const exemploBovino = {
                identificacao: '123',
                peso: 450,
                dataPesagem: new Date().toISOString().slice(0,10),
                vacina: 'sim',
                raca: 'Nelore',
                racaPai: 'Nelore',
                racaMae: 'Gir'
            };
            mostrarTelaExibicao(exemploBovino);
            document.getElementById('errorMsg').textContent = '';
            return;
        }

        const bovinos = getBovinos();
        const encontrado = bovinos.find(b => b.identificacao === termoBusca);

        if (encontrado) {
            mostrarTelaExibicao(encontrado);
            document.getElementById('errorMsg').textContent = '';
        } else {
            document.getElementById('errorMsg').textContent = 'Bovino não encontrado.';
        }
    }

    // Modal cadastro
    const modal = document.getElementById('cadastroModal');
    const btnCadastrar = document.getElementById('btnCadastrar');
    const closeModal = document.getElementById('closeModal');
    const cadastroForm = document.getElementById('cadastroForm');

    btnCadastrar.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    cadastroForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const novoBovino = {
            identificacao: document.getElementById('identificacaoCadastro').value.trim(),
            raca: document.getElementById('racaCadastro').value.trim(),
            peso: parseFloat(document.getElementById('pesoCadastro').value),
            dataNascimento: document.getElementById('dataNascimentoCadastro').value,
            status: document.getElementById('statusCadastro').value,
            dataPesagem: new Date().toISOString().slice(0,10) // data atual para pesagem inicial
        };

        let bovinos = getBovinos();
        // Checar se já existe o bovino
        if (bovinos.find(b => b.identificacao === novoBovino.identificacao)) {
            alert('Já existe um bovino com essa identificação!');
            return;
        }

        bovinos.push(novoBovino);
        salvarBovinos(bovinos);
        atualizarInfoFazenda();

        alert('Bovino cadastrado com sucesso!');
        cadastroForm.reset();
        modal.style.display = 'none';
    });

    // Botão Voltar na tela de exibição
    document.getElementById('btnVoltar').addEventListener('click', mostrarTelaInicial);

    // Botão Excluir
    document.getElementById('btnExcluir').addEventListener('click', () => {
        const identificacao = document.getElementById('identificacaoExib').value;

        if (identificacao === '123') {
            document.getElementById('msgStatus').textContent = 'Exemplo não pode ser excluído.';
            setTimeout(() => { document.getElementById('msgStatus').textContent = ''; }, 3000);
            return;
        }

        let bovinos = getBovinos();
        const idx = bovinos.findIndex(b => b.identificacao === identificacao);

        if (idx !== -1) {
            bovinos.splice(idx, 1);
            salvarBovinos(bovinos);
            document.getElementById('msgStatus').textContent = 'Bovino excluído com sucesso!';
            setTimeout(() => {
                document.getElementById('msgStatus').textContent = '';
                mostrarTelaInicial();
                atualizarInfoFazenda();
            }, 1500);
        } else {
            document.getElementById('msgStatus').textContent = 'Erro: bovino não encontrado para excluir.';
            setTimeout(() => { document.getElementById('msgStatus').textContent = ''; }, 3000);
        }
    });

    // Inicializa dados da fazenda ao carregar
    window.onload = function() {
        atualizarInfoFazenda();
    };
</script>
</body>
</html>
