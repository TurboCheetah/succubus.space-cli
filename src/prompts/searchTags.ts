import inquirer from 'inquirer';

const searchTags = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'tagSearch',
      message:
        'Search for tags (separate each with a comma ex. vanilla, big boobs): '
    }
  ]);
  return answers.tagSearch as string;
};

export default searchTags;
