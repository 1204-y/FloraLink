import AssistantPanel from '../components/AssistantPanel';
import { assistantSuggestions } from '../data/mockData';

const AssistantPage = () => {
  return (
    <>
      <section className="section">
        <div className="section__header">
          <h2>智能助手</h2>
          <p className="muted">
            结合问答知识库与花友经验，实时生成诊断方案、施肥计划与赏花攻略。
          </p>
        </div>
      </section>
      <section className="section">
        <AssistantPanel suggestions={assistantSuggestions} />
      </section>
    </>
  );
};

export default AssistantPage;
