import "./style.css"
import CardAricle from "../../components/card/cardArticle"
import Heart from "../../assests/imgs/heart.svg"
import HeaderHome from "../../components/header/headerHome"

export default function Home (){
    return (
        <div className="body">
            <HeaderHome/>
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
            
        </div>
    )
}