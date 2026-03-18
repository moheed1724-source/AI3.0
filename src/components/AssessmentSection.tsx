import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { calculateScore, UserInput, AssessmentResult } from '../utils/scoring';
import { Lock, X, BarChart3, CheckCircle, AlertTriangle, BookOpen, MessageCircle, FileText } from 'lucide-react';

export const AssessmentSection: React.FC = () => {
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [showFullReport, setShowFullReport] = useState(false);
  const [inquiryContext, setInquiryContext] = useState("获取完整评估报告"); // 动态咨询主题
  const [result, setResult] = useState<AssessmentResult | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const [formData, setFormData] = useState<UserInput & { contact: string }>({
    degree: 'master', gpa: 85, language: 'german_b2', major: '机械工程', background: '211', hasTest: 'no', highSchoolType: 'gaokao', highSchoolScore: 'good', contact: ''
  });

  const handleInputChange = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));

  const loadingTexts = [
    "正在建立您的专属学术背景画像...",
    "正在通过巴伐利亚算法转换您的绩点...",
    "正在全德 50 所主流院校库中进行比对...",
    "正在生成济才多维录取诊断书..."
  ];

  const handleGenerate = () => {
    setLoading(true); setLoadingStep(0);
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep += 1;
      if (currentStep < 4) setLoadingStep(currentStep);
    }, 1500);

    setTimeout(() => {
      clearInterval(interval);
      setResult(calculateScore(formData as UserInput));
      setLoading(false); setStep('result');
      setTimeout(() => openLeadModal("获取完整评估与冲刺名单"), 3000);
    }, 6500); 
  };

  const openLeadModal = (context: string) => {
    setInquiryContext(context);
    setShowFullReport(true);
  };

  const submitLead = async () => {
    if (!formData.contact) return alert("请输入您的手机号或微信号！");
    setIsSubmitting(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: "a531da67-7614-4c7b-992d-e87c02d63ac2",
          '咨询意向': inquiryContext,
          '联系方式': formData.contact,
          '申请阶段': formData.degree,
          '目标专业': formData.major,
          ...(formData.degree === 'master' ? { 'GPA': formData.gpa, '背景': formData.background } : { '体系': formData.highSchoolType, '预估': formData.highSchoolScore })
        })
      });
      if (response.ok) setContactSubmitted(true);
    } catch (error) { console.error(error); }
    setIsSubmitting(false);
  };

  return (
    <section id="assessment" className="py-20 bg-jicai-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-jicai-blue rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">AI 智能评估系统</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">引入巴伐利亚转换算法与50所院校库，多维预测录取概率</p>
        </div>

        <div className="max-w-4xl mx-auto bg-jicai-black/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            {step === 'form' ? (
              <motion.div key="form" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="p-8 md:p-12">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* ====== 左侧表单 ====== */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">申请阶段</label>
                      <div className="flex gap-4">
                        {['bachelor', 'master'].map((type) => (
                          <button key={type} onClick={() => handleInputChange('degree', type)} className={`flex-1 py-3 px-4 rounded-xl border transition-all ${formData.degree === type ? 'bg-jicai-blue/20 border-jicai-blue text-jicai-blue' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}>
                            {type === 'bachelor' ? '本科 (Bachelor)' : '硕士 (Master)'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {formData.degree === 'master' ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">国内均分 (GPA/100)</label>
                          <input type="range" min="60" max="100" value={formData.gpa} onChange={(e) => handleInputChange('gpa', parseInt(e.target.value))} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-jicai-blue" />
                          <div className="flex justify-between mt-2 text-sm text-gray-500"><span>60</span><span className="text-jicai-blue font-bold text-lg">{formData.gpa}</span><span>100</span></div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">国内院校层级</label>
                          <select value={formData.background} onChange={(e) => handleInputChange('background', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-jicai-blue transition-colors">
                            <option value="985">985 院校</option><option value="211">211 院校</option><option value="tier1">普通一本</option><option value="tier2">二本及其他</option>
                          </select>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">目前就读课程体系</label>
                          <select value={formData.highSchoolType} onChange={(e) => handleInputChange('highSchoolType', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-jicai-blue transition-colors">
                            <option value="gaokao">普通高中 (高考路线)</option><option value="AL">A-Level 课程</option><option value="IB">IB 课程</option><option value="AP">AP 课程</option><option value="OSSD">OSSD / 加高</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">目前成绩/预估水平</label>
                          <select value={formData.highSchoolScore} onChange={(e) => handleInputChange('highSchoolScore', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-jicai-blue transition-colors">
                            <option value="excellent">拔尖 (一本线大降/全A/38分+)</option><option value="good">良好 (过一本线/部分A/33分+)</option><option value="average">中等 (二本线/普通成绩)</option><option value="low">薄弱 (可能需走预科)</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>

                  {/* ====== 右侧表单 ====== */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">目标专业方向</label>
                      <select value={formData.major} onChange={(e) => handleInputChange('major', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-jicai-blue transition-colors">
                        <option value="机械工程">机械工程</option><option value="计算机">计算机科学</option><option value="电气工程">电气工程</option><option value="商科">商科/管理</option><option value="经济学">经济学</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">目前语言水平</label>
                      <select value={formData.language} onChange={(e) => handleInputChange('language', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-jicai-blue transition-colors">
                        <option value="german_c1">德语 TestDaF 4x4 / C1</option><option value="german_b2">德语 B2</option><option value="german_b1">德语 B1</option><option value="ielts_7">雅思 7.0+</option><option value="ielts_6.5">雅思 6.5</option><option value="other">其他 / 暂无 / 正在学</option>
                      </select>
                    </div>
                    {formData.degree === 'master' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <label className="block text-sm font-medium text-gray-400 mb-2">是否拥有 GRE / GMAT 成绩？</label>
                        <div className="flex gap-4">
                          {['yes', 'no'].map((val) => (
                            <button key={val} onClick={() => handleInputChange('hasTest', val)} className={`flex-1 py-3 px-4 rounded-xl border transition-all ${formData.hasTest === val ? 'bg-jicai-blue/20 border-jicai-blue text-jicai-blue' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}>
                              {val === 'yes' ? '是 (有成绩)' : '否 (暂无)'}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
                <div className="mt-10">
                  <button onClick={handleGenerate} disabled={loading} className="w-full bg-jicai-blue hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 relative overflow-hidden h-16">
                    {loading ? (
                       <AnimatePresence mode="wait"><motion.span key={loadingStep} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }} className="text-white/90 text-sm md:text-base font-medium">{loadingTexts[loadingStep]}</motion.span></AnimatePresence>
                    ) : '开始精准计算概率'}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-8 md:p-12">
                
                {/* 报告头部 */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6 border-b border-white/10 pb-8">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <svg className="w-24 h-24 transform -rotate-90"><circle className="text-gray-700" strokeWidth="6" stroke="currentColor" fill="transparent" r="44" cx="48" cy="48" /><circle className="text-jicai-blue" strokeWidth="6" strokeDasharray={276} strokeDashoffset={276 - (276 * (result?.score || 0)) / 100} strokeLinecap="round" stroke="currentColor" fill="transparent" r="44" cx="48" cy="48" /></svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-2xl font-bold text-white">{result?.score}</span><span className="text-[10px] text-gray-400">综合判定</span></div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">多维体检报告已生成</h3>
                      <p className="text-gray-400 text-sm max-w-sm">{result?.suggestion}</p>
                    </div>
                  </div>
                </div>

                {/* 🌟 新增：多维度诊断雷达与文字分析 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                   <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-jicai-blue/50 transition-colors">
                      <h4 className="text-jicai-blue text-sm font-bold mb-2">📚 学术竞争力</h4>
                      <p className="text-gray-300 text-xs leading-relaxed">{result?.dimensions.academic}</p>
                   </div>
                   <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-jicai-blue/50 transition-colors">
                      <h4 className="text-jicai-blue text-sm font-bold mb-2">🗣️ 语言达标率</h4>
                      <p className="text-gray-300 text-xs leading-relaxed">{result?.dimensions.language}</p>
                   </div>
                   <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-jicai-blue/50 transition-colors">
                      <h4 className="text-jicai-blue text-sm font-bold mb-2">🎯 择校策略</h4>
                      <p className="text-gray-300 text-xs leading-relaxed">{result?.dimensions.strategy}</p>
                   </div>
                </div>

                {/* 核心院校名单 */}
                <div className="space-y-4 mb-8">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2"><BarChart3 size={20} className="text-jicai-blue" /> 巴伐利亚算法匹配结果</h4>
                  {result?.predictions.map((pred, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-white">{pred.name}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${pred.type === 'reach' ? 'border-red-500/50 text-red-400' : pred.type === 'match' ? 'border-blue-500/50 text-blue-400' : 'border-green-500/50 text-green-400'}`}>
                            {pred.type === 'reach' ? '冲刺院校' : pred.type === 'match' ? '核心匹配' : '稳妥保底'}
                          </span>
                        </div>
                        <span className="font-bold text-white">{pred.probability}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden mb-2">
                        <motion.div animate={{ width: `${pred.probability}%` }} transition={{ duration: 1 }} className={`h-full rounded-full ${pred.probability < 40 ? 'bg-red-500' : pred.probability < 70 ? 'bg-jicai-blue' : 'bg-green-500'}`}></motion.div>
                      </div>
                      {pred.warningMsg && (
                         <div className="mt-2 text-xs text-red-400 flex items-start gap-1 bg-red-900/20 p-2 rounded border border-red-500/30">
                            <AlertTriangle size={14} className="shrink-0 mt-0.5" /><span>{pred.warningMsg}</span>
                         </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* 🌟 新增：交叉销售 / 细分咨询入口 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                  <button onClick={() => openLeadModal(`咨询 ${formData.major} 专业详情及课程匹配`)} className="bg-white/5 hover:bg-jicai-blue/20 border border-white/10 hover:border-jicai-blue p-3 rounded-lg text-xs text-gray-300 transition-all flex flex-col items-center gap-2">
                    <BookOpen size={18} className="text-jicai-blue" /> 深度专业解析
                  </button>
                  <button onClick={() => openLeadModal("咨询德语/雅思备考及提分规划")} className="bg-white/5 hover:bg-jicai-blue/20 border border-white/10 hover:border-jicai-blue p-3 rounded-lg text-xs text-gray-300 transition-all flex flex-col items-center gap-2">
                    <MessageCircle size={18} className="text-purple-400" /> 语言提分规划
                  </button>
                  <button onClick={() => openLeadModal("咨询留德APS审核/预科辅导")} className="bg-white/5 hover:bg-jicai-blue/20 border border-white/10 hover:border-jicai-blue p-3 rounded-lg text-xs text-gray-300 transition-all flex flex-col items-center gap-2">
                    <FileText size={18} className="text-green-400" /> APS/预科辅导
                  </button>
                  <button onClick={() => openLeadModal("获取定制版选校方案及报价")} className="bg-jicai-blue/20 hover:bg-jicai-blue border border-jicai-blue p-3 rounded-lg text-xs text-white transition-all flex flex-col items-center gap-2 font-bold">
                    <Lock size={18} /> 获取完整方案
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <button onClick={() => { setStep('form'); setContactSubmitted(false); }} className="text-gray-500 hover:text-white text-sm underline">返回重新评估</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 弹窗逻辑保持 */}
      <AnimatePresence>
        {showFullReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowFullReport(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl z-10">
              <button onClick={() => setShowFullReport(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={24} /></button>
              
              {!contactSubmitted ? (
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-jicai-black mb-2">{inquiryContext.includes('完整') ? '获取详细评估报告' : '专属深度咨询'}</h3>
                  <p className="text-gray-600 mb-6 text-sm">请输入联系方式，专家将针对【{inquiryContext}】为您提供一对一规划与资料包。</p>
                  
                  <div className="mb-6 text-left">
                    <label className="block text-sm font-medium text-gray-700 mb-2">手机号或微信号 <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="用于接收资料与规划" value={formData.contact} onChange={(e) => handleInputChange('contact', e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-jicai-blue transition-colors" />
                  </div>
                  
                  <button onClick={submitLead} disabled={isSubmitting} className="w-full bg-jicai-blue hover:bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
                    {isSubmitting ? '正在安全提交...' : '立即预约专家'}
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="text-green-500" size={32} /></div>
                  <h3 className="text-2xl font-bold text-jicai-black mb-2">预约已成功！</h3>
                  <p className="text-gray-600 mb-6 text-sm">您的专属顾问已收到需求，将尽快联系您发送资料包。</p>
                  
                  <div className="bg-gray-50 p-4 rounded-xl inline-block mb-4 border border-gray-100">
                    <div className="w-40 h-40 bg-white flex items-center justify-center rounded-lg border border-gray-200 mx-auto">
                       <img src="qrcode.png" alt="WeChat" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                  <div className="space-y-1 text-sm text-gray-500"><p>您也可以主动扫码添加顾问</p><p className="font-bold text-jicai-blue">微信: jicaixiaokefu</p></div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
