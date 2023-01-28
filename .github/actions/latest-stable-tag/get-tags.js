import simpleGit from 'simple-git';

export async function getTags(repoPath) {
    const git = simpleGit(repoPath);
    const tagResult = await git.tags();
    return tagResult.all;
}
