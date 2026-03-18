import React from 'react';
import { motion } from 'motion/react';
// 🌟 重点在这里：我们用代码把上一层文件夹(../)里的 logo 导进来
import logoImg from '../logo.png'; 

interface NavbarProps {
  scrollToSection: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ scrollToSection }) => {
  const navItems = [
    { id: 'home', label: '首页' },
    { id: 'assessment', label: 'AI评估' },
    { id: 'simulator', label: '申请模拟' },
    { id: 'system', label: '院校体系' },
    { id: 'majors', label: '专业推荐' },
    { id: 'success', label: '成功案例' },
    { id: 'experts', label: '专家团队' },
    { id: 'contact', label: '联系我们' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-jicai-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
         <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
            {/* 这是导入的 Logo 图片 */}
            <img 
              src={logoImg} 
              alt="济才德国留学 Logo" 
              className="h-10 w-auto object-contain"
            />
            {/* 🌟 帮你把文字加回来了！ */}
            <span className="text-white font-bold text-lg tracking-wider">济才德国留学</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-300 hover:text-jicai-blue hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
