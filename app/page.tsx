"use client";
import { useEffect, useMemo, useState } from 'react';

interface Config {
  affiliate: {
    amazonTag?: string;
    flipkartId?: string;
    meeshoId?: string;
    fallbackLandingUrl?: string;
  };
  social: {
    facebookToken?: string;
    instagramToken?: string;
    pinterestToken?: string;
    youtubeApiKey?: string;
  };
}

interface LogItem { timestamp: string; level: 'info' | 'warn' | 'error'; message: string; }

export default function Page() {
  const [config, setConfig] = useState<Config>({ affiliate: {}, social: {} });
  const [saving, setSaving] = useState(false);
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState<LogItem[]>([]);

  useEffect(() => {
    fetch('/api/config').then(r => r.json()).then(setConfig).catch(() => {});
    const loadLogs = () => fetch('/api/logs').then(r => r.json()).then(setLogs).catch(() => {});
    loadLogs();
    const id = setInterval(loadLogs, 5000);
    return () => clearInterval(id);
  }, []);

  const canRun = useMemo(() => true, [config]);

  async function saveConfig(next: Config) {
    setSaving(true);
    try {
      await fetch('/api/config', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(next) });
      setConfig(next);
    } finally {
      setSaving(false);
    }
  }

  async function runAgent() {
    setRunning(true);
    try {
      await fetch('/api/agent/run', { method: 'POST' });
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="container vstack" style={{ gap: 24 }}>
      <div className="hstack" style={{ justifyContent: 'space-between' }}>
        <div className="hstack" style={{ gap: 8 }}>
          <span className="badge">Agent</span>
          <h2 style={{ margin: 0 }}>Affiliate Automation Dashboard</h2>
        </div>
        <div className="hstack" style={{ gap: 8 }}>
          <button className="button" onClick={() => saveConfig({ affiliate: {}, social: {} })} disabled={saving}>Reset</button>
          <button className="button primary" onClick={runAgent} disabled={!canRun || running}>{running ? 'Running?' : 'Run Now'}</button>
        </div>
      </div>

      <div className="grid">
        <section className="card col-6 vstack">
          <h3 style={{ margin: 0 }}>Affiliate Settings</h3>
          <label className="label">Amazon Associate Tag</label>
          <input className="input" value={config.affiliate.amazonTag ?? ''} onChange={e => setConfig(c => ({ ...c, affiliate: { ...c.affiliate, amazonTag: e.target.value } }))} placeholder="yourtag-21" />

          <label className="label">Flipkart Affiliate ID</label>
          <input className="input" value={config.affiliate.flipkartId ?? ''} onChange={e => setConfig(c => ({ ...c, affiliate: { ...c.affiliate, flipkartId: e.target.value } }))} placeholder="flipkart-id" />

          <label className="label">Meesho Affiliate ID</label>
          <input className="input" value={config.affiliate.meeshoId ?? ''} onChange={e => setConfig(c => ({ ...c, affiliate: { ...c.affiliate, meeshoId: e.target.value } }))} placeholder="meesho-id" />

          <label className="label">Fallback Landing URL</label>
          <input className="input" value={config.affiliate.fallbackLandingUrl ?? ''} onChange={e => setConfig(c => ({ ...c, affiliate: { ...c.affiliate, fallbackLandingUrl: e.target.value } }))} placeholder="https://your-domain.com/landing" />

          <div className="hstack" style={{ justifyContent: 'flex-end' }}>
            <button className="button" onClick={() => saveConfig(config)} disabled={saving}>{saving ? 'Saving?' : 'Save'}</button>
          </div>
        </section>

        <section className="card col-6 vstack">
          <h3 style={{ margin: 0 }}>Social API Tokens</h3>
          <label className="label">Facebook Token</label>
          <input className="input" value={config.social.facebookToken ?? ''} onChange={e => setConfig(c => ({ ...c, social: { ...c.social, facebookToken: e.target.value } }))} placeholder="EAAB?" />

          <label className="label">Instagram Token</label>
          <input className="input" value={config.social.instagramToken ?? ''} onChange={e => setConfig(c => ({ ...c, social: { ...c.social, instagramToken: e.target.value } }))} placeholder="IGQVJ?" />

          <label className="label">Pinterest Token</label>
          <input className="input" value={config.social.pinterestToken ?? ''} onChange={e => setConfig(c => ({ ...c, social: { ...c.social, pinterestToken: e.target.value } }))} placeholder="pin-?" />

          <label className="label">YouTube API Key</label>
          <input className="input" value={config.social.youtubeApiKey ?? ''} onChange={e => setConfig(c => ({ ...c, social: { ...c.social, youtubeApiKey: e.target.value } }))} placeholder="AIza?" />

          <div className="hstack" style={{ justifyContent: 'flex-end' }}>
            <button className="button" onClick={() => saveConfig(config)} disabled={saving}>{saving ? 'Saving?' : 'Save'}</button>
          </div>
        </section>

        <section className="card col-12 vstack">
          <div className="hstack" style={{ justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0 }}>Agent Logs</h3>
            <span className="badge">Auto runs via cron</span>
          </div>
          <div className="vstack">
            {logs.length === 0 && <div className="label">No logs yet.</div>}
            {logs.map((l, idx) => (
              <div key={idx} className="hstack" style={{ gap: 8 }}>
                <code className="code" style={{ minWidth: 180 }}>{new Date(l.timestamp).toLocaleString()}</code>
                <span className="badge">{l.level}</span>
                <div>{l.message}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
