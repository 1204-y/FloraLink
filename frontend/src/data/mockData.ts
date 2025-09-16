import {
  AssistantSuggestion,
  CareTask,
  CommunityGroup,
  CommunityPost,
  EncyclopediaEntry,
  ObservationPoint,
  Plant
} from '../types';

export const plants: Plant[] = [
  {
    id: 'rose-01',
    commonName: '月季 · 朱丽叶',
    scientificName: 'Rosa hybrida "Juliet"',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
    status: '健康',
    environment: '南向阳台 · 直射光 4 小时',
    nextTask: '本周末补充缓释肥',
    tags: ['攀援', '香味浓郁', '切花'],
    timeline: [
      {
        id: 'rose-01-1',
        date: '2024-03-12',
        title: '首次萌芽',
        description: '春季补光后抽出 6 cm 新枝，芽点饱满。'
      },
      {
        id: 'rose-01-2',
        date: '2024-04-01',
        title: '第一次整形修剪',
        description: '回剪 1/3，保留 5 个主枝，喷施护枝剂。'
      },
      {
        id: 'rose-01-3',
        date: '2024-05-06',
        title: '花苞着色',
        description: '清晨拍摄，花苞呈现柔和杏色，预计 3 天后盛开。',
        photoUrl: 'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'clematis-01',
    commonName: '铁线莲 · 阿芙罗狄蒂',
    scientificName: 'Clematis "Aphrodite"',
    imageUrl: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80',
    status: '需关注',
    environment: '室外天台 · 早晚散射光',
    nextTask: '今日检查根系透气性并喷施杀菌剂',
    tags: ['多季开花', '夏季耐热'],
    timeline: [
      {
        id: 'clematis-01-1',
        date: '2024-02-28',
        title: '换盆成功',
        description: '使用椰糠 + 珍珠岩 + 黑土比例 3:3:2。'
      },
      {
        id: 'clematis-01-2',
        date: '2024-04-18',
        title: '花苞回缩',
        description: '因连续降雨出现叶斑，需改善通风。'
      }
    ]
  }
];

export const careTasks: CareTask[] = [
  { id: 'task-1', plantName: '朱丽叶月季', action: '补施缓释肥', schedule: '本周日 10:00', priority: '中' },
  { id: 'task-2', plantName: '铁线莲', action: '喷施多菌灵', schedule: '今日 18:00', priority: '高' },
  { id: 'task-3', plantName: '薄荷', action: '分株换盆', schedule: '4 月 22 日', priority: '低' }
];

export const observationPoints: ObservationPoint[] = [
  {
    id: 'obs-1',
    name: '望江楼公园 · 垂丝海棠',
    city: '成都 · 武侯区',
    coordinates: '30.6399, 104.0508',
    bloomWindow: '预计 3 月 28 日 - 4 月 10 日盛放',
    highlight: '志愿者 @枝繁 上传最新花苞对比照，花苞已经泛粉。',
    contributor: '枝繁'
  },
  {
    id: 'obs-2',
    name: '琴台路 · 紫藤长廊',
    city: '成都 · 青羊区',
    coordinates: '30.6701, 104.0338',
    bloomWindow: '预计 4 月 5 日 - 4 月 18 日盛放',
    highlight: '周边咖啡店推出“紫藤拿铁”，花友 @阿梨 推荐拍照时段 17:30。',
    contributor: '阿梨'
  },
  {
    id: 'obs-3',
    name: '东湖公园 · 鸡爪槭',
    city: '成都 · 成华区',
    coordinates: '30.6714, 104.1113',
    bloomWindow: '红叶高光期：3 月 15 日 - 4 月 2 日',
    highlight: '花友 @Muse 反馈适合航拍，色块层次分明。',
    contributor: 'Muse'
  }
];

export const communityGroups: CommunityGroup[] = [
  {
    id: 'group-rose',
    name: '成都月季互助会',
    members: 1846,
    description: '分享扦插、嫁接、花期调控的实战技巧，线下每月聚会一次。',
    trendingTopics: ['春季补钙', '如何防止黑斑', '温差制造技巧']
  },
  {
    id: 'group-clematis',
    name: '铁线莲打怪小分队',
    members: 963,
    description: '铁线莲控水、支架造型与夏季养护经验大合集。',
    trendingTopics: ['40℃ 抗逆', '垂吊支架分享']
  },
  {
    id: 'group-herb',
    name: '阳台香草厨房',
    members: 1205,
    description: '薄荷、迷迭香、罗勒……一起打造可以吃的阳台。',
    trendingTopics: ['迷迭香烤鸡', '防虫网选购指南']
  }
];

export const communityPosts: CommunityPost[] = [
  {
    id: 'post-1',
    author: '枝繁',
    avatar: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=200&q=80',
    group: '成都月季互助会',
    createdAt: '1 小时前',
    title: '分享：我调控朱丽叶花期的 7 个小技巧',
    excerpt: '记录了从枝条选择、光照控制到开花后的保养步骤，欢迎讨论～',
    reactions: 128,
    comments: 42
  },
  {
    id: 'post-2',
    author: '阿梨',
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80',
    group: '铁线莲打怪小分队',
    createdAt: '3 小时前',
    title: '铁线莲花苞回缩救援计划',
    excerpt: '整理了近期降雨后的应急处理 checklist，帮助大家快速定位问题。',
    reactions: 86,
    comments: 19
  },
  {
    id: 'post-3',
    author: 'Muse',
    avatar: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=200&q=80',
    group: '阳台香草厨房',
    createdAt: '昨天',
    title: '春季香草种植日记（附配方）',
    excerpt: '记录迷迭香、百里香的浇水、修剪和入菜灵感，附调味配方。',
    reactions: 142,
    comments: 33
  }
];

export const encyclopediaEntries: EncyclopediaEntry[] = [
  {
    id: 'ency-rose',
    name: '朱丽叶月季',
    latinName: 'Rosa hybrida "Juliet"',
    climate: '温带 · 日照 4-6 小时',
    difficulty: '进阶',
    highlights: ['切花级花型', '香气层次丰富', '适合花束造型'],
    bestSeason: '春、秋两季集中爆花'
  },
  {
    id: 'ency-clematis',
    name: '铁线莲',
    latinName: 'Clematis spp.',
    climate: '凉爽通风 · 避开夏季暴晒',
    difficulty: '中等',
    highlights: ['四季花色可选', '适合立体绿化'],
    bestSeason: '春末至初夏'
  },
  {
    id: 'ency-herb',
    name: '迷迭香',
    latinName: 'Salvia rosmarinus',
    climate: '充足日照 · 低湿度',
    difficulty: '新手友好',
    highlights: ['可食用香草', '耐修剪'],
    bestSeason: '全年可收割，以春秋最佳'
  }
];

export const assistantSuggestions: AssistantSuggestion[] = [
  {
    id: 'ask-1',
    question: '月季叶子发黄怎么办？',
    answer:
      '检查光照与水分是否均衡，叶片发黄常见原因包括缺铁、光照不足或盆土积水。建议先松土排水，补充螯合铁肥，并确保每天 4 小时以上直射光。',
    related: ['月季春季施肥方案', '盆土调配比例']
  },
  {
    id: 'ask-2',
    question: '铁线莲花苞回缩怎么救？',
    answer:
      '回缩多与根系闷湿或缺钙有关。建议立即减水，增加通风，同时在傍晚喷施 800 倍钙镁水溶肥，并检查枝条是否受病虫害影响。',
    related: ['铁线莲夏季遮阳技巧', '铁线莲常见病虫害图鉴']
  },
  {
    id: 'ask-3',
    question: '阳台适合种哪些香草？',
    answer: '根据你的环境光照（南向·日照 3 小时），推荐薄荷、柠檬百里香、紫苏，可搭配自浇水花盆减少维护。',
    related: ['薄荷快速繁殖指南', '香草搭配食谱']
  }
];
