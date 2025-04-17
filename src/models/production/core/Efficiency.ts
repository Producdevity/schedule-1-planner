export class Efficiency {
  private readonly value: number

  constructor(value: number) {
    if (value < 0 || value > 1) {
      throw new Error('Efficiency must be between 0 and 1')
    }
    this.value = value
  }

  public getValue(): number {
    return this.value
  }

  public multiply(factor: number): Efficiency {
    return new Efficiency(Math.min(1, this.value * factor))
  }

  public add(other: Efficiency): Efficiency {
    return new Efficiency(Math.min(1, this.value + other.value))
  }

  public static fromPercentage(percentage: number): Efficiency {
    return new Efficiency(percentage / 100)
  }

  public toPercentage(): number {
    return Math.round(this.value * 100)
  }
} 