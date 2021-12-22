import inquirer from 'inquirer';
import { Hentai } from '../types';

const formatChoice = (hentai: Hentai) => {
  return {
    name: `[${hentai.id}] ${hentai.name} (Rank: ${hentai.monthlyRank})`,
    value: hentai
  };
};

const selectPopular = async (hentais: Hentai[]) => {
  const choices = hentais.map(formatChoice);
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'popular',
      message: 'Select a hentai from the list below: ',
      pageSize: 10,
      loop: false,
      choices
    }
  ]);
  return answers.popular as Hentai;
};

export default selectPopular;
