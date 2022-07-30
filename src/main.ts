import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Barbecue } from "./Barbecue/BarbecueClass";
import { Bee } from "./Bee/BeeClass";
import { PathCurve } from "./CurvePath/PathCurveClass";
import { Flower } from "./Flower/FlowerClass";

import { MainPlatform } from "./MainPlatform/MainPlatformClass";
import { MainScene } from "./MainScene/MainSceneClass";
import { SeasonHandler } from "./SeasonHandler/SeasonHandlerClass";
import { AnimationService } from "./Services/AnimationService";
import { GLTFService } from './Services/GLTFService';
import { SnowflakeHandler } from "./Snowflake/SnowflakeHandler";
import { Tombstone } from "./Tombstone/TombstoneClass";
import { Tree } from './Tree/TreeClass';
const CONTAINER = document.getElementById("container") as HTMLDivElement;

let leaveMesh = await GLTFService.LoadGLTF("./assets/leaveTree.glb");
let logMesh = await GLTFService.LoadGLTF("./assets/logTree.glb");
let snowMesh = await GLTFService.LoadGLTF("./assets/snowTree.glb");
let flowerMesh = await GLTFService.LoadGLTF("./assets/flower.glb", true);
let beeMesh = await GLTFService.LoadGLTF("./assets/bee.glb", true);
let barbecueMesh = await GLTFService.LoadGLTF("./assets/barbecue.glb", true);
let tombstoneMesh = await GLTFService.LoadGLTF("./assets/tombstone.glb", true);
export const seasonHandler = new SeasonHandler();
export const mainScene = new MainScene();
export const snowflakeHandler = new SnowflakeHandler()
snowflakeHandler.createSnowflakes();
export const pathCurve = new PathCurve();
mainScene.scene.add(pathCurve.mesh)

export let bee = new Bee(beeMesh);
mainScene.scene.add(bee.mesh);

export let barbecue = new Barbecue(barbecueMesh);
mainScene.scene.add(barbecue.mesh);

export let tombstone = new Tombstone(tombstoneMesh);
mainScene.scene.add(tombstone.mesh);


export let leaveFallAutumn = {
    animate:false
};
export let trees = [
    new Tree(logMesh.clone(), leaveMesh.clone(), snowMesh.clone(), {vector:new THREE.Vector3(-1.7, -0.2, -2), rotationY : 0}),
    new Tree(logMesh.clone(), leaveMesh.clone(), snowMesh.clone(), {vector:new THREE.Vector3(-2, -0.5 , 2), rotationY : 90}),
    new Tree(logMesh.clone(), leaveMesh.clone(), snowMesh.clone(), {vector:new THREE.Vector3(2.8, 0, 0.7), rotationY : 180}),
];
trees.forEach(tree => {
    mainScene.scene.add(tree.mainMesh);
})

export let flowers = [
    new Flower(flowerMesh.clone(), 0.2, {
        vector: new THREE.Vector3(GetRandomLocation(4,-4), 0.15, GetRandomLocation(4,-4)),
        rotationY : Math.floor(Math.random() * 181 )
    }),
    new Flower(flowerMesh.clone(), 0.2, {
        vector: new THREE.Vector3(GetRandomLocation(4,-4), 0.15, GetRandomLocation(4,-4)),
        rotationY : Math.floor(Math.random() * 181 )
    }),
    new Flower(flowerMesh.clone(), 0.2, {
        vector: new THREE.Vector3(GetRandomLocation(4,-4), 0.15, GetRandomLocation(4,-4)),
        rotationY : Math.floor(Math.random() * 181 )
    }),
];
flowers.forEach(flower => {
    mainScene.scene.add(flower.mesh);
})

export const mainPlatform = new MainPlatform();
mainPlatform.addPlatformToScene();

const controls = new OrbitControls( mainScene.camera, mainScene.renderer.domElement );
controls.update();

const clock = new THREE.Clock();
/*const box = new THREE.Box3();
box.setFromObject(trees[0].mainMesh);
console.log(box)
box.max.y -= 1.5;
box.min.y += 2;
const helper = new THREE.Box3Helper(box, new THREE.Color(0xa84c32))
mainScene.scene.add(helper)*/
CONTAINER.appendChild(mainScene.renderer.domElement);

/*trees.forEach(tree => {
    const box = new THREE.Box3();
box.setFromObject(tree.mainMesh);
console.log(box)
box.max.y -= 1.5;
box.min.y += 2;
const helper = new THREE.Box3Helper(box, new THREE.Color(0xa84c32))
mainScene.scene.add(helper)
})*/

animate(0);
function animate(time:DOMHighResTimeStamp){
    if(pathCurve.canAnimateMesh){
        pathCurve.moveMeshAlongPath(time);
    }

    let delta = clock.getDelta();
    if(AnimationService.animationMixers.length != 0){
        AnimationService.animationMixers.forEach(mixer => {
            mixer.update(delta);
        });
    }

    if(snowflakeHandler.canAnimateSnow){
        snowflakeHandler.makeSnowflakesFall(delta);
    }

    else if(leaveFallAutumn.animate){
        trees.forEach(tree => {
            tree.makeAutumnLeaveFall(delta);
        });
    }

    else if(barbecue.canAnimateSmoke){
        barbecue.animateSmoke(delta);
        
    }
    mainScene.renderer.render(mainScene.scene, mainScene.camera);
    requestAnimationFrame(animate);
}

function GetRandomLocation(max:number, min:number){
    return (Math.floor(Math.random() * (max - min) ) + min) + ((Math.floor(Math.random() * (100 - 1) ) + 1) / 100);
}