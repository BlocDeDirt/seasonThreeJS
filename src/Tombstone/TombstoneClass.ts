import { AnimationMixer, Mesh, Object3D } from "three";
import { AnimationService } from "../Services/AnimationService";
import { TombstoneAnimation } from "./TombstoneAnimation";

export class Tombstone{
    public mesh = new Object3D();
    public tombstoneMesh:Mesh;
    constructor(tombstoneMesh:Mesh){
        this.tombstoneMesh = tombstoneMesh;
        this.mesh.add(this.tombstoneMesh)
        this.mesh.scale.set(0.5,0.5,0.5)
        this.mesh.position.y = 0.31;
        this.tombstoneMesh.position.y = 0.85;
        tombstoneMesh.rotation.z = -0.05;
        this.mesh.visible = false;

        
    }

    animateTombstoneDisappears(){
        const mixer = new AnimationMixer(this.mesh);
        AnimationService.animationActions.push(mixer.clipAction(TombstoneAnimation.fallTombstoneClip));
    }

    animateTombstoneAppears(){
        if(this.mesh.visible == false){
            this.tombstoneMesh.position.y = -1.61
            this.mesh.quaternion.set(0, 0, 0, 1);
            this.mesh.position.y = 0.31;
            this.mesh.visible = true;
            const mixer = new AnimationMixer(this.tombstoneMesh)
            AnimationService.animationActions.push(mixer.clipAction(TombstoneAnimation.tombstoneAppearsClip));
        }
    }

    setTombstoneFinalPosition(){
        this.mesh.visible = true;
        this.tombstoneMesh.position.y = 0.85;
    }

    removeTombstone(){
        this.mesh.visible = false;
    }
}