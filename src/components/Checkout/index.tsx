// "use client";

// import React, { useEffect, useState } from "react";
// import Breadcrumb from "../Common/Breadcrumb";
// import ShippingMethod from "./ShippingMethod";
// import PaymentMethod from "./PaymentMethod";
// import Coupon from "./Coupon";
// import Billing from "./Billing";
// import { useAppSelector } from "@/redux/store";

// type ProfileAuth = {
//   sub: number;
//   email: string;
//   role: string;
// };

// type Customer = {
//   id: number;
//   fullName: string;
//   phone: string;
// };

// type Address = {
//   id: number;
//   street: string;
//   number: string;
//   neighborhood: string;
//   complement?: string;
//   city: string;
//   state: string;
//   cep: string;
// };

// const Checkout = () => {
//   const cartItems = useAppSelector((state) => state.cartReducer.items);
//   const [customer, setCustomer] = useState<Customer | null>(null);
//   const [email, setEmail] = useState("");
//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
//     null
//   );
//   const [showNewAddressForm, setShowNewAddressForm] = useState(false);
//   const [shippingFee, setShippingFee] = useState(0);

//   const [newAddress, setNewAddress] = useState({
//     street: "",
//     number: "",
//     neighborhood: "",
//     complement: "",
//     city: "",
//     state: "",
//     cep: "",
//   });

//   const emptyAddress = {
//     street: "",
//     number: "",
//     neighborhood: "",
//     complement: "",
//     city: "",
//     state: "",
//     cep: "",
//   };

//   const subtotal = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   const total = subtotal + shippingFee;

//   /* ===== LOAD PROFILE ===== */
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;

//         // AUTH
//         const authRes = await fetch("http://localhost:3002/auth/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!authRes.ok) return;
//         const profile: ProfileAuth = await authRes.json();
//         setEmail(profile.email);

//         // USER -> CUSTOMER
//         const userRes = await fetch(
//           `http://localhost:3002/users/${profile.sub}`
//         );
//         if (!userRes.ok) return;
//         const userData = await userRes.json();

//         const customerData = userData.customer;
//         if (!customerData) return;

//         setCustomer(customerData);

//         // ADDRESSES
//         const addrRes = await fetch(
//           `http://localhost:3002/addresses/customer/${customerData.id}`
//         );

//         if (addrRes.ok) {
//           const data = await addrRes.json();
//           if (Array.isArray(data) && data.length > 0) {
//             setAddresses(data);
//             setSelectedAddressId(data[0].id); // ✅ primeiro selecionado
//           }
//         }
//       } catch (err) {
//         console.error("Erro no checkout:", err);
//       }
//     };

//     loadData();
//   }, []);

