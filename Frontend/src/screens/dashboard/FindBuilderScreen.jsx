import React from 'react';
import FindPeopleScreen from './FindPeopleScreen';
import { MOCK_USERS } from '../../constants/mockData';

const FindBuilderScreen = ({ navigation }) => (
  <FindPeopleScreen navigation={navigation} title="Find Builder" data={MOCK_USERS.builder} />
);

export default FindBuilderScreen;
