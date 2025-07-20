import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('categories')
export class Categories extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: 'category_id',
        comment: 'id del usuario, generado automaticamente, es unico por usuario',
    })
    declare id: number;

    @Column({
        name: 'category_name',
        type: 'varchar',
        length: 60,
        nullable: false,
        comment: 'nombre de la categoria',
    })
    declare categoryName: string;

    @Column({
        name: 'category_image',
        type: 'varchar',
        length: 200,
        unique: false,
        nullable: false,
        comment: 'Imagen de la categoria',
    })
    declare categoryImage: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        comment: 'Fecha y hora de creacion de la categoria',
    })
    declare createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at', 
        type: 'timestamp',  
        comment: 'Fecha de última actualización del producto',
    })
    declare updatedAt : Date
}
