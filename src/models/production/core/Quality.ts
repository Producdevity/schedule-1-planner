export class Quality {
  private readonly value: number

  constructor(value: number) {
    if (value < 0 || value > 1) {
      throw new Error('Quality must be between 0 and 1')
    }
    this.value = value
  }

  public getValue(): number {
    return this.value
  }

  public multiply(factor: number): Quality {
    return new Quality(Math.min(1, this.value * factor))
  }

  public add(other: Quality): Quality {
    return new Quality(Math.min(1, this.value + other.value))
  }

  public static fromPercentage(percentage: number): Quality {
    return new Quality(percentage / 100)
  }

  public toPercentage(): number {
    return Math.round(this.value * 100)
  }
} 