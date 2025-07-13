import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity('tasks')
export class Tasks extends BaseEntity{

    @PrimaryGeneratedColumn()
    declare id: number

    @Column({
        type: 'varchar',
        length: 255,
        nullable : false,
        comment: 'Titulo prueba'
    })
    declare title: string

    @Column({
        type: 'boolean',
        nullable: false,
        default: false
    })
    declare completed: boolean
}
