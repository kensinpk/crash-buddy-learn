import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BuddyCard } from "@/components/BuddyCard";
import { useNavigate } from "react-router-dom";

// Import buddy avatars
import buddyCoolMale from "@/assets/buddy-cool-male.jpg";
import buddyFriendlyFemale from "@/assets/buddy-friendly-female.jpg";
import buddyNerdyMale from "@/assets/buddy-nerdy-male.jpg";
import buddyCalmFemale from "@/assets/buddy-calm-female.jpg";

const buddies = [
  {
    id: "cool-male",
    name: "Alex",
    personality: "Cool & Confident",
    description: "Keeps you motivated with a laid-back vibe",
    avatar: buddyCoolMale,
    greeting: "Thanks for choosing me! Let's ace this together! 😎"
  },
  {
    id: "friendly-female",
    name: "Maya",
    personality: "Warm & Encouraging", 
    description: "Your supportive learning companion",
    avatar: buddyFriendlyFemale,
    greeting: "Thanks for choosing me! I'm here to help you succeed! 🌟"
  },
  {
    id: "nerdy-male",
    name: "Oliver",
    personality: "Smart & Curious",
    description: "Deep dives into every topic with you",
    avatar: buddyNerdyMale,
    greeting: "Thanks for choosing me! Let's explore knowledge together! 🤓"
  },
  {
    id: "calm-female",
    name: "Zen",
    personality: "Peaceful & Mindful",
    description: "Helps you learn with zen-like focus",
    avatar: buddyCalmFemale,
    greeting: "Thanks for choosing me! Let's learn mindfully and peacefully! 🧘‍♀️"
  }
];

export default function BuddySelection() {
  const [selectedBuddy, setSelectedBuddy] = useState<typeof buddies[0] | null>(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedBuddy) {
      // Store selected buddy in localStorage for later use
      localStorage.setItem('selectedBuddy', JSON.stringify(selectedBuddy));
      navigate('/permissions');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        {/* Header */}
        <div className="mb-8 slide-up">
          <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-4">
            Choose Your Learning Buddy! 🧑‍🤝‍🧑
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet your personal AI companions who'll help transform your distractions into learning moments. 
            Each buddy has their own unique style and personality!
          </p>
        </div>

        {/* Buddy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {buddies.map((buddy, index) => (
            <div 
              key={buddy.id} 
              className="slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BuddyCard
                buddy={buddy}
                isSelected={selectedBuddy?.id === buddy.id}
                onSelect={setSelectedBuddy}
              />
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="slide-up" style={{ animationDelay: '0.4s' }}>
          <Button
            onClick={handleContinue}
            disabled={!selectedBuddy}
            variant="learning"
            size="lg"
            className="px-8 py-3 text-lg font-semibold"
          >
            Continue with {selectedBuddy?.name || 'Your Buddy'} →
          </Button>
        </div>

        {selectedBuddy && (
          <div className="mt-6 text-center slide-up">
            <p className="text-muted-foreground">
              Great choice! {selectedBuddy.name} will be your learning companion throughout your ProCrash journey.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}