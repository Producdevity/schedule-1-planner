export enum Resource {
  WATER = 'water',
  POWER = 'power',
  TIME = 'time',
  SPACE = 'space'
}

export class ResourceConsumption {
  private readonly consumption: Map<Resource, number>

  constructor(consumption: Map<Resource, number>) {
    this.consumption = new Map(consumption)
  }

  public getConsumption(resource: Resource): number {
    return this.consumption.get(resource) ?? 0
  }

  public getConsumptionMap(): Map<Resource, number> {
    return new Map(this.consumption)
  }

  public add(other: ResourceConsumption): ResourceConsumption {
    const newConsumption = new Map(this.consumption)
    for (const [resource, amount] of other.consumption) {
      newConsumption.set(resource, (newConsumption.get(resource) ?? 0) + amount)
    }
    return new ResourceConsumption(newConsumption)
  }

  public multiply(factor: number): ResourceConsumption {
    const newConsumption = new Map()
    for (const [resource, amount] of this.consumption) {
      newConsumption.set(resource, amount * factor)
    }
    return new ResourceConsumption(newConsumption)
  }
} 