import * as core from '@actions/core';
import { getLatestStableTag } from './get-latest-stable-tag.js';
import { getTags } from './get-tags.js';

await run();

async function run() {
    try {
      const repoPath = core.getInput('repo-path');
      const tags = await getTags(repoPath);
      const latestTag = getLatestStableTag(tags);
      core.setOutput("latest-tag", latestTag);
    } catch (error) {
      core.setFailed(error.message);
    }
}

// for manual testing
async function runFromCommandLine() {
    const repoPath = process.argv[2];
    const tags = await getTags(repoPath);
    const latestTag = getLatestStableTag(tags);
    console.log(latestTag);
}
