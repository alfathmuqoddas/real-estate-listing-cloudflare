import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddressCascade } from "@/hooks/useAddressCascade";
import {
  propertySchema,
  type PropertyFormValues,
} from "@/lib/schemas/listings";
import {
  propertyTypeOptions,
  propertyListingTypeOptions,
  SERTIFIKAT_TYPES,
  PERABOTAN_TYPES,
  DAYA_LISTRIK_OPTIONS,
  STATUS_TYPES,
} from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  initialData?: Partial<PropertyFormValues>;
  onSubmit: (values: PropertyFormValues) => Promise<void> | void;
  mode: "create" | "edit";
  submitLabel?: string;
};

export const AddPropertyForm: React.FC<Props> = ({
  initialData,
  mode,
  submitLabel,
  onSubmit,
}) => {
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: initialData || {
      propertyType: "rumah",
      propertyTitle: "",
      propertyDeskripsi: "",
      propertyPrice: 0,
      propertyListingType: "sell",
      propertyLuasTanah: 0,
      propertyLuasBangunan: 0,
      propertyKamarMandi: 0,
      propertyKamarTidur: 0,
      propertyCarport: 0,
      propertyJumlahLantai: 1,
      propertyGarasi: 0,
      propertyDayaListrik: 1300,
      propertyAddressLat: 0,
      propertyAddressLon: 0,
      propertyTipeSertifikat: "SHM",
      propertyPerabotan: "Unfurnished",
      status: "active",
      propertyAddressProvince: "",
      propertyAddressCity: "",
      propertyFeatures: [],
    },
  });

  const {
    provinces,
    cities,
    selectedProvince,
    selectedCity,
    selectedDetails,
    handleProvinceChange,
    setSelectedCity,
  } = useAddressCascade();

  useEffect(() => {
    if (initialData?.propertyAddressProvince) {
      handleProvinceChange(initialData.propertyAddressProvince);
    }
    if (initialData?.propertyAddressCity) {
      setSelectedCity(initialData.propertyAddressCity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  const handleFormSubmit = async (values: PropertyFormValues) => {
    await onSubmit(values);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <form
        id={"property-add-form"}
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className=""
      >
        <FieldGroup>
          <Controller
            name="propertyType"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="propertyType">Property Type</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="propertyType" className={"w-full"}>
                    <SelectValue placeholder="Choose a property type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypeOptions.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="propertyListingType"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="propertyListingType">
                  Property Listing Type
                </FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="propertyListingType" className={"w-full"}>
                    <SelectValue placeholder="Choose a property listing type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyListingTypeOptions.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="propertyTitle"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="propertyTitle">Title</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter property title"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="propertyDeskripsi"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="propertyDeskripsi">Description</FieldLabel>
                <Textarea
                  {...field}
                  id="propertyDeskripsi"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter property description"
                  rows={6}
                  className="min-h-24 resize-none"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="propertyPrice"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="propertyPrice">Price</FieldLabel>
                <Input
                  value={field.value?.toString() ?? ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  type="number"
                  id="propertyPrice"
                  placeholder="Enter property price"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="propertyLuasTanah"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="propertyLuasTanah">Land Area</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    value={field.value?.toString() ?? ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    type="number"
                    id="propertyLuasTanah"
                    placeholder="Enter Land Area"
                    autoComplete="off"
                  />
                  <InputGroupAddon align="inline-end">
                    m<sup>2</sup>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="propertyLuasBangunan"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="propertyLuasBangunan">
                  Floor Area
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    value={field.value?.toString() ?? ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    type="number"
                    id="propertyLuasBangunan"
                    placeholder="Enter Floor Area"
                    autoComplete="off"
                  />
                  <InputGroupAddon align="inline-end">
                    m<sup>2</sup>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="propertyKamarMandi"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="propertyKamarMandi">Bathrooms</FieldLabel>
                <Input
                  value={field.value?.toString() ?? ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  type="number"
                  id="propertyKamarMandi"
                  placeholder="Enter bathrooms number"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="propertyKamarTidur"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="propertyKamarTidur">Bedrooms</FieldLabel>
                <Input
                  value={field.value?.toString() ?? ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  type="number"
                  id="propertyKamarTidur"
                  placeholder="Enter bedrooms number"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="propertyCarport"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="propertyCarport">Carports</FieldLabel>
                <Input
                  value={field.value?.toString() ?? ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  type="number"
                  id="propertyCarport"
                  placeholder="Enter carports number"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="propertyJumlahLantai"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="propertyJumlahLantai">Floors</FieldLabel>
                <Input
                  value={field.value?.toString() ?? ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  type="number"
                  id="propertyJumlahLantai"
                  placeholder="Enter floors number"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="propertyGarasi"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="propertyGarasi">Garage</FieldLabel>
                <Input
                  value={field.value?.toString() ?? ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  type="number"
                  id="propertyGarasi"
                  placeholder="Enter garage capacity"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="propertyDayaListrik"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="propertyDayaListrik">
                  Electricity Power
                </FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="propertyDayaListrik" className={"w-full"}>
                    <SelectValue placeholder="Choose electricity power capacity" />
                  </SelectTrigger>
                  <SelectContent>
                    {DAYA_LISTRIK_OPTIONS.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="propertyTipeSertifikat"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="propertyTipeSertifikat">
                  Certificate Type
                </FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="propertyTipeSertifikat"
                    className={"w-full"}
                  >
                    <SelectValue placeholder="Choose property certificate type" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERTIFIKAT_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="propertyPerabotan"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="propertyPerabotan">
                  Furnishing Type
                </FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="propertyPerabotan" className={"w-full"}>
                    <SelectValue placeholder="Choose property furnishing type" />
                  </SelectTrigger>
                  <SelectContent>
                    {PERABOTAN_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="status"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="status">Property Status</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="status" className={"w-full"}>
                    <SelectValue placeholder="Choose property status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="propertyAddressProvince"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="propertyAddressProvince">
                  Province
                </FieldLabel>
                <Select
                  onValueChange={(val) => {
                    field.onChange(val);
                    handleProvinceChange(val);
                    form.setValue("propertyAddressCity", "");
                  }}
                  value={field.value ?? ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="propertyAddressCity"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="propertyAddressCity">City</FieldLabel>
                <Select
                  onValueChange={(val) => {
                    field.onChange(val);
                  }}
                  value={field.value ?? ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit">
              {submitLabel ??
                (mode === "create" ? "Create Property" : "Save Changes")}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
};
