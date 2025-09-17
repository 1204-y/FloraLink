import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { PlantSpecies } from '../types';
import { cardMotion } from './motionPresets';

interface EncyclopediaTableProps {
  entries: PlantSpecies[];
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
              <th>阳光</th>
              <th>浇水建议</th>
              <th>亮点</th>
              <th>花期/季节</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>
                  <strong>{entry.common_name}</strong>
                  <p className="muted">{entry.scientific_name}</p>
                </td>
                <td>{entry.sunlight ?? '按需调整'}</td>
                <td>{entry.watering ?? '保持土壤微湿'}</td>
                <td>
                  <div className="chip-row">
                    {[
                      entry.description?.slice(0, 16),
                      entry.sunlight,
                      entry.watering
                    ]
                      .filter(Boolean)
                      .map((item) => (
                        <span key={item} className="chip">
                          {item}
                        </span>
                      ))}
                  </div>
                </td>
                <td>{entry.bloom_season ?? '全年常绿'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default EncyclopediaTable;
