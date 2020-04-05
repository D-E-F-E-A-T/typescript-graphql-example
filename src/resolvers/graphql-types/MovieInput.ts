import { InputType, Field, Int, ID } from 'type-graphql';
import { MovieDataToCreate, MovieDataToUpdate } from '../../types';

@InputType()
export class MovieInputUpdate implements MovieDataToUpdate {
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
