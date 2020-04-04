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
const typeorm_1 = require("typeorm");
const Movie_1 = require("../entity/Movie");
class MovieService {
    getAll() {
        return typeorm_1.getConnection()
            .getRepository(Movie_1.Movie)
            .createQueryBuilder('movie')
            .getMany();
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newMovie = new Movie_1.Movie();
            Object.assign(newMovie, data);
            const movie = yield typeorm_1.getRepository(Movie_1.Movie).save(newMovie);
            return yield this._findMovieById(movie.id);
        });
    }
    getById(id) {
        return this._findMovieById(id);
    }
    _findMovieById(id) {
        return typeorm_1.createQueryBuilder()
            .select(['movie'])
            .from(Movie_1.Movie, 'movie')
            .where('movie.id = :id', { id })
            .getOne();
    }
}
exports.movieService = new MovieService();
//# sourceMappingURL=movieService.js.map