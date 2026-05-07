import { useState } from 'react'
import { wrapper, loginLink } from './Signup.css'
import Button from '../../components/Button'
import type { SignupForm } from '../../types/auth'
import { signup } from '../../api/auth'
import LoginIdForm from './components/LoginIdForm'
import PasswordForm from './components/PasswordForm'
import UserInfoForm from './components/UserInfoForm'
import { SIGNUP_STEP } from './constants'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
    const [step, setStep] = useState(0)

    const [form, setForm] = useState<SignupForm>({
        loginId: '',
        password: '',
        passwordConfirm: '',
        name: '',
        email: '',
        age: '',
        part: '',
    })

    const navigate = useNavigate()

    /* 아이디 검증 */
    const isLoginIdTooLong = form.loginId.length > 20

    const isLoginIdInvalid =
        form.loginId.trim() === '' ||
        isLoginIdTooLong

    /* 비밀번호 검증 */
    const hasPasswordMinLength =
        form.password.length >= 8 &&
        form.password.length <= 20

    const hasPasswordEnglish =
        /[a-zA-Z]/.test(form.password)

    const hasPasswordNumber =
        /\d/.test(form.password)

    const hasPasswordSpecialCharacter =
        /[!@#$%^&*(),.?":{}|<>]/.test(form.password)

    const hasPasswordWhitespace =
        /\s/.test(form.password)
    
    const isPasswordInvalid =
        form.password === '' ||
        form.passwordConfirm === '' ||
        !hasPasswordMinLength ||
        !hasPasswordEnglish ||
        !hasPasswordNumber ||
        !hasPasswordSpecialCharacter ||
        hasPasswordWhitespace ||
        form.password !== form.passwordConfirm

    /* 유저 정보 검증 */
    const isUserInfoInvalid =
        form.name === '' ||
        form.email === '' ||
        form.age === '' ||
        form.part === '' 
    
    /* 최종 버튼 비활성화 조건 */                        
    const isDisabled =
        (step === SIGNUP_STEP.LOGIN_ID && isLoginIdInvalid) ||
        (step === SIGNUP_STEP.PASSWORD && isPasswordInvalid) ||
        (step === SIGNUP_STEP.USER_INFO && isUserInfoInvalid)

    const handleChange =
        (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setForm((prev) => ({
                ...prev,
                [key]: e.target.value,
            }))
        }

    const nextStep = () => setStep((prev) => prev + 1)

    const submitSignup = async () => {
        try {
            const data = await signup(form)

            alert(`${form.name}님 회원가입 성공!`)
            navigate('/login')

        } catch (error) {
            console.error(error)
            alert("회원가입 실패")
        }
    }

    return (
        <div className={wrapper}>
            <h1>회원가입</h1>

            {step === SIGNUP_STEP.LOGIN_ID && (
                <LoginIdForm
                    loginId={form.loginId}
                    onChange={handleChange('loginId')}
                />
            )}

            {step === SIGNUP_STEP.PASSWORD && (
                <PasswordForm
                    password={form.password}
                    passwordConfirm={form.passwordConfirm}
                    onPasswordChange={handleChange('password')}
                    onPasswordConfirmChange={handleChange('passwordConfirm')}
                />  
            )}

            {step === SIGNUP_STEP.USER_INFO && (
                <UserInfoForm
                    name={form.name}
                    email={form.email}
                    age={form.age}
                    part={form.part}
                    onAgeChange={handleChange('age')}
                    onEmailChange={handleChange('email')}
                    onNameChange={handleChange('name')}
                    onPartChange={handleChange('part')}
                />
            )}

            <Button
                disabled={isDisabled}
                onClick={() => {
                    if (step === 2) {
                        submitSignup()
                    } else {
                        nextStep()
                    }
                }}
            >
                {step === 2 ? '회원가입' : '다음'}
            </Button>

            <p>
                이미 계정이 있나요?{' '}
                <span onClick={() => navigate('/login')} className={loginLink}>
                    로그인
                </span>
            </p>
        </div>
    )
}