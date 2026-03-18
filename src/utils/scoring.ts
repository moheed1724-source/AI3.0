export interface AssessmentResult {
  score: number;
  grade: string;
  tagline: string;
  radarScores: { academic: number; language: number; match: number; aps: number; experience: number };
  dimensions: { academic: string; language: string; strategy: string; aps: string };
  predictions: { name: string; probability: number; type: 'reach' | 'match' | 'safety'; ncScore?: string; warningMsg?: string }[];
  strengths: { title: string; desc: string }[];
  weaknesses: { title: string; desc: string }[];
  cityRec: { name: string; cost: string; reason: string };
  actionPlan: { title: string; desc: string; deadline: string }[];
  apsPrediction: { rate: string; pct: string; advice: string };
  suggestion: string;
}

export interface UserInput {
  degree: 'bachelor' | 'master';
  // master fields
  gpa: number;
  background: string;
  major: string;
  hasTest: 'yes' | 'no';
  // bachelor (high school) fields
  highSchoolType?: string;
  highSchoolScore?: string;
  hsGaokaoPct?: number;      // 高考成绩百分比
  hsMathScore?: number;
  hsGermanScore?: number;
  hsEnglishScore?: number;
  // shared
  language: string;
  certScore?: string;
  experience?: string[];
  targetCities?: string[];
  budget?: string;
}

import universitiesData from '../data/universities.json';

// 德国修正巴伐利亚公式
export const toBavarianGPA = (score100: number): number => {
  const nota = 1 + 3 * (100 - score100) / (100 - 50);
  return parseFloat(Math.max(1.0, Math.min(4.0, nota)).toFixed(1));
};

export const gradeLabel = (nota: number): string => {
  if (nota <= 1.5) return 'Sehr Gut (优秀)';
  if (nota <= 2.5) return 'Gut (良好)';
  if (nota <= 3.5) return 'Befriedigend (合格)';
  return 'Ausreichend (及格边缘)';
};

