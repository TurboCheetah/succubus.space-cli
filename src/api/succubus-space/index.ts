import fetchLatest from './fetchLatest';
import fetchPopular from './fetchPopular';
import fetchTags from './fetchTags';
import fetchHentai from './fetchHentai';

import { ApiClient } from '../../types';

const succubusAPI: ApiClient = {
  fetchLatest,
  fetchPopular,
  fetchTags,
  fetchHentai
};

export default succubusAPI;
