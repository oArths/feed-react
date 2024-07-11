import "./style.css"
import More from "../../../assests/imgs/more-vert.svg"
import Comments from "../../../assests/imgs/comments.svg"
import Heart from "../../../assests/imgs/heart.svg"
import HeartSolid from "../../../assests/imgs/heart-solid.svg"
import DropDownOptions from "../../dropdown/dropDownOption/index"
import { useState } from "react"


export default function CardAricle({ Title, 
    User, UserImage, IsUser, 
    onclickComments ,HeartCount, CommentsCount, like, onclickHeart, image,disabled, PostIndex, PostId }) {
        const [PostEdit, setPostEdit] = useState(null)

        const UpdateUser = (index) => {
            if(PostEdit === index){
                setPostEdit(null)
            }else{
                setPostEdit(index)
            }
            return console.log(index, PostEdit)
            
        }
    const truncateText = (text, maxLength,) => {
        if (!text) return 'undefind key';
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };
    const baseURL = "http://127.0.0.1:8000/img/user/";
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
                    <>
                    <div className="Option" onClick={() => UpdateUser(PostIndex)}>
                        <img className="more" src={More} />
                    </div>
                     <DropDownOptions
                     IsOpen={PostEdit === PostIndex}
                     id={PostId}
                     // UserEdit={() => (setModalEditPost(!ModalEditPost), setModalEdit(!ModalEdit))}
                 />
                    </>
                    }
            </div>
            <div className="title">
                <div className="titleText">
                    {truncateText(Title, 120)}
                </div>
            </div>
            {null !== (image) && (
                
            <div className="image">
                <img className="ImgTag" src={baseURL + image}  />
            </div>
            )}
            <div className="comentarios">
                <div className="commetsContainer">
                    <div className="Houver" onClick={onclickHeart} disabled={disabled}>
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