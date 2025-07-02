import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  question: string;
  answer: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  approved: boolean;
}

// Mock AI-generated questions
const mockQuestions: Question[] = [
  {
    id: "1",
    question: "What is the powerhouse of the cell?",
    answer: "Mitochondria",
    topic: "Biology",
    difficulty: "easy",
    approved: true
  },
  {
    id: "2",
    question: "Explain the process of photosynthesis in simple terms.",
    answer: "Plants use sunlight, water, and carbon dioxide to create glucose and oxygen",
    topic: "Biology",
    difficulty: "medium",
    approved: true
  },
  {
    id: "3",
    question: "What year did World War II end?",
    answer: "1945",
    topic: "History",
    difficulty: "easy",
    approved: true
  },
  {
    id: "4",
    question: "Who invented the theory of evolution?",
    answer: "Charles Darwin",
    topic: "Biology",
    difficulty: "medium",
    approved: false
  },
  {
    id: "5",
    question: "What is the capital of ancient Rome?",
    answer: "Rome",
    topic: "History",
    difficulty: "easy",
    approved: false
  }
];

export default function Review() {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState({ question: '', answer: '' });
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleApproval = (questionId: string) => {
    setQuestions(prev =>
      prev.map(q =>
        q.id === questionId ? { ...q, approved: !q.approved } : q
      )
    );
  };

  const deleteQuestion = (questionId: string) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId));
    toast({
      title: "Question deleted",
      description: "The question has been removed from your collection",
    });
  };

  const startEditing = (question: Question) => {
    setEditingQuestion(question.id);
    setEditedContent({ question: question.question, answer: question.answer });
  };

  const saveEdit = () => {
    if (editingQuestion) {
      setQuestions(prev =>
        prev.map(q =>
          q.id === editingQuestion
            ? { ...q, question: editedContent.question, answer: editedContent.answer }
            : q
        )
      );
      setEditingQuestion(null);
      toast({
        title: "Question updated",
        description: "Your changes have been saved",
      });
    }
  };

  const handleContinue = () => {
    const approvedQuestions = questions.filter(q => q.approved);
    if (approvedQuestions.length === 0) {
      toast({
        title: "No questions approved",
        description: "Please approve at least one question to continue",
        variant: "destructive",
      });
      return;
    }

    // Store approved questions
    localStorage.setItem('approvedQuestions', JSON.stringify(approvedQuestions));
    navigate('/dashboard');
  };

  const approvedCount = questions.filter(q => q.approved).length;
  const totalCount = questions.length;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 slide-up">
          <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-4">
            Review & Organize Questions ✅
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I've generated questions from your materials. Review, edit, and approve the ones you'd like to use for learning.
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center space-x-6 mb-8 slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{totalCount}</div>
            <div className="text-sm text-muted-foreground">Generated</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{approvedCount}</div>
            <div className="text-sm text-muted-foreground">Approved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-muted-foreground">{totalCount - approvedCount}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4 mb-8">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className={`slide-up glass-card p-6 rounded-2xl transition-all duration-300 ${
                question.approved ? 'ring-2 ring-success/30 bg-success/5' : ''
              }`}
              style={{ animationDelay: `${0.2 + index * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Badge variant={question.approved ? "default" : "secondary"}>
                    {question.topic}
                  </Badge>
                  <Badge 
                    variant="outline"
                    className={
                      question.difficulty === 'easy' ? 'text-success' :
                      question.difficulty === 'medium' ? 'text-learning' : 'text-destructive'
                    }
                  >
                    {question.difficulty}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => startEditing(question)}
                    variant="ghost"
                    size="sm"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteQuestion(question.id)}
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => toggleApproval(question.id)}
                    variant={question.approved ? "default" : "outline"}
                    size="sm"
                  >
                    {question.approved ? '✓ Approved' : 'Approve'}
                  </Button>
                </div>
              </div>

              {editingQuestion === question.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Question</label>
                    <Textarea
                      value={editedContent.question}
                      onChange={(e) => setEditedContent(prev => ({ ...prev, question: e.target.value }))}
                      className="min-h-20"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Answer</label>
                    <Textarea
                      value={editedContent.answer}
                      onChange={(e) => setEditedContent(prev => ({ ...prev, answer: e.target.value }))}
                      className="min-h-20"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={saveEdit} size="sm">Save</Button>
                    <Button onClick={() => setEditingQuestion(null)} variant="ghost" size="sm">Cancel</Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-3">
                    <h3 className="font-semibold text-foreground mb-2">Question:</h3>
                    <p className="text-muted-foreground">{question.question}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Answer:</h3>
                    <p className="text-muted-foreground">{question.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 slide-up" style={{ animationDelay: '0.5s' }}>
          <Button
            onClick={() => navigate('/upload')}
            variant="outline"
            size="lg"
          >
            ← Add More Content
          </Button>
          
          <Button
            onClick={handleContinue}
            disabled={approvedCount === 0}
            variant="learning"
            size="lg"
            className="px-8"
          >
            Continue to Dashboard ({approvedCount} questions) →
          </Button>
        </div>

        {approvedCount === 0 && (
          <div className="text-center mt-4 slide-up" style={{ animationDelay: '0.6s' }}>
            <p className="text-sm text-muted-foreground">
              Please approve at least one question to continue to your dashboard
            </p>
          </div>
        )}
      </div>
    </div>
  );
}