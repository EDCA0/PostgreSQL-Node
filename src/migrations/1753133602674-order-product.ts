import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderProduct1753133602674 implements MigrationInterface {
    name = 'OrderProduct1753133602674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order-product " ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "order_id" integer, "product_id" integer, CONSTRAINT "PK_bb1db39b0b93ffb2fded9ec4f79" PRIMARY KEY ("id")); COMMENT ON COLUMN "order-product "."id" IS 'id de la linea de pedido, generado automaticamente'; COMMENT ON COLUMN "order-product "."amount" IS 'Cantidad del producto en esta linea de pedido'; COMMENT ON COLUMN "order-product "."created_at" IS 'Fecha y hora de creacion del Producto'; COMMENT ON COLUMN "order-product "."updated_at" IS 'Fecha y hora de actualizacion del Producto'; COMMENT ON COLUMN "order-product "."order_id" IS 'identificador único para cada orden de compra'; COMMENT ON COLUMN "order-product "."product_id" IS 'Producto, generado automaticamente, es unico por producto'`);
        await queryRunner.query(`COMMENT ON COLUMN "products"."product_name" IS 'nombre del producto'`);
        await queryRunner.query(`COMMENT ON COLUMN "orders"."order_id" IS 'identificador único para cada orden de compra'`);
        await queryRunner.query(`ALTER TABLE "order-product " ADD CONSTRAINT "FK_7a2fa6dd5c6474678b7aca71c49" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order-product " ADD CONSTRAINT "FK_d309af66966b14deb5237a6b973" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order-product " DROP CONSTRAINT "FK_d309af66966b14deb5237a6b973"`);
        await queryRunner.query(`ALTER TABLE "order-product " DROP CONSTRAINT "FK_7a2fa6dd5c6474678b7aca71c49"`);
        await queryRunner.query(`COMMENT ON COLUMN "orders"."order_id" IS 'orden, generado automaticamente, es unico por producto'`);
        await queryRunner.query(`COMMENT ON COLUMN "products"."product_name" IS 'nombre del usuario'`);
        await queryRunner.query(`DROP TABLE "order-product "`);
    }

}
