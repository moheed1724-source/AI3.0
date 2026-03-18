import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code, Settings, TrendingUp, Cpu, HeartPulse, Building, Car, Leaf, X, CheckCircle2, Briefcase } from 'lucide-react';

const majors = [
  {
    icon: <Settings size={32} />, name: "机械工程", en: "Mechanical Engineering",
    unis: ["亚琛工业大学", "慕尼黑工业大学", "斯图加特大学"],
    salary: "€60,000 - €85,000/年", career: "汽车研发、航空航天、自动化制造、机器人工程师", companies: ["大众", "宝马", "西门子", "博世", "保时捷"],
    stats: { employ: 95, salary: 85, difficulty: 90, future: 88, international: 80 }
  },
  {
    icon: <Code size={32} />, name: "计算机科学", en: "Computer Science",
    unis: ["慕尼黑工业大学", "卡尔斯鲁厄理工", "柏林工业大学"],
    salary: "€65,000 - €95,000/年", career: "算法工程师、全栈开发、AI研究员、数据科学家", companies: ["SAP", "亚马逊(德)", "谷歌(德)", "DeepL"],
    stats: { employ: 98, salary: 95, difficulty: 88, future: 98, international: 90 }
  },
  {
    icon: <Cpu size={32} />, name: "电气工程", en: "Electrical Engineering",
    unis: ["达姆施塔特工大", "德累斯顿工大", "汉诺威大学"],
    salary: "€60,000 - €80,000/年", career: "芯片设计、新能源系统、硬件工程师、通信技术", companies: ["英飞凌", "西门子", "博世", "ABB"],
    stats: { employ: 92, salary: 82, difficulty: 85, future: 90, international: 75 }
  },
  {
    icon: <TrendingUp size={32} />, name: "商科/经济", en: "Business & Economics",
    unis: ["曼海姆大学", "慕尼黑大学", "科隆大学"],
    salary: "€55,000 - €90,000/年", career: "投行分析师、咨询顾问、供应链管理、金融审计", companies: ["麦肯锡", "安联保险", "德意志银行", "罗兰贝格"],
    stats: { employ: 85, salary: 90, difficulty: 95, future: 85, international: 88 }
  },
  {
    icon: <Car size={32} />, name: "车辆工程", en: "Automotive Engineering",
    unis: ["斯图加特大学", "布伦瑞克工大", "卡尔斯鲁厄理工"],
    salary: "€62,000 - €88,000/年", career: "底盘开发、三电系统工程师、自动驾驶研发", companies: ["梅赛德斯-奔驰", "奥迪", "大陆集团", "采埃孚"],
    stats: { employ: 90, salary: 88, difficulty: 85, future: 85, international: 82 }
  },
  {
    icon: <Building size={32} />, name: "建筑学", en: "Architecture",
    unis: ["柏林工业大学", "魏玛包豪斯大学", "斯图加特大学"],
    salary: "€45,000 - €70,000/年", career: "建筑设计师、城市规划师、景观设计", companies: ["AS&P", "GMP建筑事务所", "HENN", "德国各类设计院"],
    stats: { employ: 80, salary: 70, difficulty: 85, future: 80, international: 85 }
  },
  {
    icon: <HeartPulse size={32} />, name: "医学", en: "Medicine",
    unis: ["海德堡大学", "慕尼黑大学", "图宾根大学"],
    salary: "€70,000 - €120,000/年", career: "临床医生、医学研究员、公共卫生专家", companies: ["夏里特医院", "拜耳", "勃林格殷格翰", "默克"],
    stats: { employ: 98, salary: 98, difficulty: 99, future: 95, international: 70 }
  },
  {
    icon: <Leaf size={32} />, name: "环境工程", en: "Environmental Engineering",
    unis: ["斯图加特大学", "慕尼黑工业大学", "亚琛工业大学"],
    salary: "€50,000 - €75,000/年", career: "水处理工程师、可再生能源分析师、环保咨询", companies: ["威立雅", "RWE", "E.ON", "巴斯夫"],
    stats: { employ: 88, salary: 75, difficulty: 80, future: 95, international: 85 }
  }
];

