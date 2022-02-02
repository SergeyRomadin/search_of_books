

const BookImg = ({src, title}) => {
    
    if(src){
        return <img src={src} alt="bookImg"/>
    }else {
        return <div className="divImgCloser"><span className="divImgCloser__text">{title}</span></div>
    }

    

}

export default BookImg