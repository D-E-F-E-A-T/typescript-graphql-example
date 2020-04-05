import { Resolver, Query, Arg, ID, Mutation } from 'type-graphql';
import { MovieResponse, MovieInputCreate, MovieInputUpdate } from './graphql-types';
import { Service, Inject } from 'typedi';
import { EntityService } from '../types';

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

@Service()
@Resolver()
export class MovieResolver {
    @Inject('movieservice')
    movieService: EntityService;

    @Query((_) => MovieResponse)
    async movies(@Arg('id', (_) => ID, { nullable: true }) id?: number): Promise<MovieResponse> {
        if (!id) {
            const movies = await this.movieService.getAll();
            if (movies.length === 0) {
                return moviesNotFound;
            }
            return { movies };
        }

        const movie = await this.movieService.getById(id!);

        if (!movie) {
            return moviesNotFound;
        }

        return { movies: [movie] };
    }

    @Mutation((_) => MovieResponse)
    async createMovie(@Arg('data') data: MovieInputCreate): Promise<MovieResponse> {
        const movie = await this.movieService.create(data);
        if (!movie) {
            return createMoviesError;
        }

        return { movies: [movie] };
    }

    @Mutation((_) => MovieResponse)
    async updateMovie(@Arg('data') data: MovieInputUpdate): Promise<MovieResponse> {
        const movie = await this.movieService.update(data);
        if (!movie) {
            return updateMoviesError;
        }

        return { movies: [movie] };
    }

    @Mutation((_) => MovieResponse)
    async deleteMovie(@Arg('id', (_) => ID) id: number): Promise<MovieResponse> {
        const movie = await this.movieService.delete(id);
        if (!movie) {
            return deleteMoviesError;
        }

        return { movies: [movie] };
    }
}
