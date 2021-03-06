enum DamageType {
    Physical,
    Magic,
    True
}

interface DamageInfo {
    type: DamageType,
    damage: number,
    // properties
}

interface DamageOutcome {
    type: DamageType,
    damage: number,
    blocked: number,
    // other things
}

export { DamageInfo, DamageType, DamageOutcome }