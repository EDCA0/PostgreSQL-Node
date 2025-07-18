import { MigrationInterface, QueryRunner } from "typeorm";

export class Customers1752878462759 implements MigrationInterface {
    name = 'Customers1752878462759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "customerName" character varying(20) NOT NULL, "customerLastName" character varying(30) NOT NULL, "customerPhone" character varying, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date, "userId" integer, CONSTRAINT "REL_b8512aa9cef03d90ed5744c94d" UNIQUE ("userId"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id")); COMMENT ON COLUMN "customers"."userId" IS 'id del usuario, generado automaticamente, es unico por usuario'`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "FK_b8512aa9cef03d90ed5744c94d7" FOREIGN KEY ("userId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_b8512aa9cef03d90ed5744c94d7"`);
        await queryRunner.query(`DROP TABLE "customers"`);
    }

}
