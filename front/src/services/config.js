const baseUrl = 'http://localhost:8000/api'

export const apiPaths = {
    comments:{
        page:   '/comments/pag',
        create: '/comments',
        recent: '/comments/pag',
        size:   '/comments/size',
        delete: '/comments/'
    }
};

export const getUrl = (path) => `${baseUrl}${path}`;
