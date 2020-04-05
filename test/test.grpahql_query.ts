import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { MovieResolver } from '../src/resolvers';
import { MockMovie } from './mocks/mockMovieService';
import Container from 'typedi';
import { graphql } from 'graphql';

describe('Query movies', () => {
    const query = `
            query {
                movies {
                movies {
                    id
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
            movies: {
                errors: null as any,
                movies: [
                    {
                        id: '1',
                        title: 'Interstellar',
                        minutes: 120,
                    },
                    {
                        id: '2',
                        title: 'Mad Max: Fury Road',
                        minutes: 360,
                    },
                ],
            },
        },
    };

    Container.set({ id: 'MOVIE_SERVICE', factory: () => MockMovie });

    test('query: All Movies', async () => {
        const schema = await buildSchema({
            resolvers: [MovieResolver],
            validate: false,
            container: Container,
        });

        const result = await graphql(schema, query, null);
        return expect(result).toEqual(expected);
    });
});
