import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

type PomodoroPhase = 'work' | 'break' | 'longBreak';

export function PomodoroTimer() {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(15);
  const [timeLeft, setTimeLeft] = useState(workMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<PomodoroPhase>('work');
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handlePhaseComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const handlePhaseComplete = () => {
    // Play notification sound
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBDGH0fPTgjMGHm7A7+OZSA0PVpvn77BdGAg+ltry0n0pBSmAy/LaiTYIGGS56+OaTBELTqXh8LRiGwU2jdXxxHApBSp+zPDejUIJFmS76+ScTRENUrHo7KhaGAg8ktbwzn4sBSZ9y/Ddi0IJF2W66+SbTRAMTKPh8LRhGwU3jtXzxG4oBSd9zPDdjEMLGme+7+WdThENUrHp7adZGAg8ktXwz34rBSd9y/DdjUIKGGa76+WbThEMTKLh8LNhGwU3jtXzxG4oBSd9zO/ejkQKGme+7+WdTREMUqjp7KdaGAg8ktXwz38rBSd9y/DdjUIKGGa76+SbThAMTKHh8LNhGwU3jtXzxG4oBSd9zO/djkQLGma+7+OdThAMUajp66hZFwg8kdXwz38rBSd9y+/djEIKGGa66+SbTRAMTKDh77NhGwU3jtTzw24oBSZ9y+/djEIKGGW66+SbTRAMTJ/g77NgGgU3jdTzw24nBSZ9y+/djEIKGGW56+SaTQ8MTJ7g77NgGgU3jdTzwm4nBSZ8yu/djEIKGGW56+OaTRALTJ3g77JgGgU2jdTzwm4nBSZ8yu/djEIKF2W56+OZTRALTJzg77JfGgU2jdPzwm4nBSZ8yu/djEIKF2W46+OZTRALTJvg77JfGgU2jNPzwm0nBSZ8ye/cjEIKF2S46+OYTRAKTJvg77JeGgU2jNPzwWwnBSZ7ye/cjEIKF2S46+OYTBAKTJrg77JeGgU1jNPzwWwnBSZ7ye/cjEIJF2S46+OYTBAKTJng77FeGgU1jNPzwWwnBSZ7ye/cjEIJF2O46uOXTBAKS5ng77FeGQU1i9PzwGwnBSZ6ye/ci0IJFmO36uOXTA8KS5ng77FeGQU1i9LzwGwnBSZ6ye/ci0IJFmO36uOXTA8KS5jf7rFeGQU1i9LzwGwmBCZ6yO/ci0IJFmK26uKXTA8JS5jf7rFdGQU1itLzwGwmBCZ5yO/cilIJFmK26uKXSw8JS5ff7rFdGQU1itHzv2wmBCZ5yO/cilIJFWK16uKWTA8JS5ff7rFdGQU0itHzv2smBCZ5x+/cilIJFWK16uKWTA8JS5ff7rFdGAU0itHzv2smBCZ5x+/cilEJFWK16uKWTBAJS5bf7rFdGAU0itDzv2smBCZ5xu/biFEJFWG16uGWTBAJS5bf7rBdGAU0is/zv2smBCZ4xu/biFEIFWG16uGWTBAJS5bf7rBdGAQzis/zv2smBCZ4xu/biFEIFWG06uGWSxAIS5Xf77BdGAQzis/zv2slBCV4xu/biFAIFWE06uGWSxAIS5Xf77BdF');
      audio.play().catch(() => {
        // Ignore autoplay errors
      });
    } catch (error) {
      // Ignore audio errors
    }

    if (phase === 'work') {
      const newCount = pomodorosCompleted + 1;
      setPomodorosCompleted(newCount);

      // Long break after 4 pomodoros
      if (newCount % 4 === 0) {
        setPhase('longBreak');
        setTimeLeft(longBreakMinutes * 60);
      } else {
        setPhase('break');
        setTimeLeft(breakMinutes * 60);
      }
    } else {
      setPhase('work');
      setTimeLeft(workMinutes * 60);
    }

    setIsRunning(false);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setPhase('work');
    setTimeLeft(workMinutes * 60);
  };

  const skipPhase = () => {
    handlePhaseComplete();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseLabel = () => {
    switch (phase) {
      case 'work':
        return 'Arbeitszeit';
      case 'break':
        return 'Kurze Pause';
      case 'longBreak':
        return 'Lange Pause';
    }
  };

  const getTotalSeconds = () => {
    switch (phase) {
      case 'work':
        return workMinutes * 60;
      case 'break':
        return breakMinutes * 60;
      case 'longBreak':
        return longBreakMinutes * 60;
    }
  };

  const progress = ((getTotalSeconds() - timeLeft) / getTotalSeconds()) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🍅</span> Pomodoro Timer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-2">
            {getPhaseLabel()}
          </div>
          <div className="text-6xl font-bold tabular-nums text-primary">
            {formatTime(timeLeft)}
          </div>
        </div>

        <Progress value={progress} className="h-2" />

        <div className="flex gap-2 justify-center">
          <Button onClick={toggleTimer} size="lg">
            {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={resetTimer} variant="outline" size="lg">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={skipPhase} variant="outline" size="lg">
            <SkipForward className="h-4 w-4 mr-2" />
            Skip
          </Button>
        </div>

        <div className="space-y-3 pt-4 border-t">
          <div className="flex items-center justify-between">
            <Label htmlFor="work-time">Arbeitszeit (Min)</Label>
            <Input
              id="work-time"
              type="number"
              min="1"
              max="60"
              value={workMinutes}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 25;
                setWorkMinutes(val);
                if (phase === 'work' && !isRunning) {
                  setTimeLeft(val * 60);
                }
              }}
              className="w-20 text-center"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="break-time">Kurze Pause (Min)</Label>
            <Input
              id="break-time"
              type="number"
              min="1"
              max="30"
              value={breakMinutes}
              onChange={(e) => setBreakMinutes(parseInt(e.target.value) || 5)}
              className="w-20 text-center"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="long-break-time">Lange Pause (Min)</Label>
            <Input
              id="long-break-time"
              type="number"
              min="1"
              max="60"
              value={longBreakMinutes}
              onChange={(e) => setLongBreakMinutes(parseInt(e.target.value) || 15)}
              className="w-20 text-center"
            />
          </div>
        </div>

        <div className="text-center pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            Pomodoros heute: <span className="font-bold text-primary">{pomodorosCompleted}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
