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
        ref: github.context.ref,
      })
    ).data.download_url;

    console.log(url);

    const url_lfs = (
      await client.repos.getContent({
        ...github.context.repo,
        path: 'issue_lfs.txt',
        ref: github.context.ref,
      })
    ).data.download_url;

    console.log(url_lfs);
  } catch (error) {
    console.log(error);
    core.setFailed(error.message);
  }
};

main();
