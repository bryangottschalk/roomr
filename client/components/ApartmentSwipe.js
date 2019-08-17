import React from 'react';
import { StyleSheet, Image } from 'react-native';
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
import { connect } from 'react-redux';
import { getApartmentsThunk } from '../store/apartments';

const apartments = [
  {
    name: 'MILA',
    description: 'apt1description',
    image: require('../images/kitten.jpeg'),
    address: '201 N Garland Ct'
  },
  {
    name: 'K2 Apartments',
    description: 'apt2description',
    image: require('../images/kitten.jpeg'),
    address: '365 N Halsted St'
  },
  {
    name: 'BDHB Apartments',
    description: 'apt3description',
    image: require('../images/kitten.jpeg'),
    address: '415 W Howard St'
  }
];

class ApartmentSwipe extends React.Component {
  componentDidMount() {
    this.props.getApartments();
  }
  render() {
    // if (this.props.apartments) {
    console.log(
      'TCL: ApartmentSwipe -> render -> this.props.apartments',
      this.props.apartments
    );
    // }

    return (
      <Container>
        <Header />
        <View>
          <DeckSwiper
            dataSource={apartments}
            renderItem={item => (
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  <Left>
                    <Thumbnail source={item.image} />
                    <Body>
                      <Text>{item.name}</Text>
                      <Text note>{item.address}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image style={{ height: 300, flex: 1 }} source={item.image} />
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
                      backgroundColor: '#ED4A6A'
                    }}
                  >
                    <Icon
                      name="heart"
                      type="AntDesign"
                      style={{ color: '#FFFFFF', fontSize: 32.5 }}
                    />
                  </Button>
                  <Button
                    style={{
                      width: 65,
                      height: 65,
                      borderRadius: 65 / 2,
                      backgroundColor: '#ED4A6A',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Icon
                      name="times"
                      type="FontAwesome"
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
                  >
                    <Icon
                      name="info-circle"
                      type="FontAwesome"
                      style={{ color: '#ED4A6A' }}
                    />
                  </Button>
                </CardItem>
                <CardItem>
                  <Text>{item.description}</Text>
                </CardItem>
              </Card>
            )}
          />
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    apartments: state.apartments
  };
};

const mapDispatchToProps = dispatch => ({
  getApartments: () => dispatch(getApartmentsThunk())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApartmentSwipe);

/* BEFORE ADDING SWIPE COMPONENT */
// <Button light style={{ width: 65, height: 65, borderRadius: 65 / 2 }} onPress={() => this.props.navigation.navigate("EditProfile")}>
//                      <Icon type="FontAwesome" name="pencil" />
//                  </Button>
// render() {
//   return (
//     <View>
//       <View
// style={{
//   justifyContent: 'center',
//   alignItems: 'center'
// }}
//       >
//         <Image
//           style={{
// width: 350,
// height: 350,
//             marginTop: 80
//           }}
//           source={require('../images/kitten.jpeg')}
//         />
//       </View>
//       <View
// style={{
//   flexDirection: 'row',
//   justifyContent: 'space-around',
//   alignItems: 'center'
// }}
//       >
//         <Image
//           style={{
//             width: 64,
//             height: 64,
//             marginTop: 50
//           }}
//           source={require('../images/x-icon.png')}
//         />
//         <Image
//           style={{
//             width: 64,
//             height: 64,
//             marginTop: 50
//           }}
//           source={require('../images/heart-icon.png')}
//         />
//       </View>
//       <View
//         style={{
//           justifyContent: 'center',
//           alignItems: 'center'
//         }}
//       >
//         <Image
//           style={{
//             marginTop: 20,
//             width: 40,
//             height: 40
//           }}
//           source={require('../images/info-icon.png')}
//         />
//       </View>
//     </View>
//   );
// }
