import * as core from '@actions/core';
import * as github from '@actions/github';

const main = async (): Promise<void> => {
  try {
    console.log('initialized');

    const token = core.getInput('GITHUB_TOKEN');
    const client = github.getOctokit(token);

    const url = (
      await client.repos.getContent({
        ...github.context.repo,
        path: 'issue.txt',
      })
    ).data.download_url;

    console.log(url);
  } catch (error) {
    console.log(error);
    core.setFailed(error.message);
  }
};

main();
