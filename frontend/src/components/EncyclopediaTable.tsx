import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { EncyclopediaEntry } from '../types';
import { cardMotion } from './motionPresets';

interface EncyclopediaTableProps {
  entries: EncyclopediaEntry[];
}

const EncyclopediaTable = ({ entries }: EncyclopediaTableProps) => {
  return (
    <motion.div className="card encyclopedia" {...cardMotion}>
      <div className="encyclopedia__header">
        <div>
          <span className="eyebrow">根据你的环境生成的精选</span>
          <h3>植物百科精选</h3>
        </div>
        <BookOpen size={24} strokeWidth={1.6} />
      </div>
      <div className="encyclopedia__table-wrapper">
        <table className="encyclopedia__table">
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
                <td>
                  <span className="encyclopedia__difficulty">{entry.difficulty}</span>
                </td>
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
    </motion.div>
  );
};

export default EncyclopediaTable;
