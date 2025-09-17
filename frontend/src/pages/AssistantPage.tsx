import AssistantPanel from '../components/AssistantPanel';
import useAssistant from '../hooks/useAssistant';

const AssistantPage = () => {
  const { messages, ask, loading, suggestions, error, refresh } = useAssistant();

  return (
    <>
      <section className="section">
        <div className="section__header">
          <h2>智能助手</h2>
          <p className="muted">
            结合问答知识库与花友经验，实时生成诊断方案、施肥计划与赏花攻略。
          </p>
          <button className="ghost-button" type="button" onClick={() => void refresh()}>
            刷新历史
          </button>
        </div>
        {error && <p className="form-error">{error}</p>}
      </section>
      <section className="section">
        <AssistantPanel messages={messages} onAsk={ask} loading={loading} suggestions={suggestions} />
      </section>
    </>
  );
};

export default AssistantPage;
