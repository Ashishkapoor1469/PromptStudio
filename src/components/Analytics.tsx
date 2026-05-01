'use client';
import React, { useMemo } from 'react';
import { store } from '@/lib/store';

export default function Analytics() {
  const data = useMemo(() => store.getAnalytics(), []);

  // Mini bar chart component
  const MiniChart = ({ values, color }: { values: number[]; color: string }) => {
    const max = Math.max(...values, 1);
    return (
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '60px' }}>
        {values.slice(-14).map((v, i) => (
          <div key={i} style={{
            flex: 1, minWidth: '4px',
            height: `${Math.max((v / max) * 100, 4)}%`,
            background: v > 0 ? color : 'var(--bg-tertiary)',
            borderRadius: '2px 2px 0 0',
            transition: 'height 0.3s ease',
          }} />
        ))}
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>📊 Analytics Dashboard</h1>
        <p>Track your prompt usage, costs, and AI output quality</p>
      </div>

      <div className="page-body">
        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
          <div className="stat-card">
            <div className="stat-value">{data.total_prompts}</div>
            <div className="stat-label">Total Prompts</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{data.total_executions}</div>
            <div className="stat-label">Total Executions</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">${data.total_cost.toFixed(2)}</div>
            <div className="stat-label">Total Cost</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {data.auto_vs_manual.auto + data.auto_vs_manual.manual > 0
                ? ((data.auto_vs_manual.auto / (data.auto_vs_manual.auto + data.auto_vs_manual.manual)) * 100).toFixed(0)
                : 0}%
            </div>
            <div className="stat-label">Auto-Generated Ratio</div>
          </div>
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-lg)' }}>
          <div className="card" style={{ cursor: 'default' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 'var(--space-md)' }}>
              📈 Executions (14 days)
            </h3>
            <MiniChart values={data.prompts_per_day.map(d => d.count)} color="var(--brand-primary)" />
          </div>

          <div className="card" style={{ cursor: 'default' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 'var(--space-md)' }}>
              💰 Cost (14 days)
            </h3>
            <MiniChart values={data.cost_per_day.map(d => d.cost)} color="var(--brand-accent)" />
          </div>

          <div className="card" style={{ cursor: 'default' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 'var(--space-md)' }}>
              🏆 Top Prompts
            </h3>
            {data.top_prompts.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {data.top_prompts.slice(0, 5).map((p, i) => (
                  <div key={p.prompt_id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '8px 12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)',
                    fontSize: '0.82rem',
                  }}>
                    <span style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ color: 'var(--text-tertiary)', fontWeight: 600 }}>#{i + 1}</span>
                      <span className="truncate" style={{ maxWidth: '140px' }}>{p.title}</span>
                    </span>
                    <span style={{ color: 'var(--text-tertiary)' }}>
                      {p.usage} uses · ⭐{p.avg_rating.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>No usage data yet. Fire some prompts!</p>
            )}
          </div>

          <div className="card" style={{ cursor: 'default' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 'var(--space-md)' }}>
              📱 App Breakdown
            </h3>
            {data.app_breakdown.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {data.app_breakdown.map(a => (
                  <div key={a.app} style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: '8px 12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)',
                    fontSize: '0.82rem',
                  }}>
                    <span style={{ textTransform: 'capitalize' }}>{a.app}</span>
                    <span style={{ color: 'var(--text-tertiary)' }}>{a.count} executions</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>No app data yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
