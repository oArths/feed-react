import styles from "./style.module.css"
import HeaderArticleComments from "../../components/header/headerArticleComments"
import UserProfile from "../../components/userProfile"
import ModalUpdateuser from "../../components/modals/modalUpdateUser"
import CardAricle from "../../components/card/cardArticle"
import { useState, useEffect } from "react"
import { useToken } from "../../context/UseToken"
import { LogOutUser } from "../../utils"

export default function Profile() {
    const [ModalUpdateOpen, setModalUpdateOpen] = useState(false)
    const [ModalEdit, setModalEdit] = useState(false)
    const [token, setToken, UserId, setUserId, userData, setUserData, modify, setModify] = useToken()
    const [error, setError] = useState({})
    const baseURL = "http://127.0.0.1:8000/img/user/";
    const [Article, setArticle] = useState([])
    const [like, setLike] = useState(false)
    const [image, setImage] = useState({ file: null, url: baseURL + userData[8] })

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/auth/articles/user/${UserId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(errorData => {
                        errorData.status = res.status;
                        throw errorData
                    })
                }
                return res.json()
            })
            .then(data => {
                if (data.data && Array.isArray(data.data)) {
                    setArticle(data.data);
                    setError({});
                }
            })
            .catch(error => {
                setError(error.message)
                console.log(error)
                if (error.status === 401) {
                    LogOutUser(setToken, setUserId, setUserData);
                }
            })
    }, [modify, like])


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



    return (
        <div className={styles.body}>

            <HeaderArticleComments
                Title="Perfil"
                onclickBack={() => (window.location.href = '/home')}
            />
            <div className={styles.feed}>
                <UserProfile
                    User={userData[1]}
                    UserImage={userData[8]}
                    UserBio={userData[3]}
                    onClickEditProfile={() => setModalUpdateOpen(!ModalUpdateOpen)}
                    disabled={ModalEdit}
                />

                <div className={styles.cardConatiner}>

                    {Article &&
                        (Article.map((Article, index) => (
                            <div key={index} >
                                <CardAricle
                                    PostImage={Article.image === null ? null : baseURL + Article.image}
                                    IsUser={true}
                                    PostIndex={index}
                                    UserImage={userData[8]}
                                    CommentsCount={Article.comments_count}
                                    HeartCount={Article.likes_count}
                                    like={Article.liked_by_user}
                                    image={Article.image}
                                    onclickHeart={() => (LikePost(Article.id, Article.liked_by_user))}
                                    onclickComments={() => (window.location.href = `/home/article/${Article.id}`)}
                                    User={userData[1]}
                                    Title={Article.title}
                                    PostId={Article.id}
                                />
                            </div>
                        )))}

                </div>
            </div>
            <ModalUpdateuser
                UserValueName={userData[1]}
                UserValueDescription={userData[3]}
                setImage={setImage}
                image={image}
                isOpen={ModalUpdateOpen}
                close={() => setModalUpdateOpen(!ModalUpdateOpen)}
                onClickBlur={() => setModalUpdateOpen(!ModalUpdateOpen)}
            />

        </div>
    )
}