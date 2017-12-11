import * as THREE from 'three';
require(`imports-loader?THREE=three!./plugin/TrackballControls`);

import Lazy from 'lib/lazy';
import Coordinate from './coordinate';
import GeoParser from './geo';

import Bar from './mesh/bar';

class ThreeMap {
  constructor(params) {
    let { width, height, geoJson } = params;

    this.coord = new Coordinate({ width, height, geoJson });

    this.geoParser = new GeoParser({
      coordinate: this.coord
    });

    this.init(params);

    //材质
    //基础材质,不受光照影响,只显示基础颜色或线框
    //const material = new THREE.MeshBasicMaterial({
    //  //wireframe: true,
    //  color: 0x00ff00
    //});

    //受光照影响
    //const material = new THREE.MeshLambertMaterial({
    //  color: 0x00ff00
    //});

    const material = new THREE.MeshPhongMaterial({
      ambient: 0x050505,
      color: 0x00ff00
    });
    material.map = new THREE.TextureLoader().load('/data/img/world.jpg');
    material.bumpMap = new THREE.TextureLoader().load('/data/img/world.jpg');
    material.bumpScale = 0.2;

    const shapes = this.geoParser.toShape();

    const geometry = new THREE.ExtrudeGeometry(shapes, {
      amount: 1,
      bevelEnabled: false
    });

    //const geometry = new THREE.CubeGeometry(100, 50, 2);

    const mesh = new THREE.Mesh(geometry, material);

    this.add(mesh);
  }

  init(params) {
    const { id, width, height } = params;
    //场景
    this.scene = new THREE.Scene();

    //相机
    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    const deep = height / 2 / Math.tan(Math.PI * 50 / 180 / 2);
    const range = this.coord.range();
    const deepK = (range[1][0] - range[0][0]) / 360;
    const [ x, y ] = this.coord.toXYZ(this.coord.center());
    this.camera.position.set(x, y, deep * deepK);

    //控制器
    this.controls = new THREE.TrackballControls(this.camera);

    ////灯光
    this.light = new THREE.AmbientLight( 0x404040 ); // soft white light
    this.scene.add(this.light);

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(x, y, 400);
    spotLight.castShadow = true;
    this.scene.add(spotLight);

    //参考平面
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 100);
    const planeHelper = new THREE.PlaneHelper(plane, 100, 0xffff00);
    this.scene.add(planeHelper);

    //参考坐标系
    const axisHelper = new THREE.AxisHelper(100);
    this.scene.add(axisHelper);

    //渲染器
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this.renderer.setSize(width, height);
    document.getElementById(id).appendChild( this.renderer.domElement );

    this.animate();
  }

  add(mesh) {
    this.scene.add(mesh);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

export default ThreeMap;
