import { NextResponse } from 'next/server';
import { runAgentOnce } from '../../../../lib/agent';
import { pushLog } from '../../../../lib/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  const res = await runAgentOnce();
  return NextResponse.json({ ok: true, ...res });
}

export async function POST() {
  try {
    const res = await runAgentOnce();
    return NextResponse.json({ ok: true, ...res });
  } catch (e: any) {
    pushLog('error', e?.message || 'Agent failed');
    return NextResponse.json({ ok: false, error: e?.message || 'Agent failed' }, { status: 500 });
  }
}
