import Image from "next/image";

export default function Home() {
  return (
    <div className="cover-container flex flex-col items-center justify-center w-full h-full p-3 mx-auto">
      <main className="px-3 my-3 scroll">
        <h1 className="text-4xl font-bold mb-4">Content</h1>
        <p className="text-lg mb-4">
          <h3 className="text-2xl font-bold mb-2 mt-4">Rule 1</h3>
          Remember the human. Birbla is a place for creating community and
          belonging, not for attacking marginalized or vulnerable groups of
          people. Everyone has a right to use Birbla free of harassment,
          bullying, and threats of violence. Communities and users that incite
          violence or that promote hate based on identity or vulnerability will
          be banned.
        </p>
      </main>
    </div>
  );
}
