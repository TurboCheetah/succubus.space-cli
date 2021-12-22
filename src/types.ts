export interface Hentai {
  id: string;
  name: string;
  streamURL: string;
}

export interface ApiClient {
  fetchHentai(keyword: string): Promise<Hentai[]>;
}

export enum Action {
  SEARCH,
  QUIT
}
