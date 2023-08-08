async function fetchPage(page: number) {
  // artificial delay, 3s
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Create 5 fake items in a page
  const chunkItems = [1, 2, 3, 4, 5].map((i) => i + 5 * (page - 1));
  return chunkItems;
}

export default async function Chunk({ page }: { page: number }) {
  const chunkItems = await fetchPage(page);

  return (
    <div key={page}>
      {chunkItems.map((item) => (
        <p key={item}>Post {item}</p>
      ))}
    </div>
  );
}
