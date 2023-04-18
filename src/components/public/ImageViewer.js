import React, { useState } from 'react';
import "./ImageViewer.scss";

export const ImageViewer = ({ images=[{ url: "...", title: "..." }], initSelected = 1, onBlur = () => { } }) => {

    const [selectedIndex, setSelectedIndex] = useState(initSelected);
    const imageSelected = images[selectedIndex];

    const handleChangeImage = (step) => {
        setSelectedIndex((selectedIndex + step + images.length) % images.length);
    }

    const checkCloseViewClicked = (e) => {
        if(e.target === e.currentTarget) {
            console.log("close...");
            onBlur();
        }
    }

    return (
        <div className="image-viewer" onClick={checkCloseViewClicked}>
            <button className="btn btn-primary left-arrow" onClick={() => handleChangeImage(-1)}>
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
            </button>
            <div className="img-shower">
                <img className="rounded mb-2" src={imageSelected.url} alt={imageSelected.title} />
                <span className="text-center fw-bold">{imageSelected.title}</span>
                <hr />
                {
                    images.length > 0 ?
                    <div className="thumnails">
                        {images.map((item, idx) => (
                            <div key={idx} className={`thumbnail-item ${imageSelected === item ? "p-1 rounded border border-2" : ""}`}
                                onClick={(e) => {
                                    setSelectedIndex(idx);
                                }}
                            >
                                <img className="rounded" src={item.url} alt={item.title}/>
                            </div>
                        ))}
                    </div> : null
                }
            </div>
            <button className="btn btn-primary right-arrow" onClick={() => handleChangeImage(1)}>
                <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
        </div>
    );
}

export default ImageViewer;
