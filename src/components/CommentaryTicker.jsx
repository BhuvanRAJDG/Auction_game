import React, { useEffect, useRef } from 'react';
import { Volume2, Sparkles, MessageSquare, Hammer, ArrowUpRight } from 'lucide-react';

export default function CommentaryTicker({ logs }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="commentary-ticker-card">
      <div className="ticker-header">
        <div className="ticker-title">
          <MessageSquare size={16} color="#00bfff" />
          <span>AUCTIONEER LIVE FEED & COMMENTARY</span>
        </div>
        <span className="live-dot" />
      </div>

      <div className="ticker-scroll" ref={scrollRef}>
        {logs.length === 0 ? (
          <div className="ticker-empty">
            <span>Auction commentary active. Bids will appear here in real-time...</span>
          </div>
        ) : (
          logs.map((log, idx) => {
            let icon = <ArrowUpRight size={14} className="icon-bid" />;
            let logClass = 'log-bid';

            if (log.type === 'SOLD') {
              icon = <Hammer size={14} className="icon-sold" />;
              logClass = 'log-sold';
            } else if (log.type === 'OUTBID') {
              icon = <Sparkles size={14} className="icon-outbid" />;
              logClass = 'log-outbid';
            } else if (log.type === 'PASS') {
              logClass = 'log-pass';
            }

            return (
              <div key={idx} className={`ticker-item ${logClass}`}>
                <span className="log-time">{log.time}</span>
                <span className="log-icon">{icon}</span>
                <span className="log-text">{log.text}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
