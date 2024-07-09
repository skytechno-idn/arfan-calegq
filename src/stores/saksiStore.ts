import { devtools, persist } from "zustand/middleware";
import { create } from "zustand";

const defaultForm = {
  nama: "",
  telp: "",
  tpsId: "",
 
};
export const useSaksiStore = create<any>()(
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
        { name: "NAMA LENGKAP", uid: "nama_saksi" },
        { name: "NOMOR TELEPON", uid: "telp_saksi" },
        { name: "EMAIL", uid: "email_saksi" },
        { name: "TPS", uid: "tps" },
        { name: "DPT", uid: "dpt" },
        { name: "KECAMATAN", uid: "kecamatan" },
        { name: "KELURAHAN / DESA", uid: "kelurahan" },
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
      name: "saksi-storage",
    }
  )
);
