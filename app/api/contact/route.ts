/**
 * Vellum & Vector — Next.js API Route (Proxy)
 * app/api/contact/route.ts
 *
 * Per spec: "app/api/contact/route.ts → proxies to Django backend"
 * This keeps the Django API URL server-side, preventing CORS issues
 * and hiding the backend URL from the browser.
 */

import { NextRequest, NextResponse } from "next/server";

const DJANGO_API_URL =
  process.env.DJANGO_API_URL ?? "http://localhost:8000";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Forward client's real IP address to Django for rate-limiting and DB auditing
    const clientIp = request.headers.get("x-forwarded-for") || (request as any).ip;
    if (clientIp) {
      headers["X-Forwarded-For"] = clientIp;
    }

    const djangoResponse = await fetch(`${DJANGO_API_URL}/api/contact/`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const data = await djangoResponse.json();

    return NextResponse.json(data, { status: djangoResponse.status });
  } catch (error) {
    console.error("[/api/contact] Failed to proxy to Django:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Service temporarily unavailable. Please try again or reach us on WhatsApp.",
      },
      { status: 503 }
    );
  }
}

