export const API_HOST = "https://wedzing.adaptable.app/api/";

export const API = {
    auth: {
        login: 'auth/login',
        register: 'auth/register',
    },
    lists: {
        list: 'list',
        oneList: (id) => `list/${id}`
    },
    user: {
        oneUser: (id) => `user/${id}`
    },
    images: {
        upload: `upload`
    }
};
