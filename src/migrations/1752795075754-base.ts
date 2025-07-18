import { MigrationInterface, QueryRunner } from "typeorm";

export class Base1752795075754 implements MigrationInterface {
    name = 'Base1752795075754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("user_id" SERIAL NOT NULL, "user_name" character varying(60) NOT NULL, "user_email" character varying(200) NOT NULL, "user_password" character varying(100) NOT NULL, "user_address" character varying(100) NOT NULL, "user_phone_number" character varying(30) NOT NULL, "user_gender" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_643a0bfb9391001cf11e581bdd6" UNIQUE ("user_email"), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id")); COMMENT ON COLUMN "users"."user_id" IS 'id del usuario, generado automaticamente, es unico por usuario'; COMMENT ON COLUMN "users"."user_name" IS 'nombre del usuario'; COMMENT ON COLUMN "users"."user_email" IS 'Correo del usuario, es unico'; COMMENT ON COLUMN "users"."user_password" IS 'contraseña del usuario'; COMMENT ON COLUMN "users"."user_address" IS 'Direccion del usuario'; COMMENT ON COLUMN "users"."user_phone_number" IS 'Numero de telefono del usuario'; COMMENT ON COLUMN "users"."created_at" IS 'Fecha y hora de creacion del usuario'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
