import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";    

import { S3ClientConfig } from "@aws-sdk/client-s3";   

    
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function UploadFileToS3(awscreds: S3ClientConfig, ibucketName: string, ikey: string, ifileContent: any) {
    

const uploadFileToS3 = async (bucketName: string = ibucketName, key: string = ikey, fileContent: string = ifileContent) => {
// Create S3 client
const s3Client = new S3Client({
    ...awscreds,
   
});

//  endpoint: "https://imageshareap-4144cog9q543u8pu368o3cd6imm1qeuw2a-s3alias", // LocalStack S3 endpoint
// forcePathStyle: true, // Required for LocalStack

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
} catch (error) {
    console.error("Error uploading file", error);
}
  };

//const bucketName = "my-bucket";
//const key = "my-file.txt";
//const fileContent = "This is the content of my file";

uploadFileToS3(ibucketName, ikey, ifileContent);

}

export default UploadFileToS3;