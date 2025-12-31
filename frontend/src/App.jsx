import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const MTM_LOGO = "Medya Takip Merkezi";

function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Merhaba! Ben MTM GPT, size nasıl yardımcı olabilirim?', reasoning: '' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'openai/gpt-oss-20b',
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
          stream: false // Simplified for now, can be optimized with streaming later
        })
      });

      const data = await response.json();
      const assistantMessage = data.choices[0].message.content;
      
      // Basic extraction of thought process from harmony format if available
      // Harmony format usually uses <thought> tags or similar
      const thoughtMatch = assistantMessage.match(/<thought>([\s\S]*?)<\/thought>/);
      const content = assistantMessage.replace(/<thought>[\s\S]*?<\/thought>/, '').trim();
      const reasoning = thoughtMatch ? thoughtMatch[1] : '';

      setMessages(prev => [...prev, { role: 'assistant', content, reasoning }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.', reasoning: '' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="glass-panel header">
        <div className="logo text-gradient">{MTM_LOGO}</div>
        <div className="status">
          <span className="status-dot"></span>
          GPT-OSS-20B Online
        </div>
      </header>

      <main className="chat-area">
        <div className="messages-container">
          {messages.map((msg, i) => (
            <div key={i} className={`message-wrapper ${msg.role} animate-fade-in`}>
              <div className="message-bubble glass-panel">
                {msg.reasoning && (
                  <details className="reasoning">
                    <summary>Düşünce Süreci</summary>
                    <div className="thought-content">{msg.reasoning}</div>
                  </details>
                )}
                <div className="content">{msg.content}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="message-wrapper assistant animate-fade-in">
              <div className="message-bubble glass-panel loading">
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="input-area">
        <form onSubmit={handleSubmit} className="input-wrapper glass-panel">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Mesajınızı buraya yazın..."
            disabled={loading}
          />
          <button type="submit" className="send-btn primary-gradient" disabled={loading || !input.trim()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </form>
      </footer>
    </div>
  );
}

export default App;
