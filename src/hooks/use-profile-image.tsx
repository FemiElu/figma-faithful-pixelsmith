
import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

export const useProfileImage = () => {
  const { updateProfileImage } = useContext(AuthContext);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type and size
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPEG or PNG image",
        variant: "destructive",
      });
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB
      toast({
        title: "File too large",
        description: "Image size should be less than 5MB",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    // Convert file to base64 string for storage
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result as string;
      
      // Update the profile image
      updateProfileImage(base64Image);
      
      setIsUploading(false);
      toast({
        title: "Profile image updated",
        description: "Your profile image has been successfully updated",
      });
    };
    
    reader.onerror = () => {
      setIsUploading(false);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image",
        variant: "destructive",
      });
    };
  };

  return {
    isUploading,
    handleImageUpload,
  };
};
