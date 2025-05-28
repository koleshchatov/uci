import { useEffect, useState } from "react";
import getTotalUsersOhuel from "../../../services/ohuel.service";
import { ImageContainer } from "../../Pictures/ImageContainer.js";
import Picture from "../../Pictures";

import styles from "./ohuelstats.module.css";

export default function OhuelStatistic() {
  const [isTotalOhuelUsers, setIsTotalOhuelUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getTotalOhuel() {
      setIsLoading(true);
      const ohuelStats = await getTotalUsersOhuel("true");
      setIsLoading(false);
      const ohuelUsers = ohuelStats.stats;
      const usersOhuels = (value) => {
        const ohuelUsers = {};
        for (let i = 0; i < value.length; i++) {
          ohuelUsers[value[i].name] = value[i].count;
        }
        return ohuelUsers;
      };

      const newIsTotalOhuelUsers = usersOhuels(ohuelUsers);
      setIsTotalOhuelUsers(newIsTotalOhuelUsers);
    }
    getTotalOhuel();
  }, []);

  console.log(isTotalOhuelUsers);

  return (
    <>
      <div style={{ fontSize: 100 }}>ТОПОВЫЕ ОХУЕВШИЕ</div>
      <div style={{ display: "flex" }}>
        {Object.entries(isTotalOhuelUsers).map(([key, value]) => (
          <>
            <figure>
              <Picture
                image={ImageContainer[key]}
                className={styles.pictureOhuel}
                key={key}
              />
              <figcaption>стал охуевшим {value} раз</figcaption>
            </figure>
          </>
        ))}
      </div>
    </>
  );
}
