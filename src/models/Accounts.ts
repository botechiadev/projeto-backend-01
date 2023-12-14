export class Account {
    constructor(
        private id: string,
        private balance: number,
        private ownerId: string,
        private createdAt: string,
        private category: string,
        private newBalance: number = 0
    ) {}

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getBalance(): number {
        return this.balance
    }

    public setBalance(value: number): void {
        this.balance = value
    }

    public getOwnerId(): string {
        return this.ownerId
    }

    public setOwnerId(value: string): void {
        this.ownerId = value
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public getCategory(): string {
        return this.category
    }
    public setCreatedAt(value: string): void {
        this.createdAt = value
    }
    public setCategory(value: string): void {
        this.category = value
    }
    public addPoints(value: number): void {
        this.newBalance += value * 0.3;
    }

    public classifyClient(): string {
        if (this.newBalance >= 1000) {
            return "PLATINUM";
        } else if (this.newBalance >= 500) {
            return "GOLD";
        } else if (this.newBalance >= 100) {
            return "PREMIUM";
        } else if (this.newBalance >= 50) {
            return "BLACK";
        } else {
            return "BASIC";
        }
    }
}