import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";
import { initialFX } from "./utils/initialFX";
import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (percent >= 100) {
      const t1 = setTimeout(() => {
        setLoaded(true);
        const t2 = setTimeout(() => {
          setIsLoaded(true);
        }, 250);
        return () => clearTimeout(t2);
      }, 150);
      return () => clearTimeout(t1);
    }
  }, [percent]);

  useEffect(() => {
    if (!isLoaded) return;
    setClicked(true);
    const t3 = setTimeout(() => {
      if (initialFX) {
        initialFX();
      }
      setIsLoading(false);
    }, 350);
    return () => clearTimeout(t3);
  }, [isLoaded, setIsLoading]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          VIVEK
        </a>
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee>
            <span> A Creative Developer</span> <span>An SEO Specialist</span>
            <span> A Creative Developer</span> <span>An SEO Specialist</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  const interval = setInterval(() => {
    if (percent < 85) {
      const step = Math.floor(Math.random() * 8) + 8;
      percent = Math.min(85, percent + step);
      setLoading(percent);
    }
  }, 40);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      let current = percent;
      const finishInterval = setInterval(() => {
        if (current < 100) {
          current = Math.min(100, current + 10);
          setLoading(current);
        } else {
          clearInterval(finishInterval);
          resolve(100);
        }
      }, 15);
    });
  }
  return { loaded, percent, clear };
};
