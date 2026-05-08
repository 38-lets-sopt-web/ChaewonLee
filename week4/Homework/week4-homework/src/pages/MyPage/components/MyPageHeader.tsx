import { useNavigate } from 'react-router-dom'
import * as styles from './MyPageHeader.css'

interface MyPageHeaderProps {
    name: string
}

export default function MyPageHeader({name}:MyPageHeaderProps) {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('userId');
        alert("로그아웃 완료")
        navigate('/login')
    }
    
    return(
        <header className={styles.header}>
            {/* 헤더의 왼쪽 영역: 유저 이름 출력 */}
            <div className={styles.userSection}>
                <h2 className={styles.userTitle}>SOPT MEMBERS</h2>
                <p className={styles.userName}>안녕하세요, {name}님</p>
            </div>

            {/* 헤더의 오른쪽 영역: 네비게이션 */}
            <nav className={styles.navSection}>
                <button onClick={() => navigate('/mypage')} className={styles.navItem}>내 정보</button>
                <button onClick={() => navigate('/mypage/members')} className={styles.navItem}>회원 정보</button>
                <button onClick={handleLogout} className={styles.navItem}>로그아웃</button>
            </nav>
        </header>
    )
}