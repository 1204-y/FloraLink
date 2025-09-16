import { EncyclopediaEntry } from '../types';

interface EncyclopediaTableProps {
  entries: EncyclopediaEntry[];
}

const EncyclopediaTable = ({ entries }: EncyclopediaTableProps) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">植物百科精选</h3>
        <span className="muted">根据你的环境进行推荐</span>
      </div>
      <table className="responsive-table">
        <thead>
          <tr>
            <th>植物</th>
            <th>适宜气候</th>
            <th>养护难度</th>
            <th>亮点</th>
            <th>最佳季节</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>
                <strong>{entry.name}</strong>
                <p className="muted">{entry.latinName}</p>
              </td>
              <td>{entry.climate}</td>
              <td>{entry.difficulty}</td>
              <td>
                <div className="chip-row">
                  {entry.highlights.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </td>
              <td>{entry.bestSeason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EncyclopediaTable;
