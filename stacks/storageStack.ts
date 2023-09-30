import { Bucket, StackContext } from "sst/constructs";

export default function storageStack({ stack }: StackContext) {
  const bucket = new Bucket(stack, "restoreai-images", {
    cors: [
      {
        allowedHeaders: ["*"],
        allowedMethods: ["GET", "POST", "DELETE"],
        allowedOrigins: ["*"],
        maxAge: '1 day',
      },
    ],
  });
  return bucket;
}
