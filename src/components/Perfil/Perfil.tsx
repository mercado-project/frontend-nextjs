"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";

type Customer = {
  id: number;
  fullName: string;
  cpf: string;
  birthDate: string;
  phone: string;
  createdAt: string;
};

type ProfileAuth = {
  sub: number;
  email: string;
  role: string;
};

type Address = {
  id?: number;
  street: string;
  number: string;
  neighborhood: string;
  complement: string;
  city: string;
  state: string;
  cep: string;
};

export default function Perfil() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [email, setEmail] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // edição
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({
    fullName: "",
    phone: "",
  });

  // novo endereço
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState<Address>({
    street: "",
    number: "",
    neighborhood: "",
    complement: "",
    city: "",
    state: "",
    cep: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {

        const token = localStorage.getItem("token");
        if (!token) return;
        // AUTH
        const authRes = await fetch("http://localhost:3002/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!authRes.ok) return;

        const profile: ProfileAuth = await authRes.json();
        setEmail(profile.email);

        // USER -> CUSTOMER
        const userRes = await fetch(
          `http://localhost:3002/users/${profile.sub}`
        );
        if (!userRes.ok) return;

        const userData = await userRes.json();
        const customer = userData.customer;
        if (!customer) return;

        setCustomer(customer);
        setCustomerId(customer.id);
        setEditData({
          fullName: customer.fullName,
          phone: customer.phone,
        });

        // ENDEREÇOS
        const addrRes = await fetch(
          `http://localhost:3002/addresses/customer/${customer.id}`
        );

        if (addrRes.ok) {
          const data = await addrRes.json();
          setAddresses(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  /* ===== SALVAR DADOS PESSOAIS ===== */
  const handleSaveProfile = async () => {
    if (!customerId) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    console.log("🟡 CUSTOMER ID:", customerId);
    console.log("🟡 DADOS ENVIADOS:", editData);

    const res = await fetch(
      `http://localhost:3002/customers/${customerId}`,
      {
        method: "PATCH", // ✅ AQUI ESTAVA O ERRO
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: editData.fullName,
          phone: editData.phone,
        }),
      }
    );

    console.log("🔵 STATUS:", res.status);

    if (!res.ok) {
      const error = await res.json();
      console.error("🔴 ERRO BACKEND:", error);
      alert("Erro ao salvar informações");
      return;
    }

    const updated = await res.json();
    console.log("🟢 CUSTOMER ATUALIZADO:", updated);

    setCustomer(updated);

    alert("Informações atualizadas com sucesso!");
    setEditing(false);
  };





  /* ===== ENDEREÇOS ===== */
  const reloadAddresses = async () => {
    if (!customerId) return;
    const res = await fetch(
      `http://localhost:3002/addresses/customer/${customerId}`
    );
    const data = await res.json();
    setAddresses(Array.isArray(data) ? data : []);
  };

  const handleSaveAddress = async () => {
    if (!customerId) return;

    await fetch("http://localhost:3002/addresses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newAddress, customerId }),
    });

    await reloadAddresses();
    setShowAddressForm(false);
    setNewAddress({
      street: "",
      number: "",
      neighborhood: "",
      complement: "",
      city: "",
      state: "",
      cep: "",
    });
  };

  const handleDeleteAddress = async (id?: number) => {
    if (!id) return;
    const ok = confirm("Deseja realmente excluir este endereço?");
    if (!ok) return;

    await fetch(`http://localhost:3002/addresses/${id}`, {
      method: "DELETE",
    });

    await reloadAddresses();
  };

  if (loading) {
    return <p className="text-center py-20">Carregando perfil...</p>;
  }

  return (
    <>
      <Breadcrumb title="Meu Perfil" pages={["perfil"]} />

      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ===== DADOS ===== */}
            <div className="lg:max-w-[670px] w-full">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-medium">
                    Informações Pessoais
                  </h3>

                  {!editing && (
                    <button
                      onClick={() => setEditing(true)}
                      className="text-blue border border-blue px-4 py-1 rounded-md hover:bg-blue hover:text-white transition"
                    >
                      Editar
                    </button>
                  )}
                </div>

                {customer && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        label="Nome Completo"
                        value={editing ? editData.fullName : customer.fullName}
                        onChange={
                          editing
                            ? (e) =>
                                setEditData({
                                  ...editData,
                                  fullName: e.target.value,
                                })
                            : undefined
                        }
                      />

                      <Input label="Email" value={email} />
                      <Input label="CPF" value={customer.cpf} />

                      <Input
                        label="Telefone"
                        value={editing ? editData.phone : customer.phone}
                        onChange={
                          editing
                            ? (e) =>
                                setEditData({
                                  ...editData,
                                  phone: e.target.value,
                                })
                            : undefined
                        }
                      />

                      <Input
                        label="Nascimento"
                        value={new Date(
                          customer.birthDate
                        ).toLocaleDateString()}
                      />
                      <Input
                        label="Cadastro em"
                        value={new Date(
                          customer.createdAt
                        ).toLocaleDateString()}
                      />
                    </div>

                    {editing && (
                      <div className="flex gap-3 mt-6">
                        <button
                          onClick={handleSaveProfile}
                          className="bg-blue text-white px-6 py-2 rounded-md"
                        >
                          Salvar
                        </button>
                        <button
                          onClick={() => {
                            setEditing(false);
                            setEditData({
                              fullName: customer.fullName,
                              phone: customer.phone,
                            });
                          }}
                          className="border px-6 py-2 rounded-md"
                        >
                          Cancelar
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* ===== ENDEREÇOS ===== */}
            <div className="max-w-[455px] w-full">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-xl font-medium mb-6">Endereços</h3>

                {addresses.length > 0 && (
                  <div className="space-y-3 mb-6">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className="border p-4 rounded-md text-sm relative"
                      >
                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                          title="Excluir endereço"
                        >
                          🗑️
                        </button>

                        <p>
                          {addr.street}, {addr.number}
                          {addr.complement && ` - ${addr.complement}`}
                        </p>
                        <p>Bairro: {addr.neighborhood}</p>
                        <p>
                          {addr.city} - {addr.state}
                        </p>
                        <p>CEP: {addr.cep}</p>
                      </div>
                    ))}
                  </div>
                )}

                {!showAddressForm && (
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="w-full border border-blue text-blue py-2 rounded-md hover:bg-blue hover:text-white transition"
                  >
                    Adicionar novo endereço
                  </button>
                )}

                {showAddressForm && (
                  <div className="space-y-4 mt-6">
                    {(
                      [
                        ["Rua", "street"],
                        ["Número", "number"],
                        ["Bairro", "neighborhood"],
                        ["Complemento", "complement"],
                        ["Cidade", "city"],
                        ["Estado", "state"],
                        ["CEP", "cep"],
                      ] as const
                    ).map(([label, field]) => (
                      <Input
                        key={field}
                        label={label}
                        value={newAddress[field]}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            [field]: e.target.value,
                          })
                        }
                      />
                    ))}

                    <div className="flex gap-3">
                      <button
                        onClick={handleSaveAddress}
                        className="flex-1 bg-blue text-white py-2 rounded-md"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={() => setShowAddressForm(false)}
                        className="flex-1 border py-2 rounded-md"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

/* ===== INPUT ===== */
function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div>
      <label className="block mb-2 text-sm">{label}</label>
      <input
        value={value}
        onChange={onChange}
        disabled={!onChange}
        className="w-full rounded-md border bg-gray-1 p-3 disabled:opacity-70"
      />
    </div>
  );
}
