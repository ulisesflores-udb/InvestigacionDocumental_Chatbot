'use client';

import { useState, useEffect, useRef } from 'react';
import ChatWindow from './components/ChatWindow';
import InputBox from './components/InputBox';

export default function Home() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '¡Hola! Soy tu asistente minimalista. ¿En qué puedo ayudarte?' }
  ]);

  const chatWindowRef = useRef(null);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (text, sender) => {
    setMessages(prev => [...prev, { sender, text }]);
  };

  const handleSend = (text) => {
    addMessage(text, 'user');

    addMessage('Escribiendo...', 'bot');

    setTimeout(() => {
      setMessages(prev => {
        const newMsgs = prev.filter(m => m.text !== 'Escribiendo...');
        return [...newMsgs, { sender: 'bot', text: `Respuesta a: "${text}"` }];
      });
    }, 1400);
  };

  return (
    <main style={{
      maxWidth: '620px',
      margin: '3rem auto',
      padding: '0 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      height: '80vh',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#222',
      backgroundColor: '#fff',
      borderRadius: '16px',
      border: '1px solid #ddd',
      userSelect: 'none',
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem', fontWeight: '700', color: '#005f73' }}>
        Chatbot Minimalista
      </h1>

      <div
        ref={chatWindowRef}
        style={{ flexGrow: 1, overflowY: 'auto' }}
      >
        <ChatWindow messages={messages} />
      </div>

      <InputBox onSend={handleSend} />
    </main>
  );
}
