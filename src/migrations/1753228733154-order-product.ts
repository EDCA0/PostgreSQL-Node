import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderProduct1753228733154 implements MigrationInterface {
    name = 'OrderProduct1753228733154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order-product" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "order_id" integer, "product_id" integer, CONSTRAINT "PK_6d463631a057f91ce0ccb66693a" PRIMARY KEY ("id")); COMMENT ON COLUMN "order-product"."id" IS 'id de la linea de pedido, generado automaticamente'; COMMENT ON COLUMN "order-product"."amount" IS 'Cantidad del producto en esta linea de pedido'; COMMENT ON COLUMN "order-product"."created_at" IS 'Fecha y hora de creacion del Producto'; COMMENT ON COLUMN "order-product"."updated_at" IS 'Fecha y hora de actualizacion del Producto'; COMMENT ON COLUMN "order-product"."order_id" IS 'identificador único para cada orden de compra'; COMMENT ON COLUMN "order-product"."product_id" IS 'Producto, generado automaticamente, es unico por producto'`);
        await queryRunner.query(`ALTER TABLE "order-product" ADD CONSTRAINT "FK_4e7b8171fd074f137dbc38e2842" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order-product" ADD CONSTRAINT "FK_0c2a6f5423568e421be618510ca" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order-product" DROP CONSTRAINT "FK_0c2a6f5423568e421be618510ca"`);
        await queryRunner.query(`ALTER TABLE "order-product" DROP CONSTRAINT "FK_4e7b8171fd074f137dbc38e2842"`);
        await queryRunner.query(`DROP TABLE "order-product"`);
    }

}
