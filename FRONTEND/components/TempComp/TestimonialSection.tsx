// TestimonialSection.tsx
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Sarah Jones",
    role: "Solo Trekker",
    message:
      "Absolutely breathtaking! The trek was well-organized, safe, and unforgettable. I highly recommend Glacier Treks.",
  },
  {
    name: "David Lee",
    role: "Group Leader",
    message:
      "Our group had the adventure of a lifetime. From the guides to the food, everything was top-notch.",
  },
  {
    name: "Emily Smith",
    role: "Nature Enthusiast",
    message:
      "Such an inspiring experience. The landscapes were surreal and the team was incredibly supportive.",
  },
];

const TestimonialSection = () => {
  return (
    <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-20 px-4 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all border border-white/10"
            >
              <FaQuoteLeft className="text-emerald-400 text-2xl mb-4" />
              <p className="text-base mb-6">{testimonial.message}</p>
              <h4 className="font-semibold text-lg">{testimonial.name}</h4>
              <span className="text-sm text-emerald-300">{testimonial.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
