
import React, { useState } from 'react';
import Header from './components/Header';
import StarterOutput from './components/StarterOutput';
import { PREDEFINED_PATHS } from './services/staticData';
import { LearningPath } from './types';

const App: React.FC = () => {
  const [result, setResult] = useState<LearningPath | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleSelect = (topic: string) => {
    setSelectedTopic(topic);
    setResult(PREDEFINED_PATHS[topic]);
    // Scroll to results if they are visible
    setTimeout(() => {
      document.getElementById('starter-content')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const topics = Object.keys(PREDEFINED_PATHS);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-4">
            Pick your path.
          </h2>
          <p className="text-slate-500 text-lg sm:text-xl max-w-2xl mx-auto">
            No searching, no prompt engineering. Select a skill and get the exact project you need to start.
          </p>
        </div>

        {/* Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => handleSelect(topic)}
              className={`p-6 rounded-3xl text-left transition-all border-2 flex flex-col items-center justify-center gap-4 group ${
                selectedTopic === topic 
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl scale-105' 
                : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-400 hover:shadow-lg'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-colors ${
                selectedTopic === topic ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600'
              }`}>
                {topic === "React & Tailwind" && <i className="fab fa-react"></i>}
                {topic === "Machine Learning" && <i className="fas fa-brain"></i>}
                {topic === "Rust System Dev" && <i className="fas fa-gear"></i>}
                {topic === "C# Game Design" && <i className="fas fa-gamepad"></i>}
                {topic === "Data Science" && <i className="fas fa-chart-bar"></i>}
              </div>
              <span className="font-bold text-center leading-tight">{topic}</span>
            </button>
          ))}
        </div>

        {/* Result Content */}
        <div id="starter-content">
          {result && <StarterOutput path={result} />}
        </div>
        
        {!result && (
            <div className="flex flex-col items-center justify-center py-20 opacity-20 select-none">
                <i className="fas fa-bolt text-8xl text-slate-300 mb-6"></i>
                <p className="text-2xl font-bold text-slate-400">Select a skill to begin</p>
            </div>
        )}
      </main>

      <footer className="py-8 border-t border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center text-slate-400 text-sm">
          Built for builders. Zero fluff. Predefined paths.
        </div>
      </footer>
    </div>
  );
};

export default App;
