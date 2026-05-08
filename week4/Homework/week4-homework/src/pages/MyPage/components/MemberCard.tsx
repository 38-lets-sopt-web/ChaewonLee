import { useNavigate } from "react-router-dom";
import * as styles from "./MemberCard.css";

type UserInfo = {
    id: number;
    loginId: string;
    name: string;
    email: string;
    age: number;
    part: string;
};

export default function MemberCard({ user }: { user: UserInfo }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/mypage/members/${user.id}`);
    };

    return (
        <div className={styles.card} onClick={handleClick}>
            <p className={styles.name}>{user.name}</p>
            <p className={styles.part}>{user.part}</p>
        </div>
    );
}