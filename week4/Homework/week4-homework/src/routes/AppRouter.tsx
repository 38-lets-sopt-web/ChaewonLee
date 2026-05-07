import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import MyPage from '../pages/MyPage'

export default function AppRouter () {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/mypage" element={<MyPage />} />
        </Routes>
    )
}