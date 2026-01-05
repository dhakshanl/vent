
import React, { useState } from 'react';
import { LearningPath } from '../types';

interface StarterOutputProps {
  path: LearningPath;
}

const StarterOutput: React.FC<StarterOutputProps> = ({ path }) => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    if (path.code) {
      navigator.clipboard.writeText(path.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Starter Activity */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            <i className="fas fa-rocket"></i>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Starter Activity</h2>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          {path.starterActivity}
        </p>
      </section>

      {/* Execution Plan */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <i className="fas fa-list-check"></i>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Step-by-step Plan</h2>
        </div>
        <div className="grid gap-3">
          {path.executionPlan.map((step, idx) => (
            <div key={idx} className="flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-200">
              <span className="flex-shrink-0 w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-500">
                {idx + 1}
              </span>
              <p className="text-slate-700 pt-1">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Code Section */}
      {path.code && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <i className="fas fa-code"></i>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Code</h2>
            </div>
            <button 
              onClick={copyCode}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-sm font-medium"
            >
              <i className={`fas ${copied ? 'fa-check text-green-600' : 'fa-copy'}`}></i>
              {copied ? 'Copied!' : 'Copy Snippet'}
            </button>
          </div>
          <pre className="bg-slate-900 text-slate-100 p-6 rounded-2xl overflow-x-auto font-mono text-sm leading-relaxed border border-slate-800 shadow-xl">
            <code>{path.code}</code>
          </pre>
        </section>
      )}

      {/* How to Run */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <i className="fas fa-terminal"></i>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">How to Run</h2>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl text-indigo-900">
          <p className="leading-relaxed">{path.howToRun}</p>
        </div>
      </section>

      {/* Experiment Next */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
            <i className="fas fa-flask"></i>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">What to Experiment With Next</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-slate-700 italic">
          "{path.nextSteps}"
        </div>
      </section>
    </div>
  );
};

export default StarterOutput;
