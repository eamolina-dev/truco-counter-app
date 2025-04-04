import React from "react";
import Buttons from "../molecules/Buttons";
import { Colors } from "../../lib/constants/colors";

const ScoreButtonGroup = ({ team, onPressLeft, onPressRight }) => (
  <Buttons
    leftButton='minus'
    rightButton='plus'
    onPressLeft={() => onPressLeft({team})}
    onPressRight={() => onPressRight({team})} 
    color={Colors.white}
  />
);

export default ScoreButtonGroup;
