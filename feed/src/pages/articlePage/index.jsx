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
    const [comments, setComments] = useState([])
    const [article, setArticle] = useState([])
    const [reply, setReplay] = useState({
        user: 'texte',
        title: 'texte',
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
                console.log("data", data.data.comments)
                console.log("data", data.data.article[0])
            })
            .catch(error => {
                console.log("error", error)
            })
    }, [])

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
                    />
                )}
                <div className={styles.Header}>
                    <div className={styles.Title}>
                        Respostas
                    </div>
                </div>
                {comments.map((Comments, index) => (
                    <div key={index}>

                        <ReplaceComments onclickComments={() => NewReply({
                            user: 'comments',
                            title: 'commentsss',
                        })} 
                        Content={Comments.content}
                         HeartCount={Comments.likes_comments_count}
                         CommentsCount={Comments.replies}
                        User={Comments.user.username}
                        UserImage={Comments.user.image}
                        />
                    </div>
                ))}

            </div>
            <ModalComment
                UserAwnser={reply.user}
                UserTextAwnser={reply.title}
                User={reply.user}
                IsOpen={CreateOpen}
                Subbmit={() => setCreateOpen(!CreateOpen)}
                CloseModal={() => setOpenModal(true)}
                setImage={setImage} image={image}

            />
            <ModalDeltePost
                title="Descartar Comentario?"
                Confirm="Não"
                onClickConfirm={() => setOpenModal(!ModalOpen)}
                Delete="Descartar"
                onClickDelete={() => (setCreateOpen(!CreateOpen), setOpenModal(!ModalOpen), setImage(null))}
                isOpen={ModalOpen}
            />
        </div>
    )
}