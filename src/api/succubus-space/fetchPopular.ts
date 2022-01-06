import { gql } from 'graphql-request';
import succubusClient from './succubus';
import { Hentai } from '../../types';

const fetchPopular = async (): Promise<Hentai[]> => {
  const query = gql`
    query popular {
      popularHentai(amount: 10) {
        id
        name
        monthlyRank
        streams {
          _360p
          _480p
          _720p
          _1080p
        }
      }
    }
  `;

  const { popularHentai } = await succubusClient.request(query);

  return popularHentai as Hentai[];
};

export default fetchPopular;
