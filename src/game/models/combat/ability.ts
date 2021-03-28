import { Action } from './action'

type AbilityClassification = 'physattack' | 'magic-attack' | 'defensive' | 'utility'

abstract class Ability {
    constructor(readonly actions: Action[]){}
    abstract get classification(): AbilityClassification
}

export { Ability, AbilityClassification }