import "./style.css"
import home from "../../../assests/imgs/home-alt.svg"
import logout from "../../../assests/imgs/log-out.svg"
import plus from "../../../assests/imgs/plus-circle.svg"

export default function HeaderHome ({onclickPlus, onclickHome, onclickPerfil}) {
    return(
        <div className="Conatiner">
            <div className="Home" onClick={onclickHome}>
                <img src={home}/>
            </div>
            <div className="Home" onClick={onclickPlus}>
            <img src={plus}/>
            </div>
            <div className="perfil" onClick={onclickPerfil}>
            <img src={home}/>
            </div>
            {/* <div className="Home">
                <img src={logout}/>
            </div> */}
        </div>
    )
}