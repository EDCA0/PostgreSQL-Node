import { MigrationInterface, QueryRunner } from "typeorm";

export class Order1753125145380 implements MigrationInterface {
    name = 'Order1753125145380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("order_id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "customer_id" integer, CONSTRAINT "PK_cad55b3cb25b38be94d2ce831db" PRIMARY KEY ("order_id")); COMMENT ON COLUMN "orders"."order_id" IS 'orden, generado automaticamente, es unico por producto'; COMMENT ON COLUMN "orders"."created_at" IS 'Fecha y hora de creacion del Producto'; COMMENT ON COLUMN "orders"."updated_at" IS 'Fecha y hora de actualizacion del Producto'`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9"`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
