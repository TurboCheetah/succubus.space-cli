export interface Hentai {
  id: string;
  name: string;
  monthlyRank: number;
  streams: {
    _360p: string;
    _480p: string;
    _720p: string;
    _1080p: string;
  };
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
