export function range(len, step = 1) {
  const r = [];
  for (let i = 0; i < len; i = i + step) {
    r.push(i);
  }
  return r;
}