// 手写 SVG 雷达图组件
const RadarChart = ({ stats }: { stats: any }) => {
  const axes = [
    { label: '就业率', key: 'employ' }, { label: '薪酬水平', key: 'salary' },
    { label: '申请难度', key: 'difficulty' }, { label: '发展前景', key: 'future' }, { label: '国际化', key: 'international' }
  ];
  
  const getPoint = (val: number, idx: number, scale = 1) => {
    const angle = (Math.PI / 2) + (2 * Math.PI * idx / 5);
    const r = (val / 100) * 40 * scale;
    return `${50 - r * Math.cos(angle)},${50 - r * Math.sin(angle)}`;
  };

  const dataPoints = axes.map((a, i) => getPoint(stats[a.key], i)).join(' ');
  const bgPolygons = [100, 80, 60, 40, 20].map(level => axes.map((_, i) => getPoint(level, i)).join(' '));

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
      {bgPolygons.map((points, i) => (
        <polygon key={i} points={points} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      ))}
      {axes.map((_, i) => (
        <line key={i} x1="50" y1="50" x2={getPoint(100, i).split(',')[0]} y2={getPoint(100, i).split(',')[1]} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      ))}
      <polygon points={dataPoints} fill="rgba(37, 99, 235, 0.4)" stroke="#2563EB" strokeWidth="1.5" />
      {axes.map((a, i) => {
        const [x, y] = getPoint(115, i).split(',');
        return (
          <text key={i} x={x} y={y} fill="#9CA3AF" fontSize="6" textAnchor="middle" dominantBaseline="middle" alignmentBaseline="middle">{a.label}</text>
        );
      })}
    </svg>
  );
};

export const Majors: React.FC = () => {
  const [selectedMajor, setSelectedMajor] = useState<typeof majors[0] | null>(null);

  return (
    <section id="majors" className="py-20 bg-jicai-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">留德王牌专业解析</h2>
          <p className="text-gray-400">德国最具全球竞争力的优势学科 <span className="text-jicai-blue ml-2">(点击卡片查看就业雷达图)</span></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {majors.map((major, index) => (
            <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedMajor(major)}
              className="bg-white/5 hover:bg-white/10 border border-white/5 hover:border-jicai-blue/50 rounded-2xl p-6 transition-all cursor-pointer group shadow-lg"
            >
              <div className="w-14 h-14 bg-jicai-blue/10 text-jicai-blue rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {major.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-jicai-blue transition-colors">{major.name}</h3>
              <p className="text-xs text-gray-500 mb-4">{major.en}</p>
              <div className="space-y-2">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Top 推荐院校</p>
                {major.unis.slice(0,2).map((uni, i) => (
                  <div key={i} className="text-sm text-gray-300 flex items-center gap-2"><div className="w-1 h-1 bg-jicai-blue rounded-full"></div>{uni}</div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🌟 专业详情与雷达图弹窗 */}
      <AnimatePresence>
        {selectedMajor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedMajor(null)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} 
              className="relative bg-jicai-dark border border-white/10 rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl z-10 flex flex-col md:flex-row"
            >
              <button onClick={() => setSelectedMajor(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white z-20 bg-black/50 rounded-full p-1"><X size={20} /></button>
              
              {/* 左侧信息区 */}
              <div className="p-8 md:w-1/2 flex flex-col justify-center border-r border-white/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-jicai-blue/20 text-jicai-blue rounded-2xl flex items-center justify-center">{selectedMajor.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedMajor.name}</h3>
                    <p className="text-sm text-gray-400">{selectedMajor.en}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2"><Briefcase size={16} className="text-jicai-blue"/> 就业方向与起薪</h4>
                    <p className="text-gray-300 text-sm mb-1">{selectedMajor.career}</p>
                    <p className="text-jicai-blue font-bold text-lg">{selectedMajor.salary}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2"><Building size={16} className="text-jicai-blue"/> 顶尖雇主</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMajor.companies.map((comp, i) => (
                        <span key={i} className="text-xs bg-white/5 border border-white/10 text-gray-300 px-2 py-1 rounded">{comp}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 右侧雷达图区 */}
              <div className="p-8 md:w-1/2 bg-jicai-black flex flex-col items-center justify-center">
                <h4 className="text-sm font-bold text-gray-400 mb-8 uppercase tracking-widest">专业综合竞争力评估</h4>
                <div className="w-64 h-64">
                  <RadarChart stats={selectedMajor.stats} />
                </div>
                <div className="mt-8 text-center w-full">
                   <button onClick={() => {setSelectedMajor(null); document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' });}} className="w-full bg-jicai-blue hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-colors">
                     评估我的申请概率
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
