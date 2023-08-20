import { Button, Typography } from "@material-tailwind/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import ExportExcel from "../export-excel/export-excel";
import { IStudent } from "../student-info/student-info";

interface LogFaultProps {
  onClose: () => void;
  student: IStudent;
  isAdmin: boolean;
  onConfirm?: (e: any, id: string, status: string) => void;
}

export const LogFault = ({ student: user, onClose, isAdmin = false, onConfirm }: LogFaultProps) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [student] = useState<IStudent>(user);

  useEffect(() => {
    const fetchingLogs = async () => {
      setLoading(true);
      const res = await fetch(`${process.env.API_URL}/logs?user=${student.id}`, {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        res.json().then(({ data }) => {
          setLogs(data);
          setLoading(false);
        });
      }
    };

    fetchingLogs();
  }, [student]);

  return (
    <>
      <ExportExcel
        excelData={logs}
        fileName={`${student.nis}-conducts-${dayjs().unix()}`}
        disabled={loading}
      />

      <div className="w-full">
        <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <Typography variant="lead">Riwayat Pelanggaran</Typography>
            <Button size="sm" color="red" variant="outlined" onClick={onClose}>
              Tutup
            </Button>
          </div>
          <div className="flow-root">
            {!loading ? (
              <>
                {logs.length === 0 ? (
                  "Yey 🥳🎉 Kamu tidak punya riwayat pelanggaran! Pertahankan yaa!"
                ) : (
                  <>
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                      {logs.map((item) => (
                        <>
                          <LogDetail
                            key={item.id}
                            log={item}
                            isAdmin={isAdmin}
                            callback={isAdmin && onConfirm}
                          />
                        </>
                      ))}
                    </ul>
                  </>
                )}
              </>
            ) : (
              "Mohon tunggu..."
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const LogDetail = ({ log, isAdmin, callback }) => {
  const [date] = useState(
    new Intl.DateTimeFormat("id-ID", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Asia/Jakarta",
    }).format(new Date(log.createdAt)),
  );

  return (
    <>
      <li className="py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 truncate dark:text-white">{log.conduct_type}</p>
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white wrap-balance py-1">
              {log.name}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">{date}</p>
          </div>
          <div
            className={`inline-flex items-center text-base font-semibold ${
              log.type === "NEGATIVE" ? "text-red-500" : "text-green-500"
            } ${log.status === "REJECTED" && "text-gray-500"}`}>
            {isAdmin && log.status === "PENDING" && (
              <div className="flex flex-row gap-2">
                <Button
                  size="sm"
                  color="red"
                  variant="text"
                  onClick={(e) => callback(e, log.id, "REJECTED")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="m13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4.29-4.3l4.29 4.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"
                    />
                  </svg>
                </Button>

                <Button
                  size="sm"
                  color="green"
                  variant="text"
                  onClick={(e) => callback(e, log.id, "APPROVED")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="m14.72 8.79l-4.29 4.3l-1.65-1.65a1 1 0 1 0-1.41 1.41l2.35 2.36a1 1 0 0 0 .71.29a1 1 0 0 0 .7-.29l5-5a1 1 0 0 0 0-1.42a1 1 0 0 0-1.41 0ZM12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8Z"
                    />
                  </svg>
                </Button>
              </div>
            )}
            {!isAdmin && log.status === "PENDING" && "Tunggu"}
            {log.status === "APPROVED" && `${log.type === "NEGATIVE" ? "+" : "-"}${log.score}`}
            {log.status === "REJECTED" && "Ditolak"}
          </div>
        </div>
      </li>
    </>
  );
};
