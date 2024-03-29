import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Text, Thumbnail } from 'native-base';

import { connect } from 'react-redux';

class UserProfile extends React.Component {
  state = {
    src: this.props.user.photo
  };
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Button transparent>
          <Icon type="FontAwesome" name="user" style={{ color: '#0e677c' }} />
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
          <Button transparent onPress={() => navigation.navigate('Feed')}>
            <Icon type="FontAwesome" name="heart" style={{ color: 'grey' }} />
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

  componentWillReceiveProps() {
    this.setState({
      src: this.props.user.photo
    });
  }

  render() {
    const uri = 'https://placekitten.com/200/300';

    return (
      <View
        style={{
          marginTop: 100,
          flexDirection: 'column',
          justifyContent: 'center'
          // alignItems: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Thumbnail
            style={{
              width: 150,
              height: 150,
              borderRadius: 150 / 2,
              borderWidth: 1,
              borderColor: 'grey'
            }}
            source={{ uri: this.state.src }}
          />
          <View style={{ marginTop: 20 }}>
            <Text>
              {this.props.user.firstName} {this.props.user.lastName}
            </Text>
            <Text style={{ marginTop: 10 }}>{this.props.user.bio}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: 20
          }}
        >
          <Button
            light
            style={{
              width: 65,
              height: 65,
              borderRadius: 65 / 2,
              justifyContent: 'center'
            }}
            onPress={() =>
              this.props.navigation.navigate('EditProfile', this.props.user)
            }
          >
            <Icon
              type="FontAwesome"
              name="pencil"
              style={{ color: '#0e677c' }}
            />
          </Button>

          <Button
            style={{
              width: 65,
              height: 65,
              borderRadius: 65 / 2,
              justifyContent: 'center'
            }}
            light
          >
            <Icon type="FontAwesome" name="cog" style={{ color: '#0e677c' }} />
          </Button>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20
          }}
        >
          <Button
            onPress={() => {
              this.props.navigation.navigate('HomeScreen');
            }}
            style={{
              width: 100,
              height: 40,
              borderRadius: 20,
              justifyContent: 'center'
            }}
            light
          >
            <Text style={{ color: '#0e677c' }}>Logout</Text>
          </Button>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 40
          }}
        >
          <Button
            style={{ backgroundColor: '#0e677c' }}
            onPress={() => this.props.navigation.navigate('ChangeProfilePic')}
          >
            <Text style={{ color: 'white' }}>
              Take a new photo for your profile!
            </Text>
          </Button>
        </View>
      </View>

      //     <Container>

      //         <Content>

      //             <Thumbnail style={{ width: 150, height: 150, borderRadius: 150 / 2 }} source={{ uri: uri }} />

      //             <Text>
      //                 Cody C.
      //   </Text>
      //             <Text>
      //                 Fullstack Developer, 25
      //   </Text>

      //             </Button>
      //         </Content>

      //     </Container >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => ({
  // logoutUserAction: () => dispatch(logoutUser)
  // logoutUser2: () => dispatch(logoutUserThunk)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
