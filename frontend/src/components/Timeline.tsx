import { TimelineEvent } from '../types';

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline = ({ events }: TimelineProps) => {
  if (!events.length) {
    return <p className="muted">还没有记录，去上传一张成长照片吧。</p>;
  }

  return (
    <div className="timeline">
      {events.map((event) => (
        <div key={event.id} className="timeline-event">
          <time>{event.date}</time>
          <h4>{event.title}</h4>
          <p>{event.description}</p>
          {event.photoUrl && <img className="timeline-photo" src={event.photoUrl} alt={event.title} />}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
