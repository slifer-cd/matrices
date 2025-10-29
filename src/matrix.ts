namespace Matrix {
    export type MatrixName =
        | "iden"
        | "custom"
        | "row-ex"
        | `E_${number}_${number}`;
    export interface NumricMap {
        [key: number]: number;
    }
}
class Matrix {
    private arr: number[][] = [];
    private rows: number;
    private columns: number;
    private name: Matrix.MatrixName;
    private largest: number = 0;

    constructor(
        rows: number,
        columns: number,
        name: Matrix.MatrixName = "custom"
    ) {
        this.rows = rows;
        this.columns = columns;
        this.name = name;
    }
    public get getRows(): number {
        return this.rows;
    }
    public get getCloumns(): number {
        return this.columns;
    }
    public fillArrByRows(numbers: number[]): void;
    public fillArrByRows(...numbers: number[]): void;
    public fillArrByRows(...numbers: any): void {
        if (numbers[0] instanceof Array) {
            numbers = numbers[0];
        }
        for (let i = 0; i < this.rows; i++) {
            this.arr[i] = [];
            for (let j = 0; j < this.columns; j++) {
                (this.arr[i] as Array<number>)[j] =
                    i * this.columns + j < numbers.length
                        ? numbers[i * this.columns + j]
                        : 0;
                if (
                    numbers[i * this.columns + j].toLocaleString().length >
                    this.largest
                ) {
                    this.largest =
                        numbers[i * this.columns + j].toLocaleString().length;
                }
            }
        }
    }
    public printMatrix(): void {
        const m = this.largest;
        for (let i = 0; i < this.arr.length; i++) {
            let x = (this.arr[i] as number[]).reduce((a, b) => {
                if (b < 0 && a.length > 0) {
                    a = a.slice(0, a.length - 1);
                }
                return (
                    a +
                    b.toLocaleString().padEnd(m, " ") +
                    " " +
                    (b < 0 && a.length > 0 ? " " : "")
                );
            }, "");
            console.log(x);
        }
    }
    public get getArr(): number[][] {
        let arr = [];
        for (let i = 0; i < this.arr.length; i++) {
            arr[i] = [...(this.arr[i] as number[])];
        }
        return arr;
    }
    public get getName(): string {
        return this.name;
    }
    public static MatrixOperation = class {
        public static matrices_summation(m1: Matrix, m2: Matrix): Matrix {
            if (m1.getCloumns != m2.getCloumns || m1.getRows != m2.getRows) {
                throw new Error("Matrices aren't the same size.");
            }
            const m = new Matrix(m1.getRows, m1.getCloumns);
            const a = [];
            for (let i = 0; i < m1.getRows; i++) {
                for (let j = 0; j < m1.getCloumns; j++) {
                    a.push(
                        ((m1.getArr[i] as number[])[j] || 0) +
                            ((m2.getArr[i] as number[])[j] || 0)
                    );
                }
            }
            m.fillArrByRows(a);
            return m;
        }
        public static matrices_subtraction(m1: Matrix, m2: Matrix): Matrix {
            if (m1.getCloumns != m2.getCloumns || m1.getRows != m2.getRows) {
                throw new Error("Matrices aren't the same size.");
            }
            const m = new Matrix(m1.getRows, m1.getCloumns);
            const a = [];
            for (let i = 0; i < m1.getRows; i++) {
                for (let j = 0; j < m1.getCloumns; j++) {
                    a.push(
                        ((m1.getArr[i] as number[])[j] || 0) -
                            ((m2.getArr[i] as number[])[j] || 0)
                    );
                }
            }
            m.fillArrByRows(a);
            return m;
        }
        public static matrix_multiplication(m1: Matrix, m2: Matrix): Matrix {
            if (m1.getCloumns != m2.getRows)
                throw new Error("nonvalid matrices size");
            let arr: number[] = [];
            for (let i = 0; i < m1.getRows; i++) {
                let a: number[] = [];
                for (let j = 0; j < m2.getCloumns; j++) {
                    let summ = 0;
                    for (let k = 0; k < m1.getCloumns; k++) {
                        summ +=
                            ((m1.getArr[i] as number[])[k] as number) *
                            ((m2.getArr[k] as number[])[j] as number);
                    }
                    a.push(summ);
                }
                arr.push(...a);
            }
            const m = new Matrix(m1.getRows, m2.getCloumns);
            m.fillArrByRows(arr);
            return m;
        }
        public static matrix_transpose(m: Matrix): Matrix {
            const m2 = new Matrix(m.getCloumns, m.getRows);
            const a = [];
            for (let i = 0; i < m.getCloumns; i++) {
                for (let j = 0; j < m.getRows; j++) {
                    a.push((m.getArr[j] as number[])[i] as number);
                }
            }
            m2.fillArrByRows(a);
            return m2;
        }
        public static matrices_combine(m1: Matrix, m2: Matrix): Matrix {
            if (m1.getRows != m2.getRows)
                throw new Error("nonvalid matrices size");
            const m = new Matrix(m1.getRows, m1.getCloumns + m2.getCloumns);
            const arr = [];
            for (let i = 0; i < m1.getRows; i++) {
                arr.push(...(m1.getArr[i] as number[]));
                arr.push(...(m2.getArr[i] as number[]));
            }
            m.fillArrByRows(arr);
            return m;
        }
        public static matrix_determinant(m: Matrix): number {
            if (m.getRows != m.getCloumns)
                throw new Error("nonvalid matrices size");
            if (m.getRows == 2) {
                return (
                    ((m.getArr[0] as number[])[0] as number) *
                        ((m.getArr[1] as number[])[1] as number) -
                    ((m.getArr[0] as number[])[1] as number) *
                        ((m.getArr[1] as number[])[0] as number)
                );
            }
            let summ = 0;
            for (let i = 0; i < m.getRows; i++) {
                const m2 = new Matrix(m.getRows - 1, m.getCloumns - 1);
                const arr = [];
                for (let j = 1; j < m.getRows; j++) {
                    for (let k = 0; k < m.getCloumns; k++) {
                        if (k == i) continue;
                        arr.push((m.getArr[j] as number[])[k] as number);
                    }
                }
                m2.fillArrByRows(arr);
                summ +=
                    ((m.getArr[0] as number[])[i] as number) *
                    Matrix.MatrixOperation.matrix_determinant(m2) *
                    Math.pow(-1, i);
            }
            return summ;
        }

        public static ele(m: Matrix, row: number, col: number): Matrix {
            if (row < 1 || col < 1 || m.getCloumns != m.getRows) {
                throw new Error("nonvalid matrices size");
            }
            const l =
                ((m.getArr[row - 1] as number[])[col - 1] as number) /
                ((m.getArr[col - 1] as number[])[col - 1] as number);
            const arr = Array(m.getCloumns * m.getRows).fill(0);
            for (let i = 0; i < m.getCloumns; i++) {
                arr[i * m.getCloumns + i] = 1;
            }
            arr[(row - 1) * m.getCloumns + col - 1] = l == 0 ? 0 : -l;
            const e = new Matrix(m.getRows, m.getCloumns);
            e.fillArrByRows(arr);
            return e;
        }
        public static inverse(m: Matrix): Matrix {
            if (
                m.getRows != m.getCloumns ||
                Matrix.MatrixOperation.matrix_determinant(m) == 0
            )
                throw new Error("nonvalid matrices size");

            let ans = Matrix.NamedMatrix("iden", { size: m.getRows });
            for (let i = 1; i < m.getRows; i++) {
                for (let j = i; j < m.getRows; j++) {
                    ans = Matrix.MatrixOperation.matrix_multiplication(
                        Matrix.MatrixOperation.ele(m, j + 1, i),
                        ans
                    );
                    m = Matrix.MatrixOperation.matrix_multiplication(
                        Matrix.MatrixOperation.ele(m, j + 1, i),
                        m
                    );
                }
            }
            for (let i = m.getRows - 1; i > 0; i--) {
                for (let j = i; j > 0; j--) {
                    ans = Matrix.MatrixOperation.matrix_multiplication(
                        Matrix.MatrixOperation.ele(m, j, i + 1),
                        ans
                    );
                    m = Matrix.MatrixOperation.matrix_multiplication(
                        Matrix.MatrixOperation.ele(m, j, i + 1),
                        m
                    );
                }
            }
            const arr = Array(m.getCloumns * m.getRows).fill(0);
            for (let i = 0; i < m.getRows; i++) {
                arr[i * m.getCloumns + i] =
                    1 / ((m.getArr[i] as number[])[i] as number);
            }
            const t = new Matrix(m.getRows, m.getCloumns);
            t.fillArrByRows(arr);
            ans = Matrix.MatrixOperation.matrix_multiplication(t, ans);
            // m = Matrix.MatrixOperation.matrix_multiplication(t, m);
            return ans;
        }
    };
    public static NamedMatrix = (
        name: Matrix.MatrixName,
        {
            size,
            ex,
            eVal,
        }: {
            size?: number;
            ex?: Matrix.NumricMap;
            eVal?: number;
        }
    ): Matrix => {
        let s = size || 3;
        if (s <= 0) {
            s = 3;
        }
        const m = new Matrix(s, s, name);
        if (name == "iden") {
            let arr = [1];
            for (let i = 1; i < s; i++) {
                for (let i = 0; i < s; i++) {
                    arr.push(0);
                }
                arr.push(1);
            }
            m.fillArrByRows(arr);
        } else if (name == "row-ex") {
            if (ex == undefined) throw new Error("lack of arguments");
            const arr: number[] = [];
            for (let i = 0; i < s; i++) {
                const a: number[] = Array(s).fill(0);
                if (ex[i + 1] != undefined) {
                    a[(ex[i + 1] as number) - 1] = 1;
                } else {
                    a[i] = 1;
                }
                arr.push(...a);
            }
            m.fillArrByRows(arr);
        } else if (name.includes("E_")) {
            const nums = name.split("_").slice(1).map(Number);
            if (
                nums[1] == nums[2] ||
                eVal == undefined ||
                nums[0] == undefined ||
                nums[1] == undefined
            )
                throw new Error("Cant eleminate the pivot");
            const arr: number[] = [];
            for (let i = 0; i < s; i++) {
                let a = Array(s).fill(0);
                a[i] = 1;
                if (nums[0] == i + 1) {
                    a[nums[1] - 1] = eVal;
                }
                arr.push(...a);
            }
            m.fillArrByRows(arr);
        }
        return m;
    };
}
export { Matrix };
