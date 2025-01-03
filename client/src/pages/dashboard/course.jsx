import { useState } from "react";
import { Code, Server, Paintbrush } from "lucide-react";
import { Link } from "react-router-dom";

const Arrow = () => (
  <div className="hidden lg:flex items-center justify-center">
    <div className="w-8 h-[2px] bg-[#078BFE]"></div>
    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-[#078BFE]"></div>
  </div>
);

const courseData = {
  frontend: {
    title: "Front-End Development",
    icon: <Code className="w-5 h-5" />,
    courses: [
      {
        id: 1,
        title: "HTML & CSS Fundamentals",
        description: "Learn the basics of web development",
        duration: "8 weeks",
        level: "Beginner",
        cost: "-10p",
        reward: "+10p",
        lessons: [
          {
            id: "1-1",
            title: "HTML Basics",
            videoPlaylist:
              "https://www.youtube.com/embed/videoseries?list=PL4cUxeGkcC9ivBf_eKCPIAYXWzLlPAm6G",
          },
          {
            id: "1-2",
            title: "CSS Fundamentals",
            videoPlaylist:
              "https://www.youtube.com/embed/videoseries?list=PL4cUxeGkcC9ivBf_eKCPIAYXWzLlPAm6G",
          },
        ],
        schools: [
          {
            name: "Tech Academy",
            address: "123 Tech Street, City",
            coordinates: { lat: 13.7563, lng: 100.5018 },
          },
        ],
      },
      {
        id: 2,
        title: "JavaScript Essentials",
        description: "Master modern JavaScript programming",
        duration: "10 weeks",
        level: "Intermediate",
        cost: "-10p",
        reward: "+10p",
        lessons: [
          {
            id: "2-1",
            title: "JavaScript Fundamentals",
            videoPlaylist:
              "https://www.youtube.com/embed/videoseries?list=PL4cUxeGkcC9haFPT7J25Q9GRB_ZkFrQAc",
          },
          {
            id: "2-2",
            title: "DOM Manipulation",
            videoPlaylist:
              "https://www.youtube.com/embed/videoseries?list=PL4cUxeGkcC9haFPT7J25Q9GRB_ZkFrQAc",
          },
        ],
        schools: [
          {
            name: "JS Academy",
            address: "456 Script Avenue, City",
            coordinates: { lat: 13.7563, lng: 100.5018 },
          },
        ],
      },
      {
        id: 3,
        title: "React Development",
        description: "Build modern web applications with React",
        duration: "12 weeks",
        level: "Advanced",
        cost: "-10p",
        reward: "+10p",
        lessons: [
          {
            id: "3-1",
            title: "React Basics",
            videoPlaylist:
              "https://www.youtube.com/embed/videoseries?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d",
          },
          {
            id: "3-2",
            title: "React Hooks",
            videoPlaylist:
              "https://www.youtube.com/embed/videoseries?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d",
          },
        ],
        schools: [
          {
            name: "React Institute",
            address: "789 Component Road, City",
            coordinates: { lat: 13.7563, lng: 100.5018 },
          },
        ],
      },
      {
        id: 8,
        title: "Vue.js Development",
        description: "Build dynamic web apps with Vue.js",
        duration: "10 weeks",
        level: "Intermediate",
        cost: "-10p",
        reward: "+10p",
        lessons: [
          {
            id: "8-1",
            title: "Vue.js Basics",
            videoPlaylist:
              "https://www.youtube.com/embed/videoseries?list=PL4cUxeGkcC9gQcYgjhBoeQH7wiAyZNrYa",
          },
          {
            id: "8-2",
            title: "Vue Components & Props",
            videoPlaylist:
              "https://www.youtube.com/embed/videoseries?list=PL4cUxeGkcC9gQcYgjhBoeQH7wiAyZNrYa",
          },
        ],
        schools: [
          {
            name: "Vue Academy",
            address: "101 Vue Street, City",
            coordinates: { lat: 13.7563, lng: 100.5018 },
          },
        ],
      },
      {
        id: 9,
        title: "Advanced CSS & Sass",
        description: "Master modern CSS techniques and Sass",
        duration: "8 weeks",
        level: "Advanced",
        cost: "-10p",
        reward: "+10p",
        lessons: [
          {
            id: "9-1",
            title: "Advanced CSS Features",
            videoPlaylist:
              "https://www.youtube.com/embed/videoseries?list=PL4cUxeGkcC9gQcYgjhBoeQH7wiAyZNrYa",
          },
          {
            id: "9-2",
            title: "Sass Framework",
            videoPlaylist:
              "https://www.youtube.com/embed/videoseries?list=PL4cUxeGkcC9gQcYgjhBoeQH7wiAyZNrYa",
          },
        ],
        schools: [
          {
            name: "CSS Masters Institute",
            address: "202 Style Avenue, City",
            coordinates: { lat: 13.7563, lng: 100.5018 },
          },
        ],
      },
    ],
  },
  backend: {
    title: "Back-End Development",
    icon: <Server className="w-5 h-5" />,
    courses: [
      {
        id: 4,
        title: "Node.js Fundamentals",
        description: "Server-side programming with Node.js",
        duration: "10 weeks",
        level: "Intermediate",
        cost: "-10p",
        reward: "+10p",
        lessons: [
          {
            id: "4-1",
            title: "Node.js Basics",
            videoPlaylist:
              "https://www.youtube.com/embed/videoseries?list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU",
          },
          {
            id: "4-2",
            title: "Express.js",
            videoPlaylist:
              "https://www.youtube.com/embed/videoseries?list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU",
          },
        ],
        schools: [
          {
            name: "Node Academy",
            address: "321 Server Lane, City",
            coordinates: { lat: 13.7563, lng: 100.5018 },
          },
        ],
      },
      {
        id: 5,
        title: "Database Design",
        description: "Master SQL and MongoDB",
        duration: "8 weeks",
        level: "Intermediate",
        cost: "-10p",
        reward: "+10p",
        lessons: [
          {
            id: "5-1",
            title: "SQL Fundamentals",
            videoPlaylist:
              "https://www.youtube.com/embed/videoseries?list=PL4cUxeGkcC9h77dJ-QJlwGlZlTd4ecZOA",
          },
          {
            id: "5-2",
            title: "MongoDB Basics",
            videoPlaylist:
              "https://www.youtube.com/embed/videoseries?list=PL4cUxeGkcC9h77dJ-QJlwGlZlTd4ecZOA",
          },
        ],
        schools: [
          {
            name: "Data Institute",
            address: "654 Query Street, City",
            coordinates: { lat: 13.7563, lng: 100.5018 },
          },
        ],
      },
      {
        id: 10,
        title: "Python Backend",
        description: "Build robust backends with Python",
        duration: "12 weeks",
        level: "Intermediate",
        cost: "-10p",
        reward: "+10p",
        lessons: [
          {
            id: "10-1",
            title: "Python for Backend",
            videoPlaylist:
              "https://www.youtube.com/embed/videoseries?list=PL4cUxeGkcC9gQcYgjhBoeQH7wiAyZNrYa",
          },
          {
            id: "10-2",
            title: "Django Framework",
            videoPlaylist:
              "https://www.youtube.com/embed/videoseries?list=PL4cUxeGkcC9gQcYgjhBoeQH7wiAyZNrYa",
          },
        ],
        schools: [
          {
            name: "Python Institute",
            address: "303 Python Road, City",
            coordinates: { lat: 13.7563, lng: 100.5018 },
          },
        ],
      },
      {
        id: 11,
        title: "Cloud Development",
        description: "Master AWS and cloud services",
        duration: "10 weeks",
        level: "Advanced",
        cost: "-10p",
        reward: "+10p",
        lessons: [
          {
            id: "11-1",
            title: "AWS Fundamentals",
            videoPlaylist:
              "https://www.youtube.com/embed/videoseries?list=PL4cUxeGkcC9gQcYgjhBoeQH7wiAyZNrYa",
          },
          {
            id: "11-2",
            title: "Cloud Architecture",
            videoPlaylist:
              "https://www.youtube.com/embed/videoseries?list=PL4cUxeGkcC9gQcYgjhBoeQH7wiAyZNrYa",
          },
        ],
        schools: [
          {
            name: "Cloud Academy",
            address: "404 Cloud Street, City",
            coordinates: { lat: 13.7563, lng: 100.5018 },
          },
        ],
      },
    ],
  },
  design: {
    title: "Graphic Design",
    icon: <Paintbrush className="w-5 h-5" />,
    courses: [
      {
        id: 6,
        title: "UI/UX Fundamentals",
        description: "Learn design principles and tools",
        duration: "8 weeks",
        level: "Beginner",
        cost: "-10p",
        reward: "+10p",
        lessons: [
          {
            id: "6-1",
            title: "UI Design Basics",
            videoPlaylist:
              "https://www.youtube.com/embed/videoseries?list=PL4cUxeGkcC9jxxef0kqpwg9Wr5NZH5T0A",
          },
          {
            id: "6-2",
            title: "UX Principles",
            videoPlaylist:
              "https://www.youtube.com/embed/videoseries?list=PL4cUxeGkcC9jxxef0kqpwg9Wr5NZH5T0A",
          },
        ],
        schools: [
          {
            name: "Design Academy",
            address: "147 UX Avenue, City",
            coordinates: { lat: 13.7563, lng: 100.5018 },
          },
        ],
      },
      {
        id: 7,
        title: "Advanced Design",
        description: "Master advanced design techniques",
        duration: "10 weeks",
        level: "Advanced",
        cost: "-10p",
        reward: "+10p",
        lessons: [
          {
            id: "7-1",
            title: "Advanced UI Patterns",
            videoPlaylist:
              "https://www.youtube.com/embed/videoseries?list=PL4cUxeGkcC9jxxef0kqpwg9Wr5NZH5T0A",
          },
          {
            id: "7-2",
            title: "Design Systems",
            videoPlaylist:
              "https://www.youtube.com/embed/videoseries?list=PL4cUxeGkcC9jxxef0kqpwg9Wr5NZH5T0A",
          },
        ],
        schools: [
          {
            name: "Advanced Design School",
            address: "258 Design Street, City",
            coordinates: { lat: 13.7563, lng: 100.5018 },
          },
        ],
      },
      {
        id: 12,
        title: "Motion Design",
        description: "Create engaging animations and motion graphics",
        duration: "8 weeks",
        level: "Intermediate",
        cost: "-10p",
        reward: "+10p",
        lessons: [
          {
            id: "12-1",
            title: "Animation Basics",
            videoPlaylist:
              "https://www.youtube.com/embed/videoseries?list=PL4cUxeGkcC9gQcYgjhBoeQH7wiAyZNrYa",
          },
          {
            id: "12-2",
            title: "Advanced Motion Graphics",
            videoPlaylist:
              "https://www.youtube.com/embed/videoseries?list=PL4cUxeGkcC9gQcYgjhBoeQH7wiAyZNrYa",
          },
        ],
        schools: [
          {
            name: "Motion Academy",
            address: "505 Animation Blvd, City",
            coordinates: { lat: 13.7563, lng: 100.5018 },
          },
        ],
      },
      {
        id: 13,
        title: "3D Design",
        description: "Learn 3D modeling and visualization",
        duration: "12 weeks",
        level: "Advanced",
        cost: "-10p",
        reward: "+10p",
        lessons: [
          {
            id: "13-1",
            title: "3D Modeling Basics",
            videoPlaylist:
              "https://www.youtube.com/embed/videoseries?list=PL4cUxeGkcC9gQcYgjhBoeQH7wiAyZNrYa",
          },
          {
            id: "13-2",
            title: "Advanced Rendering",
            videoPlaylist:
              "https://www.youtube.com/embed/videoseries?list=PL4cUxeGkcC9gQcYgjhBoeQH7wiAyZNrYa",
          },
        ],
        schools: [
          {
            name: "3D Design Institute",
            address: "606 3D Avenue, City",
            coordinates: { lat: 13.7563, lng: 100.5018 },
          },
        ],
      },
    ],
  },
};

// Export the courseData so it can be used in other components
export { courseData };

const Course = () => {
  const [activeSkill, setActiveSkill] = useState("frontend");

  const renderCourseRoadmap = (courses) => {
    return (
      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#078BFE] to-[#06b6d4] -translate-x-1/2 hidden lg:block" />

        <div className="space-y-12">
          {courses.map((course, index) => (
            <div key={course.id} className="relative">
              {/* Path Decoration */}
              {index !== courses.length - 1 && (
                <div className="absolute left-1/2 top-[100px] h-[100px] w-24 -translate-x-1/2 hidden lg:block">
                  <div className="h-full w-full border-l-4 border-dashed border-[#078BFE] animate-pulse" />
                </div>
              )}

              <div
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Course Card */}
                <Link
                  to={`/dashboard/courses/${course.id}`}
                  className="flex-1 group"
                >
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-[#078BFE]">
                    <div className="relative">
                      {/* Level Badge */}
                      <div className="absolute -top-3 -right-3">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            course.level === "Beginner"
                              ? "bg-green-100 text-green-600"
                              : course.level === "Intermediate"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {course.level}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#078BFE] transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {course.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-[#078BFE]">
                            {course.duration}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-orange-500">
                            {course.cost}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-green-500">
                            {course.reward}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Timeline Node */}
                <div className="hidden lg:flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#078BFE] to-[#06b6d4] shadow-lg transform hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-3xl">
                    {index + 1}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="flex items-center gap-4 mb-8">
        <svg
          className="w-10 h-10 text-[#078BFE]"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex-grow">
          <h1 className="text-2xl font-bold">Available Courses</h1>
          <p className="text-gray-600">
            Browse through our comprehensive learning paths
          </p>
        </div>
      </div>

      {/* Course Categories */}
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        {Object.entries(courseData).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setActiveSkill(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 
              ${
                activeSkill === key
                  ? "bg-[#078BFE] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            {value.icon}
            {value.title}
          </button>
        ))}
      </div>

      {/* Updated Course Listings */}
      <div className="space-y-16">
        {Object.entries(courseData).map(([key, { title, icon, courses }]) => (
          <div
            key={key}
            className={`transition-all duration-500 ${
              activeSkill === key ? "block opacity-100" : "hidden opacity-0"
            }`}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
              {icon}
              {title} Learning Path
            </h2>

            {renderCourseRoadmap(courses)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;
