import { faker } from "@faker-js/faker";
import fs from "fs/promises";

const address = [
  {
    province: "Jakarta Selatan",
    city: "Kecamatan Pasar Minggu",
    latRange: [-6.305, -6.275],
    lonRange: [106.82, 106.855],
  },
  {
    province: "Jakarta Selatan",
    city: "Kecamatan Pancoran",
    latRange: [-6.27, -6.24],
    lonRange: [106.835, 106.86],
  },
  {
    province: "Jakarta Timur",
    city: "Kecamatan Cipayung",
    latRange: [-6.365, -6.295],
    lonRange: [106.895, 106.945],
  },
  {
    province: "Jawa Barat",
    city: "Kota Bandung",
    latRange: [-7.014, -6.792],
    lonRange: [107.531, 107.753],
  },
];

const generateProperties = (count) => {
  return Array.from({ length: count }, () => {
    const baseAddress = faker.helpers.arrayElement(address);
    const type = faker.helpers.arrayElement(["rumah", "apartemen"]);
    const price = faker.number.int({ min: 500, max: 16000 }) * 1000000;
    const lt =
      type === "apartemen" ? 0 : faker.number.int({ min: 36, max: 10000 });
    const lb = faker.number.int({ min: 21, max: 5000 });

    return {
      propertyType: type,
      propertyTitle: faker.lorem.sentence(),
      propertyDeskripsi: faker.lorem.paragraph({ min: 5, max: 10 }),
      propertyPrice: price,

      propertyLuasTanah: lt,
      propertyLuasBangunan: lb,
      propertyKamarMandi: faker.number.int({ min: 1, max: 4 }),
      propertyKamarTidur: faker.number.int({ min: 1, max: 4 }),
      propertyCarport: faker.number.int({ min: 0, max: 4 }),
      propertyTipeSertifikat: faker.helpers.arrayElement([
        "SHM",
        "HGB",
        "SHP",
        "HGU",
        "SHMSRS",
      ]),
      propertyJumlahLantai: faker.number.int({ min: 1, max: 5 }),
      propertyGarasi: faker.number.int({ min: 0, max: 5 }),
      propertyDayaListrik: faker.helpers.arrayElement([
        450, 900, 1300, 2200, 3500, 5500, 6600,
      ]),
      propertyListingType: faker.helpers.arrayElement(["sell", "rent"]),
      propertyPerabotan: faker.helpers.arrayElement([
        "Fully Furnished",
        "Unfurnished",
        "Semi-furnished",
      ]),

      // Dynamic Address generation based on the selected city
      propertyAddressProvince: baseAddress.province,
      propertyAddressCity: baseAddress.city,
      propertyAddressLat: faker.location.latitude({
        max: baseAddress.latRange[1],
        min: baseAddress.latRange[0],
        precision: 2,
      }),
      propertyAddressLon: faker.location.longitude({
        max: baseAddress.lonRange[1],
        min: baseAddress.lonRange[0],
        precision: 2,
      }),
      status: "active",
    };
  });
};

