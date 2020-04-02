import { ObjectType, Field } from 'type-graphql';
import { FieldError } from './FieldError';
import { Movie } from '../../entities';

@ObjectType()
export class MovieResponse {
    @Field(() => [Movie], { nullable: true })
    movies?: Movie[];

    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];
}
