import { TypewriterText } from './TypewriterText';
import { useState } from 'react';

interface ChatMessageProps {
  message: string;
  isAI: boolean;
}

export function ChatMessage({ message, isAI }: ChatMessageProps) {
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[80%] rounded-lg p-4 ${
        isAI 
          ? 'bg-gray-100 text-gray-800' 
          : 'bg-[#8B5CF6] text-white'
      }`}>
        {isAI ? (
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-[#8B5CF6] flex items-center justify-center text-white text-xs">
              AI
            </div>
            <div className="flex-1">
              <TypewriterText 
                text={message} 
                speed={20}
                onComplete={() => setIsTypingComplete(true)}
              />
              {!isTypingComplete && (
                <div className="inline-block w-2 h-4 bg-gray-400 animate-pulse ml-1" />
              )}
            </div>
          </div>
        ) : (
          message
        )}
      </div>
    </div>
  );
} 