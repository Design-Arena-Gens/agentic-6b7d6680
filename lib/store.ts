import { Config, LogItem } from './types';

// Ephemeral in-memory storage suitable for serverless demo
const globalAny = global as unknown as { __AFF_AGENT_STORE__?: { config: Config; logs: LogItem[] } };

if (!globalAny.__AFF_AGENT_STORE__) {
  globalAny.__AFF_AGENT_STORE__ = {
    config: { affiliate: {}, social: {} },
    logs: [],
  };
}

export function getConfig(): Config {
  return globalAny.__AFF_AGENT_STORE__!.config;
}

export function setConfig(next: Config) {
  globalAny.__AFF_AGENT_STORE__!.config = next;
}

export function getLogs(): LogItem[] {
  return globalAny.__AFF_AGENT_STORE__!.logs.slice(-300);
}

export function pushLog(level: LogItem['level'], message: string) {
  const item: LogItem = { timestamp: new Date().toISOString(), level, message };
  globalAny.__AFF_AGENT_STORE__!.logs.push(item);
  // Also mirror to server console for observability
  const prefix = level === 'error' ? '[ERROR]' : level === 'warn' ? '[WARN]' : '[INFO]';
  console.log(prefix, message);
}
