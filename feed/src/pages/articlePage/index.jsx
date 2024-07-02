import styles from "./style.module.css"
import CardAricle from "../../components/card/cardArticle"
import HeaderArticleComments from "../../components/header/headerArticleComments"
import ReplaceComments from "../../components/ReplaceComments"
export default function ArticleComments() {
    return (
        <div className={styles.body} >
            <HeaderArticleComments onclickBack={() => (window.location.href = '/home')} />
            <div className={styles.feed} >
                <CardAricle
                    IsUser={true}
                    // UserImage={}
                    User="hehehe"
                    Title="Est qui aut harum est corrupti modi omnis. occaecati rerum soluta et quos. Cupiditate nostrum placeat est ducimus iusto repudiandae. Iure nostrum explicabo tempore rerum tenetur aut."/>
                <div className={styles.Header}>
                    <div className={styles.Title}>
                        Respostas
                    </div>
                </div>
                <ReplaceComments />
                <ReplaceComments />
                <ReplaceComments />
            </div>
        </div>
    )
}