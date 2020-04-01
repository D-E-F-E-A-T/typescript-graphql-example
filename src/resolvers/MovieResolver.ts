import { Resolver, Arg, Mutation, Int, Query, UseMiddleware } from 'type-graphql';

import { Movie } from '../entity/Movie';

import { MovieOptions, MovieUpdateOptions, DirectorOptions } from '../graphql-types/MovieInput';

import { isAuth } from '../middleware/isAuth';

import { Director } from '../entity/Director';

@Resolver()
export class MovieResolver {
    @Query(() => [Movie])
    @UseMiddleware(isAuth)
    movies(): Promise<Movie[]> {
        return Movie.find({
            relations: ['director'],
        });
    }

    @Mutation(() => Movie)
    @UseMiddleware(isAuth)
    async createMovie(
        @Arg('movie', () => MovieOptions) movieOptions: MovieOptions,
        @Arg('director', () => DirectorOptions)
        directorOptions: DirectorOptions,
    ): Promise<Movie> {
        const director = await Director.create(directorOptions).save();
        const movie = Movie.create(movieOptions);
        movie.director = director;
        const output = await movie.save();
        return output;
    }

    @Mutation(() => Movie)
    @UseMiddleware(isAuth)
    async updateMovie(
        @Arg('id', () => Int) id: number,
        @Arg('options', () => MovieUpdateOptions) options: MovieUpdateOptions,
    ): Promise<Boolean> {
        await Movie.update(
            {
                id,
            },
            options,
        );
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteMovie(@Arg('id', () => Int) id: number): Promise<Boolean> {
        await Movie.delete({
            id,
        });
        return true;
    }
}
