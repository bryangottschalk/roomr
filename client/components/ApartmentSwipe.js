import React from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import {
  Container,
  Header,
  View,
  DeckSwiper,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Icon,
  Button
} from 'native-base';
import ApartmentInfo from './ApartmentInfo';
import SmallMapView from './SmallMapView';
import { connect } from 'react-redux';
import { getApartmentsThunk } from '../store/apartments';
import { createUserApartmentThunk } from '../store/user-apartments';
import Slideshow from 'react-native-image-slider-show';
//because database does not currently have images
const tempImage = require('../images/kitten.jpeg');

class ApartmentSwipe extends React.Component {
  constructor() {
    super();
    this.state = {
      viewInfo: false,
      currentApt: {}
    };
  }
  componentDidMount() {
    this.props.getApartments();
  }
  getAptInfo = apartment => {
    // this.setState({ viewInfo: !this.state.viewInfo, currentApt: apartment });
    this.setState(prevState => ({
      viewInfo: !prevState.viewInfo,
      currentApt: apartment
    }));
    if (this.state.viewInfo === false) {
      this.scrollToEnd();
    }
    else {
      this.scrollToTop();
    }
  };

  scrollToEnd = () => {
    this.scrollView.scrollToEnd();
  };
  scrollToTop = () => {
    this.scrollView.scrollTo({ x: 0, y: 0, animated: true });
  };

  render() {
    const { apartments } = this.props;
    return (
      <ScrollView
        ref={scrollView => {
          this.scrollView = scrollView;
        }}
      >
        {this.props.apartments.length !== 0 && (
          <Container>
            <Header />

            <DeckSwiper
              ref={c => (this._deckSwiper = c)}
              dataSource={apartments}
              looping={false}
              onSwipeLeft={() => {
                this.setState({ viewInfo: false });
                this.props.createUserApartment(
                  this._deckSwiper._root.state.selectedItem.id,
                  this.props.user.id,
                  false
                );
              }}
              onSwipeRight={() => {
                // console.dir('currentApt', this.state);
                // console.log('userId:', this.props.user.id);
                // console.log('here', this._deckSwiper._root.state);
                this.setState({ viewInfo: false });
                this.props.createUserApartment(
                  this._deckSwiper._root.state.selectedItem.id,
                  this.props.user.id,
                  true
                );
              }}
              renderEmpty={() => (
                <View style={{ alignSelf: 'center' }}>
                  <Text>Over</Text>
                </View>
              )}
              renderItem={item => (
                <Card style={{ elevation: 3 }}>
                  <CardItem>
                    <Left>
                      <Thumbnail source={tempImage} />
                      <Body>
                        <Text>{item.name}</Text>
                        <Text note>{item.address}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem cardBody>
                    {/* <Image
                      style={{ height: 300, flex: 1 }}
                      source={tempImage}
                    /> */}
                    <Slideshow
                      dataSource={item.photos} />
                  </CardItem>
                  <CardItem
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      marginTop: 20
                    }}
                  >
                    <Button
                      style={{
                        width: 65,
                        height: 65,
                        borderRadius: 65 / 2,
                        backgroundColor: '#ED4A6A',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onPress={() => {
                        this._deckSwiper._root.swipeLeft()
                        this.setState({ viewInfo: false });
                        this.props.createUserApartment(
                          this._deckSwiper._root.state.selectedItem.id,
                          this.props.user.id,
                          false
                        );
                      }}
                    >
                      <Icon
                        name="times"
                        type="FontAwesome"
                        style={{ color: '#FFFFFF', fontSize: 32.5 }}
                      />
                    </Button>
                    <Button
                      style={{
                        width: 65,
                        height: 65,
                        borderRadius: 65 / 2,
                        backgroundColor: '#ED4A6A'
                      }}
                      onPress={() => {
                        this._deckSwiper._root.swipeRight()
                        this.setState({ viewInfo: false });
                        this.props.createUserApartment(
                          this._deckSwiper._root.state.selectedItem.id,
                          this.props.user.id,
                          true
                        );
                      }}
                    >
                      <Icon
                        name="heart"
                        type="AntDesign"
                        style={{ color: '#FFFFFF', fontSize: 32.5 }}
                      />
                    </Button>
                  </CardItem>
                  <CardItem
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Button
                      style={{
                        backgroundColor: 'none'
                      }}
                      onPress={() => {
                        this.getAptInfo(item);
                      }}
                    >
                      <Icon
                        name="info-circle"
                        type="FontAwesome"
                        style={{ color: '#ED4A6A' }}
                      />
                    </Button>
                  </CardItem>
                  <CardItem style={{ justifyContent: 'center' }}>

                  </CardItem>
                </Card>

              )}
            />



          </Container>
        )}
        <View>
          {this.state.viewInfo === true && (
            <View>
              <SmallMapView apartment={this.state.currentApt} />
              {/* <ApartmentInfo
                apartment={this.state.currentApt}
                scrollToEnd={this.scrollToEnd}
              /> */}
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    apartments: state.apartments
  };
};

const mapDispatchToProps = dispatch => ({
  getApartments: () => dispatch(getApartmentsThunk()),
  createUserApartment: (apartmentId, userId, likedBoolean) =>
    dispatch(createUserApartmentThunk(apartmentId, userId, likedBoolean))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApartmentSwipe);
