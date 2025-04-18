-- CreateTable
CREATE TABLE `User` (
    `id` CHAR(36) NOT NULL,
    `namaLengkap` VARCHAR(40) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BlokirToken` (
    `id` CHAR(36) NOT NULL,
    `token` TEXT NOT NULL,
    `tanggalBlokir` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` CHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mahasiswa` (
    `id` CHAR(36) NOT NULL,
    `NAMA` CHAR(10) NOT NULL,
    `NIM` VARCHAR(100) NOT NULL,
    `YMD` DATE NOT NULL,

    UNIQUE INDEX `Mahasiswa_NAMA_key`(`NAMA`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BlokirToken` ADD CONSTRAINT `BlokirToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
