import React from 'react';
import FindPeopleScreen from './FindPeopleScreen';
import { MOCK_USERS } from '../../constants/mockData';

const FindContractorScreen = ({ navigation }) => (
  <FindPeopleScreen navigation={navigation} title="Find Contractor" data={MOCK_USERS.contractor} />
);

export default FindContractorScreen;
