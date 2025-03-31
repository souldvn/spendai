export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold mb-6">AI Аналитика</h1>
        
        <div className="bg-white rounded-xl p-4 mb-4">
          <div className="w-full py-3 rounded-lg bg-gray-200 animate-pulse"></div>
        </div>
        
        <div className="bg-white rounded-xl p-4 mb-4 h-[calc(100vh-300px)]">
          <div className="space-y-4">
            <div className="bg-gray-200 rounded-lg p-4 animate-pulse"></div>
            <div className="bg-gray-200 rounded-lg p-4 animate-pulse"></div>
            <div className="bg-gray-200 rounded-lg p-4 animate-pulse"></div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 flex items-center">
          <div className="flex-1 bg-gray-200 rounded-lg h-10 animate-pulse"></div>
          <div className="ml-2 bg-gray-200 rounded-lg w-10 h-10 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
} 