import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { MovieResolver } from '../src/resolvers';
import { MockMovie } from './mocks/mockMovieService';
import Container from 'typedi';
import { graphql } from 'graphql';

describe('Create movies', () => {
    const mutation = `
        mutation {
            createMovie(
                data: {
                    title: "ping",
                    minutes: 123
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
            createMovie: {
                errors: null as any,
                movies: [
                    {
                        title: 'ping',
                        minutes: 123,
                    },
                ],
            },
        },
    };

    Container.set({ id: 'MOVIE_SERVICE', factory: () => MockMovie });

    test('mutation: Create Movie', async () => {
        const schema = await buildSchema({
            resolvers: [MovieResolver],
            validate: false,
            container: Container,
        });

        const result = await graphql(schema, mutation, null);
        return expect(result).toEqual(expected);
    });
});
