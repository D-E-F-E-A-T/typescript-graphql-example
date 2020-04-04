import { InputType, Field, Int, ID } from 'type-graphql';
import { MovieDataToCreate, IMovieDataToUpdate } from '../../types';

@InputType()
export class MovieInputUpdate implements IMovieDataToUpdate {
    @Field(_ => ID)
    id: number;

    @Field()
    title: string;

    @Field(_ => Int)
    minutes: number;
}

@InputType()
export class MovieInputCreate implements MovieDataToCreate {
    @Field()
    title: string;

    @Field(_ => Int)
    minutes: number;
}
