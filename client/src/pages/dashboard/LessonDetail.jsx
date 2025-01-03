import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { MapPin } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { courseData } from "./course"; // Import courseData

const LessonDetail = () => {
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState("online");
  const [activeLesson, setActiveLesson] = useState(0);

  // Add refs for sections
  const onlineRef = useRef(null);
  const inpersonRef = useRef(null);

  // Update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for better trigger point

      if (onlineRef.current && inpersonRef.current) {
        const onlinePosition = onlineRef.current.offsetTop;
        const inpersonPosition = inpersonRef.current.offsetTop;

        if (scrollPosition >= inpersonPosition) {
          setActiveTab("inperson");
        } else if (scrollPosition >= onlinePosition) {
          setActiveTab("online");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Find the course from courseData
  const course = Object.values(courseData)
    .flatMap((category) => category.courses)
    .find((course) => course.id === parseInt(courseId));

  const currentLesson = course?.lessons[activeLesson];

  const scrollToSection = (sectionId) => {
    const sectionRef = sectionId === "online" ? onlineRef : inpersonRef;

    if (sectionRef.current) {
      const headerOffset = 120;
      const elementPosition = sectionRef.current.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.document.querySelector("main").scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveTab(sectionId);
    }
  };

  if (!course) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-800">Course not found</h1>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <div className="p-8">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {course.title}
        </h1>
        <div className="flex gap-12">
          <div className="text-center">
            <span className="block text-orange-500 font-bold text-xl">
              {course.cost}
            </span>
            <span className="text-sm text-gray-600">Cost</span>
          </div>
          <div className="text-center">
            <span className="block text-green-500 font-bold text-xl">
              {course.reward}
            </span>
            <span className="text-sm text-gray-600">Reward</span>
          </div>
        </div>
      </div>

      {/* Lesson Navigation */}
      {course.lessons?.length > 0 && (
        <div className="mb-8">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {course.lessons.map((lesson, index) => (
              <button
                key={lesson.id}
                onClick={() => setActiveLesson(index)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors duration-200 ${
                  activeLesson === index
                    ? "bg-[#078BFE] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                Lesson {index + 1}: {lesson.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-8 sticky top-0 bg-[#f9f9f9] z-10 py-4">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => scrollToSection("online")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium transition-colors duration-200 ${
                activeTab === "online"
                  ? "border-[#078BFE] text-[#078BFE]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Online Lesson
            </button>
            <button
              onClick={() => scrollToSection("inperson")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium transition-colors duration-200 ${
                activeTab === "inperson"
                  ? "border-[#078BFE] text-[#078BFE]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              In-Person Classes
            </button>
          </nav>
        </div>
      </div>

      {/* Online Lesson Section */}
      <section ref={onlineRef} className="mb-12 pt-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {currentLesson?.title}
        </h2>
        <div className="aspect-video w-full max-w-4xl mx-auto mb-6">
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src={currentLesson?.videoPlaylist}
            title={currentLesson?.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        {/* Quiz Button */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              /* Add quiz logic here */
            }}
            className="bg-[#078BFE] hover:bg-[#0570cb] text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            Take a Quiz
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          </button>
        </div>
      </section>

      {/* In-Person Section */}
      <section ref={inpersonRef} className="pt-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          In-Person Classes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Map Section */}
          <div className="bg-white rounded-lg shadow-lg p-4 h-[400px]">
            {/* Replace this with your actual map implementation */}
            <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
              Map will be displayed here
            </div>
          </div>

          {/* Schools List */}
          <div className="space-y-4">
            {course?.schools.map((school, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-3">
                  <MapPin className="text-[#078BFE] w-5 h-5 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-800">{school.name}</h3>
                    <p className="text-gray-600">{school.address}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LessonDetail;
