import { useState } from 'react';
import styles from '../app/page.module.css';

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
    <div className={styles.cont_form}>
      <div className={styles.form_items}>
        <textarea
          className={styles.form_textarea}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Escribe un mensaje..."
          onFocus={(e) => e.currentTarget.style.borderColor = '#005f73'}
          onBlur={(e) => e.currentTarget.style.borderColor = '#ccc'}
        />
        <button className={styles.form_btn}
          onClick={sendMessage}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0a8fbd'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#005f73'}
          aria-label="Enviar mensaje"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
