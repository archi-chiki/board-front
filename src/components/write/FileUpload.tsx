import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { useDropzone } from "react-dropzone";

const DropzoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 2px dashed #007bff;
  border-radius: 8px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &.active {
    border-color: #00e676;
    background-color: #e3f2fd;
  }
`;

const FileListContainer = styled.div`
  margin-top: 20px;
`;

const FileListTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
`;

const FileList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const FileItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;

  &:hover {
    background-color: #f1f1f1;
    transition: background-color 0.2s ease-in-out;
  }
`;

const FileName = styled.span`
  font-weight: bold;
`;

const FileSize = styled.span`
  color: #666;
`;

interface FileUploadProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function FileUpload({ files, setFiles }: FileUploadProps) {
  // 드래그 앤 드롭 및 파일 선택 핸들러
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files, setFiles],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: undefined,
    multiple: true,
  });

  return (
    <div>
      <DropzoneContainer {...getRootProps()} className={isDragActive ? "active" : ""}>
        <input {...getInputProps()} />
        파일을 업로드하세염
      </DropzoneContainer>

      {files.length > 0 && (
        <FileListContainer>
          <FileListTitle>선택된 파일</FileListTitle>
          <FileList>
            {files.map((file, index) => (
              <FileItem key={index}>
                <FileName>{file.name}</FileName>
                <FileSize>({(file.size / (1024 * 1024)).toFixed(2)} MB)</FileSize>
              </FileItem>
            ))}
          </FileList>
        </FileListContainer>
      )}
    </div>
  );
}
