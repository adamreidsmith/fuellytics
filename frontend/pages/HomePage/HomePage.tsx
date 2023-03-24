import { Text, View, StyleSheet, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from 'context/AuthContext';
import { useCSRFToken } from 'services/authentication';
import RNPickerSelect from 'react-native-picker-select';
import { useState } from 'react';
import { useCars } from 'services/cars';

const HomePage = () => {
  const { navigate } = useNavigation();

  const { logout, user } = useAuthContext();
  const [carModel, setCarModel] = useState(undefined);

  useCSRFToken();

  const { cars } = useCars();
  // const items = [
  //   { label: 'Football', value: 'football' },
  //   { label: 'Baseball', value: 'baseball' },
  //   { label: 'Hockey', value: 'hockey' },
  // ];

  const items = [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../../assets/logos/car-logo-removebg-preview.png')}
        />
        <Image
          style={styles.logoname}
          source={require('../../assets/logos/fuellytics-high-resolution-logo-color-on-transparent-background-2-cut.png')}
        />
      </View>
      <View style={styles.content}>
        <Image
          style={styles.userpic}
          source={require('../../assets/icons/user.png')}
        />
        <Text style={styles.username}>Hello, {user?.username}</Text>
        <Text style={styles.contentheader}>Car Profile</Text>
        <View style={styles.line} />
        <View style={styles.cardetails}>
          {items.length === 0 ? (
            <View>
              <Text>No car registered.</Text>
              <Button
                title="Add Car"
                onPress={() => {
                  navigate('CarProfilePage' as never, {} as never);
                }}
              />
            </View>
          ) : (
            <RNPickerSelect
              value={carModel}
              onValueChange={(value: any) => setCarModel(value)}
              items={items}
            />
          )}
        </View>
        <View style={styles.button}>
          <Button title="Logout" onPress={() => logout()} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
  header: {
    position: 'absolute',
    width: 390,
    height: 152,
    left: 0,
    top: 0,
    backgroundColor: '#AAAAAA',
  },
  logo: {
    position: 'absolute',
    width: 70,
    height: 60,
    left: 26,
    top: 66,
  },
  logoname: {
    position: 'absolute',
    width: 250,
    height: 40,
    left: 126,
    top: 76,
  },
  content: {
    position: 'relative',
  },
  userpic: {
    position: 'absolute',
    height: 180,
    width: 180,
    left: 105,
    top: 170,
    borderRadius: 0,
  },
  username: {
    position: 'absolute',
    width: 278,
    height: 37,
    left: 57,
    top: 360,
    fontSize: 35,
    textAlign: 'center',
    color: '#000000',
  },
  contentheader: {
    position: 'absolute',
    width: 99,
    height: 20,
    left: 25,
    top: 430,
    fontSize: 20,
    color: '#000000',
  },
  line: {
    position: 'absolute',
    width: 335,
    height: 0,
    left: 25,
    top: 460,
    borderWidth: 1,
    borderColor: '#000000',
    borderStyle: 'solid',
  },
  cardetails: {
    position: 'absolute',
    height: 200,
    width: 335,
    left: 25,
    top: 470,
    backgroundColor: '#d3d3d3',
  },
  button: {
    position: 'absolute',
    height: 40,
    width: 120,
    left: 136,
    top: 700,
    borderRadius: 2,
    backgroundColor: '#AAAAAA',
  },
});

export default HomePage;
