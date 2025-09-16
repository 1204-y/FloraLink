interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  highlight?: string;
}

const StatCard = ({ label, value, trend, highlight }: StatCardProps) => {
  return (
    <div className="card">
      <p className="muted">{label}</p>
      <h3 style={{ fontSize: '1.75rem', fontWeight: 700 }}>{value}</h3>
      {trend && <span className="tag">{trend}</span>}
      {highlight && <p className="muted">{highlight}</p>}
    </div>
  );
};

export default StatCard;
