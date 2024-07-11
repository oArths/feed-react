import "./style.css"
import logout from "../../../assests/imgs/log-out.svg"
import User from "../../../assests/imgs/user.svg"
import { useToken } from "../../../context/UseToken"

export default function DropDownHeader({ IsOpen, Blur, Userperfil, }) {
    const [token , setToken,  userId, setUserId,userData, setUserData ] = useToken()


    const UserLogout = () => {
        console.log("token", token)
        fetch('http://127.0.0.1:8000/api/auth/siguin/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Logout realizado com sucesso:', data);
                setToken(null);
                setUserId(null)
                setUserData(null)
                window.location.href = "/"
            })
            .catch((error) => {
                console.error('Erro ao realizar logout:', error);
            });


    }


    if (IsOpen) {
        return (
            <div className="blur" onClick={Blur}>
                <div className="Container">
                    <div className="ConatinerUser" onClick={Userperfil}>
                        <img className="imgicon" src={User} />

                        <div className="verPerfil">Ver Perfil</div>
                    </div>
                    <div className="ConatinerLogOut" onClick={UserLogout}>
                        <img className="imgiconLogOut" src={logout} />
                        <div className="LogOut">Sair</div>
                    </div>
                </div>
            </div>
        )
    }
}