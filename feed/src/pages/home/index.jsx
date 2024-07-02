import { useState } from "react"
import CardAricle from "../../components/card/cardArticle"
import Heart from "../../assests/imgs/heart.svg"
import HeaderHome from "../../components/header/headerHome"
import DropDownHeader from "../../components/dropdown/dropdownHeader/index.jsx"
import ModalPost from "../../components/modalPost/index.jsx"
import "./style.css"

export default function Home (){
    const [DropDownOpen, setDropDownOpen] = useState(false) 
    const [CreateOpen, setCreateOpen] = useState(true) 



    return (
        <div className="body">
            <HeaderHome 
            onclickPerfil={() => setDropDownOpen(!DropDownOpen)} 
            onclickHome={() => (window.location.href = '/home')}
            onclickPlus={() => setCreateOpen(!CreateOpen) }
            />
            <div className="feed">

            <CardAricle 
            IsUser={true}
            UserImage={Heart}
            User="hehehe"
            Description="Est qui aut harum est corrupti modi omnis. Blanditjhhhddddddddhhhiis occaecati rerum soluta et quos. Cupiditate nostrum placeat est ducimus iusto repudiandae. Iure nostrum explicabo tempore rerum tenetur aut.
"
            Title="Est qui aut harum est corrupti modi omnis. Blanditjhhhhhhhhhhhhhhhhhhhhhhhhhhhhhddddddddddddddddddddddddddddddddddddhhhiis occaecati rerum soluta et quos. Cupiditate nostrum placeat est ducimus iusto repudiandae. Iure nostrum explicabo tempore rerum tenetur aut.
"/>
            <CardAricle 
            UserImage={Heart}
            User="hehehe"
            Description="Est qui aut harum est corrupti modi omnis. Blanditjhhhddddddddhhhiis occaecati rerum soluta et quos. Cupiditate nostrum placeat est ducimus iusto repudiandae. Iure nostrum explicabo tempore rerum tenetur aut.
"
            Title="Est qui aut harum est corrupti modi omnis. Blanditjhhhhhhhhhhhhhhhhhhhhhhhhhhhhhddddddddddddddddddddddddddddddddddddhhhiis occaecati rerum soluta et quos. Cupiditate nostrum placeat est ducimus iusto repudiandae. Iure nostrum explicabo tempore rerum tenetur aut.
"/>
            <CardAricle 
            UserImage={Heart}
            User="hehehe"
            Description="Est qui aut harum est corrupti modi omnis. Blanditjhhhddddddddhhhiis occaecati rerum soluta et quos. Cupiditate nostrum placeat est ducimus iusto repudiandae. Iure nostrum explicabo tempore rerum tenetur aut.
"
            Title="Est qui aut harum est corrupti modi omnis. Blanditjhhhhhhhhhhhhhhhhhhhhhhhhhhhhhddddddddddddddddddddddddddddddddddddhhhiis occaecati rerum soluta et quos. Cupiditate nostrum placeat est ducimus iusto repudiandae. Iure nostrum explicabo tempore rerum tenetur aut.
"/>          
            </div>
            <DropDownHeader IsOpen={DropDownOpen} Blur={() => setDropDownOpen(!DropDownOpen)} />
                <ModalPost IsOpen={CreateOpen} Subbmit={() => setCreateOpen(!CreateOpen) } />
        </div>
    )
}