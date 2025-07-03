import React, { useState } from 'react';
import { FileText, Briefcase, GraduationCap, BookOpen, TrendingUp, Download, Heart, Eye, Calendar, Star } from 'lucide-react';
import { useResources } from '../hooks/useResources';
import ResourceFilters from '../components/ResourceFilters';
import ResourceCard from '../components/ResourceCard';
import ResourceModal from '../components/ResourceModal';
import Pagination from '../components/Pagination';
import homeImage from '../assets/home.jpg';
import image1 from '../assets/DSC_0442.JPG';

const ResourcesPage = () => {
  const { resources, loading, error, pagination, searchResources, loadPage, likeResource, downloadResource } = useResources();
  const [selectedResource, setSelectedResource] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [liking, setLiking] = useState(false);

  const handleResourceClick = (resource) => {
    setSelectedResource(resource);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedResource(null);
  };

  const handleFilter = (filters) => {
    searchResources(filters);
  };

  const handleClearFilters = () => {
    searchResources({});
  };

  const handlePageChange = (page) => {
    loadPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLike = async (resourceId) => {
    setLiking(true);
    await likeResource(resourceId);
    setLiking(false);
  };

  const handleDownload = async (resourceId) => {
    await downloadResource(resourceId);
  };

  // Magazine data
  const magazines = [
    {
      id: 1,
      title: 'BERA TARAS 2016',
      subtitle: 'Annual E-Magazine',
      year: '2016',
      description: 'Our annual magazine featuring student articles, cultural events, academic achievements, and community stories from 2016.',
      coverImage: homeImage,
      pdfPath: '/assets/BERA TARAS 2016 e-magazine.pdf',
      fileSize: '15.2 MB',
      pages: 48,
      downloads: 1250,
      rating: 4.8,
      featured: true,
      publishedDate: '2016-12-15',
      highlights: [
        'Annual Picnic Coverage',
        'Student Achievement Stories',
        'Cultural Event Photos',
        'Alumni Success Stories',
        'Technical Articles'
      ],
      contents: [
        'Editorial Message',
        'SESWA Annual Report',
        'Cultural Events Gallery',
        'Student Articles',
        'Alumni Corner',
        'Technical Papers',
        'Photo Gallery'
      ]
    },
    {
      id: 2,
      title: 'BERA TARAS 2015',
      subtitle: 'Annual E-Magazine',
      year: '2015',
      description: 'A comprehensive collection of memories, achievements, and stories from the SESWA community in 2015.',
      coverImage: image1,
      pdfPath: '/assets/BERA TARAS 2015 e-magazine.pdf',
      fileSize: '12.8 MB',
      pages: 42,
      downloads: 980,
      rating: 4.6,
      featured: false,
      publishedDate: '2015-12-20',
      highlights: [
        'Freshers Welcome 2015',
        'Technical Workshop Reports',
        'Cultural Program Highlights',
        'Academic Excellence Awards',
        'Community Service Projects'
      ],
      contents: [
        'Welcome Message',
        'Year in Review',
        'Freshers Welcome',
        'Technical Workshops',
        'Cultural Programs',
        'Academic Achievements',
        'Community Outreach'
      ]
    }
  ];

  // Magazine handlers
  const handleDownloadMagazine = (magazine) => {
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = magazine.pdfPath;
    link.download = `${magazine.title.replace(/\s+/g, '_')}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log(`Downloaded: ${magazine.title}`);
  };

  const handleViewMagazine = (magazine) => {
    // Open PDF in new tab for viewing
    window.open(magazine.pdfPath, '_blank');
  };

  // Mock statistics for now
  const stats = [
    { icon: FileText, label: 'Study Materials', value: '150+', color: 'text-blue-600' },
    { icon: Briefcase, label: 'Job Opportunities', value: '45+', color: 'text-green-600' },
    { icon: GraduationCap, label: 'Internships', value: '30+', color: 'text-purple-600' },
    { icon: BookOpen, label: 'Magazines', value: magazines.length.toString(), color: 'text-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
            Learning Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access study materials, job opportunities, internships, and educational content
            curated by our community members and mentors.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <ResourceFilters
          onFilter={handleFilter}
          onClear={handleClearFilters}
          loading={loading}
        />

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 text-center">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        )}

        {/* Resources Grid */}
        {!loading && !error && (
          <>
            {resources.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {resources.map((resource) => (
                    <ResourceCard
                      key={resource._id}
                      resource={resource}
                      onClick={handleResourceClick}
                      onLike={handleLike}
                      onDownload={handleDownload}
                      liking={liking}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.pages}
                  onPageChange={handlePageChange}
                  loading={loading}
                />
              </>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or clearing the filters.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}

        {/* BERA TARAS Magazine Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
              BERA TARAS Magazine
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our annual e-magazines featuring student articles, cultural events,
              academic achievements, and community stories.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {magazines.map((magazine) => (
              <div key={magazine.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Magazine Header */}
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                    <div className="text-center text-white">
                      <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-80" />
                      <h3 className="text-2xl font-bold">{magazine.title}</h3>
                      <p className="text-primary-100">{magazine.subtitle}</p>
                    </div>
                  </div>
                  {magazine.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Magazine Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{magazine.year}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FileText className="h-4 w-4 mr-1" />
                        <span>{magazine.pages} pages</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Download className="h-4 w-4 mr-1" />
                        <span>{magazine.downloads}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium text-gray-700">{magazine.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{magazine.description}</p>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
                      {magazine.highlights.slice(0, 3).map((highlight, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                      {magazine.highlights.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{magazine.highlights.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Contents Preview */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Contents:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {magazine.contents.slice(0, 4).map((content, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1 h-1 bg-primary-500 rounded-full mr-2"></div>
                          {content}
                        </li>
                      ))}
                      {magazine.contents.length > 4 && (
                        <li className="text-gray-500 italic">...and more</li>
                      )}
                    </ul>
                  </div>

                  {/* File Info */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <FileText className="h-4 w-4 mr-2" />
                        <span>PDF Format</span>
                      </div>
                      <div className="text-gray-600">
                        Size: {magazine.fileSize}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleViewMagazine(magazine)}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Online
                    </button>
                    <button
                      onClick={() => handleDownloadMagazine(magazine)}
                      className="flex-1 border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Magazine Info */}
          <div className="mt-12 bg-primary-50 rounded-lg p-8 text-center">
            <BookOpen className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">About BERA TARAS</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              BERA TARAS is SESWA's annual e-magazine that captures the essence of our community.
              It features student writings, cultural event coverage, academic achievements, alumni success stories,
              and technical articles that reflect the vibrant spirit of our organization.
            </p>
          </div>
        </div>

        {/* Resource Modal */}
        <ResourceModal
          resource={selectedResource}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onLike={handleLike}
          onDownload={handleDownload}
          liking={liking}
        />
      </div>
    </div>
  );
};

export default ResourcesPage;
