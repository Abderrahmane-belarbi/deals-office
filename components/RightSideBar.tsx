'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RightSideBar() {
  const sidebardata = [
    { title: "الرئيسية", link: "/" },
    { title: "قائمة المشاريع", link: "/deals-list" },
    { title: "إنشاء مشروع", link: "/new-deal" },
    { title: "ملف الشخصي", link: "/profile" },
    { title: "تعديل مشروع", link: "/edit-deal" },
  ];

  const pathname = usePathname();

  return (
    <aside className="bg-mainHeaderInLight text-white w-[250px] p-6">
      <nav className="flex flex-col gap-4">
        {sidebardata.map((data) => {
          const isActive = pathname === data.link;
          return (
            <Link key={data.link} href={data.link} className={`block p-3 px-6 rounded-lg text-lg font-medium transition-colors ${
              isActive
                ? 'bg-indigo-500 text-white'
                : 'hover:bg-gray-700 text-gray-300'
            }`}>
              <p dir="rtl" className="font-marhey">{data.title}</p>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
