### metric元对象

metric是一个递归嵌套的对象,叶子节点children为undefined, 包含value值以及其他图表属性.
其余节点children为数组,忽略value值和其他图表属性

```
{
    name: '名称',                 //数据,序列,分组名称
    children: [                  //子元素, 非叶子节点必填
        metric, metric, ...
    ],
    value: [1, 100, 23, ...],                   //数值,叶子节点必填
    color: '#000'                //图表元素着色,可选
}
```

#### value
1. 直角坐标系(柱图/条图/堆积柱图/堆积条图/折线图/面积图/散点图/双轴图)
value = [X轴, Y轴, 颜色, 大小]
2. 地图
value = [经度, 纬度, 颜色, 大小]
3. 其他(树图/饼图/数字图/漏斗图/表格)
value = 数值

### dimension对象
```
{
    type: 'category',           //坐标轴类型,离散或连续,x轴一般为离散
    data: ['汇总', '大工业', '居民', ...]
}
```

例子:
```
metric = [
  {
    name: '北京',
    children: [
      {
        name: '当期值',
        data: [
          {name: '汇总', value: 10},
          {name: '大工业', value: 20},
          {name: '居民', value: 15}
        ]
      },
      {
        name: 'B',
        data: [
          {name: '汇总', value: 5},
          {name: '大工业', value: 15},
          {name: '居民', value: 10}
        ]
      }
    ]
  },
  {
    name: '湖北',
    metric: [
      {
        name: '累计值',
        data: [
          {name: '汇总', value: 10},
          {name: '大工业', value: 20},
          {name: '居民', value: 15}
        ]
      },
      {
        name: 'B',
        data: [
          {name: '汇总', value: 5},
          {name: '大工业', value: 15},
          {name: '居民', value: 10}
        ]
      }
    ]
  }
];
```