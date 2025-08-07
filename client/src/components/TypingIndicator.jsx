export function TypingIndicator({ user, avatar }) {
  return (
    <div className="flex items-start space-x-3">
      <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
        <span className="text-black text-sm font-medium">{avatar}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{user}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">is typing...</span>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-2xl rounded-tl-sm px-4 py-3 max-w-md">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-typing typing-dot"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-typing typing-dot"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-typing typing-dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
