import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserInfo } from "../../api/user";
import * as styles from "./MemberDetail.css";

type UserInfo = {
    id: number;
    loginId: string;
    name: string;
    email: string;
    age: number;
    part: string;
};

export default function MemberDetail() {
    const { id } = useParams();
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!id) return;

                const data = await getUserInfo(Number(id));
                setUserInfo(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [id]);

    if (!userInfo) return <div>로딩중...</div>;

    return (
        <div className={styles.container}>
            <h1>상세 조회</h1>
            <button
                onClick={() => navigate(-1)}
            >
                ← 뒤로가기
            </button>
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
        </div>
    );
}