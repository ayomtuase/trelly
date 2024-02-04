import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Link
        href="/b/test-board"
        className="font-medium text-lg text-white dark:text-black underline"
      >
        See a sample board
      </Link>
    </div>
  );
};

export default Page;
