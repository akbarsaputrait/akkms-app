import { useClasses } from "../services/class";
import styles from "../styles/Home.module.css";
import { IClass } from "../types";

export const ClassList: React.FC = () => {
  const { data: classes, error, mutate } = useClasses();

  if (error != null) return <div>Error loading todos...</div>;
  if (classes == null) return <div>Loading...</div>;

  if (classes.length === 0) {
    return <div className={styles.emptyState}>Try adding a todo ☝️️</div>;
  }

  return (
    <>
      <ul className={styles.todoList}>
        {classes.map((data) => (
          <ClassItem data={data} />
        ))}
      </ul>
    </>
  );
};

const ClassItem: React.FC<{ data: IClass }> = ({ data }) => (
  // @TODO: Unique Key Prop?
  <li className={styles.todo}>
    <label key={data.id}>
      {data.grade.name} - {data.type.name}
    </label>
  </li>
);
