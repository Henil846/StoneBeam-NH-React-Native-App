import React from 'react';
import FindPeopleScreen from './FindPeopleScreen';
import { MOCK_USERS } from '../../constants/mockData';

const FindElectricianPlumberScreen = ({ navigation }) => (
  <FindPeopleScreen navigation={navigation} title="Find Electrician/Plumber" data={MOCK_USERS.skilled_labour} />
);

export default FindElectricianPlumberScreen;
