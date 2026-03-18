import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingConsultation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 z-40"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="bg-jicai-blue hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-blue-900/40 flex items-center gap-2 transition-all transform hover:scale-105"
        >
          <MessageCircle size={20} />
          <span>留学咨询</span>
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl z-10 text-center"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>

              <h3 className="text-xl font-bold text-jicai-black mb-2">一对一留学咨询</h3>
              <p className="text-gray-600 mb-6 text-sm">扫码添加顾问，获取个性化规划</p>

              <div className="bg-gray-100 p-4 rounded-xl inline-block mb-4">
                <div className="w-40 h-40 bg-white flex items-center justify-center rounded-lg border border-gray-200">
                  <img
                    src="/qrcode.png"
                    alt="WeChat QR Code"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="space-y-1 text-sm text-gray-600">
                <p className="font-bold text-jicai-blue">微信: jicaixiaokefu</p>
                <p className="text-xs text-gray-400">工作时间: 9:00 - 21:00</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
