import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Building2, GraduationCap, Globe, Users, Trophy } from 'lucide-react';

export const Hero: React.FC<{ scrollToAssessment: () => void }> = ({ scrollToAssessment }) => {
  // 帮你写好跳转学校区域的逻辑
  const scrollToSystem = () => {
    document.getElementById('system')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center bg-jicai-black overflow-hidden pt-20">
      {/* 背景科技网格 */}
      <div className="absolute inset-0 z-0 opacity-10" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      
      {/* 渐变光晕叠加 */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-jicai-blue/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center flex-grow">
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-2 mb-6">
               <span className="w-8 h-[2px] bg-jicai-blue"></span>
               <span className="text-jicai-blue text-sm font-bold tracking-[0.2em] uppercase">German Premium Education</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              济才德国 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-jicai-blue to-cyan-400">
                AI 智能评估系统
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mt-6 max-w-lg leading-relaxed">
              融合24年留德申请大数据与AI核心算法。3分钟精准评估录取概率，量身定制您的 TU9/精英大学 逆袭方案。
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="flex flex-col sm:flex-row gap-4">
            <button onClick={scrollToAssessment} className="px-8 py-4 bg-jicai-blue hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-900/30 transition-all flex items-center justify-center gap-2 group">
              立即 AI 评估
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            {/* 🌟 激活了了解大学的按钮 */}
            <button onClick={scrollToSystem} className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all backdrop-blur-sm flex items-center justify-center gap-2 group">
              <Building2 size={18} className="text-gray-400 group-hover:text-white transition-colors" />
              了解德国大学
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex flex-wrap items-center gap-6 text-sm text-gray-400 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-jicai-blue" /><span>海量案例库对比</span></div>
            <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-jicai-blue" /><span>TU9 录取偏好解析</span></div>
            <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-jicai-blue" /><span>隐私安全加密</span></div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="hidden lg:block relative">
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-jicai-blue/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
            
            {/* 更具科技感的边框 */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10 h-full p-2 bg-white/5 backdrop-blur-sm">
               <img src="BG.jpg" alt="Jicai Office" className="w-full h-full object-cover rounded-xl opacity-90 hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
            </div>
            
            {/* 悬浮数据卡片 */}
            <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="absolute -top-6 -right-6 bg-jicai-dark/90 backdrop-blur-md p-4 pr-8 rounded-xl border border-white/10 shadow-xl z-20 flex items-center gap-4">
              <div className="w-10 h-10 bg-jicai-blue rounded-lg flex items-center justify-center text-white"><GraduationCap size={20} /></div>
              <div><div className="text-white font-bold text-lg">10,000+</div><div className="text-xs text-gray-400">累计成功规划</div></div>
            </motion.div>

            <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }} className="absolute -bottom-6 -left-6 bg-jicai-dark/90 backdrop-blur-md p-4 pr-8 rounded-xl border border-white/10 shadow-xl z-20 flex items-center gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white"><Globe size={20} /></div>
              <div><div className="text-white font-bold text-lg">Top 15%</div><div className="text-xs text-gray-400">精英大学录取率</div></div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 🌟 新增：底部信任数据条 (Trust Badges) 解决空旷感 */}
      <div className="w-full bg-white/5 border-t border-white/10 mt-12 py-8 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <Trophy className="text-jicai-blue" size={28} />
            <h4 className="text-2xl font-bold text-white">98.5%</h4>
            <p className="text-xs text-gray-400 uppercase tracking-wider">签证通过率</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <Building2 className="text-jicai-blue" size={28} />
            <h4 className="text-2xl font-bold text-white">200+</h4>
            <p className="text-xs text-gray-400 uppercase tracking-wider">合作德国院校</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <Users className="text-jicai-blue" size={28} />
            <h4 className="text-2xl font-bold text-white">15年</h4>
            <p className="text-xs text-gray-400 uppercase tracking-wider">专注小语种留学</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <GraduationCap className="text-jicai-blue" size={28} />
            <h4 className="text-2xl font-bold text-white">3500+</h4>
            <p className="text-xs text-gray-400 uppercase tracking-wider">斩获 TU9 录取</p>
          </div>
        </div>
      </div>
    </section>
  );
};
