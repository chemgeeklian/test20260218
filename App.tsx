import React, { useState, useEffect, useRef } from 'react';
import { SCENES } from './constants';
import { Scene } from './types';
import { ChevronRight, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [currentSceneId, setCurrentSceneId] = useState<string>('start');
  const [lineIndex, setLineIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  
  // Ref for auto-scrolling to bottom of text area
  const contentRef = useRef<HTMLDivElement>(null);

  const currentScene: Scene = SCENES[currentSceneId];
  const isLastLine = lineIndex >= currentScene.lines.length - 1;
  const showOptions = !showResult && isLastLine && currentScene.options && currentScene.options.length > 0;
  
  // Auto scroll when content changes
  useEffect(() => {
    if (contentRef.current) {
      // Use a small timeout to ensure DOM update (especially spacer height) has applied
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
      }, 50);
    }
  }, [lineIndex, currentSceneId, showResult, showOptions]);

  // Reset state when scene changes
  useEffect(() => {
    setLineIndex(0);
    setShowResult(false);
    setIsTransitioning(false);
  }, [currentSceneId]);

  const handleNextLine = () => {
    if (isTransitioning || showResult) return;
    
    if (!isLastLine) {
      setLineIndex((prev) => prev + 1);
    } else {
      // If it is the last line and there are no options, check if it's an ending
      if (currentScene.type !== 'story') {
        setShowResult(true);
      }
    }
  };

  const handleOptionClick = (nextId: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSceneId(nextId);
    }, 200);
  };

  const handleRestart = () => {
    setIsTransitioning(true);
    setShowResult(false);
    setTimeout(() => {
      setCurrentSceneId('start');
    }, 300);
  };

  const renderResultOverlay = () => {
    if (!showResult) return null;

    const isVictory = currentScene.type === 'victory';
    const title = isVictory ? '恭喜通关' : 'Game Over';
    const colorClass = isVictory ? 'text-yellow-500' : 'text-red-600';
    const bgClass = isVictory ? 'bg-yellow-600 hover:bg-yellow-500 shadow-yellow-900/50' : 'bg-red-700 hover:bg-red-600 shadow-red-900/50';
    const borderColor = isVictory ? 'border-yellow-500' : 'border-red-600';

    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-6">
        <div className={`w-full max-w-md bg-neutral-900 border-2 ${borderColor} p-8 rounded-2xl shadow-2xl flex flex-col items-center text-center transform scale-100`}>
          <h1 className={`text-5xl font-black ${colorClass} mb-8 tracking-widest uppercase shadow-black drop-shadow-lg font-serif`}>
            {title}
          </h1>
          
          <button
            onClick={handleRestart}
            className={`group flex items-center justify-center gap-2 px-10 py-4 ${bgClass} text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg w-full`}
          >
            {isVictory ? '重新开始' : '再试一次'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-0 md:p-4 overflow-hidden font-sans">
      <div className="w-full h-[100vh] md:h-[90vh] md:max-h-[800px] md:max-w-2xl bg-neutral-800 md:rounded-3xl shadow-2xl relative overflow-hidden flex flex-col border-0 md:border-4 border-neutral-700">
        
        {/* Header / Top Bar */}
        <div className="bg-neutral-900/90 text-yellow-600 px-6 py-4 flex items-center justify-between border-b border-neutral-700 z-20 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg tracking-wider font-serif">梁家河模拟器</span>
          </div>
          <div className="text-xs font-mono text-neutral-500">v1.0.0</div>
        </div>

        {/* Main Game Area */}
        <div className={`flex-1 relative transition-opacity duration-200 overflow-hidden flex flex-col ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          
          {/* Scrollable Text Area */}
          <div 
            ref={contentRef}
            className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scroll-smooth"
            onClick={handleNextLine}
          >
            {/* Render past lines up to current index */}
            {currentScene.lines.map((line, idx) => {
              if (idx > lineIndex) return null;
              return (
                <p 
                  key={`${currentSceneId}-${idx}`} 
                  className="text-lg md:text-2xl font-serif text-gray-200 leading-relaxed animate-fade-in"
                >
                  {line}
                </p>
              );
            })}
            
            {/* Blinking cursor to indicate waiting for tap */}
            {!showOptions && !showResult && (
              <div className="flex justify-center mt-8 animate-pulse opacity-50">
                <span className="text-sm text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> 点击屏幕继续
                </span>
              </div>
            )}

            {/* Spacer for scroll to avoid overlap with bottom fixed elements */}
            {/* When options are shown, we need a large spacer so text can scroll above the options overlay */}
            <div className={`${showOptions ? 'h-96' : 'h-32'}`} />
          </div>

          {/* Options Area - Fixed at bottom */}
          {showOptions && (
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-gray-900 to-transparent pt-12 pb-8 px-6 animate-fade-in z-10">
              <div className="flex flex-col gap-3 max-w-lg mx-auto">
                {currentScene.options?.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(option.nextId)}
                    className="w-full py-3 md:py-4 px-5 md:px-6 bg-slate-800 hover:bg-yellow-700 border border-slate-600 hover:border-yellow-500 text-white font-serif text-base md:text-lg rounded-xl shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 text-left flex items-center justify-between group"
                  >
                    <span>{option.label}</span>
                    <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 opacity-0 group-hover:opacity-100 transition-opacity text-yellow-300" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Result Overlay */}
          {renderResultOverlay()}

        </div>

        {/* CRT Scanline Effect Overlay (Optional aesthetic touch) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-5 z-30 mix-blend-overlay hidden md:block" />
      </div>
    </div>
  );
};

export default App;