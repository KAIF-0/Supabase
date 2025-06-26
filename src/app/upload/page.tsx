"use client";
import React, { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import storageService from "@/supabase/services/storage";

type FileObject = {
  id: string;
  name: string;
  bucket_id: string;
  owner: string;
  updated_at: string;
  created_at: string;
  last_accessed_at: string;
  metadata: object;
};

const Page = () => {
  const [file, setFile] = useState<File>();
  const [fileList, setFileList] = useState<FileObject[]>([]);

  useEffect(() => {
    try {
      storageService.getFile().then((data) => {
        console.log(data);
        setFileList(data);
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    }
  }, []);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    // console.log(file);
    setFile(file);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      const data = await storageService.addFile(file);
      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => handleChange(e)} />
      <button onClick={handleUpload}>Upload File</button>

      <pre>{JSON.stringify(fileList, null, 2)}</pre>
    </div>
  );
};

export default Page;
