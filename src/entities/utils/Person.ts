import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Person extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column({
        unique: true
    })
    email: string

    @Column({
        unique: true,
        length: 10,
    })
    card_number: string
}