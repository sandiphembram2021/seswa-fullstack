import React, { useState } from 'react';
import { Users, TrendingUp, MapPin, GraduationCap } from 'lucide-react';
import { useMembers } from '../hooks/useMembers';
import MemberFilters from '../components/MemberFilters';
import MemberCard from '../components/MemberCard';
import MemberModal from '../components/MemberModal';
import Pagination from '../components/Pagination';

const MembersPage = () => {
  const { members, loading, error, pagination, searchMembers, loadPage } = useMembers();
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  const handleFilter = (filters) => {
    searchMembers(filters);
  };

  const handleClearFilters = () => {
    searchMembers({});
  };

  const handlePageChange = (page) => {
    loadPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Mock statistics for now
  const stats = [
    { icon: Users, label: 'Total Members', value: pagination.total || '500+', color: 'text-primary-600' },
    { icon: GraduationCap, label: 'Students', value: '420+', color: 'text-blue-600' },
    { icon: TrendingUp, label: 'Mentors', value: '80+', color: 'text-green-600' },
    { icon: MapPin, label: 'Districts', value: '15+', color: 'text-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
            Our Community Members
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with fellow Santal engineering students and mentors from across West Bengal.
            Build your network, find mentors, and grow together.
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
        <MemberFilters
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

        {/* Members Grid */}
        {!loading && !error && (
          <>
            {members.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {members.map((member) => (
                    <MemberCard
                      key={member._id}
                      member={member}
                      onClick={handleMemberClick}
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
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No members found</h3>
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

        {/* Member Modal */}
        <MemberModal
          member={selectedMember}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default MembersPage;
