import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { getStudents } from "../services/studentApi";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";
import { Users, BookOpen, Award, TrendingUp } from "lucide-react";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    averageAge: 0,
    courses: {},
    recentActivity: []
  });

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const res = await getStudents();
      const data = (res && res.data && (Array.isArray(res.data) ? res.data : res.data.data)) || [];
      setStudents(data);
      
      // Calculate statistics
      if (Array.isArray(data) && data.length > 0) {
        const total = data.length;
        const averageAge = data.reduce((sum, student) => sum + parseInt(student.age || 0), 0) / total;
        const courses = data.reduce((acc, student) => {
          acc[student.course] = (acc[student.course] || 0) + 1;
          return acc;
        }, {});
        
        setStats({
          total,
          averageAge: averageAge.toFixed(1),
          courses,
          recentActivity: data.slice(-3).reverse() // Last 3 added
        });
      }
    } catch (err) {
      console.error("Error fetching students:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const topCourse = Object.entries(stats.courses).sort((a, b) => b[1] - a[1])[0] || ["None", 0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-600 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Student Management
              <span className="block text-yellow-100 text-3xl md:text-4xl mt-4">
                Simplified & Efficient
              </span>
            </h1>
            <p className="text-xl text-yellow-100 max-w-3xl mx-auto mb-8">
              Manage student records, track academic progress, and maintain comprehensive 
              student information with our intuitive platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-amber-700 font-semibold rounded-lg hover:bg-yellow-50 transition-all shadow-lg"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                View Dashboard
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-amber-700 mt-2">
                  {isLoading ? "..." : stats.total}
                </p>
                <p className="text-sm text-gray-500 mt-1">Registered in system</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-100 to-amber-100 flex items-center justify-center">
                <Users className="w-7 h-7 text-amber-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Age</p>
                <p className="text-3xl font-bold text-amber-700 mt-2">
                  {isLoading ? "..." : stats.averageAge}
                </p>
                <p className="text-sm text-gray-500 mt-1">Years</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-100 to-amber-100 flex items-center justify-center">
                <Award className="w-7 h-7 text-amber-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Popular Course</p>
                <p className="text-3xl font-bold text-amber-700 mt-2">
                  {isLoading ? "..." : topCourse[0]}
                </p>
                <p className="text-sm text-gray-500 mt-1">{topCourse[1]} students</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-100 to-amber-100 flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <StudentForm
                refresh={fetchStudents}
                selectedStudent={selectedStudent}
                clearSelection={() => setSelectedStudent(null)}
              />
              
              {/* Quick Guide */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-6 mt-6">
                <h3 className="font-semibold text-amber-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Quick Guide
                </h3>
                <ul className="space-y-3 text-sm text-amber-700">
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">✓</span>
                    <span>Add new students with complete information</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">✓</span>
                    <span>Edit existing records with one click</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">✓</span>
                    <span>Track student progress and course distribution</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">✓</span>
                    <span>Export data for academic reporting</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Student List Section */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mb-4"></div>
                <p className="text-gray-700 font-medium">Loading student records...</p>
                <p className="text-gray-500 text-sm mt-2">Please wait while we fetch your data</p>
              </div>
            ) : (
              <StudentList
                students={students}
                refresh={fetchStudents}
                setSelectedStudent={setSelectedStudent}
              />
            )}
            
            {/* Features Highlight */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
                <h4 className="font-semibold text-blue-800 mb-3">Secure & Reliable</h4>
                <p className="text-blue-700 text-sm">
                  All student data is securely stored with encrypted backup and regular security updates.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
                <h4 className="font-semibold text-green-800 mb-3">Real-time Updates</h4>
                <p className="text-green-700 text-sm">
                  Changes reflect instantly across all devices, ensuring everyone has the latest information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}