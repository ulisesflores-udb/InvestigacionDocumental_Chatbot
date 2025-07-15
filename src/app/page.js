'use client';

import { useState, useEffect, useRef } from 'react';
import ChatWindow from '../components/ChatWindow';
import InputBox from '../components/InputBox';
import styles from './page.module.css';

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
    <main className={styles.main_container}>
      <h1 className={styles.title}>
        Chatbot Minimalista
      </h1>

      {/* <div
        ref={chatWindowRef}
        style={{}}
      > */}
        
      <div className={styles.chat_window} ref={chatWindowRef} style={{ overflowY: 'auto'}}>
        <ChatWindow messages={messages} />
      </div>

      <InputBox onSend={handleSend} />
    </main>
  );
}
