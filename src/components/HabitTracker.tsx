import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Circle, Plus, Trash2, TrendingUp } from 'lucide-react';

interface HabitCompletion {
  [date: string]: boolean;
}

interface Habit {
  id: string;
  name: string;
  completions: HabitCompletion;
}

export function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState('');

  useEffect(() => {
    // Load habits from localStorage
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []);

  useEffect(() => {
    // Save habits to localStorage
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (newHabit.trim()) {
      const habit: Habit = {
        id: Date.now().toString(),
        name: newHabit,
        completions: {},
      };
      setHabits([...habits, habit]);
      setNewHabit('');
    }
  };

  const toggleHabitDay = (habitId: string, dayOffset: number) => {
    const date = new Date();
    date.setDate(date.getDate() - dayOffset);
    const dateKey = date.toISOString().split('T')[0];

    setHabits(
      habits.map((habit) => {
        if (habit.id === habitId) {
          const newCompletions = { ...habit.completions };
          newCompletions[dateKey] = !newCompletions[dateKey];
          return { ...habit, completions: newCompletions };
        }
        return habit;
      })
    );
  };

  const deleteHabit = (habitId: string) => {
    setHabits(habits.filter((habit) => habit.id !== habitId));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addHabit();
    }
  };

  const getDayLabel = (offset: number) => {
    const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    const date = new Date();
    date.setDate(date.getDate() - offset);
    return days[date.getDay()];
  };

  const getDateKey = (offset: number) => {
    const date = new Date();
    date.setDate(date.getDate() - offset);
    return date.toISOString().split('T')[0];
  };

  const calculateTodayStats = () => {
    if (habits.length === 0) return '0/0';
    const today = new Date().toISOString().split('T')[0];
    const completed = habits.filter(
      (habit) => habit.completions[today]
    ).length;
    return `${completed}/${habits.length}`;
  };

  const calculateWeekStats = () => {
    if (habits.length === 0) return '0%';
    let totalPossible = 0;
    let totalCompleted = 0;

    for (let i = 0; i < 7; i++) {
      const dateKey = getDateKey(i);
      habits.forEach((habit) => {
        totalPossible++;
        if (habit.completions[dateKey]) {
          totalCompleted++;
        }
      });
    }

    const percentage = Math.round((totalCompleted / totalPossible) * 100);
    return `${percentage}%`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" /> Habit Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Neue Gewohnheit..."
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button onClick={addHabit} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3">
          {habits.length > 0 ? (
            habits.map((habit) => (
              <div
                key={habit.id}
                className="p-3 bg-muted rounded-lg group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium flex-1">{habit.name}</div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteHabit(habit.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <div className="flex gap-1 justify-between">
                  {[6, 5, 4, 3, 2, 1, 0].map((dayOffset) => {
                    const dateKey = getDateKey(dayOffset);
                    const isCompleted = habit.completions[dateKey];
                    return (
                      <button
                        key={dayOffset}
                        onClick={() => toggleHabitDay(habit.id, dayOffset)}
                        className="flex flex-col items-center gap-1 hover:bg-background p-2 rounded transition-colors"
                      >
                        <span className="text-xs text-muted-foreground">
                          {getDayLabel(dayOffset)}
                        </span>
                        {isCompleted ? (
                          <CheckCircle2 className="h-6 w-6 text-green-600" />
                        ) : (
                          <Circle className="h-6 w-6 text-muted-foreground" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground text-sm">
              Keine Gewohnheiten vorhanden
              <br />
              <span className="text-xs">
                Fügen Sie eine neue Gewohnheit hinzu, um zu beginnen
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-around pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {calculateTodayStats()}
            </div>
            <div className="text-xs text-muted-foreground">Heute</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {calculateWeekStats()}
            </div>
            <div className="text-xs text-muted-foreground">Diese Woche</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
