import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";

interface Subject {
  id: string;
  name: string;
  questionsCount: number;
  progress: number;
  lastStudied: string;
  icon: string;
}

const mockSubjects: Subject[] = [
  {
    id: "biology",
    name: "Biology",
    questionsCount: 45,
    progress: 78,
    lastStudied: "2 hours ago",
    icon: "🧬"
  },
  {
    id: "history",
    name: "History",
    questionsCount: 32,
    progress: 56,
    lastStudied: "1 day ago",
    icon: "📚"
  },
  {
    id: "math",
    name: "Mathematics",
    questionsCount: 28,
    progress: 34,
    lastStudied: "3 days ago",
    icon: "🔢"
  }
];

export default function Dashboard() {
  const [selectedBuddy, setSelectedBuddy] = useState<any>(null);
  const [focusMode, setFocusMode] = useState(false);
  const [subjects] = useState<Subject[]>(mockSubjects);
  const navigate = useNavigate();

  useEffect(() => {
    // Get selected buddy from localStorage
    const buddy = localStorage.getItem('selectedBuddy');
    if (buddy) {
      setSelectedBuddy(JSON.parse(buddy));
    }
  }, []);

  const handleStartLearning = () => {
    // In a real app, this would trigger the pop-up learning system
    alert("Learning mode activated! You'll start receiving pop-up questions during your phone usage.");
  };

  const handleUploadMore = () => {
    navigate('/upload');
  };

  const totalQuestions = subjects.reduce((sum, subject) => sum + subject.questionsCount, 0);
  const averageProgress = Math.round(subjects.reduce((sum, subject) => sum + subject.progress, 0) / subjects.length);

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 slide-up">
          <div className="flex items-center space-x-4">
            {selectedBuddy && (
              <img 
                src={selectedBuddy.avatar} 
                alt={selectedBuddy.name}
                className="w-16 h-16 rounded-full object-cover border-3 border-primary floating-animation"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                ProCrash Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back! {selectedBuddy?.name || 'Your buddy'} is ready to help you learn.
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Focus Mode</span>
              <Switch
                checked={focusMode}
                onCheckedChange={setFocusMode}
              />
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="slide-up glass-card p-6 rounded-2xl" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Total Questions</h3>
              <span className="text-2xl">📝</span>
            </div>
            <div className="text-3xl font-bold text-primary">{totalQuestions}</div>
            <p className="text-sm text-muted-foreground">Ready for learning</p>
          </div>

          <div className="slide-up glass-card p-6 rounded-2xl" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Average Progress</h3>
              <span className="text-2xl">📊</span>
            </div>
            <div className="text-3xl font-bold text-learning">{averageProgress}%</div>
            <p className="text-sm text-muted-foreground">Across all subjects</p>
          </div>

          <div className="slide-up glass-card p-6 rounded-2xl" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Learning Streak</h3>
              <span className="text-2xl">🔥</span>
            </div>
            <div className="text-3xl font-bold text-secondary">7 days</div>
            <p className="text-sm text-muted-foreground">Keep it up!</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="glass-card p-8 rounded-2xl text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold mb-4">Start Learning Session</h2>
              <p className="text-muted-foreground mb-6">
                Activate learning mode and start receiving pop-up questions during your phone usage
              </p>
              <Button
                onClick={handleStartLearning}
                variant="learning"
                size="lg"
                className="px-8 py-3 text-lg font-semibold"
              >
                Distract Me with Learning! 🚀
              </Button>
            </div>
          </div>

          <div className="slide-up" style={{ animationDelay: '0.5s' }}>
            <div className="glass-card p-8 rounded-2xl text-center">
              <div className="text-6xl mb-4">📚</div>
              <h2 className="text-2xl font-bold mb-4">Add More Content</h2>
              <p className="text-muted-foreground mb-6">
                Upload additional study materials to expand your learning library
              </p>
              <Button
                onClick={handleUploadMore}
                variant="secondary"
                size="lg"
                className="px-8 py-3 text-lg font-semibold"
              >
                Upload Materials 📂
              </Button>
            </div>
          </div>
        </div>

        {/* Active Subjects */}
        <div className="slide-up" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-2xl font-bold mb-6">Your Learning Subjects</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <div
                key={subject.id}
                className="glass-card p-6 rounded-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${0.7 + index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{subject.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold">{subject.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {subject.questionsCount} questions
                      </p>
                    </div>
                  </div>
                  
                  <Badge variant="secondary">
                    {subject.progress}%
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{subject.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>Last studied: {subject.lastStudied}</span>
                  <Button variant="ghost" size="sm">
                    Study Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}