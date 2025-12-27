<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Exibição de Dados do Bovino</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #F0F2F5;
            color: #333333;
            margin: 0;
            padding: 20px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        h1 {
            color: #003366;
            text-align: center;
        }

        .info-card {
            background-color: #FFFFFF;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }

        .info-card label {
            display: block;
            font-weight: bold;
            margin-top: 10px;
        }

        .info-card input, .info-card select {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            border-radius: 5px;
            border: 1px solid #CCCCCC;
            font-size: 16px;
        }

        button {
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
        }

        button:hover {
            background-color: #0056b3;
        }

        .message {
            margin-top: 15px;
            text-align: center;
            color: green;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <h1>Dados do Bovino</h1>
    <div class="info-card">
        <label for="identificacao">Número do Boi:</label>
        <input type="text" id="identificacao" readonly />

        <label for="peso">Peso do Boi (kg):</label>
        <input type="number" id="peso" />

        <label for="dataPesagem">Data da Última Pesagem:</label>
        <input type="date" id="dataPesagem" />

        <label for="vacina">Vacina já Tomada:</label>
        <select id="vacina">
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
        </select>

        <label for="raca">Raça do Boi:</label>
        <input type="text" id="raca" />

        <label for="racaPai">Raça do Pai:</label>
        <input type="text" id="racaPai" />

        <label for="racaMae">Raça da Mãe:</label>
        <input type="text" id="racaMae" />

        <button id="btnGravar">Gravar</button>
        <div class="message" id="msgStatus"></div>
    </div>

    <script>
        // Ao carregar a página, carrega os dados do localStorage
        window.onload = function() {
            const bovinoStr = localStorage.getItem('bovinoSelecionado');
            if (!bovinoStr) {
                alert('Nenhum bovino selecionado. Voltando à página inicial.');
                window.location.href = 'index.html';
                return;
            }
            const bovino = JSON.parse(bovinoStr);

            document.getElementById('identificacao').value = bovino.identificacao || '';
            document.getElementById('peso').value = bovino.peso || '';
            document.getElementById('dataPesagem').value = bovino.dataPesagem || '';
            document.getElementById('vacina').value = bovino.vacina || 'nao';
            document.getElementById('raca').value = bovino.raca || '';
            document.getElementById('racaPai').value = bovino.racaPai || '';
            document.getElementById('racaMae').value = bovino.racaMae || '';
        };

        // Botão Gravar — só mostra um alerta por enquanto
        document.getElementById('btnGravar').addEventListener('click', function() {
            // Pega os dados atuais da tela
            const bovinoAtualizado = {
                identificacao: document.getElementById('identificacao').value,
                peso: document.getElementById('peso').value,
                dataPesagem: document.getElementById('dataPesagem').value,
                vacina: document.getElementById('vacina').value,
                raca: document.getElementById('raca').value,
                racaPai: document.getElementById('racaPai').value,
                racaMae: document.getElementById('racaMae').value
            };

            // Aqui você pode salvar esses dados de volta no localStorage ou mandar para o backend
            localStorage.setItem('bovinoSelecionado', JSON.stringify(bovinoAtualizado));

            document.getElementById('msgStatus').textContent = 'Dados gravados com sucesso!';
            setTimeout(() => {
                document.getElementById('msgStatus').textContent = '';
            }, 3000);
        });
    </script>
</body>
</html>
