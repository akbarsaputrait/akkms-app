import { Button, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";

interface LogFaultProps {
  onClose: () => void;
  userId: string;
}

export const LogFault = ({ userId, onClose }: LogFaultProps) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useState(userId);

  useEffect(() => {
    const fetchingLogs = async () => {
      setLoading(true);
      const res = await fetch(`${process.env.API_URL}/logs?user=${user}`, {
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
  }, [user]);

  return (
    <>
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
                          <LogDetail key={item.id} log={item} />
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

const LogDetail = ({ log }) => {
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
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{log.name}</p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">{date}</p>
          </div>
          <div
            className={`inline-flex items-center text-base font-semibold ${
              log.type === "NEGATIVE" ? "text-red-500" : "text-green-500"
            }`}>
            {log.type === "NEGATIVE" ? "+" : "-"}
            {log.score}
          </div>
        </div>
      </li>
    </>
  );
};
