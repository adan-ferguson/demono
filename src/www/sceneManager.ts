import { Scene } from './views/scene'

class SceneManager {

    currentScene: Scene

    constructor(private sceneEl: HTMLElement){

    }

    public setScene(scene: Scene): void{
        this.sceneEl.replaceWith(scene.element)
        this.sceneEl = scene.element
        this.currentScene = scene
        scene.begin()
    }
}

export { SceneManager }