import inquirer from 'inquirer';
import { Action } from '../types';

const selectMainAction = async () => {
  const choices = [
    {
      name: 'Search for hentai',
      value: Action.SEARCH
    },
    {
      name: 'View recently uploaded hentai',
      value: Action.LATEST
    },
    {
      name: 'View popular hentai this month',
      value: Action.POPULAR
    },
    {
      name: 'Search for tags',
      value: Action.TAGS
    },
    {
      name: 'Quit',
      value: Action.QUIT
    }
  ];

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'mainAction',
      message: 'Select an option: ',
      choices
    }
  ]);

  return answers.mainAction as Action;
};

export default selectMainAction;
