import { useState, useEffect } from "react"
import CardAricle from "../../components/card/cardArticle"
import Heart from "../../assests/imgs/heart.svg"
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
    const [token, setToken, UserId] = useToken()
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
        fetch(`http://127.0.0.1:8000/api/auth/articles/recently/user/${UserId}`,{
            method  : 'GET',
            headers : {
                'Content-Type' : 'appiclation/json',
                'Authorization' : `Bearer ${token}` 
            },
        }) 
        .then(response => {
            if(!response.ok){
                return response.json().then(errorData => {
                    throw errorData
                })
            }
            return response.json()
        })
        .then(data =>{
            setArticle(data.data)
            console.log(data);
            
        })
        .catch(error =>{
            console.log("error", error)
            window.location.href = '/'
        })
    }, [like])
    
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
                    UserImage={Heart}
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
            User={""}
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