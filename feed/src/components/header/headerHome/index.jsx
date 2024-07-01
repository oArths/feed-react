import "./style.css"
import home from "../../../assests/imgs/home-alt.svg"
import plus from "../../../assests/imgs/plus-circle.svg"


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
                <img src={UserPerfil} />
            </div>

        </div>
    )
}