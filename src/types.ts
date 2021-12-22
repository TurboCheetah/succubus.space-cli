export interface Hentai {
  id: string;
  name: string;
  streamURL: string;
}

export interface ApiClient {
  fetchLatest(): Promise<Hentai[]>;
  fetchTags(tags: string): Promise<Hentai[]>;
  fetchHentai(keyword: string): Promise<Hentai[]>;
}

export enum Action {
  SEARCH,
  LATEST,
  TAGS,
  QUIT
}
