declare namespace Matrix {
    type MatrixName = "iden" | "custom" | "row-ex" | `E_${number}_${number}`;
    interface NumricMap {
        [key: number]: number;
    }
}
declare class Matrix {
    private arr;
    private rows;
    private columns;
    private name;
    private largest;
    constructor(rows: number, columns: number, name?: Matrix.MatrixName);
    get getRows(): number;
    get getCloumns(): number;
    fillArrByRows(numbers: number[]): void;
    fillArrByRows(...numbers: number[]): void;
    printMatrix(): void;
    get getArr(): number[][];
    get getName(): string;
    static MatrixOperation: {
        new (): {};
        matrices_summation(m1: Matrix, m2: Matrix): Matrix;
        matrices_subtraction(m1: Matrix, m2: Matrix): Matrix;
        matrix_multiplication(m1: Matrix, m2: Matrix): Matrix;
        matrix_transpose(m: Matrix): Matrix;
        matrices_combine(m1: Matrix, m2: Matrix): Matrix;
        matrix_determinant(m: Matrix): number;
        ele(m: Matrix, row: number, col: number): Matrix;
        inverse(m: Matrix): Matrix;
    };
    static NamedMatrix: (name: Matrix.MatrixName, { size, ex, eVal, }: {
        size?: number;
        ex?: Matrix.NumricMap;
        eVal?: number;
    }) => Matrix;
}

export { Matrix };
