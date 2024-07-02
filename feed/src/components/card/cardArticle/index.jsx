import "./style.css"
import More from "../../../assests/imgs/more-vert.svg"
import Comments from "../../../assests/imgs/comments.svg"
import Heart from "../../../assests/imgs/heart.svg"


export default function CardAricle({ Title, User, UserImage, IsUser, onclickOptins, onclickHeart, onclickComments }) {

    const truncateText = (text, maxLength,) => {
        if (!text) return 'undefind key';
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div className="card">
            <div className="header">
                <div className="userConatiner">
                    <div className="UserPhoto">
                        <img  className="ImgeUser" src={UserImage} />
                    </div>
                    <div className="UserName">{truncateText(User, 20)}</div>
                </div>
                {IsUser &&
                    <div className="Option" onClick={onclickOptins}>
                        <img className="more" src={More} />
                    </div>}
            </div>
            <div className="title">
                <div className="titleText">
                    {truncateText(Title, 120)}
                </div>
            </div>
            <div className="image">
                <img className="ImgTag" src="https://www.macetesdemae.com/wp-content/uploads/2014/01/Auau.jpg" />
            </div>
            <div className="comentarios">
                <div className="commetsContainer">
                    <div className="Houver">
                        <img className="icon" src={Heart} onClick={onclickHeart} />
                    </div>
                    <div className="info">12</div>
                </div>
                <div className="commetsContainer">
                    <div className="Houver">
                        <img className="icon" src={Comments} onClick={onclickComments} />
                    <div className="info">79</div>
                    </div>
                </div>

            </div>
        </div>
    )
}