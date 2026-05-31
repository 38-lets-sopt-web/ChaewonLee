import type { User } from "@/types/user";
import { useNavigate } from "react-router-dom";
import * as styles from "./MemberCard.css";

export default function MemberCard({ user }: { user: User }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/mypage/members/${user.id}`);
    };

    return (
        <button type="button" className={styles.card} onClick={handleClick}>
            <p className={styles.name}>{user.name}</p>
            <p className={styles.part}>{user.part}</p>
        </button>
    );
}
