import { Author } from '../../types/Post';
import AuthorProfileImage from './AuthorProfileImage';

interface AuthorInfoProps {
  author: Author;
}

const AuthorInfo = ({ author }: AuthorInfoProps) => {
  const { profileImageUrl, nickname } = author;

  return (
    <div className="flex items-center gap-2">
      <AuthorProfileImage profileImageUrl={profileImageUrl} altText={`${nickname}님의 프로필`} />
      <span className="text-sm font-medium text-primary-800">{nickname}</span>
    </div>
  );
};

export default AuthorInfo;
