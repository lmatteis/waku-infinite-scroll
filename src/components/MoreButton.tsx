"use client";

import { Suspense, useState, useTransition } from "react";
import { serve } from "waku/client";

const Chunk = serve<{ page: number }>("Chunk");

export function MoreButton() {
  const [page, setPage] = useState(1);

  function handleClick() {
    setPage((p) => {
      return p + 1;
    });
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        {[...Array(page).keys()].map((pageIdx) => {
          return <Chunk page={pageIdx + 1} key={pageIdx} />;
        })}
      </div>
      <button onClick={handleClick}>More Posts</button>
    </div>
  );
}
