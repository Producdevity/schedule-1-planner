import Link from 'next/link'
import Planner from '@/components/Planner/Planner'

function PlannerPage() {
  return (
    <div className="container">
      <Link href="/calculator">Calculator</Link>
      <Link href="/planner">Planner</Link>
      <Planner />
    </div>
  )
}

export default PlannerPage
