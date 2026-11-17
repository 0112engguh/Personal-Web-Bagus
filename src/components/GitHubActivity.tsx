import { useEffect, useState } from 'react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { cn } from '@/lib/utils';

interface Contribution {
  date: string;
  count: number;
  level: number;
}

interface GitHubResponse {
  total: { lastYear: number };
  contributions: Contribution[];
}

const levelColors = [
  'bg-border/60',
  'bg-highlight/25',
  'bg-highlight/45',
  'bg-highlight/70',
  'bg-highlight',
];

export function GitHubActivity() {
  const [data, setData] = useState<GitHubResponse | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://github-contributions-api.jogruber.de/v4/0112engguh?y=last')
      .then(response => {
        if (!response.ok) throw new Error('request failed');
        return response.json() as Promise<GitHubResponse>;
      })
      .then(setData)
      .catch(() => setError(true));
  }, []);

  const days: (Contribution | null)[] = [];
  if (data?.contributions.length) {
    const firstWeekday = new Date(data.contributions[0].date).getDay();
    for (let i = 0; i < firstWeekday; i++) days.push(null);
    days.push(...data.contributions);
  }
  const weeks: (Contribution | null)[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  const monthLabels = weeks.map((week, index) => {
    const first = week.find((day): day is Contribution => !!day);
    if (!first) return null;
    const previous = weeks[index - 1]?.find((day): day is Contribution => !!day);
    const month = new Date(first.date).getMonth();
    if (previous && new Date(previous.date).getMonth() === month) return null;
    return new Date(first.date).toLocaleString('en-US', { month: 'short' });
  });

  return (
    <section>
      <div className="flex items-center justify-between gap-4 mb-8">
        <SectionTitle className="mb-0">GitHub Activity</SectionTitle>
        {data && (
          <span className="text-[11px] font-mono text-muted whitespace-nowrap">
            {data.total.lastYear} contributions
          </span>
        )}
      </div>

      {error || (data && !data.contributions.length) ? (
        <p className="text-xs font-mono text-muted">GitHub activity unavailable.</p>
      ) : !data ? (
        <p className="text-xs font-mono text-muted">Loading GitHub activity...</p>
      ) : (
        <div className="overflow-x-auto pb-2">
          <div className="flex items-start gap-1">
            <div className="mt-5 grid grid-rows-7 gap-[3px] text-[9px] leading-[12px] text-muted/70 h-[102px] flex-shrink-0">
              <span />
              <span>Mon</span>
              <span />
              <span>Wed</span>
              <span />
              <span>Fri</span>
              <span />
            </div>
            <div>
              <div className="flex gap-[3px] h-4 mb-1">
                {monthLabels.map((label, index) => (
                  <div key={index} className="relative w-3 flex-shrink-0">
                    {label && (
                      <span className="absolute left-0 top-0 whitespace-nowrap text-[9px] leading-none text-muted/70">
                        {label}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-[3px]">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-rows-7 gap-[3px]">
                    {week.map((day, dayIndex) => (
                      <span
                        key={dayIndex}
                        title={day ? `${day.date}: ${day.count} contribution${day.count === 1 ? '' : 's'}` : undefined}
                        className={cn(
                          'w-3 h-3 rounded-[2px]',
                          day ? levelColors[day.level] ?? levelColors[0] : 'bg-transparent'
                        )}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
