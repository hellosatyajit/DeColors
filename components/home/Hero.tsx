"use client";
import { useState } from "react";
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

const ImageUrl = [
    'https://utfs.io/f/52ca5768-dccf-4e60-ae04-76a51c5ecae1-a31zqe.jpg',
    'https://utfs.io/f/46e3b7e1-8f07-411a-9120-835cb1fdaeb7-8yqmbu.jpg',
    'https://utfs.io/f/bc16bcde-5abc-4be8-a15c-2e5daaf94ec9-w4fl6j.jpg',
    'https://utfs.io/f/9900eeb9-9b23-4ced-b0a4-88a49c519f9e-ngx3l4.jpg',
    'https://utfs.io/f/5d7f69a6-f559-4fa5-85b2-cd8e385a11bf-b3lb6x.jpg',
    'https://utfs.io/f/82a6aaa1-537b-4a6e-b362-cec80fec8eb9-iqkhbt.jpg',
    'https://utfs.io/f/ae58caea-bc0f-4c3f-a988-4dd776f53e6b-6fhxg.jpg',
    'https://utfs.io/f/06f44988-106d-4bf3-bfb2-7bc489f714a8-5cpdh3.jpg',
    'https://utfs.io/f/34971199-d1c9-475f-80d9-1b25fef466c7-3at44c.jpg',
]

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
        loop: true
    }, [
        (slider) => {
            let timeout: ReturnType<typeof setTimeout>
            let mouseOver = false
            function clearNextTimeout() {
                clearTimeout(timeout)
            }
            function nextTimeout() {
                clearTimeout(timeout)
                if (mouseOver) return
                timeout = setTimeout(() => {
                    slider.next()
                }, 5000)
            }
            slider.on("created", () => {
                slider.container.addEventListener("mouseover", () => {
                    mouseOver = true
                    clearNextTimeout()
                })
                slider.container.addEventListener("mouseout", () => {
                    mouseOver = false
                    nextTimeout()
                })
                nextTimeout()
            })
            slider.on("dragStarted", clearNextTimeout)
            slider.on("animationEnded", nextTimeout)
            slider.on("updated", nextTimeout)
        },
    ])

    return (
        <>
            <div className="navigation-wrapper relative">
                <div ref={sliderRef} className="keen-slider">
                    {
                        ImageUrl.map((url, index) => (
                            <div key={index} className="keen-slider__slide">
                                <img src={url} alt={''} className="w-full" />
                            </div>
                        ))
                    }
                </div>
                {loaded && instanceRef.current && (
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
                {loaded && instanceRef.current && (
                    <div className="dots absolute bottom-2 right-0 left-0">
                        <div className="m-auto w-fit space-x-2 ">
                            {[
                                ...Array(instanceRef.current.track.details.slides.length).keys(),
                            ].map((idx) => {
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            instanceRef.current?.moveToIdx(idx)
                                        }}
                                        className={`dot ${currentSlide === idx ? "bg-black" : "bg-gray-300"} w-2 h-2 rounded`}
                                    ></button>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </>
    )

}

function Arrow(props: {
    disabled: boolean
    left?: boolean
    size: number
    onClick: (e: any) => void
}) {
    const disabled = props.disabled ? " arrow--disabled" : ""
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
    )
}
