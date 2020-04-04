"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const movieService_1 = require("../src/services/movieService");
const Movie_1 = require("../src/entity/Movie");
const typeorm = require("typeorm");
describe('movieService => getAll', () => {
    it('getAll method passed', () => __awaiter(void 0, void 0, void 0, function* () {
        const fakeQueryBuilder = jest.fn().mockReturnValue({
            leftJoinAndSelect: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            getMany: jest.fn().mockResolvedValue('0x0'),
        });
        typeorm.getConnection = jest.fn().mockReturnValue({
            getRepository: jest.fn().mockReturnValue({ createQueryBuilder: fakeQueryBuilder }),
        });
        const result = yield movieService_1.movieService.getAll();
        expect(result).toEqual('0x0');
        const queryBuilder = typeorm.getConnection().getRepository(Movie_1.Movie).createQueryBuilder;
        expect(queryBuilder).toHaveBeenNthCalledWith(1, 'movie');
        expect(queryBuilder().getMany).toHaveBeenNthCalledWith(1);
    }));
});
//# sourceMappingURL=test.getAll.js.map