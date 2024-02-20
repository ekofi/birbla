import Image from "next/image";

import Header from "../../comp/header";
import Footer from "../../comp/footer";

export default function Home() {
  return (
    <div className="cover-container flex flex-col items-center justify-center w-full h-full p-3 mx-auto">
      <Header />
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
          <h3 className="text-2xl font-bold mb-2 mt-4">Rule 2</h3>
          Abide by community rules. Post authentic content into communities
          where you have a personal interest, and do not cheat or engage in
          content manipulation (including spamming, vote manipulation, ban
          evasion, or subscriber fraud) or otherwise interfere with or disrupt
          Birbla communities.
          <h3 className="text-2xl font-bold mb-2 mt-4">Rule 3</h3>
          Respect the privacy of others. Instigating harassment, for example by
          revealing someone’s personal or confidential information, is not
          allowed. Never post or threaten to post intimate or sexually-explicit
          media of someone without their consent.
          <h3 className="text-2xl font-bold mb-2 mt-4">Rule 4</h3>
          Do not share or encourage the sharing of sexual, abusive, or
          suggestive content involving minors. Any predatory or inappropriate
          behavior involving a minor is also strictly prohibited.
          <h3 className="text-2xl font-bold mb-2 mt-4">Rule 5</h3>
          You don’t have to use your real name to use Birbla, but don’t
          impersonate an individual or an entity in a misleading or deceptive
          manner.
          <h3 className="text-2xl font-bold mb-2 mt-4">Rule 6</h3>
          Ensure people have predictable experiences on Birbla by properly
          labeling content and communities, particularly content that is
          graphic, sexually-explicit, or offensive.
          <h3 className="text-2xl font-bold mb-2 mt-4">Rule 7</h3>
          Keep it legal, and avoid posting illegal content or soliciting or
          facilitating illegal or prohibited transactions.
          <h3 className="text-2xl font-bold mb-2 mt-4">Rule 8</h3>
          Don’t break the site or do anything that interferes with normal use of
          Birbla.
        </p>
      </main>
      <Footer />
    </div>
  );
}
