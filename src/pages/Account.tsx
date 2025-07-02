import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const [accountType, setAccountType] = useState<'google' | 'apple' | 'email' | 'skip' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    // Store account info (mock implementation)
    const accountData = {
      type: accountType,
      email: accountType === 'email' ? email : null,
      timestamp: Date.now()
    };
    
    localStorage.setItem('accountData', JSON.stringify(accountData));
    navigate('/welcome');
  };

  const canContinue = accountType === 'skip' || 
    (accountType === 'email' && email && password) ||
    (accountType && accountType !== 'email');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Header */}
        <div className="mb-8 slide-up">
          <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-4">
            Create Your Account 👤
          </h1>
          <p className="text-lg text-muted-foreground">
            Save your progress and sync across devices
          </p>
        </div>

        {/* Account Options */}
        <div className="space-y-4 mb-6">
          {/* Social Login Options */}
          <div className="slide-up" style={{ animationDelay: '0.1s' }}>
            <Button
              onClick={() => setAccountType('google')}
              variant={accountType === 'google' ? 'default' : 'outline'}
              size="lg"
              className="w-full"
            >
              <div className="flex items-center space-x-3">
                <div className="text-xl">🔗</div>
                <span>Continue with Google</span>
              </div>
            </Button>
          </div>

          <div className="slide-up" style={{ animationDelay: '0.2s' }}>
            <Button
              onClick={() => setAccountType('apple')}
              variant={accountType === 'apple' ? 'default' : 'outline'}
              size="lg"
              className="w-full"
            >
              <div className="flex items-center space-x-3">
                <div className="text-xl">🍎</div>
                <span>Continue with Apple</span>
              </div>
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6 slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex-1 border-t border-border"></div>
            <span className="px-4 text-sm text-muted-foreground">or</span>
            <div className="flex-1 border-t border-border"></div>
          </div>

          {/* Email Signup */}
          <div className="slide-up" style={{ animationDelay: '0.4s' }}>
            <Button
              onClick={() => setAccountType(accountType === 'email' ? null : 'email')}
              variant={accountType === 'email' ? 'default' : 'outline'}
              size="lg"
              className="w-full"
            >
              <div className="flex items-center space-x-3">
                <div className="text-xl">📧</div>
                <span>Sign up with Email</span>
              </div>
            </Button>
          </div>

          {/* Email Form */}
          {accountType === 'email' && (
            <div className="space-y-3 mt-4 slide-up">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
              <Input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* Skip Option */}
        <div className="mb-6 slide-up" style={{ animationDelay: '0.5s' }}>
          <Button
            onClick={() => setAccountType('skip')}
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            Skip for now
          </Button>
          
          {accountType === 'skip' && (
            <div className="mt-3 p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">
                ⚠️ Without an account, your progress won't be saved if you reinstall the app
              </p>
            </div>
          )}
        </div>

        {/* Continue Button */}
        <div className="slide-up" style={{ animationDelay: '0.6s' }}>
          <Button
            onClick={handleContinue}
            disabled={!canContinue}
            variant="learning"
            size="lg"
            className="w-full px-8 py-3 text-lg font-semibold"
          >
            {accountType === 'skip' ? 'Continue Without Account' : 'Create Account →'}
          </Button>
        </div>

        {/* Benefits */}
        <div className="mt-8 text-left slide-up" style={{ animationDelay: '0.7s' }}>
          <h3 className="text-sm font-semibold text-foreground mb-3">Why create an account?</h3>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li className="flex items-center space-x-2">
              <span className="text-success">✓</span>
              <span>Sync progress across all your devices</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-success">✓</span>
              <span>Never lose your learning streak</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-success">✓</span>
              <span>Backup your custom questions and materials</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}