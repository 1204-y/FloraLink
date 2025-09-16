import { CalendarDays } from 'lucide-react';
import { CareTask } from '../types';

interface TaskListProps {
  tasks: CareTask[];
}

const priorityTone: Record<CareTask['priority'], string> = {
  高: 'task-priority task-priority--high',
  中: 'task-priority task-priority--medium',
  低: 'task-priority task-priority--low'
};

const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <div className="card task-list">
      <div className="task-list__header">
        <h3>养护待办</h3>
        <span className="muted">已同步至日历</span>
      </div>
      <div className="task-list__items">
        {tasks.map((task) => (
          <div key={task.id} className="task-list__item">
            <div>
              <p className="task-list__plant">{task.plantName}</p>
              <p className="muted">{task.action}</p>
            </div>
            <div className="task-list__meta">
              <span className={priorityTone[task.priority]}>{task.priority}</span>
              <span className="task-list__time">
                <CalendarDays size={16} strokeWidth={1.8} />
                {task.schedule}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
