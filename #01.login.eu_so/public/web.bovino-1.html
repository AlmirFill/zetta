<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Gestão Bovina - Zetta Automação</title>
    <style>
        /* --- CSS ORIGINAL (não alterado) --- */
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
            margin-bottom: 5px; /* Ajustado para deixar espaço para mensagem erro */
            position: relative;
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

        .info-list {
            display: flex; /* Mudança para um layout de lista vertical */
            flex-direction: column;
            gap: 15px;
            margin-bottom: 30px;
        }

        .info-card {
            background-color: #F0F8FF; /* Azul muito claro */
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
            font-size: 20px; /* Tamanho da fonte ajustado */
            font-weight: bold;
            color: #001F3F;
        }
        
        .valor-rebanho-card {
            text-align: center;
            padding: 20px;
            border-radius: 8px;
            background-color: #F8D7DA; /* Fundo vermelho claro */
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
            color: #DC3545; /* Vermelho vibrante */
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

        /* Nova classe para esconder telas */
        .hidden {
            display: none !important;
        }

        /* Mensagem de erro em vermelho */
        #msgErroBusca {
            color: red;
            font-weight: 600;
            position: absolute;
            bottom: -20px;
            left: 0;
            font-size: 14px;
            width: 100%;
            text-align: center;
        }

        /* Estilo da tela de exibição para alinhar com container */
        #exibicaoDados {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background-color: #FFFFFF;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        #exibicaoDados h1 {
            color: #003366;
            text-align: center;
            margin-bottom: 20px;
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
            background-color: #007BFF;
            color: white;
            padding: 15px 25px;
            border: none;
            border-radius: 8px;
            font-size: 18px;
            cursor: pointer;
            width: 100%;
            font-weight: 600;
            transition: background-color 0.3s ease;
            margin-top: 15px;
        }

        #exibicaoDados button:hover {
            background-color: #0056b3;
        }

        #msgStatus {
            margin-top: 15px;
            text-align: center;
            color: green;
            font-weight: 600;
        }
    </style>
