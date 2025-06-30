import React from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'

function UserDashboard() {
  useUserAuth();
  return (
    <div>
      UserDashboard
    </div>
  )
}

export default UserDashboard
