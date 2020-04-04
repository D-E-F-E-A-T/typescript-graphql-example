import { getConnection, createQueryBuilder, getRepository } from 'typeorm';
import { Movie } from '../entities';
import { MovieDataToCreate, IMovieDataToUpdate } from '../types';

class MovieService {
    public getAll(): Promise<Movie[]> {
        return getConnection()
            .getRepository(Movie)
            .createQueryBuilder('movie')
            .getMany();
    }

    public async create(data: MovieDataToCreate): Promise<Movie | undefined> {
        const newMovie = new Movie();
        Object.assign(newMovie, data);
        const movie = await getRepository(Movie).save(newMovie);

        return await this._findMovieById(movie.id);
    }

    public async update({ id, ...data }: IMovieDataToUpdate): Promise<Movie | undefined> {
        const movie = await this._findMovieById(id);
        if (!movie) {
            return undefined;
        }

        Object.assign(movie, data);
        await getRepository(Movie).save(movie);

        return movie;
    }

    public async delete(id: number): Promise<Movie | undefined> {
        const movie = await this._findMovieById(id);
        if (!movie) {
            return undefined;
        }

        await getRepository(Movie).remove(movie);

        return movie;
    }

    public getById(id: number): Promise<Movie | undefined> {
        return this._findMovieById(id);
    }

    private _findMovieById(id: number): Promise<Movie | undefined> {
        return createQueryBuilder()
            .select(['movie'])
            .from(Movie, 'movie')
            .where('movie.id = :id', { id })
            .getOne();
    }
}

export const movieService = new MovieService();
