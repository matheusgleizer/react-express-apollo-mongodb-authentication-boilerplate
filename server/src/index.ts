import 'dotenv/config';
import express, { Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { db } from './database/mongodb';
import typeDefs from './apollo-graphql/schema';
import resolvers from './apollo-graphql/resolvers';
import {
  AuthenticationError,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import { getUserByToken } from './auth/auth';
// import cors from 'cors';

const { PORT } = process.env;

const app: express.Application = express();
const port: string | number = PORT || 5050;

// app.use(cors());

interface CorsOpts {
  origin: string;
  credentials: boolean;
}

const cors: CorsOpts = {
  credentials: true,
  origin: 'http://localhost:3000/',
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  context: ({ req }) => {
    try {
      const token = req.cookies('auth-token');

      if (!token) {
        return { user: null };
      }

      const user = getUserByToken(token);

      return { user, isAuthenticated: true, token };
    } catch (err) {
      return new AuthenticationError('User is not authenticated');
    }
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  // formatResponse: (response, requestContext) => {},
});

const startServer = async (): Promise<void> => {
  try {
    await server.start();
    server.applyMiddleware({
      app,
      path: '/graphql',
      cors
    });
    app.listen(port, () => {
      console.log(`Express server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

db.connect().then((): Promise<void> => startServer());
