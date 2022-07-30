import { AnimationMixer, MathUtils, Mesh, Vector3 } from "three";
import { AnimationService } from "../Services/AnimationService";
import { BarbecueAnimation } from "./BarbecueAnimation";
import { Smoke } from "./SmokeClass";

export class Barbecue{
    public mesh:Mesh;
    public smokes:Smoke[] = [
        new Smoke(new Vector3(0,1.5,0)),
        new Smoke(new Vector3(-0.5,1.5,-0.1)),
        new Smoke(new Vector3(0.3,1.5,0.5))
    ];

    public canAnimateSmoke = false;

    constructor(barbMesh:Mesh){
        this.mesh = barbMesh;
        this.mesh.scale.set(0.35,0.35,0.35);
        this.mesh.position.set(-0.2, 0.2, -0.4);
        this.mesh.rotation.y = MathUtils.degToRad(25);
        this.mesh.visible = false;
        this.getSmoke();
    }

    private getSmoke(){
        this.smokes.forEach(smoke => {
            this.mesh.add(smoke.mesh);
        })

    }

    animateBarbecueAppears(){
        if(this.mesh.visible == false){
            this.mesh.scale.set(0,0,0);
            this.mesh.visible = true;
            const mixer = new AnimationMixer(this.mesh);
            AnimationService.animationActions.push(mixer.clipAction(BarbecueAnimation.barbecueAppearsClip));
        }
    }

    animateBarbecueDisappears(){
        if(this.mesh.visible){
            const mixer = new AnimationMixer(this.mesh);
            AnimationService.animationActions.push(mixer.clipAction(BarbecueAnimation.barbecueDisappearsClip));
        }
    }

    public setBarbecueToFinalState(){
        this.mesh.scale.set(0.35,0.35,0.35);
        this.canAnimateSmoke = true;
    }

    public removeBarbecueFromScene(){
        this.mesh.visible = false;
        this.canAnimateSmoke = false;
    }

    public animateSmoke(delta:number){
        for(let i = 0; i < this.smokes.length; i++){
            this.smokes[i].makeSmokeGoUp(delta);
        }
    }
}