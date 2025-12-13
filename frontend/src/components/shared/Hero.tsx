import { ChevronRight } from "lucide-react";

export function Hero() {
  return (
    <section className="py-12 lg:py-14" id="about">
      <div className="container">
        <div className="grid lg:grid-cols-[1.3fr_1.1fr] gap-10 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/8 text-blue-700 border border-blue-200 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <span className="text-xs uppercase tracking-widest">
                Inspiring • Educating • Empowering
              </span>
            </div>

            <h1 className="mb-3 leading-tight tracking-tight">
              A school where{" "}
              <span className="text-blue-700">
                every student is tracked, guided,
              </span>{" "}
              and celebrated every single day.
            </h1>

            <p className="text-gray-600 max-w-xl mb-5">
              The Scholar&apos;s Academy, Pithoragarh, blends strong academics
              with music, sports, yoga and character-building to help students
              reach their full potential in a safe, caring campus.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/3 border border-slate-400 border-dashed">
                <span>✓</span>
                <span className="text-sm text-gray-700">
                  Daily tracking &amp; reporting for each student
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/3 border border-slate-400 border-dashed">
                <span>✓</span>
                <span className="text-sm text-gray-700">
                  Academics + Dance &amp; Music + Sports + Yoga
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 items-center mb-6">
              <a
                href="#admissions"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-lightblue-700 text-white hover:bg-blue-800 transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-500/45"
              >
                <span>Start Admission Enquiry</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#academics"
                className="px-5 py-2.5 rounded-full bg-white/70 text-blue-900 border border-slate-400/70 hover:bg-blue-50 transition-colors"
              >
                Explore Academics
              </a>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                <span>
                  Parents describe us as &quot;one of the best schools in
                  Pithoragarh&quot;.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                <span>School timing: Mon–Sat • 8:30 AM – 3:00 PM</span>
              </div>
            </div>
          </div>

          <div>
            <div className="relative bg-gradient-to-br from-blue-200 to-blue-700 rounded-[28px] p-1.5 shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
              <div className="bg-slate-900 rounded-[24px] overflow-hidden relative group w-[400px] h-[400px] hover:scale-105 transition-all duration-300 ease-in-out">
                {/* Image with hover effect */}
                <img
                  src="/images/Faculty-Staff/smilePhoto.png"
                  alt="Background Image"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-80 transition-opacity duration-300"
                />

                {/* Glowing Effect on Hover */}
                <div className="absolute inset-0 rounded-[24px] bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 glow-effect"></div>
              </div>

              {/* Text section positioned outside of the image */}
              <div className="relative mt-4 px-4">
                {/* Improved Hover text */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-3xl font-semibold tracking-wide transform group-hover:translate-y-2 transition-all duration-300 ease-in-out">
                  Every child, every day
                </div>

                {/* Bottom caption (appears on hover) */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-200 text-xs mt-2 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/18 text-blue-200">
                    Every child, every day
                  </span>
                  <span className="hidden sm:inline">
                    Daily academic and behavior tracking ensures no student is
                    left behind.
                  </span>
                </div>

                {/* Floating card on the side */}
                <div className="mt-3 px-3 py-2.5 rounded-2xl bg-gray-50/96 shadow-lg text-xs min-w-[150px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-gray-900 mb-0.5">
                    Parent satisfaction
                  </div>
                  <div className="text-gray-600 text-[11px] mb-1.5">
                    Consistent feedback on the school's commitment and
                    responsibility towards students.
                  </div>
                  <div className="flex items-baseline gap-1 text-blue-900">
                    <span className="text-lg">96%</span>
                    <span className="text-[10px]">
                      parents willing to recommend*
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
