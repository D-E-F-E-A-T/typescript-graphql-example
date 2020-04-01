import { BaseEntity, Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { Field, Int, ObjectType, ID } from 'type-graphql';
import { Movie } from './Movie';

@ObjectType()
@Entity()
export class Director extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID, { nullable: true })
    id: number;

    @Field()
    @Column()
    name: string;

    @Field(() => Int)
    @Column()
    age: number;

    @Field(() => [Movie])
    @OneToMany(
        () => Movie,
        movie => movie.director,
    )
    movies: Movie[];
}
