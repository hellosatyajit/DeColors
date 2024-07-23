import { Skeleton } from "./ui/skeleton";

export default function SkeletonLoading() {
    return (
        <section className="w-full text-transparent ">
            <div className="max-w-7xl m-auto px-5 py-10 space-y-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-20">
                    <div className="text-white text-[20px] w-full mx-auto static md:sticky top-[50px] flex flex-col lg:flex-row gap-5 h-fit">
                        <div className="order-1 lg:order-2 flex-1">
                            <Skeleton className="w-full aspect-square rounded-lg bg-rose-100" />
                        </div>

                        <div className="order-2 lg:order-1 flex flex-row lg:flex-col gap-2">
                            <Skeleton className="w-[60px] aspect-square rounded-lg bg-rose-100" />
                            <Skeleton className="w-[60px] aspect-square rounded-lg bg-rose-100" />
                            <Skeleton className="w-[60px] aspect-square rounded-lg bg-rose-100" />
                        </div>
                    </div>
                    <div className="flex-[1] py-3">
                        <Skeleton className="w-11/12 h-12 mb-2" />
                        <Skeleton className="w-1/2 h-7 mb-5" />

                        <div className="space-y-1 animate-pulse">
                            <p className="w-fit text-lg rounded-lg bg-rose-100">Lorem</p>
                            <p className="w-fit rounded-lg bg-rose-100">Lorem, ipsum dolor.</p>
                            <p className="w-fit rounded-lg bg-rose-100">Lorem ipsum dolor sit amet consectetur.</p>
                        </div>

                        <div className="my-10">
                            <div className="flex w-fit justify-between mb-2 text-md font-semibold rounded-lg bg-rose-100  animate-pulse">
                                Lorem, ipsum.
                            </div>

                            <div id="sizesGrid" className="flex flex-wrap gap-2">
                                <Skeleton className="w-10 h-10 aspect-square" />
                                <Skeleton className="w-10 h-10 aspect-square" />
                                <Skeleton className="w-10 h-10 aspect-square" />
                                <Skeleton className="w-10 h-10 aspect-square" />
                            </div>
                        </div>

                        <Skeleton className="w-full h-14 rounded-full mb-10" />
                        <Skeleton className="w-full h-24 aspect-square" />
                    </div>
                </div>
            </div>
        </section>
    )
}