import { MovieService } from '../src/services';
import { MovieDataToUpdate, EntityService } from '../src/types';
import { movie } from './utils';

import typeorm = require('typeorm');

describe('movieService => update', () => {
    let movieService: EntityService;

    beforeAll(() => {
        movieService = new MovieService();
    });

    it('update movie', async () => {
        // @ts-ignore
        movieService._findMovieById = jest.fn().mockResolvedValue(movie);

        typeorm.getRepository = jest.fn().mockReturnValue({
            save: jest.fn().mockResolvedValue('0x0'),
        });

        const data: MovieDataToUpdate = {
            id: 1,
            title: 'updated title',
            minutes: 130,
        };

        const result = await movieService.update(data);

        expect(result).toEqual(data);
    });
});
