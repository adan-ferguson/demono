interface Stats {
    strength: number,
    magic: number,
    armor: number,
    speed: number
}

interface StatModifiers {
    strength?: number,
    magic?: number,
    armor?: number,
    speed?: number
}

export { Stats, StatModifiers }