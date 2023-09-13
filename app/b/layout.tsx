export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grow w-full flex">
      <div className="w-[260px] min-h-full h-full max-h-full overflow-y-auto">
        <p>Your boards</p>
        {[
          {
            icon: "🚀",
            text: "Test board",
          },
        ].map(({ icon, text }) => (
          <div className="space-x-2">
            <span>{icon}</span>
            <span>{text}</span>
          </div>
        ))}
      </div>

      {children}
    </div>
  );
}
