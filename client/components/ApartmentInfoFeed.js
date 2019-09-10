import React from 'react';

import {
  View,
  Text,
  Icon,
  Content,
  Container,
  List,
  ListItem,
  Left,
  Body
} from 'native-base';

import MapView, { Marker } from 'react-native-maps';

class ApartmentInfoFeed extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <View style={{ flexDirection: 'row' }}>
          <Text>{navigation.state.params.apartment.name}</Text>
        </View>
      )
    };
  };

  render() {
    const apartment = this.props.navigation.state.params.apartment;
    const latitude = apartment.longitude;
    const longitude = apartment.latitude;
    const marker = { latitude: latitude, longitude: longitude };
    return (
      <Container>
        <Container>
          <Text style={{ fontSize: 12, margin: 20 }}>
            {apartment.description}
          </Text>
          <Content>
            <List>
              <ListItem>
                <Left>
                  <Text>Address:</Text>
                </Left>
                <Body>
                  <Text>
                    {apartment.address}, Unit {apartment.unit}
                  </Text>
                  <Text>
                    {apartment.city}, {apartment.state} {apartment.zip}
                  </Text>
                </Body>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>Monthly rent:</Text>
                </Left>
                <Body>
                  <Text>${apartment.monthlyRent}</Text>
                </Body>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>Bedrooms:</Text>
                </Left>
                <Body>
                  <Text>{apartment.numBedrooms}</Text>
                </Body>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>Bathrooms:</Text>
                </Left>
                <Body>
                  <Text>{apartment.numBathrooms}</Text>
                </Body>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>Pet Friendly:</Text>
                </Left>
                <Body>
                  {apartment.petFriendly === true ? (
                    <Icon
                      type="FontAwesome"
                      name="check"
                      style={{ color: 'green' }}
                    />
                  ) : (
                    <Icon
                      type="FontAwesome"
                      name="times"
                      style={{ color: 'red' }}
                    />
                  )}
                </Body>
              </ListItem>

              <ListItem>
                <Left>
                  <Text>On-site parking:</Text>
                </Left>
                <Body>
                  {apartment.parking === true ? (
                    <Icon
                      type="FontAwesome"
                      name="check"
                      style={{ color: 'green' }}
                    />
                  ) : (
                    <Icon
                      type="FontAwesome"
                      name="times"
                      style={{ color: 'red' }}
                    />
                  )}
                </Body>
              </ListItem>

              <ListItem>
                <Left>
                  <Text>AC included:</Text>
                </Left>
                <Body>
                  {apartment.ac === true ? (
                    <Icon
                      type="FontAwesome"
                      name="check"
                      style={{ color: 'green' }}
                    />
                  ) : (
                    <Icon
                      type="FontAwesome"
                      name="times"
                      style={{ color: 'red' }}
                    />
                  )}
                </Body>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>Pool:</Text>
                </Left>
                <Body>
                  {apartment.pool === true ? (
                    <Icon
                      type="FontAwesome"
                      name="check"
                      style={{ color: 'green' }}
                    />
                  ) : (
                    <Icon
                      type="FontAwesome"
                      name="times"
                      style={{ color: 'red' }}
                    />
                  )}
                </Body>
              </ListItem>
              <ListItem thumbnail>
                <Body style={{ justifyContent: 'center' }}>
                  <MapView
                    showsUserLocation
                    style={{
                      width: 300,
                      height: 300
                    }}
                    initialRegion={{
                      latitude: latitude,
                      longitude: longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421
                    }}
                  >
                    <Marker coordinate={marker} />
                  </MapView>
                </Body>
              </ListItem>
            </List>
          </Content>
        </Container>
      </Container>
    );
  }
}

export default ApartmentInfoFeed;
