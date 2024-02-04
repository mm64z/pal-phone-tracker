import { createSelector } from "@reduxjs/toolkit";
import React, { FC, ReactElement, useRef } from "react";
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { Team, TeamListState } from "./state/types";
import { TeamDisplay } from "./TeamDisplay";
import { IdMap } from "../types";

interface Parameters {}

export const TeamList: FC<Parameters> = ({
}): ReactElement => {
  const teamIDs = useSelector(mapStateToProps());
  const scrollView = useRef(null);

  return (
    <ScrollView ref={scrollView}>
      {teamIDs.map((teamID, i) => {
        return <TeamDisplay key={i} index={parseInt(teamID)}></TeamDisplay>
      })}
    </ScrollView>)
}

const selectTeams = ({ team }: { team: TeamListState}) => {
  return team.teams;
}

const mapStateToProps = () => {
  return createSelector([
    selectTeams,
    ],
    (teams: IdMap<Team>) => {
      return Object.keys(teams);
    }
  )
}