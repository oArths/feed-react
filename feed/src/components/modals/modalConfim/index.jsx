import "./style.css"

export default function  Modal ({title, subTitle,button, isOpen, onClick, setOpenModal }){

    if(isOpen){
        return(
            <div className="main">
                <div className="blur"></div>
                <div className="containerModal">
                    <div className="text">

                    <div className="Title">{title}</div>
                    <div className="SubTitle">{subTitle}</div>
                    </div>
                    <button onClick={onClick} className="Button">{button}</button>
                </div>
            </div>
        )
    }
}
