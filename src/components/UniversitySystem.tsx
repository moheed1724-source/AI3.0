import React, { useRef, useState, useEffect } from 'react';

const universities = [
  // 慕尼黑工大继续使用你本地的 tum.jpg
 { name: "慕尼黑工业大学", en: "TU Munich", desc: "德国顶尖理工大学，诺贝尔奖得主摇篮。", image: "TU Munich.jpg", link: "https://zh.wikipedia.org/zh-cn/慕尼黑工业大学" },
  { name: "亚琛工业大学", en: "RWTH Aachen", desc: "欧洲顶尖理工大学，机械工程专业世界闻名。", image: "RWTH Aachen.jpg", link: "https://zh.wikipedia.org/zh-cn/亚琛工业大学" },
  { name: "海德堡大学", en: "Heidelberg University", desc: "德国最古老的大学，医学与生命科学领域的权威。", image: "Heidelberg University.jpg", link: "https://zh.wikipedia.org/zh-cn/海德堡大学" },
  { name: "柏林工业大学", en: "TU Berlin", desc: "德国最大的工业大学之一，坐落于首都柏林。", image: "TU Berlin.jpg", link: "https://zh.wikipedia.org/zh-cn/柏林工业大学" },
  { name: "卡尔斯鲁厄理工学院", en: "KIT", desc: "德国的MIT，计算机与工程的顶级殿堂。", image: "KIT.jpg", link: "https://zh.wikipedia.org/zh-cn/卡尔斯鲁厄理工学院" },
  { name: "慕尼黑大学", en: "LMU Munich", desc: "精英大学联盟成员，商科与文科全德顶尖。", image: "LMU Munich.jpg", link: "https://zh.wikipedia.org/zh-cn/慕尼黑大学" },
  { name: "斯图加特大学", en: "University of Stuttgart", desc: "位于德国汽车工业中心，汽车与航空工程顶尖。", image: "University of Stuttgart.jpg", link: "https://zh.wikipedia.org/zh-cn/斯图加特大学" },
  { name: "达姆施塔特工业大学", en: "TU Darmstadt", desc: "TU9成员，计算机与人工智能领域领先。", image: "TU Darmstadt.jpg", link: "https://zh.wikipedia.org/zh-cn/达姆施塔特工业大学" },
  { name: "汉诺威大学", en: "Leibniz University", desc: "以莱布尼茨命名，机械与电气工程实力雄厚。", image: "Leibniz University.jpg", link: "https://zh.wikipedia.org/zh-cn/汉诺威大学" },
  { name: "科隆大学", en: "University of Cologne", desc: "德国第二大大学，经济系规模全德第一。", image: "University of Cologne.jpg", link: "https://zh.wikipedia.org/zh-cn/科隆大学" }
];

const duplicatedUniversities = [...universities, ...universities];

export const UniversitySystem: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const basePath = import.meta.env.BASE_URL;
  
  const [isDown, setIsDown] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    let animationId: number;
    const scroll = () => {
      if (scrollRef.current && !isDown && !isHovered) {
        scrollRef.current.scrollLeft += 1; 
        const { scrollLeft, scrollWidth } = scrollRef.current;
        if (scrollLeft >= scrollWidth / 2) {
          scrollRef.current.scrollLeft = scrollLeft - (scrollWidth / 2);
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isDown, isHovered]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth } = scrollRef.current;
    if (scrollLeft >= scrollWidth / 2) {
      scrollRef.current.scrollLeft = scrollLeft - (scrollWidth / 2);
    } else if (scrollLeft <= 0) {
      scrollRef.current.scrollLeft = scrollWidth / 2;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    setIsDragging(false); 
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => { setIsDown(false); setIsHovered(false); };
  const handleMouseUp = () => setIsDown(false);
  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    scrollRef.current.scrollLeft = scrollLeft - walk;
    if (Math.abs(walk) > 5) setIsDragging(true); 
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) e.preventDefault(); 
  };

  return (
    <section id="system" className="py-20 bg-jicai-black overflow-hidden relative">
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">德国大学体系</h2>
            <p className="text-gray-400">严谨的学术传统与现代科技的完美结合</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-jicai-blue bg-jicai-blue/10 px-4 py-2 rounded-full">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span>悬停暂停 · 按住可自由拖拽</span>
          </div>
        </div>
      </div>

      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-jicai-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-jicai-black to-transparent z-10 pointer-events-none"></div>

        <div 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onScroll={handleScroll}
          className={`flex gap-6 px-4 md:px-32 overflow-x-auto hide-scrollbar pb-8 pt-4 select-none ${isDown ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
          {duplicatedUniversities.map((uni, index) => (
            <a
              key={index}
              href={uni.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              draggable="false"
              className="w-[280px] md:w-[320px] shrink-0 group relative overflow-hidden rounded-2xl bg-jicai-dark border border-white/5 hover:border-jicai-blue/50 transition-all block shadow-lg hover:shadow-jicai-blue/10 transform hover:-translate-y-2 flex flex-col"
            >
              <div className="h-48 w-full bg-gray-900 overflow-hidden shrink-0">
                <img 
                  // 智能判断：如果是 http 开头直接用网络图，如果是本地图则拼接路径
                  src={uni.image.startsWith('http') ? uni.image : `${basePath}${uni.image}`} 
                  alt={uni.name} 
                  draggable="false"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                  loading="lazy"
                />
              </div>
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-jicai-blue transition-colors">{uni.name}</h3>
                <p className="text-sm text-jicai-blue mb-3">{uni.en}</p>
                <p className="text-gray-400 text-sm line-clamp-2">{uni.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
