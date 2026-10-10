import { NextResponse } from "next/server";
import { MEMBER } from "@/data/member";
import { DEMO_LOGIN_PHONE, isDemoLogin } from "@/lib/auth/demoLogin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body as { username?: string; password?: string };

    await new Promise((resolve) => setTimeout(resolve, 400));

    if (!username?.trim()) {
      return NextResponse.json(
        { success: false, message: "กรุณากรอกชื่อผู้ใช้หรือเบอร์โทรศัพท์" },
        { status: 400 },
      );
    }

    if (!password) {
      return NextResponse.json(
        { success: false, message: "กรุณากรอกรหัสผ่าน" },
        { status: 400 },
      );
    }

    if (!isDemoLogin(username, password)) {
      return NextResponse.json(
        { success: false, message: "เบอร์โทรหรือรหัสผ่านไม่ถูกต้อง" },
        { status: 401 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "เข้าสู่ระบบสำเร็จ ยินดีต้อนรับกลับค่ะ!",
      user: {
        id: "demo-user-0999999999",
        username: DEMO_LOGIN_PHONE,
        displayName: MEMBER.displayName,
        balance: MEMBER.balance,
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
