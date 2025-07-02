import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface UploadOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  accept?: string;
}

const uploadOptions: UploadOption[] = [
  {
    id: "pdf",
    title: "Upload PDF",
    description: "Textbooks, notes, research papers",
    icon: "📄",
    accept: ".pdf"
  },
  {
    id: "powerpoint",
    title: "Upload PowerPoint",
    description: "Lecture slides and presentations",
    icon: "📊",
    accept: ".ppt,.pptx"
  },
  {
    id: "anki",
    title: "Import Anki Deck",
    description: "Existing flashcard collections",
    icon: "🎴",
    accept: ".apkg"
  },
  {
    id: "text",
    title: "Paste Text",
    description: "Copy and paste any content",
    icon: "📝"
  }
];

export default function Upload() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [textContent, setTextContent] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    
    if (optionId !== 'text' && fileInputRef.current) {
      const option = uploadOptions.find(o => o.id === optionId);
      if (option?.accept) {
        fileInputRef.current.accept = option.accept;
        fileInputRef.current.click();
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    
    toast({
      title: "File uploaded successfully!",
      description: `${files.length} file(s) ready for processing`,
    });
  };

  const handleProcess = async () => {
    setIsProcessing(true);
    
    // Mock AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store content for next step
    const content = {
      type: selectedOption,
      textContent,
      files: uploadedFiles.map(f => ({ name: f.name, size: f.size })),
      timestamp: Date.now()
    };
    
    localStorage.setItem('uploadedContent', JSON.stringify(content));
    
    setIsProcessing(false);
    toast({
      title: "Content processed!",
      description: "AI has generated questions from your materials",
    });
    
    navigate('/review');
  };

  const canProcess = (selectedOption === 'text' && textContent.trim()) || 
                    (selectedOption !== 'text' && uploadedFiles.length > 0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8 slide-up">
          <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-4">
            Upload Your Learning Materials 📂
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose how you'd like to add your study content. I'll transform it into personalized learning questions!
          </p>
        </div>

        {/* Upload Options */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {uploadOptions.map((option, index) => (
            <div
              key={option.id}
              className={`slide-up cursor-pointer transition-all duration-300 ${
                selectedOption === option.id
                  ? 'buddy-card selected scale-105'
                  : 'buddy-card hover:scale-105'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleOptionSelect(option.id)}
            >
              <div className="p-6 text-center">
                <div className="text-4xl mb-4">{option.icon}</div>
                <h3 className={`text-lg font-semibold mb-2 ${
                  selectedOption === option.id ? 'text-white' : 'text-foreground'
                }`}>
                  {option.title}
                </h3>
                <p className={`text-sm ${
                  selectedOption === option.id ? 'text-white/90' : 'text-muted-foreground'
                }`}>
                  {option.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Content Input Area */}
        {selectedOption && (
          <div className="slide-up mb-8">
            {selectedOption === 'text' ? (
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-semibold mb-4">Paste Your Content</h3>
                <Textarea
                  placeholder="Paste your study notes, textbook chapters, or any learning material here..."
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  className="min-h-40 resize-none"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Tip: The more content you provide, the better questions I can create!
                </p>
              </div>
            ) : (
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-semibold mb-4">Uploaded Files</h3>
                {uploadedFiles.length > 0 ? (
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">📎</span>
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setUploadedFiles(files => files.filter((_, i) => i !== index))}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full mt-4"
                    >
                      Add More Files
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">📁</div>
                    <p className="text-muted-foreground mb-4">No files uploaded yet</p>
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Select Files
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Process Button */}
        {selectedOption && (
          <div className="text-center slide-up">
            <Button
              onClick={handleProcess}
              disabled={!canProcess || isProcessing}
              variant="learning"
              size="lg"
              className="px-12 py-4 text-lg font-semibold"
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing with AI...</span>
                </div>
              ) : (
                'Generate Questions with AI 🤖'
              )}
            </Button>
            
            {canProcess && !isProcessing && (
              <p className="text-sm text-muted-foreground mt-4">
                This will take just a moment. I'm analyzing your content to create the best questions!
              </p>
            )}
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>
    </div>
  );
}