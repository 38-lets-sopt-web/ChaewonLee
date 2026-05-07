import Input from '../../../components/Input'

interface LoginIdFormProps {
    loginId: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function LoginIdForm({
    loginId,
    onChange,
}: LoginIdFormProps) {
    return (
        <Input
            value={loginId}
            onChange={onChange}
            label="아이디"
            placeholder="아이디를 입력해주세요"
        />
    )
}