import React from 'react';
import FindPeopleScreen from './FindPeopleScreen';
import { MOCK_USERS } from '../../constants/mockData';

const FindClientScreen = ({ navigation }) => (
  <FindPeopleScreen navigation={navigation} title="Find Clients" data={MOCK_USERS.client} />
);

export default FindClientScreen;
