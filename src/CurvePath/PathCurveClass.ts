import { BufferGeometry, CatmullRomCurve3, Line, LineBasicMaterial, Vector3 } from "three";
import { IMeshFollowPath } from "../Interface/IMeshFollowPath";

export class PathCurve{
    public objectToMove!:IMeshFollowPath;
    public mesh!:Line;
    public material!:LineBasicMaterial;
    public curve!:CatmullRomCurve3;
    public canAnimateMesh = false;
    constructor(){
        this.createCurve();
    }

    private createCurve(){
        this.curve = new CatmullRomCurve3( [
            new Vector3( -3.5, 0.3, 3 ),
            new Vector3( -3, 0.7, 2.5 ),
            new Vector3( -2.5, 0.4, 1 ),
            new Vector3( 0.7, 0.8, 1 ),
            new Vector3( 2, 0.3, -0.7 ),
            new Vector3( -3.2, 0.9, -3.3 ),
        ], true );

        const points = this.curve.getPoints( 50 );
        const geometry = new BufferGeometry().setFromPoints( points );

        this.material = new LineBasicMaterial( { color: 0xff0000 } );
        this.material.visible = false;
        this.mesh = new Line( geometry, this.material );
    }

    public moveMeshAlongPath(time:number){
        time *= 0.001;
        let meshTime = time * 0.15;
        let lookAtValue = (meshTime % 1) + 0.001;
        this.curve.getPointAt(meshTime % 1, this.objectToMove.position);
        this.curve.getPointAt(lookAtValue > 1 ? 1 : lookAtValue, this.objectToMove.target);
        this.objectToMove.mesh.position.set(this.objectToMove.position.x, this.objectToMove.position.y, this.objectToMove.position.z);
        this.objectToMove.mesh.lookAt(this.objectToMove.target.x, this.objectToMove.position.y, this.objectToMove.target.z);
    }
}