import "./page.css";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 font-sans">
      <section className="hero-section-container">
        <div className="hero-section-content">
          <h2 className="text-6xl font-bold">Temukan proyek dan lowongan</h2>
          <h2 className="text-6xl font-bold text-[#344F1F]">yang cocok untuk keahlianmu!</h2>
          
          <div className="flex justify-center mt-8">
            <form className="flex items-center rounded-xl bg-white shadow-lg">
              <input
                type="search"
                placeholder="Keahlian atau perusahaan"
                className="w-80 bg-transparent px-4 py-2 outline-none"
              />

              <button
                type="button"
                className="rounded-lg bg-primary px-6 py-2 transition hover:brightness-110"
              >
                Filter
              </button>
            </form>
          </div>
        </div>
      </section>
      <section className="cta-container">
        <div className="cta-content">
          <h1>CTA</h1>
        </div>
      </section>
    </main>
  );
}