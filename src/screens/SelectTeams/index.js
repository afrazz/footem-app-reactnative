/* eslint-disable react/prop-types */
import { ScrollView, View, StyleSheet, FlatList, Image } from 'react-native'
import React from 'react'
import Header from '../../components/common/Header'
import AccordianblockHeader from '../../components/common/AccordianBlock/AccordianblockHeader'
import AccordianBlockHeaderLeft from '../../components/common/AccordianBlock/AccordianBlockHeaderLeft'
import plIcon from '../../../assets/pl.png'
import AccordianBlock from '../../components/common/AccordianBlock'
import { List, Searchbar, Text } from 'react-native-paper'
import SearchInput from '../../components/common/SearchInput'
import { spacing } from '../../utils/UIRules/spacing'
import Spacer from '../../components/common/Spacer'
import { colors } from '../../utils/UIRules/colors'
import Heading from '../../components/common/Heading'
import NormalText from '../../components/NormalText'

const SelectTeam = ({ navigation }) => {
  return (
    <>
      <Header title="Indian Super League" backButtonEnabled />
      <View style={styles.container}>
        <Spacer space="md" />
        <SearchInput text="Search Team" />
        <Spacer space="md" />

        <FlatList
          data={[
            1, 3, 4, 2, 3, 3, 33, 3, 32, 3, 3, 3, 33, 3, 3, 3, 3, 33, 3, 3, 3,
            3,
          ]}
          showsVerticalScrollIndicator={false}
          // style={styles.container}
          contentContainerStyle={{
            // paddingBottom: spacing.lg,
            backgroundColor: colors.white,
            borderRadius: spacing.md,
          }}
          // ListHeaderComponent={
          //   <View
          //     style={{
          //       paddingHorizontal: spacing.md,
          //       paddingTop: spacing.md,
          //       paddingBottom: spacing.sm,
          //     }}
          //   >
          //     <Heading
          //       text="Select Country"
          //       type="h5"
          //       fontType="semi-bold"
          //       containerStyle={{ marginTop: 0, marginLeft: spacing.sm }}
          //     />
          //   </View>
          // }
          // onEndReached={loadMoreNewsData}
          // onEndReachedThreshold={0}
          // ListEmptyComponent={
          //   !todayNewsLoading && (
          //     <View
          //       style={{
          //         justifyContent: 'center',
          //         alignItems: 'center',
          //         flex: 0.5,
          //         marginRight: spacing.lg,
          //       }}
          //     >
          //       <Nodata
          //         title="No Results To Show"
          //         description="We'll Update Soon with latest results"
          //       />
          //     </View>
          //   )
          // }
          // contentContainerStyle={{ paddingBottom: spacing.lg }}
          renderItem={({ item, index }) => {
            return (
              <>
                {/* <Heading
              text={"Today's News"}
              type="h5"
              containerStyle={{ marginTop: -5 }}
            />
            <Spacer space="md" />
            <NewsLargeBlock
              coverImage={item?.imageUrl}
              title={item?.newsData[0]?.title}
              startDate={item?.startDate}
              newsId={item?._id}
              minsRead={item?.minuteRead}
            /> */}
                <List.Item
                  // onPress={() => navigation.navigate('SelectCompetition')}
                  title={
                    <NormalText
                      containerMarginRight={0}
                      fontFamily="regular"
                      fontSize={'body2'}
                    >
                      India
                    </NormalText>
                  }
                  left={(props) => (
                    <Image
                      source={require('../../../assets/manunited.png')}
                      style={{
                        // transform: [{ translateX: -6 }],
                        height: 25,
                        width: 25,
                      }}
                    />
                  )}
                  style={{
                    paddingLeft: spacing.md,
                    marginBottom: -spacing.sm - 4,
                  }}
                  right={() => (
                    <List.Icon
                      color="#000"
                      icon="chevron-right"
                      style={{ marginRight: -spacing.sm - 4 }}
                    />
                  )}
                />
                <Spacer space="sm" />
              </>
            )
          }}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
  },
})

export default SelectTeam
