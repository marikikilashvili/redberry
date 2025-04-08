import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { endpoint: string } }
) {
  const { endpoint } = params;
  const token = process.env.API_TOKEN;
  const validEndpoints = [
    "tasks",
    "departments",
    "priorities",
    "statuses",
    "employees",
  ];

  if (!token) {
    return NextResponse.json(
      { error: "API token not configured" },
      { status: 500 }
    );
  }

  if (!validEndpoints.includes(endpoint)) {
    return NextResponse.json({ error: "Invalid endpoint" }, { status: 404 });
  }

  try {
    const response = await fetch(
      `https://momentum.redberryinternship.ge/api/${endpoint}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch ${endpoint}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { endpoint: string } }
) {
  const { endpoint } = params;
  const token = process.env.API_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "API token not configured" },
      { status: 500 }
    );
  }

  if (endpoint !== "tasks") {
    return NextResponse.json(
      { error: "Invalid endpoint for POST" },
      { status: 404 }
    );
  }

  try {
    const body = await request.json();
    const response = await fetch(
      `https://momentum.redberryinternship.ge/api/${endpoint}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to create task" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
