import Lazy from '../lib/lazy';
import { uuid } from 'lib/common';

/**
 * props
 * snap: snap对象
 * geo: 地图数据
 * model: 数据结构
 * onClick: 点击事件回调
 * onMouseMove: 鼠标移动事件
 * onDotClick: 点的点击事件
 * onDotMouseDown: 点的鼠标按下事件
 * onDotMouseUp: 点的鼠标松开事件
 */
class View extends Lazy {
  constructor(props) {
    super(props);
    this.drawMap();
    this.drawMask();
    this.linkGroup = this._snap.g();
    this.trisGroup = this._snap.g();
  }

  update() {
    this.tris = this.model().tris();
    this.data = this.model().data();
    this.linkGroup.clear();
    this.trisGroup.clear();
    this.drawTriangle();
    this.drawLink();
  }

  drawMap() {
    if (!this.projection() || !this.geo()) {
      return;
    }
    const path = d3.geoPath().projection(this.projection());
    this.geo().features.map(d => {
      this._snap.path(path(d)).attr({class: 'map'})
    });
  }

  drawMask() {
    this._snap.rect(0, 0, this._width, this._height).attr({
      fill: 'rgba(0, 0, 0, 0.5)'
    }).click((e, x, y) => {
      this.onClick()(e, x, y);
    }).mousemove((e, x, y) => {
      this.onMouseMove()(e, x, y);
    });
  }

  drawLink() {
    for (let d of this.data) {
      //画线
      this.linkGroup.line(d.start.x, d.start.y, d.end.x, d.end.y).attr({
        class: 'line'
      });
      //画起点
      this.linkGroup.circle(d.start.x, d.start.y, 5).attr({
        class: 'dot-start'
      }).mousedown(() => {
        this.onDotMouseDown()('start', d);
      }).mouseup(() => {
        this.onDotMouseUp()('start', d);
      }).click(() => {
        this.onDotClick()('start', d)
      });
      if (d.finished) {
        //画终点
        this.linkGroup.circle(d.end.x, d.end.y, 5).attr({
          class: 'dot-end'
        }).mousedown(() => {
          this.onDotMouseDown()('end', d);
        }).mouseup(() => {
          this.onDotMouseUp()('end', d);
        }).click(() => {
          this.onDotClick()('end', d)
        });
      }
    }
  }

  drawTriangle() {
    //映射后三角形
    this.tris.map(d => {
      const points = this.data.filter(dd => d.points.indexOf(dd.id) > -1);
      const p2 = [];
      points.map(dd => {
        p2.push(dd.end.x, dd.end.y);
      });
      this.trisGroup.polygon(p2).attr({
        class: 'triangle-target'
      });
    });

    //映射前三角形,保证映射前三角形在映射后三角形之上
    this.tris.map(d => {
      const points = this.data.filter(dd => d.points.indexOf(dd.id) > -1);
      const p1 = [];
      points.map(dd => {
        p1.push(dd.start.x, dd.start.y);
      });
      this.trisGroup.polygon(p1).attr({
        class: 'triangle-source'
      });
    });
  }
}

export default View;