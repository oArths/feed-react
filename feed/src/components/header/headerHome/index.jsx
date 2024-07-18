import s from "./style.module.css"
import home from "../../../assests/imgs/home-alt.svg"
import plus from "../../../assests/imgs/plus-circle.svg"
import UserDefault from "../../../assests/imgs/userdefault.jpg"


export default function HeaderHome({ UserPerfil, onclickPlus, onclickHome, onclickPerfil }) {
    const baseURL = "http://127.0.0.1:8000/img/user/";

    return (
        <div className={s.Conatiner}>
            <div className={s.Home} onClick={onclickHome}>
                <img className={s.img} src={home} />
            </div>
            <div className={s.Home} onClick={onclickPlus}>
                <img className={s.img} src={plus} />
            </div>
            <div className={s.perfil} onClick={onclickPerfil}>
                <img  className={s.ImgeUser} src={UserPerfil === null ? UserDefault :baseURL +  UserPerfil} />
            </div>

        </div>
    )
}