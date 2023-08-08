import { Suspense } from "react";

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomTimeout = (resolve: any) =>
  setTimeout(resolve, randomIntFromInterval(0, 2000));

function createStream(page: number) {
  const stream = new ReadableStream({
    async start(controller) {
      // push 5 items at random intervals
      await new Promise(randomTimeout);
      controller.enqueue(1 + 5 * (page - 1));

      await new Promise(randomTimeout);
      controller.enqueue(2 + 5 * (page - 1));

      await new Promise(randomTimeout);
      controller.enqueue(3 + 5 * (page - 1));

      await new Promise(randomTimeout);
      controller.enqueue(4 + 5 * (page - 1));

      await new Promise(randomTimeout);
      controller.enqueue(5 + 5 * (page - 1));

      controller.close();
    },
    pull(controller) {
      // We don't really need a pull in this example
    },
    cancel() {
      // This is called if the reader cancels,
      // so we should stop generating strings
    },
  });

  return stream;
}

async function Token({ reader }: { reader: ReadableStreamDefaultReader }) {
  const { done, value } = await reader.read();

  if (done) {
    return null;
  }

  return (
    <>
      <p>Post {value}</p>
      <RecursiveReader reader={reader} />
    </>
  );
}

function RecursiveReader({ reader }: { reader: ReadableStreamDefaultReader }) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Token reader={reader} />
    </Suspense>
  );
}

export default async function Chunk({ page }: { page: number }) {
  const stream = createStream(page);
  const reader = stream.getReader();
  return <RecursiveReader reader={reader} />;
}
