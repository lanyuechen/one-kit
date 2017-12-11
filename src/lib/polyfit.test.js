import PolyFit from './polyfit';

const data = [
  [1, 2],
  [2, 4],
  [3, 6]
];

describe('poly fit', () => {
  const polyFit = new PolyFit(data, 3);
  console.log('>>>>>>>>', polyFit.f(4));
  console.log('>>>>>>>>', polyFit.f(5));
});
