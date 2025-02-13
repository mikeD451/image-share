import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";    
import { S3ClientConfig } from "@aws-sdk/client-s3";   
    
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function UploadFileToS3(awscreds: S3ClientConfig, ibucketName: string, ikey: string, ifileContent: any): Promise<number> {
   
const uploadFileToS3 = async (bucketName: string = ibucketName, key: string = ikey, fileContent: string = ifileContent): Promise<number> => {
// Create S3 client
const s3Client = new S3Client({
    ...awscreds,
});
// Set upload parameters
const params = {
    Body: fileContent,
    Bucket: bucketName,
    Key: key,
    Region: "eu-west-2",
};

try {
    // Upload file to S3
    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);
    console.log("File uploaded successfully", response);
    return 0
} catch (error) {
    console.error("Error uploading file", error);
    return 2
}

  };

//const bucketName = "my-bucket";
//const key = "my-file.txt";
//const fileContent = "This is the content of my file";
//const retval = uploadFileToS3(ibucketName, ikey, ifileContent);

    const retval = await uploadFileToS3(ibucketName, ikey, ifileContent)
    switch( retval ) {
      case 0:
        return 0
        break;
      case 2:
        return 2
        break;
      default:
        return 8
        break;
    }
        
}
   
export default UploadFileToS3;