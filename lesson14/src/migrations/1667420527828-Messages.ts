import { MigrationInterface, QueryRunner } from 'typeorm';

export class Messages1667420527828 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Messages (
                id INT PRIMARY KEY AUTO_INCREMENT,
                message VARCHAR(255) NOT NULL,
                userId INT NOT NULL,
                FOREIGN KEY (userId) REFERENCES Users (id),
                createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deletedAt TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
    DROP TABLE IF EXISTS Messages`);
    }
}
