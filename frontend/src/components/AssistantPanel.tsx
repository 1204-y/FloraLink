import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import { AssistantMessage } from '../types';
import { cardMotion } from './motionPresets';

interface AssistantPanelProps {
  messages: AssistantMessage[];
  onAsk: (question: string, context?: string) => Promise<unknown>;
  loading?: boolean;
  suggestions?: string[];
  compact?: boolean;
}

const AssistantPanel = ({ messages, onAsk, loading = false, suggestions = [], compact = false }: AssistantPanelProps) => {
  const [question, setQuestion] = useState('');
  const [context, setContext] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!question.trim()) {
      setError('请输入要咨询的问题');
      return;
    }
    try {
      setError(null);
      await onAsk(question.trim(), context.trim() || undefined);
      setQuestion('');
    } catch {
      setError('提问失败，请稍后再试');
    }
  };

  const displayedMessages = compact ? messages.slice(0, 2) : messages;

  return (
    <motion.div
      className={`card assistant-panel ${compact ? 'assistant-panel--compact' : ''}`}
      {...cardMotion}
    >
      <div className="assistant-panel__header">
        <div>
          <span className="eyebrow">AI 为你解答 24 小时在线</span>
          <h3>智能养护助手</h3>
        </div>
        <Sparkles size={24} strokeWidth={1.6} />
      </div>
      <div className="assistant-panel__list">
        {displayedMessages.length === 0 ? (
          <p className="muted">还没有提问，试着向 AI 咨询浇水或修剪技巧吧。</p>
        ) : (
          displayedMessages.map((item) => (
            <div key={item.id} className="assistant-panel__item">
              <p className="assistant-panel__question">Q：{item.question}</p>
              <p className="assistant-panel__answer">{item.answer}</p>
              <time className="assistant-panel__time">
                {new Date(item.created_at).toLocaleString('zh-CN', {
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </time>
            </div>
          ))
        )}
      </div>
      {!compact && suggestions.length > 0 && (
        <div className="assistant-panel__suggestions">
          <p className="muted">推荐操作</p>
          <div className="chip-row">
            {suggestions.map((item) => (
              <span key={item} className="chip">
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
      {!compact && (
        <form className="assistant-panel__form" onSubmit={handleSubmit}>
          <div className="assistant-panel__inputs">
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="例如：月季叶子发黄怎么办？"
              aria-label="向智能助手提问"
            />
            <input
              value={context}
              onChange={(event) => setContext(event.target.value)}
              placeholder="可选：补充环境或植物信息"
              aria-label="问题背景"
            />
          </div>
          <button className="action-button" type="submit" disabled={loading}>
            <Send size={18} strokeWidth={1.8} /> {loading ? '发送中…' : '向 AI 提问'}
          </button>
        </form>
      )}
      {error && <p className="form-error">{error}</p>}
    </motion.div>
  );
};

export default AssistantPanel;
