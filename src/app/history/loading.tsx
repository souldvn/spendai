export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold mb-6">История транзакций</h1>
        
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          <div className="relative flex-1">
            <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>

        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-3"></div>
              <div className="space-y-3">
                {[1, 2].map((j) => (
                  <div key={j} className="h-16 bg-white rounded-xl animate-pulse"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 