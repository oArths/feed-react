import { useState, useEffect } from "react"
import styles from "./style.module.css"
import CardAricle from "../../components/card/cardArticle"
import HeaderArticleComments from "../../components/header/headerArticleComments"
import ReplaceComments from "../../components/ReplaceComments"
import ModalComment from "../../components/ModalComment/index.jsx";
import ModalDeltePost from "../../components/modals/modalDeletePost/index.jsx"
import { useToken } from "../../context/UseToken"


export default function ArticleComments() {
    const [CreateOpen, setCreateOpen] = useState(false)
    const [ModalOpen, setOpenModal] = useState(false);
    const [token, setToken, UserId, setUserId, userData, setUserData, modify, setModify] = useToken()
    const [image, setImage] = useState(null)
    const [ImageNull, setImageNull] = useState(false)
    const [comments, setComments] = useState([])
    const [article, setArticle] = useState([])
    const [reply, setReplay] = useState({
        user: 'texte',
        title: 'texte',
        UserImageAwmser: '',
        commentsId: ''
    })

    const path = window.location.href
    const id = path.split('/')

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/auth/comment/all/${id[5]}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }

        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw errorData
                    })
                }
                return response.json()
            })
            .then(data => {
                setArticle(data.data.article[0])
                setComments(data.data.comments)
            })
            .catch(error => {
                window.location.href = '';
            })
    }, [modify])

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
            .then(response => {
                return response.json()
            })
            .then(data => {
                setModify(!modify)
            })
            .catch(error => {
                window.location.href = '';
            })

    }

    const likeComments = (ArticleId, CommentsId, Liked) => {
        const method = Liked ? 'DELETE' : 'POST';

        fetch('http://127.0.0.1:8000/api/auth/like/comment', {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "article_id": ArticleId,
                "user_id": UserId,
                "comment_id": CommentsId,
            })
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw errorData
                    })
                }
                return response.json()
            }
            )
            .then(data => {
                window.location.href = ''; 
                setModify(!modify)
            })
            .catch(error => {
                console.error(error)
            })
    }

    const NewReply = (Info) => {
        setReplay(Info)
        setCreateOpen(!CreateOpen)
    }
    return (
        <div className={styles.body} >
            <HeaderArticleComments onclickBack={() => (window.location.href = '/home')} Title="Comentarios" />
            <div className={styles.feed} >
                {article && article.user && (
                    <CardAricle
                        UserImage={article.user.image}
                        User={article.user.username}
                        image={article.image}
                        Title={article.title}
                        like={article.liked_by_user}
                        HeartCount={article.likes_count}
                        CommentsCount={article.comments_count}
                        onclickHeart={() => (LikePost(article.id, article.liked_by_user))}
                        onclickComments={() => NewReply({
                            UserImageAwmser: article.user.image,
                            user: article.user.username,
                            title: article.title,
                        })}

                    />
                )}
                <div className={styles.Header}>
                    <div className={styles.Title}>
                        Respostas
                    </div>
                </div>
                {comments.map((Comments, index) => (
                    <div key={index}>

                        <ReplaceComments
                            onclickComments={() => NewReply({
                                user: Comments.user.username,
                                title: Comments.content,
                                UserImageAwmser: Comments.user.image,
                                commentsId: Comments.id
                            })}
                            onclickHeart={() => likeComments(article.id, Comments.id, Comments.like_by_user_comment)}
                            Content={Comments.content}
                            like={Comments.like_by_user_comment}
                            HeartCount={Comments.likes_comments_count}
                            CommentsCount={Comments.replies.length}
                            User={Comments.user.username}
                            UserImage={Comments.user.image}
                        />
                    </div>
                ))}

            </div>
            <ModalComment
                UserImageAwmser={reply.UserImageAwmser}
                UserAwnser={reply.user}
                placeholderText={reply.user}
                UserTextAwnser={reply.title}
                User={userData[1]}
                UserImage={userData[7]}
                IsOpen={CreateOpen}
                CloseFinaly={() => setCreateOpen(!CreateOpen)}
                CloseModal={() => setOpenModal(true)}
                setImage={setImage} image={image}
                ClearImage={ImageNull}
                articleId={article.id}
                commentsId={reply.commentsId}

            />
            <ModalDeltePost
                title="Descartar Comentario?"
                Confirm="Não"
                onClickConfirm={() => setOpenModal(!ModalOpen)}
                Delete="Descartar"
                onClickDelete={() => (setCreateOpen(!CreateOpen), setOpenModal(!ModalOpen), setImageNull(!ImageNull))}
                isOpen={ModalOpen}
            />
        </div>
    )
}