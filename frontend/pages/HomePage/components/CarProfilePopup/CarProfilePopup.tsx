import React, { FC, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { useCars } from 'services/cars';
import Button from 'components/Button';
import { useCreateCarProfile } from 'services/carProfile';
import { CarProfileProps, FormattedCar } from './types';

const CarProfilePopup: FC<CarProfileProps> = ({
  isModalVisible,
  setModalVisible,
  refetch,
}) => {
  const { navigate } = useNavigation();

  const [searchKey, setSearchKey] = useState('');

  const [selectedItem, setSelectedItem] = useState<FormattedCar | null>(null);
  const { cars } = useCars({ search: searchKey });
  const { mutateAsync: createCarProfile } = useCreateCarProfile({
    onSuccess: (response) => {
      if (response.success) {
        setModalVisible(false);
        refetch();
      }
    },
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Modal isVisible={isModalVisible}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.contentheader}>Search for a Vehicle:</Text>
            <View style={styles.searcharea}>
              <AutocompleteDropdown
                clearOnFocus={false}
                closeOnSubmit={false}
                // @ts-ignore
                onSelectItem={setSelectedItem}
                textInputProps={{ placeholder: 'Search your car' }}
                dataSet={cars}
                onChangeText={(value) => setSearchKey(value)}
              />
            </View>
            <View style={styles.submitButton}>
              <Button
                title="Create"
                variant="primary"
                onPress={() => {
                  if (selectedItem) {
                    createCarProfile({
                      carId: selectedItem?.id,
                    });
                  }
                }}
              />
            </View>
            <View style={styles.submitButton}>
              <Button
                title="Enter my own vehicle"
                variant="success"
                onPress={() => {
                  navigate('CreateCarProfilePage' as never, {} as never);
                  setModalVisible(false);
                }}
              />
            </View>
            <View style={styles.submitButton}>
              <Button
                title="Cancel"
                variant="danger"
                onPress={() => {
                  setModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#FFFF',
    paddingTop: 24,
    paddingBottom: 24,
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
    padding: 24,
  },
  searcharea: {
    zIndex: 999,
  },
  popup: {
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1,
    backgroundColor: 'white',
  },
  submitButton: {
    marginTop: 16,
  },
  contentheader: {
    fontSize: 18,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 4,
    marginTop: 4,
    width: '80%',
  },
  buttonContainer: {
    position: 'relative',
    justifyContent: 'space-around',
  },
});

export default CarProfilePopup;
