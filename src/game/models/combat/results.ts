import { DemonInstance } from './demon/demonInstance'

interface Result {
    readonly type: string
}

interface PlayerWinResult extends Result {
    readonly type: 'playerwin'
}

interface PlayerLoseResult extends Result {
    readonly type: 'playerlose'
}

export { Result }