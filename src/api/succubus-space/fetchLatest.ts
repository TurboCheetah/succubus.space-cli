import { gql } from 'graphql-request';
import succubusClient from './succubus';
import { Hentai } from '../../types';

const fetchHentai = async (): Promise<Hentai[]> => {
  const query = gql`
    query recent {
      recent(amount: 10) {
        id
        name
        streamURL
      }
    }
  `;

  const { recent } = await succubusClient.request(query);

  return recent as Hentai[];
};

export default fetchHentai;
