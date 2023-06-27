import styles from "@/src/components/Header/header.module.scss";
import Link from "next/link";

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Linear', href: '/linear' },
    { name: 'Todoist', href: '/todoist' },
    { name: 'Chat', href: '/chat'},
    { name: 'Me', href: '/me' },
    { name: 'Today', href: '/today' },
];

const Navigation = () => {
    return (
        <nav>
            <ul className={styles.navItems}>
                {
                    navItems.map((item) => {
                        return (
                            <li key={item.name} className={styles.navItem}>
                                <Link href={item.href}>{item.name}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}

export {Navigation}