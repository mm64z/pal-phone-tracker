import { FC, ReactElement } from "react"
import { WorkType } from "./state/types"
import { View, Image, Text, StyleSheet, ImageSourcePropType } from "react-native"
import { workImages } from "../../public/work-images"

interface Parameters {
  image: ImageSourcePropType,
  level: number,
}

export const ImageNumber: FC<Parameters> = ({
  image,
  level,
}): ReactElement => {
  return (
    <View style={styles.container}>
      <Image
        source={image}
        style={styles.image}
      ></Image>
      <Text style={styles.text}>{level}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  image: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
    width: 10,
    height: 14,
    transform: [{
      translateX: 15,
    }, {
      translateY: 8,
    }],
    borderRadius: 10,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 10,
  }
})