import { useState, useRef, useEffect } from 'react';
import { sendMessage } from './api';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const message = input.trim();
    if (!message) return;

    const clientMsg = { sender: 'client', text: message };
    setMessages(msgs => [...msgs, clientMsg]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendMessage(message);
      setMessages(msgs => [...msgs, { sender: 'bot', text: response.reply }]);
    } catch (err) {
      setError('Failed to get response from the bot. Please try again.');
      setMessages(msgs => [...msgs, { sender: 'error', text: 'Message failed to send' }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="chatbot-container">
      <header className="chat-header">
        <h2>AI Assistant</h2>
        {error && <div className="error-banner">{error}</div>}
      </header>
      
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.sender}`}
          >
            <div className="message-content">
              <span className="sender">
                {msg.sender === 'bot' ? '🤖 Assistant' : 
                 msg.sender === 'client' ? '👤 You' : '⚠️ Error'}
              </span>
              <span className="text">{msg.text}</span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="chat-message bot">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input" onSubmit={handleSend}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !input.trim()}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default App;
