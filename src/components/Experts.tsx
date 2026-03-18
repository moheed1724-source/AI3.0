import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Award, X, BookOpen, GraduationCap, CheckCircle2, Send } from 'lucide-react';

const experts = [
  { name: "Emma", title: "留学团队负责人", exp: "15年", cases: "1200+", desc: "累计规划上万名学子。", image: "/teacher.jpg", fullDesc: "拥有15年德国留学规划经验，擅长挖掘学生背景亮点，为低GPA、跨专业申请者提供逆袭方案。已帮助过千名学子斩获顶尖名校Offer。", specialties: ["TU9高端申请", "疑难案例扭转", "跨专业申请"], motto: "留学不仅是一纸Offer，更是人生轨迹的跨越。" },
  { name: "蒋老师", title: "资深欧亚专家", exp: "13年", cases: "800+", desc: "专注小语种领域13年", image: "/teacher2.jpg", fullDesc: "出身90年代公派留学家庭，深谙欧洲教育体系。精通德国教育政策、APS审核技巧及拒签信申诉。不仅关注申请成功率，更关注学生长期发展。", specialties: ["APS审核辅导", "文商科名校", "签证疑难"], motto: "用最严谨的态度，做最温暖的教育。" },
  { name: "Thomas", title: "资深德语老师", exp: "11年", cases: "500+", desc: "多年德英双语教学经验。", image: "/teacher3.jpg", fullDesc: "拥有11年德英双语教学经验，TestDaF及 DSH 考试辅导专家。独创沉浸式逻辑德语学习法，帮助零基础学生突破德语瓶颈。", specialties: ["德福考前冲刺", "DSH保过规划", "学术写作"], motto: "语言不仅是工具，更是融入德国思维的钥匙。" }
];

export const Experts: React.FC = () => {
  const [selectedExpert, setSelectedExpert] = useState<typeof experts[0] | null>(null);
  const [isBookingMode, setIsBookingMode] = useState(false);
  const [contactInfo, setContactInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const basePath = import.meta.env.BASE_URL;

  // 🌟 关闭弹窗时重置所有状态
  const handleClose = () => {
    setSelectedExpert(null);
    setTimeout(() => { setIsBookingMode(false); setIsSuccess(false); setContactInfo(""); }, 300);
  };

  // 🌟 Web3Forms 表单提交逻辑
  const handleBookingSubmit = async () => {
    if (!contactInfo) return alert("请填写手机号或微信号！");
    setIsSubmitting(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: "a531da67-7614-4c7b-992d-e87c02d63ac2", // 你的专属Key
          subject: `收到新的导师预约: ${selectedExpert?.name}`,
          '预约导师': selectedExpert?.name,
          '客户联系方式': contactInfo,
        })
      });
      if (response.ok) setIsSuccess(true);
    } catch (error) {
      alert("提交失败，请稍后重试");
    }
    setIsSubmitting(false);
  };

  return (
    <section id="experts" className="py-20 bg-jicai-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">专家团队</h2>
          <p className="text-gray-400">最专业的导师，为您保驾护航</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experts.map((expert, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2 }} onClick={() => setSelectedExpert(expert)} className="group bg-jicai-dark rounded-2xl overflow-hidden border border-white/5 hover:border-jicai-blue/50 transition-all shadow-lg hover:shadow-jicai-blue/10 cursor-pointer">
              <div className="h-64 overflow-hidden relative bg-gray-800">
                <img src={`${basePath}${expert.image.replace(/^\//, '')}`} alt={expert.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-jicai-dark to-transparent h-20"></div>
              </div>
              <div className="p-6 relative -mt-6">
                <div className="bg-jicai-blue text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">{expert.title}</div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-jicai-blue transition-colors">{expert.name}</h3>
                <div className="flex gap-4 mb-4 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2"><Briefcase size={16} className="text-gray-500" /><div><div className="text-white font-bold">{expert.exp}</div><div className="text-[10px] text-gray-500 uppercase">经验</div></div></div>
                  <div className="w-[1px] bg-white/10"></div>
                  <div className="flex items-center gap-2"><Award size={16} className="text-gray-500" /><div><div className="text-white font-bold">{expert.cases}</div><div className="text-[10px] text-gray-500 uppercase">成功案例</div></div></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 导师详情 & 预约弹窗 */}
      <AnimatePresence>
        {selectedExpert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-jicai-dark border border-white/10 rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl z-10 flex flex-col md:flex-row">
              <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-20 bg-black/50 rounded-full p-1"><X size={20} /></button>
              
              <div className="md:w-2/5 h-48 md:h-auto bg-gray-800 relative">
                <img src={`${basePath}${selectedExpert.image.replace(/^\//, '')}`} alt={selectedExpert.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-jicai-dark to-transparent md:hidden"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-jicai-dark hidden md:block"></div>
              </div>

              <div className="p-8 md:w-3/5 flex flex-col justify-center">
                {!isBookingMode ? (
                  // 展示模式
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="bg-jicai-blue/20 text-jicai-blue border border-jicai-blue/30 text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">{selectedExpert.title}</div>
                    <h3 className="text-2xl font-bold text-white mb-1">{selectedExpert.name}</h3>
                    <p className="text-gray-400 text-xs italic mb-4">"{selectedExpert.motto}"</p>

                    <div className="space-y-4 mb-8">
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-1"><BookOpen size={14} className="text-jicai-blue"/> 导师简介</h4>
                        <p className="text-gray-400 text-sm">{selectedExpert.fullDesc}</p>
                      </div>
                    </div>
                    <button onClick={() => setIsBookingMode(true)} className="w-full bg-jicai-blue hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-colors shadow-lg">免费预约该导师</button>
                  </motion.div>
                ) : !isSuccess ? (
                  // 表单提交模式
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <button onClick={() => setIsBookingMode(false)} className="text-gray-500 text-sm mb-4 hover:text-white flex items-center gap-1">← 返回简介</button>
                    <h3 className="text-xl font-bold text-white mb-2">预约 {selectedExpert.name} 导师</h3>
                    <p className="text-gray-400 text-sm mb-6">留下您的联系方式，导师将为您提供一对一留德规划解答。</p>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">您的手机号 / 微信号 <span className="text-red-500">*</span></label>
                        <input type="text" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} placeholder="请输入有效联系方式" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-jicai-blue" />
                      </div>
                    </div>
                    
                    <button onClick={handleBookingSubmit} disabled={isSubmitting} className="w-full bg-jicai-blue hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                      {isSubmitting ? '正在提交...' : <><Send size={18} /> 确认提交预约</>}
                    </button>
                  </motion.div>
                ) : (
                  // 提交成功模式
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle2 size={32} /></div>
                    <h3 className="text-2xl font-bold text-white mb-2">预约成功！</h3>
                    <p className="text-gray-400 text-sm mb-6">导师已收到您的需求，将尽快与您取得联系。</p>
                    <button onClick={handleClose} className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-colors">关闭</button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
