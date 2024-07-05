import "./style.css"
import { useState } from "react"
import More from "../../../assests/imgs/more-vert.svg"
import Comments from "../../../assests/imgs/comments.svg"
import Heart from "../../../assests/imgs/heart.svg"
import HeartSolid from "../../../assests/imgs/heart-solid.svg"


export default function CardAricle({ Title, 
    User, UserImage, IsUser, onclickOptins, 
    onclickComments ,HeartCount, CommentsCount, like, onclickHeart, image }) {

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
            {null !== (image) && (

            <div className="image">
                <img className="ImgTag" src={image} />
            </div>
            )}
            <div className="comentarios">
                <div className="commetsContainer">
                    <div className="Houver" onClick={onclickHeart}>
                        {like ? 
                        (<img className="icon" src={HeartSolid}/>)
                    :
                    (<img className="icon" src={Heart}/>) }
                        <div className="info">{HeartCount}</div>
                    </div>
                </div>
                <div className="commetsContainer">
                    <div className="Houver" onClick={onclickComments}>
                        <img className="icon" src={Comments}  />
                    <div className="info">{CommentsCount}</div>
                    </div>
                </div>

            </div>
        </div>
    )
}