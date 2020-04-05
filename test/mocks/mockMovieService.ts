import { Movie } from '../../src/entities';
import { Service } from 'typedi';
import { EntityService, MovieDataToCreate, MovieDataToUpdate } from '../../src/types';

const movies = [
    { id: 1, title: 'Interstellar', minutes: 120 },
    { id: 2, title: 'Mad Max: Fury Road', minutes: 360 },
];

const mockMovies: Movie[] = [];

for (const movie of movies) {
    const movieObject = new Movie();
    Object.assign(movieObject, movie);
    mockMovies.push(movieObject);
}

@Service('movieservice')
export class MockMovie implements EntityService {
    private _mockMovies: Movie[] = mockMovies;

    create(data: MovieDataToCreate) {
        const movie = new Movie();
        Object.assign(movie, data);
        this._mockMovies.push(movie);
        const promis = new Promise((resolve: (movie: Movie) => void) => {
            resolve(movie);
        });

        return promis;
    }

    update(data: MovieDataToUpdate) {
        const index = this._mockMovies.findIndex((element) => element.id == data.id);

        //index == -1
        if (~index === 0) {
            let promis = new Promise((resolve: (movie: undefined) => void) => {
                resolve(undefined);
            });

            return promis;
        }

        const movie = this._mockMovies[index];
        console.log(movie);
        movie.title = data.title;
        movie.minutes = data.minutes;

        let promis = new Promise((resolve: (movie: Movie) => void) => {
            resolve(movie);
        });

        return promis;
    }
    delete(_id: number): Promise<Movie> {
        throw new Error('Method not implemented.');
    }
    getById(_id: number): Promise<Movie> {
        throw new Error('Method not implemented.');
    }
    getAll = jest.fn().mockResolvedValue(this._mockMovies);
}
