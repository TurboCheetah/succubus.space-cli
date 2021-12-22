import inquirer from 'inquirer';
import { Hentai } from '../types';

const formatChoice = (hentai: Hentai) => {
  return {
    name: `[${hentai.id}] ${hentai.name}`,
    value: hentai
  };
};

const selectLatest = async (hentais: Hentai[]) => {
  const choices = hentais.map(formatChoice);
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'latest',
      message: 'Select a hentai from the list below: ',
      pageSize: 10,
      loop: false,
      choices
    }
  ]);
  return answers.latest as Hentai;
};

export default selectLatest;
