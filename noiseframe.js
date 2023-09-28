import * as THREE from "https://cdn.skypack.dev/three@0.133.1";
import openSimplexNoise from 'https://cdn.skypack.dev/open-simplex-noise';

let scrollPercent = 0;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, innerWidth / innerHeight, 0.1, 1000 );
camera.position.set(0, 0, 5);
let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( innerWidth, innerHeight );
document.body.appendChild( renderer.domElement );
scene.background = new THREE.Color( 0xffffff );

let radius = 2;
let geometry = new THREE.IcosahedronGeometry(1, 1);
let nPos = [];
let v3 = new THREE.Vector3();
let pos = geometry.attributes.position;
for (let i = 0; i < pos.count; i++){
	v3.fromBufferAttribute(pos, i).normalize();
  nPos.push(v3.clone());
}
geometry.userData.nPos = nPos;
let material = new THREE.MeshNormalMaterial({wireframe: false});
let object = new THREE.Mesh(geometry, material);

scene.add(object);

let noise = openSimplexNoise.makeNoise4D(Date.now());
let clock = new THREE.Clock();

window.addEventListener("resize", () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight)});

renderer.setAnimationLoop( () => {
	let t = clock.getElapsedTime();
  geometry.userData.nPos.forEach((p, idx) => {
  	let ns = noise(p.x, p.y, p.z, t);
    v3.copy(p).multiplyScalar(radius).addScaledVector(p, ns);
    pos.setXYZ(idx, v3.x, v3.y, v3.z);
  })
  geometry.computeVertexNormals();
  pos.needsUpdate = true;

    object.rotation.x += 0.005;
	object.rotation.y += 0.005;
  object.position.x = 2 - 0.08*scrollPercent
	renderer.render(scene, camera);

})

document.body.onscroll = () => {
  //calculate the current scroll progress as a percentage
  scrollPercent =
      ((document.documentElement.scrollTop || document.body.scrollTop) /
          ((document.documentElement.scrollHeight ||
              document.body.scrollHeight) -
              document.documentElement.clientHeight)) *
      100
  console.log(scrollPercent)
}