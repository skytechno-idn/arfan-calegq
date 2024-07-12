import React, { Key, useEffect, useState } from "react";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

import { useAsyncList } from "@react-stately/data";

import axiosInstance from "@/lib/axios";
import { TPS } from "@/configs/admin-endpoints";
interface DesaSelectProps {
  onChange: (value?: string | null) => void;
  defaultSearch?: string;
  placeholder?: string;
  label?: string;
  error?: any;
  defaultSelected?: any;
}

const DesaSelect = ({
  error,
  onChange,
  defaultSelected,
  placeholder,
  label,
}: DesaSelectProps) => {
  const [value, setValue] = useState<any>(defaultSelected);
  const list: any = useAsyncList<any>({
    async load({ signal, filterText }) {
      const res: any = await axiosInstance.get(
        `${TPS.GET_DESA}?page=1&pageSize=10&q=${filterText}`,
        {
          signal,
        }
      );
      const items = res?.data?.rows;
      return {
        items: items,
      };
    },
  });

  useEffect(() => {
    if (value !== undefined) {
      const res = list.items?.find((el) => el.id === value?.toString());
      if (res) {
        onChange(res);
      }
    }
  }, [value]);

  const handleSelectionChange = (key: Key | null) => {
    setValue(key as string); // Ensure key is treated as a string
  };

  return (
    <Autocomplete
      menuTrigger="focus"
      isInvalid={!!error}
      errorMessage={error?.message}
  
      allowsEmptyCollection
      isLoading={list.isLoading}
      defaultItems={list.items}
      label={label}
      placeholder={placeholder ?? "Click to search..."}
      // onInputChange={list.setFilterText}
      selectedKey={value}
      onSelectionChange={handleSelectionChange}
    >
      {(item: any) => (
        <AutocompleteItem key={item.id} className="capitalize">
          {item.nama_desa}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default DesaSelect;
