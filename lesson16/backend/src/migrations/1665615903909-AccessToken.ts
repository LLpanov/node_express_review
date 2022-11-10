import { MigrationInterface, QueryRunner } from 'typeorm';

export class AccessToken1665615903909 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE Tokens ADD COLUMN accessToken  VARCHAR(255) NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('AlTER TABLE Tokens DROP COLUMN accessToken ');
    }
}
