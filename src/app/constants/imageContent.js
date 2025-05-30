export async function fetchImagesFromCloudinary() {
     try {
          const response = await fetch('/api/cloudinary?resourceType=image&folder=prosimages');
          if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          return data;
     } catch (error) {
          console.error('Error fetching images:', error);
          return []; // Return an empty array on error
     }
}