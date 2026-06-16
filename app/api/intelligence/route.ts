import { NextResponse } from 'next/server';
import { generateIntelligence } from '../../../lib/product-engine';
export async function POST(request: Request) { const body = await request.json().catch(() => ({})); return NextResponse.json(generateIntelligence({ input: typeof body.input === 'string' ? body.input : '' })); }
export async function GET() { return NextResponse.json(generateIntelligence({})); }
