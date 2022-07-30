import { AnimationMixer, Box3, Color, Material, MathUtils, Mesh, MeshStandardMaterial } from "three";
import { IVector3NRotationY } from "../Interface/IVector3NRotationY";
import { AnimationService } from "../Services/AnimationService";
import { LeaveAutumnClass } from "./LeaveAutumn/LeaveAutumnClass";
import { TreeAnimation } from "./TreeAnimation";

const colorLeave = {
    spring: new Color(0x80de54),
    summer: new Color(0x5f9e41),
    autumn: new Color(0xcca956)
}

export class Tree{
    public mainMesh = new Mesh();
    public logMesh:Mesh;
    public leaveMesh:Mesh;
    public snowMesh:Mesh;

    public logMaterial = new MeshStandardMaterial();
    public leaveMaterial = new MeshStandardMaterial();
    public snowMaterial = new MeshStandardMaterial();
    public leaveBoundingBox = new Box3();

    public entityLeaveAutumn:LeaveAutumnClass;

    constructor(logMesh:Mesh, leaveMesh:Mesh, snowMesh:Mesh, position?:IVector3NRotationY){
        this.logMesh = logMesh;
        this.leaveMesh = leaveMesh;
        this.snowMesh = snowMesh;
        this.logMesh.material = this.logMaterial;
        this.leaveMesh.material = this.leaveMaterial;
        this.snowMesh.material = this.snowMaterial as Material;

        this.logMaterial.color.set(0x856c51).convertSRGBToLinear();
        this.leaveMaterial.color.set(colorLeave.spring).convertSRGBToLinear();
        this.snowMaterial.color.set(0xf2f2f2).convertSRGBToLinear();
        this.leaveMaterial.transparent = true;
        this.snowMaterial.transparent = true;
        this.leaveMesh.visible = false;
        this.snowMesh.visible = false;
        if(position){
            this.mainMesh.position.set(position.vector.x, position.vector.y, position.vector.z);
            this.mainMesh.rotation.y = MathUtils.degToRad(position.rotationY);
        }
        this.mainMesh.add(logMesh, leaveMesh, snowMesh);
        this.getLeaveBoudingBox();
        this.entityLeaveAutumn = new LeaveAutumnClass(this.leaveBoundingBox)
    }

    SpringLeave(){
        if(this.leaveMesh.visible == false){
            this.animateLeaveFall();
            this.leaveMaterial.color.set(colorLeave.spring).convertSRGBToLinear();
        }else{
            this.lerpColorLeave(0.15, colorLeave.spring);
        }
        this.entityLeaveAutumn.mesh.visible = false;
    }

    SummerLeave(){
        if(this.leaveMesh.visible == false){
            this.animateLeaveFall();
            this.leaveMaterial.color.set(colorLeave.summer).convertSRGBToLinear();
        }else{
        //this.leaveMaterial.color.set(colorLeave.summer).convertSRGBToLinear();
            this.lerpColorLeave(0.15, colorLeave.summer);
        }
        this.entityLeaveAutumn.mesh.visible = false;
    }

    AutumnLeave(){
        if(this.leaveMesh.visible == false){
            this.animateLeaveFall();
            this.leaveMaterial.color.set(colorLeave.autumn).convertSRGBToLinear();
        }else{
        //this.leaveMaterial.color.set(colorLeave.summer).convertSRGBToLinear();
            this.lerpColorLeave(0.15, colorLeave.autumn);
        }
        this.entityLeaveAutumn.mesh.visible = true;
    }

    WinterLeave(){
        if(this.snowMesh.visible == false){
            const mixer = new AnimationMixer(this.leaveMesh);
            const mixerSnow = new AnimationMixer(this.snowMesh);
            this.snowMesh.position.y = 15;
            this.snowMaterial.opacity = 0;
            this.snowMesh.visible = true;
            AnimationService.animationActions.push(
                mixer.clipAction(TreeAnimation.removeLeaveOrSnowClip), 
                mixerSnow.clipAction(TreeAnimation.addLeaveOrSnowClip)
            );
        }
        this.entityLeaveAutumn.mesh.visible = false;
    }

    private lerpColorLeave(speed:number, colorToLerp:Color){
        let alpha = 0;
        let oldColor = this.leaveMaterial.color.clone();
        let id = setInterval(() => {
            alpha += speed;
            this.leaveMaterial.color.lerpColors(oldColor, colorToLerp, alpha).convertSRGBToLinear();
            if(alpha > 1){
                clearInterval(id);
            }
        }, 33);
    }

    animateLeaveFall(){
        this.leaveMesh.position.y = 15;
        this.leaveMaterial.opacity = 0;
        this.leaveMesh.visible = true;
        const mixer = new AnimationMixer(this.leaveMesh);
        AnimationService.animationActions.push(mixer.clipAction(TreeAnimation.addLeaveOrSnowClip));
        if(this.snowMesh.visible){
            const mixerSnow = new AnimationMixer(this.snowMesh);
            AnimationService.animationActions.push(mixerSnow.clipAction(TreeAnimation.removeLeaveOrSnowClip));
        }
    }

    setSnowToFinalPosition(){
        this.snowMesh.position.set(0,0,0);
        this.snowMaterial.opacity = 1;
        this.leaveMesh.visible = false;
        this.snowMesh.visible = true;
    }

    setLeaveToFinalPosition(){
        this.leaveMesh.position.set(0,0,0);
        this.leaveMaterial.opacity = 1;
        this.leaveMesh.visible = true;
        this.snowMesh.visible = false;
    }

    private getLeaveBoudingBox(){
        this.leaveBoundingBox.setFromObject(this.mainMesh);
        this.leaveBoundingBox.max.y -= 1.5;
        this.leaveBoundingBox.min.y += 2;
        this.leaveBoundingBox.max.y = Math.floor(this.leaveBoundingBox.max.y);
        this.leaveBoundingBox.min.y = Math.floor(this.leaveBoundingBox.min.y);
    }

    public makeAutumnLeaveFall(delta:number){
        this.entityLeaveAutumn.makeLeaveFall(delta);
    }


}

