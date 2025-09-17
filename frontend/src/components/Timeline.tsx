import { GrowthEntry } from '../types';

interface TimelineProps {
  events: GrowthEntry[];
}

const Timeline = ({ events }: TimelineProps) => {
  if (!events.length) {
    return <p className="muted">还没有记录，去上传一张成长照片吧。</p>;
  }

  return (
    <div className="timeline">
      {events.map((event) => (
        <div key={event.id} className="timeline__event">
          <div className="timeline__marker" />
          <div className="timeline__content">
            <time>{new Date(event.recorded_at).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</time>
            <h4>{event.notes ?? '记录了一次成长'}</h4>
            {typeof event.height_cm === 'number' && (
              <p className="muted">高度：{event.height_cm} cm</p>
            )}
            {event.photo_url && (
              <img className="timeline__photo" src={event.photo_url} alt={event.notes ?? '成长记录'} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
