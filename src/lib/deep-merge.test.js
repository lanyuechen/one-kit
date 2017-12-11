import deepMerge from './deep-merge';
import deepCompare from './deep-compare';

function test(a, b, result) {
  it(JSON.stringify(a) + ', ' + JSON.stringify(b), () => {
    expect(deepCompare(deepMerge(a, b), result)).toBe(true);
  });
}

describe('deep-merge', () => {
  test({name: '小明'}, {name: '小红'}, {name: '小红'});
  test({name: '小明'}, 'haha', 'haha');
  test('haha', {name: '小红'}, {name: '小红'});
  test({name: '小明'}, {name: {age: 18}}, {name: {age: 18}});
  test({name: {age: 18, height: 180}}, {name: {age: 18, name: '小亮'}}, {name: {height: 180, age: 18, name: '小亮'}});
});
