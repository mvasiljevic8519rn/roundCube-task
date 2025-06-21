import React, { useEffect, useState } from 'react';
import commentsService from '../services/commentsService';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const itemsPerPage = 10; // We will display 10 items per page

  // Check if user has already sent a message
  const hasMessageSent = localStorage.getItem('messagesent') !== null;

  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      setError('');
      try {
        const countResponse = await commentsService.getCommentsCount();

        /// we get the total number of pages here by deviding by the number of items per page and rounding up
        const totalCommentsCount =  Math.ceil(countResponse.data.commentSize / 10);
        console.log(totalCommentsCount);

        const response = await commentsService.fetchLatestComments(currentPage);
        /// we set the comments to the response data
        setComments(response.data);

        /// last page logic to disable the next button if on last page
        if (currentPage === totalCommentsCount) {
          setIsLastPage(true);
        } else {
          setIsLastPage(false);
        }

      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load guestbook. Please check the console for details.");
        setComments([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPageData();
  }, [currentPage]);

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Guestbook</h1>
      <p>See what people wrote about us and feel free to leave a message.</p>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {loading ? (
        <p>Loading messages...</p>
      ) : (
        <>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Content</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment, index) => (
                <tr key={comment.id || index} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '12px' }}>{comment.content}</td>
                  <td style={{ padding: '12px' }}>{comment.name}</td>
                  <td style={{ padding: '12px' }}>{formatDate(comment.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {comments.length === 0 && !loading && !error && (
            <p>No messages yet. Be the first to leave a message!</p>
          )}

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                padding: '8px 16px', 
                border: '1px solid #ddd', 
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                backgroundColor: currentPage === 1 ? '#f5f5f5' : 'white'
              }}
            >
              Previous
            </button>
            
            <span>Page {currentPage}</span>
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={isLastPage}
              style={{
                padding: '8px 16px', 
                border: '1px solid #ddd', 
                cursor: isLastPage ? 'not-allowed' : 'pointer',
                backgroundColor: isLastPage ? '#f5f5f5' : 'white'
              }}
            >
              Next
            </button>
          </div>
        </>
      )}
      
      <button 
        onClick={() => navigate('/message')}

        // dosent allow to send second message
        disabled={hasMessageSent}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: hasMessageSent ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: hasMessageSent ? 'not-allowed' : 'pointer'
        }}
      >
        {hasMessageSent ? 'Message Already Sent' : 'Leave a message'}
      </button>
    </div>
  );
}

export default WelcomePage;
