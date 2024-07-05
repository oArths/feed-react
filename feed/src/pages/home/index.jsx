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
    const [image, setImage] = useState(null)
    const [token, setToken, UserId] = useToken()
    const [error, setError] = useState({})
    const [Article, setArticle] = useState([])



    useEffect(() => {
        // console.log("token",token)
        // console.log("articleaaaaaaa", Article)
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
            console.log("certo",data.data)
        })
        .catch(error =>{
            // console.log("error", error)
            // window.location.href = '/'
        })
    }, [])

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
                    CommentsCount={Article.likes_count}
                    HeartCount={Article.likes_count}
                    onclickComments={() => (window.location.href = '/home/article')}
                    User={Article.id}
                    Title={Article.title}/>
                </div>
            ))}


            </div>
            <DropDownHeader IsOpen={DropDownOpen} Blur={() => setDropDownOpen(!DropDownOpen)} Userperfil={() => (window.location.href = "/profile")} />
            <ModalPost Title="Criar publicação" IsOpen={CreateOpen} Subbmit={() => setCreateOpen(!CreateOpen)} CloseModal={() => setOpenModal(true)} setImage={setImage} image={image} />
            <ModalDeltePost
                title="Descartar Publicação?"
                Confirm="Não"
                onClickConfirm={() => setOpenModal(!ModalOpen)}
                Delete="Descartar"
                onClickDelete={() => (setCreateOpen(!CreateOpen), setOpenModal(!ModalOpen), setImage(null))}
                isOpen={ModalOpen}
            />
        </div>
    )
}