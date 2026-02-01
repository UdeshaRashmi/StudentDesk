import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { getStudents } from "../services/studentApi";
import { 
  Users, BookOpen, GraduationCap, Calendar, 
  TrendingUp, BarChart3, Download, Filter,
  Award, Clock, Target, ChevronRight
} from "lucide-react";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    averageAge: 0,
    totalCourses: 0,
    recentAdditions: 0
  });

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const res = await getStudents();
      const data = (res && res.data && (Array.isArray(res.data) ? res.data : res.data.data)) || [];
      setStudents(data);
      
      // Calculate dashboard statistics
      if (data.length > 0) {
        const total = data.length;
        const averageAge = data.reduce((sum, student) => sum + parseInt(student.age || 0), 0) / total;
        const courses = [...new Set(data.map(student => student.course))];
        const recentAdditions = data.filter(student => {
          // Simulate recent additions (last 7 days)
          const daysAgo = Math.floor(Math.random() * 7);
          return daysAgo < 3;
        }).length;
        
        setStats({
          total,
          averageAge: averageAge.toFixed(1),
          totalCourses: courses.length,
          recentAdditions
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

  // Get course distribution
  const list = Array.isArray(students) ? students : (students && Array.isArray(students.data) ? students.data : []);

  const courseDistribution = list.reduce((acc, student) => {
    acc[student.course] = (acc[student.course] || 0) + 1;
    return acc;
  }, {});

  const topCourses = Object.entries(courseDistribution)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Get age groups
  const ageGroups = {
    '16-20': list.filter(s => s.age >= 16 && s.age <= 20).length,
    '21-25': list.filter(s => s.age >= 21 && s.age <= 25).length,
    '26-30': list.filter(s => s.age >= 26 && s.age <= 30).length,
    '31+': list.filter(s => s.age > 30).length
  };

  // Recent students
  const recentStudents = list.slice(-5).reverse();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-2">Comprehensive overview of student management</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <button className="flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg text-sm font-medium hover:from-amber-600 hover:to-yellow-600">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </button>
            </div>
          </div>
          
          {/* Time Range Selector */}
          <div className="flex space-x-2 mt-6">
            {['today', 'week', 'month', 'all'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-amber-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Students</p>
                <p className="text-3xl font-bold text-blue-900 mt-2">
                  {isLoading ? "..." : stats.total}
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  <span className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12% this month
                  </span>
                </p>
              </div>
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                <Users className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Average Age</p>
                <p className="text-3xl font-bold text-green-900 mt-2">
                  {isLoading ? "..." : stats.averageAge}
                </p>
                <p className="text-sm text-green-600 mt-1">Years per student</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                <Award className="w-7 h-7 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Active Courses</p>
                <p className="text-3xl font-bold text-purple-900 mt-2">
                  {isLoading ? "..." : stats.totalCourses}
                </p>
                <p className="text-sm text-purple-600 mt-1">Different programs</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-yellow-100 border border-amber-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-700">Recent Additions</p>
                <p className="text-3xl font-bold text-amber-900 mt-2">
                  {isLoading ? "..." : stats.recentAdditions}
                </p>
                <p className="text-sm text-amber-600 mt-1">Last 7 days</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                <Clock className="w-7 h-7 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Distribution */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Course Distribution</h2>
                <BarChart3 className="w-6 h-6 text-gray-400" />
              </div>
              <div className="space-y-4">
                {topCourses.map(([course, count]) => (
                  <div key={course} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-amber-500 mr-3"></div>
                      <span className="font-medium text-gray-700">{course}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className="bg-gradient-to-r from-amber-500 to-yellow-500 h-2 rounded-full"
                          style={{ width: `${(count / students.length) * 100}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-gray-900">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Age Distribution */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Age Group Distribution</h2>
                <Target className="w-6 h-6 text-gray-400" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(ageGroups).map(([group, count]) => (
                  <div key={group} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-amber-700">{count}</div>
                    <div className="text-sm text-gray-600 mt-1">{group} years</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Recent Activity & Quick Actions */}
          <div className="space-y-8">
            {/* Recent Students */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Students</h2>
                <Clock className="w-6 h-6 text-gray-400" />
              </div>
              <div className="space-y-4">
                {recentStudents.map((student) => (
                  <div key={student._id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center mr-3">
                        <span className="text-white font-bold">
                          {student.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.course}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </div>
              <Link 
                to="/" 
                className="block text-center mt-6 text-amber-600 hover:text-amber-800 font-medium"
              >
                View all students →
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-6">
              <h3 className="font-bold text-amber-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link 
                  to="/" 
                  className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow transition-all"
                >
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-amber-600 mr-3" />
                    <span className="font-medium text-gray-700">Add New Student</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
                <button className="flex items-center justify-between w-full p-3 bg-white rounded-lg hover:shadow transition-all">
                  <div className="flex items-center">
                    <GraduationCap className="w-5 h-5 text-amber-600 mr-3" />
                    <span className="font-medium text-gray-700">Generate Report</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                <button className="flex items-center justify-between w-full p-3 bg-white rounded-lg hover:shadow transition-all">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-amber-600 mr-3" />
                    <span className="font-medium text-gray-700">Schedule Tasks</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}