import test from "tape"
import imset from "../src"
import assert from 'assert';
import {cloneDeep, isEqual} from 'lodash';

function prepareImmutableCheck(obj) {
  var cloned = cloneDeep(obj);
  return () => {
    assert.ok(isEqual(obj, cloned), 'there were no mutations');
  };
}

test("imset", (t) => {
  t.test('simple set', (t) => {
    var a = {x: 1};
    var ic = prepareImmutableCheck(a);
    var b = imset`${a}.x = 2`;
    t.deepEqual(b, {x: 2});
    ic();
    t.end();
  });

  t.test('set with dynamic path', (t) => {
    var a = {x: {y: 1}};
    var ic = prepareImmutableCheck(a);
    var b = imset`${a}.${'x'}.${'y'} = 2`;
    t.deepEqual(b, {x: {y: 2}});
    ic();
    t.end();
  });


  t.test('simple method', (t) => {
    var a = {x: {y: [1]}};
    var ic = prepareImmutableCheck(a);
    var b = imset`${a}.x.y.push(2)`;
    t.deepEqual(b, {x: {y: [1, 2]}});
    ic();
    t.end();
  });

  t.test('simple with string literal single quotes', (t) => {
    var a = {x: 1};
    var ic = prepareImmutableCheck(a);
    var b = imset`${a}.x = 'foo'`;
    t.deepEqual(b, {x: 'foo'});
    ic();
    t.end();
  });

  t.test('simple with string literal double quotes', (t) => {
    var a = {x: 1};
    var ic = prepareImmutableCheck(a);
    var b = imset`${a}.x = "foo"`;
    t.deepEqual(b, {x: 'foo'});
    ic();
    t.end();
  });

  t.test('simple with number literal', (t) => {
    var a = {x: 1};
    var ic = prepareImmutableCheck(a);
    var b = imset`${a}.x = 5`;
    t.deepEqual(b, {x: 5});
    ic();
    t.end();
  });

  t.test('simple with boolean true', (t) => {
    var a = {x: 1};
    var ic = prepareImmutableCheck(a);
    var b = imset`${a}.x = true`;
    t.deepEqual(b, {x: true});
    ic();
    t.end();
  });

  t.test('simple with boolean false', (t) => {
    var a = {x: 1};
    var ic = prepareImmutableCheck(a);
    var b = imset`${a}.x = false`;
    t.deepEqual(b, {x: false});
    ic();
    t.end();
  });
});
