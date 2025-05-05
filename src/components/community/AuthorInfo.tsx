import { Author } from '../../types/Post';
import AuthorProfileImage from './AuthorProfileImage';

interface AuthorInfoProps {
  author: Author;
  size?: number;
  fontSize?: string;
  textColor?: string;
}

const AuthorInfo = ({ author, size = 30, fontSize = 'text-sm', textColor = 'text-primary-800' }: AuthorInfoProps) => {
  const { profileImageUrl, nickname } = author;

  return (
    <div className="flex items-center gap-2">
      <AuthorProfileImage profileImageUrl={profileImageUrl} size={size} altText={`${nickname}님의 프로필`} />
      <span className={`${fontSize} font-medium ${textColor}`}>{nickname}</span>
    </div>
  );
};

export default AuthorInfo;
