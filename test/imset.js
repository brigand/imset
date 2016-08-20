import test from "tape"
import imset from "../src"

test("imset", (t) => {
  t.test('simple set', (t) => {
    var a = {x: 1};
    var b = imset`${a}.x = 2`;
    t.equal(a.x, 1);
    t.deepEqual(b, {x: 2});
    t.end();
  });

  t.test('simple method', (t) => {
    var a = {x: {y: [1]}};
    var b = imset`${a}.x.y.push(2)`;
    t.deepEqual(a.x.y, [1]);
    t.deepEqual(b, {x: {y: [1, 2]}});
    t.end();
  });

});

