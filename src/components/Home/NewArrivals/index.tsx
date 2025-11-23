import React from "react";
import Image from "next/image";
import Link from "next/link";
import shopData from "@/components/Shop/shopData";

const NewArrival = () => {
  return (
    <section className="overflow-hidden pt-15">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">

        {/* Título */}
        <div className="mb-7 flex items-center justify-between">
          <div>
            <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M3.11826 15.4622C4.11794 16.6668 5.97853 16.6668 9.69971 16.6668H10.3007C14.0219 16.6668 15.8825 16.6668 16.8821 15.4622M3.11826 15.4622C2.11857 14.2577 2.46146 12.429 3.14723 8.77153C3.63491 6.17055 3.87875 4.87006 4.8045 4.10175M3.11826 15.4622C3.11826 15.4622 3.11826 15.4622 3.11826 15.4622ZM16.8821 15.4622C17.8818 14.2577 17.5389 12.429 16.8532 8.77153C16.3655 6.17055 16.1216 4.87006 15.1959 4.10175M16.8821 15.4622C16.8821 15.4622 16.8821 15.4622 16.8821 15.4622ZM15.1959 4.10175C14.2701 3.33345 12.947 3.33345 10.3007 3.33345H9.69971C7.0534 3.33345 5.73025 3.33345 4.8045 4.10175M15.1959 4.10175C15.1959 4.10175 15.1959 4.10175 15.1959 4.10175ZM4.8045 4.10175C4.8045 4.10175 4.8045 4.10175 4.8045 4.10175Z"
                  stroke="#3C50E0"
                  strokeWidth="1.5"
                />
              </svg>
              Produtos
            </span>
            <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
              Novidades
            </h2>
          </div>

          <Link
            href="/shop-with-sidebar"
            className="inline-flex font-medium text-custom-sm py-2.5 px-7 rounded-md border-gray-3 border bg-gray-1 text-dark hover:bg-dark hover:text-white hover:border-transparent"
          >
            Ver todos
          </Link>
        </div>

        {/* Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7.5 gap-y-9">
          {shopData.map((item, key) => (
            <Link
              key={key}
              href={`/requeijao-vigor-200ml`} // URL fixa para testes
              className="block"
            >
              <div className="border rounded-lg p-3 hover:shadow-lg transition">
                <Image
                  src={`/tese`}
                  alt={item.title}
                  width={300}
                  height={300}
                  className="w-full h-auto"
                />
                <h3 className="mt-3 text-dark font-medium">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default NewArrival;
