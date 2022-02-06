import { useState, useRef } from "react";
import type { NextPage } from "next";
import Head from "../components/Head";
import Navigation from "../components/Navigation";
import styles from "../styles/Home.module.scss";
import clsx from "clsx";
import crewmember from "../data.json";

const Crew: NextPage = () => {
  const [crew, setCrew] = useState<number>(0);
  const member = crewmember.crew[crew];

  const initial = useRef<number>(0);
  const limit = useRef<boolean>(false);

  return (
    <>
      <Head title={"Space Tourism - Crew"} />
      <div
        className={styles.crew}
        onTouchStart={(event) => (initial.current = event.targetTouches[0].clientX)}
        onTouchMove={(event) => {
          if (event.targetTouches[0].clientX > initial.current + 60 && crew > 0 && !limit.current) {
            limit.current = true;
            setCrew(crew - 1);
            setTimeout(() => (limit.current = false), 500);
          } else if (
            event.targetTouches[0].clientX < initial.current - 60 &&
            crew < 3 &&
            !limit.current
          ) {
            limit.current = true;
            setCrew(crew + 1);
            setTimeout(() => (limit.current = false), 500);
          }
        }}
      >
        <div className={styles.limit}>
          <Navigation />

          <main className={styles.main}>
            <button
              className={clsx(styles.arrow, crew === 0 && styles.hide)}
              onClick={() => {
                if (crew > 0) {
                  setCrew(crew - 1);
                }
              }}
            >
              <svg width="212" height="300">
                <path stroke="#979797" strokeWidth="3" fill="none" d="M130,50 L70,150 L130,250" />
              </svg>
            </button>

            <div className={styles.notArrow}>
              <h2 className={styles.section}>
                <span className={styles.number}>02</span>MEET YOUR CREW
              </h2>

              <div className={styles.content}>
                <div className={styles.imgContainer}>
                  <img src={member.images.png} alt={`${member.role} ${member.name}`} />
                </div>

                <div className={styles.container}>
                  <div className={styles.radio}>
                    <input
                      type="radio"
                      name="crew"
                      id="douglas"
                      value="douglas"
                      checked={crew === 0}
                      onChange={() => setCrew(0)}
                    />
                    <label htmlFor="douglas">
                      <div className={styles.label}></div>
                    </label>

                    <input
                      type="radio"
                      name="crew"
                      id="mark"
                      value="mark"
                      checked={crew === 1}
                      onChange={() => setCrew(1)}
                    />
                    <label htmlFor="mark">
                      <div className={styles.label}></div>
                    </label>

                    <input
                      type="radio"
                      name="crew"
                      id="victor"
                      value="victor"
                      checked={crew === 2}
                      onChange={() => setCrew(2)}
                    />
                    <label htmlFor="victor">
                      <div className={styles.label}></div>
                    </label>

                    <input
                      type="radio"
                      name="crew"
                      id="anousheh"
                      value="anousheh"
                      checked={crew === 3}
                      onChange={() => setCrew(3)}
                    />
                    <label htmlFor="anousheh">
                      <div className={styles.label}></div>
                    </label>
                  </div>

                  <div className={styles.crewDescription}>
                    <div className={styles.spacing}>
                      <p className={styles.position}>{member.role}</p>
                      <p className={styles.name}>{member.name}</p>
                    </div>

                    <p className={styles.bio}>{member.bio}</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              className={clsx(styles.arrow, crew === 3 && styles.hide)}
              onClick={() => {
                if (crew < 3) {
                  setCrew(crew + 1);
                }
              }}
            >
              <svg width="212" height="300">
                <path stroke="#979797" strokeWidth="3" fill="none" d="M82,50 L142,150 L82,250" />
              </svg>
            </button>
          </main>
        </div>
      </div>
    </>
  );
};

export default Crew;
