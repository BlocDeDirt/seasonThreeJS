import { Box3, DoubleSide, MathUtils, Mesh, MeshStandardMaterial, PlaneGeometry } from "three";
import { mainScene } from "../../main";

export class LeaveAutumnClass{
    private material = new MeshStandardMaterial({color:0xad8528});
    public mesh = new Mesh(new PlaneGeometry(0.3, 0.3), this.material);
    private boundingBox:Box3;
    //private position:Vector3 = new Vector3();
    constructor(boundingBox:Box3){
        this.material.color.set(0xad8528).convertSRGBToLinear();
        this.material.side = DoubleSide;
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mesh.visible = false;
        this.mesh.rotation.x = MathUtils.degToRad(-90);
        this.boundingBox = boundingBox;
        this.mesh.position.set(
            this.GetRandomPosition(this.boundingBox.max.x, this.boundingBox.min.x),
            this.GetRandomPosition(this.boundingBox.max.y, this.boundingBox.min.y),
            this.GetRandomPosition(this.boundingBox.max.z, this.boundingBox.min.z)
        )
        mainScene.scene.add(this.mesh)
    }

    public makeLeaveFall(delta:number){
        if(this.mesh.position.y < 0){
            this.mesh.position.set(
                this.GetRandomPosition(this.boundingBox.max.x, this.boundingBox.min.x),
                this.GetRandomPosition(this.boundingBox.max.y, this.boundingBox.min.y),
                this.GetRandomPosition(this.boundingBox.max.z, this.boundingBox.min.z)
            )
            this.mesh.rotation.y = this.GetRandomRotation();
            this.mesh.rotation.z = this.GetRandomRotation();
        }else{
            this.mesh.position.y -= 1.5 * delta;
        }
    }

    private GetRandomPosition(max:number, min:number){
        return (Math.floor(Math.random() * (max - min) ) + min) + ((Math.floor(Math.random() * (100 - 1) ) + 1) / 100);
    }

    private GetRandomRotation(){
        return Math.floor(Math.random() * 91);
    }
}