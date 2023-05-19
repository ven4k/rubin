import { ChangeEvent, FC, Fragment, useEffect, useState, MouseEvent, useMemo } from 'react';
import { Iphotos, Iposts } from '../../types/types';
import styles from './Main.module.scss';



export const Main: FC = () => {

    const [posts, setPosts] = useState<Iposts[]>([])
    const [photos, setPhotos] = useState<Iphotos[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=9')
            .then(response => response.json())
            .then((result: Iposts[]) => setPosts(result))

        fetch('https://jsonplaceholder.typicode.com/photos?_limit=20')
            .then(response => response.json())
            .then((result: Iphotos[]) => setPhotos(result))

    }, [])

    const handleAddItem = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                userId: 777,
                title: inputValue,
                body: 'Saepe non sed dolores esse porro quia veniam rerum quos quod, eos possimus reprehenderit sit unde odio aliquam repellat soluta libero sint?'
            })
        })
        const result = await response.json();
        setPosts([...posts, result])
    }

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }



    const renderItem = useMemo(() => {
        let newTitle;
        const handleUpdateItem = async (e: MouseEvent<HTMLButtonElement>, id: number) => {
            newTitle = posts.map(item => {
                if (item.id === Number(id)) {
                    return item.title
                }
                return null
            })
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    title: newTitle.join('')
                })
            });
            const result = await response.json();
            if (result) {
                setPosts(posts.map(item => item.id === id ? result : item))
    
            }
        }
    
        const handleDeleteItem = async (id: number) => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            });
            const result = await response.json();
            if (result) {
                setPosts(posts.filter(el => el.id !== id))
            }
        }
    
        const handleChange = (e: ChangeEvent<HTMLInputElement>, id: string) => {
            newTitle = posts.map(item => {
                if (item.id === Number(id)) {
                    item.title = e.target.value
                }
                return item
            })
        }
        const photoItem = photos.map(item => (
            <Fragment key={item.id}><img src={item.url} alt='' /></Fragment>
        ))
        return (
            <div className={styles.mainContent}>
                {posts.map((el, index) => (
                    <div key={el.id} className={styles.postBlock}>
                        {photoItem[Math.ceil(Math.random() * index)]}
                        <h2>{el.userId}</h2>
                        <h3>{el.title}</h3>
                        <p>{el.body}</p>
                        <div className={styles.postInputsBlock}>
                            <input className={styles.changeTitle} type='text' placeholder='Change Title' onChange={(e) => handleChange(e, String(el.id))} />
                            <button className={styles.saveTitle} onClick={(e) => handleUpdateItem(e, el.id)}>Save Changes</button>
                        </div>

                        <button className={styles.deleteBtn} onClick={() => handleDeleteItem(el.id)}>Delete Post</button>
                    </div>)
                )}
            </div>
        )
    }, [photos, posts])

    return (
        <main className={styles.main}>
            {posts.length ? (
                <>
                    <div className={styles.inputBlock}>
                        <input type='text' placeholder='Text post' value={inputValue} onChange={handleChangeInput} />
                        <button onClick={handleAddItem}>Add</button>
                    </div>
                    {renderItem}
                </>
            ) : ((<h2 className={styles.loading}>Loading ...</h2>))
            }

        </main>
    )
}
