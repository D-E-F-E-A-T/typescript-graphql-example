import { movieService } from '../src/services';
import { movie } from './utils';

import typeorm = require('typeorm');

describe('movieService => delete', () => {
    it('update movie', async () => {
        // @ts-ignore
        movieService._findMovieById = jest.fn().mockResolvedValue(movie);

        typeorm.getRepository = jest.fn().mockReturnValue({
            remove: jest.fn().mockResolvedValue('0x0'),
        });

        const result = await movieService.delete(movie.id);

        expect(result).toEqual(movie);
    });
});
