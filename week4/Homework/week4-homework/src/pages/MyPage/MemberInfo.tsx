import { useState, useEffect } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import MemberCard from "./components/MemberCard";
import { getUserInfo, getUserList } from "../../api/user";
import * as styles from "./MemberInfo.css";

type UserInfo = {
    loginId: string;
    name: string;
    email: string;
    age: number;
    part: string;
};

export default function MemberInfo() {
    const [memberId, setMemberId] = useState("");
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUserList();
                setUsers(data);
            } catch (error) {
                alert("유저 목록 조회 실패");
            }
        };

        fetchUsers();
    }, []);

    const handleSearch = async () => {
        if (!memberId) return;

        try {
            const data = await getUserInfo(Number(memberId));
            setUserInfo(data);
        } catch (error) {
            alert("유저 조회 실패");
        }
    };

    return (
        <div className={styles.memberInfoContainer}>
            <h1>회원 조회</h1>

            {/* 입력 영역 */}
            <div className={styles.searchSection}>
                <Input
                    type="number"
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    placeholder="회원 ID를 입력하세요"
                    label="회원 ID"
                />

                <Button
                    type="button"
                    onClick={handleSearch}
                    disabled={!memberId}
                >
                    검색
                </Button>
            </div>

            {/* 결과 영역 */}
            {userInfo && (
                <div className={styles.readOnlySection}>

                    <div className={styles.infoItem}>
                        <p className={styles.infoLabel}>아이디</p>
                        <p className={styles.infoText}>{userInfo.loginId}</p>
                    </div>

                    <div className={styles.infoItem}>
                        <p className={styles.infoLabel}>이름</p>
                        <p className={styles.infoText}>{userInfo.name}</p>
                    </div>

                    <div className={styles.infoItem}>
                        <p className={styles.infoLabel}>이메일</p>
                        <p className={styles.infoText}>{userInfo.email}</p>
                    </div>

                    <div className={styles.infoItem}>
                        <p className={styles.infoLabel}>나이</p>
                        <p className={styles.infoText}>{userInfo.age}</p>
                    </div>

                    <div className={styles.infoItem}>
                        <p className={styles.infoLabel}>파트</p>
                        <p className={styles.infoText}>{userInfo.part}</p>
                    </div>

                </div>
            )}

            {/* 결과 없을 때 */}
            {!userInfo && (
                <div className={styles.readOnlySection}>
                    원하는 ID를 검색해 보세요
                </div>
            )}

            <div className={styles.listSection}>
                <h3>전체 멤버 리스트</h3>
                <div className={styles.cardList}>
                    {users.map((user) => (
                        <MemberCard key={user.id} user={user} />
                    ))}
                </div>
            </div>
        </div>
    );
}