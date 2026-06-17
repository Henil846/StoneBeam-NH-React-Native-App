import React from 'react';
import FindPeopleScreen from './FindPeopleScreen';
import { MOCK_USERS } from '../../constants/mockData';

const FindDealerScreen = ({ navigation }) => (
  <FindPeopleScreen navigation={navigation} title="Find Dealer" data={MOCK_USERS.dealer} />
);

export default FindDealerScreen;
