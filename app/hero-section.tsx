import Image from "next/image";
import Link from "next/link";
import backgroundImage from "@/public/images/background.png";

const navs = [
  {
    title: "Take a Quiz",
    href: "/quiz",
  },
  {
    title: "Explore the Map",
    href: "/map",
  },
  {
    title: "Travel Journal",
    href: "/travel-journal",
  },
  {
    title: "Behind Bottles",
    href: "/behind-bottles",
  },
  {
    title: "Directory",
    href: "/directory",
  },
];

export default function HeroSection() {
  return (
    <section className="relative  flex flex-col items-center justify-center h-screen">
      <Image
        className="absolute right-[200px] scale-200"
        src={backgroundImage}
        alt="background"
      />
      <div className="relative z-10 text-left px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Lorem ipsum</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae
          magnam eum cum hic nobis quo repellat necessitatibus!
        </p>
        <div className="flex gap-2">
          {navs.map((nav) => (
            <Link key={nav.title} href={nav.href} className="btn">
              {nav.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
