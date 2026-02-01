import { deleteStudent } from "../services/studentApi";
import React, { useState } from "react";

export default function StudentList({ students, refresh, setSelectedStudent }) {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student? This action cannot be undone.")) {
      setDeletingId(id);
      try {
        await deleteStudent(id);
        refresh();
      } catch (error) {
        console.error("Error deleting student:", error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  // Format student info for display
  const getCourseBadgeColor = (course) => {
    const colors = {
      "Computer Science": "bg-blue-100 text-blue-800",
      "Business Administration": "bg-green-100 text-green-800",
      "Engineering": "bg-purple-100 text-purple-800",
      "Medicine": "bg-red-100 text-red-800",
      "Arts & Humanities": "bg-pink-100 text-pink-800",
      "Mathematics": "bg-indigo-100 text-indigo-800",
      "Physics": "bg-cyan-100 text-cyan-800",
      "Other": "bg-gray-100 text-gray-800"
    };
    return colors[course] || colors["Other"];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Student Records</h2>
          <p className="text-gray-600 text-sm mt-1">
            {students.length} student{students.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <div className="text-sm text-gray-500">
          Total: <span className="font-semibold text-amber-600">{students.length}</span>
        </div>
      </div>

      {students.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">No Students Found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Add your first student by filling out the form above. All student records will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Student</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Course</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Age</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Contact</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr 
                  key={student._id} 
                  className="border-b border-gray-100 hover:bg-amber-50/50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-sm">
                          {student.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-500">ID: {student._id.substring(0, 8)}...</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCourseBadgeColor(student.course)}`}>
                      {student.course}
                    </span>
                  </td>
                  
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <span className="text-gray-700 font-medium">{student.age}</span>
                      <span className="text-gray-400 text-sm ml-1">years</span>
                    </div>
                  </td>
                  
                  <td className="py-4 px-4">
                    <a 
                      href={`mailto:${student.email}`}
                      className="text-sm text-amber-600 hover:text-amber-800 hover:underline flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {student.email}
                    </a>
                  </td>
                  
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="px-3 py-1.5 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      
                      <button
                        onClick={() => handleDelete(student._id)}
                        disabled={deletingId === student._id}
                        className="px-3 py-1.5 text-sm bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                      >
                        {deletingId === student._id ? (
                          <>
                            <svg className="animate-spin h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Deleting...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary Footer */}
      {students.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-100 mr-2"></span>
                <span>Computer Science: {students.filter(s => s.course === "Computer Science").length}</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-green-100 mr-2"></span>
                <span>Business: {students.filter(s => s.course === "Business Administration").length}</span>
              </div>
            </div>
            <div className="mt-2 sm:mt-0">
              <p className="text-gray-500">
                Average age: <span className="font-semibold text-amber-600">
                  {(students.reduce((sum, student) => sum + parseInt(student.age), 0) / students.length).toFixed(1)}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}