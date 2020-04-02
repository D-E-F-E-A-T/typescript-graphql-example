import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Field, Int, ObjectType, ID } from 'type-graphql';

@ObjectType()
@Entity()
export class Movie extends BaseEntity {
    @Field(() => ID, { nullable: true })
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;

    @Field(() => Int)
    @Column()
    minutes: number;
}
