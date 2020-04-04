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
const utils_1 = require("./utils");
const typeorm = require("typeorm");
const Movie_1 = require("../src/entity/Movie");
describe('movieService => create', () => {
    it('create movie', () => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        movieService_1.movieService._findMovieById = jest.fn().mockResolvedValue('0x0');
        typeorm.getRepository = jest.fn().mockReturnValue({
            save: jest.fn().mockResolvedValue(utils_1.movie),
        });
        const dataToCreate = new Movie_1.Movie();
        Object.assign(dataToCreate, utils_1.movie);
        const result = yield movieService_1.movieService.create(dataToCreate);
        expect(result).toEqual('0x0');
        expect(typeorm.getRepository).toHaveBeenNthCalledWith(1, Movie_1.Movie);
        expect(typeorm.getRepository(Movie_1.Movie).save).toHaveBeenNthCalledWith(1, utils_1.movie);
    }));
});
//# sourceMappingURL=test.create.js.map