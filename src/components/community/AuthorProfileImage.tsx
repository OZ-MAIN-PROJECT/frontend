import { UserRound } from 'lucide-react';

interface AuthorProfileImageProps {
  size?: number;
  imageUrl?: string;
}

const AuthorProfileImage = ({ size = 30, imageUrl }: AuthorProfileImageProps) => {
  return imageUrl ? (
    <img src={imageUrl} alt="프로필 이미지" width={size} height={size} className="rounded-full object-cover" />
  ) : (
    <UserRound size={size} className="rounded-full text-gray-400 bg-primary-500 p-1" />
  );
};

export default AuthorProfileImage;
