import { MigrationInterface, QueryRunner } from "typeorm";

export class Prueba11752413413371 implements MigrationInterface {
    name = 'Prueba11752413413371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "completed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id")); COMMENT ON COLUMN "tasks"."title" IS 'Titulo prueba'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tasks"`);
    }

}
