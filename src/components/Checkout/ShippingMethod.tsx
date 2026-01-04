import React, { useState } from "react";
import Image from "next/image";

type Props = {
  onChangeShipping: (value: number) => void;
};

const ShippingMethod: React.FC<Props> = ({ onChangeShipping }) => {
  const [shippingMethod, setShippingMethod] = useState("free");
  return (
    <div className="bg-white shadow-1 rounded-[10px] mt-7.5">
      <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
        <h3 className="font-medium text-xl text-dark">Método de Entrega</h3>
      </div>

      <div className="p-4 sm:p-8.5">
        <div className="flex flex-col gap-4">
          <label
            htmlFor="free"
            className="flex cursor-pointer select-none items-center gap-3.5"
          >
            <div className="relative">
              <input
                type="radio"
                name="shipping"
                id="free"
                className="sr-only"
                checked={shippingMethod === "free"}
                onChange={() => {
                  setShippingMethod("free");
                  onChangeShipping(0);
                }}
              />
              {/* selectShipping === 'free' ? 'border-4 border-blue' : 'border border-gray-4' */}
              <div
                className={`flex h-4 w-4 items-center justify-center rounded-full ${
                  shippingMethod === "free"
                    ? "border-4 border-blue"
                    : "border border-gray-4"
                }`}
              ></div>
            </div>
            Frete Grátis - Até 7 dias úteis
          </label>

          <label
            htmlFor="fedex"
            className="flex cursor-pointer select-none items-center gap-3.5"
          >
            <div className="relative">
              <input
                type="radio"
                name="shipping"
                id="fedex"
                className="sr-only"
                checked={shippingMethod === "fedex"}
                onChange={() => {
                  setShippingMethod("fedex");
                  onChangeShipping(10.99);
                }}
              />
              <div
                className={`flex h-4 w-4 items-center justify-center rounded-full ${
                  shippingMethod === "fedex"
                    ? "border-4 border-blue"
                    : "border border-gray-4"
                }`}
              ></div>
            </div>

            <div className="rounded-md w-full border-[0.5px] py-3.5 px-5 ease-out duration-200 hover:bg-gray-2 hover:border-transparent hover:shadow-none">
              <div className="flex items-center">
                <div className="pr-4">
                  <Image
                    src="/images/checkout/fedex.svg"
                    alt="fedex"
                    width={64}
                    height={18}
                  />
                </div>

                <div className="border-l border-gray-4 pl-4">
                  <p className="font-semibold text-dark">R$10.99</p>
                  <p className="text-custom-xs">Sedex até 7 dias úteis</p>
                </div>
              </div>
            </div>
          </label>

          <label
            htmlFor="dhl"
            className="flex cursor-pointer select-none items-center gap-3.5"
          >
            <div className="relative">
            <input
              type="radio"
              name="shipping"
              id="dhl"
              className="sr-only"
              checked={shippingMethod === "dhl"}
              onChange={() => {
                setShippingMethod("dhl");
                onChangeShipping(12.50);
              }}
            />
              <div
                className={`flex h-4 w-4 items-center justify-center rounded-full ${
                  shippingMethod === "dhl"
                    ? "border-4 border-blue"
                    : "border border-gray-4"
                }`}
              ></div>
            </div>

            <div className="rounded-md w-full border-[0.5px] py-3.5 px-5 ease-out duration-200 hover:bg-gray-2 hover:border-transparent hover:shadow-none">
              <div className="flex items-center">
                <div className="pr-4">
                  <Image
                    src="/images/checkout/dhl.svg"
                    alt="dhl"
                    width={64}
                    height={20}
                  />
                </div>

                <div className="border-l border-gray-4 pl-4">
                  <p className="font-semibold text-dark">R$12.50</p>
                  <p className="text-custom-xs">DHL até 5 dias úteis</p>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ShippingMethod;
