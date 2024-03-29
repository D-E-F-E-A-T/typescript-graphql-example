import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';
import express from 'express';
import session from 'express-session';
import redis from 'redis';
import connectRedis from 'connect-redis';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { MovieResolver } from './resolvers';
import { Container } from 'typedi';
import { MovieService } from './services';

const RedisStore = connectRedis(session);
const RedisClient = redis.createClient();

(async () => {
    const app = express();

    app.use(
        session({
            store: new RedisStore({ client: RedisClient }),
            name: 'qid',
            secret: process.env.SESSION_SECRET || 'jfhsadhfisdfajksnfiaurfbisfbsbdfoasfbjb',
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
            },
        }),
    );

    // get options from ormconfig.js
    const dbOptions = await getConnectionOptions(process.env.NODE_ENV || 'development');
    await createConnection({ ...dbOptions, name: 'default' });

    Container.set({ id: 'MOVIE_SERVICE', factory: () => MovieService });

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [MovieResolver],
            validate: false,
            container: Container,
        }),
    });

    apolloServer.applyMiddleware({ app, cors: false });
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`server started at http://localhost:${port}/graphql`);
    });
})();
