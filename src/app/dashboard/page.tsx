'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'Detect Text', text: 'Verified authenticity of a strategic memo.', date: '2 hours ago' },
    { id: 2, type: 'Translator', text: 'Translated a summary for the LATAM team.', date: '1 day ago' },
    { id: 3, type: 'Grammar', text: 'Refined grammar and style on a policy draft.', date: '3 days ago' },
  ]);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to your Dashboard</h1>
      <div className="w-full max-w-4xl">
        <div className="mb-8 p-6 bg-card rounded-xl shadow-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          {recentActivity.length > 0 ? (
            <ul className="space-y-4">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-primary">{activity.type}</span>
                    <span className="text-sm text-muted-foreground">{activity.date}</span>
                  </div>
                  <p className="text-sm">{activity.text}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-center">No recent activity. Start using the tools to see your history!</p>
          )}
        </div>
        <div className="p-6 bg-card rounded-xl shadow-lg border border-border text-center">
          <h2 className="text-xl font-semibold mb-4">Ready to start?</h2>
          <p className="text-muted-foreground mb-4">Explore our tools to get started with your tasks.</p>
          <Link href="/" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            Go to Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
