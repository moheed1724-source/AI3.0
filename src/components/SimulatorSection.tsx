import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronRight, CheckSquare, Square, RotateCcw } from 'lucide-react';

// ─── 申请时间轴数据 ────────────────────────────────────────────────
const WINTER_TIMELINE = [
  { month: 'T-18个月', task: '确认留学方向', badge: 'blue', badgeText: '规划阶段',
    desc: '明确是否赴德留学的决定，开始了解德国教育体系。',
    items: ['研究目标专业在德国的院校排名', '了解德语学习时间成本（B2约需500-700小时）', '估算留学总预算（公立免学费，生活费约€10,000-14,000/年）'],
    tip: '💡 此阶段最重要的是确认方向，不要着急，先研究清楚再行动。' },
  { month: 'T-15个月', task: '开始德语备考', badge: 'orange', badgeText: '语言阶段',
    desc: '德语是留德核心门槛，建议零基础此时开始系统学习。',
    items: ['报名德语班或自学（推荐歌德学院/线上课程）', 'A1→A2约3个月 · A2→B1约4个月 · B1→B2约5个月', '同步了解APS笔试科目，提前规划专业课复习'],
    tip: '💡 德语越早开始越好，B2是基础门槛，C1是理想目标。' },
  { month: 'T-12个月', task: 'APS材料准备', badge: 'red', badgeText: '⚠️ 关键节点',
    desc: '开始收集APS所需材料，提交在线申请。',
    items: ['访问 aps.org.cn 下载申请表，缴纳考试费约¥1800', '到学校教务处开具成绩单（加盖公章，每科每学期）', '准备护照复印件、在读证明/毕业证、学位证（如有）'],
    tip: '⚠️ APS从申请到拿到证书约需3-6个月，绝对不能拖延！' },
  { month: 'T-9个月', task: 'APS笔试+面试', badge: 'red', badgeText: '⚠️ 关键节点',
    desc: 'APS笔试和面试是中国学生赴德留学最重要的认证关卡。',
    items: ['笔试：专业核心课考察（约90分钟，闭卷）', '面试：中德双语，考察学习经历、专业知识、留学动机', '通过后约2-4周收到APS认证证书（有效期长期）'],
    tip: '💡 使用平台内"APS面谈模拟"功能提前练习！' },
  { month: 'T-8个月', task: '确定选校名单', badge: 'blue', badgeText: '申请阶段',
    desc: '结合APS结果、GPA和语言水平，确定最终申请院校梯队。',
    items: ['建议：冲刺1-2所 + 主申2-3所 + 保底1-2所', '确认各校申请截止日期（冬季学期一般为5月15日前后）', '了解各校申请方式：uni-assist平台 或 直申官网'],
    tip: '💡 德国公立大学免学费，选校以专业实力为主，不要只看排名。' },
  { month: 'T-6个月', task: '准备申请文书', badge: 'orange', badgeText: '申请阶段',
    desc: '动机信和推荐信是最影响申请结果的软性材料。',
    items: ['撰写动机信（每所学校需要个性化版本，约1-2页）', '联系教授/导师请求推荐信（至少提前6-8周）', '将成绩单翻译成德语并公证（找正规翻译机构）'],
    tip: '💡 动机信要回答：为什么选这个专业、为什么选这所学校、你的职业目标是什么。' },
  { month: 'T-5个月', task: '提交大学申请', badge: 'red', badgeText: '⚠️ 截止节点',
    desc: '冬季学期申请截止通常为5月15日前后。',
    items: ['在 uni-assist.de 创建账号并上传所有材料', 'uni-assist手续费：首所院校€75，每增加一所€30', '提交后耐心等待（约2-4个月），保持邮件畅通'],
    tip: '⚠️ 不同学校截止日期不同，以官网为准，错过截止日期无法补交！' },
  { month: 'T-3个月', task: '签证与行前准备', badge: 'blue', badgeText: '收尾阶段',
    desc: '收到录取通知书后立即开始签证申请流程。',
    items: ['在Fintiba/Deutsche Bank开设封存账户（约€11,208，需1-2周）', '在德国驻华使馆官网预约签证面谈（等待可能长达2个月！）', '购买海外医疗保险 · 订机票 · 预订宿舍'],
    tip: '💡 签证预约越早越好！北京使馆夏季高峰期等待极长，务必提前。' },
  { month: '🎉 出发！', task: '开始德国留学生涯', badge: 'green', badgeText: '完成！',
    desc: '抵达德国后，按顺序完成入学注册和生活安置。',
    items: ['14天内完成Anmeldung住址登记（Bürgeramt市政厅）', '激活封存账户 · 开设普通银行账户（DKB/ING免费）', '注册TK/AOK医保 · 完成大学注册入学（Immatrikulation）'],
    tip: '🎉 恭喜！踏上德国留学之旅。' },
];

