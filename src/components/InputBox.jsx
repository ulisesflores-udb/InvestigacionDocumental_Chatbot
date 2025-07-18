import { useState } from 'react';
import styles from '../app/page.module.css';
import Sugerencias from './Sugerencias';

export default function InputBox({ onSend }) {
  const [text, setText] = useState('');
  const [mostrar, setMostrar] = useState(true);

  const sendMessage = () => {
    if (!text.trim()) { alert(!text.trim()); return };
    onSend(text);
    setText('');
    setMostrar(false);
  };

  const sendSugerencia = (sugerencia) => {
    setText(sugerencia);
    setMostrar(false);
    onSend(sugerencia);
    setText('');
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={styles.cont_form}>
      <div className={styles.form_items}>
        <div className={styles.cont_sugerencias + (!mostrar ? ' ' + styles.cont_invisible : '')}>
          <Sugerencias texto="¿Qué me recomiendas para curar la gripe con tos seca?" send={sendSugerencia}  />
          <Sugerencias texto="¿Qué me recomiendas para el dolor de estómago?" send={sendSugerencia} />
          <Sugerencias texto="¿Cómo puedo ser más claro?" send={sendSugerencia} />
        </div>
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
