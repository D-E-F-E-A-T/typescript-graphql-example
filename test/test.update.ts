import { movieService } from '../src/services';
import { IMovieDataToUpdate } from '../src/types';
import { movie } from './utils';

import typeorm = require('typeorm');

describe('movieService => update', () => {
    it('update movie', async () => {
        // @ts-ignore
        movieService._findMovieById = jest.fn().mockResolvedValue(movie);

        typeorm.getRepository = jest.fn().mockReturnValue({
            save: jest.fn().mockResolvedValue('0x0'),
        });

        const data: IMovieDataToUpdate = {
            id: 1,
            title: 'updated title',
            minutes: 130,
        };

        const result = await movieService.update(data);

        expect(result).toEqual(data);
    });
});
