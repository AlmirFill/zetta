-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 24/12/2025 às 23:44
-- Versão do servidor: 9.1.0
-- Versão do PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `gestao_bovina`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `bovinos`
--

DROP TABLE IF EXISTS `bovinos`;
CREATE TABLE IF NOT EXISTS `bovinos` (
  `id_bovino` int NOT NULL AUTO_INCREMENT,
  `id_fazenda` int NOT NULL,
  `numero_boi` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `data_nascimento` date DEFAULT NULL,
  `raca` varchar(100) DEFAULT NULL,
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_bovino`),
  KEY `id_fazenda` (`id_fazenda`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `bovinos`
--

INSERT INTO `bovinos` (`id_bovino`, `id_fazenda`, `numero_boi`, `data_nascimento`, `raca`, `data_cadastro`) VALUES
(1, 1, '123', '2024-01-01', 'nelore', '2025-08-27 12:53:12'),
(2, 1, '168', '2025-07-09', 'nelore', '2025-08-27 13:03:39');

-- --------------------------------------------------------

--
-- Estrutura para tabela `fazendas`
--

DROP TABLE IF EXISTS `fazendas`;
CREATE TABLE IF NOT EXISTS `fazendas` (
  `id_fazenda` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `nome_fazenda` varchar(150) NOT NULL,
  `localizacao` varchar(255) DEFAULT NULL,
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `cnpj` varchar(18) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `data_ultima_pesagem` date DEFAULT NULL,
  PRIMARY KEY (`id_fazenda`),
  UNIQUE KEY `cnpj` (`cnpj`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `fazendas`
--

INSERT INTO `fazendas` (`id_fazenda`, `id_usuario`, `nome_fazenda`, `localizacao`, `data_cadastro`, `cnpj`, `endereco`, `data_ultima_pesagem`) VALUES
(1, 1, 'auvorada', 'paragominas', '2025-08-09 18:24:04', '12.345/0001-00', NULL, NULL),
(2, 1, 'pedacinho do cru', 'hdjsi', '2025-08-09 18:28:51', '23.456/0001-00', NULL, NULL),
(3, 2, 'fazenda eo user 2', 'user 2', '2025-08-09 18:32:13', '34.567/0001-00', NULL, NULL),
(4, 1, 'curio', NULL, '2025-08-09 19:04:21', '98745000100', 'paragominas', NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `pesagens`
--

DROP TABLE IF EXISTS `pesagens`;
CREATE TABLE IF NOT EXISTS `pesagens` (
  `id_pesagem` int NOT NULL AUTO_INCREMENT,
  `id_bovino` int NOT NULL,
  `peso` decimal(10,2) NOT NULL,
  `data_pesagem` date NOT NULL,
  `observacao` text,
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_pesagem`),
  KEY `fk_pesagens_bovino` (`id_bovino`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `pesagens`
--

INSERT INTO `pesagens` (`id_pesagem`, `id_bovino`, `peso`, `data_pesagem`, `observacao`, `criado_em`) VALUES
(1, 1, 150.00, '2025-08-27', NULL, '2025-08-27 13:03:57'),
(2, 2, 200.00, '2025-08-27', NULL, '2025-08-27 13:04:28'),
(3, 1, 500.00, '2025-08-28', NULL, '2025-08-27 13:12:02');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status_conta` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nome`, `email`, `senha`, `data_cadastro`, `status_conta`) VALUES
(1, 'adyluan', 'almir@gamil.com', '123', '2025-08-09 17:20:56', 1),
(2, 'almir', 'almirr@gmail.com', '123', '2025-08-09 17:21:39', 1),
(3, 'renato', 'renato@gmail.com', '123', '2025-08-09 17:21:54', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
