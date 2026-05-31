import Input from '../../../components/Input'

interface PasswordFormProps {
    password: string
    passwordConfirm: string
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onPasswordConfirmChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void
}

export default function PasswordForm({
    password,
    passwordConfirm,
    onPasswordChange,
    onPasswordConfirmChange,
}: PasswordFormProps) {
    return (
        <>
            <Input
                value={password}
                onChange={onPasswordChange}
                label="비밀번호"
                placeholder="비밀번호를 입력해주세요"
            />

            <Input
                value={passwordConfirm}
                onChange={onPasswordConfirmChange}
                label="비밀번호 확인"
                placeholder="비밀번호를 다시 입력해주세요"
            />
        </>
    )
}