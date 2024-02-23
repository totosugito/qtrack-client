import {StyleSheet, Text, View} from '@react-pdf/renderer';
import React from "react";

const styles = StyleSheet.create({
  // ----------- page ----------
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 30,
    paddingLeft:60,
    paddingRight:60,
    lineHeight: 1.5,
    flexDirection: 'column',
  },

  textWithValue: {
    flexDirection: 'row',
    marginTop: 24,
  },
  textWithValueLeft : {
    width: 60
  },
  textWithValueRight : {
    marginLeft: 10,
    fontFamily: 'Helvetica-Bold',
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})

const TextWithValue = ({label, value}) => {
  return(
    <View style={styles.textWithValue}>
      <Text style={styles.textWithValueLeft}>{label}</Text>
      <Text>:</Text>
      <Text style={styles.textWithValueRight}>{value}</Text>
    </View>
  )
}
export {styles, TextWithValue}
