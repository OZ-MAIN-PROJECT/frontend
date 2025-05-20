import { Author } from '@/types/Author';
import AuthorProfileImage from './AuthorProfileImage';

interface AuthorInfoProps {
  author: Author;
  size?: number;
  fontSize?: string;
  textColor?: string;
}

const AuthorInfo = ({ author, size = 30, fontSize = 'text-sm', textColor = 'text-primary-800' }: AuthorInfoProps) => {
  return (
    <div className="flex items-center gap-2">
      <AuthorProfileImage size={size} imageUrl={''} />
      <span className={`${fontSize} font-medium ${textColor}`}>{author.nickname}</span>
    </div>
  );
};

export default AuthorInfo;
