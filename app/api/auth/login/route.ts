import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username } = body as { username?: string };

    await new Promise((resolve) => setTimeout(resolve, 400));

    if (!username) {
      return NextResponse.json(
        { success: false, message: "กรุณากรอกชื่อผู้ใช้หรือเบอร์โทรศัพท์" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "เข้าสู่ระบบสำเร็จ ยินดีต้อนรับกลับค่ะ!",
      user: {
        id: "usr_998877",
        username,
        displayName: "คุณพีพี (VIP 3)",
        balance: 28450.75,
      },
      token: "mock_jwt_token_sport",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" },
      { status: 500 },
    );
  }
}
