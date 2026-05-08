import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@/components/Button";
import { getUserInfo } from "@/api/user";
import type { User } from "@/types/user";
import UserInfoList from "./components/UserInfoList";
import * as styles from "./MemberDetail.css";

export default function MemberDetail() {
    const { id } = useParams();
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;

            try {
                const data = await getUserInfo(Number(id));
                setUserInfo(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [id]);

    if (!userInfo) return <div className={styles.container}>로딩중...</div>;

    return (
        <div className={styles.container}>
            <h1>상세 조회</h1>
            <Button type="button" onClick={() => navigate(-1)}>
                뒤로가기
            </Button>
            <UserInfoList user={userInfo} />
        </div>
    );
}
