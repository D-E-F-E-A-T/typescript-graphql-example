import { Resolver, Query, Arg, ID } from 'type-graphql';
import { movieService } from '../services/movieService';
import { MovieResponse } from './types/MovieResponse';

const moviesNotFound: MovieResponse = {
    errors: [
        {
            path: 'movies',
            message: 'NOT_FOUND',
        },
    ],
};

@Resolver()
export class MovieResolver {
    @Query(() => MovieResponse)
    async movies(@Arg('id', _ => ID, { nullable: true }) id?: number): Promise<MovieResponse> {
        if (!id) {
            const movies = await movieService.getAll();
            if (movies.length === 0) {
                return moviesNotFound;
            }
            return { movies };
        }

        const movie = await movieService.getById(id!);

        if (!movie) {
            return moviesNotFound;
        }

        return { movies: [movie] };
    }
}
