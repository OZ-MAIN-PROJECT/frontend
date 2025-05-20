import ChangePasswordMenu from './ChangePasswordMenu';
import WithdrawMenu from './WithdrawMenu';

const UserMenu = () => {


  return (
    <div className="py-4">
      <ChangePasswordMenu />
      <WithdrawMenu />
    </div>
  );
};

export default UserMenu;
