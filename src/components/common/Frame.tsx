const Frame = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-white rounded-2xl p-7">
            {children}
        </div>
    )
}
export default Frame;