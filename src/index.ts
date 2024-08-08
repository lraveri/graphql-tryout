import { ApolloServer } from 'apollo-server';
import {schema} from "./schema";
import { context } from './context';

const server = new ApolloServer({
    schema,
    context: () => context,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
