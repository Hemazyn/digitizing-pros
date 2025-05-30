import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
     cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request) {
     try {
          const { searchParams } = new URL(request.url);
          const resourceType = searchParams.get('resourceType');
          const folder = searchParams.get('folder');

          if (!resourceType || !folder) {
               return NextResponse.json({ error: 'Missing resourceType or folder query parameter' }, { status: 400 });
          }

          let resources;

          if (resourceType === 'image') {
               const result = await cloudinary.search
                    .expression(`resource_type:image AND folder:${folder}`)
                    .max_results(500)
                    .execute();
               resources = result.resources;
          } else if (resourceType === 'raw' && folder === 'digipros') {
               const result = await cloudinary.search
                    .expression(`resource_type:raw AND folder:${folder}`)
                    .max_results(500)
                    .execute();
               resources = result.resources;
          } else {
               return NextResponse.json({ error: 'Invalid resourceType or folder combination' }, { status: 400 });
          }

          return NextResponse.json(resources);
     } catch (error) {
          console.error('Error fetching Cloudinary resources:', error);
          return NextResponse.json({ error: 'Failed to fetch resources from Cloudinary' }, { status: 500 });
     }
}