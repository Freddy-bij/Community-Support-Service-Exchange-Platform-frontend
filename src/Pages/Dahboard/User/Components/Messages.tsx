import { useState } from "react";
import { FiSend, FiSearch, FiMoreVertical, FiPaperclip, FiSmile } from "react-icons/fi";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: Date;
  isOwn: boolean;
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>("1");
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const chats: Chat[] = [
    { id: "1", name: "John Doe", avatar: "JD", lastMessage: "Thanks for your help!", timestamp: "2m ago", unread: 2, online: true },
    { id: "2", name: "Sarah Smith", avatar: "SS", lastMessage: "Can you assist with this?", timestamp: "1h ago", unread: 0, online: true },
    { id: "3", name: "Mike Johnson", avatar: "MJ", lastMessage: "Great work!", timestamp: "3h ago", unread: 1, online: false },
    { id: "4", name: "Emily Davis", avatar: "ED", lastMessage: "See you tomorrow", timestamp: "1d ago", unread: 0, online: false },
  ];

  const messages: Message[] = [
    { id: "1", senderId: "1", senderName: "John Doe", text: "Hi! I need help with my request", timestamp: new Date(), isOwn: false },
    { id: "2", senderId: "me", senderName: "You", text: "Sure! What do you need help with?", timestamp: new Date(), isOwn: true },
    { id: "3", senderId: "1", senderName: "John Doe", text: "I'm looking for assistance with moving", timestamp: new Date(), isOwn: false },
    { id: "4", senderId: "me", senderName: "You", text: "I can help you with that. When do you need it?", timestamp: new Date(), isOwn: true },
    { id: "5", senderId: "1", senderName: "John Doe", text: "Thanks for your help!", timestamp: new Date(), isOwn: false },
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-180px)] bg-white rounded-2xl shadow-sm border border-gray-100 flex overflow-hidden">
      {/* Chat List Sidebar */}
      <div className="w-full md:w-80 border-r border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2C7A7B] focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition border-b border-gray-50 ${
                selectedChat === chat.id ? "bg-[#2C7A7B]/5" : ""
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[#2C7A7B] text-white flex items-center justify-center font-bold">
                  {chat.avatar}
                </div>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-gray-900">{chat.name}</p>
                  <span className="text-xs text-gray-400">{chat.timestamp}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <div className="w-5 h-5 bg-[#2C7A7B] text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {chat.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#2C7A7B] text-white flex items-center justify-center font-bold">
                  JD
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <p className="font-bold text-gray-900">John Doe</p>
                <p className="text-xs text-green-600">Online</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <FiMoreVertical size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.isOwn
                      ? "bg-[#2C7A7B] text-white"
                      : "bg-white text-gray-900 border border-gray-200"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.isOwn ? "text-white/70" : "text-gray-400"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <FiPaperclip size={20} className="text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <FiSmile size={20} className="text-gray-500" />
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2C7A7B] focus:border-transparent outline-none"
              />
              <button
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
                className="p-2 bg-[#2C7A7B] text-white rounded-xl hover:bg-[#235E5F] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiSend size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiSend size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">Select a conversation to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
