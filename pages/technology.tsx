import { useState, useRef } from "react";
import type { NextPage } from "next";
import Head from "../components/Head";
import Navigation from "../components/Navigation";
import styles from "../styles/Home.module.scss";
import sequence from "../data.json";

const Technology: NextPage = () => {
  const [tech, setTech] = useState<number>(0);
  const techs = sequence.technology[tech];

  const initial = useRef<number>(0);
  const limit = useRef<boolean>(false);

  return (
    <>
      <Head title={"Space Tourism - Technology"} />
      <div
        className={styles.technology}
        onTouchStart={(event) => (initial.current = event.targetTouches[0].clientX)}
        onTouchMove={(event) => {
          if (event.targetTouches[0].clientX > initial.current + 60 && tech > 0 && !limit.current) {
            limit.current = true;
            setTech(tech - 1);
            setTimeout(() => (limit.current = false), 500);
          } else if (
            event.targetTouches[0].clientX < initial.current - 60 &&
            tech < 3 &&
            !limit.current
          ) {
            limit.current = true;
            setTech(tech + 1);
            setTimeout(() => (limit.current = false), 500);
          }
        }}
      >
        <div className={styles.limit}>
          <Navigation />

          <main className={styles.main}>
            <h2 className={styles.section}>
              <span className={styles.number}>03</span>SPACE LAUNCH 101
            </h2>

            <div className={styles.content}>
              <div className={styles.imgContainer}>
                <img
                  srcSet={`/img/technology/image-${techs.identifier}-landscape.jpg 768w,
                         /img/technology/image-${techs.identifier}-portrait.jpg 515w`}
                  sizes="(max-width: 1280px) 1280px,
                       515px"
                />
              </div>

              <div className={styles.container}>
                <div className={styles.radio}>
                  <input
                    type="radio"
                    name="tech"
                    id="launch"
                    value="launch"
                    checked={tech === 0}
                    onChange={() => setTech(0)}
                  />
                  <label htmlFor="launch">
                    <p>1</p>
                  </label>

                  <input
                    type="radio"
                    name="tech"
                    id="port"
                    value="port"
                    checked={tech === 1}
                    onChange={() => setTech(1)}
                  />
                  <label htmlFor="port">
                    <p>2</p>
                  </label>

                  <input
                    type="radio"
                    name="tech"
                    id="capsule"
                    value="capsule"
                    checked={tech === 2}
                    onChange={() => setTech(2)}
                  />
                  <label htmlFor="capsule">
                    <p>3</p>
                  </label>
                </div>

                <div className={styles.description}>
                  <div className={styles.spacing}>
                    <p className={styles.terminology}>THE TERMINOLOGY...</p>
                    <p className={styles.name}>{techs.name}</p>
                  </div>

                  <p className={styles.techDescription}>{techs.description}</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Technology;
