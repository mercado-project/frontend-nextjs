"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";

type OrderItem = {
  id: number;
  quantity: number;
  unitPrice: string;
  product: {
    id: number;
    name: string;
  };
};

type Order = {
  id: number;
  orderDate: string;
  status: string;
  paymentMethod: string;
  totalAmount: string;
  shippingFee: number;
  items: OrderItem[];
};

type ProfileAuth = {
  sub: number;
  email: string;
  role: string;
};

const Pedidos = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // 🔹 profile
        const profileRes = await fetch(
          "http://localhost:3002/auth/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!profileRes.ok) return;

        const profile: ProfileAuth = await profileRes.json();

        // 🔹 user → customer
        const userRes = await fetch(
          `http://localhost:3002/users/${profile.sub}`
        );
        if (!userRes.ok) return;

        const userData = await userRes.json();
        const customerId = userData.customer?.id;
        if (!customerId) return;

        // 🔹 orders
        const ordersRes = await fetch(
          `http://localhost:3002/orders/customer/${customerId}`
        );

        if (ordersRes.ok) {
          const data = await ordersRes.json();
          setOrders(data);
        }
      } catch (err) {
        console.error("Erro ao carregar pedidos:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <>
      <Breadcrumb title={"Meus Pedidos"} pages={["pedidos"]} />

      <section className="py-10 bg-gray-2">
        <div className="max-w-[900px] mx-auto px-4 sm:px-8">

          {loading && (
            <p className="text-center text-gray-500">
              Carregando pedidos...
            </p>
          )}

          {!loading && orders.length === 0 && (
            <p className="text-center text-gray-500">
              Você ainda não possui pedidos.
            </p>
          )}

          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-[10px] shadow-1 p-6"
              >
                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      Pedido em{" "}
                      {new Date(order.orderDate).toLocaleDateString("pt-BR")}
                    </p>

                    <p className="text-lg font-bold text-dark capitalize">
                      {order.status}
                    </p>
                  </div>

                  <div className="mt-2 sm:mt-0 text-sm text-gray-600">
                    Pagamento:{" "}
                    <span className="capitalize">
                      {order.paymentMethod}
                    </span>
                  </div>
                </div>

                {/* PRODUTOS */}
                <div className="border-t border-gray-3 pt-4">
                  <p className="text-sm font-medium mb-2">
                    Produtos
                  </p>

                  <ul className="space-y-1">
                    {order.items.map((item) => (
                      <li
                        key={item.id}
                        className="text-sm text-gray-600 truncate"
                      >
                        {item.product.name}{" "}
                        <span className="text-xs text-gray-400">
                          x{item.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* TOTAL */}
                <div className="border-t border-gray-3 pt-4 mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">Frete</span>
                  <span className="text-sm text-dark">
                    {`R$ ${order.shippingFee}`}
                  </span>
                </div>
                <div className="border-t border-gray-3 pt-4 mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Total
                  </span>
                  <span className="font-semibold text-dark">
                    R$ {(Number(order.shippingFee)+Number(order.totalAmount)).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Pedidos;
