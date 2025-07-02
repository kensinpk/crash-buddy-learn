import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface Permission {
  id: string;
  title: string;
  description: string;
  reason: string;
  icon: string;
  required: boolean;
}

const permissions: Permission[] = [
  {
    id: "file-access",
    title: "File Access",
    description: "Read uploaded documents and files",
    reason: "To create personalized questions from your study materials",
    icon: "📁",
    required: true
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Send learning pop-up questions",
    reason: "To help you learn during natural breaks in your phone usage",
    icon: "🔔",
    required: true
  },
  {
    id: "background",
    title: "Background Activity",
    description: "Run while you use other apps",
    reason: "To detect when you're scrolling social media and offer learning moments",
    icon: "⚡",
    required: false
  }
];

export default function Permissions() {
  const [grantedPermissions, setGrantedPermissions] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const togglePermission = (permissionId: string) => {
    const newGranted = new Set(grantedPermissions);
    if (newGranted.has(permissionId)) {
      newGranted.delete(permissionId);
    } else {
      newGranted.add(permissionId);
    }
    setGrantedPermissions(newGranted);
  };

  const canContinue = permissions
    .filter(p => p.required)
    .every(p => grantedPermissions.has(p.id));

  const handleContinue = () => {
    if (canContinue) {
      // Store granted permissions
      localStorage.setItem('grantedPermissions', JSON.stringify([...grantedPermissions]));
      navigate('/account');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Header */}
        <div className="mb-8 slide-up">
          <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-4">
            Let's Set Up Your Learning Experience 🔐
          </h1>
          <p className="text-lg text-muted-foreground">
            To help you learn smarter, we'll need a few permissions. 
            Don't worry - your privacy and data security are our top priority!
          </p>
        </div>

        {/* Permissions List */}
        <div className="space-y-4 mb-8">
          {permissions.map((permission, index) => (
            <div 
              key={permission.id}
              className="slide-up glass-card p-6 rounded-2xl border cursor-pointer transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => togglePermission(permission.id)}
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{permission.icon}</div>
                
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {permission.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {permission.required && (
                        <Badge variant="secondary" className="text-xs">
                          Required
                        </Badge>
                      )}
                      <div 
                        className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                          grantedPermissions.has(permission.id)
                            ? 'bg-success border-success' 
                            : 'border-muted-foreground/30'
                        }`}
                      >
                        {grantedPermissions.has(permission.id) && (
                          <div className="text-white text-xs flex items-center justify-center h-full">
                            ✓
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {permission.description}
                  </p>
                  
                  <p className="text-xs text-primary font-medium">
                    Why we need this: {permission.reason}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Security Note */}
        <div className="mb-6 slide-up p-4 bg-muted/50 rounded-xl" style={{ animationDelay: '0.4s' }}>
          <p className="text-sm text-muted-foreground">
            🔒 <strong>Privacy First:</strong> All your data stays on your device. 
            We never store personal information on our servers.
          </p>
        </div>

        {/* Continue Button */}
        <div className="slide-up" style={{ animationDelay: '0.5s' }}>
          <Button
            onClick={handleContinue}
            disabled={!canContinue}
            variant="learning"
            size="lg"
            className="px-8 py-3 text-lg font-semibold w-full md:w-auto"
          >
            {canContinue ? 'Continue Setup →' : 'Grant Required Permissions'}
          </Button>
          
          {!canContinue && (
            <p className="text-sm text-muted-foreground mt-2">
              Please grant the required permissions to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
}