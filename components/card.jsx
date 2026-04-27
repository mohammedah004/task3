import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faBoxOpen, faCirclePlus, faUsersGear } from "@fortawesome/free-solid-svg-icons";
export const Card = ({type,number,icon}) => {
      return (
      <div class="card">
            <div className="title">
                  <FontAwesomeIcon icon={icon} className="cardIcon"/>
                  <h3>{type}</h3>
            </div>
            <div className="number">{number}</div>
      </div>
      )
}
