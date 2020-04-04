import { Resolver, Query, Arg, ID, Mutation } from 'type-graphql';
import { movieService } from '../services/movieService';
import { MovieResponse } from './types/MovieResponse';
import { Movie } from '../entities';
import { MovieInput } from './types/MovieInput';

const moviesNotFound: MovieResponse = {
    errors: [
        {
            path: 'movies',
            message: 'NOT_FOUND',
        },
    ],
};

const createMoviesError: MovieResponse = {
    errors: [
        {
            path: 'create movie',
            message: 'ERROR',
        },
    ],
};

@Resolver()
export class MovieResolver {
    @Query(_ => MovieResponse)
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

    @Mutation(_ => MovieResponse)
    async createMovie(@Arg('data') data: MovieInput): Promise<MovieResponse> {
        const movie = await movieService.create(<Movie>data);
        if (!movie) {
            return createMoviesError;
        }

        return { movies: [movie] };
    }
}
