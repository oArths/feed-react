import { useState, useEffect } from "react"
import CardAricle from "../../components/card/cardArticle"
import HeaderHome from "../../components/header/headerHome"
import DropDownHeader from "../../components/dropdown/dropdownHeader/index.jsx"
import ModalPost from "../../components/modalPost/index.jsx"
import ModalDeltePost from "../../components/modals/modalDeletePost/index.jsx"
import { useToken } from '../../context/UseToken';
import styles from "./style.module.css"
import { LogOutUser } from "../../utils"


export default function Home() {
    const [DropDownOpen, setDropDownOpen] = useState(false)
    const [CreateOpen, setCreateOpen] = useState(false)
    const [ModalOpen, setOpenModal] = useState(false);
    const [ImageNull, setImageNull] = useState(false)
    const [token, setToken, UserId, setUserId, userData, setUserData, modify, setModify] = useToken()
    const [Article, setArticle] = useState([])
    const [like, setLike] = useState(false)

    const LikePost = (articleId, Liked) => {
        const method = Liked ? 'DELETE' : 'POST';
        fetch(`http://127.0.0.1:8000/api/auth/like/article`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                'article_id': articleId,
                'user_id': UserId
            })
        })
        setLike(!like)
    }

    useEffect(() => {
        const fetchUserArticles = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/auth/articles/recently/user/${UserId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    errorData.status = response.status;
                    throw errorData;
                }
                const userArticles = await response.json();
                if (userArticles.data.length > 0) {
                    setArticle(userArticles.data);
                    console.log(userArticles.data)
                } else {
                    fetchGeneralArticles();
                }
            } catch (error) {
                console.log(error)
                if (error.status === 401) {
                    LogOutUser(setToken, setUserId, setUserData);
                }
            }
        };

        const fetchGeneralArticles = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/auth/articles/recently/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    errorData.status = response.status;
                    throw errorData;
                }
                const generalArticles = await response.json();
                setArticle(generalArticles.data);
                console.log(generalArticles.data)

            } catch (error) {
                console.log(error)
                if (error.status === 401) {
                    LogOutUser(setToken, setUserId, setUserData);
                }            }
        };

        fetchUserArticles();
    }, [like, modify]);
    const baseURL = "http://127.0.0.1:8000/img/user/";

    return (
        <div className={styles.body}>
            <HeaderHome
                UserPerfil={userData[8]}
                onclickPerfil={() => setDropDownOpen(!DropDownOpen)}
                onclickHome={() => (window.location.href = '/home')}
                onclickPlus={() => setCreateOpen(!CreateOpen)}
            />
            <div className={styles.feed}>

                {Article.map((Article, index) => (

                    <div key={index} >
                        <CardAricle
                            UserImage={Article.user.image}
                            CommentsCount={Article.comments_count}
                            HeartCount={Article.likes_count}
                            like={Article.liked_by_user}
                            image={Article.image}
                            onclickHeart={() => (LikePost(Article.id, Article.liked_by_user))}
                            onclickComments={() => (window.location.href = `/home/article/${Article.id}`)}
                            User={Article.user.username}
                            Title={Article.title} />
                    </div>
                ))}


            </div>
            <DropDownHeader IsOpen={DropDownOpen} Blur={() => setDropDownOpen(!DropDownOpen)} Userperfil={() => (window.location.href = "/profile")} />
            <ModalPost
                Title="Criar publicação"
                IsOpen={CreateOpen}
                Subbmit={() => setCreateOpen(!CreateOpen)}
                CloseModal={() => setOpenModal(true)}
                ClearImage={ImageNull}

            />

            <ModalDeltePost
                title="Descartar Publicação?"
                Confirm="Não"
                onClickConfirm={() => setOpenModal(!ModalOpen)}
                Delete="Descartar"
                onClickDelete={() => (setCreateOpen(!CreateOpen), setOpenModal(!ModalOpen), setImageNull(!ImageNull))}
                isOpen={ModalOpen}
            />
        </div>
    )
}