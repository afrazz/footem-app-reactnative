import { StyleSheet, Image, ScrollView, View, Dimensions } from 'react-native'
import React from 'react'
import { Avatar, Button, Card, Paragraph, Title } from 'react-native-paper'
import Spacer from '../Spacer'
import { fontSizes } from '../../../utils/UIRules/fontSize'
import { spacing } from '../../../utils/UIRules/spacing'
import fontConfig from '../../../utils/UIRules/fontFamily'
import { colors } from '../../../utils/UIRules/colors'
import NormalText from '../../NormalText'

// const LeftContent = () => (
//   <Avatar.Icon
//     color="white"
//     icon="camera"
//     style={{ backgroundColor: 'green' }}
//     size={45}
//   />
// )

const PostBlock = ({ mode = 'single' }) => {
  let deviceWidth = Dimensions.get('window').width
  return (
    <View>
      <Card
        style={{
          borderRadius: 0,
          backgroundColor: '#fff',
          width: mode === 'single' ? '100%' : deviceWidth - 100,
          // marginRight: 20,
          elevation: 5,
          borderColor: 'transparent',
        }}
        mode="outlined"
      >
        {/* <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={LeftContent}
        /> */}

        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMFvqd6CwfYXE4NFsbaE8CtyBUmx8veMhk1A&usqp=CAU',
          }}
          style={{
            width: '100%',
            borderRadius: 10,
            height: 180,
            resizeMode: 'contain',
          }}
          // borderRadius={0}
        />
        <Spacer space="sm" />
        <Card.Content>
          {/* <View style={{ flexDirection: 'row' }}>
            <Button icon="heart-circle" contentStyle={{ fontSize: 200 }}>
              Like{' '}
            </Button>
            <Button icon="comment-processing">Comment</Button>
            <Button icon="share-circle">Share</Button>
          </View> */}
          <Title
            style={{
              fontFamily: fontConfig.fontFamily,
              fontSize: fontSizes.h5,
              lineHeight: 25,
              marginLeft: -16,
              color: colors.dark,
            }}
          >
            Ronaldo Being Scored his last on last minute. Al nessr is welcoming
            into home ground.
          </Title>
          <Spacer space="sm" />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginLeft: -16,
              marginTop: -4,
            }}
          >
            {/* <Button icon={'clock-time-five'} color="#4A484D" /> */}
            <NormalText fontFamily="regular" fontSize="body3" color="lightGray">
              30 min ago
            </NormalText>
            {/* <Paragraph style={{ marginLeft: -25, color: colors.darkGray }}>
              30 min ago
            </Paragraph> */}
          </View>

          {/* <Spacer space="sm" /> */}
          {/* <Paragraph style={{ color: colors.darkGray }}>
            Cristiano Ronaldo statistics – 38 years_old Al Nassr FC Midfielder
            (Left) / Forward. Check out his latest detailed ...
          </Paragraph> */}
        </Card.Content>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  // MainContainer: {
  //   flex: 1,
  // },
})
export default PostBlock
