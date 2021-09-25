import React, { useState, useEffect } from 'react';
import fetchActivities from '../service/activities';
import './Styles.scss';

const Main = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchActivities()
      .then((response) => response.json())
      .then((activities) => setActivities(activities));
  }, []);

  return (
    <div>
      <div className="col block center"><strong>Activity Name :</strong> <span data-test="activity-name">{activities.activity}</span></div>
      <div className="col block center"><strong>Activity Type :</strong> <span data-test="activity-type">{activities.type}</span></div>
      <div className="col block center"><strong>Activity Participants Number :</strong> <span data-test="activity-participants">{activities.participants}</span></div>
      <div className="col block center"><strong>Activity Price :</strong> <span data-test="activity-price">£{activities.price}</span></div>
    </div>
  );
};

export default Main;
