export interface Hentai {
  id: string;
  name: string;
  monthlyRank?: number;
  streamURL: string;
}

export interface ApiClient {
  fetchLatest(): Promise<Hentai[]>;
  fetchPopular(): Promise<Hentai[]>;
  fetchTags(tags: string): Promise<Hentai[]>;
  fetchHentai(keyword: string): Promise<Hentai[]>;
}

export enum Action {
  SEARCH,
  LATEST,
  POPULAR,
  TAGS,
  QUIT
}
