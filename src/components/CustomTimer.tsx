import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';

export function CustomTimer() {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      // Play notification sound
      try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBDGH0fPTgjMGHm7A7+OZSA0PVpvn77BdGAg+ltry0n0pBSmAy/LaiTYIGGS56+OaTBELTqXh8LRiGwU2jdXxxHApBSp+zPDejUIJFmS76+ScTRENUrHo7KhaGAg8ktbwzn4sBSZ9y/Ddi0IJF2W66+SbTRAMTKPh8LRhGwU3jtXzxG4oBSd9zPDdjEMLGme+7+WdThENUrHp7adZGAg8ktXwz34rBSd9y/DdjUIKGGa76+WbThEMTKLh8LNhGwU3jtXzxG4oBSd9zO/ejkQKGme+7+WdTREMUqjp7KdaGAg8ktXwz38rBSd9y/DdjUIKGGa76+SbThAMTKHh8LNhGwU3jtXzxG4oBSd9zO/djkQLGma+7+OdThAMUajp66hZFwg8kdXwz38rBSd9y+/djEIKGGa66+SbTRAMTKDh77NhGwU3jtTzw24oBSZ9y+/djEIKGGW66+SbTRAMTJ/g77NgGgU3jdTzw24nBSZ9y+/djEIKGGW56+SaTQ8MTJ7g77NgGgU3jdTzwm4nBSZ8yu/djEIKGGW56+OaTRALTJ3g77JgGgU2jdTzwm4nBSZ8yu/djEIKF2W56+OZTRALTJzg77JfGgU2jdPzwm4nBSZ8yu/djEIKF2W46+OZTRALTJvg77JfGgU2jNPzwm0nBSZ8ye/cjEIKF2S46+OYTRAKTJvg77JeGgU2jNPzwWwnBSZ7ye/cjEIKF2S46+OYTBAKTJrg77JeGgU1jNPzwWwnBSZ7ye/cjEIJF2S46+OYTBAKTJng77FeGgU1jNPzwWwnBSZ7ye/cjEIJF2O46uOXTBAKS5ng77FeGQU1i9PzwGwnBSZ6ye/ci0IJFmO36uOXTA8KS5ng77FeGQU1i9LzwGwnBSZ6ye/ci0IJFmO36uOXTA8KS5jf7rFeGQU1i9LzwGwmBCZ6yO/ci0IJFmK26uKXTA8JS5jf7rFdGQU1itLzwGwmBCZ5yO/cilIJFmK26uKXSw8JS5ff7rFdGQU1itHzv2wmBCZ5yO/cilIJFWK16uKWTA8JS5ff7rFdGQU0itHzv2smBCZ5x+/cilIJFWK16uKWTA8JS5ff7rFdGAU0itHzv2smBCZ5x+/cilEJFWK16uKWTBAJS5bf7rFdGAU0itDzv2smBCZ5xu/biFEJFWG16uGWTBAJS5bf7rBdGAU0is/zv2smBCZ4xu/biFEIFWG16uGWTBAJS5bf7rBdGAQzis/zv2smBCZ4xu/biFEIFWG06uGWSxAIS5Xf77BdGAQzis/zv2slBCV4xu/biFAIFWE06uGWSxAIS5Xf77BdF');
        audio.play().catch(() => {});
      } catch (error) {}
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    const totalSeconds = minutes * 60 + seconds;
    if (totalSeconds > 0 && !isRunning) {
      setTimeLeft(totalSeconds);
      setInitialTime(totalSeconds);
      setIsRunning(true);
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Timer className="h-5 w-5" /> Eigener Timer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {timeLeft === 0 ? (
          <>
            <div className="flex items-center justify-center gap-2">
              <Input
                type="number"
                min="0"
                max="999"
                placeholder="Min"
                value={minutes || ''}
                onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
                className="w-24 text-center text-xl"
              />
              <span className="text-2xl font-bold">:</span>
              <Input
                type="number"
                min="0"
                max="59"
                placeholder="Sek"
                value={seconds || ''}
                onChange={(e) => setSeconds(Math.min(59, parseInt(e.target.value) || 0))}
                className="w-24 text-center text-xl"
              />
            </div>
            <Button onClick={startTimer} className="w-full" size="lg">
              <Play className="h-4 w-4 mr-2" />
              Timer starten
            </Button>
          </>
        ) : (
          <>
            <div className="text-6xl font-bold text-center tabular-nums text-primary">
              {formatTime(timeLeft)}
            </div>
            <div className="flex gap-2">
              <Button onClick={toggleTimer} className="flex-1" size="lg">
                {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isRunning ? 'Pause' : 'Weiter'}
              </Button>
              <Button onClick={resetTimer} variant="outline" size="lg">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
