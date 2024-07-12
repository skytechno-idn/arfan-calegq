import { devtools, persist } from "zustand/middleware";
import { create } from "zustand";

const defaultForm = {
  "nama_caleg": "",
  // "nomor_urut":"",
  // "color":"",
  "id_partai": ""
};
export const useCalegStore = create<any>()(
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
        { name: "NAMA LENGKAP", uid: "nama_caleg" },
        { name: "PARTAI", uid: "partai" },
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
      name: "caleg-storage",
    }
  )
);
