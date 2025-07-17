import { NextRequest, NextResponse } from "next/server";
import { userSchema } from "@/app/lib/validations/userSchema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = userSchema.safeParse(body);

  console.log("User registered:", result);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.errors.map((err) => err.message) },
      { status: 400 }
    );
  }
  return NextResponse.json(
    { message: "User registered successfully" },
    { status: 201 }
  );
}
