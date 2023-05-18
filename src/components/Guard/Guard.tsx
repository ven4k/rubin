import { FC, useEffect,  } from "react"
import styles from './Guard.module.scss';
import { useLocation } from "react-router-dom";


export const Guard: FC = () => {
    const location = useLocation();
    const redirectTo = 'https://countries-app-dusky-eight.vercel.app';
 
    useEffect(() => {
        let redirect = setTimeout(() => {
            if (location.state) {
                window.open(redirectTo, '_blank');
            } else{
               console.log('fault')
            }
            return
        }, 700)
        return () => {
            clearTimeout(redirect)
        }
    }, [location.state])
    return (
        <div className={styles.guard}>
            {location.state ? <h2>Запрос выполнен успешно!</h2> : <h1>{'Упс, что-то пошло не так :('}</h1>}
        </div>
    )
}