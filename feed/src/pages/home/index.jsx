import { useState, useEffect } from "react"
import CardAricle from "../../components/card/cardArticle"
import HeaderHome from "../../components/header/headerHome"
import DropDownHeader from "../../components/dropdown/dropdownHeader/index.jsx"
import ModalPost from "../../components/modalPost/index.jsx"
import ModalDeltePost from "../../components/modals/modalDeletePost/index.jsx"
import { useToken } from '../../context/UseToken';
import styles from "./style.module.css"

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
                method : method,
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`,
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
                console.log(method === 'POST' ? "curtiu" : "descurtiu", data);
                setLike(!like)
            })
            .catch(error => {
                console.log("erro",error.error)
            })
        
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
                    throw errorData;
                }
                const userArticles = await response.json();
                if (userArticles.data.length > 0) {
                    setArticle(userArticles.data);
                    console.log("User articles", userArticles);
                } else {
                    fetchGeneralArticles();
                }
            } catch (error) {
                console.log("error", error);
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
                    throw errorData;
                }
                const generalArticles = await response.json();
                setArticle(generalArticles.data);
                console.log("General articles", generalArticles);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchUserArticles();
    }, [like]);
    const baseURL = "http://127.0.0.1:8000/img/user/";

    return (
        <div className={styles.body}>
            <HeaderHome
                onclickPerfil={() => setDropDownOpen(!DropDownOpen)}
                onclickHome={() => (window.location.href = '/home')}
                onclickPlus={() => setCreateOpen(!CreateOpen)}
            />
            <div className={styles.feed}>
                
            {Article.map((Article, index ) => (

                <div key={index} >
                <CardAricle
                    UserImage={userData[7]}
                    CommentsCount={Article.comments_count}
                    HeartCount={Article.likes_count}
                    like={Article.liked_by_user}
                    image={Article.image}
                    onclickHeart={()=> (LikePost(Article.id, Article.liked_by_user))}
                    onclickComments={() => (window.location.href = '/home/article')}
                    User={Article.user.username}
                    Title={Article.title}/>
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