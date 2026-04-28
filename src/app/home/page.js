"use client";

import styles from "./HomePage.module.css";
import useUser from "../../hooks/useUser";
import { useRouter } from "next/navigation";
import Button from '@/components/Button/Button';

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <>
      <div className={styles.overlay}>
        <section className={styles.hero}>
          <h1 className={styles['hero-title-mobile']}>
            Tu librería <span className={styles['title-highlight']}>universitaria</span>{" "}
            con coworking y cafetería
          </h1>
          <h1 className={`${styles['hero-title']} ${styles['hero-title-desktop']}`}>
            Tu librería <span className={styles['title-highlight']}>universitaria</span>{" "}
            con espacios de coworking y cafetería en Aranjuez
          </h1>
          <h2 className={styles['hero-subtitle']}>
            Somos tu espacio universitario integral donde encontrarás textos
            académicos, zonas de estudio colaborativo y una cafetería pensada
            para estudiantes.
          </h2>
          <div className={styles.botonesContainer}>
          <Button 
          label= "Explorar catálogo" 
          variant="primary" 
          onClick={() => router.push("/library")} 
          />

    
          {!user && (
            <Button 
            label= "Iniciar Sesión" 
            variant="secondary" 
            onClick={() => router.push("/auth")} 
            />
            
          )} 
          </div>

          <video className={styles['hero-video']} autoPlay loop muted playsInline>
            <source src="/video/hero.mp4" type="video/mp4" />
            Tu navegador no soporta video.
          </video>
        </section>

        <section className={styles.sponsor}>
          <span className={styles['sponsor-text']}>
            De la mano con nuestros patrocinadores
          </span>
          <div className={styles['sponsor-brands']}>
            <img className={styles['sponsor-brand']} src="/images/svg/unir.svg" alt="UNIR logo" />
            <img className={styles['sponsor-brand']} src="/images/svg/kindle.svg" alt="Kindle logo" />
            <img
              className={styles['sponsor-brand']}
              src="/images/svg/cambrige.svg"
              alt="Cambridge logo"
            />
            <img className={styles['sponsor-brand']} src="/images/svg/oxford.svg" alt="Oxford logo" />
            <img className={styles['sponsor-brand']} src="/images/svg/scribd.svg" alt="Scribd logo" />
          </div>
        </section>

        <section className={styles.overview}>
          <h2 className={styles['overview-title']}>
            Todo para tu vida <span className={styles['title-highlight']}>académica</span>
          </h2>
          <span className={styles.subtitle}>
            Somos tu espacio universitario integral donde encontrarás textos
            académicos, zonas de estudio colaborativo y una cafetería pensada
            para estudiantes.
          </span>

          <div className={styles.cards}>
            <div className={styles.card}>
              <div className={styles['icon-card']}>
                <i className="icon-book"></i>
              </div>
              <div className={styles.content}>
                <span>3.000+</span>
                <p>Libros disponibles</p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles['icon-card']}>
                <i className="icon-happy"></i>
              </div>
              <div className={styles.content}>
                <span>1.500+</span>
                <p>Estudiantes felices</p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles['icon-card']}>
                <i className="icon-users"></i>
              </div>
              <div className={styles.content}>
                <span>8</span>
                <p>Espacios Coworking</p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles['icon-card']}>
                <i className="icon-mug"></i>
              </div>
              <div className={styles.content}>
                <span>3</span>
                <p>Cafeterías disponibles</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <h2>Comienza tu experiencia Nexus</h2>
          <span>
            Únete a más de 1.500 estudiantes que ya confían en Nexus para sus
            materiales de estudio y espacios de trabajo.
          </span>

          <Button 
          label= "Explorar catálogo" 
          variant="primary-white" 
          onClick={() => router.push("/library")} 
          />
        
        </section>
      </div>
    </>
  );
}