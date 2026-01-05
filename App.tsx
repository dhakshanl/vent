
import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import StarterOutput from './components/StarterOutput';
import { getLearningPath } from './services/gemini';
import { LearningPath } from './types';

const SUGGESTIONS = [
  "Learn React and Tailwind",
  "Start with Machine Learning",
  "Learn Rust for System Dev",
  "Learn C# for Game Design",
  "Start with Data Science"
];

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LearningPath | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const path = await getLearningPath(query);
      setResult(path);
    } catch (err) {
      console.error(err);
      setError("Failed to generate path. Ensure you have an active internet connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    inputRef.current?.focus();
  };

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 sm:py-12">
        {/* Input Section */}
        <div className={`transition-all duration-700 ${result ? 'mb-16' : 'mt-12 sm:mt-24'}`}>
          <div className="text-center mb-10">
            <h2 className={`text-3xl sm:text-5xl font-black text-slate-900 tracking-tight transition-all duration-500 ${result ? 'scale-75 origin-center' : 'scale-100'}`}>
              What do you want to learn?
            </h2>
            {!result && (
              <p className="mt-4 text-slate-500 text-lg">
                Stop watching tutorials. Start building today.
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto group">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Learn Backend with Node.js"
              className="w-full h-16 sm:h-20 pl-6 pr-32 bg-white border-2 border-slate-200 rounded-3xl text-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all shadow-sm group-hover:shadow-md"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-3 top-3 bottom-3 px-6 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {loading ? (
                <i className="fas fa-circle-notch fa-spin"></i>
              ) : (
                <>
                  <span className="hidden sm:inline">Get Started</span>
                  <i className="fas fa-arrow-right"></i>
                </>
              )}
            </button>
          </form>

          {!result && !loading && (
            <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto bg-red-50 border border-red-100 text-red-800 p-4 rounded-xl flex items-center gap-3 animate-in fade-in zoom-in">
            <i className="fas fa-circle-exclamation text-red-500"></i>
            <p>{error}</p>
          </div>
        )}

        {/* Result Content */}
        {loading && !result && (
          <div className="max-w-2xl mx-auto text-center py-12 space-y-4">
            <div className="inline-block p-4 bg-indigo-50 rounded-full animate-pulse">
              <i className="fas fa-brain text-indigo-600 text-3xl"></i>
            </div>
            <p className="text-slate-500 font-medium text-lg animate-pulse">
              Cutting through the noise to find your best path...
            </p>
          </div>
        )}

        {result && <StarterOutput path={result} />}
      </main>

      <footer className="py-8 border-t border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center text-slate-400 text-sm">
          Built for builders. Zero fluff. 100% action.
        </div>
      </footer>
    </div>
  );
};

export default App;
