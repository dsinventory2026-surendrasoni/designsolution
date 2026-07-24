"use client";

import { useState, useRef, useEffect } from "react";
import { siteConfig as staticSiteConfig } from "@/data/siteConfig";
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from "lucide-react";

export default function TestimonialsSection({ testimonials: propTestimonials }) {
  const testimonials = propTestimonials || staticSiteConfig.testimonials;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-24 sm:py-32 navy-bg text-white relative overflow-hidden grain-overlay"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className="max-w-3xl text-center mx-auto transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <div className="eyebrow-label mb-4">
            <span>Verified Client Endorsements</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Trusted by Over <span className="champagne-gradient-text">3,200 Families & Enterprises</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-400 font-normal leading-relaxed max-w-2xl mx-auto">
            Hear from our homeowners, corporate tenants, and real estate investors on their journey with DS Group of Companies.
          </p>
        </div>

        {/* Editorial Testimonial Showcase */}
        <div className="mt-16 max-w-4xl mx-auto relative">
          <div
            className="p-8 sm:p-14 rounded-3xl relative overflow-hidden transition-all duration-500"
            style={{
              background: "var(--navy-mid)",
              border: "1px solid rgba(201,169,110,0.2)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)"
            }}
          >
            {/* Background Giant Quote Icon */}
            <div className="absolute top-6 right-8 text-amber-500/10 pointer-events-none">
              <Quote className="w-32 h-32 stroke-[1]" />
            </div>

            <div className="relative z-10 space-y-6">
              {/* Star Rating */}
              <div className="flex items-center gap-1.5">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Review Text */}
              <p
                className="text-lg sm:text-2xl text-slate-100 font-medium leading-relaxed italic"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                "{current.text}"
              </p>

              {/* Client Info & Controls Footer */}
              <div className="pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400/80 shadow-md"
                  />
                  <div>
                    <h4 className="text-base font-bold text-white font-outfit">
                      {current.name}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium">
                      {current.role}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 mt-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{current.propertyPurchased}</span>
                    </span>
                  </div>
                </div>

                {/* Slider Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevTestimonial}
                    className="p-3.5 rounded-full text-slate-300 hover:text-white transition-colors"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-3.5 rounded-full text-slate-300 hover:text-white transition-colors"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: currentIndex === idx ? "32px" : "8px",
                  background: currentIndex === idx ? "var(--champagne)" : "rgba(255,255,255,0.2)",
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
