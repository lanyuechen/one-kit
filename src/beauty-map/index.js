const DEFAULT_OPACITY = 0.2;

class BeautyMap {
  constructor({ id, geoUrl, width, height, backgroundImage, data, range, onClick }) {
    this.width = width;
    this.height = height;
    this.range = range;
    this.snap = Snap(id);
    this.onClick = onClick;

    this.loadMap(geoUrl, (geo) => {
      this.drawBg(geo, backgroundImage);
      this.drawMap(geo, data);
    });
  }

  drawMap(geo, data) {
    const dMap = data.reduce((p, n) => {
      p._max = Math.max(n.value, p._max);
      p._min = Math.min(n.value, p._min);
      p[n.name] = n;
      return p;
    }, { _max: 0, _min: 0 });

    const scale = d3.scaleLinear()
      .domain([dMap._min, dMap._max])
      .range(this.range);

    geo.features.map(d => {
      const dd = dMap[d.properties.name];
      const value = dd ? dd.value : 0;
      this.snap.path(this.path(d))
        .attr({
          stroke: '#000',
          strokeWidth: 2,
          fill: scale(value),
          opacity: DEFAULT_OPACITY
        })
        .hover(function() {
          this.attr({
            opacity: DEFAULT_OPACITY + 0.1
          }, 1000);
        }, function() {
          this.attr({
            opacity: DEFAULT_OPACITY
          }, 1000);
        })
        .click(() => {
          this.onClick && this.onClick(d.properties);
        })
    });
  }

  loadMap(geoUrl, cb) {
    d3.json(geoUrl, (err, geo) => {
      if (err) {
        console.error(err);
        return;
      }
      this.geo = geo;
      this.projection = d3.geoMercator()
        .fitSize([this.width, this.height], geo);
      this.path = d3.geoPath()
        .projection(this.projection);
      cb(geo);
    });
  }

  drawBg(geo, bg) {
    this.bg = this.snap.image(bg, 0, 0, this.width, this.height);

    const mask = this.snap.path(this.path(geo)).attr({ fill: '#fff' });

    this.bg.attr({
      mask
    })
  }
}