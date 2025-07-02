import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const [selectedBuddy, setSelectedBuddy] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get selected buddy from localStorage
    const buddy = localStorage.getItem('selectedBuddy');
    if (buddy) {
      setSelectedBuddy(JSON.parse(buddy));
    }
  }, []);

  const handleContinue = () => {
    navigate('/upload');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center">
        {/* Animated Welcome */}
        <div className="mb-8 slide-up">
          <div className="mb-6">
            {selectedBuddy && (
              <img 
                src={selectedBuddy.avatar} 
                alt={selectedBuddy.name}
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary shadow-xl floating-animation"
              />
            )}
          </div>
          
          <h1 className="text-5xl font-bold gradient-primary bg-clip-text text-transparent mb-6">
            Welcome to ProCrash! 🎉
          </h1>
          
          <div className="text-xl text-muted-foreground max-w-2xl mx-auto space-y-4">
            <p>
              <strong className="text-foreground">
                {selectedBuddy?.name || 'Your buddy'} here!</strong> I'm your learning companion 
              who helps you break out of distraction and master your subjects in seconds!
            </p>
          </div>
        </div>

        {/* Features Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="slide-up glass-card p-6 rounded-2xl" style={{ animationDelay: '0.2s' }}>
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-lg font-semibold mb-2">Smart Learning</h3>
            <p className="text-sm text-muted-foreground">
              I'll turn your study materials into bite-sized questions that stick
            </p>
          </div>

          <div className="slide-up glass-card p-6 rounded-2xl" style={{ animationDelay: '0.3s' }}>
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-lg font-semibold mb-2">Distraction Hijack</h3>
            <p className="text-sm text-muted-foreground">
              When you reach for social media, I'll surprise you with learning instead
            </p>
          </div>

          <div className="slide-up glass-card p-6 rounded-2xl" style={{ animationDelay: '0.4s' }}>
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold mb-2">Instant Mastery</h3>
            <p className="text-sm text-muted-foreground">
              Quick 10-second learning bursts that build lasting knowledge
            </p>
          </div>
        </div>

        {/* How it Works */}
        <div className="mb-8 slide-up" style={{ animationDelay: '0.5s' }}>
          <h2 className="text-2xl font-bold text-foreground mb-6">How ProCrash Works</h2>
          
          <div className="space-y-4 text-left max-w-2xl mx-auto">
            <div className="flex items-start space-x-4 p-4 rounded-xl bg-muted/30">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <h4 className="font-semibold">Upload Your Materials</h4>
                <p className="text-sm text-muted-foreground">PDFs, notes, or type custom content</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 rounded-xl bg-muted/30">
              <div className="w-8 h-8 rounded-full bg-learning text-white flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <h4 className="font-semibold">AI Creates Questions</h4>
                <p className="text-sm text-muted-foreground">I'll automatically generate smart flashcards</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 rounded-xl bg-muted/30">
              <div className="w-8 h-8 rounded-full bg-success text-white flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <h4 className="font-semibold">Learn While You Live</h4>
                <p className="text-sm text-muted-foreground">Pop-up questions during your daily phone use</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="slide-up" style={{ animationDelay: '0.6s' }}>
          <Button
            onClick={handleContinue}
            variant="learning"
            size="lg"
            className="px-12 py-4 text-xl font-semibold"
          >
            Let's Get Started! 🚀
          </Button>
          
          <p className="text-sm text-muted-foreground mt-4">
            Ready to transform your learning? Let's upload your first study material!
          </p>
        </div>
      </div>
    </div>
  );
}