import { getConnection, createQueryBuilder } from 'typeorm';
import { Movie } from '../entities';

class MovieService {
    public getAll(): Promise<Movie[]> {
        return getConnection()
            .getRepository(Movie)
            .createQueryBuilder('movie')
            .getMany();
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
