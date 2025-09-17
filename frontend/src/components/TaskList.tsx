import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';
import { CareTaskSummary } from '../types';
import { cardMotion } from './motionPresets';

interface TaskListProps {
  tasks: CareTaskSummary[];
  loading?: boolean;
}

const priorityTone: Record<CareTaskSummary['priority'], string> = {
  高: 'task-priority task-priority--high',
  中: 'task-priority task-priority--medium',
  低: 'task-priority task-priority--low'
};

const formatDue = (task: CareTaskSummary) => {
  if (!task.due_at) {
    return task.schedule || '按需安排';
  }
  const due = new Date(task.due_at);
  const now = new Date();
  const diff = due.getTime() - now.getTime();
  const days = Math.round(diff / (1000 * 60 * 60 * 24));
  if (diff <= 0) {
    return `已超期 ${Math.abs(days)} 天`;
  }
  if (days === 0) {
    return '今天需要完成';
  }
  return `${due.getMonth() + 1} 月 ${due.getDate()} 日 · ${days} 天后`;
};

const TaskList = ({ tasks, loading }: TaskListProps) => {
  return (
    <motion.div className="card task-list" {...cardMotion}>
      <div className="task-list__header">
        <h3>养护待办</h3>
        <span className="muted">自动同步到你的日历与提醒</span>
      </div>
      {loading ? (
        <p className="muted">正在同步养护任务…</p>
      ) : (
        <div className="task-list__items">
          {tasks.length === 0 ? (
            <p className="muted">暂时没有待办，保持关注植物状态即可。</p>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="task-list__item">
                <div>
                  <p className="task-list__plant">{task.plant_name}</p>
                  <p className="muted">{task.action}</p>
                </div>
                <div className="task-list__meta">
                  <span className={priorityTone[task.priority]}>{task.priority}</span>
                  <span className="task-list__time">
                    <CalendarDays size={16} strokeWidth={1.8} />
                    {formatDue(task)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </motion.div>
  );
};

export default TaskList;
