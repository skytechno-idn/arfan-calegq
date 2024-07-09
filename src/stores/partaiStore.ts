import { devtools, persist } from "zustand/middleware";
import { create } from "zustand";

const defaultForm = {
  nama_partai: "",
  label_partai: "",
  color: "",
  nomor_urut: "",
};
export const usePartaiStore = create<any>()(
  devtools(
    (set, get) => ({
      processing: false,
      rowSelected: null,
      page: 1,
      pageSize: 10,
      defaultFormValues: defaultForm,
      modals: {
        form: false,
        alertDelete: false,
      },
      columns: [
        { name: "NAMA PARTAI", uid: "nama_partai" },
        { name: "LABEL", uid: "label_partai" },
        { name: "WARNA", uid: "color" },
        { name: "NOMOR", uid: "nomor_urut" },
        { name: "CREATED", uid: "createdAt" },
        { name: "UPDATED", uid: "updatedAt" },
        { name: "ACTIONS", uid: "actions" },
      ],

      handleModalsTrigger: (type: string, item?: any) =>
        set((state: any) => ({
          rowSelected: item !== null ? item : null,

          modals: {
            ...state.modals,
            [type]: !state.modals[type],
          },
        })),
      setProcessing: (boolean: boolean) =>
        set(() => ({
          processing: boolean,
        })),
      handleRowSelected: (data: any) =>
        set((state: any) => ({
          rowSelected: data,
        })),
    }),
    {
      name: "partai-storage",
    }
  )
);
