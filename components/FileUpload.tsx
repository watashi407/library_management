import React, { useRef, useState } from "react";
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";

import config from "@/lib/config/config";
import { Button } from "./ui/button";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { set } from "zod";
import { cn } from "@/lib/utils";

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  value?: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (FilePath: string) => void;
}

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
  type,
  accept,
  placeholder,
  folder,
  variant,
  value,
  onFileChange,
}: Props) => {
  const { toast } = useToast();
  const IKUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });
  const [progress, setProgress] = useState(0);

  const style = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };

  const onError = (error: any) => {
    console.error(error);
    toast({
      title: `${type} uploaded failed `,
      description: `Your ${type} could not be uploaded. Please try again`,
      variant: "destructive",
    });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast({
      title: `${type} uploaded successfully `,
      description: `${res.filePath} uploaded successfully`,
    });
  };

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "File size too large",
          description: "Please upload a file is less than 20MB in size ",
          variant: "destructive",
        });
        return false;
      }
    } else if (type === "video") {
      if (file.size > 100 * 1024 * 1024) {
        toast({
          title: "File size too large",
          description: "Please upload a file is less than 100MB in size ",
          variant: "destructive",
        });
        return false;
      }
    }

    return true;
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
        useUniqueFileName={true}
        validateFile={onValidate}
        onProgress={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percentage = Math.round((loaded / total) * 100);
          setProgress(percentage);
        }}
        folder={folder}
        accept={accept}
      />

      <Button
        className={cn("upload-btn", style.button)}
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
        {/* <p className={cn("text-base", style.placeholder)}>{placeholder}</p> */}
        {file && (
          <p className={cn("upload-filename", style.text)}>{file.filePath}</p>
        )}
      </Button>

      {progress > 0 && progress !== 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {file.filePath &&
        (type === "image" ? (
          <IKImage
            alt={file.filePath ?? ""}
            path={file.filePath ?? ""}
            width={500}
            height={300}
          />
        ) : type === "video" ? (
          <IKVideo
            path={file.filePath ?? ""}
            controls={true}
            className="h-96 w-full rounded-xl"
          />
        ) : null)}
    </ImageKitProvider>
  );
};

export default ImageUpload;
