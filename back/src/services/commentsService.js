const db = require('../db');

exports.fetchAllComments = async () => {
  const [rows] = await db.query('SELECT * FROM comments ORDER BY id DESC');
  return rows;
};

exports.fetchComments_P_SortedDate = async ( page, count) => {
  if (page < 1) page = 1;
  if (count < 1) count = 3;

  const offset = (page - 1) * count;

  const [rows] = await db.query('SELECT * FROM comments ORDER BY date DESC LIMIT ? OFFSET ?', [count, offset]);
  return rows;
};

exports.fetchCommentsSize = async () => {
  const [rows] = await db.query('SELECT COUNT(*) AS total FROM comments');
  return { commentSize: rows[0].total };
};

exports.addComment = async ({ name, content, date }) => {
  if (!name || typeof name !== 'string' || !content || typeof content !== 'string') {
    throw new Error('Name (string) and content (string) are required');
  }

  if (!date || isNaN(parseInt(date))) {
    throw new Error('Valid date (epoch time) is required');
  }

  const [result] = await db.query(
    'INSERT INTO comments (date, name, content) VALUES (?, ?, ?)',
    [date, name, content]
  );

  return { id: result.insertId, date, name, content };
};

exports.deleteCommentById = async (id) => {
  if (!id || isNaN(parseInt(id))) {
    throw new Error('Valid comment ID is required');
  }

  const [result] = await db.query('DELETE FROM comments WHERE id = ?', [id]);
  
  if (result.affectedRows === 0) {
    throw new Error('Comment not found');
  }

  return { message: 'Comment deleted successfully', deletedId: id };
};