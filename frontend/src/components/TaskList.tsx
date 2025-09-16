import { CareTask } from '../types';

interface TaskListProps {
  tasks: CareTask[];
}

const priorityColor: Record<CareTask['priority'], string> = {
  高: 'badge',
  中: 'tag',
  低: 'chip'
};

const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">养护待办</h3>
        <span className="muted">已同步至日历</span>
      </div>
      <div className="list">
        {tasks.map((task) => (
          <div key={task.id} className="list-item">
            <div>
              <strong>{task.plantName}</strong>
              <p>{task.action}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className={priorityColor[task.priority]}>{task.priority}</span>
              <p>{task.schedule}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
