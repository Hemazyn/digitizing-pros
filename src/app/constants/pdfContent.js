export async function fetchPdfsFromCloudinary() {
     try {
          const response = await fetch('/api/cloudinary?resourceType=raw&folder=digipros');
          if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          return data;
     } catch (error) {
          console.error('Error fetching PDFs:', error);
          return []; // Return an empty array on error
     }
}