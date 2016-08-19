import test from "tape"
import imset from "../src"

test("imset", (t) => {
  t.test('basics', (t) => {
    var a = {x: 1};
    var b = imset`${a}.x = 2`;
    t.deepEqual(b, {x: 2});
    t.end();
  });
});
