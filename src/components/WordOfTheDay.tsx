import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, RefreshCw } from 'lucide-react';

interface Word {
  word: string;
  translation: string;
  definition: string;
  example: string;
}

const germanWords: Word[] = [
  {
    word: 'Zeitgeist',
    translation: 'Spirit of the times',
    definition: 'Der charakteristische Geist oder die Stimmung einer Epoche',
    example: 'Der Zeitgeist der 1960er Jahre war von Rebellion und Veränderung geprägt.',
  },
  {
    word: 'Fernweh',
    translation: 'Wanderlust',
    definition: 'Sehnsucht nach fernen Orten und Reisen',
    example: 'Jedes Mal wenn ich Reisefotos sehe, überkommt mich das Fernweh.',
  },
  {
    word: 'Schadenfreude',
    translation: 'Taking pleasure in others\' misfortune',
    definition: 'Freude über das Unglück oder Missgeschick anderer',
    example: 'Es ist nicht schön, aber manchmal empfindet man Schadenfreude.',
  },
  {
    word: 'Wanderlust',
    translation: 'Desire to travel',
    definition: 'Starkes Verlangen zu reisen und die Welt zu erkunden',
    example: 'Ihre Wanderlust führte sie durch alle Kontinente.',
  },
  {
    word: 'Gemütlichkeit',
    translation: 'Coziness, warmth',
    definition: 'Gefühl von Wärme, Behaglichkeit und Wohlbefinden',
    example: 'Die Gemütlichkeit eines Cafés an einem Regentag ist unvergleichlich.',
  },
  {
    word: 'Doppelgänger',
    translation: 'Look-alike, double',
    definition: 'Eine Person, die einer anderen zum Verwechseln ähnlich sieht',
    example: 'Ich habe gestern meinen Doppelgänger in der Stadt gesehen!',
  },
  {
    word: 'Waldeinsamkeit',
    translation: 'Forest solitude',
    definition: 'Das Gefühl der Einsamkeit und Kontemplation im Wald',
    example: 'Die Waldeinsamkeit half ihm, seine Gedanken zu ordnen.',
  },
  {
    word: 'Verschlimmbessern',
    translation: 'To make worse while trying to improve',
    definition: 'Etwas durch einen Verbesserungsversuch verschlechtern',
    example: 'Er wollte das Bild reparieren, hat es aber nur verschlimmbessert.',
  },
  {
    word: 'Torschlusspanik',
    translation: 'Last-minute panic',
    definition: 'Angst, eine Gelegenheit zu verpassen, bevor es zu spät ist',
    example: 'Mit 30 bekam sie Torschlusspanik und wollte unbedingt heiraten.',
  },
  {
    word: 'Kopfkino',
    translation: 'Mind cinema',
    definition: 'Lebhafte Vorstellungen oder Fantasien im Kopf',
    example: 'Das Buch war so spannend, dass ich echtes Kopfkino hatte.',
  },
];

export function WordOfTheDay() {
  const [currentWord, setCurrentWord] = useState<Word>(germanWords[0]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Get word of the day based on current date
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
    );
    const wordIndex = dayOfYear % germanWords.length;
    setCurrentWord(germanWords[wordIndex]);
  }, []);

  const getNewWord = () => {
    setIsLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * germanWords.length);
      setCurrentWord(germanWords[randomIndex]);
      setIsLoading(false);
    }, 300);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" /> Vokabel des Tages
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={getNewWord}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">
              {currentWord.word}
            </div>
            <div className="text-xl text-muted-foreground italic">
              {currentWord.translation}
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <div>
              <div className="text-sm font-semibold text-muted-foreground mb-1">
                Definition:
              </div>
              <div className="text-sm">{currentWord.definition}</div>
            </div>

            <div>
              <div className="text-sm font-semibold text-muted-foreground mb-1">
                Beispiel:
              </div>
              <div className="text-sm italic bg-muted p-3 rounded-lg border-l-4 border-primary">
                {currentWord.example}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
