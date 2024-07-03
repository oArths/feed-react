import { useState, useEffect } from "react"
import styles from "./style.module.css"
import CardAricle from "../../components/card/cardArticle"
import HeaderArticleComments from "../../components/header/headerArticleComments"
import ReplaceComments from "../../components/ReplaceComments"
import ModalComment from "../../components/ModalComment/index.jsx";
import ModalDeltePost from "../../components/modals/modalDeletePost/index.jsx"


export default function ArticleComments() {
    const [CreateOpen, setCreateOpen] = useState(false) 
    const [ModalOpen, setOpenModal] = useState(false);
    const [image, setImage] = useState(null)
    const [ reply, setReplay] = useState({
        user: 'texte',
        title: 'texte',
    })

    const NewReply = (Info) =>{
        setReplay(Info)
        setCreateOpen(!CreateOpen)
        // console.log(reply)
    } 
    return (
        <div className={styles.body} >
            <HeaderArticleComments onclickBack={() => (window.location.href = '/home')} Title="Comentarios" />
            <div className={styles.feed} >
                <CardAricle
                onclickComments={() => NewReply({
                    user: 'dsds',
                    title: 'dsdssssss',
                })}
                    // UserImage={}
                    User="hehehe"
                    Title="Est qui aut harum est corrupti modi omnis. occaecati rerum soluta et quos. Cupiditate nostrum placeat est ducimus iusto repudiandae. Iure nostrum explicabo tempore rerum tenetur aut."/>
                <div className={styles.Header}>
                    <div className={styles.Title}>
                        Respostas
                    </div>
                </div>
                <ReplaceComments onclickComments={() => NewReply({
                    user: 'comments',
                    title: 'commentsss',
                })} />
                <ReplaceComments onclickComments={() => NewReply({
                    user: 'comments',
                    title: 'commentsss',
                })} />
                <ReplaceComments onclickComments={() => NewReply({
                    user: 'comments',
                    title: 'commentsss',
                })} />
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
            onClickDelete={() =>(setCreateOpen(!CreateOpen), setOpenModal(!ModalOpen), setImage(null)) }
            isOpen={ModalOpen}
            /> 
        </div>
    )
}