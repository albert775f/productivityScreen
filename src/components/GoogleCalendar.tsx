import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, CheckSquare, Plus, Trash2 } from 'lucide-react';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

interface CalendarEvent {
  id: string;
  summary: string;
  start: string;
  end: string;
}

export function GoogleCalendar() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    // Load todos from localStorage
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }

    // Add some demo events
    const demoEvents: CalendarEvent[] = [
      {
        id: '1',
        summary: 'Team Meeting',
        start: new Date(Date.now() + 3600000).toISOString(),
        end: new Date(Date.now() + 7200000).toISOString(),
      },
      {
        id: '2',
        summary: 'Projekt Review',
        start: new Date(Date.now() + 10800000).toISOString(),
        end: new Date(Date.now() + 14400000).toISOString(),
      },
    ];
    setEvents(demoEvents);
  }, []);

  useEffect(() => {
    // Save todos to localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: TodoItem = {
        id: Date.now().toString(),
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const formatEventTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" /> Kalender & Aufgaben
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Google Sign In Info */}
        <div className="text-center p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">
            Google Calendar Integration
          </p>
          <p className="text-xs text-muted-foreground">
            Um Google Calendar zu verwenden, benötigen Sie eine Google API Client ID.
            <br />
            Die Aufgaben werden lokal gespeichert.
          </p>
        </div>

        {/* Today's Events */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Heutige Termine
          </h3>
          {events.length > 0 ? (
            <div className="space-y-2">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="p-3 bg-muted rounded-lg border-l-4 border-primary"
                >
                  <div className="font-medium">{event.summary}</div>
                  <div className="text-sm text-muted-foreground">
                    {formatEventTime(event.start)} - {formatEventTime(event.end)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground text-sm">
              Keine Termine für heute
            </div>
          )}
        </div>

        {/* Todo List */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            Aufgaben
          </h3>

          <div className="flex gap-2 mb-3">
            <Input
              placeholder="Neue Aufgabe..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button onClick={addTodo} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {todos.length > 0 ? (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 p-3 bg-muted rounded-lg group"
                >
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                  />
                  <span
                    className={`flex-1 ${
                      todo.completed
                        ? 'line-through text-muted-foreground'
                        : ''
                    }`}
                  >
                    {todo.text}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground text-sm">
                Keine Aufgaben vorhanden
              </div>
            )}
          </div>

          {todos.length > 0 && (
            <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
              {todos.filter((t) => t.completed).length} von {todos.length}{' '}
              erledigt
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
