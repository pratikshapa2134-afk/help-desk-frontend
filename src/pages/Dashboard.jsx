import { useEffect, useState } from 'react'
import API from '../services/api'

function Dashboard() {
  const [stats, setStats] = useState({total:0, open:0, inProgress:0, critical:0, resolved:0})

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get('/tickets/stats')
        setStats(res.data)
        console.log(res.data) // check sathi
      } catch(err) {
        console.log(err)
      }
    }
    fetchStats()
  }, [])

  return (
    <div>
      <h1>Customer Dashboard</h1>
      <div>Total Tickets: {stats.total}</div>
      <div>Open Tickets: {stats.open}</div>
      <div>In Progress: {stats.inProgress}</div>
      <div>Critical Tickets: {stats.critical}</div>
      <div>Resolved Tickets: {stats.resolved}</div>
    </div>
  )
}
export default Dashboard