</head>
<body>

    <!-- TELA INICIAL -->
    <div id="telaInicial" class="container">
        <div class="header-top">Zetta Automação Bovina</div>

        <div class="farm-header-card">
            <h1>Fazenda "Boa Vista"</h1>
        </div>

        <div class="search-container">
            <input type="text" id="searchInput" placeholder="Buscar bovino por identificação...">
            <button id="btnBuscar">Buscar</button>
            <div id="msgErroBusca"></div>
        </div>
        
        <div class="info-list">
            <div class="info-card">
                <h3>Endereço da fazenda</h3>
                <p>Rua dos Pastos, 123 - Zona Rural</p>
            </div>
            <div class="info-card">
                <h3>Quantidade de bovinos</h3>
                <p id="qtdBovinos">550</p>
            </div>
            <div class="info-card">
                <h3>Data da última pesagem</h3>
                <p id="dataPesagem">20/07/2025</p>
            </div>
            <div class="info-card">
                <h3>Peso do rebanho</h3>
                <p><span id="pesoRebanho">250.000</span> kg</p>
            </div>
        </div>

        <div class="valor-rebanho-card">
            <p>Valor do Rebanho</p>
            <p class="price" id="valorRebanho">R$ 1.500.000,00</p>
        </div>

        <div class="button-cadastrar">
            <button id="btnCadastrar">Cadastrar Bovino</button>
        </div>
    </div>

    <!-- TELA DE EXIBIÇÃO DE DADOS -->
    <div id="exibicaoDados" class="hidden">
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

            <button id="btnGravar">Gravar</button>
            <button id="btnVoltar" style="margin-top:10px; background-color:#6c757d;">Voltar</button>
            <div class="message" id="msgStatus"></div>
        </div>
    </div>

    <!-- MODAL DE CADASTRO -->
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

    <script>
        // Função para esconder a mensagem de erro da busca
        function limparErroBusca() {
            document.getElementById('msgErroBusca').textContent = '';
        }

        // Função para mostrar a tela inicial e esconder a exibição
        function mostrarTelaInicial() {
            document.getElementById('telaInicial').classList.remove('hidden');
            document.getElementById('exibicaoDados').classList.add('hidden');
            limparErroBusca();
        }

        // Função para mostrar a tela de exibição e esconder a inicial
        function mostrarTelaExibicao() {
            document.getElementById('telaInicial').classList.add('hidden');
            document.getElementById('exibicaoDados').classList.remove('hidden');
            limparErroBusca();
        }

        // Função para preencher os dados na tela de exibição
        function preencherExibicaoDados(bovino) {
            document.getElementById('identificacaoExib').value = bovino.identificacao || '';
            document.getElementById('pesoExib').value = bovino.peso || '';
            document.getElementById('dataPesagemExib').value = bovino.dataPesagem || '';
            document.getElementById('vacinaExib').value = bovino.vacina || 'nao';
            document.getElementById('racaExib').value = bovino.raca || '';
            document.getElementById('racaPaiExib').value = bovino.racaPai || '';
            document.getElementById('racaMaeExib').value = bovino.racaMae || '';
            document.getElementById('msgStatus').textContent = '';
        }

        // Função que retorna os bovinos cadastrados no localStorage
        function getBovinos() {
            return JSON.parse(localStorage.getItem('bovinos')) || [];
        }

        // Função para salvar bovinos no localStorage
        function salvarBovinos(bovinos) {
            localStorage.setItem('bovinos', JSON.stringify(bovinos));
        }

        // Busca e navegação para exibição
        function buscarBovino() {
            limparErroBusca();
            const termoBusca = document.getElementById('searchInput').value.trim();

            // Bovino exemplo fixo para '123'
            const bovinoExemplo = {
                identificacao: '123',
                peso: 450,
                dataPesagem: '2025-07-20',
                vacina: 'sim',
                raca: 'Nelore',
                racaPai: 'Nelore',
                racaMae: 'Angus'
            };

            if (termoBusca === '123') {
                preencherExibicaoDados(bovinoExemplo);
                mostrarTelaExibicao();
                return;
            }

            // Busca no localStorage
            const bovinos = getBovinos();
            const encontrado = bovinos.find(b => b.identificacao === termoBusca);

            if (encontrado) {
                preencherExibicaoDados(encontrado);
                mostrarTelaExibicao();
            } else {
                document.getElementById('msgErroBusca').textContent = 'Bovino não encontrado.';
            }
        }

        // Eventos
        document.getElementById('btnBuscar').addEventListener('click', buscarBovino);

        document.getElementById('searchInput').addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                buscarBovino();
            }
        });

        document.getElementById('btnVoltar').addEventListener('click', mostrarTelaInicial);

        // Modal Cadastro
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
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };

        cadastroForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Cria novo bovino a partir do formulário
            const novoBovino = {
                identificacao: document.getElementById('identificacaoCadastro').value.trim(),
                raca: document.getElementById('racaCadastro').value.trim(),
                peso: parseFloat(document.getElementById('pesoCadastro').value),
                dataNascimento: document.getElementById('dataNascimentoCadastro').value,
                status: document.getElementById('statusCadastro').value,
                // Campos adicionais padrão para exibição
                dataPesagem: new Date().toISOString().slice(0,10),
                vacina: 'nao',
                racaPai: '',
                racaMae: ''
            };

            if (!novoBovino.identificacao) {
                alert('Identificação do bovino é obrigatória.');
                return;
            }

            // Salva no localStorage
            const bovinos = getBovinos();
            bovinos.push(novoBovino);
            salvarBovinos(bovinos);

            alert('Bovino cadastrado com sucesso!');
            cadastroForm.reset();
            modal.style.display = 'none';

            // Atualiza contagem de bovinos e outras info
            atualizarInfoFazenda();
        });

        // Gravar alterações na tela de exibição
        document.getElementById('btnGravar').addEventListener('click', () => {
            const identificacao = document.getElementById('identificacaoExib').value;
            const peso = document.getElementById('pesoExib').value;
            const dataPesagem = document.getElementById('dataPesagemExib').value;
            const vacina = document.getElementById('vacinaExib').value;
            const raca = document.getElementById('racaExib').value;
            const racaPai = document.getElementById('racaPaiExib').value;
            const racaMae = document.getElementById('racaMaeExib').value;

            const bovinos = getBovinos();
            const idx = bovinos.findIndex(b => b.identificacao === identificacao);

            if (identificacao === '123') {
                // Não salva o bovino exemplo, apenas mostra mensagem
                document.getElementById('msgStatus').textContent = 'Exemplo não pode ser alterado.';
                setTimeout(() => { document.getElementById('msgStatus').textContent = ''; }, 3000);
                return;
            }

            if (idx !== -1) {
                bovinos[idx] = {
                    ...bovinos[idx],
                    peso,
                    dataPesagem,
                    vacina,
                    raca,
                    racaPai,
                    racaMae
                };
                salvarBovinos(bovinos);
                document.getElementById('msgStatus').textContent = 'Dados gravados com sucesso!';
                setTimeout(() => { document.getElementById('msgStatus').textContent = ''; }, 3000);
                atualizarInfoFazenda();
            } else {
                document.getElementById('msgStatus').textContent = 'Erro: bovino não encontrado para salvar.';
                setTimeout(() => { document.getElementById('msgStatus').textContent = ''; }, 3000);
            }
        });

        // Atualiza dados da fazenda na tela inicial (quantidade, peso, etc)
        function atualizarInfoFazenda() {
            const bovinos = getBovinos();
            document.getElementById('qtdBovinos').textContent = bovinos.length;

            // Soma dos pesos
            const pesoTotal = bovinos.reduce((acc, b) => acc + (parseFloat(b.peso) || 0), 0);
            document.getElementById('pesoRebanho').textContent = pesoTotal.toFixed(0);

            // Atualiza a data da última pesagem como a mais recente (simples)
            let datasPesagem = bovinos
                .map(b => b.dataPesagem)
                .filter(d => d)
                .sort()
                .reverse();

            document.getElementById('dataPesagem').textContent = datasPesagem.length > 0 ? datasPesagem[0] : 'N/A';

            // Atualiza valor do rebanho (exemplo fixo por kg)
            const valorPorKg = 6; // R$6 por kg exemplo
            const valorTotal = pesoTotal * valorPorKg;
            document.getElementById('valorRebanho').textContent = `R$ ${valorTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        }

        // Inicializa
        window.onload = () => {
            mostrarTelaInicial();
            atualizarInfoFazenda();
        }
    </script>
</body>
</html>
