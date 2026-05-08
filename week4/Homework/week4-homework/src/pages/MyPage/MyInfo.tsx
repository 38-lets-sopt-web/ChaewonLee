import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { getUserInfo, updateUserInfo } from "@/api/user";
import type { User } from "@/types/user";
import UserInfoList from "./components/UserInfoList";
import * as styles from "./MyInfo.css";

type EditableUserInfo = Omit<User, "age"> & {
    age: string;
};

const initialUserInfo: EditableUserInfo = {
    id: 0,
    loginId: "",
    part: "",
    name: "",
    email: "",
    age: "",
};

export default function MyInfo() {
    const userId = Number(localStorage.getItem("userId"));
    const [userInfo, setUserInfo] = useState<EditableUserInfo>(initialUserInfo);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUserInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (!userId) return;

        try {
            await updateUserInfo(userId, {
                name: userInfo.name,
                email: userInfo.email,
                age: Number(userInfo.age),
            });

            alert("수정 완료");
        } catch (error) {
            alert("수정 실패");
            console.error(error);
        }
    };

    useEffect(() => {
        if (!userId) return;

        const fetchUser = async () => {
            try {
                const data = await getUserInfo(userId);
                setUserInfo({
                    ...data,
                    age: String(data.age),
                });
            } catch (error) {
                alert("유저 조회 실패");
                console.error(error);
            }
        };

        fetchUser();
    }, [userId]);

    return (
        <div className={styles.userInfoContainer}>
            <h1>내 정보</h1>

            <UserInfoList
                user={{ ...userInfo, age: Number(userInfo.age) }}
                fields={["loginId", "part"]}
            />

            <div className={styles.editableSection}>
                <Input
                    name="name"
                    value={userInfo.name}
                    onChange={handleChange}
                    label="이름"
                />

                <Input
                    name="email"
                    type="email"
                    value={userInfo.email}
                    onChange={handleChange}
                    label="이메일"
                />

                <Input
                    name="age"
                    value={userInfo.age}
                    onChange={handleChange}
                    label="나이"
                />
            </div>

            <Button type="submit" onClick={handleSubmit}>정보 수정하기</Button>
        </div>
    );
}
