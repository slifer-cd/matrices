"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/matrix.ts
var matrix_exports = {};
__export(matrix_exports, {
  Matrix: () => Matrix
});
module.exports = __toCommonJS(matrix_exports);
var Matrix = class _Matrix {
  arr = [];
  rows;
  columns;
  name;
  largest = 0;
  constructor(rows, columns, name = "custom") {
    this.rows = rows;
    this.columns = columns;
    this.name = name;
  }
  get getRows() {
    return this.rows;
  }
  get getCloumns() {
    return this.columns;
  }
  fillArrByRows(...numbers) {
    if (numbers[0] instanceof Array) {
      numbers = numbers[0];
    }
    for (let i = 0; i < this.rows; i++) {
      this.arr[i] = [];
      for (let j = 0; j < this.columns; j++) {
        this.arr[i][j] = i * this.columns + j < numbers.length ? numbers[i * this.columns + j] : 0;
        if (numbers[i * this.columns + j].toLocaleString().length > this.largest) {
          this.largest = numbers[i * this.columns + j].toLocaleString().length;
        }
      }
    }
  }
  printMatrix() {
    const m = this.largest;
    for (let i = 0; i < this.arr.length; i++) {
      let x = this.arr[i].reduce((a, b) => {
        if (b < 0 && a.length > 0) {
          a = a.slice(0, a.length - 1);
        }
        return a + b.toLocaleString().padEnd(m, " ") + " " + (b < 0 && a.length > 0 ? " " : "");
      }, "");
      console.log(x);
    }
  }
  get getArr() {
    let arr = [];
    for (let i = 0; i < this.arr.length; i++) {
      arr[i] = [...this.arr[i]];
    }
    return arr;
  }
  get getName() {
    return this.name;
  }
  static MatrixOperation = class {
    static matrices_summation(m1, m2) {
      if (m1.getCloumns != m2.getCloumns || m1.getRows != m2.getRows) {
        throw new Error("Matrices aren't the same size.");
      }
      const m = new _Matrix(m1.getRows, m1.getCloumns);
      const a = [];
      for (let i = 0; i < m1.getRows; i++) {
        for (let j = 0; j < m1.getCloumns; j++) {
          a.push(
            (m1.getArr[i][j] || 0) + (m2.getArr[i][j] || 0)
          );
        }
      }
      m.fillArrByRows(a);
      return m;
    }
    static matrices_subtraction(m1, m2) {
      if (m1.getCloumns != m2.getCloumns || m1.getRows != m2.getRows) {
        throw new Error("Matrices aren't the same size.");
      }
      const m = new _Matrix(m1.getRows, m1.getCloumns);
      const a = [];
      for (let i = 0; i < m1.getRows; i++) {
        for (let j = 0; j < m1.getCloumns; j++) {
          a.push(
            (m1.getArr[i][j] || 0) - (m2.getArr[i][j] || 0)
          );
        }
      }
      m.fillArrByRows(a);
      return m;
    }
    static matrix_multiplication(m1, m2) {
      if (m1.getCloumns != m2.getRows)
        throw new Error("nonvalid matrices size");
      let arr = [];
      for (let i = 0; i < m1.getRows; i++) {
        let a = [];
        for (let j = 0; j < m2.getCloumns; j++) {
          let summ = 0;
          for (let k = 0; k < m1.getCloumns; k++) {
            summ += m1.getArr[i][k] * m2.getArr[k][j];
          }
          a.push(summ);
        }
        arr.push(...a);
      }
      const m = new _Matrix(m1.getRows, m2.getCloumns);
      m.fillArrByRows(arr);
      return m;
    }
    static matrix_transpose(m) {
      const m2 = new _Matrix(m.getCloumns, m.getRows);
      const a = [];
      for (let i = 0; i < m.getCloumns; i++) {
        for (let j = 0; j < m.getRows; j++) {
          a.push(m.getArr[j][i]);
        }
      }
      m2.fillArrByRows(a);
      return m2;
    }
    static matrices_combine(m1, m2) {
      if (m1.getRows != m2.getRows)
        throw new Error("nonvalid matrices size");
      const m = new _Matrix(m1.getRows, m1.getCloumns + m2.getCloumns);
      const arr = [];
      for (let i = 0; i < m1.getRows; i++) {
        arr.push(...m1.getArr[i]);
        arr.push(...m2.getArr[i]);
      }
      m.fillArrByRows(arr);
      return m;
    }
    static matrix_determinant(m) {
      if (m.getRows != m.getCloumns)
        throw new Error("nonvalid matrices size");
      if (m.getRows == 2) {
        return m.getArr[0][0] * m.getArr[1][1] - m.getArr[0][1] * m.getArr[1][0];
      }
      let summ = 0;
      for (let i = 0; i < m.getRows; i++) {
        const m2 = new _Matrix(m.getRows - 1, m.getCloumns - 1);
        const arr = [];
        for (let j = 1; j < m.getRows; j++) {
          for (let k = 0; k < m.getCloumns; k++) {
            if (k == i) continue;
            arr.push(m.getArr[j][k]);
          }
        }
        m2.fillArrByRows(arr);
        summ += m.getArr[0][i] * _Matrix.MatrixOperation.matrix_determinant(m2) * Math.pow(-1, i);
      }
      return summ;
    }
    static ele(m, row, col) {
      if (row < 1 || col < 1 || m.getCloumns != m.getRows) {
        throw new Error("nonvalid matrices size");
      }
      const l = m.getArr[row - 1][col - 1] / m.getArr[col - 1][col - 1];
      const arr = Array(m.getCloumns * m.getRows).fill(0);
      for (let i = 0; i < m.getCloumns; i++) {
        arr[i * m.getCloumns + i] = 1;
      }
      arr[(row - 1) * m.getCloumns + col - 1] = l == 0 ? 0 : -l;
      const e = new _Matrix(m.getRows, m.getCloumns);
      e.fillArrByRows(arr);
      return e;
    }
    static inverse(m) {
      if (m.getRows != m.getCloumns || _Matrix.MatrixOperation.matrix_determinant(m) == 0)
        throw new Error("nonvalid matrices size");
      let ans = _Matrix.NamedMatrix("iden", { size: m.getRows });
      for (let i = 1; i < m.getRows; i++) {
        for (let j = i; j < m.getRows; j++) {
          ans = _Matrix.MatrixOperation.matrix_multiplication(
            _Matrix.MatrixOperation.ele(m, j + 1, i),
            ans
          );
          m = _Matrix.MatrixOperation.matrix_multiplication(
            _Matrix.MatrixOperation.ele(m, j + 1, i),
            m
          );
        }
      }
      for (let i = m.getRows - 1; i > 0; i--) {
        for (let j = i; j > 0; j--) {
          ans = _Matrix.MatrixOperation.matrix_multiplication(
            _Matrix.MatrixOperation.ele(m, j, i + 1),
            ans
          );
          m = _Matrix.MatrixOperation.matrix_multiplication(
            _Matrix.MatrixOperation.ele(m, j, i + 1),
            m
          );
        }
      }
      const arr = Array(m.getCloumns * m.getRows).fill(0);
      for (let i = 0; i < m.getRows; i++) {
        arr[i * m.getCloumns + i] = 1 / m.getArr[i][i];
      }
      const t = new _Matrix(m.getRows, m.getCloumns);
      t.fillArrByRows(arr);
      ans = _Matrix.MatrixOperation.matrix_multiplication(t, ans);
      return ans;
    }
  };
  static NamedMatrix = (name, {
    size,
    ex,
    eVal
  }) => {
    let s = size || 3;
    if (s <= 0) {
      s = 3;
    }
    const m = new _Matrix(s, s, name);
    if (name == "iden") {
      let arr = [1];
      for (let i = 1; i < s; i++) {
        for (let i2 = 0; i2 < s; i2++) {
          arr.push(0);
        }
        arr.push(1);
      }
      m.fillArrByRows(arr);
    } else if (name == "row-ex") {
      if (ex == void 0) throw new Error("lack of arguments");
      const arr = [];
      for (let i = 0; i < s; i++) {
        const a = Array(s).fill(0);
        if (ex[i + 1] != void 0) {
          a[ex[i + 1] - 1] = 1;
        } else {
          a[i] = 1;
        }
        arr.push(...a);
      }
      m.fillArrByRows(arr);
    } else if (name.includes("E_")) {
      const nums = name.split("_").slice(1).map(Number);
      if (nums[1] == nums[2] || eVal == void 0 || nums[0] == void 0 || nums[1] == void 0)
        throw new Error("Cant eleminate the pivot");
      const arr = [];
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
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Matrix
});
