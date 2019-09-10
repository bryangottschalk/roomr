import React from 'react';
import { View, ScrollView } from 'react-native';
import {
  Button,
  Text,
  Card,
  CardItem,
  Body,
  Left,
  Icon,
  Right
} from 'native-base';
import { getFeedDataThunk, deleteUserApartmentThunk } from '../store/feed';
import { getApartmentsThunk } from '../store/apartments';
import { getUsersThunk } from '../store/users';
import { connect } from 'react-redux';
import Slideshow from 'react-native-image-slider-show';
import CacheImage from './CacheImage';

class Feed extends React.Component {
  constructor() {
    super();
    this.state = { loaded: false };
    this.findApartmentInStore = this.findApartmentInStore.bind(this);
    this.findUserInStore = this.findUserInStore.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Button transparent onPress={() => navigation.navigate('UserProfile')}>
          <Icon type="FontAwesome" name="user" style={{ color: 'grey' }} />
        </Button>
      ),
      headerTitle: (
        <View style={{ flexDirection: 'row' }}>
          <Button
            style={{ marginRight: 55 }}
            transparent
            onPress={() => navigation.navigate('ApartmentSwipe')}
          >
            <Icon
              type="FontAwesome"
              name="home"
              style={{ color: 'grey', fontSize: 30 }}
            />
          </Button>
          <Button transparent>
            <Icon
              type="FontAwesome"
              name="heart"
              style={{ color: '#0e677c' }}
            />
          </Button>
        </View>
      ),

      headerRight: (
        <Button
          transparent
          style={{ marginBottom: 4 }}
          onPress={() => navigation.navigate('AllMessages')}
        >
          <Icon
            type="FontAwesome"
            name="comments"
            style={{ color: 'grey', fontSize: 30 }}
          />
        </Button>
      )
    };
  };

  async componentDidMount() {
    // setTimeout(() => {
    //   this.setState({
    //     loaded: true
    //   });
    // }, 1500);
    await this.props.getFeedData(this.props.user);
    // await this.props.getApartments();
    await this.props.getUsers();
    this.setState({
      loaded: true
    });
  }

  findApartmentInStore(apartment) {
    const apartmentInStore = this.props.apartments.filter(
      apt => apt.id === apartment.apartmentId
    );
    return apartmentInStore;
  }

  findUserInStore(match) {
    const userInStore = this.props.users.filter(user => user.id === match);
    return userInStore;
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        {this.state.loaded && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingVertical: 10
            }}
          >
            {this.props.feed[0].length === 0 ? (
              <Text style={{ margin: 20, textAlign: 'center' }}>
                You haven't liked any apartments... click the home icon to start
                swiping!
              </Text>
            ) : (
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>
                  Apartments You've Liked
                </Text>
                <Button
                  transparent
                  onPress={() => this.props.navigation.navigate('FeedMap')}
                >
                  <Text style={{ textAlign: 'center', color: '#0e677c' }}>
                    View on map{' '}
                  </Text>
                </Button>
              </View>
            )}
          </View>
        )}

        {this.state.loaded &&
        this.props.feed[0] &&
        this.props.apartments.length > 0 &&
        this.props.users.length > 0 ? (
          this.props.feed[0].map(apt => (
            <Card key={this.findApartmentInStore(apt)[0].id}>
              <CardItem>
                <Left>
                  <Body>
                    <Text>{this.findApartmentInStore(apt)[0].name}</Text>
                    <Text note>
                      Bedrooms: {this.findApartmentInStore(apt)[0].numBedrooms}
                    </Text>
                    <Text note>
                      Monthly rent: $
                      {this.findApartmentInStore(apt)[0].monthlyRent}
                    </Text>
                  </Body>
                </Left>
                <Right
                  style={{
                    justifyContent: 'center'
                  }}
                >
                  <Button
                    style={{
                      width: 70,
                      height: 25,
                      backgroundColor: '#0e677c',
                      alignContent: 'center',
                      justifyContent: 'center'
                    }}
                    transparent
                    onPress={() => {
                      this.props.deleteUserApartment(
                        this.props.user.id,
                        this.findApartmentInStore(apt)[0].id
                      );
                    }}
                  >
                    <Text
                      style={{
                        color: '#FFF',
                        paddingRight: 25
                      }}
                    >
                      unlike
                    </Text>
                  </Button>
                </Right>
              </CardItem>
              <CardItem cardBody>
                <Slideshow
                  dataSource={this.findApartmentInStore(apt)[0].photos}
                />
              </CardItem>
              <CardItem>
                <Left>
                  {apt.matches_array !== null ? (
                    <Button
                      transparent
                      onPress={() =>
                        this.props.navigation.navigate('MatchesFromApartment', {
                          apartment: this.findApartmentInStore(apt)[0],
                          matchIds: apt.matches_array.split(', ')
                        })
                      }
                    >
                      <Text style={{ color: '#0e677c', fontSize: 16 }}>
                        {apt.matches_array !== null
                          ? apt.matches_array.split(', ').length
                          : 0}{' '}
                        {apt.matches_array.length === 1 ? 'match' : 'matches'}
                      </Text>
                    </Button>
                  ) : (
                    <Text> No matches</Text>
                  )}
                </Left>
                <Right>
                  <Button
                    transparent
                    onPress={() =>
                      this.props.navigation.navigate('ApartmentInfoFeed', {
                        apartment: this.findApartmentInStore(apt)[0]
                      })
                    }
                  >
                    <Icon
                      style={{ color: '#ED4A6A', fontSize: 30 }}
                      type="FontAwesome"
                      name="info-circle"
                    />
                  </Button>
                </Right>
              </CardItem>
            </Card>
          ))
        ) : (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>Loading your likes and matches...</Text>
            <CacheImage
              source={{
                uri:
                  'https://loading.io/spinners/wedges/lg.rotate-pie-preloader-gif.gif'
              }}
              style={{ width: 200, height: 200 }}
            />
          </View>
        )}
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
  getUsers: () => dispatch(getUsersThunk()),
  deleteUserApartment: (userId, apartmentId) =>
    dispatch(deleteUserApartmentThunk(userId, apartmentId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
