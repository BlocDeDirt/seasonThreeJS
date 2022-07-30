import { Mesh, Vector3 } from "three";

export interface IMeshFollowPath{
    mesh:Mesh;
    position:Vector3;
    target:Vector3;
}