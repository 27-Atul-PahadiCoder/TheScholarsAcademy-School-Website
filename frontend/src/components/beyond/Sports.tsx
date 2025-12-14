import React from "react";

type Program = {
  title: string;
  description: string;
  buttonText: string;
  backgroundImage: string;
  galleryImages: string[];
};

const ProgramSection: React.FC<Program> = ({
  title,
  description,
  buttonText,
  backgroundImage,
  galleryImages,
}) => {
  return (
    <div className="w-full mb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[420px] md:h-[500px] overflow-hidden p-6">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex items-center justify-center px-6">
          <div className="text-center text-white max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
            <p className="mb-6 text-sm md:text-base leading-relaxed opacity-90">
              {description}
            </p>
            <button className="bg-white/30 backdrop-blur-md text-white px-8 py-2 rounded-full hover:bg-white/40 transition-all shadow-md">
              {buttonText}
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 h-[220px] md:h-[260px] lg:h-[280px] px-4">
        {galleryImages.map((image, index) => (
          <div key={index} className="relative overflow-hidden p-2">
            <img
              src={image}
              alt={`${title} gallery ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export function Sports() {
  const outdoorSports: Program = {
    title: "Outdoor Sports",
    description:
      "From football and athletics to traditional games, students learn teamwork, discipline and resilience on the field.",
    buttonText: "View Highlights",
    backgroundImage: "/images/PhotoMomemts/P1050793-scaled.jpg",
    galleryImages: [
      "/images/PhotoMomemts/P1050793-scaled.jpg",
      "/images/PhotoMomemts/P1000759-scaled.jpg",
      "/images/PhotoMomemts/P1000687-scaled.jpg",
      "/images/PhotoMomemts/P1000681-scaled.jpg",
    ],
  };

  const indoorSports: Program = {
    title: "Indoor & Fitness",
    description:
      "Chess, table tennis, yoga and fitness routines ensure every child finds a way to stay active and focused.",
    buttonText: "See Activities",
    backgroundImage: "/images/PhotoMomemts/P1000694-scaled.jpg",
    galleryImages: [
      "/images/PhotoMomemts/P1000694-scaled.jpg",
      "/images/PhotoMomemts/P1040609-scaled.jpg",
      "/images/PhotoMomemts/P1050159-scaled.jpg",
      "/images/PhotoMomemts/P1050324-scaled.jpg",
    ],
  };

  const mosaicPhotos = [
    "/images/PhotoMomemts/P1050793-scaled.jpg",
    "/images/PhotoMomemts/P1050793-300x169.jpg",
  ];

  return (
    <section id="sports" className="py-20 bg-white">
      <div className="container max-w-5xl mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Sports</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          At The Scholar&apos;s Academy, sports are an essential part of
          holistic education. Our playgrounds and courts are buzzing with
          energy, fair play and school spirit throughout the year.
        </p>
      </div>

      <ProgramSection {...outdoorSports} />
      <ProgramSection {...indoorSports} />

      {/* Modern Sports Highlights Mosaic (full-width) */}
      <div className="w-full mt-6 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: testimonial card with full-cover background image */}
          <div className="relative rounded-2xl overflow-hidden shadow-md text-white">
            <img
              src="/images/PhotoMomemts/P1050793-scaled.jpg"
              alt="Sports testimonial"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-blue-900/60" />
            <div className="relative p-6 flex flex-col justify-between h-full">
              <div>
                <div className="text-xs opacity-80 mb-2">Coach&apos;s Note</div>
                <h3 className="text-3xl font-extrabold mb-3">Team Spirit</h3>
                <p className="text-sm leading-relaxed mb-6">
                  "On the ground, students learn resilience, respect and true
                  sportsmanship. Every match is a lesson in character."
                </p>
              </div>
              <div className="text-sm opacity-80">Sports Coordinator</div>
            </div>
          </div>

          {/* Middle: large image with overlay quote */}
          <div className="relative rounded-2xl overflow-hidden shadow-md">
            <img
              src={mosaicPhotos[0]}
              alt="Sports highlight"
              className="w-full h-full object-cover block"
              style={{ height: 360 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            <div className="absolute left-6 bottom-6 text-white max-w-xs">
              <h4 className="text-xl font-bold mb-2">
                "Sports day was an unforgettable experience for our child."
              </h4>
              <div className="text-sm opacity-90 text-gray-800">
                — Proud Parent
              </div>
            </div>
          </div>

          {/* Right column: two stacked tiles */}
          <div className="flex flex-col gap-6">
            <div className="relative rounded-2xl overflow-hidden shadow-md">
              <img
                src={mosaicPhotos[1]}
                alt="Students playing sports"
                className="w-full h-48 object-cover block"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparen
              t"
              />
              <div className="absolute left-4 bottom-4 text-white">
                <h5 className="text-lg font-semibold">
                  "Every student finds a game they love."
                </h5>
                <div className="text-xs opacity-90">— Games Teacher</div>
              </div>
            </div>

            <div className="rounded-2xl bg-gray-100 text-gray-800 p-5 shadow-md flex flex-col justify-between">
              <div className="text-xs opacity-80 mb-3">Highlight</div>
              <div>
                <h4 className="text-lg font-semibold mb-2">
                  Inter-house tournaments build healthy competition and
                  leadership.
                </h4>
                <div className="text-sm opacity-90">
                  From early morning practice to evening matches, students stay
                  active and motivated.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="card mt-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            <img
              src="/images/PhotoMomemts/P1050793-scaled.jpg"
              alt="Sports gallery 1"
              className="w-full h-40 rounded-lg object-cover"
            />
            <img
              src="/images/PhotoMomemts/P1000759-scaled.jpg"
              alt="Sports gallery 2"
              className="w-full h-40 rounded-lg object-cover"
            />
            <img
              src="/images/PhotoMomemts/P1000687-scaled.jpg"
              alt="Sports gallery 3"
              className="w-full h-40 rounded-lg object-cover"
            />
            <img
              src="/images/PhotoMomemts/P1000681-scaled.jpg"
              alt="Sports gallery 4"
              className="w-full h-40 rounded-lg object-cover"
            />
            <img
              src="/images/PhotoMomemts/P1000694-scaled.jpg"
              alt="Sports gallery 5"
              className="w-full h-40 rounded-lg object-cover"
            />
            <img
              src="/images/PhotoMomemts/P1040609-scaled.jpg"
              alt="Sports gallery 6"
              className="w-full h-40 rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
