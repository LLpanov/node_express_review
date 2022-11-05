export const constants = {
    AUTHORIZATION: 'Authorization',
    FRONTEND_URL: 'http://localhost:3000',
    EMAIL_REGEXP: /.+@[^@]+\.[^@]{2,}$/,

    PHOTO_MAX_SIZE: 2 * 1024 * 1024,
    VIDEO_MAX_SIZE: 50 * 1024 * 1024,

    PHOTOS_MIMETYPES: [
        'image/gif', // .gif
        'image/jpeg', // .jpg, .jpeg
        'image/pjpeg', // .jpeg
        'image/png', // .png
        'image/webp', // .webp
    ],

    VIDEO_MIMETYPES: [
        'video/x-flv', // FLV
        'video/mp4', // MP$
        'video/x-msvideo', // AVI
    ],
};
