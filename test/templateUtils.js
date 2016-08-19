import test from 'tape';
import {joinWithPlaceholders} from '../src/templateUtils';

test('joinWithPlaceholdesr', (t) => {
  var {string: a, map} = joinWithPlaceholders({
    raw: [
      '',
      '.x.',
      '.y',
    ]
  }, ['a', 'b']);
  var b = 'PLACEHOLDER_0.x.PLACEHOLDER_1.y';
  t.equal(a, b);
  t.deepEqual(map, {PLACEHOLDER_0: 'a', PLACEHOLDER_1: 'b'});
  t.end();
});

