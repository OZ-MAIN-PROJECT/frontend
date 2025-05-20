interface SkeletonProps {
  width?: string;
  height?: string;
  rounded?: string;
  className?: string;
}

export const Skeleton = ({
  width = 'w-full',
  height = 'h-4',
  rounded = 'rounded-md',
  className = '',
}: SkeletonProps) => {
  return <div className={`bg-gray-200 dark:bg-gray-700 animate-pulse ${width} ${height} ${rounded} ${className}`}></div>;
};

interface SkeletonWrapperProps {
  width?: string;
  height?: string;
  rounded?: string;
  className?: string;
  children: React.ReactNode;
}

export const SkeletonWrapper = ({
  width = 'w-full',
  height = 'h-4',
  rounded = 'rounded-[20px]',
  className = 'flex flex-col',
  children,
}: SkeletonWrapperProps) => {
  return <div className={`bg-white dark:bg-gray-600 ${width} ${height} ${rounded} ${className}`}>{children}</div>;
};
