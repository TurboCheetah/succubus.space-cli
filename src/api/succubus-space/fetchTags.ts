import { gql } from 'graphql-request';
import succubusClient from './succubus';
import { Hentai } from '../../types';

const fetchHentai = async (tags: string): Promise<Hentai[]> => {
  const formattedTags = tags.split(', ');

  const query = gql`
    query hentai($tags: [String!]) {
      tags(tags: $tags) {
        id
        name
        streamURL
      }
    }
  `;

  const variables = { tags: formattedTags };

  const data = await succubusClient.request(query, variables);

  return data.tags as Hentai[];
};

export default fetchHentai;