import { AnimationMixer, Mesh } from "three";
import { IVector3NRotationY } from "../Interface/IVector3NRotationY";
import { AnimationService } from "../Services/AnimationService";
import { FlowerAnimation } from "./FlowerAnimation";

export class Flower{
    public mesh:Mesh = new Mesh();
    public flowerMesh:Mesh;

    constructor(flowerMesh:Mesh, scale:number, position?:IVector3NRotationY){
        this.flowerMesh = flowerMesh;
        this.mesh.scale.set(scale, scale, scale);
        if(position){
            this.mesh.position.set(position.vector.x, position.vector.y, position.vector.z);
            this.mesh.rotation.y = position.rotationY;
            //this.flowerMesh.position.set(0, -1.8, 0);
            this.mesh.visible = false;
        }
        this.mesh.add(flowerMesh);
    }

    animateFlowerAppears(){
        if(this.mesh.visible == false){
            this.flowerMesh.position.set(0, -1.8, 0);
            this.mesh.visible = true;
            const mixer = new AnimationMixer(this.flowerMesh);
            AnimationService.animationActions.push(mixer.clipAction(FlowerAnimation.moveFlowerClip));
        }
    }

    setFlowerToFinalPosition(){
        this.flowerMesh.position.set(0,0,0);
        this.mesh.visible = true;
    }
}