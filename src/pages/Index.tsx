import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        {/* Hero Section */}
        <div className="mb-12 slide-up">
          <h1 className="text-6xl font-bold gradient-primary bg-clip-text text-transparent mb-6">
            ProCrash 🧠
          </h1>
          
          <p className="text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Turn your phone distractions into <span className="text-primary font-semibold">learning superpowers</span>
          </p>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            The AI-powered learning companion that hijacks your social media scrolling 
            and transforms it into bite-sized learning moments that stick.
          </p>
          
          <Button
            onClick={() => navigate('/buddy-selection')}
            variant="floating"
            size="lg"
            className="px-12 py-4 text-xl font-semibold"
          >
            Start Your Learning Journey 🚀
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="slide-up glass-card p-8 rounded-2xl" style={{ animationDelay: '0.2s' }}>
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-4">Smart Distraction Hijacking</h3>
            <p className="text-muted-foreground">
              Detect when you're mindlessly scrolling and surprise you with quick learning questions instead
            </p>
          </div>

          <div className="slide-up glass-card p-8 rounded-2xl" style={{ animationDelay: '0.3s' }}>
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-4">AI-Powered Questions</h3>
            <p className="text-muted-foreground">
              Upload any study material and watch AI transform it into personalized, engaging flashcards
            </p>
          </div>

          <div className="slide-up glass-card p-8 rounded-2xl" style={{ animationDelay: '0.4s' }}>
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-4">Micro-Learning Magic</h3>
            <p className="text-muted-foreground">
              Learn in 10-second bursts that build lasting knowledge without disrupting your day
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="slide-up mb-12" style={{ animationDelay: '0.5s' }}>
          <h2 className="text-3xl font-bold text-foreground mb-8">How ProCrash Works</h2>
          
          <div className="grid md:grid-cols-4 gap-6 text-left">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h4 className="font-semibold mb-2">Choose Your Buddy</h4>
              <p className="text-sm text-muted-foreground">Pick an AI learning companion that matches your style</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-learning text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h4 className="font-semibold mb-2">Upload Materials</h4>
              <p className="text-sm text-muted-foreground">Add PDFs, notes, or any study content</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-success text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h4 className="font-semibold mb-2">AI Creates Questions</h4>
              <p className="text-sm text-muted-foreground">Smart algorithms generate personalized flashcards</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-secondary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h4 className="font-semibold mb-2">Learn Everywhere</h4>
              <p className="text-sm text-muted-foreground">Get surprise learning moments during phone use</p>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="slide-up glass-card p-8 rounded-2xl mb-8" style={{ animationDelay: '0.6s' }}>
          <h3 className="text-xl font-bold mb-6">Why Students Love ProCrash</h3>
          
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <blockquote className="space-y-2">
              <p className="text-sm italic">"I used to waste hours on TikTok. Now I'm learning Spanish instead!"</p>
              <footer className="text-xs text-muted-foreground">- Sarah, University Student</footer>
            </blockquote>
            
            <blockquote className="space-y-2">
              <p className="text-sm italic">"Finally, a way to study that doesn't feel like studying."</p>
              <footer className="text-xs text-muted-foreground">- Mike, Medical Student</footer>
            </blockquote>
            
            <blockquote className="space-y-2">
              <p className="text-sm italic">"My exam scores improved by 30% just from using ProCrash daily."</p>
              <footer className="text-xs text-muted-foreground">- Emma, High School</footer>
            </blockquote>
          </div>
        </div>

        {/* Final CTA */}
        <div className="slide-up" style={{ animationDelay: '0.7s' }}>
          <p className="text-lg text-muted-foreground mb-6">
            Ready to transform your screen time into study time?
          </p>
          
          <Button
            onClick={() => navigate('/buddy-selection')}
            variant="learning"
            size="lg"
            className="px-12 py-4 text-xl font-semibold"
          >
            Get Started Free 🎓
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
