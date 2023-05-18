import { FC, useState } from "react"
import { Link } from "react-router-dom";
import styles from './Header.module.scss';


export const Header: FC = () => {
    const [fiftyCent, setFiftyCent] = useState(false)
    const handleClick = () => {
        Math.round(Math.random()) ? setFiftyCent(true) : setFiftyCent(false)
    }
    return (
        <header className={styles.header}>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/guard' state={fiftyCent} onClick={handleClick}>Guard</Link>
            </nav>
        </header>
    )
}