import { gql } from 'graphql-request';
import succubusClient from './succubus';
import { Hentai } from '../../types';

const fetchHentai = async (keyword: string): Promise<Hentai[]> => {
  let query;
  let variables;

  if (isNaN(+keyword)) {
    query = gql`
      query hentai($slug: String!) {
        series(slug: $slug) {
          id
          name
          streamURL
        }
      }
    `;

    variables = { slug: keyword };
  } else {
    query = gql`
      query hentai($id: Int!) {
        hentai(id: $id) {
          id
          name
          streamURL
        }
      }
    `;

    variables = { id: +keyword };
  }

  const data = await succubusClient.request(query, variables);
  if (data.hentai) return [data.hentai] as Hentai[];

  return data.series as Hentai[];
};

export default fetchHentai;
