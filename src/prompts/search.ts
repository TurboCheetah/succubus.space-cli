import inquirer from 'inquirer';

const search = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'hentaiSearch',
      message: 'Search for hentai: '
    }
  ]);
  return answers.hentaiSearch as string;
};

export default search;
