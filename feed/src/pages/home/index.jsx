import { useState } from "react"
import CardAricle from "../../components/card/cardArticle"
import Heart from "../../assests/imgs/heart.svg"
import HeaderHome from "../../components/header/headerHome"
import DropDownHeader from "../../components/dropdown/dropdownHeader/index.jsx"
import "./style.css"

export default function Home (){
    const [Open, setOpen] = useState(false) 
    const Home = () =>{
        window.location.href = '/home'
    }
    return (
        <div className="body">
            <HeaderHome 
            onclickPerfil={() => setOpen(!Open)} 
            onclickHome={Home}
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
            <DropDownHeader IsOpen={Open} Blur={() => setOpen(!Open)} />
        </div>
    )
}