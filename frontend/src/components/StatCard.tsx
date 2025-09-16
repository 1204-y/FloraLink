interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  highlight?: string;
}

const StatCard = ({ label, value, trend, highlight }: StatCardProps) => {
  return (
    <div className="card stat-card">
      <p className="muted">{label}</p>
      <h3>{value}</h3>
      {trend && <span className="stat-card__trend">{trend}</span>}
      {highlight && <p className="muted">{highlight}</p>}
    </div>
  );
};

export default StatCard;
