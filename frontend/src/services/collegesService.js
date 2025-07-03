import mockApi from './mockApi';

// Colleges service for fetching college and branch data
class CollegesService {
  // Get all colleges
  async getColleges() {
    try {
      const response = await mockApi.getColleges();
      return response.data.colleges;
    } catch (error) {
      console.error('Error fetching colleges:', error);
      return [];
    }
  }

  // Get branches for a specific college
  async getBranches(collegeId) {
    try {
      const response = await mockApi.getBranches(collegeId);
      return response.data.branches;
    } catch (error) {
      console.error('Error fetching branches:', error);
      return [];
    }
  }

  // Get college by ID
  async getCollegeById(collegeId) {
    try {
      const colleges = await this.getColleges();
      return colleges.find(college => college.id === collegeId) || null;
    } catch (error) {
      console.error('Error fetching college:', error);
      return null;
    }
  }
}

// Create singleton instance
const collegesService = new CollegesService();

export default collegesService;
