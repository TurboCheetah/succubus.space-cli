import { GraphQLClient } from 'graphql-request';

const BASE_URL = 'https://api.succubus.space';

const succubusClient = new GraphQLClient(`${BASE_URL}/graphql`);

export default succubusClient;
