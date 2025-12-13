export function CampusSection() {
  return (
    <section id="campus" className="py-10">
      <div className="container">
        <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-gray-600 mb-1">
              School Life
            </div>
            <h2>A safe, vibrant space for childhood</h2>
          </div>
          <p className="text-sm text-gray-600 max-w-md">
            From morning assembly to closing bell, students move through a
            well-organized day with space for learning, play and quiet
            reflection.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1.1fr] gap-5">
          {/* Main gallery image */}
          <div className="relative rounded-[18px] overflow-hidden shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
            <img
              src="/images/PhotoMomemts/schoolTwo.jpg"
              alt="Scholars engaged in classroom learning"
              className="w-full object-cover aspect-[16/9] lg:aspect-[16/9]" // Aspect ratio stays the same, but you can tweak here if necessary
              loading="lazy"
              decoding="async"
              sizes="(min-width: 1024px) 60vw, 90vw"
              width={1280}
              height={960}
            />
            <div className="absolute left-4 bottom-4 px-3 py-1.5 rounded-full bg-slate-900/88 text-gray-200 text-xs backdrop-blur-sm">
              Inside our learning spaces
            </div>
          </div>

          {/* Side column */}
          <div className="grid grid-rows-2 gap-3.5">
            {/* Small gallery image */}
            <div className="relative rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
              <img
                src="/images/PhotoMomemts/SchoolF.jpg"
                alt="Students at The Scholar's Academy"
                className="w-full object-cover aspect-[16/9]"
                loading="lazy"
                decoding="async"
                sizes="(min-width: 1024px) 35vw, 45vw"
                width={640}
                height={480}
              />
            </div>

            {/* Testimonial */}
            <div className="rounded-[18px] bg-gradient-to-br from-blue-50 to-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] border border-blue-200/90 text-sm text-gray-700">
              <div className="mb-2.5">
                &quot;The school is well organized and efficient. What keeps us
                coming back are the wonderful kids we get to teach and learn
                from every day — they are in the right hands.&quot;
              </div>
              <div className="text-gray-900">Ajay Oli</div>
              <div className="text-xs text-gray-600">
                Teacher, The Scholar&apos;s Academy
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
