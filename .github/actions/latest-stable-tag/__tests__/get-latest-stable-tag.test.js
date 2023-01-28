import { getLatestStableTag } from '../get-latest-stable-tag.js';

describe('getLatestTag', () => {

  const SIMPLE_TAGS = [ '1.0.0', '1.0.1', '1.1.0', '1.2.0', '1.2.1' ];
  const TAGS_WITH_TWO_DIGIT_PATCH = [ '1.0.0', '1.1.0', '1.2.0', '1.2.2', '1.2.10' ];
  const TAGS_WITH_TWO_DIGIT_MINOR = [ '1.0.0', '1.1.0', '1.2.0', '1.2.2', '1.10.0' ];
  const TAGS_WITH_TWO_DIGIT_MAJOR = [ '1.0.0', '2.0.0', '10.0.0' ];
  const MIXED_STABLE_AND_PRERELEASE_TAGS = [ '1.0.0', '1.1.0', '1.2.0-alpha.1' ];
  const TAGS_WITH_ZERO_MAJOR = [ '0.0.1', '0.1.2', '0.1.0' ];
  const TAGS_WITH_DIFFERENT_LENGTHS = [ '1.0', '1.0.1', '1' ];
  const ONLY_PRERELEASE_TAGS = [ '1.2.0-alpha.1', '1.2.0-alpha.2', '1.2.0-beta.1' ];
  const EMPTY_TAGS = [];

  test.each([
    [ SIMPLE_TAGS, '1.2.1' ],
    [ TAGS_WITH_TWO_DIGIT_PATCH, '1.2.10' ],
    [ TAGS_WITH_TWO_DIGIT_MINOR, '1.10.0' ],
    [ TAGS_WITH_TWO_DIGIT_MAJOR, '10.0.0' ],
    [ MIXED_STABLE_AND_PRERELEASE_TAGS, '1.1.0' ],
    [ TAGS_WITH_ZERO_MAJOR, '0.1.2' ],
    [ TAGS_WITH_DIFFERENT_LENGTHS, '1.0.1' ],
    [ ONLY_PRERELEASE_TAGS, undefined ],
    [ EMPTY_TAGS, undefined ],
  ])('Given the tags %p, when getLatestTag is called, then it returns %p', (tags, expected) => {
    const actual = getLatestStableTag(tags);
    expect(actual).toEqual(expected);
  });

});
