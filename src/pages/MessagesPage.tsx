
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockProducts } from "@/data/mockData";

// Mock conversation data
interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isRead: boolean;
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage?: Message;
  messages: Message[];
  productId?: string;
}

const mockConversations: Conversation[] = [
  {
    id: "conv1",
    participantId: "user2",
    participantName: "Emma Thompson",
    messages: [
      {
        id: "msg1",
        senderId: "user2",
        text: "Hi there! Is the MacBook Pro still available?",
        timestamp: new Date(Date.now() - 3600000 * 2),
        isRead: true,
      },
      {
        id: "msg2",
        senderId: "currentUser",
        text: "Yes, it's still available!",
        timestamp: new Date(Date.now() - 3600000),
        isRead: true,
      },
      {
        id: "msg3",
        senderId: "user2",
        text: "Great! Does it come with the original charger?",
        timestamp: new Date(Date.now() - 1800000),
        isRead: false,
      },
    ],
    productId: "1"
  },
  {
    id: "conv2",
    participantId: "user5",
    participantName: "Noah Wilson",
    messages: [
      {
        id: "msg4",
        senderId: "user5",
        text: "Hello! Would you take $100 for the Harry Potter book set?",
        timestamp: new Date(Date.now() - 86400000),
        isRead: true,
      },
      {
        id: "msg5",
        senderId: "currentUser",
        text: "I can do $110, that's the lowest I can go.",
        timestamp: new Date(Date.now() - 82800000),
        isRead: true,
      },
    ],
    productId: "5"
  },
  {
    id: "conv3",
    participantId: "user9",
    participantName: "Ethan Brown",
    messages: [
      {
        id: "msg6",
        senderId: "user9",
        text: "Is the Polaroid camera still available?",
        timestamp: new Date(Date.now() - 259200000),
        isRead: true,
      },
      {
        id: "msg7",
        senderId: "currentUser",
        text: "Yes it is!",
        timestamp: new Date(Date.now() - 255600000),
        isRead: true,
      },
      {
        id: "msg8",
        senderId: "user9",
        text: "Great! Can we meet tomorrow to complete the purchase?",
        timestamp: new Date(Date.now() - 172800000),
        isRead: true,
      },
      {
        id: "msg9",
        senderId: "currentUser",
        text: "Sure, how about 3pm at Main Street Coffee?",
        timestamp: new Date(Date.now() - 169200000),
        isRead: true,
      },
      {
        id: "msg10",
        senderId: "user9",
        text: "Sounds good! See you there.",
        timestamp: new Date(Date.now() - 86400000),
        isRead: true,
      },
    ],
    productId: "9"
  },
];

