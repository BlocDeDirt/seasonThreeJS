import { AnimationMixer, Material, Mesh, Vector3 } from "three";
import { IMeshFollowPath } from "../Interface/IMeshFollowPath";
import { pathCurve } from "../main";
import { AnimationService } from "../Services/AnimationService";
import { BeeAnimation } from "./BeeAnimation";

export class Bee implements IMeshFollowPath{
    public mesh = new Mesh();
    private beeMesh:Mesh;
    public beeMaterial:Material;
    position: Vector3 = new Vector3();
    target: Vector3 = new Vector3();

    constructor(beeMesh:Mesh){
        this.beeMesh = beeMesh;
        this.beeMesh.position.y = 0.4;
        this.beeMaterial = this.beeMesh.material as Material;
        this.beeMaterial.transparent = true;
        this.beeMaterial.opacity = 0;
        beeMesh.scale.set(0.12, 0.12, 0.12);
        this.mesh.add(beeMesh);
        this.mesh.visible = false;
    }
    
    public animateBeeAppears(){
        if(this.mesh.visible == false){
            this.beeMaterial.opacity = 0;
            this.mesh.visible = true;
            const mixer = new AnimationMixer(this.beeMesh);
            AnimationService.animationActions.push(mixer.clipAction(BeeAnimation.beeAppearsClip));
        }
    }
    
    public animateBeeDisappears(){
        if(this.mesh.visible){
            const mixer = new AnimationMixer(this.beeMesh);
            AnimationService.animationActions.push(mixer.clipAction(BeeAnimation.beeDisappearsClip));
            pathCurve.canAnimateMesh = false;
        }
    }
    
    public makeBeeFollowPath(){
        pathCurve.objectToMove = this;
        pathCurve.canAnimateMesh = true;
    }

    public removeBeeFromScene(){
        this.mesh.visible = false;
        this.beeMaterial.opacity = 0;
    }


    public setBeeToFinalState(){
        this.beeMaterial.opacity = 1;
        this.mesh.visible = true;
    }
}