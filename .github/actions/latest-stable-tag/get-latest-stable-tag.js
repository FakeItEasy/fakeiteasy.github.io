export function getLatestStableTag(tags) {
  const sortedTags = tags
    .filter(tag => !isPreRelease(tag))
    .sort(compareTagsDescending);
  const latestTag = sortedTags[0];
  return latestTag;
}

function isPreRelease(tag) {
    return tag.includes('-');
}

function compareTagsDescending(tag1, tag2) {
    return compareTags(tag2, tag1);
}

function compareTags(tag1, tag2) {
    // Note: assume major.minor.patch format
    // Pre-release tags should have already been excluded
    const parts1 = tag1.split('.');
    const parts2 = tag2.split('.');

    for (let i = 0; i < 3; i++) {
        let v1 = parseInt(parts1[i]);
        let v2 = parseInt(parts2[i]);
        if (isValidNumber(v1) && isValidNumber(v2)) {
            if (v1 < v2) return -1;
            if (v1 > v2) return 1;
        } else if (isValidNumber(v1) && !isValidNumber(v2)) {
            // tag1 is longer than tag2, consider tag1 greater
            return 1;
        } else if (!isValidNumber(v1) && isValidNumber(v2)) {
            // tag1 is shorter than tag2, consider tag2 greater
            return -1;
        } else {
            break;
        }
    }

    return 0;
}

function isValidNumber(n) {
    return !Number.isNaN(n);
}