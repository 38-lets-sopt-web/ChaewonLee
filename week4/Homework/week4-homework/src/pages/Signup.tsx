import { useState } from 'react'
import { wrapper } from './Signup.css'
import Button from '../components/Button'
import Input from '../components/Input'

export default function Signup() {
    const [step, setStep] = useState(0)

    const [form, setForm] = useState({
        loginId: '',
        password: '',
        passwordConfirm: '',
        name: '',
        email: '',
        age: '',
        part: '',
    })

    const isDisabled =
        (step === 0 && form.loginId.trim() === '') ||
        (step === 1 &&
            (form.password.trim() === '' ||
            form.passwordConfirm.trim() === '' ||
            form.password !== form.passwordConfirm)
        ) ||
        (step === 2 &&
            (form.name.trim() === '' ||
            form.email.trim() === '' ||
            form.age.trim() === '' ||
            form.part.trim() === '')
        )

    const handleChange =
        (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setForm((prev) => ({
                ...prev,
                [key]: e.target.value,
            }))
        }

    const nextStep = () => setStep((prev) => prev + 1)

    return (
        <div className={wrapper}>
            <h1>회원가입</h1>

            {step === 0 && (
                <Input
                    value={form.loginId}
                    onChange={handleChange('loginId')}
                    label="아이디"
                    placeholder="아이디를 입력해주세요"
                />
            )}

            {step === 1 && (
                <>
                    <Input
                        value={form.password}
                        onChange={handleChange('password')}
                        label="비밀번호"
                        placeholder="비밀번호를 입력해주세요"
                    />

                    <Input
                        value={form.passwordConfirm}
                        onChange={handleChange('passwordConfirm')}
                        label="비밀번호 확인"
                        placeholder="비밀번호를 다시 입력해주세요"
                    />
                </>
            )}

            {step === 2 && (
                <>
                    <Input value={form.name} onChange={handleChange('name')} label="이름" placeholder="이름을 입력해 주세요" />
                    <Input value={form.email} onChange={handleChange('email')} label="이메일" placeholder="이메일을 입력해 주세요"/>
                    <Input value={form.age} onChange={handleChange('age')} label="나이" placeholder="나이를 입력해 주세요"/>
                    <Input value={form.part} onChange={handleChange('part')} label="파트" placeholder="파트를 입력해 주세요"/>
                </>
            )}

            <Button
                disabled={isDisabled}
                onClick={() => {
                    if (step === 2) {
                        console.log('회원가입 제출', form)
                    } else {
                        nextStep()
                    }
                }}
            >
                {step === 2 ? '회원가입' : '다음'}
            </Button>
        </div>
    )
}