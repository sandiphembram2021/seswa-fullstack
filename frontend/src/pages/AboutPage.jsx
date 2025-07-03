import React from 'react';
import { Calendar, Users, Award, BookOpen, Heart, Target } from 'lucide-react';

const AboutPage = () => {
  const objectives = [
    "To establish proper interaction among santal engineering students of all possible technical institutes and also with santal engineers.",
    "To circulate the necessary academic information through electronic media among santal engineering students like campus interview and jobs in Government & private sectors.",
    "To circulate other relevant information like scholarships issued by several Government organisations exclusive for SC/ST students which usually goes unnoticed.",
    "To look after the educational problems of Santal Engineering students.",
    "To encourage the 10+2 students to appear in different Entrance Examination.",
    "To assist and advice students regarding seat selection during WBJEE Counselling.",
    "To encourage Santali and English as the communicating language among all the Santal Engineering Students.",
    "To award top 3 rank holder Santal students in WBJEE (admitted in any institution) and also in IITJEE and AIEEE.",
    "To look after the proper implementation of reservation in under graduate, postgraduate courses and services.",
    "To promote Santal culture among Santal Engineering students.",
    "A magazine should be produced including the different topics-article, job details, dairy of annual events etc.",
    "To stand beside Santal society in problems which decelerate the advancement of society."
  ];

  const highlights = [
    {
      icon: Calendar,
      title: "Founded in 2003",
      description: "Started our journey on 31st August, 2003 at Bengal Engineering & Science University in Shibpur"
    },
    {
      icon: Users,
      title: "Strong Community",
      description: "Bringing all Santal Engineering Students on a single platform across West Bengal"
    },
    {
      icon: Heart,
      title: "Annual Events",
      description: "Annual Picnic in January and Freshers Welcome in October for community bonding"
    },
    {
      icon: Award,
      title: "Recognition Program",
      description: "Awards for top 3 rank holders in WBJEE, IITJEE and AIEEE examinations"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
            About Santal Engineering Students' Welfare Association - W.B.
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering Santal engineering students through unity, support, and cultural preservation since 2003.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {highlights.map((highlight, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <highlight.icon className="h-10 w-10 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{highlight.title}</h3>
              <p className="text-gray-600 text-sm">{highlight.description}</p>
            </div>
          ))}
        </div>

        {/* SESWA Profile */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6 flex items-center">
            <BookOpen className="h-6 w-6 text-primary-600 mr-3" />
            SESWA PROFILE
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-4">
              The Santal Engineering Students' Welfare Association (W.B.) started its journey on <strong>31st August, 2003</strong> at Bengal Engineering & Science University in Shibpur. When the Santal Engineering students of various colleges of West Bengal met to get together, bring all Santal Engineering Students on a single platform. Our basic idea behind this association is to keep contact with each other, so that we can help each other in times of need and other relevant incentives.
            </p>
            <p className="mb-4">
              Every year we organize <strong>annual Picnic during the last week of January</strong> and <strong>Freshers Welcome during October</strong> as get together to discuss and share our views. It has given rise to a very strong bond and communication among all Santal Engineering Students to form a massive concrete shape.
            </p>
          </div>
        </div>

        {/* Aims & Objectives */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6 flex items-center">
            <Target className="h-6 w-6 text-primary-600 mr-3" />
            AIMS & OBJECTIVES
          </h2>
          <div className="space-y-4">
            {objectives.map((objective, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
                <p className="text-gray-700 leading-relaxed">{objective}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-primary-600 text-white rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Learn More About SESWA</h3>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Discover more about our strong network of Santal engineering students and professionals.
            Together, we can achieve greater heights while preserving our rich cultural heritage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
