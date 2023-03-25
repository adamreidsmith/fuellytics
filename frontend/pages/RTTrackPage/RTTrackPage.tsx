import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import React, { useState } from 'react';

const RTTrackPage = () => {
  const { navigate } = useNavigation();

  // Plot graph real-time
  const [activeSection, setActiveSection] = useState(null);
  const data = {
    labels: ['1', '2', '3', '4', '5', '6'], // string needed
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 0.08) => `rgba(247, 247, 247, ${opacity})`, // optional: color of points
        strokeWidth: 2, // optional
      },
    ],
  };
  const chartConfig = {
    backgroundColor: '#000000',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };
  const bezierstyle = {
    borderRadius: 16,
  };
  const sections = [
    {
      title: 'Gas Consumption',
      content: (
        <View>
          <LineChart
            data={data}
            width={Dimensions.get('window').width - 50} // from react-native
            height={220}
            yAxisLabel="L"
            chartConfig={chartConfig}
            bezier
            style={bezierstyle}
            // withInnerLines={false} // hide the grid behind chart
            withVerticalLabels={false} // hide horizontal labels
          />
        </View>
      ),
    },
    {
      title: 'Gas Emission',
      content: (
        <View>
          <LineChart
            data={data}
            width={Dimensions.get('window').width - 50} // from react-native
            height={220}
            yAxisLabel="L"
            chartConfig={chartConfig}
            bezier
            style={bezierstyle}
            // withInnerLines={false} // hide the grid behind chart
            withVerticalLabels={false} // hide horizontal labels
            // withOuterLines={false} // hide lines next to labels
          />
        </View>
      ),
    },
  ];

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
        <Text style={styles.contentheader}>Fuellytics Real-Time Analysis</Text>
        <TouchableOpacity
          onPress={() => {
            navigate('MapPage' as never, {} as never);
          }}
        >
          <Image
            style={styles.zoomouticon}
            source={require('../../assets/icons/zoom-out.png')}
          />
        </TouchableOpacity>
        <View style={styles.line} />
        <View style={styles.details}>
          <Text>Time:</Text>
          <Text>Latitude:</Text>
          <Text>Longitude:</Text>
        </View>
        <ScrollView style={styles.scrollcontent}>
          <View style={styles.accordionContainer}>
            {sections.map((section, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <View key={index}>
                <TouchableOpacity
                  style={styles.scrolltitle}
                  onPress={() => setActiveSection(index)}
                >
                  <Text style={styles.title}>{section.title}</Text>
                </TouchableOpacity>
                {activeSection === index && (
                  <View style={styles.scrollcontentContainer}>
                    {section.content}
                  </View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
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
  zoomouticon: {
    position: 'absolute',
    height: 20,
    width: 20,
    left: 360,
    top: 164,
  },
  contentheader: {
    position: 'absolute',
    height: 40,
    width: 319,
    left: 11,
    top: 164,
    fontSize: 20,
    color: '#000000',
    textAlign: 'left',
  },
  line: {
    position: 'absolute',
    width: 370,
    height: 0,
    left: 10,
    top: 194,
    borderWidth: 1,
    borderColor: '#000000',
    borderStyle: 'solid',
  },
  details: {
    position: 'absolute',
    height: 84,
    width: 364,
    left: 10,
    top: 200,
    fontSize: 20,
  },
  scrollcontent: {
    width: 391,
    top: 250,
    // backgroundColor: 'red',
  },
  accordionContainer: {
    margin: 10,
    marginTop: 60,
  },
  scrolltitle: {
    backgroundColor: '#a3a3a3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  scrollcontentContainer: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    alignItems: 'center',
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

export default RTTrackPage;
