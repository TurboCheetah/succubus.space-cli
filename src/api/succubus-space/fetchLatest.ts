import { gql } from 'graphql-request';
import succubusClient from './succubus';
import { Hentai } from '../../types';

const fetchHentai = async (): Promise<Hentai[]> => {
  const query = gql`
    query recent {
      recent(amount: 10) {
        id
        name
        streamURL {
          _360p
          _480p
          _720p
          _1080p
        }
      }
    }
  `;

  const { recent } = await succubusClient.request(query);

  return recent as Hentai[];
};

export default fetchHentai;
