const UserMenu = () => {
    return (
      <div className="bg-white p-4 rounded shadow divide-y">
        <div className="flex justify-between py-2">
          <span>비밀번호 변경</span>
          <span>&gt;</span>
        </div>
        <div className="flex justify-between py-2 text-red-500">
          <span>회원탈퇴</span>
          <span>&gt;</span>
        </div>
      </div>
    );
  };
  
  export default UserMenu;
  