import { AnimationClip, VectorKeyframeTrack } from "three";

export class BarbecueAnimation{
    public static scaleAppearBarbecueKF = new VectorKeyframeTrack(
        '.scale',
        [0, 0.5, 0.6],
        [
            0, 0, 0,
            0.4, 0.4, 0.4,
            0.35,0.35,0.35,
        ],
    );

    public static scaleDisppearBarbecueKF = new VectorKeyframeTrack(
        '.scale',
        [0, 0.2, 0.3],
        [
            0.35,0.35,0.35,
            0.4, 0.4, 0.4,
            0, 0, 0,
        ],
    );
    public static barbecueAppearsClip = new AnimationClip('scaleAppearBbq', -1, [this.scaleAppearBarbecueKF]);
    public static barbecueDisappearsClip = new AnimationClip('scaleDisappearBbq', -1, [this.scaleDisppearBarbecueKF]);
}