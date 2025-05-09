import Link from "next/link";

function Page() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold">Demo</h1>
        <Link className="underline" href={"/demo/1"}>
          Demo_1
        </Link>
        <Link className="underline" href={"/demo/2"}>
          Demo_2
        </Link>
        <Link className="underline" href={"/demo/3"}>
          Demo_3
        </Link>
      </div>
    </div>
  );
}

export default Page;
