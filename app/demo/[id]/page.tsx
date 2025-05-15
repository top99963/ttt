import Three from "./3";
import Two from "./2";
import One from "./1";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      {id === "1" && <One />}
      {id === "2" && <Two />}
      {id === "3" && <Three />}
    </div>
  );
}
