import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
     cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request, { params }) {
     try {
          const publicId = params.publicId;

          if (!publicId) {
               return NextResponse.json({ error: 'Missing publicId in request' }, { status: 400 });
          }

          const resource = await cloudinary.api.resource(publicId, {
               pages: true,
               image_metadata: true,
               phash: true
          });

          if (!resource) {
               return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
          }

          return NextResponse.json(resource);
     } catch (error) {
          console.error(`Error fetching Cloudinary resource with public ID ${params.publicId}:`, error);
          if (error.http_code === 404) {
               return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
          }
          return NextResponse.json({ error: 'Failed to fetch resource details' }, { status: 500 });
     }
}