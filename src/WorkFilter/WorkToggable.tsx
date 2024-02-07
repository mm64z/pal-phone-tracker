import { FC, ReactElement, useEffect, useRef } from "react"
import { palJson } from "../constants"
import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "@reduxjs/toolkit"
import { Pressable, ScrollView, StyleSheet, View } from "react-native"
import { GroupList } from "./GroupList"
import { WORK_TYPE, WorkFilterState, WorkType } from "./state/types"
import { PalState } from "../CoreState/types"
import { IdMap, Pal } from "../types"
import { PalEntry } from "./PalEntry"
import { Image } from "@rneui/themed"
import { workImages, workImagesGray } from "../../public/work-images"
import { addFilter, removeFilter } from "./state/reducer"

interface Parameters {
  type: WorkType,
}

export const WorkTogglable: FC<Parameters> = ({
  type,
}): ReactElement => {
  const active = useSelector(mapStateToProps(type));
  const dispatch = useDispatch();

  function toggleType () {
    if (active) {
      dispatch(removeFilter({filter: type}));
    } else {
      dispatch(addFilter({filter: type}));
    }
  }

  const activeStyle = active ? styles.active : styles.inactive
  return (
    <Pressable style={styles.imageContainer} onPress={() => toggleType()}>
      {active ? 
        <Image
          source={workImages[type]}
          style={styles.image}
          aria-label={type}
          alt={type}
        ></Image> : 
        <Image 
          source={workImagesGray[type]} 
          style={styles.image}
          aria-label={type}
          alt={type}
        />
      
      }
    </Pressable>)
}

const selectFilters = ({ work }: { work: WorkFilterState}) => {
  return work.activeFilters;
}

const mapStateToProps = (type: string) => {
  return createSelector([
    selectFilters,
    ],
    (filters: Array<WorkType>) => {
      return filters.includes(type)
    }
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 50,
    height: 50,
  },
  image: {
    width: 50,
    height: 50,
  },
  active: {

  },
  inactive: {
    
  }
})

