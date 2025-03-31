interface ChatMessageProps {
  message: string;
  isAI?: boolean;
}

export function ChatMessage({ message, isAI = false }: ChatMessageProps) {
  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}>
      {isAI && (
        <div className="w-8 h-8 rounded-full bg-[#8B5CF6] flex items-center justify-center mr-2">
          <span className="text-white text-sm">AI</span>
        </div>
      )}
      <div
        className={`rounded-2xl px-4 py-3 max-w-[80%] ${
          isAI ? 'bg-gray-100' : 'bg-[#8B5CF6] text-white'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message}</p>
      </div>
      {!isAI && (
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center ml-2">
          <span className="text-white text-sm">U</span>
        </div>
      )}
    </div>
  );
} 