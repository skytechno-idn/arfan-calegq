import { devtools, persist } from "zustand/middleware";
import { create } from "zustand";

const defaultForm = {
  nama_admin: "",
  email_admin: "",
  telp_admin: "",
  password: "",
};
export const useSuaraStore = create<any>()(
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
        { name: "SUARA SAH", uid: "jml_suara_sah" },
        { name: "SUARA RUSAK", uid: "jml_suara_rusak" },
        { name: "SUARA MASUK", uid: "jml_suara_masuk" },
        // { name: "DPT", uid: "dpt" },
        { name: "KECAMATAN", uid: "kecamatan" },
        { name: "TPS", uid: "tps" },
        { name: "STATUS", uid: "status" },
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
      name: "suara-storage",
    }
  )
);
