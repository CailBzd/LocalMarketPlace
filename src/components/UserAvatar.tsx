import { Avatar, Dropdown, Menu, message } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const UserAvatar = ({ handleLogout }) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<SettingOutlined />}>
        <Link href="/profile">{t('profile')}</Link>
      </Menu.Item>
      <Menu.Item key="orders" icon={<ShoppingCartOutlined />}>
        <Link href="/orders">{t('orders')}</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        {t('logout')}
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomRight">
      <Avatar
        style={{ cursor: 'pointer' }}
        icon={<UserOutlined />}
      />
    </Dropdown>
  );
};

export default UserAvatar;
