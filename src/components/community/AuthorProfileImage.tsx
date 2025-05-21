import { UserRound } from 'lucide-react';

interface AuthorProfileImageProps {
  profileImageUrl?: string;
  altText?: string;
  size?: number;
}

const AuthorProfileImage = ({ profileImageUrl, altText, size = 30 }: AuthorProfileImageProps) => {
  const isValidImage = typeof profileImageUrl === 'string' && profileImageUrl.trim().length > 0;

  return isValidImage ? (
    <img
      src={profileImageUrl}
      alt={altText || '작성자 프로필 이미지'}
      width={size}
      height={size}
      className="rounded-full object-cover bg-gray-200"
    />
  ) : (
    <UserRound size={size} className="rounded-full text-gray-400 bg-primary-500 dark:bg-white/20 p-1" />
  );
};

export default AuthorProfileImage;
