import { AssistantSuggestion } from '../types';

interface AssistantPanelProps {
  suggestions: AssistantSuggestion[];
}

const AssistantPanel = ({ suggestions }: AssistantPanelProps) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">智能养护助手</h3>
        <span className="muted">AI 为你解答 24h 在线</span>
      </div>
      <div className="list">
        {suggestions.map((item) => (
          <div key={item.id} className="assistant-item">
            <p className="assistant-question">Q：{item.question}</p>
            <p className="assistant-answer">{item.answer}</p>
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
      <button className="action-button">向 AI 提问</button>
    </div>
  );
};

export default AssistantPanel;
