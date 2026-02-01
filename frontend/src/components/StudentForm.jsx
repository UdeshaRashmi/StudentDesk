import { useEffect, useState } from "react";
import React from "react";
import { addStudent, updateStudent } from "../services/studentApi";

export default function StudentForm({ refresh, selectedStudent, clearSelection }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
    age: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fill form when editing
  useEffect(() => {
    if (selectedStudent) {
      setForm(selectedStudent);
    }
  }, [selectedStudent]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (selectedStudent) {
        await updateStudent(selectedStudent._id, form);
        clearSelection();
      } else {
        await addStudent(form);
      }

      setForm({ name: "", email: "", course: "", age: "" });
      refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setForm({ name: "", email: "", course: "", age: "" });
    clearSelection();
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {selectedStudent ? "Update Student" : "Add New Student"}
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          {selectedStudent 
            ? "Update the student's information below" 
            : "Fill in the details to add a new student to the system"
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Full Name *
          </label>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
            placeholder="Enter full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email Address *
          </label>
          <input
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
            placeholder="student@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Course Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Course *
          </label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors bg-white"
            value={form.course}
            onChange={(e) => setForm({ ...form, course: e.target.value })}
            required
            disabled={isSubmitting}
          >
            <option value="">Select a course</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Business Administration">Business Administration</option>
            <option value="Engineering">Engineering</option>
            <option value="Medicine">Medicine</option>
            <option value="Arts & Humanities">Arts & Humanities</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Age Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Age *
          </label>
          <input
            type="number"
            min="16"
            max="60"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
            placeholder="e.g., 20"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            isSubmitting
              ? 'bg-amber-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600'
          } text-white shadow-md hover:shadow-lg`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            selectedStudent ? "Update Student" : "Add Student"
          )}
        </button>

        {selectedStudent && (
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* Form Status */}
      <div className="mt-4 text-sm text-gray-500">
        <p>Fields marked with * are required</p>
      </div>
    </form>
  );
}