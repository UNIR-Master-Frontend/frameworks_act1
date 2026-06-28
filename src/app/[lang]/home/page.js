"use client";

import styles from "./HomePage.module.css";
import useUser from "../../../hooks/useUser";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import { useLang, useMessages } from "@/context/LanguageContext";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  const lang = useLang();
  const t = useMessages().home;

  return (
    <>
      <div className={styles.overlay}>
        <section className={styles.hero}>
          <h1 className={styles["hero-title-mobile"]}>
            {t.heroTitleStart}{" "}
            <span className={styles["title-highlight"]}>
              {t.heroTitleHighlight}
            </span>{" "}
            {t.heroTitleEndMobile}
          </h1>
          <h1
            className={`${styles["hero-title"]} ${styles["hero-title-desktop"]}`}
          >
            {t.heroTitleStart}{" "}
            <span className={styles["title-highlight"]}>
              {t.heroTitleHighlight}
            </span>{" "}
            {t.heroTitleEndDesktop}
          </h1>
          <h2 className={styles["hero-subtitle"]}>{t.heroSubtitle}</h2>
          <div className={styles.botonesContainer}>
            <Button
              label={t.exploreCatalog}
              variant="primary"
              onClick={() => router.push(`/${lang}/library`)}
            />

            {!user && (
              <Button
                label={t.login}
                variant="secondary"
                onClick={() => router.push(`/${lang}/authorization`)}
              />
            )}
          </div>

          <video
            className={styles["hero-video"]}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/video/hero.mp4" type="video/mp4" />
            Tu navegador no soporta video.
          </video>
        </section>

        <section className={styles.sponsor}>
          <span className={styles["sponsor-text"]}>{t.sponsorText}</span>
          <div className={styles["sponsor-brands"]}>
            <img
              className={styles["sponsor-brand"]}
              src="/images/svg/unir.svg"
              alt="UNIR logo"
            />
            <img
              className={styles["sponsor-brand"]}
              src="/images/svg/kindle.svg"
              alt="Kindle logo"
            />
            <img
              className={styles["sponsor-brand"]}
              src="/images/svg/cambrige.svg"
              alt="Cambridge logo"
            />
            <img
              className={styles["sponsor-brand"]}
              src="/images/svg/oxford.svg"
              alt="Oxford logo"
            />
            <img
              className={styles["sponsor-brand"]}
              src="/images/svg/scribd.svg"
              alt="Scribd logo"
            />
          </div>
        </section>

        <section className={styles.overview}>
          <h2 className={styles["overview-title"]}>
            {t.overviewTitleStart}{" "}
            <span className={styles["title-highlight"]}>
              {t.overviewTitleHighlight}
            </span>
          </h2>
          <span className={styles.subtitle}>{t.heroSubtitle}</span>

          <div className={styles.cards}>
            <div className={styles.card}>
              <div className={styles["icon-card"]}>
                <i className="icon-book"></i>
              </div>
              <div className={styles.content}>
                <span>3.000+</span>
                <p>{t.statsBooks}</p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles["icon-card"]}>
                <i className="icon-happy"></i>
              </div>
              <div className={styles.content}>
                <span>1.500+</span>
                <p>{t.statsStudents}</p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles["icon-card"]}>
                <i className="icon-users"></i>
              </div>
              <div className={styles.content}>
                <span>8</span>
                <p>{t.statsCoworking}</p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles["icon-card"]}>
                <i className="icon-mug"></i>
              </div>
              <div className={styles.content}>
                <span>3</span>
                <p>{t.statsCafeterias}</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <h2>{t.ctaTitle}</h2>
          <span>{t.ctaText}</span>

          <Button
            label={t.exploreCatalog}
            variant="primary-white"
            onClick={() => router.push(`/${lang}/library`)}
          />
        </section>
      </div>
    </>
  );
}
