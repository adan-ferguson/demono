import { Action } from './action'

type AbilityClassification = 'phys-attack' | 'magic-attack' | 'defensive' | 'utility'

abstract class Ability {
    constructor(readonly actions: Action[]){}
    abstract get classification(): AbilityClassification
}

export { Ability, AbilityClassification }