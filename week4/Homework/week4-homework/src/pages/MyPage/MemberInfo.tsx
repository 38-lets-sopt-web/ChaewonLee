import { useState, useEffect } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { getUserInfo, getUserList } from "@/api/user";
import type { User } from "@/types/user";
import MemberCard from "./components/MemberCard";
import UserInfoList from "./components/UserInfoList";
import * as styles from "./MemberInfo.css";

export default function MemberInfo() {
    const [memberId, setMemberId] = useState("");
    const [userInfo, setUserInfo] = useState<User | null>(null);
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
            setUserInfo(null);
        }
    };

    return (
        <div className={styles.memberInfoContainer}>
            <h1>회원 조회</h1>

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

            {userInfo ? (
                <UserInfoList user={userInfo} />
            ) : (
                <div className={styles.emptySection}>
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