// ─── 材料清单数据 ────────────────────────────────────────────────
const MATERIALS: Record<string, { section: string; items: { name: string; desc: string; required: boolean }[] }[]> = {
  aps: [
    { section: '📝 申请表格', items: [
      { name: 'APS在线申请表', desc: '访问 aps.org.cn 在线填写，需要护照信息和学历信息', required: true },
      { name: 'APS考试费 约¥1800', desc: '根据学历类型略有差异，需在线支付后才能预约考试时间', required: true },
    ]},
    { section: '📄 学历证明', items: [
      { name: '中文成绩单原件（加盖教务处公章）', desc: '需包含所有学期每门课的成绩和学分，是APS审核最重要材料', required: true },
      { name: '在读证明 / 毕业证书', desc: '在读学生开具在读证明；已毕业提供毕业证原件+复印件', required: true },
      { name: '学位证书（已毕业）', desc: '学士/硕士学位证书原件及复印件', required: true },
      { name: '教学计划/课程说明', desc: '专业课程的学时、学分及内容说明，帮助APS了解专业背景', required: false },
    ]},
    { section: '🪪 证件照片', items: [
      { name: '护照原件+复印件', desc: '护照有效期须覆盖预期在德学习时间，建议提前续签', required: true },
      { name: '证件照 35×45mm 白底', desc: '近期照片，符合德国签证照片规格要求', required: true },
    ]},
  ],
  uni: [
    { section: '📝 核心文书', items: [
      { name: '动机信 Motivationsschreiben', desc: '德语或英语，约1-2页。说明专业选择原因、学术背景、职业目标', required: true },
      { name: '简历 Lebenslauf（德式格式）', desc: '倒叙排列，包含照片，通常1页。参考德国简历模板', required: true },
      { name: '推荐信 Empfehlungsschreiben', desc: '通常需要1-2封，来自教授或实习导师，英文或德文均可', required: true },
    ]},
    { section: '📋 认证材料', items: [
      { name: 'APS认证证书', desc: 'APS面谈通过后颁发，需要在申请截止前拿到', required: true },
      { name: '语言证书 DSH/TestDaF/Goethe/IELTS', desc: '大多数院校要求DSH-2或TestDaF 4×4；英授项目要求雅思6.0+', required: true },
      { name: '德语版成绩单（公证）', desc: '需专业机构翻译并公证，建议找德国领事馆认可的翻译机构', required: true },
      { name: '毕业证+学位证（公证版）', desc: '中英德三语公证，部分院校要求德国使馆认证（Apostille）', required: true },
    ]},
    { section: '➕ 加分材料', items: [
      { name: '科研/实习证明', desc: '相关领域实习、科研经历证明，显著提升竞争力', required: false },
      { name: '作品集 Portfolio', desc: '艺术/建筑/设计类专业必备，工程类部分项目可附上', required: false },
      { name: 'GRE/GMAT成绩单', desc: '部分顶尖院校（如TUM机械、曼海姆商科）要求或强烈建议', required: false },
    ]},
  ],
  visa: [
    { section: '🪪 基本证件', items: [
      { name: '护照原件（有效期6个月以上）', desc: '', required: true },
      { name: '签证申请表（使馆官网下载填写）', desc: '', required: true },
      { name: '白底彩色照片 35×45mm 两张', desc: '', required: true },
    ]},
    { section: '💰 财力证明', items: [
      { name: '封存账户证明 Sperrkonto', desc: '须存入约€11,208（2024年标准），推荐Fintiba在线开户（约1周完成）', required: true },
      { name: '父母资产/收入证明（补充）', desc: '银行流水、工资证明、资产证明，6个月以上', required: false },
    ]},
    { section: '📄 录取及保险', items: [
      { name: '德国大学正式录取通知书', desc: '', required: true },
      { name: '海外医疗保险证明（至少3个月）', desc: '德国法定医保证明或私人医疗保险，需覆盖德国境内', required: true },
      { name: '住宿证明（宿舍合同/房屋预订）', desc: '证明抵德后有住所', required: false },
    ]},
  ],
};

