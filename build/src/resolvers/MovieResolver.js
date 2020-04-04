"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const type_graphql_1 = require("type-graphql");
const movieService_1 = require("../services/movieService");
const MovieResponse_1 = require("./types/MovieResponse");
const MovieInput_1 = require("./types/MovieInput");
const moviesNotFound = {
    errors: [
        {
            path: 'movies',
            message: 'NOT_FOUND',
        },
    ],
};
const createMoviesError = {
    errors: [
        {
            path: 'create movie',
            message: 'ERROR',
        },
    ],
};
let MovieResolver = class MovieResolver {
    movies(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                const movies = yield movieService_1.movieService.getAll();
                if (movies.length === 0) {
                    return moviesNotFound;
                }
                return { movies };
            }
            const movie = yield movieService_1.movieService.getById(id);
            if (!movie) {
                return moviesNotFound;
            }
            return { movies: [movie] };
        });
    }
    createMovie(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const movie = yield movieService_1.movieService.create(data);
            if (!movie) {
                return createMoviesError;
            }
            return { movies: [movie] };
        });
    }
};
__decorate([
    type_graphql_1.Query(_ => MovieResponse_1.MovieResponse),
    __param(0, type_graphql_1.Arg('id', _ => type_graphql_1.ID, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MovieResolver.prototype, "movies", null);
__decorate([
    type_graphql_1.Mutation(_ => MovieResponse_1.MovieResponse),
    __param(0, type_graphql_1.Arg('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MovieInput_1.MovieInput]),
    __metadata("design:returntype", Promise)
], MovieResolver.prototype, "createMovie", null);
MovieResolver = __decorate([
    type_graphql_1.Resolver()
], MovieResolver);
exports.MovieResolver = MovieResolver;
//# sourceMappingURL=MovieResolver.js.map