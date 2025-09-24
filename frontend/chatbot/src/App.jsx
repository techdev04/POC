
import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const clientMsg = { sender: 'client', text: input };
    setMessages((msgs) => [
      ...msgs,
      clientMsg,
      // Simulate bot reply
      { sender: 'bot', text: `You said: "${input}"` }
    ]);
    setInput('');
  };

  return (
    <div className="chatbot-container">
      <h2>Chatbot</h2>
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.sender === 'bot' ? 'bot' : 'client'}`}
          >
            <span className="sender">{msg.sender === 'bot' ? '🤖 Bot' : '🧑 Client'}:</span>
            <span className="text">{msg.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="chat-input" onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
