const MissionVision = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-10">
          {/* Mission Section */}
          <div className="bg-gray-50 rounded-lg p-8 border-x-4 border-emerald-500 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm">
              To continuously enhance our trekking services through the
              dedication of our experienced team, aiming to deliver high levels
              of customer satisfaction. We strive to create memorable
              experiences for our clients while also empowering our staff and
              uplifting local communities by involving them in our services. Our
              mission extends beyond tourism to promoting sustainable practices
              that preserve the natural beauty of Sikkim&apos;s mountains for future
              generations.
            </p>
          </div>

          {/* Vision Section */}
          <div className="bg-gray-50 rounded-lg p-8 border-x-4 border-emerald-500 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm">
              To become a trusted name in trekking experiences by offering
              valuable, unforgettable journeys that support local economies and
              encourage sustainable tourism. We envision every trek as an
              opportunity to create cherished memories and promote community
              growth through simple gestures like buying local souvenirs. By
              2030, we aim to be recognized as the most environmentally
              responsible trekking service in the Himalayan region, inspiring
              others to follow our model of community-integrated adventure
              tourism.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
