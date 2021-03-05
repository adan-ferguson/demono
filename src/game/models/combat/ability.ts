import { Action } from './action'

abstract class Ability {
    constructor(readonly actions: Action[]){}
}

export { Ability }