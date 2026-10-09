"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

type ClockCity = {
  city: string;
  country: string;
  timezone: string;
  accent: string;
};

const CITIES: ClockCity[] = [
  {
    city: "Shanghai",
    country: "China",
    timezone: "Asia/Shanghai",
    accent: "#7c3aed",
  },
  {
    city: "Tokyo",
    country: "Japan",
    timezone: "Asia/Tokyo",
    accent: "#2563eb",
  },
  {
    city: "London",
    country: "United Kingdom",
    timezone: "Europe/London",
    accent: "#14b8a6",
  },
  {
    city: "New York",
    country: "United States",
    timezone: "America/New_York",
    accent: "#f97316",
  },
  {
    city: "Los Angeles",
    country: "United States",
    timezone: "America/Los_Angeles",
    accent: "#ef4444",
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    timezone: "Asia/Dubai",
    accent: "#f59e0b",
  },
];

function formatTime(date: Date, timezone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

function formatDate(date: Date, timezone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function Home() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());

    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const renderedClocks = useMemo(
    () =>
      CITIES.map((item) => ({
        ...item,
        time: now ? formatTime(now, item.timezone) : "--:--:--",
        date: now ? formatDate(now, item.timezone) : "Loading local time...",
      })),
    [now],
  );

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <span className={styles.badge}>Chris Zeabur Helloworld</span>
          <h1>World Clock</h1>
          <p>
            A simple Next.js page showing the current time across major cities.
            It updates every second and is ready for GitHub + Zeabur deployment.
          </p>
        </section>

        <section className={styles.grid}>
          {renderedClocks.map((item) => (
            <article
              className={styles.card}
              key={item.timezone}
              style={{ ["--accent" as string]: item.accent }}
            >
              <div className={styles.cardTop}>
                <div>
                  <h2>{item.city}</h2>
                  <span>{item.country}</span>
                </div>
                <span className={styles.timezone}>{item.timezone}</span>
              </div>
              <div className={styles.time}>{item.time}</div>
              <div className={styles.date}>{item.date}</div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
