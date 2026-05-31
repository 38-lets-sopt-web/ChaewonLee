import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input'
import Button from '../../components/Button'
import * as styles from './Login.css'
import { signin } from '../../api/auth'

export default function Login() {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        loginId: '',
        password: '',
    })

    const handleChange =
        (key: string) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setForm((prev) => ({
                ...prev,
                [key]: e.target.value,
            }))
        }

    const isDisabled =
        form.loginId.trim() === '' || form.password.length === 0

    const submitLogin = async () => {
        try {
            const data = await signin({
                loginId: form.loginId,
                password: form.password,
            })

            localStorage.setItem('userId', data.data.userId)

            alert('로그인 성공!')
            navigate('/mypage')
        } catch (error) {
            console.error(error)
            alert('로그인 실패')
        }
    }
    return (
        <div className={styles.wrapper}>
            <h1>로그인</h1>

            <Input
                value={form.loginId}
                onChange={handleChange('loginId')}
                label="아이디"
                placeholder="아이디를 입력해주세요"
            />

            <Input
                type="password"
                value={form.password}
                onChange={handleChange('password')}
                label="비밀번호"
                placeholder="비밀번호를 입력해주세요"
            />

            <Button
                disabled={isDisabled}
                onClick={submitLogin}
            >
                로그인
            </Button>

            <Button
                variant = "ghost"
                onClick={() => navigate('/signup')}
            >
                회원가입
            </Button>
        </div>
    )
}