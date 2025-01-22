import React, { useRef, useState } from "react";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";

import config from "@/lib/config/config";
import { Button } from "./ui/button";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed status : ${response.status} : ${errorText}`
      );
    }
    const data = await response.json();
    const { signature, expire, token } = data;

    return {
      signature: String(signature),
      expire: Number(expire),
      token: String(token),
    };
  } catch (error: any) {
    throw new Error(`Aunthetication request failed ${error?.message}`);
  }
};

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (FilePath: string) => void;
}) => {
  const { toast } = useToast();
  const IKUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (error: any) => {
    console.error(error);
    toast({
      title: "Image uploaded failed ",
      description: `Your image could not be uploaded. Please try again`,
      variant: "destructive",
    });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast({
      title: "Image uploaded successfully ",
      description: `${res.filePath} uploaded successfully`,
    });
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={IKUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="text-upload.png"
      />

      <Button
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault();

          if (IKUploadRef.current) {
            //@ts-ignore
            IKUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-base text-light-100">Upload a file</p>
        {file && <p className="upload-filename">{file.filePath}</p>}
      </Button>
      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