// ─── APS面谈题库 ────────────────────────────────────────────────
const APS_QUESTIONS: Record<string, { text: string; type: string; hint: string }[]> = {
  '机械工程': [
    { text: '请解释牛顿第二定律，并给出一个工程应用实例。', type: '工程物理', hint: 'F=ma。应用举例：汽车制动距离 = v²/(2μg)，或起重机的载荷计算。' },
    { text: '什么是材料的弹性模量（Elastizitätsmodul）？它在结构设计中有何意义？', type: '材料力学', hint: 'E=σ/ε，描述材料抵抗弹性变形的刚度。E越大材料越硬，用于选材和截面设计。' },
    { text: '解释热力学第一定律和第二定律的工程含义。', type: '热力学', hint: '第一定律：能量守恒（ΔU=Q-W）；第二定律：熵增，热不能自发从低温流向高温，决定了热机效率上限。' },
    { text: '什么是悬臂梁？请推导均布载荷下悬臂梁端部的最大挠度公式。', type: '结构力学', hint: 'f_max = qL⁴/(8EI)，其中q是均布载荷，L是梁长，E是弹性模量，I是截面惯性矩。' },
    { text: '你为什么选择来德国学习机械工程？德国机械领域哪些方面最吸引你？', type: '面谈动机', hint: '结合德国工业优势（汽车/精密制造）、TU9院校实力、个人职业规划，体现对德国工程文化的了解。' },
  ],
  '计算机': [
    { text: '什么是时间复杂度和空间复杂度？请分析冒泡排序和归并排序的时间复杂度。', type: '算法分析', hint: '冒泡：O(n²)；归并：O(n log n)，但需要O(n)额外空间。Big-O记法表示最坏情况。' },
    { text: '请解释面向对象编程的三大核心特性：封装、继承、多态。', type: '程序设计', hint: '封装=隐藏实现细节；继承=代码复用层次关系；多态=同一接口不同实现（重载/重写）。' },
    { text: '什么是哈希表？如何解决哈希冲突？', type: '数据结构', hint: '哈希表通过哈希函数将key映射到数组下标。冲突解决：链表法（chaining）或开放地址法（linear probing）。' },
    { text: '请解释TCP三次握手过程，为什么需要三次而不是两次？', type: '计算机网络', hint: '三次握手确保双方都能收发数据。两次无法确认客户端能收到服务器的消息，存在历史连接问题。' },
    { text: '你最感兴趣的CS研究方向是什么？在德国，你希望从事哪个方向的学习和研究？', type: '面谈动机', hint: '选择一个具体方向（AI/信息安全/分布式系统等），结合德国该领域的优势实验室或公司谈。' },
  ],
  '经济学': [
    { text: '请解释需求弹性的概念，并举例说明弹性商品和非弹性商品。', type: '微观经济', hint: '弹性=需求量变化%/价格变化%。|Ed|>1为弹性（奢侈品）；|Ed|<1为非弹性（食盐、汽油）。' },
    { text: 'GDP是什么？它有哪些局限性，无法反映什么？', type: '宏观经济', hint: 'GDP=国内生产总值。局限：不反映收入分配（基尼系数）、环境成本、地下经济、非市场活动和幸福感。' },
    { text: '什么是机会成本？请用一个日常生活例子解释。', type: '基础概念', hint: '机会成本=选择某方案时放弃的最优替代方案的价值。例：上大学的机会成本是你本可以工作的薪资。' },
    { text: '凯恩斯经济学和货币主义的主要区别是什么？', type: '经济理论', hint: '凯恩斯：政府干预、财政政策调节总需求。货币主义（弗里德曼）：控制货币供应量，反对干预，相信市场自我调节。' },
    { text: '你为什么选择在德国学习经济学？德国经济的哪些特点最让你感兴趣？', type: '面谈动机', hint: '提及德国作为欧盟最大经济体的地位、社会市场经济模式（Soziale Marktwirtschaft）、法兰克福金融中心等。' },
  ],
  '商科': [
    { text: '什么是SWOT分析？请以德国一家知名企业为例进行分析。', type: '管理分析', hint: 'SWOT=Strengths/Weaknesses/Opportunities/Threats。例：以大众汽车为例，谈电动化转型机遇与威胁。' },
    { text: '请解释供应链管理的核心概念，以及COVID-19对全球供应链的影响。', type: '供应链', hint: '供应链包含采购/生产/物流/销售。COVID冲击：芯片荒、港口拥堵、Just-in-Time模式缺陷暴露。' },
    { text: '什么是净现值（NPV）？如何用NPV评估一个投资项目？', type: '财务分析', hint: 'NPV=各期现金流的折现值之和减去初始投资。NPV>0项目可行，折现率通常用加权平均资本成本（WACC）。' },
    { text: '市场营销的4P理论是什么？举例说明如何应用。', type: '市场营销', hint: '4P=Product/Price/Place/Promotion。举例：苹果iPhone的4P分析——高端产品定位/高价策略/官方渠道/品牌营销。' },
    { text: '你为什么选择德国学习商科？毕业后有什么职业规划？', type: '面谈动机', hint: '结合德国商科强校（曼海姆/法兰克福商学院）、欧洲商业环境优势、个人对跨国公司或咨询行业的兴趣。' },
  ],
};

