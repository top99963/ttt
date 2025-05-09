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
    <div className="w-full h-full">
      Demo: {id}
      {id === "1" && <One />}
      {id === "2" && <Two />}
      {id === "3" && <Three />}
    </div>
  );
}
