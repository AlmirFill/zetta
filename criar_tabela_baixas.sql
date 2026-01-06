-- Script para criar a tabela de baixas de bovinos
-- Execute este script no banco de dados gestao_bovina

USE gestao_bovina;

-- Criar tabela de baixas
DROP TABLE IF EXISTS `baixas`;
CREATE TABLE IF NOT EXISTS `baixas` (
  `id_baixa` int NOT NULL AUTO_INCREMENT,
  `id_bovino` int NOT NULL,
  `motivo` varchar(100) NOT NULL,
  `data_baixa` date NOT NULL,
  `observacao` text,
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_baixa`),
  KEY `fk_baixas_bovino` (`id_bovino`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Confirmar criação
DESCRIBE baixas;
