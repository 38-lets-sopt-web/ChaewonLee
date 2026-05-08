import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import MyPage from '../pages/MyPage'
import MyInfo from '../pages/MyPage/MyInfo'
import MemberInfo from '../pages/MyPage/MemberInfo'


export default function AppRouter () {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/mypage" element={<MyPage />}>
                <Route index element={<MyInfo />} />
                <Route path="members" element={<MemberInfo />} />
            </Route>
        </Routes>
    )
}