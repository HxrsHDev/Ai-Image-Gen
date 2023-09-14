import React, { useState, useRef } from 'react';
import './ImageGenerator.css';
import default_image from '../Assets/Vegeta img.jpg';

const ImageGenerator = () => {
    const [image_url, setImage_url] = useState("/");
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
            return;
        }
        setLoading(true);
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                     Authorization: "Bearer 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",
                     "User-Agent": "Chrome",
                },
                body: JSON.stringify({
                    prompt: `${inputRef.current.value}`,
                    n: 1,
                    size: "512x512",
                }),
            }
        );
        let data = await response.json();
let data_array = data.data;
    setImage_url(data_array[0].url);


        setLoading(false);
    };

    const handleImageLoad = () => {
        setLoading(false);
    };


    return (
        <div className='ai-image-generator'>
            <div className="header">Ai image <span>generator</span></div>
            <div className="img-loading">
                <div className="image">
                    <img
                        src={image_url === "/" ? default_image : image_url}
                        alt=""
                        onLoad={handleImageLoad}
                    />
                </div>
            <div className="loading"></div>
                <div className={loading?"loading-bar-full":"loading-bar"}></div>
                <div className={loading?"loading-text":"display-none"}>Loading....</div>
      
            </div>
            <div className="controls">

                <div className="search-box">
                    <input
                        type="text"
                        ref={inputRef}
                        className='search-input'
                        placeholder='Enter your prompt'
                    />
                    <button className="generate-btn"
                        onClick={imageGenerator}>
                        Generate
                    </button>

                </div>
            </div>
        </div>
    );
}

export default ImageGenerator;
