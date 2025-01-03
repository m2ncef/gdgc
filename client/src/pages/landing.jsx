import { useEffect } from "react";
import { Link } from "react-router-dom";
import coderealogo from "../assets/logo.png";
import rafiki from "../assets/rafiki.png";
import icon from "../assets/_icon.png";
import feedback from "../assets/feedback.png";

const Landing = () => {
  useEffect(() => {
    // Add smooth scrolling for all links with href starting with #
    const handleSmoothScroll = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (href?.startsWith("#")) {
        e.preventDefault();
        const targetId = href.replace("#", "");
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = 80; // Adjust this value based on your header height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", handleSmoothScroll);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleSmoothScroll);
      });
    };
  }, []);

  return (
    <div className="min-h-screen  bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-md py-4 flex items-center justify-between px-7 py-4 font-inter">
        <div>
          <img src={coderealogo} alt="" />
        </div>
        <div class="md:flex hidden gap-10 text-base">
          <a href="" class="hover:text-[#078BFE] ">
            About us
          </a>
          <a href="" class="hover:text-[#078BFE] ">
            Our features
          </a>
          <a href="" class="hover:text-[#078BFE] ">
            Feedbacks
          </a>
          <a href="" class="hover:text-[#078BFE]">
            Preview Features
          </a>
        </div>
        <div class="flex gap-8">
          <a
            href="/register"
            class="bg-[#078BFE] px-3 py-1 rounded-md text-white"
          >
            Join us
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section class="md:flex items-center md:ml-[78px] py-24 md:h-[90vh]">
        <div class="md:w-[70%] flex flex-col md:items-start items-center">
          <h1 class="md:text-5xl text-3xl md:text-left text-center font-bold md:w-[625px] md:h-[240px]">
            <span class="bg-gradient-to-r text-transparent from-[#078BFE] to-green-300 font-sora bg-clip-text">
              Empowering Your Journey:
            </span>
            <br /> Discover Career Roadmaps and Skill-Building Courses to
            Achieve Your Goals!
          </h1>
        </div>
        <div>
          <img src={rafiki} class="md:w-[488px] md:h-[425px] md:mr-36" alt="" />
        </div>
      </section>
      <section class="bg-[#078BFE] text-white py-12 px-6">
        <div class="max-w-3xl mx-auto text-center">
          {/* Heading */}
          <h2 class="text-4xl font-bold mb-6">About us</h2>
          {/* paragraph */}
          <p class="text-lg leading-relaxed mb-6">
            At <span class="font-bold">Coderea</span>, we are passionate about
            helping individuals achieve their career goals. Whether you're
            starting fresh or enhancing your skills, we provide the tools and
            resources to guide you every step of the way.
          </p>
          <p class="text-lg leading-relaxed mb-6">
            Explore our comprehensive roadmaps to navigate your career path and
            access curated courses designed to develop the skills that matter
            most. Our mission is to make career growth accessible, achievable,
            and exciting for everyone.
          </p>
          {/*Call-to-action */}
          <p class="text-lg font-semibold">
            Join our community today and take the next step toward turning your
            aspirations into reality!
          </p>
        </div>
      </section>
      <section class="py-12 px-6 bg-gray-100">
        <div class="max-w-6xl mx-auto text-center">
          {/*Section Title */}
          <h2 class="text-4xl font-bold text-[#078BFE] mb-8">Our Features</h2>
          {/*grid layout */}
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/*Card 1 */}
            <div class="bg-white shadow-lg rounded-lg p-6 text-center">
              <div class="text-[#078BFE] text-5xl mb-4">
                {/*<!-- Replace with an icon (e.g., SVG or font icon) --> */}

                <img
                  src={icon}
                  class="flex items-center justify-center text-[#078BFE]  text-5xl mb-4 h-16 w-16 mx-auto"
                  alt=""
                />
              </div>
              <h3 class="text-lg font-bold mb-2">Career Roadmaps</h3>
              <p class="text-sm text-gray-600">
                Clear and structured pathways to guide you step-by-step toward
                achieving your career goals.
              </p>
            </div>
            {/*Card 2*/}
            <div class="bg-white shadow-lg rounded-lg p-6 text-center">
              <div class="text-[#078BFE] text-5xl mb-4">
                <img
                  src={icon}
                  class="flex items-center justify-center text-[#078BFE]  text-5xl mb-4 h-16 w-16 mx-auto"
                  alt=""
                />
              </div>
              <h3 class="text-lg font-bold mb-2">Skill-Building Courses</h3>
              <p class="text-sm text-gray-600">
                Curated courses designed to help you master the skills that
                matter most in your field.
              </p>
            </div>
            {/*Card 3 */}
            <div class="bg-white shadow-lg rounded-lg p-6 text-center">
              <div class="text-[#078BFE] text-5xl mb-4">
                <img
                  src={icon}
                  class="flex items-center justify-center text-[#078BFE]  text-5xl mb-4 h-16 w-16 mx-auto"
                  alt=""
                />
              </div>
              <h3 class="text-lg font-bold mb-2">Expert Guidance</h3>
              <p class="text-sm text-gray-600">
                Access insights and advice from industry professionals to
                accelerate your growth.
              </p>
            </div>
            {/*Card 4*/}
            <div class="bg-white shadow-lg rounded-lg p-6 text-center">
              <div class="text-[#078BFE] text-5xl mb-4">
                <img
                  src={icon}
                  class="flex items-center justify-center text-[#078BFE] 0 text-5xl mb-4 h-16 w-16 mx-auto"
                  alt=""
                />
              </div>
              <h3 class="text-lg font-bold mb-2">Progress Tracking</h3>
              <p class="text-sm text-gray-600">
                Easily monitor your journey and stay on top of your goals with
                our tracking tools.
              </p>
            </div>
          </div>
        </div>
        <div class="bg-gray-100 py-12">
          <h2 class="text-center text-2xl font-bold text-blue-500 mb-6">
            Feedbacks
          </h2>
          <div class="overflow-x-auto flex space-x-4 px-6">
            {/* Card 1 */}
            <div class="min-w-[300px] bg-white shadow-md rounded-lg p-4">
              <div class="flex items-center mb-4">
                <img
                  src={feedback}
                  alt=""
                  class="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 class="text-sm font-bold">James Smith</h3>
                  <p class="text-xs text-gray-500">
                    Original research & resources for everyone
                  </p>
                </div>
              </div>
              <p class="text-sm text-gray-700">
                "The career roadmap gave me a clear path to follow. It helped me
                stay focused and motivated as I moved from one milestone to the
                next."
              </p>
            </div>
            {/* Duplicate Cards */}
            <div class="min-w-[300px] bg-white shadow-md rounded-lg p-4">
              <div class="flex items-center mb-4">
                <img
                  src={feedback}
                  alt=""
                  class="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 class="text-sm font-bold">James Smith</h3>
                  <p class="text-xs text-gray-500">
                    Original research & resources for everyone
                  </p>
                </div>
              </div>
              <p class="text-sm text-gray-700">
                "The career roadmap gave me a clear path to follow. It helped me
                stay focused and motivated as I moved from one milestone to the
                next."
              </p>
            </div>
            <div class="min-w-[300px] bg-white shadow-md rounded-lg p-4">
              <div class="flex items-center mb-4">
                <img
                  src={feedback}
                  alt=""
                  class="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 class="text-sm font-bold">James Smith</h3>
                  <p class="text-xs text-gray-500">
                    Original research & resources for everyone
                  </p>
                </div>
              </div>
              <p class="text-sm text-gray-700">
                "The career roadmap gave me a clear path to follow. It helped me
                stay focused and motivated as I moved from one milestone to the
                next."
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer class="bg-blue-500 text-white py-6">
        <div class="container mx-auto text-center">
          <p class="text-sm">&copy; 2025 Coderea. All rights reserved.</p>
          <p class="text-sm mt-2">
            Designed with GDGC BATNA by{" "}
            <a href="#" class="underline hover:text-gray-200">
              DEV TEAM
            </a>
          </p>
          <p class="text-sm mt-2">
            <a href="#privacy" class="hover:text-gray-200">
              Privacy Policy
            </a>{" "}
            |
            <a href="#terms" class="hover:text-gray-200">
              Terms of Service
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
