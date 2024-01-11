"use client";

import PrimaryNavbar from "@/core/components/navbar/PrimaryNavbar";
import useAssetManagerViewModel from "@/features/assetManager/viewModels/useAssetManagerViewModel";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AssetManager({ children }) {
  const viewModel = useAssetManagerViewModel();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <main className="relative">
      <article className="container mx-auto">
        <PrimaryNavbar
          isSignModalShow={viewModel.notAuthenticated}
          onClose={() => {
            router.push("/");
          }}
        />

        <h2 className="text-[40px] font-bold text-[#F3F3F3] my-[5rem]">
          Asset Manager
        </h2>

        <section className="flex flex-row items-center">
          <button
            onClick={() => {
              viewModel.setTab(0);
            }}
            className={`flex-1 p-5 text-center ${
              viewModel.tab === 0
                ? "text-cyan-400 border-b-2 border-cyan-400"
                : "text-gray-500"
            }`}
          >
            ALL PROPERTY
          </button>
          <button
            onClick={() => {
              viewModel.setTab(1);
            }}
            className={`flex-1 p-5 text-center ${
              viewModel.tab === 1
                ? "text-cyan-400 border-b-2 border-cyan-400"
                : "text-gray-500"
            }`}
          >
            E-CERTIFICATES
          </button>
        </section>
        <section className="mb-10">
          {viewModel.tab === 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
              {viewModel.isLoading
                ? "Loading"
                : !viewModel.notAuthenticated &&
                  viewModel.properties.map((row) => (
                    <Link
                      href={`/properties/${row.id}`}
                      key={row.id}
                      className="bg-zinc-900 rounded-lg p-5"
                    >
                      <div className="relative h-[20rem] w-full">
                        <Image
                          className="rounded-lg object-cover"
                          src={row.image[0]}
                          alt="Image"
                          fill
                        />
                        <span className="absolute top-3 left-3 bg-orange-400 py-1 px-3 rounded-lg text-white">
                          {row.category.hasOwnProperty("used")
                            ? "Used Home"
                            : "New Home"}
                        </span>
                      </div>
                      <h3 className="text-white text-2xl mt-3 mb-2">
                        {row.name}
                      </h3>
                      <p className="text-gray-500 flex flex-row mb-3">
                        <Image
                          className="mr-2"
                          src="/svg/point.svg"
                          alt="Point"
                          width={15}
                          height={15}
                        />
                        JL.Jeruk, Jakarta Selatan
                      </p>
                      <Image
                        src="/svg/break-line.svg"
                        alt="Break Line"
                        width={500}
                        height={25}
                      />
                      <p className="text-gray-500 flex flex-row items-center my-3">
                        <span>3842 sq ft</span>
                        <span className="w-1 h-1 bg-gray-500 rounded-full mx-2"></span>
                        <span>{row.bedroom} Beds</span>
                        <span className="w-1 h-1 bg-gray-500 rounded-full mx-2"></span>
                        <span>{row.bathroom} Baths</span>
                      </p>
                      <p className="text-cyan-400 text-2xl">
                        {Number(row.price)} ETH
                      </p>
                    </Link>
                  ))}
            </div>
          ) : (
            <>
              {viewModel.isLoading
                ? "Loading"
                : !viewModel.notAuthenticated &&
                  viewModel.properties.map((row) => (
                    <div key={row.id} className="bg-zinc-900 rounded-lg p-5">
                      <div className="flex flex-row items-center">
                        <div className="relative h-28 w-40 mr-5">
                          <Image
                            className="rounded-lg"
                            src="/images/img1.png"
                            alt="Image"
                            fill
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white mt-3 mb-2">
                            E-Certificate
                          </h3>
                          <p className="text-gray-500 flex flex-row mb-3">
                            ID: {row.id}
                          </p>
                          <p className="text-gray-500 flex flex-row mb-3">
                            <Image
                              className="mr-2"
                              src="/svg/point.svg"
                              alt="Point"
                              width={15}
                              height={15}
                            />
                            {row.address}
                          </p>
                        </div>
                        <button onClick={() => alert("download")}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                          >
                            <path
                              d="M12 14.5L11.2929 15.2071L12 15.9142L12.7071 15.2071L12 14.5ZM13 5.5C13 4.94772 12.5523 4.5 12 4.5C11.4477 4.5 11 4.94771 11 5.5L13 5.5ZM6.29289 10.2071L11.2929 15.2071L12.7071 13.7929L7.70711 8.79289L6.29289 10.2071ZM12.7071 15.2071L17.7071 10.2071L16.2929 8.79289L11.2929 13.7929L12.7071 15.2071ZM13 14.5L13 5.5L11 5.5L11 14.5L13 14.5Z"
                              fill="#62D9FF"
                            />
                            <path
                              d="M5 16.5L5 17.5C5 18.6046 5.89543 19.5 7 19.5L17 19.5C18.1046 19.5 19 18.6046 19 17.5V16.5"
                              stroke="#62D9FF"
                              stroke-width="2"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
            </>
          )}
        </section>
        <section>
          <hr className="border-gray-800" />
          <p className="text-gray-500 my-10">
            (c) 2023 TerraX. all Right Reserved
          </p>
        </section>
      </article>
    </main>
  );
}