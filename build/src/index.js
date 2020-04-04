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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = __importDefault(require("redis"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const MovieResolver_1 = require("./resolvers/MovieResolver");
const RedisStore = connect_redis_1.default(express_session_1.default);
const RedisClient = redis_1.default.createClient();
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    app.use(express_session_1.default({
        store: new RedisStore({ client: RedisClient }),
        name: 'qid',
        secret: process.env.SESSION_SECRET || 'jfhsadhfisdfajksnfiaurfbisfbsbdfoasfbjb',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
        },
    }));
    // get options from ormconfig.js
    const dbOptions = yield typeorm_1.getConnectionOptions(process.env.NODE_ENV || 'development');
    yield typeorm_1.createConnection(Object.assign(Object.assign({}, dbOptions), { name: 'default' }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [MovieResolver_1.MovieResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res }),
    });
    apolloServer.applyMiddleware({ app, cors: false });
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`server started at http://localhost:${port}/graphql`);
    });
}))();
//# sourceMappingURL=index.js.map