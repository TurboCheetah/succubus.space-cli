import fetchHentai from './fetchHentai';

import { ApiClient } from '../../types';
import fetchTags from './fetchTags';

const succubusAPI: ApiClient = {
  fetchTags,
  fetchHentai
};

export default succubusAPI;
