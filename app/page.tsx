import Link from "next/link";
import styles from "./page.module.scss";

export default async function Home() {

    return (
        <main className={styles.main}>
            <div style={{ gap: '3rem' }} className="flex-col justify-center items-center">
                <Link href="/signup">SignUp</Link>
                <Link href={"/login"}>Login</Link>
                <Link href={"/user/client"}>User page (client)</Link>
                <Link href={"/user/server"}>User page (server)</Link>
            </div>
        </main>
    );


}
