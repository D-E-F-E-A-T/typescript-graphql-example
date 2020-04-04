import { Movie } from '../../entities';
import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class MovieInput implements Partial<Movie> {
    @Field()
    title: string;

    @Field(_ => Int)
    minutes: number;
}
