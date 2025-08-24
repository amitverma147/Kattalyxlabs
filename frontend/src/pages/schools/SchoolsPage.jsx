import { useState, useEffect, useCallback } from 'react';
import { Search, Filter, School, Grid3X3, List } from 'lucide-react';
import axios from 'axios';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import SchoolCard from '../../components/schools/SchoolCard';

const SchoolsPage = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const schoolTypes = [
    { value: '', label: 'All Types' },
    { value: 'university', label: 'University' },
    { value: 'college', label: 'College' },
    { value: 'school', label: 'School' },
    { value: 'institute', label: 'Institute' }
  ];

  const fetchSchools = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 12,
        verified: true
      };

      if (searchTerm) params.search = searchTerm;
      if (selectedType) params.type = selectedType;

      const response = await axios.get('/schools', { params });
      setSchools(response.data.schools);
      setTotalPages(response.data.totalPages);
      setError(null);
    } catch (err) {
      console.error('Error fetching schools:', err);
      setError('Failed to load schools. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedType, searchTerm]);

  useEffect(() => {
    fetchSchools();
  }, [currentPage, selectedType, fetchSchools]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchSchools();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Partner Institutions
          </h1>
          <p className="text-xl lg:text-2xl text-green-100 max-w-3xl mx-auto">
            Discover educational institutions hosting events and programs
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search institutions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
              >
                {schoolTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-green-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-green-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            <Button type="submit" className="px-6">
              Search
            </Button>
          </form>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-red-700 dark:text-red-400">
            {error}
          </div>
        </div>
      )}

      {/* Schools Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Institutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Top-rated educational institutions with exceptional event programs
            </p>
          </div>

          {schools.length === 0 ? (
            <div className="text-center py-12">
              <School className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Schools Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search criteria or filters.
              </p>
            </div>
          ) : (
            <>
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {schools.map((school) => (
                  <div
                    key={school._id}
                  >
                    <SchoolCard school={school} viewMode={viewMode} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    
                    {[...Array(totalPages)].map((_, i) => (
                      <Button
                        key={i + 1}
                        variant={currentPage === i + 1 ? 'primary' : 'outline'}
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                    
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Platform Statistics
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Our growing network of educational institutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Partner Institutions' },
              { number: '10,000+', label: 'Events Hosted' },
              { number: '100,000+', label: 'Students Reached' },
              { number: '50+', label: 'Countries' }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-green-100 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Want to Partner With Us?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our network of educational institutions and start hosting events that inspire and educate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-2xl transition-colors duration-200">
                Become a Partner
              </button>
              <button className="border-2 border-green-600 text-green-600 dark:text-green-400 hover:bg-green-600 hover:text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SchoolsPage;
