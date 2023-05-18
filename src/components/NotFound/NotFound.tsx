import { FC } from "react"
import styles from './NotFound.module.scss'

export const NotFound:FC = () => {
    return (
        <div className={styles.notFound}>
            <h1>{'Такой страницы не существует :('}</h1>
        </div>
    )
}