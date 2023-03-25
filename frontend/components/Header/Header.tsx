import { View, StyleSheet, Image } from 'react-native';

const Header = () => (
  <View style={styles.headerContainer}>
    <Image
      style={styles.logo}
      source={require('./assets/car-logo-removebg-preview.png')}
    />
    <Image
      style={styles.logoName}
      source={require('./assets/fuellytics-high-resolution-logo-color-on-transparent-background-2-cut.png')}
    />
  </View>
);

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 48,
    backgroundColor: '#AAAAAA',
  },
  logo: {
    width: 56,
    height: 56,
  },
  logoName: {
    width: 250,
    height: 40,
  },
});