const generatePropertyImages = (count) => {
  return Array.from({ length: count }, () => {
    return {
      propertyId: faker.helpers.arrayElement([
        "019dc2c1-08dc-74f8-be41-0760385541e1",
        "019dc2c1-08dd-75e2-92c1-024b8770a77e",
        "019dc2c1-08dd-75e2-92c1-0484ebaea953",
        "019dc2c1-08dd-75e2-92c1-09dadbcebd80",
        "019dc2c1-08dd-75e2-92c1-0e90241a9dad",
        "019dc2c1-08dd-75e2-92c1-13f199be8c5a",
        "019dc2c1-08dd-75e2-92c1-164f116ef558",
        "019dc2c1-08dd-75e2-92c1-18d454cd72df",
        "019dc2c1-08dd-75e2-92c1-1d66611b21fc",
        "019dc2c1-08dd-75e2-92c1-23f33bb75f01",
        "019dc2c1-08dd-75e2-92c1-27ec6d11b6d8",
        "019dc2c1-08dd-75e2-92c1-29ce6cf1c03c",
        "019dc2c1-08dd-75e2-92c1-2f224b6343c0",
        "019dc2c1-08de-74e9-b7d6-098fe13ce4e5",
        "019dc2c1-08de-74e9-b7d6-0d9d5100cc5e",
        "019dc2c1-08de-74e9-b7d6-124c499ccb7f",
        "019dc2c1-08de-74e9-b7d6-17e77f68831f",
        "019dc2c1-08de-74e9-b7d6-19ae810e67ba",
        "019dc2c1-08de-74e9-b7d6-1f46889dc0d2",
        "019dc2c1-08de-74e9-b7d6-215ea0d741d8",
        "019dc2c1-08de-74e9-b7d6-274b7c59d6f5",
        "019dc2c1-08de-74e9-b7d6-29c475d796fd",
        "019dc2c1-08de-74e9-b7d6-2ce2b302ef7b",
        "019dc2c1-08de-74e9-b7d6-3122d87c949b",
        "019dc2c1-08de-74e9-b7d6-34d9e85b243f",
        "019dc2c1-08de-74e9-b7d6-3985716c524e",
        "019dc2c1-08de-74e9-b7d6-3e73b06a61a8",
        "019dc2c1-08de-74e9-b7d6-4289682f5dbc",
        "019dc2c1-08de-74e9-b7d6-460d0bde146d",
        "019dc2c1-08de-74e9-b7d6-49f9e61fffce",
        "019dc2c1-08de-74e9-b7d6-4d9d147db33d",
        "019dc2c1-08de-74e9-b7d6-52dfcf3b965f",
        "019dc2c1-08de-74e9-b7d6-56b12619c5b6",
        "019dc2c1-08de-74e9-b7d6-5be20404352c",
        "019dc2c1-08de-74e9-b7d6-5d5f66724bbc",
        "019dc2c1-08de-74e9-b7d6-6386a5703cd7",
        "019dc2c1-08de-74e9-b7d6-67eabb43d50a",
        "019dc2c1-08de-74e9-b7d6-6b0ee9537bd4",
        "019dc2c1-08de-74e9-b7d6-6dafcc8b9d0e",
        "019dc2c1-08de-74e9-b7d6-718e0e38a012",
        "019dc2c1-08de-74e9-b7d6-7403c3866adc",
        "019dc2c1-08de-74e9-b7d6-7ab4eca01b62",
        "019dc2c1-08de-74e9-b7d6-7d984732e456",
        "019dc2c1-08de-74e9-b7d6-81e77cb58202",
        "019dc2c1-08de-74e9-b7d6-87405bb8db9e",
        "019dc2c1-08de-74e9-b7d6-8a553a915bd1",
        "019dc2c1-08de-74e9-b7d6-8d47c31366b0",
        "019dc2c1-08de-74e9-b7d6-9259d2b4a32d",
        "019dc2c1-08de-74e9-b7d6-97f124ee1827",
        "019dc2c1-08de-74e9-b7d6-9ad04ffc6edd",
        "019dc2c1-08de-74e9-b7d6-9f73df9b75e0",
        "019dc2c1-08de-74e9-b7d6-a1998d69fecc",
        "019dc2c1-08de-74e9-b7d6-a691e76a91cc",
        "019dc2c1-08de-74e9-b7d6-ab982aea9d7c",
        "019dc2c1-08de-74e9-b7d6-adac513f6840",
        "019dc2c1-08de-74e9-b7d6-b18e28e99005",
        "019dc2c1-08de-74e9-b7d6-b6a55374dd0c",
        "019dc2c1-08de-74e9-b7d6-bab03904d3cd",
        "019dc2c1-08de-74e9-b7d6-bd90c1fe2d75",
        "019dc2c1-08de-74e9-b7d6-c0da31c972c0",
        "019dc2c1-08de-74e9-b7d6-c5fdfee070e2",
        "019dc2c1-08de-74e9-b7d6-c82cf71bc953",
        "019dc2c1-08de-74e9-b7d6-cc5feb159a54",
        "019dc2c1-08de-74e9-b7d6-d110ba02a461",
        "019dc2c1-08de-74e9-b7d6-d61600492704",
        "019dc2c1-08de-74e9-b7d6-d89a6fbc43e5",
        "019dc2c1-08de-74e9-b7d6-ddcacef57cfa",
        "019dc2c1-08de-74e9-b7d6-e317de1dc339",
        "019dc2c1-08de-74e9-b7d6-e478454d25f2",
        "019dc2c1-08de-74e9-b7d6-eb07644fdaab",
        "019dc2c1-08de-74e9-b7d6-ee461df6a9de",
        "019dc2c1-08de-74e9-b7d6-f333337015d5",
        "019dc2c1-08de-74e9-b7d6-f7d71d431c51",
        "019dc2c1-08df-751b-8914-2358303e9dcb",
        "019dc2c1-08df-751b-8914-26d40924dfbf",
        "019dc2c1-08df-751b-8914-28cfcdf6b1fe",
        "019dc2c1-08df-751b-8914-2deeebd84a67",
        "019dc2c1-08df-751b-8914-31384d48176d",
        "019dc2c1-08df-751b-8914-368bd77925e8",
        "019dc2c1-08df-751b-8914-39a4508b2221",
        "019dc2c1-08df-751b-8914-3e2044c730f9",
        "019dc2c1-08df-751b-8914-42ec2cd3ef73",
        "019dc2c1-08df-751b-8914-457ef9a703d9",
        "019dc2c1-08df-751b-8914-4a2f4ebd8dbc",
        "019dc2c1-08df-751b-8914-4f6bd7d7be06",
        "019dc2c1-08df-751b-8914-53aaaac3a36d",
        "019dc2c1-08df-751b-8914-5739351ee892",
        "019dc2c1-08df-751b-8914-59f3baa819e9",
        "019dc2c1-08df-751b-8914-5f0904ee17bc",
        "019dc2c1-08df-751b-8914-617bea85fddc",
        "019dc2c1-08df-751b-8914-6588882b74d2",
        "019dc2c1-08df-751b-8914-69cd0f3d8b5f",
        "019dc2c1-08df-751b-8914-6e7c76dbb01f",
        "019dc2c1-08df-751b-8914-70c4581d54cc",
        "019dc2c1-08df-751b-8914-752503a10420",
        "019dc2c1-08df-751b-8914-7994e1304114",
        "019dc2c1-08df-751b-8914-7c823fbf429b",
        "019dc2c1-08df-751b-8914-80b7c0d5b6e8",
        "019dc2c1-08df-751b-8914-8493b456b014",
        "019dc2c1-08df-751b-8914-8bd441d296fb",
      ]),
      imageUrl: faker.image.urlPicsumPhotos({
        width: 960,
        height: 540,
        grayscale: false,
        blur: 0,
      }),
    };
  });
};

async function saveToJson() {
  try {
    const data = generatePropertyImages(1000);

    const jsonString = JSON.stringify(data, null, 2);

    await fs.writeFile("propertyImages.json", jsonString, "utf8");

    console.log("✅ Success! properties.json has been created.");
  } catch (err) {
    console.error("❌ Error writing file:", err);
  }
}

saveToJson();
