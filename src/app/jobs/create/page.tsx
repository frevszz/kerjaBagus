"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/app/components/backButton";
import TagPopover from "@/app/components/tagPopover";
import Select from "react-select";
import { api } from "@/services/api";
import { me } from "@/services/auth.service";
import { getProfile } from "@/services/profiles.service";
import { getUser } from "@/services/users.service";
import {
  getDistricts,
  getProvinces,
  getRegencies,
  getVillages,
} from "@/services/address.service";

export default function CreateJobPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "error" | "success"; text: string } | null>(null);

  // Address states for cascading dropdowns
  const [provinces, setProvinces] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [regencies, setRegencies] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [districts, setDistricts] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [villages, setVillages] = useState<
    Array<{ id: string; name: string }>
  >([]);

  // State untuk menyimpan array tags yang dipilih dari popover
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    whatsapp: "",
    location: "ONSITE" as "ONSITE" | "REMOTE" | "HYBRID",
    province: "",
    provinceId: "",
    city: "",
    cityId: "",
    district: "",
    districtId: "",
    village: "",
    villageId: "",
    budgetMin: "",
    budgetMax: "",
    description: "",
    requirements: "",
    deadline: "",
    banner: "",
  });

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const currentUser = await me();
        const user = await getUser(currentUser.user.id);
        if (user?.profile?.id) {
          setProfileId(user.profile.id);
        } else if (user?.id) {
          // Fallback: try to get profile by user id
          const profile = await getProfile(user.id);
          setProfileId(profile.id);
        } else {
          setError(
            "Tidak dapat menemukan profil pengguna. Silakan login ulang.",
          );
        }
      } catch (err) {
        console.error("Gagal memuat profil:", err);
        setError("Gagal memuat profil. Silakan login ulang.");
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  // Fetch provinces on mount
  useEffect(() => {
    getProvinces()
      .then((data) => setProvinces(data))
      .catch((err) => console.error("Gagal memuat provinsi:", err));
  }, []);

  // Fetch regencies when province changes
  useEffect(() => {
    if (formData.provinceId) {
      getRegencies(formData.provinceId)
        .then((data) => setRegencies(data))
        .catch((err) => console.error("Gagal memuat kota/kabupaten:", err));
      setFormData((prev) => ({
        ...prev,
        city: "",
        cityId: "",
        district: "",
        districtId: "",
        village: "",
        villageId: "",
      }));
    } else {
      setRegencies([]);
      setDistricts([]);
      setVillages([]);
      setFormData((prev) => ({
        ...prev,
        city: "",
        cityId: "",
        district: "",
        districtId: "",
        village: "",
        villageId: "",
      }));
    }
  }, [formData.provinceId]);

  useEffect(() => {
    if (formData.cityId) {
      getDistricts(formData.cityId)
        .then((data) => setDistricts(data))
        .catch((err) => console.error("Gagal memuat kecamatan:", err));
      setFormData((prev) => ({
        ...prev,
        district: "",
        districtId: "",
        village: "",
        villageId: "",
      }));
    } else {
      setDistricts([]);
      setVillages([]);
      setFormData((prev) => ({
        ...prev,
        district: "",
        districtId: "",
        village: "",
        villageId: "",
      }));
    }
  }, [formData.cityId]);

  useEffect(() => {
    if (formData.districtId) {
      getVillages(formData.districtId)
        .then((data) => setVillages(data))
        .catch((err) => console.error("Gagal memuat kelurahan/desa:", err));
      setFormData((prev) => ({ ...prev, village: "", villageId: "" }));
    } else {
      setVillages([]);
      setFormData((prev) => ({ ...prev, village: "", villageId: "" }));
    }
  }, [formData.districtId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!profileId) {
      setFeedback({ type: "error", text: "Profil tidak ditemukan. Silakan login ulang." });
      return;
    }

    // Validate required address fields
    if (!formData.province || !formData.city) {
      setFeedback({ type: "error", text: "Silakan pilih Provinsi dan Kota/Kabupaten." });
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadlineValue = formData.deadline ? new Date(formData.deadline) : null;
    if (deadlineValue) {
      deadlineValue.setHours(0, 0, 0, 0);
      if (deadlineValue < today) {
        setFeedback({ type: "error", text: "Deadline lamaran tidak boleh kurang dari hari ini." });
        return;
      }
    }

    const budgetMin = Number(formData.budgetMin);
    const budgetMax = Number(formData.budgetMax);

    if (Number.isNaN(budgetMin) || budgetMin < 100000) {
      setFeedback({ type: "error", text: "Budget minimal harus lebih dari 100000." });
      return;
    }

    if (Number.isNaN(budgetMax) || budgetMax < budgetMin) {
      setFeedback({ type: "error", text: "Budget maksimal tidak boleh kurang dari budget minimal." });
      return;
    }

    if (budgetMin >= budgetMax) {
      setFeedback({ type: "error", text: "Budget minimal harus lebih kecil dari budget maksimal." });
      return;
    }

    setSubmitting(true);
    setError(null);
    setFeedback(null);

    const payload = {
      company: formData.company,
      title: formData.title,
      description: formData.description,
      requirements: formData.requirements,
      banner: formData.banner || null,
      budgetMin: Number(formData.budgetMin) || 0,
      budgetMax: Number(formData.budgetMax) || 0,
      deadline: formData.deadline ? new Date(formData.deadline) : null,
      locationType: formData.location,
      isVerified: false,
      isOpen: true,
      tags: selectedTags,
      profileId,
      whatsapp: formData.whatsapp,
      address: {
        country: "Indonesia",
        province: formData.province,
        city: formData.city,
        district: formData.district || null,
        village: formData.village || null,
        postalCode: "",
        latitude: 0,
        longitude: 0,
      },
    };

    try {
      console.log("Payload dikirim ke API:", payload);

      await api("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      router.push("/jobs");
    } catch (err) {
      console.error("Gagal membuat lowongan:", err);
      const message =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat memposting pekerjaan.";
      alert(message);
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 md:px-6 py-10">
      <div className="mb-6">
        <BackButton />
      </div>

      {loadingProfile && (
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-6">
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-3 border-[#F4991A] border-t-transparent" />
          </div>
          <p className="text-center text-gray-500">Memuat profil...</p>
        </div>
      )}

      {error && !loadingProfile && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => router.refresh()}
            className="mt-4 text-sm text-red-600 hover:underline"
          >
            Coba lagi
          </button>
        </div>
      )}

      {!loadingProfile && !error && (
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Pasang Lowongan Pekerjaan
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Isi detail lowongan kerja dengan jelas untuk mendapatkan calon
              pekerja yang sesuai.
            </p>
            {feedback && (
              <div
                className={`mt-3 rounded-lg border p-3 text-xs ${feedback.type === "error" ? "border-red-200 bg-red-50 text-red-600" : "border-green-200 bg-green-50 text-green-700"}`}
              >
                {feedback.text}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Judul */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Judul Pekerjaan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="misal: Staff Kasir / Tukang Bangunan"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Nama Usaha / Perusahaan{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="misal: Toko Serba Ada / Personal"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Kontak WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="misal: 6281234567890"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  value={formData.whatsapp}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsapp: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Simpan buat nanti */}
            {/* Banner */}
            {/* <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Banner (URL Gambar)
              </label>
              <input
                type="url"
                placeholder="misal: https://example.com/banner.jpg"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                value={formData.banner}
                onChange={(e) =>
                  setFormData({ ...formData, banner: e.target.value })
                }
              />
            </div> */}

            {/* Sistem Kerja & Lokasi */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Sistem Kerja
                </label>
                <select
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: e.target.value as
                        | "ONSITE"
                        | "REMOTE"
                        | "HYBRID",
                    })
                  }
                >
                  <option value="ONSITE">Onsite (Di Lokasi)</option>
                  <option value="REMOTE">Remote (Jarak Jauh)</option>
                  <option value="HYBRID">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Provinsi <span className="text-red-500">*</span>
                </label>
                <Select
                  placeholder="Pilih Provinsi*"
                  options={provinces.map((p) => ({
                    value: p.id,
                    label: p.name,
                  }))}
                  isSearchable
                  value={
                    provinces.find((p) => p.name === formData.province)
                      ? {
                          value: provinces.find(
                            (p) => p.name === formData.province,
                          )!.id,
                          label: provinces.find(
                            (p) => p.name === formData.province,
                          )!.name,
                        }
                      : null
                  }
                  onChange={(option) => {
                    if (!option) {
                      setFormData((prev) => ({
                        ...prev,
                        province: "",
                        provinceId: "",
                        city: "",
                        cityId: "",
                        district: "",
                        districtId: "",
                        village: "",
                        villageId: "",
                      }));
                      return;
                    }
                    setFormData((prev) => ({
                      ...prev,
                      province: option.label,
                      provinceId: option.value,
                    }));
                  }}
                  className="w-full"
                  classNamePrefix="react-select"
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderColor: "#d1d5db",
                      borderRadius: "0.75rem",
                      minHeight: "44px",
                      boxShadow: "none",
                      "&:hover": { borderColor: "#9ca3af" },
                    }),
                    menu: (base) => ({
                      ...base,
                      borderRadius: "0.75rem",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isFocused
                        ? "#fef3c7"
                        : state.isSelected
                          ? "#f59e0b"
                          : "white",
                      color: state.isSelected ? "white" : "#1f2937",
                      "&:active": { backgroundColor: "#fde68a" },
                    }),
                    singleValue: (base) => ({
                      ...base,
                      color: "#1f2937",
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#9ca3af",
                    }),
                    input: (base) => ({
                      ...base,
                      color: "#1f2937",
                    }),
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Kota / Kabupaten <span className="text-red-500">*</span>
                </label>
                <Select
                  placeholder="Pilih Kota/Kabupaten*"
                  options={regencies.map((r) => ({
                    value: r.id,
                    label: r.name,
                  }))}
                  isSearchable
                  isDisabled={!formData.provinceId}
                  value={
                    regencies.find((r) => r.name === formData.city)
                      ? {
                          value: regencies.find(
                            (r) => r.name === formData.city,
                          )!.id,
                          label: regencies.find(
                            (r) => r.name === formData.city,
                          )!.name,
                        }
                      : null
                  }
                  onChange={(option) => {
                    if (!option) {
                      setFormData((prev) => ({
                        ...prev,
                        city: "",
                        cityId: "",
                        district: "",
                        districtId: "",
                        village: "",
                        villageId: "",
                      }));
                      return;
                    }
                    setFormData((prev) => ({
                      ...prev,
                      city: option.label,
                      cityId: option.value,
                      district: "",
                      districtId: "",
                      village: "",
                      villageId: "",
                    }));
                  }}
                  className="w-full"
                  classNamePrefix="react-select"
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderColor: formData.provinceId ? "#d1d5db" : "#e5e7eb",
                      borderRadius: "0.75rem",
                      minHeight: "44px",
                      boxShadow: "none",
                      backgroundColor: formData.provinceId
                        ? "white"
                        : "#f9fafb",
                      "&:hover": {
                        borderColor: formData.provinceId
                          ? "#9ca3af"
                          : "#e5e7eb",
                      },
                    }),
                    menu: (base) => ({
                      ...base,
                      borderRadius: "0.75rem",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isFocused
                        ? "#fef3c7"
                        : state.isSelected
                          ? "#f59e0b"
                          : "white",
                      color: state.isSelected ? "white" : "#1f2937",
                      "&:active": { backgroundColor: "#fde68a" },
                    }),
                    singleValue: (base) => ({
                      ...base,
                      color: "#1f2937",
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#9ca3af",
                    }),
                    input: (base) => ({
                      ...base,
                      color: "#1f2937",
                    }),
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Kecamatan
                </label>
                <Select
                  placeholder="Pilih Kecamatan"
                  options={districts.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                  isSearchable
                  isDisabled={!formData.cityId}
                  value={
                    districts.find((item) => item.name === formData.district)
                      ? {
                          value: districts.find(
                            (item) => item.name === formData.district,
                          )!.id,
                          label: districts.find(
                            (item) => item.name === formData.district,
                          )!.name,
                        }
                      : null
                  }
                  onChange={(option) => {
                    if (!option) {
                      setFormData((prev) => ({
                        ...prev,
                        district: "",
                        districtId: "",
                        village: "",
                        villageId: "",
                      }));
                      return;
                    }
                    setFormData((prev) => ({
                      ...prev,
                      district: option.label,
                      districtId: option.value,
                      village: "",
                      villageId: "",
                    }));
                  }}
                  className="w-full"
                  classNamePrefix="react-select"
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderColor: formData.cityId ? "#d1d5db" : "#e5e7eb",
                      borderRadius: "0.75rem",
                      minHeight: "44px",
                      boxShadow: "none",
                      backgroundColor: formData.cityId ? "white" : "#f9fafb",
                      "&:hover": {
                        borderColor: formData.cityId ? "#9ca3af" : "#e5e7eb",
                      },
                    }),
                    menu: (base) => ({
                      ...base,
                      borderRadius: "0.75rem",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isFocused
                        ? "#fef3c7"
                        : state.isSelected
                          ? "#f59e0b"
                          : "white",
                      color: state.isSelected ? "white" : "#1f2937",
                      "&:active": { backgroundColor: "#fde68a" },
                    }),
                    singleValue: (base) => ({
                      ...base,
                      color: "#1f2937",
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#9ca3af",
                    }),
                    input: (base) => ({
                      ...base,
                      color: "#1f2937",
                    }),
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Kelurahan / Desa
                </label>
                <Select
                  placeholder="Pilih Kelurahan / Desa"
                  options={villages.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                  isSearchable
                  isDisabled={!formData.districtId}
                  value={
                    villages.find((item) => item.name === formData.village)
                      ? {
                          value: villages.find(
                            (item) => item.name === formData.village,
                          )!.id,
                          label: villages.find(
                            (item) => item.name === formData.village,
                          )!.name,
                        }
                      : null
                  }
                  onChange={(option) => {
                    if (!option) {
                      setFormData((prev) => ({
                        ...prev,
                        village: "",
                        villageId: "",
                      }));
                      return;
                    }
                    setFormData((prev) => ({
                      ...prev,
                      village: option.label,
                      villageId: option.value,
                    }));
                  }}
                  className="w-full"
                  classNamePrefix="react-select"
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderColor: formData.districtId ? "#d1d5db" : "#e5e7eb",
                      borderRadius: "0.75rem",
                      minHeight: "44px",
                      boxShadow: "none",
                      backgroundColor: formData.districtId ? "white" : "#f9fafb",
                      "&:hover": {
                        borderColor: formData.districtId ? "#9ca3af" : "#e5e7eb",
                      },
                    }),
                    menu: (base) => ({
                      ...base,
                      borderRadius: "0.75rem",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isFocused
                        ? "#fef3c7"
                        : state.isSelected
                          ? "#f59e0b"
                          : "white",
                      color: state.isSelected ? "white" : "#1f2937",
                      "&:active": { backgroundColor: "#fde68a" },
                    }),
                    singleValue: (base) => ({
                      ...base,
                      color: "#1f2937",
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#9ca3af",
                    }),
                    input: (base) => ({
                      ...base,
                      color: "#1f2937",
                    }),
                  }}
                />
              </div>
            </div>

            {/* Budget / Gaji Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Budget Minimal (Rp) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  placeholder="misal: 1500000"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  value={formData.budgetMin}
                  onChange={(e) =>
                    setFormData({ ...formData, budgetMin: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Budget Maksimal (Rp) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  placeholder="misal: 3000000"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  value={formData.budgetMax}
                  onChange={(e) =>
                    setFormData({ ...formData, budgetMax: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Deadline Lamaran
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
              />
            </div>

            {/* POPOVER TAG SELECTOR DITAMBAHKAN*/}
            <TagPopover
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />

            {/* Deskripsi Pekerjaan */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Deskripsi Pekerjaan <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                placeholder="Tuliskan tugas harian dan rincian pekerjaan..."
                className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            {/* Persyaratan */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Persyaratan Pelamar
              </label>
              <textarea
                rows={3}
                placeholder="misal: Minimal lulusan SMA/SMK, memiliki kendaraan sendiri..."
                className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                value={formData.requirements}
                onChange={(e) =>
                  setFormData({ ...formData, requirements: e.target.value })
                }
              />
            </div>

            {/* Submit Button */}
            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#F4991A] hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-xl text-sm transition shadow-md active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                {submitting ? "Menerbitkan..." : "Terbitkan Lowongan"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
