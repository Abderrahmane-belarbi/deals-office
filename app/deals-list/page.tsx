'use client'
import { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard"; // Import the ProjectCard component
import { RiMenuSearchLine } from "react-icons/ri";

const ProjectsList = () => {
  const [projects, setProjects] = useState<any>([]); // State to hold the projects
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]); // State to hold filtered projects

  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState<string | null>(null); // State to handle errors
  const [searchTerm, setSearchTerm] = useState<string>(""); // State to hold the search term

  // Function to fetch projects
  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/get-projects"); // Fetching from the API
      const result = await response.json(); // Parse JSON response

      if (response.ok) {
        setProjects(result.data); // Update the state with the fetched projects
      } else {
        setError(result.message || "Failed to fetch projects.");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("An error occurred while fetching projects.");
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  // Use useEffect to fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  // Function to handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter projects based on the search term
    const filtered = projects.filter((project: any) =>
      project.title.includes(term) ||
      project.fundingSource === term ||
      project.procedure === term
    );
    setFilteredProjects(filtered);
  };

  // Render the projects or show loading/error states
  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-2 items-center">
      <input
        type="text"
        placeholder="بحث عن مشروع..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="font-marhey border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />
      <RiMenuSearchLine size={30} className="text-mainHeaderInLight/50" />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project: any) => (
            <ProjectCard
              key={project._id}
              title={project.title}
              fundingSource={project.selectedSource}
              notificationDate={project.selectedDate}
              estimatedAmount={project.estimatedAmount}
              procedure={project.selectedProcedure}
              filePath={project.route}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
