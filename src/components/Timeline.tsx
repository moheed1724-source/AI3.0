import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, BookOpen, Users } from 'lucide-react';

const timelines = {
  highschool: [
    { time: "阶段一", title: "语言与高考规划", desc: "开始德语初级学习。准备高考（达到满分70%可直申，否则需走预科路线）。" },
    { time: "阶段二", title: "APS审核与预科申请", desc: "参加留德人员审核部（APS）高中生程序审核，申请德国大学预科（Studienkolleg）及预科入学考试（Aufnahmeprüfung）。" },
    { time: "阶段三", title: "赴德就读预科", desc: "通过考试后，在德国进行为期一年的预科学习（T-Kurs/M-Kurs/W-Kurs等）。" },
    { time: "阶段四", title: "FSP结业与大学录取", desc: "通过预科结业考试（FSP），凭FSP成绩和高考成绩正式申请并入读德国大学本科。" }
  ],
  bachelor: [
    { time: "阶段一", title: "背景提升与语言", desc: "保持大学在校GPA（建议80分以上），系统学习德语或雅思，准备相关实习经历。" },
    { time: "阶段二", title: "APS面谈审核", desc: "完成6个学期后，准备材料并参加APS面谈审核，获取APS证书（留德最重要通行证）。" },
    { time: "阶段三", title: "Uni-assist 递交申请", desc: "通过Uni-assist或大学官网系统递交网申，撰写动机信(Motivation Letter)和个人简历(CV)。" },
    { time: "阶段四", title: "获签与注册报到", desc: "收到录取通知书（Zu），办理自保金冻结，递交签证。赴德完成落户、保险及大学注册。" }
  ],
  master: [
    { time: "阶段一", title: "学分匹配与定位", desc: "德国硕士极看重本科课程匹配度（Modulhandbuch）。根据目标院校要求调整大三/大四选课。" },
    { time: "阶段二", title: "APS审核与标化考试", desc: "通过APS面谈。冲击TU9需考出德语TestDaF（通常4x4）或雅思6.5-7.0，部分商科需GMAT。" },
    { time: "阶段三", title: "多通道网申", desc: "制作高标准的文书，通过Uni-assist、VPD或Vorspann系统递交申请，准备可能出现的入学面试。" },
    { time: "阶段四", title: "签证与启程", desc: "拿到Master录取，办理德意志银行/Fintiba自保金，递签，预定学生宿舍（Studentenwerk）。" }
  ]
};

export const Timeline: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'highschool' | 'bachelor' | 'master'>('master');

  const tabs = [
    { id: 'highschool', label: '高中生 / 预科', icon: <BookOpen size={16} /> },
    { id: 'bachelor', label: '本科申请', icon: <Users size={16} /> },
    { id: 'master', label: '硕士申请', icon: <GraduationCap size={16} /> }
  ];

  return (
    <section id="timeline" className="py-20 bg-jicai-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">专属留学时间规划</h2>
          <p className="text-gray-400">德国申请极其严谨，请选择您的当前阶段查看详细步骤</p>
        </div>

        {/* 🌟 标签切换器 */}
        <div className="flex justify-center mb-16">
          <div className="bg-jicai-dark p-1 rounded-xl flex border border-white/10">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                  activeTab === tab.id ? 'bg-jicai-blue text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          {/* 中心时间线 */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-jicai-blue/50 via-white/10 to-transparent hidden md:block"></div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {timelines[activeTab].map((step, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="w-full md:w-5/12"></div>
                  
                  <div className="z-10 flex items-center justify-center w-12 h-12 rounded-full bg-jicai-dark border-4 border-jicai-blue shadow-[0_0_15px_rgba(37,99,235,0.5)] shrink-0 my-4 md:my-0">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>

                  <div className="w-full md:w-5/12 bg-jicai-dark p-8 rounded-2xl border border-white/5 hover:border-jicai-blue/50 transition-all shadow-lg hover:shadow-jicai-blue/10 group">
                    <span className="text-jicai-blue text-xs font-bold uppercase tracking-wider bg-jicai-blue/10 px-3 py-1 rounded-full">{step.time}</span>
                    <h3 className="text-xl font-bold text-white mt-4 mb-3 group-hover:text-jicai-blue transition-colors">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
