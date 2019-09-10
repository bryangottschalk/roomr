import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Button, Text, Card, CardItem, Icon } from 'native-base';
import { getFeedDataThunk } from '../store/feed';
import { getApartmentsThunk } from '../store/apartments';
import { getUsersThunk } from '../store/users';
import { connect } from 'react-redux';
import axios from 'axios';
import { ngrok } from '../../client/store';

class MatchesFromApartment extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <View style={{ flexDirection: 'row' }}>
          <Text>{navigation.state.params.apartment.name} Matches</Text>
        </View>
      )
    };
  };
  constructor() {
    super();
    this.findUserInStore = this.findUserInStore.bind(this);
    this.compare = this.compare.bind(this);
  }

  componentDidMount() {
    this.props.getUsers();
  }

  findUserInStore(match) {
    const userInStore = this.props.users.filter(user => user.id === match);
    return userInStore;
  }

  compare(a, b) {
    let comparison = 0;
    if (a.id < b.id) {
      comparison = -1;
    } else {
      comparison = 1;
    }
    return comparison;
  }

  async sendTextNotification(user1, user2, apartmentName) {
    if (
      (user1.firstName === 'Cody' && user2.firstName === 'Joey') ||
      (user1.firstName === 'Joey' && user2.firstName === 'Cody')
    ) {
      const { data } = await axios.post(`${ngrok}/api/twilio/`, {
        user1: user1,
        user2: user2,
        apartmentName: apartmentName
      });
    }
  }

  // goToChat() {
  //     // to be called when you click on the message icon
  //     // grab the two ids: user id and person who you clicked on's id
  //     // look in the chat table to get id. if that combo doesnt exist, create a new row and return the id
  //     // pass that chat id into the Chatroom's props. also could pass through objects for the two people in the conversation
  // }

  render() {
    const props = this.props.navigation.state.params;

    return (
      <ScrollView>
        {props.matchIds.map(id => (
          <Card style={{ flexDirection: 'row' }}>
            <CardItem>
              <Image
                source={{ uri: this.findUserInStore(Number(id))[0].photo }}
                style={{ height: 150, width: 150 }}
              />
            </CardItem>
            <CardItem style={{ flexDirection: 'column', marginTop: 30 }}>
              <Text style={{ textAlign: 'right' }}>
                {this.findUserInStore(Number(id))[0].firstName}{' '}
                {this.findUserInStore(Number(id))[0].lastName},{' '}
                {this.findUserInStore(Number(id))[0].age}
              </Text>
              <Text>{this.findUserInStore(Number(id))[0].job}</Text>
              <Text> </Text>

              <Text>{this.findUserInStore(Number(id))[0].bio} </Text>
              <Button
                transparent
                colors={['#0000FF', '#008080']}
                onPress={async () => {
                  console.log('ID', id);
                  console.log('PROPSID', this.props.user.id);
                  const response = await axios.post(
                    `${ngrok}/api/users/createChatroom`,
                    {
                      user1Id: this.props.user.id,
                      user2Id: id
                    }
                  );
                  const chatroom = response.data;
                  this.sendTextNotification(
                    this.props.user,
                    this.findUserInStore(Number(id))[0],
                    props.apartment.name
                  ); // send user 1 and 2 to axios req
                  if (this.props.user.id === chatroom.user1Id) {
                    this.props.navigation.navigate('Chatroom', {
                      me: this.props.user,
                      other: this.findUserInStore(chatroom.user2Id),
                      chatId: `chat${chatroom.user1Id}-${chatroom.user2Id}`
                    });
                  } else {
                    this.props.navigation.navigate('Chatroom', {
                      me: this.props.user,
                      other: this.findUserInStore(chatroom.user1Id),
                      chatId: `chat${chatroom.user1Id}-${chatroom.user2Id}`
                    });
                  }
                }}
              >
                <Icon type="FontAwesome" name="comments" />
              </Button>
            </CardItem>
          </Card>
        ))}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    feed: state.feed,
    apartments: state.apartments,
    users: state.users
  };
};

const mapDispatchToProps = dispatch => ({
  getFeedData: user => dispatch(getFeedDataThunk(user)),
  getApartments: () => dispatch(getApartmentsThunk()),
  getUsers: () => dispatch(getUsersThunk())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchesFromApartment);
