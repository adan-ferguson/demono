import { DemonInstance } from "./demonInstance";
import {DemonAbility} from "../demons/abilities/ability";

class DemonAbilityInstance {
    constructor(readonly ability: DemonAbility, readonly owner: DemonInstance){
        
    }
}

export { DemonAbilityInstance }