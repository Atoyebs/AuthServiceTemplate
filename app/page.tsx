import Link from "next/link";
import { customFrontendConfig } from "./config/frontend";
import styles from "./page.module.scss";

if (typeof window !== "undefined") {
    // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
    customFrontendConfig();
}

export default function Home() {
    return (
        <main className={styles.main}>
            <div style={{ gap: '3rem' }} className="flex-col justify-center items-center">
                <Link href="/signup">SignUp</Link>
                <Link href={"/login"}>Login</Link>
            </div>
        </main>
    );
}
