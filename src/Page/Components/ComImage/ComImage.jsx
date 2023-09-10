import React from 'react';
import ImageGallery from 'react-image-gallery';


const ComImage = ({ product }) => {
    const images = product?.images.map(image => ({
        original: image.original,
        thumbnail: image.thumbnail,
    }));

    return (
        <div>

            <ImageGallery items={images} />
        </div>
    );
};

export default ComImage;
