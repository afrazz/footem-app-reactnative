/* eslint-disable react/prop-types */
import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AccordianBlockHeaderLeft = ({ icon }) => {
  return (
    <Image
      source={icon}
      style={{ height: 50, width: 50 }}
      //   {...props}
    />
  )
}

export default AccordianBlockHeaderLeft

const styles = StyleSheet.create({})
