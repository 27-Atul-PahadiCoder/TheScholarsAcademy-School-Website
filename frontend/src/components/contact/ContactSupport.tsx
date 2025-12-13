
export function ContactSupport() {
  return (
    <section
      id="contact-support"
      className="py-20 bg-gradient-to-br from-indigo-100 via-indigo-50 to-white"
    >
      <div className="container max-w-6xl mx-auto px-6">
        {/* Header */}
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          Contact Us
        </h2>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto leading-relaxed">
          We'd love to hear from you! Reach out to our support team or get more
          information on our programs. Let us know how we can assist you.
        </p>

        {/* Contact Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Program Info
            </h3>
            <p className="text-lg text-gray-700">7525838880</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Admissions
            </h3>
            <p className="text-lg text-gray-700">7818018401</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Office
            </h3>
            <p className="text-lg text-gray-700">7818018401</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Student Emergency
            </h3>
            <p className="text-lg text-gray-700">7818018401</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-xl shadow-xl">
          <h3 className="text-3xl font-semibold text-gray-900 mb-8">
            Request Program Info
          </h3>
          <form action="#" method="POST" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-2 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-2 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="mt-2 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="mt-2 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-2 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-4 text-lg font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-lg"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Location Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Visit Us
          </h3>
          <p className="text-lg text-gray-700 mb-2">
            Main Branch: The Scholar's Academy
          </p>
          <p className="text-lg text-gray-700">
            District Hospital Road, Near Doctor's Colony, Pithoragarh
          </p>
          <p className="text-lg text-gray-700">Uttarakhand, 262501</p>
          <p className="text-lg text-gray-700 mt-4">
            <strong>Phone:</strong> +917525838880 | +919690609937
          </p>
          <p className="text-lg text-gray-700 mt-2">
            <strong>Email:</strong> Thescholarspithoragarh@gmail.com
          </p>
        </div>

        {/* Social Media Links */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Let's Get Social
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            We'd love to hear from you on our social network.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-indigo-600">
              <i className="fab fa-facebook-f text-2xl transition-all"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">
              <i className="fab fa-twitter text-2xl transition-all"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">
              <i className="fab fa-linkedin-in text-2xl transition-all"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">
              <i className="fab fa-youtube text-2xl transition-all"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">
              <i className="fab fa-google-plus-g text-2xl transition-all"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">
              <i className="fab fa-instagram text-2xl transition-all"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
