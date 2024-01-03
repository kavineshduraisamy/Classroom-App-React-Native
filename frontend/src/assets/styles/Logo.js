import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('./png/logobucket.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 110,
    marginBottom: 8,
  
  },
})
