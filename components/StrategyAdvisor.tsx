
import React, { useState } from 'react';
import { Product, Platform } from '../types';
import { getPricingStrategy } from '../services/geminiService';

interface StrategyAdvisorProps {
  product: Product | null;
  platform: Platform;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
    </div>
);

const StrategyAdvisor: React.FC<StrategyAdvisorProps> = ({ product, platform }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [advice, setAdvice] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [question, setQuestion] = useState('How can we increase the profit margin without affecting sales?');

  const handleGetAdvice = async () => {
    if (!product) return;
    setIsLoading(true);
    setError('');
    setAdvice('');
    try {
      const result = await getPricingStrategy(product, platform, question);
      setAdvice(result);
    } catch (err) {
      setError('Failed to get advice from AI. Please check your API key and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg h-full flex items-center justify-center">
        <p className="text-gray-400">Select a product to get AI-powered advice.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col gap-4">
      <h2 className="text-2xl font-semibold text-white">
        Strategy Advisor for <span className="text-cyan-400">{product.name}</span>
      </h2>
      
      <div>
        <label htmlFor="question" className="block text-sm font-medium text-gray-300 mb-2">
          Your Strategic Goal:
        </label>
        <textarea
          id="question"
          rows={3}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
          placeholder="e.g., How can we increase sales by 20%?"
        />
      </div>

      <button
        onClick={handleGetAdvice}
        disabled={isLoading}
        className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-md hover:bg-cyan-700 transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? 'Thinking...' : 'Get AI Advice'}
      </button>

      {(isLoading || advice || error) && (
        <div className="mt-4 p-4 bg-gray-900/50 rounded-lg min-h-[200px]">
          <h3 className="text-lg font-semibold text-gray-200 mb-2">AI Recommendation</h3>
          {isLoading && <LoadingSpinner />}
          {error && <p className="text-red-400">{error}</p>}
          {advice && (
            <div 
              className="text-gray-300 prose prose-invert prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: advice.replace(/\n/g, '<br />') }} 
            />
          )}
        </div>
      )}
    </div>
  );
};

export default StrategyAdvisor;
