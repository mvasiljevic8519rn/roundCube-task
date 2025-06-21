import axios from 'axios'
import { getUrl, apiPaths } from './config';


const commentApi = axios.create({
  baseURL: getUrl(''),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const CommentsService = {
  // Create
  createComment: (commentData) => commentApi.post(apiPaths.comments.create, commentData),
  
  // Gets a specific page of comments
  fetchLatestComments: (page = 1) => 
    commentApi.get(apiPaths.comments.recent, { params: { page } }),
  
  // Gets the total number of comments
  getCommentsCount: () => commentApi.get(apiPaths.comments.size),
};

export default CommentsService;