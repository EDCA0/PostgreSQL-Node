import { MigrationInterface, QueryRunner } from "typeorm";

export class Products1753019845914 implements MigrationInterface {
    name = 'Products1753019845914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("category_id" SERIAL NOT NULL, "category_name" character varying(60) NOT NULL, "category_image" character varying(200) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_51615bef2cea22812d0dcab6e18" PRIMARY KEY ("category_id")); COMMENT ON COLUMN "categories"."category_id" IS 'id del usuario, generado automaticamente, es unico por usuario'; COMMENT ON COLUMN "categories"."category_name" IS 'nombre de la categoria'; COMMENT ON COLUMN "categories"."category_image" IS 'Imagen de la categoria'; COMMENT ON COLUMN "categories"."created_at" IS 'Fecha y hora de creacion de la categoria'; COMMENT ON COLUMN "categories"."updated_at" IS 'Fecha de última actualización del producto'`);
        await queryRunner.query(`CREATE TABLE "products" ("product_id" SERIAL NOT NULL, "product_name" character varying(60) NOT NULL, "product_price" integer NOT NULL, "product_description" character varying(100) NOT NULL, "product_image" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "category_id" integer, CONSTRAINT "PK_a8940a4bf3b90bd7ac15c8f4dd9" PRIMARY KEY ("product_id")); COMMENT ON COLUMN "products"."product_id" IS 'Producto, generado automaticamente, es unico por producto'; COMMENT ON COLUMN "products"."product_name" IS 'nombre del usuario'; COMMENT ON COLUMN "products"."product_price" IS 'Precio del producto'; COMMENT ON COLUMN "products"."product_description" IS 'descripcion del producto'; COMMENT ON COLUMN "products"."product_image" IS 'Imagen del producto'; COMMENT ON COLUMN "products"."created_at" IS 'Fecha y hora de creacion del Producto'; COMMENT ON COLUMN "products"."updated_at" IS 'Fecha y hora de actualizacion del Producto'; COMMENT ON COLUMN "products"."category_id" IS 'id del usuario, generado automaticamente, es unico por usuario'`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."updated_at" IS 'Fecha y hora de actualizacion del usuario'`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`COMMENT ON COLUMN "customers"."created_at" IS 'Fecha y hora de creacion del usuario'`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`COMMENT ON COLUMN "customers"."updated_at" IS 'Fecha y hora de actualizacion del usuario'`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
        await queryRunner.query(`COMMENT ON COLUMN "customers"."updated_at" IS 'Fecha y hora de actualizacion del usuario'`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "updated_at"`);
        await queryRunner.query(`COMMENT ON COLUMN "customers"."created_at" IS 'Fecha y hora de creacion del usuario'`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "created_at"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."updated_at" IS 'Fecha y hora de actualizacion del usuario'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "updatedAt" date`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "createdAt" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
