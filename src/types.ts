export interface Hentai {
  id: string;
  name: string;
  streamURL: string;
}

export interface ApiClient {
  fetchTags(tags: string): Promise<Hentai[]>;
  fetchHentai(keyword: string): Promise<Hentai[]>;
}

export enum Action {
  SEARCH,
  TAGS,
  QUIT
}
