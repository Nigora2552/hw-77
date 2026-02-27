import React from 'react';
import {apiURL} from "../../../constants.ts";

interface Props {
    author: string
    message: string
    image: string
}

const CardItem: React.FC<Props> = ({author, message, image}) => {
    let cardImage = null;

    if (image) {
        cardImage = apiURL + '/' + image;
    }

    return (
        <>
            <img width='100%' src={cardImage ? cardImage : ''} alt=''/>
            <div style={{marginTop: 'auto'}}>
                <h4>{author}</h4>
                <p>{message}</p>
            </div>
        </>
    );
};

export default CardItem;