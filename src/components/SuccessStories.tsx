import React from 'react';
import { motion } from 'motion/react';
import { Star, GraduationCap, Languages, Award, ChevronRight } from 'lucide-react';

const cases = [
  { name: "张同学", uni: "双非一本", gpa: "83/100", lang: "德语 B2", offer: "慕尼黑工业大学", major: "机械工程", quote: "济才帮我深入挖掘了课程匹配度和科研经历的亮点，成功逆袭TUM！" },
  { name: "李同学", uni: "211院校", gpa: "88/100", lang: "雅思 7.0", offer: "亚琛工业大学", major: "电气工程", quote: "文书老师非常专业，针对亚琛的课程描述(Modulhandbuch)做了完美的解释。" },
  { name: "王同学", uni: "985院校", gpa: "85/100", lang: "德福 16", offer: "海德堡大学", major: "物理学", quote: "从APS面谈辅导到递交签证，老师的每一步节点卡得极其精准。" },
  { name: "赵同学", uni: "普通二本", gpa: "86/100", lang: "德语 C1", offer: "柏林工业大学", major: "计算机科学", quote: "一开始以为只能去普通大学，在顾问的冲刺规划下，竟然拿到了TU9的Zu！" },
  { name: "陈同学", uni: "211院校", gpa: "81/100", lang: "雅思 6.5", offer: "曼海姆大学", major: "企业管理", quote: "商科申请太卷了，多亏了老师帮我规划了GMAT考试时间和动机信结构。" },
  { name: "刘同学(高中)", uni: "国内普高", gpa: "高考 520", lang: "德语 B1", offer: "卡尔斯鲁厄预科", major: "T-Kurs (理工类)", quote: "高考后临时决定去德国，老师以最快速度帮我抢到了预科考试名额！" }
];

export const SuccessStories: React.FC = () => {
  return (
    <section id="success" className="py-20 bg-jicai-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">成功案例库</h2>
            <p className="text-gray-400">用真实的Offer说话，见证每一次平凡到卓越的跨越</p>
          </div>
          <button onClick={() => document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' })} className="text-jicai-blue hover:text-white flex items-center gap-1 transition-colors text-sm font-bold">
            评估我的上岸概率 <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((item, index) => (
            <motion.div
              key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
              className="bg-white/5 p-8 rounded-2xl border border-white/5 relative hover:bg-white/10 transition-colors group flex flex-col justify-between"
            >
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-jicai-blue rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform">
                “
              </div>
              
              <div>
                <div className="flex gap-1 text-yellow-500 mb-4 mt-2">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-gray-300 italic mb-6 text-sm leading-relaxed min-h-[60px]">"{item.quote}"</p>

                <div className="space-y-2 mb-6 border-t border-white/10 pt-4">
                  <div className="flex justify-between text-sm"><span className="text-gray-400 flex items-center gap-1"><GraduationCap size={14}/>背景</span><span className="text-white">{item.uni}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-400 flex items-center gap-1"><Award size={14}/>成绩</span><span className="text-white">{item.gpa}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-400 flex items-center gap-1"><Languages size={14}/>语言</span><span className="text-white">{item.lang}</span></div>
                </div>
              </div>

              <div className="bg-jicai-black/50 p-4 rounded-xl border border-white/5 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-16 h-16 bg-jicai-blue/10 rounded-full blur-xl"></div>
                <div className="text-xs text-gray-500 uppercase mb-1">录取院校 / Offer</div>
                <div className="text-jicai-blue font-bold text-lg relative z-10">{item.offer}</div>
                <div className="text-gray-400 text-sm relative z-10">{item.major}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