// ─── 材料清单组件 ─────────────────────────────────────────────────
const Checklist: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'aps' | 'uni' | 'visa'>('aps');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  const allItems = MATERIALS[activeTab].flatMap(s => s.items);
  const doneCount = allItems.filter((_, i) => checked[`${activeTab}-${i}`]).length;
  const pct = allItems.length ? Math.round((doneCount / allItems.length) * 100) : 0;

  const tabs = [
    { key: 'aps', label: '🏛 APS认证' },
    { key: 'uni', label: '🎓 大学申请' },
    { key: 'visa', label: '✈️ 签证办理' },
  ] as const;

  let itemIdx = 0;

  return (
    <div>
      <div className="flex gap-3 mb-6 flex-wrap">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeTab === t.key ? 'bg-jicai-blue text-white' : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-5">
        <div className="flex justify-between text-sm mb-2 text-gray-300 font-semibold">
          <span>材料完成度</span><span>{doneCount} / {allItems.length} 项</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div animate={{ width: `${pct}%` }} className="h-full bg-gradient-to-r from-jicai-blue to-green-400 rounded-full" />
        </div>
      </div>

      {MATERIALS[activeTab].map(section => (
        <div key={section.section} className="mb-6">
          <h4 className="text-sm font-bold text-gray-400 mb-3 pb-2 border-b border-white/10">{section.section}</h4>
          {section.items.map(item => {
            const key = `${activeTab}-${itemIdx}`;
            const cur = itemIdx++;
            const isChecked = !!checked[`${activeTab}-${cur}`];
            return (
              <div key={item.name} onClick={() => toggle(`${activeTab}-${cur}`)}
                className="flex items-start gap-3 p-3 rounded-xl mb-2 cursor-pointer hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                <div className={`mt-0.5 flex-shrink-0 transition-colors ${isChecked ? 'text-green-400' : 'text-gray-600'}`}>
                  {isChecked ? <CheckSquare size={18} /> : <Square size={18} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-sm font-semibold ${isChecked ? 'text-gray-400 line-through' : 'text-white'}`}>{item.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${item.required ? 'bg-red-900/40 text-red-400 border border-red-500/30' : 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/30'}`}>
                      {item.required ? '必须' : '建议'}
                    </span>
                  </div>
                  {item.desc && <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// ─── APS面谈模拟组件 ─────────────────────────────────────────────
const APSSimulator: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [phase, setPhase] = useState<'setup' | 'interview' | 'summary'>('setup');
  const [qIdx, setQIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ score: number; comment: string; hint: string } | null>(null);
  const [scores, setScores] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const subjects = [
    { key: '机械工程', icon: '⚙️' }, { key: '计算机', icon: '💻' },
    { key: '经济学', icon: '📊' }, { key: '商科', icon: '📈' },
  ];

  const questions = APS_QUESTIONS[subject] || [];
  const currentQ = questions[qIdx];
  const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  const handleSubmit = async () => {
    if (!answer.trim()) return;
    setLoading(true);
    // 本地评分逻辑（无需API）
    await new Promise(r => setTimeout(r, 1500));
    const words = answer.trim().length;
    const hasKeywords = currentQ.hint.split('、').some(k => answer.includes(k.slice(0, 3)));
    const score = Math.min(95, Math.max(40, words >= 80 ? (hasKeywords ? 82 : 68) : words >= 30 ? 58 : 42));
    setScores(prev => [...prev, score]);
    setFeedback({
      score,
      comment: score >= 80 ? '回答涵盖了核心要点，逻辑清晰。' : score >= 60 ? '回答有一定基础，但可以更系统、更准确。' : '回答较为简短，建议结合公式或具体例子展开论述。',
      hint: currentQ.hint,
    });
    setLoading(false);
  };

  const handleNext = () => {
    if (qIdx < questions.length - 1) { setQIdx(i => i + 1); setAnswer(''); setFeedback(null); }
    else setPhase('summary');
  };

  const reset = () => { setPhase('setup'); setSubject(''); setQIdx(0); setAnswer(''); setFeedback(null); setScores([]); };

  if (phase === 'setup') return (
    <div className="space-y-6">
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 text-sm text-blue-300">
        🎯 APS面谈通常包含：①专业课笔试（约90分钟）②中德文口头面试。本模拟器将还原面试问答环节，帮助你提前熟悉题型和答题思路。
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-3">选择你的申请专业方向</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {subjects.map(s => (
            <button key={s.key} onClick={() => setSubject(s.key)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${subject === s.key ? 'bg-jicai-blue/20 border-jicai-blue text-jicai-blue' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}>
              <span className="text-2xl">{s.icon}</span>
              <span className="text-sm font-bold">{s.key}</span>
            </button>
          ))}
        </div>
      </div>
      <button onClick={() => { if (subject) setPhase('interview'); }} disabled={!subject}
        className="w-full py-4 bg-jicai-blue hover:bg-blue-600 disabled:opacity-40 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
        🎤 开始模拟面谈（{questions.length}题）
      </button>
    </div>
  );

  if (phase === 'interview' && currentQ) return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">第 {qIdx + 1} / {questions.length} 题</span>
        <span className="text-sm font-bold text-jicai-blue">累计均分：{avg || '—'}</span>
      </div>

      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/30 border border-blue-500/30 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs px-2 py-0.5 bg-jicai-blue/30 border border-jicai-blue/40 text-blue-300 rounded-full">{currentQ.type}</span>
        </div>
        <p className="text-white font-semibold text-base leading-relaxed">{currentQ.text}</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">你的回答</label>
        <textarea value={answer} onChange={e => setAnswer(e.target.value)} rows={5}
          placeholder="请在此输入你的回答，尽量展示你的专业知识和逻辑思维..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-jicai-blue transition-colors resize-none" />
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-green-900/20 border border-green-500/30 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-green-300">AI 点评</span>
              <span className={`text-lg font-bold ${feedback.score >= 80 ? 'text-green-400' : feedback.score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                {feedback.score}分 · {feedback.score >= 80 ? '优秀' : feedback.score >= 60 ? '良好' : '需提升'}
              </span>
            </div>
            <p className="text-sm text-gray-300">{feedback.comment}</p>
            <div className="bg-jicai-black/40 rounded-lg p-3">
              <span className="text-xs text-yellow-400 font-bold">📌 核心要点参考：</span>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">{feedback.hint}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-3">
        {!feedback ? (
          <button onClick={handleSubmit} disabled={loading || !answer.trim()}
            className="flex-1 py-3 bg-jicai-blue hover:bg-blue-600 disabled:opacity-40 text-white font-bold rounded-xl transition-all">
            {loading ? '评分中...' : '提交回答'}
          </button>
        ) : (
          <button onClick={handleNext} className="flex-1 py-3 bg-jicai-blue hover:bg-blue-600 text-white font-bold rounded-xl transition-all">
            {qIdx < questions.length - 1 ? '下一题 →' : '查看总结报告'}
          </button>
        )}
        <button onClick={reset} className="px-4 py-3 border border-white/10 text-gray-400 hover:text-white rounded-xl transition-all">
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );

  if (phase === 'summary') return (
    <div className="text-center space-y-6">
      <div>
        <div className={`text-5xl font-bold mb-2 ${avg >= 80 ? 'text-green-400' : avg >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>{avg}分</div>
        <div className="text-gray-400 text-sm">{avg >= 80 ? '🎉 非常出色！APS准备状态良好' : avg >= 65 ? '👍 基础不错，继续加强专业知识' : '📚 建议重点复习核心课程，多做练习'}</div>
      </div>
      <div className="space-y-2">
        {scores.map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-xs text-gray-400 w-12">第{i + 1}题</span>
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <div style={{ width: `${s}%` }} className={`h-full rounded-full ${s >= 80 ? 'bg-green-500' : s >= 60 ? 'bg-jicai-blue' : 'bg-orange-500'}`} />
            </div>
            <span className={`text-xs font-bold w-10 text-right ${s >= 80 ? 'text-green-400' : s >= 60 ? 'text-blue-400' : 'text-orange-400'}`}>{s}</span>
          </div>
        ))}
      </div>
      <button onClick={reset} className="px-8 py-3 bg-jicai-blue hover:bg-blue-600 text-white font-bold rounded-xl transition-all">
        🔄 重新练习
      </button>
    </div>
  );

  return null;
};

// ─── 主组件 ──────────────────────────────────────────────────────
export const SimulatorSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'materials' | 'aps' | 'visa'>('timeline');
  const [openNode, setOpenNode] = useState<number | null>(null);

  const tabs = [
    { key: 'timeline', label: '📅 申请时间轴' },
    { key: 'materials', label: '📋 材料清单' },
    { key: 'aps', label: '🎯 APS面谈模拟' },
    { key: 'visa', label: '✈️ 签证流程' },
  ] as const;

  return (
    <section id="simulator" className="py-20 bg-jicai-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 right-20 w-80 h-80 bg-jicai-blue rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-60 h-60 bg-purple-600 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">德国留学全流程模拟</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">从零到录取，每一步需要做什么、准备什么材料，全程还原真实申请流程</p>
        </div>

        {/* Tab 导航 */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 ${activeTab === t.key ? 'bg-jicai-blue text-white shadow-lg' : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'}`}>
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="bg-jicai-dark/80 backdrop-blur border border-white/10 rounded-2xl p-6 md:p-8">

            {/* 时间轴 */}
            {activeTab === 'timeline' && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex gap-3 text-xs">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> 关键节点</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-jicai-blue inline-block" /> 常规阶段</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> 完成</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {WINTER_TIMELINE.map((node, i) => (
                    <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
                      <button onClick={() => setOpenNode(openNode === i ? null : i)}
                        className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors text-left">
                        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${node.badge === 'red' ? 'bg-red-500' : node.badge === 'green' ? 'bg-green-500' : node.badge === 'orange' ? 'bg-orange-400' : 'bg-jicai-blue'}`} />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-xs text-gray-500 font-mono">{node.month}</span>
                            <span className="text-sm font-bold text-white">{node.task}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              node.badge === 'red' ? 'bg-red-900/40 text-red-400 border border-red-500/30' :
                              node.badge === 'green' ? 'bg-green-900/40 text-green-400 border border-green-500/30' :
                              node.badge === 'orange' ? 'bg-orange-900/40 text-orange-400 border border-orange-500/30' :
                              'bg-blue-900/40 text-blue-400 border border-blue-500/30'}`}>{node.badgeText}</span>
                          </div>
                        </div>
                        {openNode === i ? <ChevronDown size={16} className="text-gray-400 flex-shrink-0" /> : <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />}
                      </button>
                      <AnimatePresence>
                        {openNode === i && (
                          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                            <div className="px-5 pb-5 border-t border-white/10 pt-4">
                              <p className="text-sm text-gray-300 mb-3 leading-relaxed">{node.desc}</p>
                              <ul className="space-y-2 mb-4">
                                {node.items.map((item, j) => (
                                  <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                                    <span className="text-jicai-blue mt-0.5 flex-shrink-0">›</span>{item}
                                  </li>
                                ))}
                              </ul>
                              <div className="bg-jicai-blue/10 border border-jicai-blue/20 rounded-lg p-3 text-xs text-blue-300">{node.tip}</div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 材料清单 */}
            {activeTab === 'materials' && <Checklist />}

            {/* APS模拟 */}
            {activeTab === 'aps' && <APSSimulator />}

            {/* 签证流程 */}
            {activeTab === 'visa' && (
              <div className="space-y-4">
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4 text-sm text-yellow-300">
                  ⚠️ 收到大学正式录取通知书后才能申请签证，建议至少提前 <strong>3-4个月</strong> 预约（等待时间很长！）
                </div>
                {[
                  { num: 1, title: '开设封存账户 Sperrkonto', amount: '€11,208/年', desc: '这是德国法定最低生活费标准。推荐使用Fintiba（在线开户，约1周）或Deutsche Bank。账户会每月自动释放约€934供生活使用。' },
                  { num: 2, title: '使馆官网预约面签时间', desc: '访问德国驻华大使馆/领事馆官网预约，北京/上海/广州/成都均有。等待时间可能长达2-4个月，务必尽早！' },
                  { num: 3, title: '准备签证材料', desc: '见材料清单→签证材料。所有材料需准备原件+复印件。外语文件需要中文翻译件。' },
                  { num: 4, title: '使馆面签（约15-30分钟）', desc: '签证官会询问：就读专业、学校情况、学习计划、财力保障。用中文或英语回答均可，保持自信诚实。' },
                  { num: 5, title: '等待签证结果（约4-8周）', desc: '批准后护照快递返回。拿到签证后即可订机票、确认宿舍，开始行前准备。' },
                  { num: 6, title: '抵德后：Anmeldung住址登记', desc: '入住后14天内携带护照+Wohnungsgeberbestätigung（房东住址确认书）到当地Bürgeramt（市政厅）登记。这是在德所有后续手续的基础！' },
                ].map(step => (
                  <div key={step.num} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="w-8 h-8 bg-jicai-blue rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{step.num}</div>
                    <div>
                      <div className="font-bold text-white text-sm mb-1">{step.title}</div>
                      {step.amount && <div className="text-jicai-blue font-bold text-lg mb-1">{step.amount}</div>}
                      <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
