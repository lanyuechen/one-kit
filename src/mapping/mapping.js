import { uuid } from 'lib/common';
import View from './view';
import Model from './model';

class Mapping {
  constructor({geo, container, width, height, onUpdate, tris, data}) {
    this.width = width;
    this.height = height;

    this.onUpdate = onUpdate;

    const snap = Snap(container);

    this.projection = d3.geoMercator()
      .fitSize([this.width, this.height], geo);

    this.model = new Model({
      tris,
      data
    });

    this.view = new View({
      width,
      height,
      snap,
      geo,
      projection: this.projection,
      model: this.model,
      onClick: this.handleClick,
      onMouseMove: this.handleMouseMove,
      onDotClick: this.handleDotClick,
      onDotMouseDown: this.handleDotMouseDown,
      onDotMouseUp: this.handleDotMouseUp
    });
    this.view.update();

    window.addEventListener('contextmenu', () => {
      this.clearTris();
      this.clearData();
    })
  }

  clearTris = () => {
    if (this.dotClickId) {
      this.model.removeTris(this.dotClickId);
      this.update();
      delete(this.dotClickId);
      delete(this.dotClick);
    }
  };

  clearData = () => {
    if (this.clickId) {
      this.model.removeData(this.clickId);
      this.update();
      delete(this.clickId);
      delete(this.clicked);
    }
  };

  update = () => {
    this.onUpdate();
    this.view.model(this.model).update();
  };

  handleClick = (e, x, y) => {
    //清除dot点击状态
    this.clearTris();
    this.clicked = !this.clicked;
    if (this.clicked) {   //已点击,画线
      this.clickId = uuid();
      const [lng, lat] = this.projection.invert([x, y]);
      this.model.appendData({
        id: this.clickId,
        start: {x, y, lng, lat},
        end: {x, y},
        finished: false
      });
      this.update();
    } else {              //点击结束,结束画线,处理数据
      this.model.updateData(this.clickId, {
        end: {x, y},
        finished: true
      });
      this.update();
      delete(this.clickId);
    }
  };

  handleMouseMove = (e, x, y) => {
    if (this.dotMouseDown) {
      if (this.dotType === 'start') {
        const [lng, lat] = this.projection.invert([x, y]);
        this.model.updateData(this.dotId, {
          start: {x, y, lng, lat}
        });
      } else {
        this.model.updateData(this.dotId, {
          end: {x, y}
        });
      }
      this.update();
    }
    if (this.clicked) {
      this.model.updateData(this.clickId, {
        end: {x, y}
      });
      this.update();
    }
  };

  handleDotClick = (type, d) => {
    this.clearData();
    this.dotClick = (this.dotClick || 0) + 1;
    if (this.dotClick === 1) {
      this.dotClickId = uuid();
      this.model.appendTris({
        id: this.dotClickId,
        points: [d.id, d.id, d.id]
      });
    } else if (this.dotClick === 2) {
      const tri = this.model.getTris(this.dotClickId);
      this.model.updateTris(this.dotClickId, {
        points: [tri.points[0], d.id, d.id]
      })
    } else {
      const tri = this.model.getTris(this.dotClickId);
      this.model.updateTris(this.dotClickId, {
        points: [tri.points[0], tri.points[1], d.id]
      });
      delete(this.dotClickId);
      delete(this.dotClick);
    }
    this.update();
  };

  handleDotMouseDown = (type, d) => {
    this.dotMouseDown = true;
    this.dotId = d.id;
    this.dotType = type;
  };

  handleDotMouseUp = () => {
    delete(this.dotMouseDown);
    delete(this.dotId);
    delete(this.dotType);
  };

  result() {
    return {
      tris: this.model.tris(),
      data: this.model.data()
    }
  }
}

export default Mapping;