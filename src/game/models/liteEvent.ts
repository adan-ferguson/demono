class TypedEvent<T>{
    private handlers: { (data: T): void }[] = []

    public on(handler: { (data: T): void }) : void {
        this.handlers.push(handler)
    }

    public off(handler: { (data: T): void }) : void {
        this.handlers = this.handlers.filter(h => h !== handler)
    }

    public trigger(data: T): void {
        this.handlers.slice(0).forEach(h => h(data))
    }
}

class LiteEvent{
    private handlers: { (): void }[] = []

    public on(handler: { (): void }) : void {
        this.handlers.push(handler)
    }

    public off(handler: { (): void }) : void {
        this.handlers = this.handlers.filter(h => h !== handler)
    }

    public trigger(): void {
        this.handlers.slice(0).forEach(h => h())
    }
}

export { LiteEvent, TypedEvent }