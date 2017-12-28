/**
 * 计算svg中文本宽度
 * @param txt 文本
 * @param style 样式
 * @returns {number}
 */
export function textWidth(txt, style = {'font-size': '12px'}) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  Object.assign(text.style, style);
  svg.appendChild(text);
  document.body.appendChild(svg);

  text.textContent = txt;
  let len = text.getComputedTextLength();

  document.body.removeChild(svg);

  return len;
}

/**
 * 分割字符串
 * @param txt
 * @param max
 * @param fontSize
 * @returns {Array}
 */
export function splitText(txt = '', max, fontSize = 14){
  let curLen = 0;
  let result = [];
  let start = 0, end = 0;
  for (let i = 0; i < txt.length; i++) {
    let code = txt.charCodeAt(i);
    let pixelLen = code > 255 ? fontSize : fontSize / 2;
    curLen += pixelLen;
    if(curLen > max){
      end = i;
      result.push(txt.substring(start,end));
      start = i;
      curLen = pixelLen;
    }
    if( i === txt.length - 1 ){
      end = i;
      result.push(txt.substring(start, end + 1));
    }
  }
  return result;
}

/**
 * 生成唯一id
 * @param sep 分隔符,默认为空
 * @param len id长度,默认为24,最大为36
 * @returns {string}
 */
export function uuid(sep = '', len = 24) {
  const s = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = sep;

  return s.join('').substr(0, len);	//分隔符: "-"
}

/**
 * 动画函数,用requestAnimationFrame包装,防止频繁调用
 */
export const throttle = (function() {
  const storage = {};
  return function(key) {
    if (storage[key]) {
      return storage[key];
    }
    let requestedFrame;
    storage[key] = function(fn, ...args) {
      if(!requestedFrame){
        requestedFrame = requestAnimationFrame(async function() {
          await fn(...args);
          requestedFrame = null;
        });
      }
    };
    return storage[key];
  };
})();
