import ChangePasswordMenu from './userMenu/ChangePasswordMenu';
import WithdrawMenu from './userMenu/WithdrawMenu';

const UserMenu = () => {


  return (
    <div className="py-4">
      <ChangePasswordMenu />
      <WithdrawMenu />
    </div>
  );
};

export default UserMenu;
