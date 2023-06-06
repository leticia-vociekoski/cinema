interface SessionTypeCardProps {
  sessionTypes: string[];
}

export function SessionTypeCard({ sessionTypes }: SessionTypeCardProps) {
  return (
    <>
      {sessionTypes?.map((type) => (
        <span className=" bg-[#8CA315] px-2 py-1  font-bold text-xs rounded-xl ">
          {type}
        </span>
      ))}
    </>
  );
}
