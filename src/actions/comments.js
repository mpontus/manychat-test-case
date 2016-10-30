import { v4 as uuid } from 'node-uuid';
import {
  ADD_COMMENT,
} from '../constants';

const addComment = ({author, text}) => ({
  type: ADD_COMMENT,
  comment: {
    id: uuid(),
    author,
    text,
    createdAt: Date.now(),
  }
});
