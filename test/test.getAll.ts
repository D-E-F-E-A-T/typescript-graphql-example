import { Movie } from '../src/entities';

import typeorm = require('typeorm');
import { EntityService } from '../src/types';
import { MovieService } from '../src/services';

describe('movieService => getAll', () => {
    let movieService: EntityService;

    beforeAll(() => {
        movieService = new MovieService();
    });

    it('getAll method passed', async () => {
        const fakeQueryBuilder = jest.fn().mockReturnValue({
            leftJoinAndSelect: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            getMany: jest.fn().mockResolvedValue('0x0'),
        });

        typeorm.getConnection = jest.fn().mockReturnValue({
            getRepository: jest.fn().mockReturnValue({ createQueryBuilder: fakeQueryBuilder }),
        });
        const result = await movieService.getAll();

        expect(result).toEqual('0x0');

        const queryBuilder = typeorm.getConnection().getRepository(Movie).createQueryBuilder;
        expect(queryBuilder).toHaveBeenNthCalledWith(1, 'movie');
        expect(queryBuilder().getMany).toHaveBeenNthCalledWith(1);
    });
});
