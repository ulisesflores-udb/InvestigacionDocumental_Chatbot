import { useState } from 'react';

export default function InputBox({ onSend }) {
  const [text, setText] = useState('');

  const sendMessage = () => {
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{
      marginTop: '1rem',
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
    }}>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder="Escribe un mensaje..."
        style={{
          flexGrow: 1,
          resize: 'none',
          padding: '12px 16px',
          fontSize: '15px',
          borderRadius: '12px',
          border: '1px solid #ccc',
          backgroundColor: '#fff',
          outline: 'none',
          fontFamily: 'inherit',
          color: '#222',
          boxShadow: 'none',
          transition: 'border-color 0.2s ease',
        }}
        onFocus={(e) => e.currentTarget.style.borderColor = '#005f73'}
        onBlur={(e) => e.currentTarget.style.borderColor = '#ccc'}
      />
      <button
        onClick={sendMessage}
        style={{
          backgroundColor: '#005f73',
          border: 'none',
          borderRadius: '12px',
          padding: '12px 22px',
          fontWeight: '600',
          fontSize: '15px',
          color: '#fff',
          cursor: 'pointer',
          userSelect: 'none',
          transition: 'background-color 0.2s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0a8fbd'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#005f73'}
        aria-label="Enviar mensaje"
      >
        Enviar
      </button>
    </div>
  );
}