export const calculateScore = (input: UserInput): AssessmentResult => {
  let score = 75;
  let bavarianGPA = 2.5;
  let academicScore = 65, languageScore = 60, matchScore = 75, apsScore = 60, expScore = 55;

  // === 学术评分 ===
  if (input.degree === 'master') {
    bavarianGPA = toBavarianGPA(input.gpa);
    score = Math.round(100 - (bavarianGPA - 1) * 28);
    academicScore = score;
    if (input.background === '985') { score += 12; academicScore += 18; }
    else if (input.background === '211') { score += 7; academicScore += 10; }
    else if (input.background === 'tier2') { score -= 8; academicScore -= 10; }
    // 有标化考试加分
    if (input.hasTest === 'yes') { score += 5; expScore += 15; }
  } else {
    // bachelor: 高中申请
    if (input.highSchoolScore === 'excellent') { bavarianGPA = 1.3; score = 90; academicScore = 92; }
    else if (input.highSchoolScore === 'good') { bavarianGPA = 2.0; score = 78; academicScore = 78; }
    else if (input.highSchoolScore === 'average') { bavarianGPA = 2.8; score = 65; academicScore = 63; }
    else { bavarianGPA = 3.5; score = 52; academicScore = 50; }

    if (input.highSchoolType === 'IB') { score += 8; academicScore += 12; bavarianGPA = Math.max(1.0, bavarianGPA - 0.3); }
    else if (input.highSchoolType === 'AL') { score += 6; academicScore += 8; }

    // 高考换算
    if (input.hsGaokaoPct && input.hsGaokaoPct > 0) {
      const gaokaoBav = toBavarianGPA(input.hsGaokaoPct);
      bavarianGPA = gaokaoBav;
      score = Math.round(100 - (gaokaoBav - 1) * 28);
      academicScore = score;
    }
  }

  // === 语言评分 ===
  const langMap: Record<string, number> = {
    german_c1: 95, german_b2: 70, german_b1: 45,
    ielts_7: 88, 'ielts_6.5': 72, other: 20,
  };
  languageScore = langMap[input.language] ?? 50;
  if (['german_c1', 'ielts_7'].includes(input.language)) score += 10;
  else if (input.language === 'other') score -= 15;

  // === APS预测 ===
  let apsRate = '中等', apsPct = '55-70%', apsAdvice = '';
  if (input.degree === 'master') {
    if (input.gpa >= 85 && input.background !== 'tier2') { apsRate = '高'; apsPct = '75-90%'; apsScore = 85; }
    else if (input.gpa >= 75) { apsRate = '中等'; apsPct = '55-70%'; apsScore = 65; }
    else { apsRate = '中低'; apsPct = '35-55%'; apsScore = 45; }
    apsAdvice = `重点复习${input.major.includes('机械') || input.major.includes('电气') ? '高等数学、物理和专业核心课' : input.major.includes('计算机') ? '数据结构、算法和数学' : input.major.includes('商') || input.major.includes('经济') ? '微积分、线代和经济学原理' : '核心专业课'}，准备中德双语面试。`;
  } else {
    apsScore = input.highSchoolScore === 'excellent' ? 82 : input.highSchoolScore === 'good' ? 68 : 50;
    apsRate = apsScore >= 75 ? '高' : apsScore >= 60 ? '中等' : '中低';
    apsPct = apsScore >= 75 ? '70-85%' : apsScore >= 60 ? '50-70%' : '35-50%';
    apsAdvice = '重点复习高中数学、理化（理科生）或语言文学（文科生），准备德语或英语基础对话面试。';
  }

  // === 优势和不足 ===
  const strengths: { title: string; desc: string }[] = [];
  const weaknesses: { title: string; desc: string }[] = [];

  if (input.degree === 'master') {
    if (input.gpa >= 85) strengths.push({ title: '高GPA竞争力强', desc: `均分${input.gpa}分，换算德国GPA约${bavarianGPA}，符合大多数Top院校要求。` });
    if (input.background === '985' || input.background === '211') strengths.push({ title: '名校背景加分', desc: '985/211院校背景在德国大学初审阶段具有较高认可度，可弥补部分材料不足。' });
    if (['german_c1', 'ielts_7'].includes(input.language)) strengths.push({ title: '语言达标无忧', desc: '语言成绩已达到德国顶尖院校要求，初审不会因语言被刷。' });
    if (input.gpa < 75) weaknesses.push({ title: 'GPA偏低是主要障碍', desc: `均分${input.gpa}分，换算德国GPA${bavarianGPA}，部分热门专业最低要求2.5，建议冲刺语言或标化提分。` });
    if (input.language === 'other' || input.language === 'german_b1') weaknesses.push({ title: '语言是最紧迫短板', desc: '缺乏有效语言成绩将导致申请直接被初审拒绝，需立即开始密集备考。' });
    if (input.hasTest === 'no' && (input.major === '商科' || input.major === '经济学')) weaknesses.push({ title: '商科缺少GMAT成绩', desc: '曼海姆、LMU等顶尖商科院校强烈建议GMAT成绩，缺少将大幅降低录取概率。' });
  } else {
    if (input.highSchoolScore === 'excellent') strengths.push({ title: '成绩拔尖直入本科', desc: '可直接申请德国本科无需预科，竞争最顶尖院校如TU9成员。' });
    if (input.highSchoolType === 'IB' || input.highSchoolType === 'AL') strengths.push({ title: '国际课程体系认可度高', desc: 'IB/A-Level课程在德国获得高度认可，申请更灵活。' });
    if (input.highSchoolScore === 'low') weaknesses.push({ title: '可能需要预科过渡', desc: '建议先读德国大学预科（Studienkolleg），约1年后再申请本科正式课程。' });
  }

  if (strengths.length < 2) strengths.push({ title: '目标明确效率高', desc: '清晰的留学方向有助于集中资源备考，避免浪费时间在不匹配的院校。' });
  if (weaknesses.length < 2) weaknesses.push({ title: '软性材料需提前规划', desc: '动机信、推荐信等软性材料是差距化竞争的关键，建议提前3-6个月开始准备。' });

  // === 择校推荐 ===
  let relevantUnis = (universitiesData as any[]).filter((u: any) => u.majors.includes(input.major));
  if (!relevantUnis.length) relevantUnis = (universitiesData as any[]).slice(0, 8);

  const predictions = relevantUnis.map((uni: any) => {
    let prob = 50;
    prob += (2.5 - bavarianGPA) * 22;
    if (uni.tier === 'S') prob -= 15;
    else if (uni.tier === 'B') prob += 12;
    if (uni.minLang === 'german_c1' && !['german_c1', 'ielts_7'].includes(input.language)) prob -= 28;
    if (input.language === 'other') prob -= 40;
    if (input.degree === 'master' && (input.background === '985' || input.background === '211')) prob += 12;
    let warningMsg = '';
    if (uni.name.includes('慕尼黑工业') && input.major === '机械工程' && input.hasTest === 'no') { prob -= 40; warningMsg = '⚠️ TUM机械强烈建议GRE，缺少将降低40%录取率'; }
    if (uni.name.includes('曼海姆') && (input.major === '商科' || input.major === '经济学') && input.hasTest === 'no') { prob -= 40; warningMsg = '⚠️ 曼海姆商科几乎必须GMAT，建议尽快备考'; }
    prob = Math.max(5, Math.min(96, Math.round(prob)));
    const type: 'reach' | 'match' | 'safety' = prob < 42 ? 'reach' : prob < 73 ? 'match' : 'safety';
    return { name: uni.name, probability: prob, type, ncScore: uni.ncScore, warningMsg };
  }).sort((a: any, b: any) => b.probability - a.probability).slice(0, 6);

  // === 城市推荐 ===
  const cityMap: Record<string, { name: string; cost: string; reason: string }> = {
    '机械工程': { name: '慕尼黑', cost: '€1050-1400/月', reason: 'TUM等顶尖工科院校云集，宝马/MAN等大型雇主在此，就业优势极强' },
    '计算机': { name: '柏林', cost: '€750-1050/月', reason: '欧洲最大科技创业生态，SAP/Zalando等IT公司密集，生活成本相对低' },
    '商科': { name: '曼海姆', cost: '€800-1100/月', reason: '曼海姆大学商科德国第一，小城市生活成本低，就业专注度高' },
    '经济学': { name: '法兰克福', cost: '€950-1300/月', reason: '欧洲金融中心，欧央行/德意志银行总部所在，经济类专业就业首选' },
    '电气工程': { name: '斯图加特', cost: '€850-1150/月', reason: '博世/戴姆勒等电气电子巨头总部，工程类就业机会最集中' },
  };
  const cityRec = cityMap[input.major] || { name: '柏林', cost: '€750-1050/月', reason: '德国首都，国际化程度最高，留学生社区完善，交通便利' };

  // === 行动计划 ===
  const actionPlan = [
    { title: input.language === 'other' || input.language === 'german_b1' ? '🔴 立即开始德语备考（最紧迫）' : '✅ 提升语言至C1冲刺', desc: input.language === 'other' ? '德语零基础需从A1开始，建议报名歌德学院（Goethe Institut）课程，目标B2需约12-18个月' : '持续备考TestDaF/DSH，目标4×4/DSH-2以达到顶尖院校要求', deadline: '立即开始' },
    { title: 'APS材料准备与申请', desc: '访问aps.org.cn了解材料清单，收集成绩单（加盖公章）、在读证明、护照等材料，缴纳约¥1500考试费', deadline: '3个月内' },
    { title: '确定学校梯队名单', desc: `根据你的GPA(${input.degree === 'master' ? input.gpa : '评测成绩'})和语言水平，冲刺1-2所、主申2-3所、保底2所，共5-7所`, deadline: '4个月内' },
    { title: '撰写动机信+联系推荐人', desc: '每所学校需要个性化动机信（1-2页），推荐信至少提前6周请求导师撰写，翻译成绩单（德语公证版）', deadline: '6个月内' },
  ];

  // === 多维文字分析 ===
  const academicFeedback = input.degree === 'master'
    ? `你的均分${input.gpa}分，换算德国GPA约${bavarianGPA}（${gradeLabel(bavarianGPA)}）。${input.background === '985' ? '985院校背景在德国具有高认可度，可适当豁免部分课程要求。' : input.background === '211' ? '211背景认可度良好，配合优质课程描述（Modulhandbuch）可提升竞争力。' : '双非背景建议着重优化动机信和课程描述，通过软性材料弥补院校背景差距。'}`
    : `高中成绩${input.highSchoolScore === 'excellent' ? '拔尖' : input.highSchoolScore === 'good' ? '良好' : '中等'}，${input.highSchoolType === 'gaokao' ? '高考路线需确认APS认可度与Abitur等效认证。' : 'IB/A-Level等国际课程在德国认可度高，申请更灵活。'}`;

  const languageFeedback = input.language === 'german_c1' ? '语言能力已达最高标准（TestDaF 4×4/DSH-2），可冲刺所有顶尖院校，申请竞争力极强。'
    : input.language === 'german_b2' ? 'B2水平距离DSH目标仍有差距，大多数顶尖院校要求C1，建议6个月内完成提升。'
    : input.language === 'other' ? '⚠️ 严重警告：语言成绩缺失将导致所有申请被初审直接拒绝，这是你当前最紧迫的任务。'
    : '语言成绩基本达标，但部分顶尖院校要求更高，建议持续冲刺提升至C1水平。';

  const strategyFeedback = `推荐"冲刺+核心+保底"三档梯度策略。你的综合评分${Math.min(99, score)}分，在全德50所目标院校中，最匹配${predictions.filter((p: any) => p.type === 'match').length}所核心院校。重点关注${input.major}方向${cityRec.name}的院校集群，就业衔接最强。`;

  score = Math.min(99, Math.max(30, score));
  const grade = score >= 88 ? 'A+' : score >= 78 ? 'A' : score >= 68 ? 'B+' : score >= 58 ? 'B' : 'C';
  const tagline = `${input.major}方向 · ${input.background === '985' ? '名校精英型' : input.background === '211' ? '重点院校型' : input.degree === 'bachelor' ? '本科直申型' : '提升潜力型'} · ${cityRec.name}推荐`;

  return {
    score, grade, tagline,
    radarScores: { academic: Math.min(99, academicScore), language: languageScore, match: matchScore, aps: apsScore, experience: expScore },
    dimensions: { academic: academicFeedback, language: languageFeedback, strategy: strategyFeedback, aps: apsAdvice },
    predictions,
    strengths, weaknesses,
    cityRec,
    actionPlan,
    apsPrediction: { rate: apsRate, pct: apsPct, advice: apsAdvice },
    suggestion: `综合评分${score}分（${grade}级），${grade.includes('A') ? '具备冲击TU9名校的实力' : grade === 'B+' ? '适合申请A/B级院校，需针对性提升' : '需重点补强语言或学术短板'}`,
  };
};
