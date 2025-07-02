import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Buddy {
  id: string;
  name: string;
  personality: string;
  description: string;
  avatar: string;
  greeting: string;
}

interface BuddyCardProps {
  buddy: Buddy;
  isSelected: boolean;
  onSelect: (buddy: Buddy) => void;
}

export function BuddyCard({ buddy, isSelected, onSelect }: BuddyCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSelect = () => {
    if (!isSelected) {
      setIsAnimating(true);
      onSelect(buddy);
      setTimeout(() => setIsAnimating(false), 2000);
    }
  };

  return (
    <div 
      className={`buddy-card p-6 text-center ${isSelected ? 'selected' : ''} ${isAnimating ? 'animate-pulse-glow' : ''}`}
      onClick={handleSelect}
    >
      <div className="relative mb-4">
        <img 
          src={buddy.avatar} 
          alt={buddy.name}
          className={`w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-lg transition-transform duration-300 ${
            isAnimating ? 'animate-bounce-gentle' : ''
          }`}
        />
        {isAnimating && (
          <div className="absolute -top-2 -right-2 animate-bounce">
            👋
          </div>
        )}
      </div>
      
      <h3 className={`text-lg font-bold mb-2 transition-colors ${
        isSelected ? 'text-white' : 'text-foreground'
      }`}>
        {buddy.name}
      </h3>
      
      <div className={`text-sm mb-3 transition-colors ${
        isSelected ? 'text-white/90' : 'text-muted-foreground'
      }`}>
        <span className="font-medium">{buddy.personality}</span>
      </div>
      
      <p className={`text-xs mb-4 transition-colors ${
        isSelected ? 'text-white/80' : 'text-muted-foreground'
      }`}>
        {buddy.description}
      </p>

      {isAnimating && (
        <div className={`text-sm font-medium transition-all duration-500 ${
          isSelected ? 'text-white' : 'text-primary'
        }`}>
          "{buddy.greeting}"
        </div>
      )}
    </div>
  );
}