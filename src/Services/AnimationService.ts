import { AnimationAction, AnimationMixer } from "three";

export class AnimationService{
    public static animationActions:AnimationAction[] = [];
    public static animationMixers:AnimationMixer[] = [];
    public static animationInAction = false;
    private static nbrMixer = 0;
    private static counter = 0;
    private static callback?:() => void;

    public static resetActionNMixer(){
        this.animationActions = [];
        this.animationMixers = [];
        this.nbrMixer = 0;
        this.counter = 0;
        if(this.callback){
            this.callback();
        }
        /*this.animationMixers.forEach(mixer => {
            mixer.stopAllAction();
        });*/
    }

    public static hardReset(){
        this.animationInAction = false;
        this.animationMixers.forEach(mixer => {
            mixer.stopAllAction();
        });
        this.nbrMixer = 0;
        this.counter = 0;
        this.animationActions = [];
    }

    public static GetAnimationMixerFromAction(){
        this.animationActions.forEach(action => {
            this.animationMixers.push(action.getMixer());
            this.nbrMixer++;
        });
    }

    public static PlayAnimation(addRandomDelayToAction:boolean = false, callbackWhenAnimationIsFinished?:() => void){
        this.callback = callbackWhenAnimationIsFinished;

        this.animationActions.forEach((action) => {
            action.clampWhenFinished = true;
            action.repetitions = 1;
            if(addRandomDelayToAction)
                action.startAt(Math.floor(Math.random() * 500 )/1000)

            action.play();
        });

        for(let i = 0; i < this.animationMixers.length; i++){            
            this.animationMixers[i].addEventListener("finished", this.animationMixerFinished.bind(this));
        }
        
    }

    private static animationMixerFinished(){
        //this.animationMixers = this.animationMixers.filter(mixer => mixer.getRoot().uuid != e.action._mixer._root.uuid);
        //console.log(e.action._mixer._root.uuid)
        this.counter++;
        if(this.counter == this.nbrMixer){ //every mixer is finished
            for(let i = 0; i < this.animationMixers.length; i++){
                this.animationMixers[i].removeEventListener("finished", this.animationMixerFinished.bind(this));
            }
            this.resetActionNMixer();
        }
    }
}