"use client";

import { cn } from "@/lib/utils";

type ActivityDay = {
  date: string;
  count: number;
};

type ActivityHeatmapProps = {
  title: string;
  subtitle?: string;
  totalLabel?: string;
  days?: ActivityDay[];
  weeksToShow?: number;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getIntensity(count: number) {
  if (count <= 0) return "bg-zinc-900";
  if (count <= 1) return "bg-emerald-950";
  if (count <= 3) return "bg-emerald-800";
  if (count <= 6) return "bg-emerald-600";
  return "bg-emerald-400";
}

function formatDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function buildWeeks(days: ActivityDay[], weeksToShow: number) {
  const dayMap = new Map(days.map((day) => [day.date, day.count]));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(today);
  start.setDate(start.getDate() - weeksToShow * 7 + 1);

  const alignedStart = new Date(start);
  alignedStart.setDate(start.getDate() - start.getDay());

  const weeks: Array<
    Array<{
      date: string;
      count: number;
      inRange: boolean;
    }>
  > = [];

  const cursor = new Date(alignedStart);

  for (let weekIndex = 0; weekIndex < weeksToShow; weekIndex += 1) {
    const week = [];

    for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
      const key = formatDateKey(cursor);

      week.push({
        date: key,
        count: dayMap.get(key) ?? 0,
        inRange: cursor >= start && cursor <= today,
      });

      cursor.setDate(cursor.getDate() + 1);
    }

    weeks.push(week);
  }

  return weeks;
}

function getMonthLabels(
  weeks: Array<Array<{ date: string; count: number; inRange: boolean }>>,
) {
  const labels: Array<{ index: number; label: string }> = [];
  let previousMonth = "";

  weeks.forEach((week, index) => {
    const firstVisibleDay = week.find((day) => day.inRange);

    if (!firstVisibleDay) return;

    const date = new Date(`${firstVisibleDay.date}T00:00:00`);
    const month = MONTHS[date.getMonth()];

    if (month !== previousMonth) {
      labels.push({ index, label: month });
      previousMonth = month;
    }
  });

  return labels;
}

export default function ActivityHeatmap({
  title,
  subtitle,
  totalLabel,
  days = [],
  weeksToShow = 30,
}: ActivityHeatmapProps) {
  const weeks = buildWeeks(days, weeksToShow);
  const monthLabels = getMonthLabels(weeks);

  return (
    <div className="h-full rounded-3xl border border-zinc-800 bg-zinc-950/40 p-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>

          {subtitle && (
            <p className="mt-1 max-w-xl text-xs leading-5 text-zinc-500">
              {subtitle}
            </p>
          )}
        </div>

        {totalLabel && (
          <p className="shrink-0 text-right text-xs leading-5 text-zinc-400">
            {totalLabel}
          </p>
        )}
      </div>

      <div className="w-full overflow-hidden">
        <div className="mb-2 grid grid-cols-[2rem_1fr] gap-2">
          <div />

          <div
            className="grid gap-[3px]"
            style={{
              gridTemplateColumns: `repeat(${weeks.length}, 1fr)`,
            }}
          >
            {weeks.map((_, index) => {
              const monthLabel = monthLabels.find((label) => label.index === index);

              return (
                <div key={index} className="h-4 text-[9px] text-zinc-500">
                  {monthLabel?.label}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-[2rem_1fr] gap-2">
          <div className="grid grid-rows-7 gap-[3px] text-[9px] leading-none text-zinc-500">
            <span />
            <span>Mon</span>
            <span />
            <span>Wed</span>
            <span />
            <span>Fri</span>
            <span />
          </div>

          <div
            className="grid gap-[3px]"
            style={{
              gridTemplateColumns: `repeat(${weeks.length}, 1fr)`,
            }}
          >
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-rows-7 gap-[3px]">
                {week.map((day) => (
                  <div
                    key={day.date}
                    title={`${day.date}: ${day.count} activities`}
                    className={cn(
                      "aspect-square w-full rounded-[2px] transition hover:ring-1 hover:ring-emerald-300/60",
                      day.inRange ? getIntensity(day.count) : "bg-transparent",
                    )}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-1.5 text-[10px] text-zinc-500">
          <span>Less</span>
          <span className="h-2 w-2 rounded-[2px] bg-zinc-900" />
          <span className="h-2 w-2 rounded-[2px] bg-emerald-950" />
          <span className="h-2 w-2 rounded-[2px] bg-emerald-800" />
          <span className="h-2 w-2 rounded-[2px] bg-emerald-600" />
          <span className="h-2 w-2 rounded-[2px] bg-emerald-400" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}