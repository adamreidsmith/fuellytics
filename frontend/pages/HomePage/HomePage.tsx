import { useAuthContext } from 'context/AuthContext';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useCSRFToken } from 'services/authentication';
import RNPickerSelect from 'react-native-picker-select';
import { useState } from 'react';
import { useCars } from 'services/cars';

const HomePage = () => {
  const { logout, user } = useAuthContext();
  const [carModel, setCarModel] = useState(undefined);

  useCSRFToken();

  const { cars } = useCars();

  return (
    <View style={styles.container}>
      <Text>Hello {user?.username}</Text>
      <View>
        <RNPickerSelect
          value={carModel}
          onValueChange={(value: any) => setCarModel(value)}
          items={[
            { label: 'Football', value: 'football' },
            { label: 'Baseball', value: 'baseball' },
            { label: 'Hockey', value: 'hockey' },
          ]}
        />
      </View>
      <Button title="Logout" onPress={() => logout()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 4,
    marginTop: 4,
    width: '80%',
  },
  loginText: {
    fontSize: 16,
    color: '#91919F',
  },
  loginButton: {
    color: '#6536F9',
  },
  loginTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  altLogo: {
    height: 105,
    width: 320,
  },
  altLogoContainer: {
    marginBottom: 16,
  },
  error: {
    color: '#FF0000',
  },
});

export default HomePage;
