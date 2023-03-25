import { Text, View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from 'context/AuthContext';
import { useCSRFToken } from 'services/authentication';
import { useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import Button from 'components/Button';
import { useCarProfiles } from 'services/carProfile';
import Header from 'components/Header';
import TextLink from 'components/TextLink';

const HomePage = () => {
  useCSRFToken();
  const { navigate } = useNavigation();

  const { logout, user } = useAuthContext();
  const [carModel, setCarModel] = useState(undefined);
  const { carsProfiles, fetchNextPage, hasNextPage } = useCarProfiles({
    userId: user?.id,
  });

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.bodyContainer}>
        <View style={styles.logout}>
          <TextLink title="Logout" onPress={() => logout()} />
        </View>
        <View style={styles.userPictureContainer}>
          <Image
            style={styles.userPicture}
            source={require('./assets/user.png')}
          />
        </View>
        <Text style={styles.username}>Hello, {user?.username}</Text>
        <Text style={styles.contentheader}>My car list:</Text>
        <View style={styles.line} />
        <View style={styles.carList}>
          {carsProfiles.length === 0 ? (
            <View style={styles.emptyCase}>
              <Text style={styles.contentheader}>No car registered.</Text>
            </View>
          ) : (
            <View>
              <FlashList
                data={carsProfiles}
                renderItem={({ item }) => <View>{item.car.model}</View>}
                onEndReached={fetchNextPage}
                estimatedItemSize={100}
              />
              {carsProfiles.map((car) => (
                <View key={car.id}>{car.car.model}</View>
              ))}
            </View>
          )}
        </View>
        <View style={styles.button}>
          <Button title="Add new car" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logout: {
    position: 'absolute',
    top: 24,
    left: 24,
    zIndex: 99999,
  },
  bodyContainer: {
    padding: 24,
    position: 'relative',
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
  profileContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  userPictureContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  userPicture: {
    height: 80,
    width: 80,
    borderRadius: 0,
  },
  username: {
    marginTop: 16,
    marginBottom: 16,
    fontSize: 35,
    textAlign: 'center',
    color: '#000000',
  },
  contentheader: {
    fontSize: 20,
    color: '#000000',
    marginBottom: 6,
  },
  line: {
    borderWidth: 1,
    borderColor: '#000000',
    borderStyle: 'solid',
    marginBottom: 16,
  },
  carList: {
    backgroundColor: '#d3d3d3',
    height: '50%',
    marginBottom: 16,
  },
  emptyCase: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  button: {
    borderRadius: 2,
    backgroundColor: '#AAAAAA',
  },
});

export default HomePage;
