"use client";
import { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { fetchHeroImages } from "@/server/actions/ProductActions";
import SkeletonLoader from "./Skeletionloader";

interface HeroImage {
  url: string;
  image: string;
}

const MAX_RETRIES = 5;

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    loop: true,
  }, [
    (slider) => {
      let timeout: ReturnType<typeof setTimeout>;
      let mouseOver = false;
      function clearNextTimeout() {
        clearTimeout(timeout);
      }
      function nextTimeout() {
        clearTimeout(timeout);
        if (mouseOver) return;
        if (slider.next && slider.track.details?.slides.length > 0) {
        timeout = setTimeout(() => {
          if (slider.next) {
            slider.next();
          } else {
            console.error("Slider is not initialized");
          }
        
        }, 5000);
    }
      }
      slider.on("created", () => {
        slider.container.addEventListener("mouseover", () => {
          mouseOver = true;
          clearNextTimeout();
        });
        slider.container.addEventListener("mouseout", () => {
          mouseOver = false;
          nextTimeout();
        });
        nextTimeout();
      });
      slider.on("dragStarted", clearNextTimeout);
      slider.on("animationEnded", nextTimeout);
      slider.on("updated", nextTimeout);
    },
  ]);

  const fetchImages = async (retries = 0) => {
    try {
      const response = await fetchHeroImages();
      setHeroImages(response);
    } catch (error:any) {
      if (error.response && error.response.status === 429 && retries < MAX_RETRIES) {
        const retryAfter = error.response.headers['retry-after'] || Math.pow(2, retries);
        setTimeout(() => fetchImages(retries + 1), retryAfter * 1000);
      } else {
        console.error("Failed to fetch hero images:", error);
      }
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      <div className="navigation-wrapper relative">
        <div ref={sliderRef} className="keen-slider">
          {!loaded && <SkeletonLoader />}
          {heroImages.length > 0 && heroImages.map((item, index) => (
            <div key={index} className="keen-slider__slide">
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <img src={item.image} alt={`Slide ${index}`} className="w-full" />
              </a>
            </div>
          ))}
        </div>
        {!loaded && <SkeletonLoader />}
        {loaded && instanceRef.current && instanceRef.current.track?.details && (
          <>
            <div className="absolute left-2 xs:left-10 bottom-[calc(50%-16px)] w-8 h-8 cursor-pointer opacity-50 hover:opacity-100 transition-all mx-auto">
              <Arrow
                left
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
                size={32}
              />
            </div>

            <div className="absolute right-2 xs:right-10 bottom-[calc(50%-16px)] w-8 h-8 cursor-pointer opacity-50 hover:opacity-100 transition-all mx-auto">
              <Arrow
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                disabled={
                  currentSlide ===
                  instanceRef.current.track.details.slides.length - 1
                }
                size={32}
              />
            </div>
          </>
        )}
        {loaded && instanceRef.current && instanceRef.current.track?.details && (
          <div className="dots absolute bottom-2 right-0 left-0">
            <div className="m-auto w-fit space-x-2 ">
              {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      instanceRef.current?.moveToIdx(idx);
                    }}
                    className={`dot ${currentSlide === idx ? "bg-black" : "bg-gray-300"} w-2 h-2 rounded`}
                  ></button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  size: number;
  onClick: (e: any) => void;
}) {
  const disabled = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${props.left ? "arrow--left" : "arrow--right"
        } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      width={props.size}
      height={props.size}
    >
      {props.left && (
        <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
      )}
      {!props.left && (
        <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
      )}
    </svg>
  );
}
