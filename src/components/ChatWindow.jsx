import styles from '../app/page.module.css';

export default function ChatWindow({ messages }) {
  return (
    <>
      { messages.map(({ sender, text }, idx) => (
        <div
          className={styles.chatbot}
          key={idx}
          style={{
            alignSelf: sender === 'user' ? 'flex-end' : 'flex-start',
            backgroundColor: sender === 'user' ? '#005f73' : '#e0e0e0',
            color: sender === 'user' ? '#ffffff' : '#333'
          }}
          id="chat"
        >
          {text}
        </div>
      ))}
    </>
  );
}
