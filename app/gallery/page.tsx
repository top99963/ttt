import Carousel from "./carousel";

function Page() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-zinc-500">
      <Carousel>
        {/* {Array.from({ length: 10 }).map((_, i) => (
          <Carousel.Item key={i}>
            <img
              className="w-full h-full object-cover"
              src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
              alt="Puppy"
            />
          </Carousel.Item>
        ))} */}
      </Carousel>
    </div>
  );
}

export default Page;
