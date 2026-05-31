import Input from '../../../components/Input'

interface UserInfoFormProps{
    name: string
    email: string
    age: string
    part: string
    onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onAgeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onPartChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}


export default function UserInfoForm({
    name,
    email,
    age,
    part,
    onNameChange,
    onEmailChange,
    onAgeChange,
    onPartChange
}: UserInfoFormProps) {
    return(
        <>
            <Input value={name} onChange={onNameChange} label="이름" placeholder="이름을 입력해 주세요" />
            <Input value={email} onChange={onEmailChange} label="이메일" placeholder="이메일을 입력해 주세요"/>
            <Input value={age} onChange={onAgeChange} label="나이" placeholder="나이를 입력해 주세요"/>
            <Input value={part} onChange={onPartChange} label="파트" placeholder="파트를 입력해 주세요"/>
        </>
    )
}

