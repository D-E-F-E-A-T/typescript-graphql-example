import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { Field, Int, ObjectType, ID } from 'type-graphql';
import { Director } from './Director';

@ObjectType()
@Entity()
export class Movie extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;

    @Field(() => Int)
    @Column()
    minutes: number;

    @Field(() => Director)
    @ManyToOne(
        () => Director,
        director => director.movies,
    )
    director: Director;
}
