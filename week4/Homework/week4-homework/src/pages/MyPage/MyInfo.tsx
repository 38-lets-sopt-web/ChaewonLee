import Button from "@/components/Button";
import Input from "@/components/Input";
import { getUserInfo, updateUserInfo } from "../../api/user";
import { useState, useEffect } from "react";
import * as styles from "./MyInfo.css";

export default function MyInfo() {
    const userId = Number(localStorage.getItem('userId'))
    const [userInfo, setUserInfo] = useState({
        loginId: "",
        part: "",
        name: "",
        email: "",
        age: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUserInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (!userInfo) return;

        const userId = Number(localStorage.getItem("userId"));

        try {
            await updateUserInfo(userId, {
                name: userInfo.name,
                email: userInfo.email,
                age: Number(userInfo.age),
            });

            alert("수정 완료");
            } catch (error) {
                alert("수정 실패");
                console.log(error)
            }
    };

    useEffect(() => {
        if (!userId) return;

        const fetchUser = async () => {
            try {
                const data = await getUserInfo(userId);
                setUserInfo(data);
                console.log(data);
            } catch (error) {
                alert("유저 조회 실패");
            }
        };

        fetchUser();
    }, []);

    return (
        <div className={styles.userInfoContainer}>
            <h1>내 정보</h1>

            {/* 읽기 전용 영역 */}
            <div className={styles.readOnlySection}>

                <div className={styles.infoItem}>
                    <p className={styles.infoLabel}>아이디</p>
                    <p className={styles.infoText}>{userInfo.loginId}</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.infoLabel}>파트</p>
                    <p className={styles.infoText}>{userInfo.part}</p>

                </div>
            </div>

            {/* 수정 영역 */}
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