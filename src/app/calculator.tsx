import Link from 'next/link'
import Calculator from '@/components/Calculator/Calculator'

function CalculatorPage() {
  return (
    <div className="container">
      <Link href="/calculator">Calculator</Link>
      <Link href="/planner">Planner</Link>
      <Calculator />
    </div>
  )
}

export default CalculatorPage
