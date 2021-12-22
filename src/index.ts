#!/usr/bin/env node

import ora from 'ora';

import VERSION from './version';

import { search, selectHentai, selectMainAction } from './prompts';
import { succubusAPI } from './api';
import { Hentai, Action } from './types';
import { init } from './sections';
import mpv from './mpv';

const LOGO = `
⣿⣿⣿⡷⠊⡢⡹⣦⡑⢂⢕⢂⢕⢂⢕⢂⠕⠔⠌⠝⠛⠶⠶⢶⣦⣄⢂⢕⢂⢕
⣿⣿⠏⣠⣾⣦⡐⢌⢿⣷⣦⣅⡑⠕⠡⠐⢿⠿⣛⠟⠛⠛⠛⠛⠡⢷⡈⢂⢕⢂
⠟⣡⣾⣿⣿⣿⣿⣦⣑⠝⢿⣿⣿⣿⣿⣿⡵⢁⣤⣶⣶⣿⢿⢿⢿⡟⢻⣤⢑⢂
⣾⣿⣿⡿⢟⣛⣻⣿⣿⣿⣦⣬⣙⣻⣿⣿⣷⣿⣿⢟⢝⢕⢕⢕⢕⢽⣿⣿⣷⣔
⣿⣿⠵⠚⠉⢀⣀⣀⣈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣗⢕⢕⢕⢕⢕⢕⣽⣿⣿⣿⣿
⢷⣂⣠⣴⣾⡿⡿⡻⡻⣿⣿⣴⣿⣿⣿⣿⣿⣿⣷⣵⣵⣵⣷⣿⣿⣿⣿⣿⣿⡿
⢌⠻⣿⡿⡫⡪⡪⡪⡪⣺⣿⣿⣿⣿⣿⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃
⠣⡁⠹⡪⡪⡪⡪⣪⣾⣿⣿⣿⣿⠋⠐⢉⢍⢄⢌⠻⣿⣿⣿⣿⣿⣿⣿⣿⠏⠈
⡣⡘⢄⠙⣾⣾⣾⣿⣿⣿⣿⣿⣿⡀⢐⢕⢕⢕⢕⢕⡘⣿⣿⣿⣿⣿⣿⠏⠠⠈
⠌⢊⢂⢣⠹⣿⣿⣿⣿⣿⣿⣿⣿⣧⢐⢕⢕⢕⢕⢕⢅⣿⣿⣿⣿⡿⢋⢜⠠⠈ 
`;

const apiClient = succubusAPI;

const loadEpisodeToMPV = async (hentai: Hentai) => {
  const loadEpisodeSpinner = ora(`[1/2] Setting up mpv...`).start();

  mpv().socket.on('mpv:file-loaded', () => {
    loadEpisodeSpinner.succeed(`[2/2] Success! Now playing ${hentai.name}`);
    mpv().socket.removeAllListeners('mpv:file-loaded');
  });

  try {
    await mpv().play(hentai.streamURL);
  } catch (e) {
    console.log(e);
    console.error(
      'An unexpected error has occured. Please check the stacktrace above for more information.'
    );
  }
};

const runCLI = async () => {
  console.log(LOGO);
  console.log('Succubus.Space');
  console.log(`Version: ${VERSION}`);

  await init();

  const mainAction = await selectMainAction();

  if (mainAction === Action.SEARCH) {
    let hentaiSearchResults: Hentai[] = [];
    do {
      const hentaiToSearch = await search();
      const hentaiSearchSpinner = ora('Fetching hentai...').start();
      hentaiSearchResults = await apiClient.fetchHentai(hentaiToSearch);
      if (hentaiSearchResults.length === 0) {
        hentaiSearchSpinner.fail('No results found :( Try searching again!');
      } else {
        hentaiSearchSpinner.succeed(
          `Successfully queried for results for: ${hentaiToSearch}`
        );
      }
    } while (hentaiSearchResults.length === 0);

    const hentai = await selectHentai(hentaiSearchResults);

    await loadEpisodeToMPV(hentai);
  }

  if (mainAction === Action.QUIT) {
    mpv().kill();
    return process.exit(0);
  }
};

runCLI();
