-- CreateTable
CREATE TABLE `pois` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `coordinateX` INTEGER UNSIGNED NOT NULL,
    `coordinateY` INTEGER UNSIGNED NOT NULL,
    `ativo` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO pois (nome, coordinateX, coordinateY, ativo)
VALUES
('Lanchonete', 27, 12, 0),
('Posto', 31, 18, 0),
('Joalheria', 15, 12, 0),
('Floricultura', 19, 21, 0),
('Pub', 12, 8, 0),
('Supermercado', 23, 6, 0),
('Churrascaria', 28, 2, 0);