const MessagesPage = () => {
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    conversations[0] || null
  );
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get product details for the selected conversation
  const getProductDetails = (productId?: string) => {
    if (!productId) return null;
    return mockProducts.find(p => p.id === productId);
  };
  
  const selectedProduct = selectedConversation 
    ? getProductDetails(selectedConversation.productId)
    : null;
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageText.trim() || !selectedConversation) return;
    
    const newMessage: Message = {
      id: `msg${Date.now()}`,
      senderId: "currentUser",
      text: messageText,
      timestamp: new Date(),
      isRead: true,
    };
    
    // Update the conversations with the new message
    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage],
    });
    setMessageText("");
  };
  
  const filteredConversations = conversations.filter(
    conv => conv.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Format timestamp to a readable string
  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      // Today - show time
      return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      // This week - show day name
      return timestamp.toLocaleDateString([], { weekday: 'short' });
    } else {
      // Older - show date
      return timestamp.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Messages</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-280px)] min-h-[500px]">
        {/* Conversations List */}
        <div className="md:col-span-1 flex flex-col border rounded-lg overflow-hidden">
          <div className="p-3 border-b bg-muted/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search messages..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Tabs defaultValue="all" className="flex flex-col h-full">
            <div className="px-2 pt-2 border-b">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="flex-1 overflow-y-auto">
              {filteredConversations.length > 0 ? (
                <div className="space-y-1 p-2">
                  {filteredConversations.map((conv) => (
                    <button
                      key={conv.id}
                      className={`w-full text-left p-3 rounded-lg hover:bg-muted transition-colors ${
                        selectedConversation?.id === conv.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => setSelectedConversation(conv)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted-foreground/20 flex items-center justify-center flex-shrink-0">
                          {conv.participantName.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium truncate">{conv.participantName}</span>
                            {conv.messages.length > 0 && (
                              <span className="text-xs text-muted-foreground">
                                {formatTimestamp(conv.messages[conv.messages.length - 1].timestamp)}
                              </span>
                            )}
                          </div>
                          {conv.messages.length > 0 && (
                            <p className="text-sm text-muted-foreground truncate">
                              {conv.messages[conv.messages.length - 1].text}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <p className="text-muted-foreground mb-1">No conversations found</p>
                  <p className="text-sm text-muted-foreground">
                    {searchQuery ? 'Try a different search term' : 'Messages from your conversations will appear here'}
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="unread" className="flex-1 overflow-y-auto">
              {filteredConversations.filter(conv => 
                conv.messages.some(m => m.senderId !== 'currentUser' && !m.isRead)
              ).length > 0 ? (
                <div className="space-y-1 p-2">
                  {filteredConversations
                    .filter(conv => 
                      conv.messages.some(m => m.senderId !== 'currentUser' && !m.isRead)
                    )
                    .map((conv) => (
                      <button
                        key={conv.id}
                        className={`w-full text-left p-3 rounded-lg hover:bg-muted transition-colors ${
                          selectedConversation?.id === conv.id ? 'bg-muted' : ''
                        }`}
                        onClick={() => setSelectedConversation(conv)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-muted-foreground/20 flex items-center justify-center flex-shrink-0">
                            {conv.participantName.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium truncate">{conv.participantName}</span>
                              {conv.messages.length > 0 && (
                                <span className="text-xs text-muted-foreground">
                                  {formatTimestamp(conv.messages[conv.messages.length - 1].timestamp)}
                                </span>
                              )}
                            </div>
                            {conv.messages.length > 0 && (
                              <p className="text-sm text-muted-foreground truncate">
                                {conv.messages[conv.messages.length - 1].text}
                              </p>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <p className="text-muted-foreground mb-1">No unread messages</p>
                  <p className="text-sm text-muted-foreground">
                    All caught up!
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Conversation Detail */}
        <div className="md:col-span-2 border rounded-lg flex flex-col">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                    {selectedConversation.participantName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedConversation.participantName}</h3>
                    {selectedProduct && (
                      <p className="text-sm text-muted-foreground">
                        Re: {selectedProduct.title}
                      </p>
                    )}
                  </div>
                </div>
                
                {selectedProduct && (
                  <div className="hidden sm:block">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded bg-muted overflow-hidden">
                        <img 
                          src={selectedProduct.image} 
                          alt={selectedProduct.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-sm">
                        <p className="font-medium truncate max-w-[150px]">{selectedProduct.title}</p>
                        <p className="text-muted-foreground">${selectedProduct.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedConversation.messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.senderId === 'currentUser' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[75%] px-4 py-3 rounded-lg ${
                        message.senderId === 'currentUser'
                          ? 'bg-marketplace-primary text-white rounded-tr-none'
                          : 'bg-muted rounded-tl-none'
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderId === 'currentUser' ? 'text-white/70' : 'text-muted-foreground'
                      }`}>
                        {formatTimestamp(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input 
                    placeholder="Type a message..." 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={!messageText.trim()}>
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <div className="mb-4 text-6xl">💬</div>
              <h3 className="text-xl font-medium mb-2">Your messages</h3>
              <p className="text-muted-foreground max-w-md">
                Select a conversation to view messages or start a new conversation when browsing items
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
