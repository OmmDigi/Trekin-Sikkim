// PromoSection.tsx
const PromoSection = () => {
    return (
      <section
        className="relative bg-cover bg-center bg-no-repeat py-20 px-4 md:px-12"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1950&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>
  
        <div className="relative z-10 max-w-5xl mx-auto text-white text-center md:text-left">
          <div className="inline-block bg-emerald-500 text-sm uppercase font-semibold px-3 py-1 rounded-full mb-4">
            How We Work
          </div>
  
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Book a trek easily with<br className="hidden md:block" />
            just a few steps
          </h2>
  
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 mb-6">
            <span className="px-5 py-2 border border-emerald-500 rounded-full text-sm font-medium hover:bg-emerald-500 hover:text-white transition">
              1. Find Your Trek
            </span>
            <span className="px-5 py-2 border border-emerald-500 rounded-full text-sm font-medium hover:bg-emerald-500 hover:text-white transition">
              2. Fillup The Form
            </span>
            <span className="px-5 py-2 border border-emerald-500 rounded-full text-sm font-medium hover:bg-emerald-500 hover:text-white transition">
              3. Get Ready For Adventure
            </span>
          </div>
  
          <hr className="border-white/30 my-6 max-w-md mx-auto md:mx-0" />
  
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition">
            Book Now
          </button>
        </div>
      </section>
    );
  };
  
  export default PromoSection;
  