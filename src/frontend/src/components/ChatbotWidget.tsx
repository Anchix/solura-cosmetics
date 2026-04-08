import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, MessageCircle, Minimize2, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  timestamp: number;
}

const SESSION_KEY = "solura_chat_messages";

const QUICK_REPLIES = ["Track Order", "Product Info", "Shipping", "Returns"];

const GREETING: Message = {
  id: "greeting",
  role: "bot",
  text: "Hi! I'm Solura's beauty assistant. How can I help you today? 😊",
  timestamp: Date.now(),
};

const FAQ_RESPONSES: Record<string, string> = {
  "track order":
    "To track your order, go to My Account → Order History. You'll find your order status there. For further help, email contact@soluracosmo.com with your order ID.",
  "product info":
    "Solura Cosmetics offers Skincare, Makeup, and Haircare products — all formulated with Ayurvedic ingredients and clinically tested. Which category would you like to know more about?",
  shipping:
    "We offer free shipping on orders above ₹999 across India. Standard delivery takes 3–7 business days. Express options may be available at checkout.",
  returns:
    "We accept returns within 7 days of delivery for unused, sealed products. To initiate a return, email contact@soluracosmo.com with your order ID and reason.",
  payment:
    "We accept Razorpay (cards, UPI, netbanking) and Cash on Delivery. COD orders have a ₹40 convenience charge. Online payments are free.",
  "cash on delivery":
    "Yes, we offer Cash on Delivery (COD) with a ₹40 convenience fee. Online payments via Razorpay have no extra charge.",
  cod: "Yes, we offer Cash on Delivery (COD) with a ₹40 convenience fee. Online payments via Razorpay have no extra charge.",
  cancel:
    "Orders can be cancelled before they are shipped. Go to My Account → Order History and click Cancel. For shipped orders, please raise a return request.",
  discount:
    "We run regular promotions! Subscribe to our newsletter or follow us for exclusive discount codes and early access to sales.",
  ingredients:
    "All Solura products use natural, Ayurvedic ingredients — saffron, kumkumadi, sandalwood, and more — no harmful chemicals. Cruelty-free and dermatologist tested.",
  skincare:
    "Our Skincare range includes serums, moisturizers, face oils, and cleansers — crafted with ancient South Indian botanicals for radiant, healthy skin.",
  makeup:
    "Our Makeup collection features foundations, lipsticks, kajal, and more — long-wearing formulas with skin-loving ingredients.",
  haircare:
    "Our Haircare line includes oils, shampoos, and treatments powered by Ayurvedic herbs to strengthen and nourish hair from root to tip.",
};

function getFaqResponse(text: string): string | null {
  const lower = text.toLowerCase();
  for (const [key, response] of Object.entries(FAQ_RESPONSES)) {
    if (lower.includes(key)) return response;
  }
  return null;
}

function loadSession(): Message[] {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) return JSON.parse(raw) as Message[];
  } catch {
    /* ignore */
  }
  return [GREETING];
}

function saveSession(messages: Message[]) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages));
  } catch {
    /* ignore */
  }
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(loadSession);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    saveSession(messages);
  }, [messages]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        textareaRef.current?.focus();
      }, 150);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [open]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMsg: Message = {
        id: `u-${Date.now()}`,
        role: "user",
        text: trimmed,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setLoading(true);

      await new Promise<void>((resolve) => setTimeout(resolve, 600));

      const faqAnswer = getFaqResponse(trimmed);
      const botText =
        faqAnswer ??
        "Thank you for your question! For personalized help, please email us at contact@soluracosmo.com. We're happy to assist you with your beauty journey! 😊";

      const botMsg: Message = {
        id: `b-${Date.now()}`,
        role: "bot",
        text: botText,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setLoading(false);
    },
    [loading],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3"
      aria-label="Customer support chat"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="w-[340px] sm:w-[380px] rounded-2xl overflow-hidden shadow-elevated border border-border bg-card flex flex-col"
            style={{ maxHeight: "min(560px, calc(100vh - 100px))" }}
            aria-modal="true"
            aria-label="Solura Support Chat"
          >
            {/* Header */}
            <div className="gradient-rose px-4 py-3 flex items-center gap-3">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-white/25 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-semibold text-white text-sm leading-tight">
                  Solura Support
                </p>
                <p className="text-white/80 text-xs font-body">
                  Beauty Assistant • Online
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Minimize chat"
                className="text-white/80 hover:text-white transition-colors p-1 rounded-md hover:bg-white/15"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="text-white/80 hover:text-white transition-colors p-1 rounded-md hover:bg-white/15"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 bg-background">
              <div
                className="p-4 flex flex-col gap-3"
                data-ocid="chat-messages"
              >
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className={`flex gap-2 ${
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {msg.role === "bot" && (
                      <div className="flex-shrink-0 w-7 h-7 rounded-full gradient-rose flex items-center justify-center mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] px-3 py-2 rounded-2xl text-sm font-body leading-relaxed break-words ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-sm"
                          : "bg-card border border-border text-foreground shadow-soft rounded-tl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2"
                  >
                    <div className="flex-shrink-0 w-7 h-7 rounded-full gradient-rose flex items-center justify-center">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1 shadow-soft">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "120ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "240ms" }}
                      />
                    </div>
                  </motion.div>
                )}

                {messages.length === 1 && !loading && (
                  <div
                    className="flex flex-wrap gap-2 mt-1"
                    data-ocid="chat-quick-replies"
                  >
                    {QUICK_REPLIES.map((qr) => (
                      <button
                        key={qr}
                        type="button"
                        onClick={() => sendMessage(qr)}
                        className="text-xs font-body px-3 py-1.5 rounded-full border border-primary/40 text-primary bg-primary/5 hover:bg-primary/15 transition-colors"
                      >
                        {qr}
                      </button>
                    ))}
                  </div>
                )}

                <div ref={bottomRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="border-t border-border bg-card p-3 flex items-end gap-2">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message…"
                rows={1}
                className="flex-1 resize-none bg-input border border-border rounded-xl px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring min-w-0 max-h-24 overflow-y-auto"
                disabled={loading}
                data-ocid="chat-input"
                aria-label="Type your message"
              />
              <Button
                size="icon"
                type="button"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                className="gradient-rose text-white rounded-xl flex-shrink-0 hover:opacity-90 border-0"
                aria-label="Send message"
                data-ocid="chat-send"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full gradient-rose shadow-elevated flex items-center justify-center text-white relative"
        aria-label={open ? "Close support chat" : "Open support chat"}
        data-ocid="chat-fab"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-secondary border-2 border-card animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}
