import "./table.css";

type TableRow<RowType> = {
  [Property in keyof RowType]: string | number;
};

interface IBaseTableRow {
  id: number;
}

type ITableRow<RowType> = IBaseTableRow & TableRow<RowType>;

interface ITableColumn<RowType> {
  label: string;
  accessor: keyof RowType;
  width?: string;
}

interface ITableProps<RowType> {
  columns: ITableColumn<RowType>[];
  rows: ITableRow<RowType>[];
}

export default function Table<RowType extends ITableRow<RowType>>(
  props: ITableProps<RowType>
) {
  return (
    <table className="table__container">
      <thead className="table__header">
        <tr>
          {props.columns.map((column) => (
            <th
              key={column.accessor as string}
              style={{ width: column.width ?? "auto" }}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="table__body">
        {props.rows.map((row) => (
          <tr key={row.id}>
            {props.columns.map((column) => (
              <td key={column.accessor as string}>{row[column.accessor]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
