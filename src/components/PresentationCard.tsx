import Image from "next/image";

interface PresentationCardProps {
  title?: string;
}

export function PresentationCard({ title }: PresentationCardProps) {
  return (
    <div className="relative w-full h-full">
      <Image
        width={10000}
        height={10000}
        src={"/Images/Background.jpg"}
        alt=""
      />
      <span className="absolute opacity-70 w-full h-full z-10 bg-black top-0 flex justify-center items-center ">
        <h1 className="text-orange-500 text-5xl font-extrabold">{title}</h1>
      </span>
    </div>
  );
}