//   return (
//     <>
//       <Breadcrumb title={"Checkout"} pages={["checkout"]} />
      // <section className="overflow-hidden py-10 bg-gray-2">
      //   <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
      //     <form>
      //       <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
      //         {/* ===== CHECKOUT LEFT ===== */}
      //         <div className="lg:max-w-[670px] w-full space-y-7.5">

      //           {/* ===== CUSTOMER DETAILS ===== */}
      //           <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5">
      //             <h3 className="text-xl font-medium mb-6">
      //               Detalhes do Cliente
      //             </h3>

      //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      //               <div>
      //                 <label className="block mb-2 text-sm">Nome</label>
      //                 <input
      //                   value={customer?.fullName || ""}
      //                   disabled
      //                   className="w-full rounded-md border bg-gray-1 p-3 opacity-70"
      //                 />
      //               </div>

      //               <div>
      //                 <label className="block mb-2 text-sm">Email</label>
      //                 <input
      //                   value={email}
      //                   disabled
      //                   className="w-full rounded-md border bg-gray-1 p-3 opacity-70"
      //                 />
      //               </div>

      //               <div>
      //                 <label className="block mb-2 text-sm">Telefone</label>
      //                 <input
      //                   value={customer?.phone || ""}
      //                   disabled
      //                   className="w-full rounded-md border bg-gray-1 p-3 opacity-70"
      //                 />
      //               </div>
      //             </div>
      //           </div>

      //           {/* ===== ADDRESS SELECTION ===== */}
      //           <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5">
      //             <h3 className="text-xl font-medium mb-6">
      //               Endereço de Entrega
      //             </h3>

      //             {addresses.length === 0 && (
      //               <p className="text-sm text-gray-500">
      //                 Nenhum endereço cadastrado
      //               </p>
      //             )}

      //             <div className="space-y-3">
      //               {addresses.map((addr) => {
      //                 const selected =
      //                   addr.id === selectedAddressId && !newAddress.street.trim();

      //                 return (
      //                   <div
      //                     key={addr.id}
      //                     onClick={() => setSelectedAddressId(addr.id)}
      //                     className={`cursor-pointer rounded-md border p-4 text-sm transition
      //                       ${
      //                         selected
      //                           ? "border-blue bg-blue/5"
      //                           : "border-gray-3 hover:border-blue"
      //                       }`}
      //                   >
      //                     <p>
      //                       {addr.street}, {addr.number}
      //                       {addr.complement && ` - ${addr.complement}`}
      //                     </p>
      //                     <p>{addr.neighborhood}</p>
      //                     <p>
      //                       {addr.city} - {addr.state}
      //                     </p>
      //                     <p>CEP: {addr.cep}</p>
      //                   </div>
      //                 );
      //               })}
      //             </div>
      //               <br></br>
      //               <div className="flex items-center justify-between mb-4">

      //               <button
      //                 type="button"
      //                 onClick={() => {
      //                   // se estiver cancelando
      //                   if (showNewAddressForm) {
      //                     setNewAddress(emptyAddress);
      //                     if (addresses.length > 0) {
      //                       setSelectedAddressId(addresses[0].id);
      //                     }
      //                   }

      //                   setShowNewAddressForm((prev) => !prev); // mostra/esconde
      //                 }}
      //                 className="text-sm text-blue font-medium hover:underline"
      //               >
      //                 {showNewAddressForm ? "Cancelar" : "Inserir um endereço"}
      //               </button>
      //               </div>
      //                 {showNewAddressForm && (
      //                   <div
      //                   className={`mb-6 rounded-md border p-4 space-y-4 transition
      //                     ${
      //                       newAddress.street.trim()
      //                         ? "border-blue bg-blue/5"
      //                         : "border-gray-3 bg-gray-1"
      //                     }
      //                   `}
      //                 >
      //                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      //                     <input
      //                       value={newAddress.street}
      //                       onChange={(e) => {
      //                         setNewAddress({ ...newAddress, street: e.target.value });

      //                         // 🔴 remove seleção dos endereços salvos
      //                         if (selectedAddressId !== null) {
      //                           setSelectedAddressId(null);
      //                         }
      //                       }}
      //                       className="w-full rounded-md border p-3"
      //                     />

      //                     <input
      //                       placeholder="Número"
      //                       value={newAddress.number}
      //                       onChange={(e) =>
      //                         setNewAddress({ ...newAddress, number: e.target.value })
      //                       }
      //                       className="w-full rounded-md border p-3"
      //                     />

      //                     <input
      //                       placeholder="Bairro"
      //                       value={newAddress.neighborhood}
      //                       onChange={(e) =>
      //                         setNewAddress({ ...newAddress, neighborhood: e.target.value })
      //                       }
      //                       className="w-full rounded-md border p-3"
      //                     />

      //                     <input
      //                       placeholder="Complemento (opcional)"
      //                       value={newAddress.complement}
      //                       onChange={(e) =>
      //                         setNewAddress({ ...newAddress, complement: e.target.value })
      //                       }
      //                       className="w-full rounded-md border p-3"
      //                     />

      //                     <input
      //                       placeholder="Cidade"
      //                       value={newAddress.city}
      //                       onChange={(e) =>
      //                         setNewAddress({ ...newAddress, city: e.target.value })
      //                       }
      //                       className="w-full rounded-md border p-3"
      //                     />

      //                     <input
      //                       placeholder="Estado"
      //                       value={newAddress.state}
      //                       onChange={(e) =>
      //                         setNewAddress({ ...newAddress, state: e.target.value })
      //                       }
      //                       className="w-full rounded-md border p-3"
      //                     />

      //                     <input
      //                       placeholder="CEP"
      //                       value={newAddress.cep}
      //                       onChange={(e) =>
      //                         setNewAddress({ ...newAddress, cep: e.target.value })
      //                       }
      //                       className="w-full rounded-md border p-3"
      //                     />
      //                   </div>
      //                 </div>
      //               )}
      //           </div>

      //           {/* ===== OTHER NOTES ===== */}
      //           <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5">
      //             <label htmlFor="notes" className="block mb-2.5">
      //               Observações (opcional)
      //             </label>

      //             <textarea
      //               id="notes"
      //               rows={5}
      //               placeholder="Escreva sobre seu pedido ou forma de entrega."
      //               className="rounded-md border border-gray-3 bg-gray-1 w-full p-5 outline-none focus:ring-2 focus:ring-blue/20"
      //             />
      //           </div>
      //         </div>

      //         {/* // <!-- checkout right --> */}
      //         <div className="max-w-[455px] w-full">
      //           {/* <!-- order list box --> */}
      //           <div className="bg-white shadow-1 rounded-[10px]">
      //             <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
      //               <h3 className="font-medium text-xl text-dark">
      //                 Seu Pedido
      //               </h3>
      //             </div>

      //             <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
      //               {/* <!-- title --> */}
      //               <div className="flex items-center justify-between py-5 border-b border-gray-3">
      //                 <div>
      //                   <h4 className="font-medium text-dark">Product</h4>
      //                 </div>
      //                 <div>
      //                   <h4 className="font-medium text-dark text-right">
      //                     Subtotal
      //                   </h4>
      //                 </div>
      //               </div>

      //               {/* <!-- product item --> */}
      //                 {cartItems.map((item) => (
      //                   <div
      //                     key={item.id}
      //                     className="flex items-center justify-between py-5 border-b border-gray-3"
      //                   >
      //                     <div>
      //                       <p className="text-dark">
      //                         {item.name} <span className="text-sm">x{item.quantity}</span>
      //                       </p>
      //                     </div>

      //                     <div>
      //                       <p className="text-dark text-right">
      //                         R${(item.price * item.quantity).toFixed(2)}
      //                       </p>
      //                     </div>
      //                   </div>
      //                 ))}



      //               {/* <!-- total --> */}
      //               <div className="flex items-center justify-between pt-5">
      //                 <div>
      //                   <p className="font-medium text-lg text-dark">Total</p>
      //                 </div>
      //                 <div>
      //                   <p className="font-medium text-lg text-dark text-right">
      //                     R${total.toFixed(2)}
      //                   </p>
      //                 </div>
      //               </div>
      //             </div>
      //           </div>

      //           {/* <!-- coupon box --> */}
      //           <Coupon />

      //           {/* <!-- shipping box --> */}
      //           <ShippingMethod onChangeShipping={setShippingFee} />

      //           {/* <!-- payment box --> */}
      //           <PaymentMethod />

      //           {/* <!-- checkout button --> */}
      //           <button
      //             type="submit"
      //             className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
      //           >
      //             Realizar Pedido
      //           </button>
      //         </div>
      //       </div>
      //     </form>
      //   </div>
      // </section>
