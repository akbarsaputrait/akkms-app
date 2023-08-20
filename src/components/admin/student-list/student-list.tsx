import { Card, Typography } from "@material-tailwind/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import ExportExcel from "../../export-excel/export-excel";
import { IStudent, StudentInfo } from "../../student-info/student-info";
import styles from "./student-list.module.css";

const StudentList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [student, setStudent] = useState<IStudent>(null);
  const [studentId, setStudentId] = useState(null);

  const violationTextColor = (level) => {
    switch (level) {
      case "minor":
        return "blue";
      case "disruptive":
        return "yellow";
      case "moderate":
        return "orange";
      case "serious":
        return "purple";
      case "major":
        return "red";
      default:
        return "gray";
    }
  };

  useEffect(() => {
    const fetchingLogs = async () => {
      setLoading(true);
      const res = await fetch(`${process.env.API_URL}/admin/students`, {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        res.json().then(({ data }) => {
          setList(data);
          setLoading(false);
        });
      }
    };

    fetchingLogs();
  }, []);

  useEffect(() => {
    setLoading(true);
    const refetchUser = async () => {
      if (studentId) {
        fetch(`${process.env.API_URL}/admin/students/${studentId}`, {
          method: "get",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              response.json().then(({ data }) => setStudent(data));
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
    };

    refetchUser();
  }, [studentId]);

  const handleStudentId = (event, id: string) => {
    setStudentId(id);
  };

  const TABLE_HEAD = ["NISN", "Name", "Scores"];

  return student ? (
    <StudentInfo data={student} isAdmin />
  ) : (
    <>
      <ExportExcel
        excelData={list}
        fileName={`student-list-${dayjs().unix()}`}
        disabled={loading}
      />
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="text-center">
                  <div className={styles.ldsRipple}>
                    <div></div>
                    <div></div>
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {list.map(({ id, nis, name, scores, violation }, index) => {
                  const isLast = index === list.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={id}>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {nis}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal uppercase text-blue-700 cursor-pointer"
                          onClick={(e) => handleStudentId(e, id)}>
                          {name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color={violationTextColor(violation)}
                          className="font-normal">
                          {scores}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default StudentList;
