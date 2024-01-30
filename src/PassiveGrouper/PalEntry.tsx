import { FC, ReactElement } from "react"
import { Pal } from "./types"
import { View, Image, Text, StyleSheet } from "react-native"


interface Parameters {
  pal: Pal,
}

export const PalEntry: FC<Parameters> = ({
  pal,
}): ReactElement => {
  return (
    <View style={styles.row}>
      <Image
        source={pal.image}
        style={{width: 50, height: 50}}
      ></Image>
      <Text
      >{pal.name}</Text>
      <Text 
      >
        {pal.aura}
      </Text>
    </View>);

}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',

  },
  image: {
    flex: 1,
  },
  name: {
    flex: 1,
  },
  aura: {
    flex: 4,
  }
})