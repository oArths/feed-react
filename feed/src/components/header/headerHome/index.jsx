import "./style.css"
import home from "../../../assests/imgs/home-alt.svg"
import plus from "../../../assests/imgs/plus-circle.svg"
import UserDefault from "../../../assests/imgs/userdefault.jpg"


export default function HeaderHome({ UserPerfil, onclickPlus, onclickHome, onclickPerfil }) {

    return (
        <div className="Conatiner">
            <div className="Home" onClick={onclickHome}>
                <img className="img" src={home} />
            </div>
            <div className="Home" onClick={onclickPlus}>
                <img className="img" src={plus} />
            </div>
            <div className="perfil" onClick={onclickPerfil}>
                <img  className="ImgeUser" src={UserPerfil === null ? UserDefault :UserPerfil} />
            </div>

        </div>
    )
}