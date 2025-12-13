

export function ArtsCulture() {
  // Define the music and theatre program details
  const musicProgram = {
    title: "Music Geniuses",
    description:
      "The ensemble programs at The Scholar's Academy, both instrumental and choral, offer numerous performance opportunities to all students, regardless of their level of expertise.",
    buttonText: "See Videos",
    backgroundImage: "/images/PhotoMomemts/IMG_20230811_1241322-300x225.jpg", // Make sure this image path is correct
    galleryImages: [
      "/images/PhotoMomemts/P1050793-scaled.jpg",
      "/images/PhotoMomemts/P1050793-scaled.jpg",
      "/images/PhotoMomemts/P1050793-scaled.jpg",
      "/images/PhotoMomemts/P1050793-scaled.jpg",
    ],
  };

  const theatreProgram = {
    title: "Theatre",
    description:
      "The Scholar's Academy’s theatre program includes teacher-directed plays and many student-directed one-act plays. Courses cover acting, directing, public speaking, Shakespeare, and play production.",
    buttonText: "Theatre Videos",
    backgroundImage: "/images/PhotoMomemts/IMG_20230811_1241322-300x225.jpg", // Make sure this image path is correct
    galleryImages: [
      "/images/PhotoMomemts/P1050793-scaled.jpg",
      "/images/PhotoMomemts/P1050793-scaled.jpg",
      "/images/PhotoMomemts/P1050793-scaled.jpg",
      "/images/PhotoMomemts/P1050793-scaled.jpg",
    ],
  };

  // Program Section Component
  const ProgramSection = ({
    title,
    description,
    buttonText,
    backgroundImage,
    galleryImages,
  }: any) => {
    return (
      <div className="w-full mb-20">
        {/* Hero Section */}
        <div className="relative w-full h-[420px] md:h-[500px] overflow-hidden p-6">
          {" "}
          {/* Added padding here */}
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />
          {/* Text Overlay */}
          <div className="relative h-full flex items-center justify-center px-6">
            <div className="text-center text-white max-w-xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
              <p className="mb-6 text-sm md:text-base leading-relaxed opacity-90">
                {description}
              </p>
              <button className="bg-white text-black px-8 py-2 rounded-full hover:bg-gray-200 transition-all shadow-md">
                {buttonText}
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 h-[220px] md:h-[260px] lg:h-[280px] px-4">
          {" "}
          {/* Added padding here */}
          {galleryImages.map((image: string, index: number) => (
            <div key={index} className="relative overflow-hidden p-2">
              {" "}
              {/* Added padding here */}
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

  // Main Component Return
  return (
    <section id="arts-culture" className="py-20 bg-white">
      <div className="container max-w-5xl mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Arts & Culture
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          The Arts & Culture programs at The Scholar's Academy provide a
          platform for students to explore their creative passions. Whether
          through music, theatre, or other art forms, students develop their
          artistic abilities and participate in a supportive community.
        </p>
      </div>

      {/* Program Sections */}
      <ProgramSection {...musicProgram} />
      <ProgramSection {...theatreProgram} />
    </section>
  );
}
