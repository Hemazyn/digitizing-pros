require("dotenv").config();
const fs = require("fs");
const axios = require("axios");
const { v2: cloudinary } = require("cloudinary");
const { PDFDocument } = require("pdf-lib");

const EMBROIDERY_FORMATS = ['emb', 'dst', 'pes', 'jef', 'cnd', 'hus', 'ngs', 'exp'];

cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 👇 Function to check if PDF has embedded embroidery file
async function pdfHasEmbroidery(pdfUrl) {
     try {
          const response = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
          const pdfDoc = await PDFDocument.load(response.data);

          const namesDict = pdfDoc.catalog.get('Names');
          if (!namesDict) return false;

          const embeddedFiles = pdfDoc.context.lookup(namesDict).lookup('EmbeddedFiles');
          if (!embeddedFiles) return false;

          const entries = embeddedFiles.lookup('Names');
          for (let i = 0;i < entries.size();i += 2) {
               const filename = entries.get(i).value;
               const ext = filename.split('.').pop().toLowerCase();
               if (EMBROIDERY_FORMATS.includes(ext)) {
                    return true;
               }
          }
     } catch (err) {
          console.error(`❌ Error checking embroidery in PDF: ${pdfUrl}`, err.message);
     }

     return false;
}

// 👇 Main function to fetch all assets
async function fetchAssets() {
     let result = [];
     let nextCursor;

     console.log("🔍 Fetching PDFs and embroidery files...");

     // Fetch PDFs
     do {
          const response = await cloudinary.search
               .expression("folder:digipros AND format:pdf AND resource_type:image")
               .sort_by("public_id", "asc")
               .max_results(100)
               .next_cursor(nextCursor)
               .execute();

          result = result.concat(response.resources);
          nextCursor = response.next_cursor;
     } while (nextCursor);

     // Fetch embroidery files (resource_type: raw)
     nextCursor = undefined;
     do {
          const response = await cloudinary.search
               .expression(`folder:digipros AND (${EMBROIDERY_FORMATS.map(f => `format:${f}`).join(" OR ")}) AND resource_type:raw`)
               .sort_by("public_id", "asc")
               .max_results(100)
               .next_cursor(nextCursor)
               .execute();

          result = result.concat(response.resources);
          nextCursor = response.next_cursor;
     } while (nextCursor);

     // Build structured asset data
     const assetData = await Promise.all(result.map(async (file) => {
          const publicId = file.public_id;
          const format = file.format;
          const title = publicId.split("/").pop().replace(/_/g, " ");
          const url = file.secure_url;
          const type = format === "pdf" ? "pdf" : "embroidery";

          let hasEmbroidery = false;
          if (format === "pdf") {
               hasEmbroidery = await pdfHasEmbroidery(url);
          }

          return { title, format, type, url, hasEmbroidery };
     }));

     // Write output to file
     const output = `const assets = ${JSON.stringify(assetData, null, 2)};\n\nexport default assets;\n`;
     fs.writeFileSync("./src/app/constants/pdfFiles.js", output, "utf-8");

     console.log("✅ Asset list generated in src/app/constants/pdfFiles.js");
}

fetchAssets().catch((err) => {
     console.error("❌ Error fetching assets:", err);
});


// require("dotenv").config();
// const fs = require("fs");
// const { v2: cloudinary } = require("cloudinary");

// cloudinary.config({
//      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//      api_key: process.env.CLOUDINARY_API_KEY,
//      api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const EMBROIDERY_FORMATS = ['emb', 'dst', 'pes', 'jef', 'cnd', 'hus', 'ngs', 'exp'];

// async function fetchAssets() {
//      let result = [];
//      let nextCursor;

//      console.log("Fetching PDFs and embroidery files...");

//      do {
//           const response = await cloudinary.search
//                .expression("folder:digipros AND format:pdf AND resource_type:image")
//                .sort_by("public_id", "asc")
//                .max_results(100)
//                .next_cursor(nextCursor)
//                .execute();

//           result = result.concat(response.resources);
//           nextCursor = response.next_cursor;
//      } while (nextCursor);

//      nextCursor = undefined;

//      do {
//           const response = await cloudinary.search
//                .expression(
//                     `folder:digipros AND (${EMBROIDERY_FORMATS.map(f => `format:${f}`).join(" OR ")}) AND resource_type:raw`
//                )
//                .sort_by("public_id", "asc")
//                .max_results(100)
//                .next_cursor(nextCursor)
//                .execute();

//           result = result.concat(response.resources);
//           nextCursor = response.next_cursor;
//      } while (nextCursor);

//      // note - previous code was commented out
//      // const assetData = result.map((file) => {
//      //      const publicId = file.public_id;
//      //      const format = file.format;
//      //      const title = publicId.split("/").pop().replace(/_/g, " ");
//      //      const url = file.secure_url;
//      //      const type = format === "pdf" ? "pdf" : "embroidery";
//      //      return { title, format, type, url };
//      // });
//      // note - this code is commented out because it was not using the pdfHasEmbroidery function

//      const assetData = await Promise.all(result.map(async (file) => {
//           const publicId = file.public_id;
//           const format = file.format;
//           const title = publicId.split("/").pop().replace(/_/g, " ");
//           const url = file.secure_url;
//           const type = format === "pdf" ? "pdf" : "embroidery";
//           let hasEmbroidery = false;
//           if (format === "pdf") {
//                hasEmbroidery = await pdfHasEmbroidery(url);
//           }
//           return { title, format, type, url, hasEmbroidery };
//      }));


//      const output = `const assets = ${JSON.stringify(assetData, null, 2)};\n\nexport default assets;\n`;
//      fs.writeFileSync("./src/app/constants/pdfFiles.js", output, "utf-8");

//      console.log("✅ Asset list generated in src/app/constants/pdfFiles.js");
// }

// fetchAssets().catch((err) => {
//      console.error("❌ Error fetching assets:", err);
// });