import { Transaction, TransactionData } from "@/interfaces/transaction";
import React, { useEffect, useRef, useState } from "react";
import { KeyedMutator } from "swr";
import { TransactionModal } from ".";
import { toast } from "sonner";
import { CallbacksInterface } from "@/interfaces/form";
import { DeleteTransaction } from "@/api/transaction/data";
import { useGlobalContext } from "@/app/context/provider";

interface props {
  obj: Transaction;
  revalidate: KeyedMutator<TransactionData>;
  data: TransactionData | undefined;
}

export const CellActionButton = ({ obj, revalidate, data }: props) => {
  const { user } = useGlobalContext();
  const [isActive, setIsActive] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const modalRef = useRef<HTMLUListElement | null>(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const handleOutSideClick = (e: MouseEvent) => {
      if (!modalRef.current?.contains(e.target as Node)) {
        setIsActive(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [modalRef]);

  const callback: CallbacksInterface = {
    onLoading() {
      setIsActive(false);
      setProcessing(true);
      toast.dismiss();
      toast.loading("Loading...");
    },
    onError(result) {
      setProcessing(false);
      toast.dismiss();
      toast.error(result.message);
    },
    onSuccess(result) {
      setProcessing(false);
      toast.dismiss();
      revalidate();
      toast.success(result);
    },
  };

  return (
    <>
      <div className="flex flex-col relative">
        <button
          onClick={() => {
            if (processing) return;
            setIsActive(!isActive);
          }}
          className="flex items-center h-6 w-6 justify-center rounded-full transition-colors duration-300 ease-in-out hover:bg-secondary hover:text-primary"
        >
          •••
        </button>

        <ul
          ref={modalRef}
          className={`${
            isActive ? "flex" : "hidden"
          } absolute -left-[65px] bottom-5 bg-primary z-[5] p-2  w-20 border border-borderColor rounded-md rounded-br-none flex-col gap-1 text-sm`}
        >
          <li
            onClick={() => setUpdateModal(true)}
            className="cursor-pointer w-full hover:bg-secondary hover:text-primary rounded-sm"
          >
            Edit
          </li>
          <li
            onClick={() => {
              toast.dismiss();
              toast.warning("Are you sure you want to delete it?", {
                action: {
                  label: "Yes",
                  onClick: async () =>
                    await DeleteTransaction(obj.uid, callback, user?.token),
                },
                closeButton: true,
              });
            }}
            className="cursor-pointer w-full hover:bg-secondary hover:text-primary rounded-sm"
          >
            Delete
          </li>
        </ul>
      </div>

      {updateModal && (
        <TransactionModal
          data={data}
          mode="UPDATE"
          revalidate={revalidate}
          currentObjData={obj}
          setModal={setUpdateModal}
        />
      )}
    </>
  );
};
