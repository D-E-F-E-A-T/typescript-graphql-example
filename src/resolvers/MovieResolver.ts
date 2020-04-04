import { Resolver, Query, Arg, ID, Mutation } from 'type-graphql';
import { movieService } from '../services';
import { MovieResponse, MovieInputCreate, MovieInputUpdate } from './graphql-types';

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
            message: 'ERROR-CREATE',
        },
    ],
};

const updateMoviesError: MovieResponse = {
    errors: [
        {
            path: 'create movie',
            message: 'ERROR-UPDATE',
        },
    ],
};

const deleteMoviesError: MovieResponse = {
    errors: [
        {
            path: 'create movie',
            message: 'ERROR-DELETE',
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
    async createMovie(@Arg('data') data: MovieInputCreate): Promise<MovieResponse> {
        const movie = await movieService.create(data);
        if (!movie) {
            return createMoviesError;
        }

        return { movies: [movie] };
    }

    @Mutation(_ => MovieResponse)
    async updateMovie(@Arg('data') data: MovieInputUpdate): Promise<MovieResponse> {
        const movie = await movieService.update(data);
        if (!movie) {
            return updateMoviesError;
        }

        return { movies: [movie] };
    }

    @Mutation(_ => MovieResponse)
    async deleteMovie(@Arg('id', _ => ID) id: number): Promise<MovieResponse> {
        const movie = await movieService.delete(id);
        if (!movie) {
            return deleteMoviesError;
        }

        return { movies: [movie] };
    }
}
