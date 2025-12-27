<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Zetta Automação Bovina</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Poppins', sans-serif; /* Nova fonte */
            background-color: #001F3F; /* Azul escuro */
            color: #FFFFFF; /* Branco */
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .login-container {
            width: 90%;
            max-width: 400px;
            background-color: #FFFFFF;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            text-align: center;
        }

        .header {
            margin-bottom: 30px;
        }

        .header h1 {
            margin: 0;
            color: #001F3F; /* Azul escuro */
            font-size: 2em;
            font-weight: 700; /* Negrito para o título */
        }

        .form-group {
            text-align: left;
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #333333;
        }

        .form-group input {
            width: 100%;
            padding: 12px;
            border-radius: 5px;
            border: 1px solid #CCCCCC;
            background-color: #F9F9F9;
            color: #000000;
            font-size: 16px;
            box-sizing: border-box;
        }

        .form-group input:focus {
            outline: none;
            border-color: #007BFF; /* Azul de destaque no foco */
        }

        .error-message {
            color: #FF0000;
            margin-top: 10px;
            font-size: 14px;
            visibility: hidden;
        }

        .login-button {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 5px;
            background-color: #001F3F; /* Botão em azul escuro */
            color: #FFFFFF;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .login-button:hover {
            background-color: #003366; /* Cor um pouco mais clara ao passar o mouse */
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="header">
            <h1>Zetta Automação Bovina</h1>
        </div>

        <form id="loginForm">
            <div class="form-group">
                <label for="email">E-mail ou Usuário:</label>
                <input type="text" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="password">Senha:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <p class="error-message" id="errorMessage">Preencha todos os campos.</p>
            <button type="submit" class="login-button">Entrar</button>
        </form>
    </div>

    <script>
        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('errorMessage');

            if (email === "" || password === "") {
                errorMessage.style.visibility = 'visible';
            } else {
                errorMessage.style.visibility = 'hidden';
                alert('Login efetuado com sucesso!');
            }
        });
    </script>
</body>
</html>