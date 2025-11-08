import { Header } from '@/components/Header';
import { PomodoroTimer } from '@/components/PomodoroTimer';
import { CustomTimer } from '@/components/CustomTimer';
import { WordOfTheDay } from '@/components/WordOfTheDay';
import { GoogleCalendar } from '@/components/GoogleCalendar';
import { HabitTracker } from '@/components/HabitTracker';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <Header />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-1">
            <PomodoroTimer />
          </div>

          <div className="lg:col-span-1">
            <CustomTimer />
          </div>

          <div className="lg:col-span-1">
            <WordOfTheDay />
          </div>

          <div className="lg:col-span-2">
            <GoogleCalendar />
          </div>

          <div className="lg:col-span-1">
            <HabitTracker />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
