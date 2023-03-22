import { Text, View, StyleSheet, Image, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const { navigate } = useNavigation();

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
        <Text style={styles.username}>Username</Text>
        <Text style={styles.contentheader}>Car Profile</Text>
        <View style={styles.line} />
        <View style={styles.details}>
          <Text>Car Model:</Text>
          <Text>Year:</Text>
          <Text>Engine Displacement Interval:</Text>
          <Text>Fuel System:</Text>
          <Text>Bore x Stroke:</Text>
          <Text>No. of cylinder:</Text>
        </View>
        <View style={styles.button}>
          <Button
            title="Sign Out"
            onPress={() => {
              navigate('LoginPage' as never, {} as never);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    // justifyContent: 'center',
    // alignItems: 'center',
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
  details: {
    position: 'absolute',
    width: 340,
    height: 110,
    left: 20,
    top: 470,
  },
  button: {
    position: 'absolute',
    height: 40,
    width: 120,
    left: 136,
    top: 650,
    borderRadius: 2,
    backgroundColor: '#AAAAAA',
  },
});

export default HomePage;
