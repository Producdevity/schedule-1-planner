import Link from 'next/link'

function Home() {
  return (
    <div className="container">
      <Link href="/calculator">Calculator</Link>
      <Link href="/planner">Planner</Link>
    </div>
  )
}

export default Home
