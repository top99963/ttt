import backgroundImage from "@/public/images/background.png";
import Image from "next/image";

function Background() {
  return (
    <div className="fixed h-screen w-screen -z-10">
      <Image
        className="absolute right-[200px] scale-200 bottom-0 top-0 translate-y-1/2"
        src={backgroundImage}
        alt="background"
      />
    </div>
  );
}

export default Background;
