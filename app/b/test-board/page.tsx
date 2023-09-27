import BoardTitle from "@/components/board-title";

const BoardPage = () => {
  return (
    <div className="grow basis-0 shrink-0 flex flex-col relative items-baseline overflow-auto">
      <div className="flex items-center backdrop-blur-sm bg-black/[0.24] w-full max-w-full px-4 py-3 relative">
        <BoardTitle />
      </div>
    </div>
  );
};

export default BoardPage;
