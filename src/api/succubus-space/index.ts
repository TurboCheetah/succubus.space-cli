import fetchLatest from './fetchLatest';
import fetchTags from './fetchTags';
import fetchHentai from './fetchHentai';

import { ApiClient } from '../../types';

const succubusAPI: ApiClient = {
  fetchLatest,
  fetchTags,
  fetchHentai
};

export default succubusAPI;
