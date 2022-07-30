import { AnimationClip, NumberKeyframeTrack, QuaternionKeyframeTrack } from "three";

export class TombstoneAnimation{
    public static rotationTombstone = new QuaternionKeyframeTrack(
        '.quaternion',
        [0, 0.3],
        [
            0,0,0,0.75,
            0.7071067811865476, 0, 0, 0.75
        ],
    );

    public static disappearTombstone = new NumberKeyframeTrack(
        '.position', 
        [0, 0.5, 0.6],
        [
            0, 0.31, 0,
            0, 0.31, 0,
            0, 0, 0,
        ], 
    );

    public static raiseTombstone = new NumberKeyframeTrack(
        '.position', 
        [0,0.1, 0.2, 0.3 ,0.4],
        [
            0, -1.61, 0,
            0.1, -1.1, 0,
            -0.1, -0.6, 0,
            0.1, -0, 0,
            0, 0.85, 0
        ], 
    );
    
    public static tombstoneAppearsClip = new AnimationClip("tombstoneAppear", -1, [this.raiseTombstone])
    public static fallTombstoneClip = new AnimationClip('fallTombstone', -1, [this.rotationTombstone, this.disappearTombstone]);
}