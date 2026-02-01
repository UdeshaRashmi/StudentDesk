import React from "react";
import { Link } from "react-router-dom";
import { 
  Shield, Target, Users, Globe, 
  Award, TrendingUp, BookOpen, Zap,
  CheckCircle, Clock, Heart, Star
} from "lucide-react";

export default function About() {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Student-Centered Design",
      description: "Built with students' needs in mind, ensuring an intuitive and efficient experience.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with regular backups and encrypted data storage.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Real-time Analytics",
      description: "Monitor academic progress with live dashboards and detailed reports.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Access Anywhere",
      description: "Cloud-based platform accessible from any device with internet connection.",
      color: "from-amber-500 to-yellow-500"
    }
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "Former university professor with 15+ years in education technology.",
      avatar: "AJ"
    },
    {
      name: "Sarah Chen",
      role: "Lead Developer",
      bio: "Full-stack developer specializing in educational platforms and data systems.",
      avatar: "SC"
    },
    {
      name: "Michael Rodriguez",
      role: "Product Manager",
      bio: "Expert in user experience and academic workflow optimization.",
      avatar: "MR"
    },
    {
      name: "Emma Wilson",
      role: "Academic Advisor",
      bio: "Educational consultant focused on student success and engagement.",
      avatar: "EW"
    }
  ];

  const milestones = [
    { year: "2021", event: "Platform Concept & Research" },
    { year: "2022", event: "Beta Launch & User Testing" },
    { year: "2023", event: "Official Release v1.0" },
    { year: "2024", event: "Global Expansion & Partnerships" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-600 to-yellow-500">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About StudentsDesk
            </h1>
            <p className="text-xl text-yellow-100 max-w-3xl mx-auto mb-10">
              We're revolutionizing student management with innovative technology 
              designed to empower educators and students alike.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-amber-700 font-semibold rounded-lg hover:bg-yellow-50 transition-all shadow-lg"
              >
                Get Started
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Statement */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-8">
            At StudentsDesk, we believe that efficient student management shouldn't be a burden. 
            Our mission is to provide educational institutions with powerful, intuitive tools 
            that streamline administrative tasks, enhance student engagement, and drive academic success.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-amber-600">500+</div>
              <div className="text-sm text-gray-600 mt-2">Active Institutions</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-amber-600">50K+</div>
              <div className="text-sm text-gray-600 mt-2">Students Managed</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-amber-600">99.9%</div>
              <div className="text-sm text-gray-600 mt-2">Uptime</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-amber-600">24/7</div>
              <div className="text-sm text-gray-600 mt-2">Support</div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose StudentsDesk?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} text-white mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Journey</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-amber-500 to-yellow-500"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                      <div className="text-2xl font-bold text-amber-600 mb-2">{milestone.year}</div>
                      <p className="text-gray-700">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">{member.avatar}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <div className="text-amber-600 font-medium mb-3">{member.role}</div>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-amber-600 to-yellow-500 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Student Management?</h2>
          <p className="text-yellow-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of institutions that trust StudentsDesk for their academic management needs.
          </p>
          
        </div>
      </div>
    </div>
  );
}