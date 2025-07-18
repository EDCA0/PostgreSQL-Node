import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRole1752796681151 implements MigrationInterface {
    name = 'UserRole1752796681151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "user_role" character varying NOT NULL DEFAULT 'customer'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user_role"`);
    }

}
