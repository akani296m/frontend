import React from 'react';
import { Paperclip, ChevronDown, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center h-screen w-full bg-white p-6">
      <h1 className="text-[#00063D] font-bold text-4xl md:text-6xl text-center mb-6">
        Build Your Next Successful Campaign
      </h1>

      <div className="mt-4 bg-[#EDEDED] rounded-2xl shadow-lg p-6 max-w-[700px] w-full relative">
        <div className="flex items-center">
          <span className="text-gray-700 font-mono">Type your idea here</span>
          <span className="ml-1 text-gray-700 font-mono animate-pulse">|</span>
        </div>

        <div className="absolute bottom-4 left-6 flex items-center space-x-4">
          <Paperclip className="text-gray-500" size={20} />
          <ChevronDown className="text-gray-500" size={20} />
        </div>

        <button className="absolute bottom-4 right-6 bg-white p-3 rounded-full shadow-md">
          <ArrowRight className="text-[#00063D]" size={20} />
        </button>
      </div>
    </section>
  );
}
