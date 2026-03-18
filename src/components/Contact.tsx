import React from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <footer id="contact" className="bg-jicai-black pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-jicai-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">J</span>
              </div>
              <span className="text-white font-bold text-xl tracking-wider">济才德国留学</span>
            </div>
            <p className="text-gray-400 mb-8 max-w-md">
              专注于德国高端留学申请，为您提供最专业的留学规划、文书指导及签证服务。
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-jicai-blue">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Email</p>
                  <p>yujin@landwave.cn</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-jicai-blue">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Location</p>
                  <p>Shanghai, China</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end">
             <div className="bg-white p-4 rounded-xl max-w-[200px]">
                <img 
                  src="qrcode.png" 
                  alt="WeChat QR Code" 
                  className="w-full h-full"
                  referrerPolicy="no-referrer"
                />
             </div>
             <p className="text-gray-400 mt-4 text-sm">扫码添加顾问微信: <span className="text-white font-bold">jicaixiaokefu</span></p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} 济才德国留学. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
