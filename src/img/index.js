const images = {
    logo: require('./logo.svg').default,
    // noImage: require('~/assets/images/no-image.png'),
    // noImage1: require('~/assets/images/anh-bia.jpeg'),
    Home: [
        {
            original: require('./homeImg/1.png'),
            thumbnail: require('./homeImg/1.png'),
            className: 'w-24 h-24',
        }, 
        {
            original: require('./homeImg/2.png'),
            thumbnail: require('./homeImg/2.png'),
            className: 'w-24 h-24',
        },
        {
            original: require('./homeImg/3.png'),
            thumbnail: require('./homeImg/3.png'),
            className: 'w-24 h-24',
        },
        {
            original: require('./homeImg/4.png'),
            thumbnail: require('./homeImg/4.png'),
            className: 'w-24 h-24',
        }

    ],
    avatar:require('./user.jpg'),
    discount:require('./discount.png'),
    
};

export default images;
