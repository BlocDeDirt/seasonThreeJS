import { DodecahedronGeometry, Mesh, MeshStandardMaterial, Vector3 } from "three";

export class Smoke{
    public material = new MeshStandardMaterial();
    public mesh = new Mesh(new DodecahedronGeometry(4), this.material);
    private maxHeight = 6;
    private minHeight:number;
    private maxHeightRandom:number;
    constructor(position:Vector3){
        this.mesh.position.set(position.x, position.y, position.z);
        this.material.color.set(0x757575).convertSRGBToLinear();
        this.material.transparent = true;
        this.minHeight = position.y;
        this.mesh.scale.set(0,0,0);
        this.maxHeightRandom = this.GetRandomHeight(this.maxHeight, this.minHeight);
    }

    public makeSmokeGoUp(delta:number){
        if(this.mesh.position.y >= this.maxHeightRandom){
            this.mesh.position.y = this.minHeight;
            this.maxHeightRandom = this.GetRandomHeight(this.maxHeight, this.minHeight);
            this.mesh.scale.set(0,0,0);
            this.material.opacity = 1;
        }else{
            this.mesh.position.y += 2 * delta;
            this.mesh.scale.x += 0.1 * delta;
            this.mesh.scale.y += 0.15 * delta;
            this.mesh.scale.z += 0.1 * delta;
            this.material.opacity -= 0.1 * delta;
        }
    }

    private GetRandomHeight(max:number, min:number){
        return (Math.floor(Math.random() * (max - min) ) + min) + ((Math.floor(Math.random() * (100 - 1) ) + 1) / 100);
    }
}