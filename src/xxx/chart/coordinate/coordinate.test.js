import Coordinate from './index';

const option = {
  type: 'rect',
  x: {
    data: [0, 1, 2, 3, 4]
  },
  y: {
    max: 100,
    min: 0
  }
};

const width = 600;
const height = 400;

describe('Coordinate', () => {
  const coord = new Coordinate(option, width, height);
  it('x', () => {
    expect(coord.x(0)).toBe(0);
    expect(coord.x(4)).toBe(480);
    expect(coord.x(1)).toBe(120);
  });

  it('y', () => {
    expect(coord.y(0)).toBe(0);
    expect(coord.y(100)).toBe(400);
    expect(coord.y(50)).toBe(200);
  })
});
