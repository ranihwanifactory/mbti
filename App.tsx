import React, { useState, useCallback } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { Background } from './components/Background';
import { AppState, MBTIResult } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
  const [result, setResult] = useState<MBTIResult | null>(null);

  const startQuiz = useCallback(() => {
    setAppState(AppState.QUIZ);
  }, []);

  const handleQuizComplete = useCallback((calculatedResult: MBTIResult) => {
    setResult(calculatedResult);
    setAppState(AppState.RESULT);
  }, []);

  const resetQuiz = useCallback(() => {
    setResult(null);
    setAppState(AppState.WELCOME);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      <Background />
      
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        {appState === AppState.WELCOME && (
          <WelcomeScreen onStart={startQuiz} />
        )}
        
        {appState === AppState.QUIZ && (
          <QuizScreen onComplete={handleQuizComplete} />
        )}
        
        {appState === AppState.RESULT && result && (
          <ResultScreen result={result} onRetake={resetQuiz} />
        )}
      </main>
    </div>
  );
};

export default App;