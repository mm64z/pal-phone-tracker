import { FC, ReactElement } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "@reduxjs/toolkit"
import { Pressable, StyleSheet, Text } from "react-native"
import { WorkFilterState, WorkType } from "./state/types"
import { Image } from "@rneui/themed"
import { workImages, workImagesGray } from "../../public/work-images"
import { addFilter, removeFilter } from "./state/reducer"

interface Parameters {
  work: WorkType,
}

export const WorkTogglable: FC<Parameters> = ({
  work,
}): ReactElement => {
  const active = useSelector(mapStateToProps(work));
  const dispatch = useDispatch();

  function toggleType () {
    if (active) {
      dispatch(removeFilter({filter: work}));
    } else {
      dispatch(addFilter({filter: work}));
    }
  }

  const activeStyle = active ? styles.active : styles.inactive
  return (
    <Pressable style={styles.imageContainer} onPress={() => toggleType()}>
      {active ? 
        <Image
          source={workImages[work.type]}
          style={styles.image}
          aria-label={work.label}
          alt={work.label}
        ></Image> : 
        <Image 
          source={workImagesGray[work.type]} 
          style={styles.image}
          aria-label={work.label}
          alt={work.label}
        />
      }
      <Text style={{textTransform: 'capitalize', fontSize: 10}}>{work.label}</Text>
    </Pressable>)
}

const selectFilters = ({ work }: { work: WorkFilterState}) => {
  return work.activeFilters;
}

const mapStateToProps = (work: WorkType) => {
  return createSelector([
    selectFilters,
    ],
    (filters: Array<WorkType>) => {
      return filters.includes(work)
    }
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    flexGrow: 1
  },
  image: {
    width: 35,
    height: 35,
  },
  active: {

  },
  inactive: {
    
  }
})

