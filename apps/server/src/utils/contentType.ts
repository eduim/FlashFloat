export const getContentType = (extension: string)=> {
 // Determine the content type based on the file extension
 let contentType;
 switch (extension) {
   case 'jpg':
   case 'jpeg':
     contentType = 'image/jpeg';
     break;
   case 'png':
     contentType = 'image/png';
     break;
   case 'gif':
     contentType = 'image/gif';
     break;
   case 'mp4':
     contentType = 'video/mp4';
     break;
   // Add more cases for other file extensions and their corresponding content types
   default:
     contentType = 'application/octet-stream'; // Default content type
 }
 return contentType
}




