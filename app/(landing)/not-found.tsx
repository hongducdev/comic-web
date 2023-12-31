import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-[500px] flex items-center justify-center flex-col">
      <h1>Không tìm thấy trang – 404!</h1>
      <div className="bg-emerald-500 text-white px-3 py-1 rounded-md">
        <Link href="/">Trở về trang chủ</Link>
      </div>
    </div>
  );
}
