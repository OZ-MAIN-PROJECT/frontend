interface CommunityTitleProps {
  title: string;
}

const CommunityTitle = ({ title }: CommunityTitleProps) => {
  return <h2 className="text-[30px] font-bold text-[#091033] mb-4">{title}</h2>;
};

export default CommunityTitle;
