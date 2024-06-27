import "./style.css"
import More from "../../../assests/imgs/more-vert.svg"
import Comments from "../../../assests/imgs/comments.svg"
import Heart from "../../../assests/imgs/heart.svg"


export default function CardAricle({Description,Title, User}) {

    const truncateText = (text, maxLength, ) => {
        if (!text) return 'undefind key'; 
        if (text.length > maxLength) {
          return text.substring(0, maxLength) + '...';
        }
        return text;
      };
    return (
        <div className="card">
            <div className="header">
                <div className="user">{truncateText(User, 20)}</div>
                <div className="Option">
                    <img className="more" src={More} />
                </div>
            </div>
            <div className="title">
                <div className="titleText">
                    {truncateText(Title, 120)}
                </div>
            </div>
            <div className="image">
                <img className="ImgTag" src="https://www.macetesdemae.com/wp-content/uploads/2014/01/Auau.jpg" />
            </div>
            <div className="description">
                <div className="descriptionText">
                    {truncateText(Description, 250)}
                </div>
            </div>
            <div className="comentarios">
                <div className="commetsContainer">
                <img className="icon" src={Heart}/>
                <div className="info">12</div>
                </div>
                <div className="commetsContainer">
                <img className="icon" src={Comments}/>
                <div className="info">79</div>
                </div>
                
            </div>
        </div>
    )
}