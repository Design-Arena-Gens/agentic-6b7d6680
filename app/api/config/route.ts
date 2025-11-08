import { NextResponse } from 'next/server';
import { getConfig, setConfig, pushLog } from '../../../lib/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(getConfig());
}

export async function POST(req: Request) {
  const body = await req.json();
  setConfig(body);
  pushLog('info', 'Configuration updated');
  return NextResponse.json({ ok: true });
}
