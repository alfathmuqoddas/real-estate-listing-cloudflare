export type Property = {
  id: string;
  propertyType: string;
  propertyTitle: string;
  propertyDeskripsi: string;
  propertyPrice: number;
  propertyLuasTanah: number;
  propertyLuasBangunan: number;
  propertyKamarMandi: number;
  propertyKamarTidur: number;
  propertyCarport: number;
  propertyTipeSertifikat: string;
  propertyJumlahLantai: number;
  propertyGarasi: number;
  propertyDayaListrik: number;
  propertyListingType: string;
  propertyPerabotan: string;
  propertyAddressProvince: string;
  propertyAddressCity: string;
  propertyAddressLat: number;
  propertyAddressLon: number;
  propertyAgentId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  photoUrl: string;
  bio: string;
  age: string;
  role: string;
  agencyName: string;
  agencyLicense: string;
  baseCity: string;
  isVerified: boolean;
  lastLogin: string;
  createdAt: string;
};

export type Images = {
  id: string;
  propertyId: string;
  userId: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type TPagination = {
  total: number;
  limit: number;
  page: number;
  totalPages: number;
};

export type Agency = {
  agencyName: string;
  logoUrl: string;
  websiteUrl: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  province: string;
  establishedAt: string;
};

export type PropertyFeature = {
  feature: {
    id: string;
    featureName: string;
    featureIcon: string;
  };
};
