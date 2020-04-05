import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { MovieResolver } from '../src/resolvers';
import { MockMovie } from './mocks/mockMovieService';
import Container from 'typedi';
import { graphql } from 'graphql';

describe('Update movies', () => {
    const mutation = `
    mutation {
        updateMovie(
            data: {
                id: "1",
                title: "updatet Movie",
                minutes: 120
            }
        ) {
            movies {
                title
                minutes
            }
            errors {
                path
                message
            }
        }
    }
    `;

    // Expected result
    const expected = {
        data: {
            updateMovie: {
                errors: null as any,
                movies: [
                    {
                        title: 'updatet Movie',
                        minutes: 120,
                    },
                ],
            },
        },
    };

    Container.set({ id: 'MOVIE_SERVICE', factory: () => MockMovie });

    test('mutation: Update Movie', async () => {
        const schema = await buildSchema({
            resolvers: [MovieResolver],
            validate: false,
            container: Container,
        });

        const result = await graphql(schema, mutation, null);
        return expect(result).toEqual(expected);
    });
});
