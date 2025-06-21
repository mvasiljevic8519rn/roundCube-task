import React, { useState } from 'react';
import commentsService from '../services/commentsService';
import { useNavigate } from 'react-router-dom';

function MessagePage() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const isFormValid = name.trim() && content.trim();
  
  const hasMessageSent = localStorage.getItem('messagesent') !== null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      setStatus('Please fill in all fields');
      return;
    }

    setDisabled(true);
    setStatus('Posting...');

    try {
      const response = await commentsService.createComment({ 
        name, 
        content, 
        date: Math.floor(Date.now() / 1000) // Current epoch time in seconds
      });
      
      // Store the response in localStorage
      localStorage.setItem('messagesent', JSON.stringify(response.data));
      
      navigate('/welcomepage');
    } catch (error) {
      setStatus('Failed to post message. Please try again.');
      setDisabled(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px' }}>Leave a Message</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label 
            htmlFor="content" 
            style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
          >
            Message:
          </label>
          <textarea
            id="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            disabled={disabled}
            rows="4"
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '5px'
            }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label 
            htmlFor="name" 
            style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
          >
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={disabled}
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '5px'
            }}
          />
        </div>
        <button 
          type="submit" 
          disabled={disabled || !isFormValid || hasMessageSent}
          style={{
            padding: '10px 20px',
            
            backgroundColor: (disabled || !isFormValid || hasMessageSent) ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            
            cursor: (disabled || !isFormValid || hasMessageSent) ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          {/* dosent allow to send second message */}
          {disabled ? 'Posting...' : hasMessageSent ? 'Message Already Sent' : 'Post'}
        </button>
        {status && <div style={{ marginTop: '15px', color: 'red' }}>{status}</div>}
        {hasMessageSent && <div style={{ marginTop: '15px', color: 'orange' }}>You have already sent a message.</div>}
      </form>
    </div>
  );
}

export default MessagePage;
