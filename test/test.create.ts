import { movieService } from '../src/services/movieService';
import { movie } from './utils';

import typeorm = require('typeorm');
import { Movie } from '../src/entities';

describe('movieService => create', () => {
    it('create movie', async () => {
        // @ts-ignore
        movieService._findMovieById = jest.fn().mockResolvedValue('0x0');

        typeorm.getRepository = jest.fn().mockReturnValue({
            save: jest.fn().mockResolvedValue(movie),
        });

        const dataToCreate = new Movie();
        Object.assign(dataToCreate, movie);
        const result = await movieService.create(dataToCreate);

        expect(result).toEqual('0x0');

        expect(typeorm.getRepository).toHaveBeenNthCalledWith(1, Movie);
        expect(typeorm.getRepository(Movie).save).toHaveBeenNthCalledWith(1, movie);
    });
});
