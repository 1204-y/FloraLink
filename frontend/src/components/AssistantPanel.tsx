import { Send, Sparkles } from 'lucide-react';
import { AssistantSuggestion } from '../types';

interface AssistantPanelProps {
  suggestions: AssistantSuggestion[];
}

const AssistantPanel = ({ suggestions }: AssistantPanelProps) => {
  return (
    <div className="card assistant-panel">
      <div className="assistant-panel__header">
        <div>
          <span className="eyebrow">AI 为你解答 24 小时在线</span>
          <h3>智能养护助手</h3>
        </div>
        <Sparkles size={24} strokeWidth={1.6} />
      </div>
      <div className="assistant-panel__list">
        {suggestions.map((item) => (
          <div key={item.id} className="assistant-panel__item">
            <p className="assistant-panel__question">Q：{item.question}</p>
            <p className="assistant-panel__answer">{item.answer}</p>
            <div className="chip-row">
              {item.related.map((ref) => (
                <span key={ref} className="chip">
                  {ref}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="action-button">
        <Send size={18} strokeWidth={1.8} /> 向 AI 提问
      </button>
    </div>
  );
};

export default AssistantPanel;
