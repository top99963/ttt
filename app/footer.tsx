import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 py-8 px-4">
      <div className="max-w-7xl mx-auto text-center text-gray-300">
        <p className="mb-4">© 2025 Travel Agency. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <Link href="/about" className="hover:text-white">
            เกี่ยวกับเรา
          </Link>
          <Link href="/contact" className="hover:text-white">
            ติดต่อเรา
          </Link>
          <Link href="/terms" className="hover:text-white">
            ข้อตกลงและเงื่อนไข
          </Link>
        </div>
      </div>
    </footer>
  );
}
