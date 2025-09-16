import AssistantPanel from '../components/AssistantPanel';
import { assistantSuggestions } from '../data/mockData';

const AssistantPage = () => {
  return (
    <div className="assistant-page">
      <section>
        <h2 className="section-title">智能助手</h2>
        <p className="muted">
          结合问答知识库与花友经验，实时生成诊断方案、施肥计划与赏花攻略。
        </p>
      </section>
      <section>
        <AssistantPanel suggestions={assistantSuggestions} />
      </section>
    </div>
  );
};

export default AssistantPage;
