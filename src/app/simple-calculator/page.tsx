import Link from 'next/link'
import SimpleCalculator from '@/components/SimpleCalculator/SimpleCalculator'

function SimpleCalculatorPage() {
  return (
    <div className="container">
      <Link href="/">Planner</Link>
      <Link href="/calculator">Calculator</Link>
      <SimpleCalculator />
    </div>
  )
}

export default SimpleCalculatorPage
