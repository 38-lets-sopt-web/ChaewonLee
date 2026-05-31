import { useEffect, useState } from "react";
import MyPageHeader from "./components/MyPageHeader";
import { Outlet } from "react-router-dom";
import { getUserInfo } from "@/api/user";

export default function MyPage() {
    const userId = localStorage.getItem("userId");

    const [name, setName] = useState<string>("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!userId) return;

                const data = await getUserInfo(Number(userId));
                setName(data.name);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUser();
    }, [userId]);

    return (
        <>
            <MyPageHeader name={name} />
            <Outlet />
        </>
    );
}