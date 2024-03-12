"use client";
import Image from "next/image";
import { useState } from "react";
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

{/* <Image src={'https://d32baadbbpueqt.cloudfront.net/Homepage/de88d1b9-e164-4b36-a0bd-f3c78e7f7ec5.jpg'} alt={''} width={100} height={100} className="w-full h-full hidden xs:block" />
<Image src={'https://d32baadbbpueqt.cloudfront.net/Homepage/de88d1b9-e164-4b36-a0bd-f3c78e7f7ec5.jpg'} alt={''} width={100} height={100} className="w-full h-full block xs:hidden aspect-square" /> */}
// 1440x400

const ImageUrl = [
    'https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/1.png',
    'https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/2.png',
    'https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/3.png',
    'https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/4.png',
    'https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/5.png',
    'https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/6.png',
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
                    <div className="keen-slider__slide">
                        <Image src={ImageUrl[0]} alt={''} width={100} height={100} className="w-full h-full aspect-square xs:aspect-auto" />
                    </div>
                    <div className="keen-slider__slide">
                        <Image src={ImageUrl[1]} alt={''} width={100} height={100} className="w-full h-full aspect-square xs:aspect-auto" />
                    </div>
                    <div className="keen-slider__slide">
                        <Image src={ImageUrl[2]} alt={''} width={100} height={100} className="w-full h-full aspect-square xs:aspect-auto" />
                    </div>
                    <div className="keen-slider__slide">
                        <Image src={ImageUrl[3]} alt={''} width={100} height={100} className="w-full h-full aspect-square xs:aspect-auto" />
                    </div>
                    <div className="keen-slider__slide">
                        <Image src={ImageUrl[4]} alt={''} width={100} height={100} className="w-full h-full aspect-square xs:aspect-auto" />
                    </div>
                    <div className="keen-slider__slide">
                        <Image src={ImageUrl[5]} alt={''} width={100} height={100} className="w-full h-full aspect-square xs:aspect-auto" />
                    </div>
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
