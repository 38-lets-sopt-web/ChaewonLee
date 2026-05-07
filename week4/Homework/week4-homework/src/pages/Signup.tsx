import {useState} from 'react'
import { wrapper } from './Signup.css'
import Button from '../components/Button'
import Input from '../components/Input'

export default function Signup() {
    const [loginId, setLoginId] = useState('')

    return(
        <div className={wrapper}>
            <h1>회원가입</h1>

            <Input
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                label='아이디'
                placeholder="아이디를 입력해주세요"
            />

            <Button onClick={() => alert(loginId)}>
                다음
            </Button>
        </div>
    )
}