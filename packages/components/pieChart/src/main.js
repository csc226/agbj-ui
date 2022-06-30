import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { Color, Group } from 'three';
class pieChart {
    constructor(obj) {
        this.selector = document.getElementById(obj.selector);
        this.camera;
        this.scene;
        this.renderer;
        this.controls;
        this.chart;
        this.chart1;
        this.group;
        this.geometryMesh; //饼图
        this.textMesh;//文字
        this.fontJson= obj.fontJson;
        this.px = obj.hasOwnProperty('px') ? obj.px : 100;
        this.py = obj.hasOwnProperty('py') ? obj.py : 700;
        this.pz = obj.hasOwnProperty('pz') ? obj.pz : 1200;
        this.color = obj.hasOwnProperty('color') ? obj.color : [0x5470c6, 0x91cc75, 0xfac858, 0xee6666, 0x73c0de, 0x3ba272, 0xfc8452, 0x9a60b4, 0xea7ccc];
        this.enableAxis = obj.hasOwnProperty('enableAxis') ? obj.enableAxis : false; // 是否开启坐标系
        this.enablePan = obj.hasOwnProperty('enablePan') ? obj.enablePan : false; // 是否可以平移
        this.enableZoom = obj.hasOwnProperty('enableZoom') ? obj.enableZoom : false;//是否可以缩放
        this.enableRotate = obj.hasOwnProperty('enableRotate') ? obj.enableRotate : false;//是否可以旋转
        this.deep = obj.hasOwnProperty('deep') ? obj.deep : 46;//扇形的深度
        this.degZ = obj.hasOwnProperty('degZ') ? obj.degZ : Math.PI * 0.5;//Z轴旋转的弧度
        this.radius = obj.hasOwnProperty('radius') ? obj.radius : 350;//扇形半径
        this.base = obj.hasOwnProperty('base') ? {
            show: obj.base.hasOwnProperty('show') ? obj.base.show : true,
            radius: obj.base.hasOwnProperty('radius') ? obj.base.radius : 360,
            deep: obj.base.hasOwnProperty('deep') ? obj.base.deep : 40,
            color: obj.base.hasOwnProperty('color') ? obj.base.color : 0xBA903F,
        } : { show: true, radius: 360, color: 0xBA903F }; // 底盘设置
        this.shadow = obj.hasOwnProperty('shadow') ? {
            show: obj.shadow.hasOwnProperty('show') ? obj.shadow.show : true,
            radius: obj.shadow.hasOwnProperty('radius') ? obj.shadow.radius : 390,
            color: obj.shadow.hasOwnProperty('color') ? obj.shadow.color : 0xFFD464,
            opacity: obj.shadow.hasOwnProperty('opacity') ? obj.shadow.opacity : 0.2,
        } : { show: true, radius: 390, color: 0xFFD464, opacity: 0.2 };//阴影设置
        this.lineLength = obj.hasOwnProperty('lineLength') ? obj.lineLength : 1000;//线的长度
        this.lineColor = obj.hasOwnProperty('lineColor') ? obj.lineColor : '';//线的颜色 为空时和饼图颜色一致
        this.symbolSize = obj.hasOwnProperty('symbolSize') ? obj.symbolSize : 20;//标记大小
        this.symbolColor = obj.hasOwnProperty('symbolColor') ? obj.symbolColor : '';//标记颜色 为空时和饼图颜色一致
        this.fontSize = obj.hasOwnProperty('fontSize') ? obj.fontSize : 80;//文字大小
        this.rX = obj.hasOwnProperty('rX') ? obj.rX : 38;//主体倾斜多少度
        this.throbAuto = obj.hasOwnProperty('throbAuto') ? obj.throbAuto : true;//是否自动跳动
        this.throbGap = obj.hasOwnProperty('throbGap') ? obj.throbGap : 1000;//跳动间隔ms
        this.bodyRotateAuto = obj.hasOwnProperty('bodyRotateAuto') ? obj.bodyRotateAuto : false;//饼图是否自动旋转
        this.backgroundColor = obj.hasOwnProperty('backgroundColor') ? obj.backgroundColor : 0x000000;//背景颜色 默认黑色
        this.backgroundAlpha = obj.hasOwnProperty('backgroundAlpha') ? obj.backgroundAlpha : false;
        this.series = obj.hasOwnProperty('series') ? obj.series : [
            {
                type: 'pie',
                data: [
                    {
                        name: '',//数据项名称
                        value: '1',//单个数据项的数值。
                        itemStyle: {
                            color: '',
                        },
                        nameStyle: {
                            color: 0xffffff,
                            fontSize: 80,
                        },
                        valueStyle: {
                            color: 0xffffff,
                            fontSize: 80,
                        },
                        line: {
                            show: true,
                            color: 0xffffff,
                        },
                    }
                ]
            }
        ];
        this.total;//饼图总数值
        this.rotateDamping = obj.hasOwnProperty('rotateDamping') ? obj.rotateDamping : 5000; //自动旋转的阻尼 值越大越慢
    }
    pie() {
        const bodyGroup = new THREE.Group();
        const group = new THREE.Group();
        this.group = group;
        const enableAxis = this.enableAxis; // 是否开启坐标系
        const enablePan = this.enablePan; //是否可以平移
        const enableZoom = this.enableZoom; //是否可以缩放
        const enableRotate = this.enableRotate; //是否可以旋转
        const deep = this.deep; //扇形的深度
        const degZ = this.degZ; //Z轴旋转的弧度
        const radius = this.radius; //扇形半径
        const baseRadius = this.base.radius; //底盘半径
        const baseDeep = this.base.deep; //底盘半径
        const shadowRadius = this.shadow.radius; //阴影半径
        const shadowColor = this.shadow.color; //阴影的颜色
        const shadowOpacity = this.shadow.opacity; //阴影的透明度
        const lineLength = this.lineLength; //线的长度
        const symbolSize = this.symbolSize; //标记大小
        const symbolColor = this.symbolColor; //标记颜色
        const fontSize = this.fontSize; //文字大小
        const fontColor = 0xffffff;
        const rX = this.rX; //主体倾斜多少度
        const throbAuto = this.throbAuto; //是否自动跳动
        const throbGap = this.throbGap; //跳动间隔ms
        const bodyRotateAuto = this.bodyRotateAuto; //饼图是否自动旋转
        const fontJson = this.fontJson;
        const series = this.series;//饼图数据
        const rotateDamping = this.rotateDamping; //旋转阻力 阻力越大越慢 默认1000
        this.camera = new THREE.PerspectiveCamera(70, this.selector.clientWidth / this.selector.clientHeight, 1, 10000);
        this.camera.position.y = this.py;
        this.camera.position.x = this.px;
        this.camera.position.z = this.pz;
        this.scene = new THREE.Scene();
        if (!this.backgroundAlpha) {
            this.scene.background = new Color(this.backgroundColor)
        }
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: this.backgroundAlpha });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.renderer.setSize(this.selector.clientWidth, this.selector.clientHeight)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target = new THREE.Vector3(0, 0, 0);
        this.controls.enablePan = enablePan;
        this.controls.enableZoom = enableZoom;
        this.controls.enableRotate = enableRotate;
        let pieArr = [];
        let lineArr = [];
        series.forEach((item) => {
            if (item.type == 'pie') {
                if (item.data.length > 0) {
                    let total = 0;
                    item.data.forEach(data => {
                        if (data instanceof Object) {
                            total += data.value;
                        } else {
                            total += data;
                        }
                    });
                    this.total = total;
                    let startTotal = 0
                    item.data.forEach((data, idx) => {
                        if (data instanceof Object) {
                            startTotal += data.value;
                            // 添加第一个扇形
                            let pie = new Group();
                            let arcShape = '';
                            if (idx == 0) {
                                arcShape = new THREE.Shape()
                                    .moveTo(0, 0)
                                    .absarc(0, 0, radius, 0, Math.PI * 2 * startTotal / total, false)
                                    .lineTo(0, 0);
                            } else {
                                arcShape = new THREE.Shape()
                                    .moveTo(0, 0)
                                    .absarc(0, 0, radius, Math.PI * 2 * (startTotal - data.value) / total, Math.PI * 2 * startTotal / total, false)
                                    .lineTo(0, 0);
                            };
                            let itemColor = data.hasOwnProperty('itemStyle') ? data.itemStyle.hasOwnProperty('color') ? data.itemStyle.color : this.color[idx] : this.color[idx];
                            this.geometry(arcShape, itemColor, deep, '', degZ)
                            pie.add(this.geometryMesh)

                            // 添加标记

                            const circleGeometry = new THREE.SphereGeometry(symbolSize, symbolSize + 20, symbolSize + 20)
                            const circleMesh = new THREE.MeshPhongMaterial({ color: symbolColor ? symbolColor : this.color[idx], side: THREE.DoubleSide });
                            // const circleMesh = new THREE.MeshPhongMaterial({ color: this.color[idx], side: THREE.DoubleSide });
                            const circle = new THREE.Mesh(circleGeometry, circleMesh)
                            const x1 = -Math.sin(((startTotal - data.value / 2) / total) * Math.PI * 2) * radius / 2;
                            const z1 = Math.cos(((startTotal - data.value / 2) / total) * Math.PI * 2) * radius / 2;
                            if (this.base.show) {
                                circle.position.set(x1, deep + symbolSize + baseDeep, z1)
                            } else {
                                circle.position.set(x1, deep + symbolSize, z1)
                            }

                            pie.add(circle)

                            // 添加线
                            const lineColor = data.hasOwnProperty('line') ? data.line.hasOwnProperty('color') ? data.line.color : this.lineColor ? this.lineColor : this.color[idx] : this.lineColor ? this.lineColor : this.color[idx]
                            const lineGroup = new THREE.Group();
                            const material = new THREE.LineBasicMaterial({
                                color: lineColor ? lineColor : this.color[idx],
                                transparent: true,
                                opacity: 0.8
                            });
                            const points = [];
                            if (this.base.show) {
                                points.push(new THREE.Vector3(0, deep + symbolSize + baseDeep, radius / 2));
                            } else {
                                points.push(new THREE.Vector3(0, deep + symbolSize, radius / 2));
                            }

                            points.push(new THREE.Vector3(0, Math.tan(Math.PI / 4) * radius / 2, radius));
                            points.push(new THREE.Vector3(0, Math.tan(Math.PI / 4) * radius / 2, radius * 3));
                            const geometry = new THREE.BufferGeometry().setFromPoints(points);
                            const line = new THREE.Line(geometry, material);
                            line.rotateY(-(startTotal - data.value / 2) / total * Math.PI * 2);
                            lineArr.push(line)
                            pie.add(line)
                            // lineGroup.add(line);
                            // 添加文字
                            const loader = new FontLoader();
                            const textX = -Math.sin(((startTotal - data.value / 2) / total) * Math.PI * 2) * radius * 2;
                            const textZ = Math.cos(((startTotal - data.value / 2) / total) * Math.PI * 2) * radius * 2;
                            ((startTotal, idx, x, z) => {
                                loader.load(fontJson, (font) => {
                                    let rotateY = -Math.PI / 2;
                                    let rotateInit = (startTotal - data.value / 2) / total * Math.PI * 2;

                                    if (!this.enableRotate && rotateInit > 0 && rotateInit <= Math.PI) {
                                        if (rotateInit > 0.37 * Math.PI && rotateInit <= Math.PI) {
                                            rotateY = Math.PI * 0.63;
                                        } else {
                                            rotateY = Math.PI / 2;
                                        }

                                        x = -Math.sin(((startTotal - data.value / 2) / total) * Math.PI * 2) * radius * 3;
                                        z = Math.cos(((startTotal - data.value / 2) / total) * Math.PI * 2) * radius * 3;
                                    } else if (!this.enableRotate && rotateInit > Math.PI && rotateInit <= Math.PI * 2) {
                                        if (rotateInit > Math.PI && rotateInit <= 0.63 * Math.PI * 2) {
                                            rotateY = -Math.PI * 0.63;
                                        } else {
                                            rotateY = -Math.PI / 2;
                                        }
                                    }
                                    let vfontColor = data.hasOwnProperty('valueStyle') ? data.valueStyle.hasOwnProperty('color') ? data.valueStyle.color : this.color[idx] : this.color[idx];
                                    let vfontSize = data.hasOwnProperty('valueStyle') ? data.valueStyle.hasOwnProperty('fontSize') ? data.valueStyle.fontSize : fontSize : fontSize;
                                    this.textGeometry(font, `${(data.value / total * 100).toFixed(2)}%`, vfontColor, vfontSize, x, Math.tan(Math.PI / 4) * this.radius / 2 + 20, z, rotateY - rotateInit).then(res => {
                                        pie.add(res)
                                    });

                                    let nfontColor = data.hasOwnProperty('nameStyle') ? data.nameStyle.hasOwnProperty('color') ? data.nameStyle.color : this.color[idx] : this.color[idx];
                                    let nfontSize = data.hasOwnProperty('nameStyle') ? data.nameStyle.hasOwnProperty('fontSize') ? data.nameStyle.fontSize : fontSize : fontSize;
                                    this.textGeometry(font, `${data.name}`, nfontColor, nfontSize, x, Math.tan(Math.PI / 4) * this.radius / 2 - nfontSize - 20, z, rotateY - rotateInit).then(res => {
                                        // lineGroup.add(res)
                                        pie.add(res)
                                    });
                                })
                            })(startTotal, idx, textX, textZ)
                            pieArr.push({ group: pie, startTotal: startTotal, value: data.value })
                            bodyGroup.add(pie)
                            // group.add(lineGroup)
                        } else {
                            let pie = new Group();
                            let arcShape = '';
                            startTotal += data;
                            if (idx == 0) {
                                arcShape = new THREE.Shape()
                                    .moveTo(0, 0)
                                    .absarc(0, 0, radius, 0, Math.PI * 2 * (data / total), false)
                                    .lineTo(0, 0);
                            } else {
                                // debugger
                                arcShape = new THREE.Shape()
                                    .moveTo(0, 0)
                                    .absarc(0, 0, radius, Math.PI * 2 * (startTotal - data) / total, Math.PI * 2 * (startTotal / total), false)
                                    .lineTo(0, 0);
                            };
                            let itemColor = this.color[idx];
                            this.geometry(arcShape, itemColor, deep, '', degZ)
                            pie.add(this.geometryMesh)
                            pieArr.push({ group: pie, startTotal: startTotal, value: data })
                            bodyGroup.add(pie)
                        }
                    })
                } else {
                    let pie = new Group();
                    let arcShape = '';
                    if (idx == 0) {
                        arcShape = new THREE.Shape()
                            .moveTo(0, 0)
                            .absarc(0, 0, radius, 0, Math.PI * 2 * 1, false)
                            .lineTo(0, 0);
                    };
                    let itemColor = 0xffffff;
                    this.geometry(arcShape, itemColor, deep, '', degZ)
                    pie.add(this.geometryMesh)
                    pieArr.push({ group: pie, startTotal: startTotal, value: 1 })
                    bodyGroup.add(pie)
                }

            } else {
                alert('暂无其他图形')
            }
        })

        // 添加底盘
        const cylinderGeometry2 = new THREE.CylinderBufferGeometry(baseRadius, baseRadius, this.base.deep, baseRadius + 20)
        const mesh2 = new THREE.MeshPhongMaterial({ color: this.base.color })
        const bottomCylinder = new THREE.Mesh(cylinderGeometry2, mesh2)
        bottomCylinder.position.y = deep / 2;
        if (this.base.show) {
            bodyGroup.add(bottomCylinder)
        }

        // 添加透明底影
        const planeGeometry = new THREE.CircleGeometry(shadowRadius, 100000);
        const planeMaterial = new THREE.MeshPhongMaterial({
            color: shadowColor,
            transparent: true,
            opacity: shadowOpacity,
            side: THREE.DoubleSide
        })
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotateX(Math.PI * -0.5)
        plane.position.y = 0;
        plane.receiveShadow = true;
        if (this.shadow.show) {
            bodyGroup.add(plane)
        }
        // 添加自然光
        const alight = new THREE.AmbientLight(0xffffff, 0.6)
        bodyGroup.add(alight);
        // 添加点光源
        const pointLight = new THREE.PointLight(0xffffff, 0.3, 10000);
        pointLight.position.set(0, deep * 10, 0);
        this.scene.add(pointLight);
        const sphereSize = 100;
        const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
        // 添加聚光灯
        const spotLight = new THREE.SpotLight(0xffffff, 0.4);
        spotLight.position.set(0, deep * 3, shadowRadius + 20);
        this.scene.add(spotLight);

        // 添加坐标系
        const axis = new THREE.AxesHelper(1000)
        if (enableAxis) {
            this.scene.add(axis)
        }

        group.add(bodyGroup)
        this.scene.add(group)
        if (throbAuto) {
            let currentIdx = 0
            setInterval(() => {
                if (currentIdx >= pieArr.length) {
                    currentIdx = 0
                }
                // 上移动
                if (this.base.show) {
                    if (currentIdx == 0) {
                        pieArr[currentIdx].group.position.y = baseDeep + 30;
                        pieArr[pieArr.length - 1].group.position.y = 0;
                    } else {
                        pieArr[currentIdx].group.position.y = baseDeep + 30;
                        pieArr[currentIdx - 1].group.position.y = 0;
                    }
                } else {
                    if (currentIdx == 0) {
                        pieArr[currentIdx].group.position.y = 30;
                        pieArr[pieArr.length - 1].group.position.y = 0;
                    } else {
                        pieArr[currentIdx].group.position.y = 30;
                        pieArr[currentIdx - 1].group.position.y = 0;
                    }
                }

                currentIdx++;

            }, throbGap)
        }
        let animation = (time) => {
            if (bodyRotateAuto) {
                group.rotation.y = time / rotateDamping;
            }
            this.controls.update();
            this.renderer.render(this.scene, this.camera);


        }
        this.renderer.setAnimationLoop(animation);
        this.selector.appendChild(this.renderer.domElement);
        window.addEventListener('resize', () => {
            this.onWindowResize()
        });
    }
    geometry(shape, color, depth, url, ry, ty = 0, tz = 0) {
        const extrudeSettings = { depth: depth, bevelEnabled: true, bevelSegments: 3, steps: 2, bevelSize: 0, bevelThickness: 0 };
        const textureLoader = new THREE.TextureLoader();
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

        let mesh;
        if (url) {
            mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: color, map: textureLoader.load(url) }));
        } else {
            mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: color }));
        }

        mesh.position.y = this.base.show ? this.base.deep + depth + ty : depth + ty;
        mesh.rotateX(Math.PI * 1 / 2)
        mesh.rotateZ(ry)
        mesh.position.z = tz;
        mesh.position.x = tz;
        mesh.castShadow = true;
        this.geometryMesh = mesh;
    }
    textGeometry(font, text, color, size = 80, x, y, z, ry) {
        // const loader = new FontLoader();
        let that = this;
        let p = new Promise((resolve, reject) => {
            const geometry = new TextGeometry(text, {
                font: font,
                size: size,
                height: 1,
                curveSegments: 10,
                bevelEnabled: true,
                bevelThickness: 3,
                bevelSize: 3,
                bevelSegments: 3
            });
            const materials = new THREE.MeshBasicMaterial({ color: color });
            let textMesh = new THREE.Mesh(geometry, materials);
            textMesh.position.x = x;
            textMesh.position.y = y;
            textMesh.position.z = z;
            textMesh.rotateY(ry)
            resolve(textMesh)
        })
        return p;

    }
    onWindowResize() {
        this.camera.aspect = this.selector.clientWidth / this.selector.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.selector.clientWidth, this.selector.clientHeight);

    }
}
export default pieChart;
export { pieChart };