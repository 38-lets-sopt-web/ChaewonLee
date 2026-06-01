import { Outlet } from 'react-router-dom'

const Layout = () => (
  <div className="min-h-screen bg-primary-50 text-gray-900">
    <Outlet />
  </div>
)

export default Layout
