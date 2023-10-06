import * as THREE from "https://cdn.skypack.dev/three@0.133.1";
import openSimplexNoise from 'https://cdn.skypack.dev/open-simplex-noise';

let scrollPercent = 0;
let isIntersecting = false;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, innerWidth / innerHeight, 0.1, 1000 );
camera.position.set(0, 0, 5);
let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( innerWidth, innerHeight );
document.body.appendChild( renderer.domElement );
scene.background = new THREE.Color( 0xffffff );
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

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

const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / document.body.offsetWidth
    cursor.y = event.clientY / document.body.offsetHeight

    pointer.x =  ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y =  - ( event.clientY / window.innerHeight ) * 2 + 1;
})

window.addEventListener('click', (event) =>
{
    if (isIntersecting) {
      window.location.assign('#projects');
    }
})

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

  object.rotation.z = - 5 *cursor.x;
  object.rotation.x = 10*cursor.y;

  let homePage  = document.getElementById('home')
  let aboutPage = document.getElementById('about')
  let canvasHeight = homePage.offsetHeight + aboutPage.offsetHeight / 2
  let totalHeight = document.body.offsetHeight
  let canvasPercent = 100*canvasHeight / totalHeight
  let offsetY = 0.2
  if (scrollPercent < canvasPercent){
    let realPercent = scrollPercent / canvasPercent
    camera.position.x = - 2 + 8*Math.sqrt(realPercent)
    camera.position.y = offsetY
  } else{
    camera.position.y = - 0.5 * (scrollPercent - canvasPercent) + offsetY 
  }

  let bagtip = document.getElementById('bag-tip');
  if (bagtip){
    bagtip.style.top = `${(-pointer.y+1)*50}vh`;
    bagtip.style.left = `${(pointer.x+1)*100 - 5}vh`;
  } 
  
  raycaster.setFromCamera(pointer, camera);
  let intersects = raycaster.intersectObjects( scene.children );
  if (intersects.length > 0) {
    isIntersecting = true;
    bagtip.style.visibility = 'visible';
  } else{
    isIntersecting = false;
    bagtip.style.visibility = 'hidden';
  }

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
}