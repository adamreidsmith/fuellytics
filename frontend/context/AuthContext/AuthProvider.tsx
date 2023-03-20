import { PropsWithChildren, FC, useMemo, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  useCurrentUser,
  useLogin,
  useLogout,
  useRegister,
} from '../../services/authentication';

import { AuthContext } from './AuthContext';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { navigate } = useNavigation();
  const { user, status, refetch } = useCurrentUser();

  const { mutateAsync: logout } = useLogout({
    onSuccess: (data) => {
      if (data.success) {
        refetch();
      }
    },
  });
  const { mutateAsync: login } = useLogin({
    onSuccess: (data) => {
      if (data.success) {
        refetch().then((response) => {
          if (response.data?.success) {
            navigate('HomePage' as never, {} as never);
          }
        });
      }
    },
  });
  const { mutateAsync: register } = useRegister({
    onSuccess: (data) => {
      if (data.success) {
        refetch().then((response) => {
          if (response.data?.success) {
            navigate('HomePage' as never, {} as never);
          }
        });
      }
    },
  });

  const value = useMemo(
    () => ({ user, login, register, logout, status }),
    [login, logout, register, status, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
