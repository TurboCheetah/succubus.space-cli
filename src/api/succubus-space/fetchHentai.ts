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
          streams {
            _360p
            _480p
            _720p
            _1080p
          }
        }
      }
    `;

    variables = { slug: keyword };
  } else {
    query = gql`
      query hentai($id: Float!) {
        hentai(id: $id) {
          id
          name
          streams {
            _360p
            _480p
            _720p
            _1080p
          }
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