//     </>
//   );
// };


// export default Checkout;


"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import Coupon from "./Coupon";
import Billing from "./Billing";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { removeAllItemsFromCart } from "@/redux/features/cart-slice";

type ProfileAuth = {
  sub: number;
  email: string;
  role: string;
};

type Customer = {
  id: number;
  fullName: string;
  phone: string;
};

type Address = {
  id: number;
  street: string;
  number: string;
  neighborhood: string;
  complement?: string;
  city: string;
  state: string;
  cep: string;
};

const Checkout = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.items);

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [email, setEmail] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [shippingFee, setShippingFee] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("boleto");
  const router = useRouter();
  const dispatch = useDispatch();

  // 🔹 NOVO (APENAS CONTROLE DO POPUP)
  const [openResumo, setOpenResumo] = useState(false);

  const [newAddress, setNewAddress] = useState({
    street: "",
    number: "",
    neighborhood: "",
    complement: "",
    city: "",
    state: "",
    cep: "",
  });

  const emptyAddress = {
    street: "",
    number: "",
    neighborhood: "",
    complement: "",
    city: "",
    state: "",
    cep: "",
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const total = subtotal + shippingFee;


  const handleConfirmOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const payload = {
        order: {
          customerId: customer.id,                 // ← vem do estado já carregado
          deliveryAddressId: selectedAddressId,    // ← endereço selecionado
          status: "pending",
          paymentMethod: paymentMethod,             // ← estado do método de pagamento
          shippingFee: shippingFee, // 🔥 AQUI
        },
        items: cartItems.map((item) => ({
          product: item.id,
          quantity: item.quantity,
        })),
      };

      const res = await fetch("http://localhost:3002/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erro ao criar pedido");

        // sucesso
        alert("Pedido realizado com sucesso!");

        // 🔹 limpar carrinho (Redux)
        dispatch(removeAllItemsFromCart());

        // 🔹 fechar popup
        setOpenResumo(false);

        // 🔹 redirecionar
        window.location.href = "/pedidos";

      // router.push("/pedidos");
    } catch (err) {
      alert("ERRO ao realizado Pedido!");
      console.error("Erro ao concluir pedido:", err);
    }
  };

  const selectedAddress = addresses.find(
    (addr) => addr.id === selectedAddressId
  );




  /* ===== LOAD PROFILE ===== */
  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const authRes = await fetch("http://localhost:3002/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!authRes.ok) return;

        const profile: ProfileAuth = await authRes.json();
        setEmail(profile.email);

        const userRes = await fetch(
          `http://localhost:3002/users/${profile.sub}`
        );
        if (!userRes.ok) return;

        const userData = await userRes.json();
        if (!userData.customer) return;

        setCustomer(userData.customer);

        const addrRes = await fetch(
          `http://localhost:3002/addresses/customer/${userData.customer.id}`
        );

        if (addrRes.ok) {
          const data = await addrRes.json();
          if (data.length) {
            setAddresses(data);
            setSelectedAddressId(data[0].id);
          }
        }
      } catch (err) {
        console.error("Erro no checkout:", err);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <Breadcrumb title={"Checkout"} pages={["checkout"]} />

      <section className="overflow-hidden py-10 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <form>
            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
              {/* ===== CHECKOUT LEFT ===== */}
              <div className="lg:max-w-[670px] w-full space-y-7.5">

                {/* ===== CUSTOMER DETAILS ===== */}
                <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5">
                  <h3 className="text-xl font-medium mb-6">
                    Detalhes do Cliente
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block mb-2 text-sm">Nome</label>
                      <input
                        value={customer?.fullName || ""}
                        disabled
                        className="w-full rounded-md border bg-gray-1 p-3 opacity-70"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm">Email</label>
                      <input
                        value={email}
                        disabled
                        className="w-full rounded-md border bg-gray-1 p-3 opacity-70"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm">Telefone</label>
                      <input
                        value={customer?.phone || ""}
                        disabled
                        className="w-full rounded-md border bg-gray-1 p-3 opacity-70"
                      />
                    </div>
                  </div>
                </div>

                {/* ===== ADDRESS SELECTION ===== */}
                <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5">
                  <h3 className="text-xl font-medium mb-6">
                    Endereço de Entrega
                  </h3>

                  {addresses.length === 0 && (
                    <p className="text-sm text-gray-500">
                      Nenhum endereço cadastrado
                    </p>
                  )}

                  <div className="space-y-3">
                    {addresses.map((addr) => {
                      const selected =
                        addr.id === selectedAddressId && !newAddress.street.trim();

                      return (
                        <div
                          key={addr.id}
                          onClick={() => setSelectedAddressId(addr.id)}
                          className={`cursor-pointer rounded-md border p-4 text-sm transition
                            ${
                              selected
                                ? "border-blue bg-blue/5"
                                : "border-gray-3 hover:border-blue"
                            }`}
                        >
                          <p>
                            {addr.street}, {addr.number}
                            {addr.complement && ` - ${addr.complement}`}
                          </p>
                          <p>{addr.neighborhood}</p>
                          <p>
                            {addr.city} - {addr.state}
                          </p>
                          <p>CEP: {addr.cep}</p>
                        </div>
                      );
                    })}
                  </div>
                    <br></br>
                    <div className="flex items-center justify-between mb-4">

                    <button
                      type="button"
                      onClick={() => {
                        // se estiver cancelando
                        if (showNewAddressForm) {
                          setNewAddress(emptyAddress);
                          if (addresses.length > 0) {
                            setSelectedAddressId(addresses[0].id);
                          }
                        }

                        setShowNewAddressForm((prev) => !prev); // mostra/esconde
                      }}
                      className="text-sm text-blue font-medium hover:underline"
                    >
                      {showNewAddressForm ? "Cancelar" : "Inserir um endereço"}
                    </button>
                    </div>
                      {showNewAddressForm && (
                        <div
                        className={`mb-6 rounded-md border p-4 space-y-4 transition
                          ${
                            newAddress.street.trim()
                              ? "border-blue bg-blue/5"
                              : "border-gray-3 bg-gray-1"
                          }
                        `}
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input
                            value={newAddress.street}
                            onChange={(e) => {
                              setNewAddress({ ...newAddress, street: e.target.value });

                              // 🔴 remove seleção dos endereços salvos
                              if (selectedAddressId !== null) {
                                setSelectedAddressId(null);
                              }
                            }}
                            className="w-full rounded-md border p-3"
                          />

                          <input
                            placeholder="Número"
                            value={newAddress.number}
                            onChange={(e) =>
                              setNewAddress({ ...newAddress, number: e.target.value })
                            }
                            className="w-full rounded-md border p-3"
                          />

                          <input
                            placeholder="Bairro"
                            value={newAddress.neighborhood}
                            onChange={(e) =>
                              setNewAddress({ ...newAddress, neighborhood: e.target.value })
                            }
                            className="w-full rounded-md border p-3"
                          />

                          <input
                            placeholder="Complemento (opcional)"
                            value={newAddress.complement}
                            onChange={(e) =>
                              setNewAddress({ ...newAddress, complement: e.target.value })
                            }
                            className="w-full rounded-md border p-3"
                          />

                          <input
                            placeholder="Cidade"
                            value={newAddress.city}
                            onChange={(e) =>
                              setNewAddress({ ...newAddress, city: e.target.value })
                            }
                            className="w-full rounded-md border p-3"
                          />

                          <input
                            placeholder="Estado"
                            value={newAddress.state}
                            onChange={(e) =>
                              setNewAddress({ ...newAddress, state: e.target.value })
                            }
                            className="w-full rounded-md border p-3"
                          />

                          <input
                            placeholder="CEP"
                            value={newAddress.cep}
                            onChange={(e) =>
                              setNewAddress({ ...newAddress, cep: e.target.value })
                            }
                            className="w-full rounded-md border p-3"
                          />
                        </div>
                      </div>
                    )}
                </div>

                {/* ===== OTHER NOTES ===== */}
                <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5">
                  <label htmlFor="notes" className="block mb-2.5">
                    Observações (opcional)
                  </label>

                  <textarea
                    id="notes"
                    rows={5}
                    placeholder="Escreva sobre seu pedido ou forma de entrega."
                    className="rounded-md border border-gray-3 bg-gray-1 w-full p-5 outline-none focus:ring-2 focus:ring-blue/20"
                  />
                </div>
              </div>

              {/* // <!-- checkout right --> */}
              <div className="max-w-[455px] w-full">
                {/* <!-- order list box --> */}
                <div className="bg-white shadow-1 rounded-[10px]">
                  <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                    <h3 className="font-medium text-xl text-dark">
                      Seu Pedido
                    </h3>
                  </div>

                  <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                    {/* <!-- title --> */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <div>
                        <h4 className="font-medium text-dark">Product</h4>
                      </div>
                      <div>
                        <h4 className="font-medium text-dark text-right">
                          Subtotal
                        </h4>
                      </div>
                    </div>

                    {/* <!-- product item --> */}
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between py-5 border-b border-gray-3"
                        >
                          <div>
                            <p className="text-dark">
                              {item.name} <span className="text-sm">x{item.quantity}</span>
                            </p>
                          </div>

                          <div>
                            <p className="text-dark text-right">
                              R${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}



                    {/* <!-- total --> */}
                    <div className="flex items-center justify-between pt-5">
                      <div>
                        <p className="font-medium text-lg text-dark">Total</p>
                      </div>
                      <div>
                        <p className="font-medium text-lg text-dark text-right">
                          R${total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- coupon box --> */}
                <Coupon />

                {/* <!-- shipping box --> */}
                <ShippingMethod onChangeShipping={setShippingFee} />

                {/* <!-- payment box --> */}
                <PaymentMethod />

                {/* <!-- checkout button --> */}
                <button
                  type="button"
                  onClick={() => setOpenResumo(true)}
                  className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
                >
                  Realizar Pedido
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* ================= POPUP / MODAL ================= */}
      {openResumo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-[700px] rounded-xl shadow-2xl p-6 sm:p-8 animate-[scaleIn_0.25s_ease-out]">
            <h2 className="text-xl font-bold mb-4">
              Resumo do Pedido
            </h2>

            {/* CLIENTE */}
            <div className="mb-4">
              <h3 className="font-semibold mb-1">Dados do Cliente</h3>
              <p>{customer?.fullName}</p>
              <p>{email}</p>
              <p>{customer?.phone}</p>
            </div>

            {selectedAddress && (
              <div className="mb-4">
                <h3 className="font-semibold mb-1">Endereço de entrega</h3>
                <p>
                  {selectedAddress.street}, {selectedAddress.number}
                  {selectedAddress.complement && ` - ${selectedAddress.complement}`}
                </p>
                <p>{selectedAddress.neighborhood}</p>
                <p>
                  {selectedAddress.city} - {selectedAddress.state}
                </p>
                <p>CEP: {selectedAddress.cep}</p>
              </div>
            )}

            {/* ITENS */}
            <div className="mb-4">
              <h3 className="font-semibold mb-1">Itens</h3>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold mt-2">
                <span>Frete</span>
                <span>R$ {shippingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold mt-2 text-xl">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>

            {/* BOTÕES */}
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setOpenResumo(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-1"
              >
                Alterar informações
              </button>

              <button
                type="button"
                onClick={handleConfirmOrder}
                className="px-4 py-2 bg-blue text-white rounded-md hover:bg-blue-dark"
              >
                Concluir Pedido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;




