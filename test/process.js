import test from 'tape';
import process from '../src/process';

test('process', (t) => {
  t.test('call', (t) => {
    var a = process('p1.p2.method(arg)');
    t.equal(a.type, 'call');
    t.equal(a.method, 'method');
    t.deepEqual(a.methodArguments, ['arg']);
    t.deepEqual(a.propertyAccess, ['p1', 'p2']);
    t.end();
  });

  t.test('set', (t) => {
    var a = process('p1.p2 += arg');
    t.equal(a.type, 'set');
    t.equal(a.operator, '+=');
    t.deepEqual(a.value, 'arg');
    t.deepEqual(a.propertyAccess, ['p1', 'p2']);
    t.end();
  });

  t.test('p1.p2[p3].p4', (t) => {
    var a = process('p1.p2[p3].p4 = 1');
    t.deepEqual(a.propertyAccess, ['p1', 'p2', 'p3', 'p4']);
    t.equal(a.value, '1');
    t.end();
  });



  t.end();
});

