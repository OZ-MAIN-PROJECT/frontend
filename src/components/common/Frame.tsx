interface FrameProps {
    children: React.ReactNode;
    className?: string;
  }
  
  const Frame = ({ children, className = "bg-white" }: FrameProps) => {
    return (
      <div className={`rounded-2xl p-7 ${className}`}>
        {children}
      </div>
    );
  };
  
  export default Frame;
  