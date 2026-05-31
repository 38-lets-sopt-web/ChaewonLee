import type { User } from '@/types/user'
import * as styles from './UserInfoList.css'

type UserInfoField = {
    label: string
    value: string | number
}

interface UserInfoListProps {
    user: User
    fields?: Array<keyof User>
}

const labelMap: Record<keyof User, string> = {
    id: '회원 ID',
    loginId: '아이디',
    name: '이름',
    email: '이메일',
    age: '나이',
    part: '파트',
}

export default function UserInfoList({
    user,
    fields = ['loginId', 'name', 'email', 'age', 'part'],
}: UserInfoListProps) {
    const userInfoFields: UserInfoField[] = fields.map((field) => ({
        label: labelMap[field],
        value: user[field],
    }))

    return (
        <div className={styles.readOnlySection}>
            {userInfoFields.map(({ label, value }) => (
                <div key={label} className={styles.infoItem}>
                    <p className={styles.infoLabel}>{label}</p>
                    <p className={styles.infoText}>{value}</p>
                </div>
            ))}
        </div>
    )
}
