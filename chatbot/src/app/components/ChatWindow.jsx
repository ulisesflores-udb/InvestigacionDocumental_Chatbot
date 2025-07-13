export default function ChatWindow({ messages }) {
  return (
    <div style={{
      flexGrow: 1,
      overflowY: 'auto',
      padding: '1rem',
      backgroundColor: '#fafafa',
      borderRadius: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      maxHeight: '70vh',
      border: '1px solid #ddd',
    }}>
      {messages.map(({ sender, text }, idx) => (
        <div
          key={idx}
          style={{
            maxWidth: '70%',
            padding: '12px 18px',
            borderRadius: '16px',
            alignSelf: sender === 'user' ? 'flex-end' : 'flex-start',
            backgroundColor: sender === 'user' ? '#005f73' : '#e0e0e0',
            color: sender === 'user' ? '#ffffff' : '#333',
            fontSize: '15px',
            lineHeight: '1.4',
            whiteSpace: 'pre-wrap',
            boxShadow: 'none',
            userSelect: 'text',
          }}
        >
          {text}
        </div>
      ))}
    </div>
  );
}
